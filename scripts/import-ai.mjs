import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { artifactDigest, parseProtocol, validateAIReview, validateBrowserEvidence, replaceJsonSection } from "./evaluation.mjs";

export function importAI(root, input, { write = false, mapping = null } = {}) {
  const batch = structuredClone(input);
  if (mapping) {
    const keys = Object.fromEntries(Object.entries(mapping.aliases).map(([key, alias]) => [alias, key]));
    batch.hashes = Object.fromEntries(Object.entries(batch.hashes).map(([alias, hash]) => [keys[alias] ?? alias, hash]));
    for (const check of batch.checks) {
      check.key = keys[check.key] ?? check.key;
      check.refs = check.refs.map((ref) => mapping.refs[ref] ?? ref);
    }
    for (const task of batch.comparisons) {
      task.left = keys[task.left] ?? task.left; task.right = keys[task.right] ?? task.right;
      task.refs = task.refs.map((ref) => mapping.refs[ref] ?? ref);
    }
  }
  const lab = JSON.parse(readFileSync(resolve(root, "data/lab.json"), "utf8"));
  const experiment = lab.experiments.find((item) => item.id === batch.experiment);
  const version = experiment?.versions.find((item) => item.version === batch.version);
  if (!version?.evaluationPath) throw new Error("未知实验版本");
  const path = resolve(root, version.evaluationPath);
  let text = readFileSync(path, "utf8");
  const promptText = readFileSync(resolve(root, version.promptPath), "utf8").replace(/\r\n/g, "\n");
  const prompt = promptText.match(/^```text[ \t]*\n([\s\S]*?)\n```[ \t]*$/m)?.[1];
  if (prompt === undefined) throw new Error("缺少 Prompt 原文");
  const protocol = parseProtocol(text, prompt);
  const hashes = Object.fromEntries(version.results.map((item) => [item.key, artifactDigest(resolve(root, item.url))]));
  validateBrowserEvidence(protocol.browserEvidence, protocol, hashes);
  for (const item of protocol.browserEvidence) for (const file of item.files) {
    if (artifactDigest(resolve(root, file.path)) !== file.sha256) throw new Error("浏览器证据媒体已变化");
  }
  validateAIReview(batch, protocol, hashes);
  if ([...protocol.aiReviews, ...protocol.sessions].some((item) => item.id === batch.id)) throw new Error("该评审已导入");
  const records = batch.checks.map((item) => ({ ...item, source: "ai", reviewer: batch.reviewer,
    model: batch.model, family: batch.family, independentDeclared: true, session: batch.id,
    at: batch.sealedAt, sha256: hashes[item.key], fingerprint: protocol.fingerprint }));
  // Publish only the validated protocol fields, never arbitrary provider/UI payloads.
  const published = Object.fromEntries(["protocol", "source", "id", "experiment", "version", "fingerprint",
    "reviewer", "model", "family", "independentDeclared", "hashes", "sealedAt", "checks", "comparisons"].map((key) => [key, batch[key]]));
  text = replaceJsonSection(text, "验收记录", [...protocol.records, ...records]);
  text = replaceJsonSection(text, "AI 评审", [...protocol.aiReviews, published]);
  if (write) writeFileSync(path, text);
  return { path, text, checks: records.length };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const file = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
    if (!file) throw new Error("用法：node scripts/import-ai.mjs <AI封存批次.json> [--write]");
    const mappingPath = process.argv.find((arg) => arg.startsWith("--mapping="))?.slice(10);
    const result = importAI(resolve(import.meta.dirname, ".."), JSON.parse(readFileSync(file, "utf8")), {
      write: process.argv.includes("--write"), mapping: mappingPath ? JSON.parse(readFileSync(mappingPath, "utf8")) : null });
    console.log(`ok    ${process.argv.includes("--write") ? "已导入" : "校验通过，未写入"} ${result.checks} 项 AI 观察；请重新 build`);
  } catch (error) { console.error(`error ${error.message}`); process.exitCode = 1; }
}
