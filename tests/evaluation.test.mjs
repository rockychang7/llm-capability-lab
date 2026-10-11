import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdtemp, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createServer } from "node:http";
import { Readable } from "node:stream";
import { summarizeScore, validateHumanReview, latestBy } from "../review.js";
import { digest, parseProtocol, replaceJsonSection, validateAIReview, validateAIRecords,
  validateBrowserEvidence } from "../scripts/evaluation.mjs";
import { FileReviewStore, RedisReviewStore, StorageUnavailable, RateLimited, productionStore } from "../server/review-store.mjs";
import { createReviewHandler } from "../server/reviews.mjs";
import { importAI } from "../scripts/import-ai.mjs";
import { importReview } from "../scripts/import-review.mjs";

const at = "2026-10-11T08:00:00.000Z";
const keys = ["one", "two"], hashes = Object.fromEntries(keys.map((key) => [key, digest(`raw:${key}`)]));
const markdown = `# Test
- **评测协议**：4
## 评分维度
| ID | 名称 | 来源 | 权重 | 评分标准 |
|---|---|---|---|---|
| reliability | 运行 | ai | 30 | 完成比例乘 5 |
| motion | 动画 | ai | 30 | 完成比例乘 5 |
| ui | UI 效果 | human | 25 | 1–5 整体评价 |
| overall | 整体效果 | human | 15 | 1–5 整体评价 |
## 功能标准
| ID | 评分维度 | 要求 | 怎么查 |
|---|---|---|---|
| runnable | reliability | 可运行 | 实际执行 |
| moving | motion | 动画 | 观看时序 |
${["浏览器证据", "功能检查证据", "AI 功能评分", "AI 评审", "用户评价"].map((name) => `## ${name}\n\`\`\`json\n[]\n\`\`\``).join("\n")}
## 评测结论
未评测
`;
function fixture() {
  const evaluation = parseProtocol(markdown, "prompt");
  evaluation.browserEvidence = keys.flatMap((key) => ["desktop", "mobile"].map((viewport) => ({
    id: `${key}-${viewport}`, key, viewport, at, fingerprint: digest("old-rubric"), sha256: hashes[key],
    files: [{ path: "assets/evidence/frame.png", kind: "frame", sha256: digest("frame") }]
  })));
  const version = { version: 1, prompt: "prompt", promptPath: "prompts/test/prompt-v1.md",
    evaluationPath: "results/test/v1/evaluation.md", evaluation,
    results: keys.map((key) => ({ key, sha256: hashes[key], url: `results/test/v1/outputs/${key}/out.html` })) };
  const lab = { experiments: [{ id: "test", latestVersion: 1, versions: [version] }] };
  return { evaluation, version, lab };
}
function batch(evaluation, overrides = {}) {
  return { protocol: 4, source: "ai", id: randomUUID(), experiment: "test", version: 1,
    reviewer: "Actual fixture AI", model: "fixture-model", at, fingerprint: evaluation.fingerprint, hashes,
    checks: keys.flatMap((key) => ["desktop", "mobile"].flatMap((viewport) => evaluation.criteria.map((criterion) => ({
      key, viewport, id: criterion.id, status: "pass", evidence: "Synthetic test observation, never published.", refs: [`${key}-${viewport}`]
    })))), ...overrides };
}
function publish(evaluation, input) {
  evaluation.aiReviews.push(input);
  evaluation.records.push(...input.checks.map((check) => ({ ...check, source: "ai", reviewer: input.reviewer,
    model: input.model, session: input.id, at: input.at, fingerprint: evaluation.fingerprint, sha256: hashes[check.key] })));
}
function human(evaluation, overrides = {}) {
  return { protocol: 4, source: "human", id: randomUUID(), experiment: "test", version: 1, key: "one",
    sha256: hashes.one, fingerprint: evaluation.fingerprint, participant: digest("browser-a"),
    reviewer: "Synthetic user", viewport: "desktop", at, revision: 1, scores: { ui: 4, overall: 3 }, comment: "",
    ...overrides };
}
async function temporary(t) {
  const dir = await mkdtemp(join(tmpdir(), "llm-lab-test-"));
  t.after(async () => {
    assert.ok(resolve(dir).startsWith(resolve(tmpdir()) + (process.platform === "win32" ? "\\" : "/")));
    await rm(dir, { recursive: true, force: true });
  });
  return dir;
}

test("protocol freezes experiment-specific weights and 1–3 broad human dimensions", () => {
  const protocol = parseProtocol(markdown, "prompt");
  assert.equal(protocol.dimensions.reduce((sum, item) => sum + item.weight, 0), 100);
  for (const changed of [markdown.replace("| 25 |", "| 24 |"), markdown.replace("| 30 |", "| 0 |"),
    markdown.replace("runnable | reliability", "runnable | ui"), markdown.replace("| moving |", "| runnable |"),
    markdown.replace("：4", "：3")]) assert.throws(() => parseProtocol(changed, "prompt"));
  assert.notEqual(parseProtocol(markdown, "changed prompt").fingerprint, protocol.fingerprint);
  assert.notEqual(parseProtocol(markdown.replace("| 25 |", "| 15 |").replace("| 15 | 1–5 整体评价 |\n##", "| 25 | 1–5 整体评价 |\n##"), "prompt").fingerprint, protocol.fingerprint);
});
test("pending is missing; failure is a real zero; no reweighting without humans", () => {
  const { version, evaluation } = fixture();
  assert.equal(summarizeScore(version, "one").ai, null);
  const input = batch(evaluation);
  input.checks.forEach((item) => { item.status = "fail"; });
  publish(evaluation, input);
  assert.equal(summarizeScore(version, "one").ai, 0);
  assert.equal(summarizeScore(version, "one").total, null);
  evaluation.humanReviews.push(human(evaluation));
  assert.equal(summarizeScore(version, "one").total, 29);
});
test("weighted total uses worse viewport, not desktop alone", () => {
  const { version, evaluation } = fixture();
  const input = batch(evaluation);
  input.checks.find((item) => item.key === "one" && item.id === "moving" && item.viewport === "mobile").status = "partial";
  publish(evaluation, input);
  evaluation.humanReviews.push(human(evaluation));
  const score = summarizeScore(version, "one");
  assert.equal(score.ai, 75);
  assert.equal(score.human, 72.5);
  assert.equal(score.total, 74);
  evaluation.records.find((item) => item.key === "one" && item.id === "moving").status = "pending";
  assert.equal(summarizeScore(version, "one").total, null);
});
test("latest AI per reviewer/model/viewport and multiple judges average equally", () => {
  const { version, evaluation } = fixture();
  publish(evaluation, batch(evaluation));
  const second = batch(evaluation, { reviewer: "Second AI", model: "other" });
  second.checks.forEach((item) => { item.status = "fail"; });
  publish(evaluation, second);
  assert.equal(summarizeScore(version, "one").ai, 50);
  const updated = batch(evaluation, { reviewer: "Second AI", model: "other", at: "2026-10-11T09:00:00Z" });
  updated.checks.forEach((item) => { item.status = "partial"; });
  publish(evaluation, updated);
  assert.equal(summarizeScore(version, "one").ai, 75);
});
test("one browser counts once across nickname and viewport changes; revision wins over clock", () => {
  const { version, evaluation } = fixture();
  evaluation.humanReviews.push(human(evaluation, { at: "2026-10-12T08:00:00Z" }));
  const update = human(evaluation, { reviewer: "New nickname", viewport: "mobile", revision: 2, scores: { ui: 1, overall: 5 } });
  const other = human(evaluation, { participant: digest("browser-b"), scores: { ui: 5, overall: 5 } });
  const score = summarizeScore(version, "one", [update, other]);
  assert.equal(score.count, 2);
  assert.equal(score.dimensions.find((item) => item.id === "ui").score, 3);
  assert.equal(score.human, 75);
  assert.equal(latestBy([update, update], (item) => item.participant).length, 1);
  assert.equal(summarizeScore(version, "one", [human(evaluation, { fingerprint: digest("stale") })]).count, 1);
});
test("human validation rejects source forgery, stale data, invalid scores and revisions", () => {
  const { evaluation } = fixture();
  validateHumanReview(human(evaluation), evaluation, hashes);
  for (const invalid of [{ source: "ai" }, { scores: { ui: 0, overall: 3 } }, { scores: { ui: 3.5, overall: 2 } },
    { scores: { ui: 3, overall: 2, invented: 5 } }, { scores: null }, { participant: "visitor" },
    { revision: 0 }, { at: "unknown" }, { reviewer: " " }, { comment: "x".repeat(1001) },
    { fingerprint: digest("stale") }, { sha256: digest("changed") }]) {
    assert.throws(() => validateHumanReview(human(evaluation, invalid), evaluation, hashes));
  }
});
test("AI batches require complete observations and matching real evidence", () => {
  const { evaluation } = fixture();
  validateBrowserEvidence(evaluation.browserEvidence, evaluation, hashes);
  const valid = batch(evaluation);
  validateAIReview(valid, evaluation, hashes);
  for (const mutate of [(input) => input.checks.pop(),
    (input) => { input.checks[0] = input.checks[1]; },
    (input) => { input.checks[0].refs = ["two-mobile"]; },
    (input) => { input.checks[0].refs = []; },
    (input) => { input.source = "human"; },
    (input) => { input.at = "2026-10-10T08:00:00Z"; }]) {
    const invalid = structuredClone(valid); mutate(invalid);
    assert.throws(() => validateAIReview(invalid, evaluation, hashes));
  }
  valid.checks[0].status = "pending"; valid.checks[0].refs = [];
  validateAIReview(valid, evaluation, hashes);
  publish(evaluation, valid);
  validateAIRecords(evaluation, hashes);
  evaluation.records[0] = evaluation.records[1];
  assert.throws(() => validateAIRecords(evaluation, hashes), /重复/);
});
test("file store is atomic, persistent, deduplicated and revisioned", async (t) => {
  const dir = await temporary(t), path = join(dir, "reviews.json"), store = new FileReviewStore(path);
  const { evaluation } = fixture(), first = human(evaluation);
  const saved = await store.put("scope", first, "ip");
  assert.equal(saved.revision, 1);
  assert.deepEqual(await store.put("scope", { ...first, comment: "Retry must not duplicate" }, "ip"), saved);
  await Promise.all(Array.from({ length: 8 }, (_, i) => store.put("scope", human(evaluation, { comment: String(i) }), "ip")));
  const restarted = new FileReviewStore(path);
  assert.equal((await restarted.list("scope")).length, 1);
  assert.equal((await restarted.list("scope"))[0].revision, 9);
  const latest = (await restarted.list("scope"))[0];
  assert.deepEqual(await restarted.put("scope", first, "ip"), latest);
  assert.deepEqual((await restarted.list("scope"))[0], latest);
  assert.deepEqual(await restarted.list("other"), []);
});
test("file rate limits reject writes but queue remains usable", async (t) => {
  const store = new FileReviewStore(join(await temporary(t), "reviews.json"));
  const { evaluation } = fixture();
  for (let i = 0; i < 30; i++) await store.put("scope", human(evaluation), "busy-ip");
  await assert.rejects(() => store.put("scope", human(evaluation), "busy-ip"), RateLimited);
  const next = await store.put("scope", human(evaluation), "other-ip");
  assert.equal(next.revision, 31);
});
test("Redis adapter uses authenticated atomic Lua command and never falls back to disk", async () => {
  const { evaluation } = fixture(), review = human(evaluation), calls = [];
  const store = new RedisReviewStore("https://example.invalid", "private-token", async (url, options) => {
    calls.push({ url, ...options });
    const command = JSON.parse(options.body);
    return { ok: true, json: async () => ({ result: command[0] === "HVALS" ? [JSON.stringify(review)] : JSON.stringify({ ...review, revision: 2 }) }) };
  });
  assert.equal((await store.list("scope")).length, 1);
  assert.equal((await store.put("scope", review, "ip")).revision, 2);
  assert.equal(calls[1].headers.Authorization, "Bearer private-token");
  assert.equal(JSON.parse(calls[1].body)[0], "EVAL");
  const command = JSON.parse(calls[1].body);
  assert.equal(command[2], 3);
  assert.equal(command[5], "lab:submissions:scope");
  assert.equal(command[8], `${review.participant}:${review.key}:${review.id}`);
  assert.match(command[1], /HEXISTS/);
  const failed = new RedisReviewStore("https://example.invalid", "token", async () => { throw new Error("offline"); });
  await assert.rejects(() => failed.list("scope"), StorageUnavailable);
  assert.throws(() => productionStore({}), StorageUnavailable);
  const limited = new RedisReviewStore("https://example.invalid", "token",
    async () => ({ ok: true, json: async () => ({ result: "RATE_LIMIT" }) }));
  await assert.rejects(() => limited.put("scope", review, "ip"), RateLimited);
});

async function api(t, options = {}) {
  const { lab, evaluation } = fixture();
  const store = new FileReviewStore(join(await temporary(t), "reviews.json"));
  const handler = createReviewHandler({ lab, store, secret: "test-only-secret", ...options });
  const server = createServer(handler);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}/api/reviews`;
  const query = `${url}?experiment=test&version=1`;
  const initial = await fetch(query);
  const session = await initial.json(), cookie = initial.headers.get("set-cookie")?.split(";")[0];
  const body = { id: randomUUID(), experiment: "test", version: 1, key: "one", sha256: hashes.one,
    fingerprint: evaluation.fingerprint, reviewer: "UI fixture", viewport: "desktop", scores: { ui: 5, overall: 4 }, comment: "" };
  const post = (changes = {}, headers = {}) => fetch(url, { method: "POST", headers: {
    "Content-Type": "application/json", Cookie: cookie ?? "", "X-Review-Token": session.token ?? "", ...headers
  }, body: JSON.stringify({ ...body, ...changes }) });
  return { url, query, session, cookie, body, post, store, handler };
}
test("API persists real submissions, reports scores, supports updates and safe retries", async (t) => {
  const { post, query, cookie, body, store } = await api(t);
  const response = await post();
  assert.equal(response.status, 200);
  const first = await response.json();
  assert.equal(first.submitted.source, "human");
  assert.equal(first.submitted.revision, 1);
  assert.match(first.submitted.participant, /^[a-f0-9]{64}$/);
  assert.equal(first.scores.one.count, 1);
  assert.equal(first.scores.one.human, 92.5);
  assert.equal(first.scores.one.total, null);
  const retry = await (await post()).json();
  assert.deepEqual(retry.submitted, first.submitted);
  const update = await (await post({ id: randomUUID(), reviewer: "Changed", viewport: "mobile", scores: { ui: 1, overall: 1 } })).json();
  assert.equal(update.submitted.revision, 2);
  assert.equal(update.scores.one.count, 1);
  assert.equal(update.scores.one.human, 20);
  const delayedRetry = await (await post()).json();
  assert.deepEqual(delayedRetry.submitted, update.submitted);
  assert.equal(delayedRetry.scores.one.human, 20);
  const secondBrowser = await fetch(query), secondSession = await secondBrowser.json();
  const second = await fetch(query, { method: "POST", headers: { "Content-Type": "application/json",
    Cookie: secondBrowser.headers.get("set-cookie").split(";")[0], "X-Review-Token": secondSession.token },
    body: JSON.stringify({ ...body, id: randomUUID() }) });
  assert.equal((await second.json()).scores.one.count, 2);
  const reload = await fetch(query, { headers: { Cookie: cookie } });
  assert.equal((await reload.json()).own.one.reviewer, "Changed");
  assert.equal((await new FileReviewStore(store.path).read()).reviews["test:v1:" + body.fingerprint] !== undefined, true);
});
test("API rejects CSRF, cross-site, forged identity, outdated fingerprints and invalid input", async (t) => {
  const { post, query } = await api(t);
  assert.equal((await post({}, { "X-Review-Token": "bad" })).status, 403);
  assert.equal((await post({}, { Origin: "https://evil.example" })).status, 403);
  assert.equal((await post({}, { Origin: "null" })).status, 403);
  for (const changes of [{ source: "human" }, { at }, { revision: 1 }, { participant: digest("forged") }, { scores: { ui: 6, overall: 1 } }]) {
    assert.equal((await post(changes)).status, 400);
  }
  assert.equal((await post({ fingerprint: digest("old") })).status, 409);
  assert.equal((await post({ sha256: digest("old artifact") })).status, 409);
  assert.equal((await post({}, { "Content-Type": "text/plain" })).status, 415);
  assert.equal((await fetch(query, { method: "DELETE" })).status, 405);
  assert.equal((await fetch(query.replace("test&", "missing&"))).status, 404);
});
test("API returns 400 for malformed pre-parsed JSON, counts bytes and handles split UTF-8", async (t) => {
  const { handler, body, cookie, session } = await api(t);
  async function invoke(input, chunks = []) {
    const request = Readable.from(chunks);
    Object.assign(request, { method: "POST", url: "/api/reviews", headers: {
      "content-type": "application/json", host: "localhost", cookie, "x-review-token": session.token
    }, ...(input !== undefined ? { body: input } : {}) });
    let output;
    const response = { setHeader() {}, end(value) { output = JSON.parse(value); } };
    await handler(request, response);
    return { status: response.statusCode, output };
  }
  assert.equal((await invoke("{bad")).status, 400);
  assert.equal((await invoke(null)).status, 400);
  assert.equal((await invoke([])).status, 400);
  assert.equal((await invoke({ ...body, comment: "中".repeat(6000) })).status, 413);
  const bytes = Buffer.from(JSON.stringify({ ...body, comment: "中文评价" }));
  const offset = bytes.indexOf(Buffer.from("中")) + 1;
  const result = await invoke(undefined, [bytes.subarray(0, offset), bytes.subarray(offset)]);
  assert.equal(result.status, 200);
  assert.equal(result.output.submitted.comment, "中文评价");
});
test("API missing storage fails honestly and does not claim successful submission", async (t) => {
  const { post, session } = await api(t, { store: null });
  assert.equal(session.available, false);
  const response = await post();
  assert.equal(response.status, 503);
  assert.equal((await response.json()).submitted, undefined);
});

async function importFixture(t) {
  const dir = await temporary(t), { evaluation, version, lab } = fixture();
  const text = replaceJsonSection(markdown, "浏览器证据", evaluation.browserEvidence);
  for (const [path, content] of [["data/lab.json", JSON.stringify(lab)], [version.evaluationPath, text],
    [version.promptPath, "```text\nprompt\n```"], ["assets/evidence/frame.png", "frame"],
    ...version.results.map((item) => [item.url, `raw:${item.key}`])]) {
    await mkdir(join(dir, path, ".."), { recursive: true });
    await writeFile(join(dir, path), content);
  }
  return { dir, evaluation, version, text };
}
test("AI import validates before writing; complete batch publishes records, not extra payload", async (t) => {
  const { dir, evaluation, version, text } = await importFixture(t);
  const input = batch(evaluation, { secret: "do-not-publish" });
  input.checks[0].secret = "nested-do-not-publish";
  importAI(dir, input);
  assert.equal(await readFile(join(dir, version.evaluationPath), "utf8"), text);
  importAI(dir, input, { write: true });
  const output = await readFile(join(dir, version.evaluationPath), "utf8");
  assert.ok(!output.includes("do-not-publish"));
  const parsed = parseProtocol(output, "prompt");
  validateAIRecords(parsed, hashes);
  assert.equal(parsed.records.length, 8);
  assert.throws(() => importAI(dir, input), /已导入/);
  assert.equal(await readFile(join(dir, version.results[0].url), "utf8"), "raw:one");
});
test("human archival is idempotent and rejects stale or revision-colliding records", async (t) => {
  const { dir, evaluation, version } = await importFixture(t);
  const review = human(evaluation, { secret: "do-not-publish" });
  assert.equal(importReview(dir, review).files, 1);
  importReview(dir, review, { write: true });
  assert.ok(!(await readFile(join(dir, version.evaluationPath), "utf8")).includes("do-not-publish"));
  assert.equal(importReview(dir, review, { write: true }).files, 0);
  assert.throws(() => importReview(dir, { ...review, comment: "changed" }), /不一致/);
  assert.throws(() => importReview(dir, human(evaluation)), /修订编号重复/);
  assert.throws(() => importReview(dir, human(evaluation, { fingerprint: digest("old"), revision: 2 })));
  importReview(dir, human(evaluation, { revision: 2 }), { write: true });
  assert.equal(parseProtocol(await readFile(join(dir, version.evaluationPath), "utf8"), "prompt").humanReviews.length, 2);
});
test("both importers read actual Prompt bytes and reject stale generated data or duplicate blocks", async (t) => {
  const { dir, evaluation, version, text } = await importFixture(t);
  const promptPath = join(dir, version.promptPath);
  await writeFile(promptPath, "```text\nchanged prompt\n```");
  assert.throws(() => importReview(dir, human(evaluation), { write: true }));
  assert.throws(() => importAI(dir, batch(evaluation), { write: true }));
  assert.equal(await readFile(join(dir, version.evaluationPath), "utf8"), text);
  await writeFile(promptPath, "```text\nprompt\n```\n```text\nsecond\n```");
  assert.throws(() => importReview(dir, human(evaluation)), /唯一/);
  assert.throws(() => importAI(dir, batch(evaluation)), /唯一/);
});
