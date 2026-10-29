import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { artifactDigest, readPrompt, parseProtocol, validateAIReview, validateAutoChecks, replaceJsonSection } from "./evaluation.mjs";

export function importAI(root, input, { write = false } = {}) {
  const batch = structuredClone(input);
  const lab = JSON.parse(readFileSync(resolve(root, "data/lab.json"), "utf8"));
  const experiment = lab.experiments.find((item) => item.id === batch.experiment);
  const version = experiment?.versions.find((item) => item.version === batch.version);
  if (!version?.evaluationPath) throw new Error("未知实验版本");
  const path = resolve(root, version.evaluationPath);
  let text = readFileSync(path, "utf8");
  const prompt = readPrompt(resolve(root, version.promptPath));
  const protocol = parseProtocol(text, prompt);
  const hashes = Object.fromEntries(version.results.map((item) => [item.key, artifactDigest(resolve(root, item.url))]));
  validateAutoChecks(protocol.autoChecks, protocol, hashes);
  for (const item of protocol.autoChecks) for (const file of item.files) {
    if (artifactDigest(resolve(root, file.path)) !== file.sha256) throw new Error("自动检查截图已变化");
  }
  const sessions = new Set();
  for (const existing of protocol.aiReviews) {
    if (sessions.has(existing.id) || existing.experiment !== experiment.id || existing.version !== version.version) {
      throw new Error("已有 AI 评审身份或实验版本无效");
    }
    sessions.add(existing.id);
    validateAIReview(existing, protocol, hashes);
  }
  validateAIReview(batch, protocol, hashes);
  if (sessions.has(batch.id)) throw new Error("该评审已导入");
  // Publish only the validated protocol fields, never arbitrary provider/UI payloads.
  const published = Object.fromEntries(["protocol", "source", "id", "experiment", "version", "fingerprint",
    "reviewer", "model", "hashes", "at", "evidence"].map((key) => [key, batch[key]]));
  published.checks = batch.checks.map((item) => Object.fromEntries(
    ["key", "id", "status", "score", "note"].map((key) => [key, item[key]])));
  text = replaceJsonSection(text, "AI 评审", [...protocol.aiReviews, published]);
  if (write) writeFileSync(path, text);
  return { path, text, checks: published.checks.length };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const file = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
    if (!file) throw new Error("用法：node scripts/import-ai.mjs <Agent评审.json> [--write]");
    const result = importAI(resolve(import.meta.dirname, ".."), JSON.parse(readFileSync(file, "utf8")), {
      write: process.argv.includes("--write") });
    console.log(`ok    ${process.argv.includes("--write") ? "已导入" : "校验通过，未写入"} ${result.checks} 项 AI 判断；请重新 build`);
  } catch (error) { console.error(`error ${error.message}`); process.exitCode = 1; }
}
