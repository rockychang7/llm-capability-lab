import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { artifactDigest, readPrompt, parseProtocol, validateSession, replaceJsonSection } from "./evaluation.mjs";

export function importReview(root, input, { write = false } = {}) {
  const reviews = Array.isArray(input) ? input : [input];
  const lab = JSON.parse(readFileSync(resolve(root, "data/lab.json"), "utf8"));
  const changes = new Map();
  for (const review of reviews) {
    const experiment = lab.experiments.find((item) => item.id === review?.experiment);
    const version = experiment?.versions.find((item) => item.version === review.version);
    if (!version?.evaluationPath) throw new Error("未知实验版本");
    const path = resolve(root, version.evaluationPath);
    const change = changes.get(path) ?? { text: readFileSync(path, "utf8"), version };
    const protocol = parseProtocol(change.text, readPrompt(resolve(root, version.promptPath)));
    const hashes = Object.fromEntries(version.results.map((item) => [item.key, artifactDigest(resolve(root, item.url))]));
    validateSession(review, protocol, hashes);
    const published = Object.fromEntries(["protocol", "source", "id", "experiment", "version", "key", "sha256",
      "fingerprint", "participant", "reviewer", "viewport", "at", "revision", "scores", "comment"]
      .map((key) => [key, review[key]]));
    const existing = protocol.humanReviews.find((item) => item.id === review.id && item.participant === review.participant);
    if (existing) {
      if (JSON.stringify(existing) !== JSON.stringify(published)) throw new Error("重复 ID 的评价内容不一致");
      continue;
    }
    if (protocol.humanReviews.some((item) => item.participant === review.participant && item.key === review.key &&
        (item.id === review.id || item.revision === review.revision))) throw new Error("评价 ID 或修订编号重复");
    change.text = replaceJsonSection(change.text, "用户评价", [...protocol.humanReviews, published]);
    changes.set(path, change);
  }
  if (write) for (const [path, change] of changes) writeFileSync(path, change.text);
  return { files: changes.size, reviews: reviews.length };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const file = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
    if (!file) throw new Error("用法：node scripts/import-review.mjs <服务端评价或数组.json> [--write]");
    const result = importReview(resolve(import.meta.dirname, ".."), JSON.parse(readFileSync(file, "utf8")), { write: process.argv.includes("--write") });
    console.log(`ok    ${process.argv.includes("--write") ? "已归档" : "校验通过，未写入"} ${result.reviews} 份评价 / ${result.files} 份评测文件`);
  } catch (error) { console.error(`error ${error.message}`); process.exitCode = 1; }
}
