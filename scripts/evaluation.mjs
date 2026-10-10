import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

export const digest = (value) => createHash("sha256").update(value).digest("hex");
export const artifactDigest = (path) => digest(readFileSync(path));
export const STATUSES = ["pass", "partial", "fail", "pending"];

export function sections(text) {
  const result = { _head: [] };
  let current = "_head";
  let fenced = false;
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
  const text = (parts[name] ?? []).join("\n");
  const block = text.match(/```json\s*\n([\s\S]*?)\n```/);
  if (!block) throw new Error(`缺少“${name}”JSON 记录块`);
  return JSON.parse(block[1]);
}

export function protocolFingerprint(criteria, dimensions, prompt) {
  return digest(JSON.stringify({ protocol: 2, criteria, dimensions, prompt: digest(prompt) }));
}

export function parseProtocol(text, prompt) {
  const parts = sections(text);
  const criteria = tableRows(parts["验收标准"]).slice(1).map(([id, tier, method, text, how]) => ({
    id, tier, method, text, how
  }));
  const dimensions = tableRows(parts["比较维度"]).slice(1).map(([id, name, focus]) => ({ id, name, focus }));
  if (!criteria.length || !criteria.some((item) => item.tier === "core")) throw new Error("必须定义核心验收标准");
  if (!dimensions.length) throw new Error("必须定义比较维度");
  for (const list of [criteria, dimensions]) {
    const ids = list.map((item) => item.id);
    if (new Set(ids).size !== ids.length || ids.some((id) => !/^[a-z][a-z0-9-]*$/.test(id))) throw new Error("标准 ID 无效或重复");
  }
  for (const item of criteria) {
    if (!["core", "detail"].includes(item.tier) || !["auto", "human"].includes(item.method) || !item.text || !item.how) {
      throw new Error(`验收标准 ${item.id} 无效`);
    }
  }
  if (dimensions.some((item) => !item.name || !item.focus)) throw new Error("比较维度必须填写名称和观察重点");
  const records = jsonSection(parts, "验收记录");
  const sessions = jsonSection(parts, "人工比较");
  if (!Array.isArray(records) || !Array.isArray(sessions)) throw new Error("评测记录必须是数组");
  return { protocol: 2, criteria, dimensions, records, sessions, fingerprint: protocolFingerprint(criteria, dimensions, prompt) };
}

export function validateRecord(record, protocol, hashes) {
  if (!record || typeof record !== "object") throw new Error("无效验收记录");
  const item = protocol.criteria.find((item) => item.id === record.id);
  if (!item || !STATUSES.includes(record.status)) throw new Error(`无效验收记录：${record.key}/${record.id}`);
  if (!hashes[record.key] || hashes[record.key] !== record.sha256) throw new Error(`产物指纹不匹配：${record.key}`);
  if (record.fingerprint !== protocol.fingerprint) throw new Error(`标准已变更，必须重新验收：${record.key}/${record.id}`);
  if (!["auto", "human"].includes(record.source) || record.source !== item.method) throw new Error(`检查来源不匹配：${record.id}`);
  if (typeof record.evidence !== "string" || (record.status !== "pending" && !record.evidence.trim())) throw new Error(`缺少证据：${record.id}`);
  if (typeof record.reviewer !== "string" || !record.reviewer.trim() || record.reviewer === "unknown") throw new Error("缺少检查者");
  if (typeof record.at !== "string" || !Number.isFinite(Date.parse(record.at))) throw new Error("检查日期无效");
  if (record.viewport !== undefined && !["desktop", "mobile"].includes(record.viewport)) throw new Error("检查视口无效");
}

export function validateSession(session, protocol, hashes, { sealed = true } = {}) {
  if (!session || typeof session !== "object") throw new Error("无效比较会话");
  if (session.protocol !== 2 || session.fingerprint !== protocol.fingerprint) throw new Error("比较记录的评测协议或标准已过期");
  if (typeof session.id !== "string" || !session.id.trim() || typeof session.reviewer !== "string" ||
      !session.reviewer.trim() || session.reviewer === "unknown") throw new Error("缺少会话 ID 或评测者");
  if (sealed && (typeof session.sealedAt !== "string" || !Number.isFinite(Date.parse(session.sealedAt)))) throw new Error("只接受已封存的记录");
  if (!["desktop", "mobile"].includes(session.viewport) || typeof session.blindDeclared !== "boolean") throw new Error("比较环境或匿名声明无效");
  const keys = Object.keys(hashes).sort();
  if (JSON.stringify(Object.keys(session.hashes ?? {}).sort()) !== JSON.stringify(keys) ||
      keys.some((key) => session.hashes[key] !== hashes[key])) throw new Error("比较记录不属于当前这批原始产物");
  if (!Array.isArray(session.order) || session.order.length !== keys.length || new Set(session.order).size !== keys.length ||
      session.order.some((key) => !keys.includes(key))) throw new Error("匿名产物顺序无效");
  const manual = protocol.criteria.filter((item) => item.method === "human");
  for (const key of keys) {
    const assessment = session.assessments?.[key];
    if (assessment?.observed !== true) throw new Error(`尚未确认完整观看：${key}`);
    for (const item of manual) {
      const answer = assessment.checks?.[item.id];
      if (!answer || !STATUSES.includes(answer.status) || typeof answer.note !== "string" || !answer.note.trim()) {
        throw new Error(`尚未填写验收结论及依据：${key}/${item.id}`);
      }
    }
  }
  const expected = keys.length * (keys.length - 1) / 2 * protocol.dimensions.length;
  if (!Array.isArray(session.tasks) || session.tasks.length !== expected) throw new Error("比较任务数量不完整");
  const seen = new Set();
  for (const task of session.tasks) {
    if (!task || typeof task !== "object") throw new Error("无效比较任务");
    if (!keys.includes(task.left) || !keys.includes(task.right) || task.left === task.right ||
        !protocol.dimensions.some((item) => item.id === task.dimension)) throw new Error("比较对象或维度无效");
    const key = `${[task.left, task.right].sort().join("|")}|${task.dimension}`;
    if (seen.has(key)) throw new Error("重复的成对比较");
    seen.add(key);
    if (!["left", "right", "tie", "unknown"].includes(task.choice) || typeof task.note !== "string" || !task.note.trim()) {
      throw new Error("比较尚未完成或缺少观察依据");
    }
    if (typeof task.at !== "string" || !Number.isFinite(Date.parse(task.at))) throw new Error("比较日期无效");
    if (sealed && Date.parse(task.at) > Date.parse(session.sealedAt)) throw new Error("比较时间不能晚于封存时间");
  }
}

// Keep each viewport independent; conflicts are not averaged away.
export function resolveChecks(criteria, records, key) {
  return criteria.map((item) => {
    const latest = new Map();
    for (const record of records.filter((record) => record.key === key && record.id === item.id)) {
      const reviewer = JSON.stringify([record.reviewer, record.viewport ?? "all"]);
      const previous = latest.get(reviewer);
      if (!previous || Date.parse(record.at) >= Date.parse(previous.at)) latest.set(reviewer, record);
    }
    const evidence = [...latest.values()];
    const states = new Set(evidence.map((record) => record.status));
    return { ...item, status: states.size === 1 ? evidence[0].status : "pending", disputed: states.size > 1, evidence };
  });
}

export function acceptanceState(checks) {
  const core = checks.filter((check) => check.tier === "core");
  if (!core.length) return "pending";
  if (core.some((check) => check.status === "fail")) return "fail";
  if (core.some((check) => check.status === "pending")) return "pending";
  if (core.some((check) => check.status === "partial")) return "partial";
  return "pass";
}

export function replaceJsonSection(text, name, records) {
  const expression = new RegExp(`(^## ${name}\\s*\\n[\\s\\S]*?\`\`\`json\\s*\\n)[\\s\\S]*?(\\n\`\`\`)`, "m");
  if (!expression.test(text)) throw new Error(`缺少“${name}”记录块`);
  return text.replace(expression, (_, before, after) => `${before}${JSON.stringify(records, null, 2)}${after}`);
}
