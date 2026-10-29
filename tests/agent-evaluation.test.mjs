import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdtemp, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";
import { summarizeScore, latestBy } from "../review.js";
import { digest, parseProtocol, replaceJsonSection, validateAIReview, validateAutoChecks } from "../scripts/evaluation.mjs";
import { importAI } from "../scripts/import-ai.mjs";

const at = "2026-10-26T08:00:00.000Z", before = "2026-10-26T07:00:00.000Z";
const keys = ["one", "two"], hashes = Object.fromEntries(keys.map((key) => [key, digest(`raw:${key}`)]));
const markdown = `# Test
- **评测协议**：6
## 评分维度
| ID | 名称 | 类型 | 权重 | 评分标准 |
|---|---|---|---|---|
| reliability | 运行 | objective | 30 | 脚本验收 |
| scenes | 画面 | objective | 30 | AI 看拼图 |
| visual | 品味 | taste | 40 | 0 粗糙到 5 精致，半分步进 |
## 评分细则
| ID | 评分维度 | 判定 | 要求 | 怎么查 |
|---|---|---|---|---|
| runnable | reliability | 脚本 | 可运行 | 实际执行 |
| moving | scenes | AI | 动画 | 看拼图 |
| palette | visual | AI | 配色 | 明确色彩锚点 |
| layout | visual | AI | 构图 | 明确构图锚点 |
${["自动检查", "AI 评审"].map((name) => `## ${name}\n\`\`\`json\n[]\n\`\`\``).join("\n")}
## 评测结论
未评测
`;
const file = { path: "assets/evidence/sheet.jpg", sha256: digest("sheet"), kind: "sheet", viewport: "desktop" };
function auto(evaluation, key, status = "pass", overrides = {}) {
  return { id: `auto-${key}-${status}`, key, sha256: hashes[key], fingerprint: evaluation.fingerprint, at: before,
    checker: "fixture-checker", environment: {}, results: [{ id: "runnable", status, evidence: "Synthetic script fact." }],
    files: [file], ...overrides };
}
function fixture() {
  const evaluation = parseProtocol(markdown, "prompt");
  evaluation.autoChecks = keys.map((key) => auto(evaluation, key));
  const version = { version: 1, prompt: "prompt", promptPath: "prompts/test/prompt-v1.md",
    evaluationPath: "results/test/v1/evaluation.md", evaluation,
    results: keys.map((key) => ({ key, sha256: hashes[key], url: `results/test/v1/outputs/${key}/out.html` })) };
  const lab = { experiments: [{ id: "test", latestVersion: 1, versions: [version] }] };
  return { evaluation, version, lab };
}
function batch(evaluation, overrides = {}, selected = keys) {
  return { protocol: 6, source: "ai", id: randomUUID(), experiment: "test", version: 1,
    reviewer: "Synthetic test Agent", model: "fixture-model", at, fingerprint: evaluation.fingerprint,
    hashes: Object.fromEntries(selected.map((key) => [key, hashes[key]])),
    evidence: selected.map((key) => `auto-${key}-pass`),
    checks: selected.flatMap((key) => ["moving", "palette", "layout"].map((id) => ({
      key, id, status: id === "moving" ? "pass" : "scored", score: id === "moving" ? 5 : 4,
      note: id === "moving" ? "" : "Synthetic taste note, only for isolated tests."
    }))), ...overrides };
}
function publish(evaluation, input) {
  validateAIReview(input, evaluation, hashes);
  evaluation.aiReviews.push(input);
}
function zero(input) {
  input.checks.forEach((item) => {
    Object.assign(item, item.status === "scored" ? { score: 0 } : { status: "fail", score: 0, note: "Not visible." });
  });
  return input;
}
function pending(input, id = "moving") {
  Object.assign(input.checks.find((item) => item.key === "one" && item.id === id), { status: "pending", score: null, note: "Not shown." });
  return input;
}

test("protocol 6 needs judge column, ai-only taste and positive weights", () => {
  const protocol = parseProtocol(markdown, "prompt");
  assert.equal(protocol.protocol, 6);
  assert.deepEqual(protocol.criteria.map((item) => item.by), ["script", "ai", "ai", "ai"]);
  for (const changed of [markdown.replace("| 40 |", "| 39 |"), markdown.replace("| 30 |", "| 0 |"),
    markdown.replace("runnable | reliability", "runnable | nonexistent"), markdown.replace("| moving |", "| runnable |"),
    markdown.replace("：6", "：5"), markdown.replace("| taste |", "| human |"),
    markdown.replace("| palette | visual | AI |", "| palette | visual | 脚本 |"),
    markdown.replace("| moving | scenes | AI |", "| moving | scenes | 人工 |"),
    markdown + "## AI 评分\n```json\n[]\n```"]) assert.throws(() => parseProtocol(changed, "prompt"));
  assert.notEqual(parseProtocol(markdown, "changed prompt").fingerprint, protocol.fingerprint);
  assert.notEqual(parseProtocol(markdown.replace("明确色彩锚点", "另一套锚点"), "prompt").fingerprint, protocol.fingerprint);
  assert.notEqual(parseProtocol(markdown.replace("| moving | scenes | AI |", "| moving | scenes | 脚本 |"), "prompt").fingerprint,
    protocol.fingerprint);
});
test("script and AI parts combine; all zeroes are valid; nothing scores without AI", () => {
  const { version, evaluation } = fixture();
  assert.equal(summarizeScore(version, "one").total, null);
  assert.equal(summarizeScore(version, "one").checks.find((item) => item.id === "runnable").score, 5);
  publish(evaluation, batch(evaluation));
  assert.equal(summarizeScore(version, "one").total, 92);
  const { version: other, evaluation: second } = fixture();
  second.autoChecks = keys.map((key) => auto(second, key, "fail"));
  publish(second, zero(batch(second, { evidence: keys.map((key) => `auto-${key}-fail`) })));
  const score = summarizeScore(other, "one");
  assert.deepEqual([score.total, score.objective, score.taste, score.count], [0, 0, 0, 1]);
});
test("partial script result and taste mean feed dimension weights", () => {
  const { version, evaluation } = fixture();
  evaluation.autoChecks.push(auto(evaluation, "one", "partial", { at: "2026-10-26T07:30:00Z" }));
  const input = batch(evaluation);
  input.checks.find((item) => item.key === "one" && item.id === "palette").score = 2;
  publish(evaluation, input);
  const score = summarizeScore(version, "one");
  assert.equal(score.objective, 75);
  assert.equal(score.taste, 60);
  assert.equal(score.total, 69);
});
test("missing or pending script run keeps the total pending", () => {
  const { version, evaluation } = fixture();
  evaluation.autoChecks = [auto(evaluation, "one", "pending"), auto(evaluation, "two")];
  publish(evaluation, batch(evaluation, { evidence: ["auto-one-pending", "auto-two-pass"] }));
  assert.equal(summarizeScore(version, "one").total, null);
  assert.equal(summarizeScore(version, "one").count, 0);
  assert.equal(summarizeScore(version, "two").count, 1);
  evaluation.autoChecks = [];
  assert.equal(summarizeScore(version, "two").total, null);
});
test("single-result batches count per artifact; judges average with spread", () => {
  const { version, evaluation } = fixture();
  publish(evaluation, batch(evaluation, {}, ["one"]));
  assert.equal(summarizeScore(version, "two").count, 0);
  publish(evaluation, zero(batch(evaluation, { reviewer: "Second independent Agent" }, ["one"])));
  const score = summarizeScore(version, "one");
  assert.equal(score.count, 2);
  assert.equal(score.total, 61);
  assert.deepEqual(score.spread, { min: 30, max: 92, range: 62 });
});
test("same reviewer latest complete batch replaces its vote; later incomplete one is excluded", () => {
  const { version, evaluation } = fixture(), first = batch(evaluation);
  publish(evaluation, first);
  publish(evaluation, pending(zero(batch(evaluation, { at: "2026-10-26T09:00:00Z" }, ["one"]))));
  let score = summarizeScore(version, "one");
  assert.equal(score.total, 92);
  assert.deepEqual(score.excluded[0].pending, ["moving"]);
  publish(evaluation, zero(batch(evaluation, { at: "2026-10-26T10:00:00Z" }, ["one"])));
  score = summarizeScore(version, "one");
  assert.equal(score.total, 30);
  assert.equal(score.count, 1);
  assert.equal(score.checks.find((item) => item.id === "moving").records.filter((item) => item.counted).length, 1);
});
test("incomplete sessions are never stitched together", () => {
  const { version, evaluation } = fixture();
  publish(evaluation, pending(batch(evaluation), "moving"));
  publish(evaluation, pending(batch(evaluation, { reviewer: "Different judge" }), "palette"));
  assert.equal(summarizeScore(version, "one").total, null);
  assert.equal(summarizeScore(version, "two").count, 2);
});
test("same-time latest selection is deterministic regardless of input order", () => {
  const items = [{ id: "a", at }, { id: "b", at }];
  assert.equal(latestBy(items, () => "one")[0].id, "b");
  assert.equal(latestBy(items.slice().reverse(), () => "one")[0].id, "b");
});
test("AI batch validates coverage, identity, fingerprints and statuses", () => {
  const { evaluation } = fixture(), valid = batch(evaluation);
  validateAIReview(valid, evaluation, hashes);
  for (const mutate of [(item) => item.checks.pop(), (item) => { item.checks[0] = item.checks[1]; },
    (item) => { item.hashes.one = digest("changed"); }, (item) => { item.source = "human"; },
    (item) => { item.model = "unknown"; }, (item) => { item.fingerprint = digest("old"); },
    (item) => { item.checks[0].id = "runnable"; }, (item) => { item.checks[0].score = 4; },
    (item) => { item.checks[0].status = "fail"; }, (item) => { Object.assign(item.checks[0], { status: "fail", score: 0 }); },
    (item) => { item.checks[1].score = 3.1; }, (item) => { item.checks[1].score = 5.5; }, (item) => { item.checks[1].note = " "; },
    (item) => { item.checks[1].status = "pass"; item.checks[1].score = 5; }, (item) => { delete item.checks[0].note; }]) {
    const invalid = structuredClone(valid); mutate(invalid);
    assert.throws(() => validateAIReview(invalid, evaluation, hashes));
  }
});
test("AI batch must cite earlier screenshots of its own artifacts", () => {
  const { evaluation } = fixture(), valid = batch(evaluation);
  for (const evidence of [[], ["auto-one-pass"], ["auto-one-pass", "auto-one-pass", "auto-two-pass"], ["missing", "auto-two-pass"]]) {
    assert.throws(() => validateAIReview({ ...valid, evidence }, evaluation, hashes));
  }
  assert.throws(() => validateAIReview({ ...valid, at: "2026-10-26T06:00:00Z" }, evaluation, hashes));
  const single = batch(evaluation, {}, ["one"]);
  assert.throws(() => validateAIReview({ ...single, evidence: ["auto-two-pass"] }, evaluation, hashes));
});
test("auto checks must cover every script criterion under the current rubric", () => {
  const { evaluation } = fixture();
  validateAutoChecks(evaluation.autoChecks, evaluation, hashes);
  for (const mutate of [(item) => { item.results = []; }, (item) => { item.results[0].status = "scored"; },
    (item) => { item.results[0].evidence = ""; }, (item) => { item.fingerprint = digest("old"); },
    (item) => { item.sha256 = digest("changed"); }, (item) => { item.files[0].path = "../secret.jpg"; },
    (item) => { item.files[0].kind = "video"; }, (item) => { item.results.push({ id: "moving", status: "pass", evidence: "x" }); }]) {
    const items = structuredClone(evaluation.autoChecks); mutate(items[0]);
    assert.throws(() => validateAutoChecks(items, evaluation, hashes));
  }
  assert.throws(() => validateAutoChecks([...evaluation.autoChecks, evaluation.autoChecks[0]], evaluation, hashes));
});
async function temporary(t) {
  const dir = await mkdtemp(join(tmpdir(), "llm-lab-test-"));
  t.after(async () => {
    assert.ok(resolve(dir).startsWith(resolve(tmpdir()) + sep));
    await rm(dir, { recursive: true, force: true });
  });
  return dir;
}
async function importFixture(t) {
  const dir = await temporary(t), { evaluation, version, lab } = fixture();
  const text = replaceJsonSection(markdown, "自动检查", evaluation.autoChecks);
  for (const [path, content] of [["data/lab.json", JSON.stringify(lab)], [version.evaluationPath, text],
    [version.promptPath, "```text\nprompt\n```"], [file.path, "sheet"],
    ...version.results.map((item) => [item.url, `raw:${item.key}`])]) {
    await mkdir(join(dir, path, ".."), { recursive: true });
    await writeFile(join(dir, path), content);
  }
  return { dir, evaluation, version, text };
}
test("import is validated, append-only and strips arbitrary payloads", async (t) => {
  const { dir, evaluation, version, text } = await importFixture(t);
  const input = batch(evaluation, { secret: "do-not-publish" }, ["one"]);
  input.checks[0].secret = "nested-do-not-publish";
  importAI(dir, input);
  assert.equal(await readFile(join(dir, version.evaluationPath), "utf8"), text);
  importAI(dir, input, { write: true });
  const output = await readFile(join(dir, version.evaluationPath), "utf8");
  assert.ok(!output.includes("do-not-publish"));
  const parsed = parseProtocol(output, "prompt");
  assert.equal(parsed.aiReviews.length, 1);
  assert.equal(summarizeScore({ ...version, evaluation: parsed }, "one").count, 1);
  assert.equal(summarizeScore({ ...version, evaluation: parsed }, "two").count, 0);
  assert.throws(() => importAI(dir, input), /已导入/);
});
test("import reads real Prompt, artifact and screenshot bytes", async (t) => {
  for (const [target, content] of [["prompt", "```text\nchanged prompt\n```"], ["artifact", "changed"], ["media", "changed"]]) {
    const { dir, evaluation, version, text } = await importFixture(t);
    const path = target === "prompt" ? version.promptPath : target === "artifact" ? version.results[0].url : file.path;
    await writeFile(join(dir, path), content);
    assert.throws(() => importAI(dir, batch(evaluation), { write: true }));
    assert.equal(await readFile(join(dir, version.evaluationPath), "utf8"), text);
  }
});
test("import rejects damaged existing sessions before appending", async (t) => {
  for (const mutate of [(reviews) => { reviews[0].version = 2; }, (reviews) => { reviews.push(reviews[0]); },
    (reviews) => { reviews[0].checks[0].score = 2.5; }]) {
    const { dir, evaluation, version } = await importFixture(t);
    importAI(dir, batch(evaluation), { write: true });
    let text = await readFile(join(dir, version.evaluationPath), "utf8");
    const parsed = parseProtocol(text, "prompt");
    mutate(parsed.aiReviews);
    text = replaceJsonSection(text, "AI 评审", parsed.aiReviews);
    await writeFile(join(dir, version.evaluationPath), text);
    assert.throws(() => importAI(dir, batch(evaluation, { reviewer: "New judge" }), { write: true }));
    assert.equal(await readFile(join(dir, version.evaluationPath), "utf8"), text);
  }
});
test("malformed or duplicate record blocks cannot be silently rewritten", () => {
  assert.throws(() => parseProtocol(markdown + "## AI 评审\n```json\n[]\n```", "prompt"), /重复/);
  assert.throws(() => parseProtocol(markdown.replace("## AI 评审\n```json\n[]\n```", "## AI 评审\n```json\n{}\n```"), "prompt"), /数组/);
  assert.throws(() => replaceJsonSection(markdown, "用户评价", []), /缺少/);
});
