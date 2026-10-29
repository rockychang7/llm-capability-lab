import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { POLICY, POINTS, date, name } from "../review.js";

export const PROTOCOL = 6;
export const digest = (value) => createHash("sha256").update(value).digest("hex");
export const artifactDigest = (path) => digest(readFileSync(path));
export function readPrompt(path) {
  const text = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const blocks = [...text.matchAll(/^```text[ \t]*\n([\s\S]*?)\n```[ \t]*$/gm)];
  if (blocks.length !== 1) throw new Error("Prompt 必须有唯一 text 原文代码块");
  return blocks[0][1];
}
export const STATUSES = ["pass", "partial", "fail", "scored", "pending"];
export const JUDGES = { "脚本": "script", "AI": "ai" };
export const MEDIA = /^assets\/evidence\/[a-zA-Z0-9/_-]+\.(png|jpg)$/;
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
  return digest(JSON.stringify({ protocol: PROTOCOL, policy: POLICY, criteria, dimensions, prompt: digest(prompt) }));
}
export function parseProtocol(text, prompt) {
  if (!new RegExp(`^- \\*\\*评测协议\\*\\*：${PROTOCOL}\\s*$`, "m").test(text)) throw new Error(`仅支持评测协议 ${PROTOCOL}`);
  const parts = sections(text);
  for (const legacy of ["用户评价", "AI 评分", "浏览器证据", "功能检查证据"]) {
    if (parts[legacy]) throw new Error(`协议 ${PROTOCOL} 不接受旧章节：${legacy}`);
  }
  const dimensions = tableRows(parts["评分维度"]).slice(1).map(([id, name, kind, weight, rubric]) =>
    ({ id, name, kind, weight: Number(weight), rubric }));
  const criteria = tableRows(parts["评分细则"]).slice(1).map(([id, dimension, judge, text, how]) =>
    ({ id, dimension, by: JUDGES[judge], text, how }));
  for (const list of [criteria, dimensions]) {
    const ids = list.map((item) => item.id);
    if (!ids.length || new Set(ids).size !== ids.length || ids.some((id) => !/^[a-z][a-z0-9-]*$/.test(id))) throw new Error("标准 ID 无效或重复");
  }
  if (dimensions.some((item) => !name(item.name) || !name(item.rubric) || !["objective", "taste"].includes(item.kind) ||
      !Number.isInteger(item.weight) || item.weight <= 0) || dimensions.reduce((sum, item) => sum + item.weight, 0) !== 100) {
    throw new Error("维度权重必须是正整数且合计为 100");
  }
  if (!dimensions.some((item) => item.kind === "objective") || !dimensions.some((item) => item.kind === "taste")) {
    throw new Error("必须同时包含确定性与品味维度");
  }
  const kindOf = (item) => dimensions.find((dimension) => dimension.id === item.dimension)?.kind;
  if (criteria.some((item) => !kindOf(item) || !item.by || !name(item.text) || !name(item.how) ||
      (kindOf(item) === "taste" && item.by !== "ai")) ||
      dimensions.some((item) => !criteria.some((criterion) => criterion.dimension === item.id))) {
    throw new Error("每项须归属有效维度并标明脚本或 AI 判定；品味只能由 AI 判定；每个维度须有细则");
  }
  if (!criteria.some((item) => item.by === "ai")) throw new Error("至少需要一项 AI 细则");
  return { protocol: PROTOCOL, policy: POLICY, criteria, dimensions, fingerprint: protocolFingerprint(criteria, dimensions, prompt),
    autoChecks: jsonSection(parts, "自动检查"), aiReviews: jsonSection(parts, "AI 评审") };
}
const kindOf = (protocol, criterion) => protocol.dimensions.find((item) => item.id === criterion?.dimension)?.kind;
export function validateAutoChecks(items, protocol, hashes) {
  const seen = new Set();
  const scripted = protocol.criteria.filter((item) => item.by === "script").map((item) => item.id);
  for (const item of items) {
    const ids = (item.results ?? []).map((result) => result.id);
    if (!name(item.id) || seen.has(item.id) || !hashes[item.key] || hashes[item.key] !== item.sha256 ||
        item.fingerprint !== protocol.fingerprint || !date(item.at) || !name(item.checker) ||
        !Array.isArray(item.results) || ids.length !== scripted.length || scripted.some((id) => !ids.includes(id)) ||
        item.results.some((result) => !["pass", "partial", "fail", "pending"].includes(result.status) ||
          typeof result.evidence !== "string" || !result.evidence.trim()) ||
        !Array.isArray(item.files)) throw new Error("自动检查记录的产物、标准指纹或脚本细则覆盖无效");
    for (const file of item.files) {
      if (!MEDIA.test(file.path) || !/^[a-f0-9]{64}$/.test(file.sha256) || !["sheet", "frame"].includes(file.kind) ||
          !["desktop", "mobile"].includes(file.viewport)) throw new Error("证据媒体路径、类型或指纹无效");
    }
    seen.add(item.id);
  }
}
export function validateCheck(check, protocol) {
  const criterion = protocol.criteria.find((item) => item.id === check?.id && item.by === "ai");
  const kind = kindOf(protocol, criterion);
  const validScore = check?.status === "pending" ? check.score === null :
    kind === "objective" ? ["pass", "partial", "fail"].includes(check?.status) && check.score === POINTS[check.status] :
      check?.status === "scored" && typeof check.score === "number" && Number.isFinite(check.score) &&
        check.score >= 0 && check.score <= POLICY.scale && check.score % POLICY.tasteStep === 0;
  // A plain pass needs no essay; anything else must say what was seen.
  const needsNote = check?.status !== "pass";
  if (!criterion || !validScore || typeof check.note !== "string" || (needsNote && !check.note.trim())) {
    throw new Error("AI 细则、状态分数或说明无效：非通过项必须写一句依据");
  }
}
export function validateAIReview(batch, protocol, hashes) {
  const selected = Object.keys(batch?.hashes ?? {});
  if (!batch || batch.protocol !== PROTOCOL || batch.source !== "ai" || batch.fingerprint !== protocol.fingerprint ||
      !name(batch.id) || !name(batch.reviewer) || !name(batch.model) || !date(batch.at) ||
      !selected.length || selected.some((key) => !hashes[key] || batch.hashes[key] !== hashes[key])) throw new Error("AI 评审身份、日期或产物无效");
  const aiCriteria = protocol.criteria.filter((item) => item.by === "ai");
  if (!Array.isArray(batch.checks) || batch.checks.length !== selected.length * aiCriteria.length) {
    throw new Error("AI 必须覆盖所选产物的全部 AI 细则；没看到的明确 pending");
  }
  const seen = new Set();
  for (const check of batch.checks) {
    const token = `${check.key}|${check.id}`;
    if (!selected.includes(check.key)) throw new Error("AI 检查超出所选产物");
    if (seen.has(token)) throw new Error("AI 细则重复");
    validateCheck(check, protocol);
    seen.add(token);
  }
  const cited = (batch.evidence ?? []).map((id) => protocol.autoChecks.find((item) => item.id === id));
  if (!Array.isArray(batch.evidence) || new Set(batch.evidence).size !== batch.evidence.length ||
      cited.some((item) => !item || !selected.includes(item.key) || item.sha256 !== hashes[item.key] ||
        Date.parse(item.at) > Date.parse(batch.at)) ||
      selected.some((key) => batch.checks.some((check) => check.key === key && check.status !== "pending") &&
        !cited.some((item) => item.key === key && item.files.length))) {
    throw new Error("AI 评审必须引用本产物此前已采集的自动检查截图");
  }
}
export function replaceJsonSection(text, name, records) {
  const expression = new RegExp(`(^## ${name}\\s*\\n[\\s\\S]*?\`\`\`json\\s*\\n)[\\s\\S]*?(\\n\`\`\`)`, "m");
  if (!expression.test(text)) throw new Error(`缺少“${name}”记录块`);
  return text.replace(expression, (_, before, after) => `${before}${JSON.stringify(records, null, 2)}${after}`);
}
