import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { POLICY, resolveViewport, validateHumanSession, recordRef } from "../review.js";

export const digest = (value) => createHash("sha256").update(value).digest("hex");
export const artifactDigest = (path) => digest(readFileSync(path));
export const STATUSES = ["pass", "partial", "fail", "pending"];
const date = (value) => typeof value === "string" && Number.isFinite(Date.parse(value));
const name = (value) => typeof value === "string" && value.trim() && value !== "unknown";

export function sections(text) {
  const result = { _head: [] };
  let current = "_head", fenced = false;
  for (const line of text.replace(/\r\n/g, "\n").split("\n")) {
    if (/^```/.test(line)) fenced = !fenced;
    const heading = !fenced && line.match(/^## (.+?)\s*$/);
    if (heading) current = heading[1];
    else (result[current] ??= []).push(line);
  }
  return result;
}
export function tableRows(lines = []) {
  return lines.filter((line) => line.trim().startsWith("|"))
    .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()))
    .filter((cells) => !cells.every((cell) => /^:?-+:?$/.test(cell)));
}
export function jsonSection(parts, name) {
  const block = (parts[name] ?? []).join("\n").match(/```json\s*\n([\s\S]*?)\n```/);
  if (!block) throw new Error(`缺少“${name}”JSON 记录块`);
  const value = JSON.parse(block[1]);
  if (!Array.isArray(value)) throw new Error(`“${name}”记录必须是数组`);
  return value;
}
export function protocolFingerprint(criteria, dimensions, prompt) {
  return digest(JSON.stringify({ protocol: 3, policy: POLICY, criteria, dimensions, prompt: digest(prompt) }));
}
export function parseProtocol(text, prompt) {
  if (!/^- \*\*评测协议\*\*：3\s*$/m.test(text)) throw new Error("仅支持评测协议 3，请统一迁移");
  const parts = sections(text);
  const criteria = tableRows(parts["验收标准"]).slice(1).map(([id, tier, method, text, how]) => ({ id, tier, method, text, how }));
  const dimensions = tableRows(parts["比较维度"]).slice(1).map(([id, name, focus]) => ({ id, name, focus }));
  if (!criteria.some((item) => item.tier === "core") || !dimensions.length) throw new Error("必须定义核心标准和比较维度");
  for (const list of [criteria, dimensions]) {
    const ids = list.map((item) => item.id);
    if (new Set(ids).size !== ids.length || ids.some((id) => !/^[a-z][a-z0-9-]*$/.test(id))) throw new Error("标准 ID 无效或重复");
  }
  for (const item of criteria) {
    if (!["core", "detail"].includes(item.tier) || !["auto", "ai", "human"].includes(item.method) || !item.text || !item.how) throw new Error(`验收标准 ${item.id} 无效`);
  }
  if (dimensions.some((item) => !item.name || !item.focus)) throw new Error("比较维度缺少名称或观察重点");
  return { protocol: 3, policy: POLICY, criteria, dimensions,
    records: jsonSection(parts, "验收记录"), sessions: jsonSection(parts, "人工比较"),
    aiReviews: jsonSection(parts, "AI 评审"), browserEvidence: jsonSection(parts, "浏览器证据"),
    fingerprint: protocolFingerprint(criteria, dimensions, prompt) };
}
export function validateRecord(record, protocol, hashes) {
  const item = protocol.criteria.find((item) => item.id === record?.id);
  if (!item || !STATUSES.includes(record.status)) throw new Error("无效验收记录");
  if (!hashes[record.key] || hashes[record.key] !== record.sha256) throw new Error(`产物指纹不匹配：${record.key}`);
  if (record.fingerprint !== protocol.fingerprint) throw new Error("标准已变更，必须重新验收");
  if (!["auto", "ai", "human"].includes(record.source) ||
      (item.method === "auto" ? record.source !== "auto" : item.method === "human" ? record.source !== "human" : !["ai", "human"].includes(record.source))) throw new Error("检查来源不匹配");
  if (!name(record.reviewer) || !date(record.at) || typeof record.evidence !== "string" ||
      (record.status !== "pending" && !record.evidence.trim())) throw new Error("缺少检查者、日期或证据");
  if (record.source !== "auto" && (!POLICY.viewports.includes(record.viewport) || !name(record.session))) throw new Error("缺少检查视口或会话");
  if (record.source === "ai" && (!name(record.model) || !name(record.family) || record.independentDeclared !== true ||
      !Array.isArray(record.refs) || !record.refs.length)) throw new Error("缺少独立 AI 检查身份或浏览器证据");
}
export function validateRecordSession(record, protocol) {
  if (record.source === "auto") return;
  const batch = (record.source === "ai" ? protocol.aiReviews : protocol.sessions).find((item) => item.id === record.session);
  const answer = record.source === "ai" ? batch?.checks.find((item) => item.key === record.key && item.id === record.id && item.viewport === record.viewport) :
    batch?.assessments[record.key]?.checks[record.id];
  if (!answer || batch.reviewer !== record.reviewer || answer.status !== record.status ||
      (record.source === "human" && batch.viewport !== record.viewport)) throw new Error("记录没有对应的真实来源会话");
  if (record.source === "ai") {
    if (record.model !== batch.model || record.family !== batch.family || record.independentDeclared !== batch.independentDeclared ||
        record.at !== batch.sealedAt || record.evidence !== answer.evidence ||
        JSON.stringify(record.refs) !== JSON.stringify(answer.refs)) throw new Error("AI 记录与封存评审身份、日期或证据不一致");
  } else {
    const reference = protocol.records.find((item) => recordRef(item) === answer.evidenceRef);
    const expectedEvidence = answer.note.trim() || `人工独立观察后确认；引用：${reference?.evidence}`;
    if (record.at !== answer.at || record.evidence !== expectedEvidence ||
        ["evidenceRef", "initialStatus", "revealedAt"].some((field) => record[field] !== answer[field])) throw new Error("人工记录与封存观察日期或证据不一致");
  }
}
export const validateSession = validateHumanSession;

export function validateBrowserEvidence(items, protocol, hashes) {
  const seen = new Set();
  for (const item of items) {
    if (!name(item.id) || seen.has(item.id) || !hashes[item.key] || hashes[item.key] !== item.sha256 || item.fingerprint !== protocol.fingerprint ||
        !["desktop", "mobile", "dpr2", "reduced"].includes(item.viewport) || !date(item.at) || !Array.isArray(item.files) || !item.files.length) throw new Error("浏览器证据指纹或环境无效");
    for (const file of item.files) {
      if (!/^assets\/evidence\/[a-zA-Z0-9/_-]+\.(png|webm)$/.test(file.path) || !/^[a-f0-9]{64}$/.test(file.sha256) || !["frame", "video"].includes(file.kind)) throw new Error("证据媒体路径或指纹无效");
    }
    seen.add(item.id);
  }
}
export function validateAIReview(batch, protocol, hashes) {
  if (!batch || batch.protocol !== 3 || batch.source !== "ai" || batch.fingerprint !== protocol.fingerprint ||
      !name(batch.id) || !name(batch.reviewer) || !name(batch.model) || !name(batch.family) ||
      batch.independentDeclared !== true || !date(batch.sealedAt)) throw new Error("AI 评审协议、身份、独立声明或日期无效");
  if (JSON.stringify(Object.keys(batch.hashes ?? {}).sort()) !== JSON.stringify(Object.keys(hashes).sort()) ||
      Object.keys(hashes).some((key) => batch.hashes[key] !== hashes[key])) throw new Error("AI 评审原始产物不匹配");
  const criteria = protocol.criteria.filter((item) => item.method === "ai");
  const expected = Object.keys(hashes).length * criteria.length * POLICY.viewports.length;
  if (!Array.isArray(batch.checks) || batch.checks.length !== expected || !Array.isArray(batch.comparisons)) throw new Error("AI 必须完整覆盖两视口的全部视觉验收项");
  const seen = new Set();
  const checkRefs = (refs, keys, viewport) => {
    if (!Array.isArray(refs) || !refs.length || keys.some((key) => !refs.some((ref) =>
      protocol.browserEvidence.some((item) => item.id === ref && item.key === key && item.viewport === viewport && item.sha256 === hashes[key])))) throw new Error("AI 缺少当前视口的真实浏览器证据");
    if (refs.some((ref) => !protocol.browserEvidence.some((item) => item.id === ref && keys.includes(item.key)))) throw new Error("AI 引用了无关浏览器证据");
    if (refs.some((ref) => protocol.browserEvidence.some((item) => item.id === ref &&
        Date.parse(item.at) > Date.parse(batch.sealedAt)))) throw new Error("AI 评审封存早于所引用浏览器证据");
  };
  for (const check of batch.checks) {
    const token = `${check.key}|${check.id}|${check.viewport}`;
    if (seen.has(token) || !criteria.some((item) => item.id === check.id) || !hashes[check.key]) throw new Error("AI 检查项重复或无效");
    validateRecord({ ...check, source: "ai", reviewer: batch.reviewer, model: batch.model, family: batch.family,
      independentDeclared: true, session: batch.id, fingerprint: batch.fingerprint, sha256: hashes[check.key], at: batch.sealedAt }, protocol, hashes);
    checkRefs(check.refs, [check.key], check.viewport); seen.add(token);
  }
  const pairs = new Set();
  for (const task of batch.comparisons) {
    const token = `${[task.left, task.right].sort().join("|")}|${task.dimension}|${task.viewport}`;
    if (!hashes[task.left] || !hashes[task.right] || task.left === task.right || pairs.has(token) ||
        !protocol.dimensions.some((item) => item.id === task.dimension) || !POLICY.viewports.includes(task.viewport) ||
        !["left", "right", "tie", "unknown"].includes(task.choice) || !["left", "right", "tie", "unknown"].includes(task.reverseChoice) ||
        !name(task.note) || !date(task.at) || Date.parse(task.at) > Date.parse(batch.sealedAt)) throw new Error("AI 比较无效，须包含反转位置后的归一结论");
    checkRefs(task.refs, [task.left, task.right], task.viewport); pairs.add(token);
  }
}
export function resolveChecks(criteria, records, key) {
  return criteria.map((item) => {
    const related = records.filter((record) => record.key === key && record.id === item.id);
    const viewports = Object.fromEntries((item.method === "auto" ? ["all"] : POLICY.viewports).map((viewport) => [viewport, resolveViewport(item, related, viewport)]));
    const states = Object.values(viewports);
    const status = states.some((state) => state.status === "fail") ? "fail" : states.some((state) => state.status === "pending") ? "pending" :
      states.some((state) => state.status === "partial") ? "partial" : "pass";
    return { ...item, status, viewports, disputed: states.some((state) => state.disputed),
      evidence: [...new Set(states.flatMap((state) => state.evidence))],
      humanReviewed: states.some((state) => state.audited), aiOnly: states.every((state) => state.source === "ai" && state.status !== "pending") };
  });
}
export function acceptanceState(checks) {
  const core = checks.filter((check) => check.tier === "core");
  if (core.some((check) => check.status === "fail")) return "fail";
  if (!core.length || core.some((check) => check.status === "pending")) return "pending";
  return core.some((check) => check.status === "partial") ? "partial" : "pass";
}
export function replaceJsonSection(text, name, records) {
  const expression = new RegExp(`(^## ${name}\\s*\\n[\\s\\S]*?\`\`\`json\\s*\\n)[\\s\\S]*?(\\n\`\`\`)`, "m");
  if (!expression.test(text)) throw new Error(`缺少“${name}”记录块`);
  return text.replace(expression, (_, before, after) => `${before}${JSON.stringify(records, null, 2)}${after}`);
}
