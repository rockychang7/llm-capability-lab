import { randomUUID, createHmac, timingSafeEqual } from "node:crypto";
import { summarizeScore, validateHumanReview } from "../review.js";
import { StorageUnavailable, RateLimited } from "./review-store.mjs";

const cookieName = "lab-participant";
class RequestError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
const hmac = (secret, value) => createHmac("sha256", secret).update(value).digest("hex");
const equal = (left, right) => /^[a-f0-9]{64}$/.test(left ?? "") && /^[a-f0-9]{64}$/.test(right ?? "") &&
  timingSafeEqual(Buffer.from(left, "hex"), Buffer.from(right, "hex"));
function identity(req, res, secret) {
  const value = (req.headers.cookie ?? "").split(";").map((item) => item.trim()).find((item) => item.startsWith(cookieName + "="))?.slice(cookieName.length + 1);
  let [id, signature] = (value ?? "").split(".");
  if (!/^[a-f0-9-]{36}$/.test(id ?? "") || !equal(signature, hmac(secret, `cookie:${id}`))) {
    id = randomUUID();
    const secure = req.headers["x-forwarded-proto"] === "https" || req.socket?.encrypted || process.env.VERCEL;
    res.setHeader("Set-Cookie", `${cookieName}=${id}.${hmac(secret, `cookie:${id}`)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${secure ? "; Secure" : ""}`);
  }
  return { participant: hmac(secret, `participant:${id}`), token: hmac(secret, `csrf:${id}`) };
}
async function requestBody(req) {
  if (!(req.headers["content-type"] ?? "").startsWith("application/json")) throw new RequestError("仅接受 JSON", 415);
  if (Number(req.headers["content-length"]) > 16384) throw new RequestError("评价内容过长", 413);
  if (req.body !== undefined) {
    try {
      const body = typeof req.body === "object" && !Buffer.isBuffer(req.body) ? req.body : JSON.parse(String(req.body));
      if (Buffer.byteLength(JSON.stringify(body)) > 16384) throw new RequestError("评价内容过长", 413);
      if (!body || typeof body !== "object" || Array.isArray(body)) throw new RequestError("评价必须是 JSON 对象");
      return body;
    } catch (error) {
      if (error instanceof RequestError) throw error;
      throw new RequestError("JSON 格式无效");
    }
  }
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    const buffer = Buffer.from(chunk);
    length += buffer.length;
    if (length > 16384) throw new RequestError("评价内容过长", 413);
    chunks.push(buffer);
  }
  try {
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new RequestError("评价必须是 JSON 对象");
    return body;
  } catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError("JSON 格式无效");
  }
}
const hashesOf = (version) => Object.fromEntries(version.results.map((item) => [item.key, item.sha256]));
function versionOf(lab, experimentId, versionNumber) {
  const experiment = lab.experiments.find((item) => item.id === experimentId);
  const version = experiment?.versions.find((item) => item.version === Number(versionNumber));
  if (!version?.evaluation || version.evaluation.protocol !== 4) throw new RequestError("未知实验版本", 404);
  return { experiment, version, scope: `${experiment.id}:v${version.version}:${version.evaluation.fingerprint}` };
}

export function createReviewHandler({ lab, store, secret }) {
  return async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("X-Content-Type-Options", "nosniff");
    const send = (status, body) => { res.statusCode = status; res.end(JSON.stringify(body)); };
    try {
      if (!["GET", "POST"].includes(req.method)) { res.setHeader("Allow", "GET, POST"); return send(405, { error: "不支持此方法" }); }
      const url = new URL(req.url, "http://localhost");
      const body = req.method === "POST" ? await requestBody(req) : null;
      const { version, scope } = versionOf(lab, body?.experiment ?? url.searchParams.get("experiment"),
        body?.version ?? url.searchParams.get("version"));
      if (!store || !secret) throw new StorageUnavailable();
      const user = identity(req, res, secret);
      const hashes = hashesOf(version);
      let submitted = null;
      if (body) {
        if (body.source !== undefined || body.participant !== undefined || body.revision !== undefined || body.at !== undefined) throw new RequestError("身份、来源和日期由服务端生成");
        if (!equal(req.headers["x-review-token"], user.token)) throw new RequestError("会话已失效，请刷新后重试", 403);
        if (req.headers.origin) {
          let origin;
          try { origin = new URL(req.headers.origin); } catch { throw new RequestError("来源无效", 403); }
          if (origin.host !== req.headers.host || !["http:", "https:"].includes(origin.protocol)) throw new RequestError("不接受跨站提交", 403);
        }
        if (!/^[a-f0-9-]{36}$/.test(body.id ?? "")) throw new RequestError("提交标识无效");
        if (body.fingerprint !== version.evaluation.fingerprint || hashes[body.key] !== body.sha256) throw new RequestError("标准或产物已更新，请刷新后重新评价", 409);
        submitted = { protocol: 4, source: "human", id: body.id, experiment: body.experiment, version: version.version,
          key: body.key, sha256: body.sha256, fingerprint: body.fingerprint, participant: user.participant,
          reviewer: typeof body.reviewer === "string" ? body.reviewer.trim() : "", viewport: body.viewport,
          scores: body.scores, comment: typeof body.comment === "string" ? body.comment.trim() : "",
          at: new Date().toISOString(), revision: 1 };
        try { validateHumanReview(submitted, version.evaluation, hashes); }
        catch (error) { throw new RequestError(error.message); }
        const ip = hmac(secret, `ip:${req.headers["x-real-ip"] ?? req.socket?.remoteAddress ?? "unknown"}`);
        submitted = await store.put(scope, submitted, ip);
      }
      const reviews = await store.list(scope);
      // Reject corrupted store records rather than publishing unvalidated public input.
      for (const review of reviews) validateHumanReview(review, version.evaluation, hashes);
      const scores = Object.fromEntries(version.results.map((result) => {
        const summary = summarizeScore(version, result.key, reviews);
        return [result.key, { total: summary.total, ai: summary.ai, human: summary.human, count: summary.count,
          dimensions: summary.dimensions, reviews: summary.reviews.slice(0, 20) }];
      }));
      const own = Object.fromEntries(reviews.filter((review) => review.participant === user.participant).map((review) => [review.key, review]));
      return send(200, { available: true, token: user.token, scores, own, ...(submitted ? { submitted } : {}) });
    } catch (error) {
      if (error instanceof RateLimited) { res.setHeader("Retry-After", "60"); return send(429, { error: "提交过于频繁，请一分钟后重试" }); }
      if (error instanceof RequestError) return send(error.status, { error: error.message });
      return send(503, { available: false, error: "评价服务暂不可用，内容未丢失，请稍后重试" });
    }
  };
}
