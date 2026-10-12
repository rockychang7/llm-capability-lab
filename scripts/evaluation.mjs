import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { POLICY, POINTS, date, name } from "../review.js";

export const digest = (value) => createHash("sha256").update(value).digest("hex");
export const artifactDigest = (path) => digest(readFileSync(path));
export function readPrompt(path) {
  const text = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const blocks = [...text.matchAll(/^```text[ \t]*\n([\s\S]*?)\n```[ \t]*$/gm)];
  if (blocks.length !== 1) throw new Error("Prompt 必须有唯一 text 原文代码块");
  return blocks[0][1];
}
export const STATUSES = ["pass", "partial", "fail", "scored", "pending"];
export function sections(text) {
  const result = { _head: [] };
  let current = "_head", fenced = false;
  for (const line of text.replace(/\r\n/g, "\n").split("\n")) {
    if (/^```/.test(line)) fenced = !fenced;
    const heading = !fenced && line.match(/^## (.+?)\s*$/);
    if (heading) {
      current = heading[1];
      if (Object.hasOwn(result, current)) throw new Error(`重复章节：${current}`);
      result[current] = [];
    } else (result[current] ??= []).push(line);
  }
  return result;
}
export function tableRows(lines = []) {
  return lines.filter((line) => line.trim().startsWith("|"))
    .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()))
    .filter((cells) => !cells.every((cell) => /^:?-+:?$/.test(cell)));
}
export function jsonSection(parts, name) {
  const blocks = [...(parts[name] ?? []).join("\n").matchAll(/```json\s*\n([\s\S]*?)\n```/g)];
  if (blocks.length !== 1) throw new Error(`“${name}”必须有唯一 JSON 记录块`);
  const value = JSON.parse(blocks[0][1]);
  if (!Array.isArray(value)) throw new Error(`“${name}”记录必须是数组`);
  return value;
}
export function protocolFingerprint(criteria, dimensions, prompt) {
  return digest(JSON.stringify({ protocol: 5, policy: POLICY, criteria, dimensions, prompt: digest(prompt) }));
}
export function parseProtocol(text, prompt) {
  if (!/^- \*\*评测协议\*\*：5\s*$/m.test(text)) throw new Error("仅支持评测协议 5");
  const parts = sections(text);
  if (parts["用户评价"]) throw new Error("协议 5 不接受人工评分章节");
  const dimensions = tableRows(parts["评分维度"]).slice(1).map(([id, name, kind, weight, rubric]) =>
    ({ id, name, kind, weight: Number(weight), rubric }));
  const criteria = tableRows(parts["评分细则"]).slice(1).map(([id, dimension, text, how]) => ({ id, dimension, text, how }));
  for (const list of [criteria, dimensions]) {
    const ids = list.map((item) => item.id);
    if (!ids.length || new Set(ids).size !== ids.length || ids.some((id) => !/^[a-z][a-z0-9-]*$/.test(id))) throw new Error("标准 ID 无效或重复");
  }
  if (dimensions.some((item) => !name(item.name) || !name(item.rubric) || !["objective", "taste"].includes(item.kind) ||
      !Number.isInteger(item.weight) || item.weight <= 0) || dimensions.reduce((sum, item) => sum + item.weight, 0) !== 100) {
    throw new Error("维度权重必须是正整数且合计为 100");
  }
  if (!dimensions.some((item) => item.kind === "objective") || !dimensions.some((item) => item.kind === "taste")) {
    throw new Error("必须同时包含确定性与品味维度，全部由 Agent 评分");
  }
  if (criteria.some((item) => !dimensions.some((dimension) => dimension.id === item.dimension) || !name(item.text) || !name(item.how)) ||
      dimensions.some((item) => !criteria.some((criterion) => criterion.dimension === item.id))) throw new Error("每项须归属有效维度，每个维度须有细则");
  return { protocol: 5, policy: POLICY, criteria, dimensions, fingerprint: protocolFingerprint(criteria, dimensions, prompt),
    records: jsonSection(parts, "AI 评分"), aiReviews: jsonSection(parts, "AI 评审"), browserEvidence: jsonSection(parts, "浏览器证据"),
    facts: jsonSection(parts, "功能检查证据") };
}
export function validateBrowserEvidence(items, protocol, hashes) {
  const seen = new Set();
  for (const item of items) {
    // Capture provenance stays immutable when media supports a newly frozen rubric.
    if (!name(item.id) || seen.has(item.id) || !hashes[item.key] || hashes[item.key] !== item.sha256 ||
        !/^[a-f0-9]{64}$/.test(item.fingerprint) || !["desktop", "mobile", "dpr2", "reduced"].includes(item.viewport) ||
        !date(item.at) || !Array.isArray(item.files) || !item.files.length) throw new Error("浏览器证据指纹或环境无效");
    for (const file of item.files) {
      if (!/^assets\/evidence\/[a-zA-Z0-9/_-]+\.(png|webm)$/.test(file.path) || !/^[a-f0-9]{64}$/.test(file.sha256) ||
          !["frame", "video"].includes(file.kind)) throw new Error("证据媒体路径或指纹无效");
    }
    seen.add(item.id);
  }
}
export function validateRecord(record, protocol, hashes) {
  const criterion = protocol.criteria.find((item) => item.id === record?.id);
  const kind = protocol.dimensions.find((item) => item.id === criterion?.dimension)?.kind;
  const validScore = kind === "objective" ? Object.hasOwn(POINTS, record?.status) && record.score === POINTS[record.status] :
    record?.status === "pending" ? record.score === null : record?.status === "scored" && typeof record.score === "number" &&
      Number.isFinite(record.score) && record.score >= 0 && record.score <= POLICY.scale && record.score % POLICY.tasteStep === 0;
  if (!criterion || !validScore || !STATUSES.includes(record.status) || record.source !== "ai" ||
      hashes[record.key] !== record.sha256 || !hashes[record.key] || record.fingerprint !== protocol.fingerprint ||
      !name(record.reviewer) || !name(record.model) || !name(record.session) || !date(record.at) ||
      !POLICY.viewports.includes(record.viewport) || typeof record.evidence !== "string" ||
      !record.evidence.trim() || !Array.isArray(record.refs) || (record.status !== "pending" && !record.refs.length)) throw new Error("AI 评分身份、标准、证据或产物无效");
}
export function validateAIReview(batch, protocol, hashes) {
  const selected = Object.keys(batch?.hashes ?? {});
  if (!batch || batch.protocol !== 5 || batch.source !== "ai" || batch.fingerprint !== protocol.fingerprint ||
      !name(batch.id) || !name(batch.reviewer) || !name(batch.model) || !date(batch.at) ||
      !selected.length || selected.some((key) => !hashes[key] || batch.hashes[key] !== hashes[key])) throw new Error("AI 评审身份、日期或产物无效");
  if (!Array.isArray(batch.checks) || batch.checks.length !== selected.length * protocol.criteria.length * POLICY.viewports.length) {
    throw new Error("AI 必须完整覆盖所选产物的全部细则和两个视口；未观察项明确 pending");
  }
  const seen = new Set();
  for (const check of batch.checks) {
    const token = `${check.key}|${check.id}|${check.viewport}`;
    if (!selected.includes(check.key)) throw new Error("AI 检查超出所选产物");
    if (seen.has(token)) throw new Error("AI 功能标准重复");
    validateRecord({ ...check, source: "ai", reviewer: batch.reviewer, model: batch.model, session: batch.id,
      at: batch.at, fingerprint: batch.fingerprint, sha256: hashes[check.key] }, protocol, hashes);
    const cited = check.refs.map((ref) => protocol.browserEvidence.find((item) => item.id === ref));
    if (new Set(check.refs).size !== check.refs.length || cited.some((item) => !item || item.key !== check.key ||
      (item.viewport !== check.viewport && !["dpr2", "reduced"].includes(item.viewport)) ||
      (item.harnessError && check.status !== "pending") || item.sha256 !== hashes[check.key] ||
      Date.parse(item.at) > Date.parse(batch.at)) ||
      (check.status !== "pending" && !cited.some((item) => item.viewport === check.viewport))) {
      throw new Error("AI 引用了错误视口、错误产物、采集失败或未来证据；必须包含本视口证据");
    }
    seen.add(token);
  }
}
export function validateRecordSession(record, protocol) {
  const batch = protocol.aiReviews.find((item) => item.id === record.session);
  const check = batch?.checks.find((item) => item.key === record.key && item.id === record.id && item.viewport === record.viewport);
  if (!check || batch.reviewer !== record.reviewer || batch.model !== record.model || batch.at !== record.at ||
      check.status !== record.status || check.score !== record.score || check.evidence !== record.evidence || JSON.stringify(check.refs) !== JSON.stringify(record.refs)) {
    throw new Error("AI 评分与真实评审批次不一致");
  }
}
export function validateAIRecords(protocol, hashes) {
  const seen = new Set();
  for (const record of protocol.records) {
    validateRecord(record, protocol, hashes);
    validateRecordSession(record, protocol);
    const token = JSON.stringify([record.session, record.key, record.id, record.viewport]);
    if (seen.has(token)) throw new Error("AI 评分记录重复");
    seen.add(token);
  }
  if (seen.size !== protocol.aiReviews.reduce((sum, batch) => sum + batch.checks.length, 0)) {
    throw new Error("AI 评审与评分记录数量不匹配");
  }
}
export function replaceJsonSection(text, name, records) {
  const expression = new RegExp(`(^## ${name}\\s*\\n[\\s\\S]*?\`\`\`json\\s*\\n)[\\s\\S]*?(\\n\`\`\`)`, "m");
  if (!expression.test(text)) throw new Error(`缺少“${name}”记录块`);
  return text.replace(expression, (_, before, after) => `${before}${JSON.stringify(records, null, 2)}${after}`);
}
