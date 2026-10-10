import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { artifactDigest, parseProtocol, validateSession, replaceJsonSection } from "./evaluation.mjs";

export function importReview(root, session, { write = false } = {}) {
  const lab = JSON.parse(readFileSync(resolve(root, "data/lab.json"), "utf8"));
  const experiment = lab.experiments.find((item) => item.id === session.experiment);
  const version = experiment?.versions.find((item) => item.version === session.version);
  if (!version?.evaluationPath) throw new Error("找不到该会话的实验版本");
  const path = resolve(root, version.evaluationPath);
  let text = readFileSync(path, "utf8");
  const promptText = readFileSync(resolve(root, version.promptPath), "utf8").replace(/\r\n/g, "\n");
  const prompt = promptText.match(/^```text[ \t]*\n([\s\S]*?)\n```[ \t]*$/m)?.[1];
  if (prompt === undefined) throw new Error("Prompt 缺少唯一 text 原文代码块");
  const protocol = parseProtocol(text, prompt);
  const hashes = Object.fromEntries(version.results.map((result) => [result.key, artifactDigest(resolve(root, result.url))]));
  validateSession(session, protocol, hashes);
  if (protocol.sessions.some((item) => item.id === session.id)) throw new Error("该会话已经导入，不能重复计数");
  const records = [...protocol.records];
  for (const key of session.order) {
    for (const item of protocol.criteria.filter((item) => item.method === "human")) {
      const answer = session.assessments[key].checks[item.id];
      records.push({
        key, id: item.id, status: answer.status, source: "human", reviewer: session.reviewer,
        at: session.sealedAt, sha256: hashes[key], fingerprint: protocol.fingerprint,
        evidence: `${answer.note.trim()}（${session.viewport}；会话 ${session.id}）`, session: session.id, viewport: session.viewport
      });
    }
  }
  // Only protocol fields enter the canonical document; local UI state is not published.
  const { phase, index, ...published } = session;
  text = replaceJsonSection(text, "验收记录", records);
  text = replaceJsonSection(text, "人工比较", [...protocol.sessions, published]);
  if (write) writeFileSync(path, text);
  return { path, text, records: records.length, comparisons: session.tasks.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const file = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
    if (!file) throw new Error("用法：node scripts/import-review.mjs <封存记录.json> [--write]（默认只校验）");
    const result = importReview(resolve(import.meta.dirname, ".."), JSON.parse(readFileSync(file, "utf8")), { write: process.argv.includes("--write") });
    console.log(`ok    ${process.argv.includes("--write") ? "已导入" : "校验通过，未写入"}：${result.comparisons} 条比较；${result.path}`);
    if (process.argv.includes("--write")) console.log("请运行 npm run build，再检查评测文件并提交发布。");
  } catch (error) { console.error(`error ${error.message}`); process.exitCode = 1; }
}
