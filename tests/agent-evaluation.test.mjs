import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdtemp, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";
import { summarizeScore, latestBy } from "../review.js";
import { digest, parseProtocol, replaceJsonSection, validateAIReview, validateAIRecords,
  validateBrowserEvidence } from "../scripts/evaluation.mjs";
import { importAI } from "../scripts/import-ai.mjs";

const at = "2026-10-12T08:00:00.000Z";
const keys = ["one", "two"], hashes = Object.fromEntries(keys.map((key) => [key, digest(`raw:${key}`)]));
const markdown = `# Test
- **评测协议**：5
## 评分维度
| ID | 名称 | 类型 | 权重 | 评分标准 |
|---|---|---|---|---|
| reliability | 运行 | objective | 30 | 逐项验收 |
| motion | 动画 | objective | 30 | 观察时序 |
| visual | 品味 | taste | 40 | 0 粗糙到 5 精致，半分步进 |
## 评分细则
| ID | 评分维度 | 要求 | 怎么查 |
|---|---|---|---|
| runnable | reliability | 可运行 | 实际执行 |
| moving | motion | 动画 | 观看时序 |
| palette | visual | 配色 | 明确色彩优缺点 |
| layout | visual | 构图 | 明确构图优缺点 |
${["浏览器证据", "功能检查证据", "AI 评分", "AI 评审"].map((name) => `## ${name}\n\`\`\`json\n[]\n\`\`\``).join("\n")}
## 评测结论
未评测
`;
function fixture() {
  const evaluation = parseProtocol(markdown, "prompt");
  evaluation.browserEvidence = keys.flatMap((key) => ["desktop", "mobile", "dpr2", "reduced"].map((viewport) => ({
    id: `${key}-${viewport}`, key, viewport, at, fingerprint: digest("old-rubric"), sha256: hashes[key],
    files: [{ path: "assets/evidence/frame.png", kind: "frame", sha256: digest("frame") }]
  })));
  const version = { version: 1, prompt: "prompt", promptPath: "prompts/test/prompt-v1.md",
    evaluationPath: "results/test/v1/evaluation.md", evaluation,
    results: keys.map((key) => ({ key, sha256: hashes[key], url: `results/test/v1/outputs/${key}/out.html` })) };
  const lab = { experiments: [{ id: "test", latestVersion: 1, versions: [version] }] };
  return { evaluation, version, lab };
}
function batch(evaluation, overrides = {}, selected = keys) {
  return { protocol: 5, source: "ai", id: randomUUID(), experiment: "test", version: 1,
    reviewer: "Synthetic test Agent", model: "fixture-model", at, fingerprint: evaluation.fingerprint,
    hashes: Object.fromEntries(selected.map((key) => [key, hashes[key]])),
    checks: selected.flatMap((key) => ["desktop", "mobile"].flatMap((viewport) => evaluation.criteria.map((criterion) => ({
      key, viewport, id: criterion.id, status: criterion.dimension === "visual" ? "scored" : "pass",
      score: criterion.dimension === "visual" ? 4 : 5,
      evidence: "Synthetic observation, only for isolated tests; never published.", refs: [`${key}-${viewport}`]
    })))), ...overrides };
}
function publish(evaluation, input) {
  validateAIReview(input, evaluation, hashes);
  evaluation.aiReviews.push(input);
  evaluation.records.push(...input.checks.map((check) => ({ ...check, source: "ai", reviewer: input.reviewer,
    model: input.model, session: input.id, at: input.at, fingerprint: evaluation.fingerprint, sha256: hashes[check.key] })));
}
function zero(input) {
  input.checks.forEach((item) => { item.status = item.status === "scored" ? "scored" : "fail"; item.score = 0; });
  return input;
}
function pending(input, id = "moving", viewport = "mobile") {
  const item = input.checks.find((item) => item.key === "one" && item.id === id && item.viewport === viewport);
  Object.assign(item, { status: "pending", score: null, refs: [], evidence: "No observed evidence." });
  return input;
}

test("protocol 5 binds fine criteria, taste and positive experiment-specific weights", () => {
  const protocol = parseProtocol(markdown, "prompt");
  assert.equal(protocol.protocol, 5);
  assert.equal(protocol.dimensions.reduce((sum, item) => sum + item.weight, 0), 100);
  for (const changed of [markdown.replace("| 40 |", "| 39 |"), markdown.replace("| 30 |", "| 0 |"),
    markdown.replace("runnable | reliability", "runnable | nonexistent"), markdown.replace("| moving |", "| runnable |"),
    markdown.replace("：5", "：4"), markdown.replace("| taste |", "| human |"),
    markdown.replace("| taste |", "| objective |"), markdown.replace(" | 观察时序 |", " | |"),
    markdown + "## 用户评价\n```json\n[]\n```"]) assert.throws(() => parseProtocol(changed, "prompt"));
  assert.notEqual(parseProtocol(markdown, "changed prompt").fingerprint, protocol.fingerprint);
  assert.notEqual(parseProtocol(markdown.replace("明确色彩优缺点", "另一套色彩锚点"), "prompt").fingerprint, protocol.fingerprint);
  assert.notEqual(parseProtocol(markdown.replace("| 40 |", "| 30 |").replace("| reliability | 运行 | objective | 30 |",
    "| reliability | 运行 | objective | 40 |"), "prompt").fingerprint, protocol.fingerprint);
});
test("all zeroes are valid scores, no complete review is pending, humans are unnecessary", () => {
  const { version, evaluation } = fixture();
  assert.equal(summarizeScore(version, "one").total, null);
  publish(evaluation, zero(batch(evaluation)));
  const score = summarizeScore(version, "one");
  assert.equal(score.total, 0);
  assert.equal(score.taste, 0);
  assert.equal(score.objective, 0);
  assert.equal(score.count, 1);
  assert.ok(!("human" in score));
});
test("objective uses worse viewport; taste averages viewports; weights are retained", () => {
  const { version, evaluation } = fixture(), input = batch(evaluation);
  Object.assign(input.checks.find((item) => item.key === "one" && item.id === "moving" && item.viewport === "mobile"),
    { status: "partial", score: 2.5 });
  input.checks.find((item) => item.key === "one" && item.id === "palette" && item.viewport === "mobile").score = 2;
  publish(evaluation, input);
  const score = summarizeScore(version, "one");
  assert.equal(score.objective, 75);
  assert.equal(score.taste, 70);
  assert.equal(score.total, 73);
  assert.equal(score.checks.find((item) => item.id === "palette").score, 3);
});
test("single-result batches are valid; count is per artifact, not experiment", () => {
  const { version, evaluation } = fixture();
  publish(evaluation, batch(evaluation, {}, ["one"]));
  assert.equal(summarizeScore(version, "one").total, 92);
  assert.equal(summarizeScore(version, "two").count, 0);
  publish(evaluation, zero(batch(evaluation, { reviewer: "Second independent Agent" }, ["two"])));
  assert.equal(summarizeScore(version, "two").total, 0);
  assert.equal(summarizeScore(version, "one").count, 1);
});
test("complete judge totals average equally and expose judge spread", () => {
  const { version, evaluation } = fixture();
  publish(evaluation, batch(evaluation));
  publish(evaluation, zero(batch(evaluation, { reviewer: "Second independent Agent" }, ["one"])));
  const score = summarizeScore(version, "one");
  assert.equal(score.total, 46);
  assert.equal(score.count, 2);
  assert.equal(score.objective, 50);
  assert.equal(score.taste, 40);
  assert.deepEqual(score.spread, { min: 0, max: 92, range: 92 });
  assert.equal(score.judges.length, 2);
  assert.equal(summarizeScore(version, "two").count, 1);
});
test("same reviewer/model latest complete batch replaces a vote, not duplicates it", () => {
  const { version, evaluation } = fixture();
  publish(evaluation, batch(evaluation));
  publish(evaluation, zero(batch(evaluation, { at: "2026-10-12T09:00:00Z" }, ["one"])));
  assert.equal(summarizeScore(version, "one").total, 0);
  assert.equal(summarizeScore(version, "one").count, 1);
  assert.equal(summarizeScore(version, "two").total, 92);
  publish(evaluation, batch(evaluation, { model: "another-actual-model" }, ["one"]));
  assert.equal(summarizeScore(version, "one").count, 2);
});
test("later incomplete batch is excluded without erasing prior complete review", () => {
  const { version, evaluation } = fixture(), valid = batch(evaluation);
  publish(evaluation, valid);
  publish(evaluation, pending(zero(batch(evaluation, { at: "2026-10-12T09:00:00Z" }, ["one"]))));
  const score = summarizeScore(version, "one");
  assert.equal(score.total, 92);
  assert.equal(score.count, 1);
  assert.deepEqual(score.excluded[0].pending, ["moving"]);
  assert.equal(score.judges[0].session, valid.id);
  assert.equal(score.checks.find((item) => item.id === "moving").records.filter((item) => item.counted).length, 2);
  assert.equal(summarizeScore(version, "two").excluded.length, 0);
});
test("pending objective or taste prevents incomplete-only reviews from getting a total", () => {
  for (const id of ["moving", "palette"]) {
    const { version, evaluation } = fixture();
    publish(evaluation, pending(batch(evaluation), id));
    const score = summarizeScore(version, "one");
    assert.equal(score.total, null);
    assert.equal(score.objective, null);
    assert.equal(score.taste, null);
    assert.equal(score.count, 0);
    assert.equal(score.excluded.length, 1);
    assert.equal(summarizeScore(version, "two").count, 1);
  }
});
test("incomplete sessions are never stitched together across judges or rounds", () => {
  const { version, evaluation } = fixture();
  publish(evaluation, pending(batch(evaluation), "moving"));
  publish(evaluation, pending(batch(evaluation, { reviewer: "Different judge" }), "runnable"));
  assert.equal(summarizeScore(version, "one").total, null);
  assert.equal(summarizeScore(version, "one").count, 0);
  assert.equal(summarizeScore(version, "two").count, 2);
});
test("same-time latest selection is deterministic regardless of input order", () => {
  const items = [{ id: "a", at }, { id: "b", at }];
  assert.equal(latestBy(items, () => "one")[0].id, "b");
  assert.equal(latestBy(items.slice().reverse(), () => "one")[0].id, "b");
});
test("raw judge totals are averaged before display rounding", () => {
  const { version, evaluation } = fixture();
  evaluation.dimensions[0].weight = 31;
  evaluation.dimensions[1].weight = 30;
  evaluation.dimensions[2].weight = 39;
  const first = batch(evaluation);
  const second = batch(evaluation, { reviewer: "Second" });
  first.checks.filter((item) => item.id === "palette").forEach((item) => { item.score = 0.5; });
  second.checks.filter((item) => item.id === "palette").forEach((item) => { item.score = 1; });
  publish(evaluation, first); publish(evaluation, second);
  const score = summarizeScore(version, "one");
  const rawFirst = 61 + 2.25 / 5 * 39;
  const rawSecond = 61 + 2.5 / 5 * 39;
  assert.equal(score.total, Math.round((rawFirst + rawSecond) / 2 * 10) / 10);
});
test("AI batch validates complete selected coverage, source, identity and fingerprints", () => {
  const { evaluation } = fixture(), valid = batch(evaluation);
  validateAIReview(valid, evaluation, hashes);
  for (const mutate of [(item) => item.checks.pop(), (item) => { item.checks[0] = item.checks[1]; },
    (item) => { item.hashes = {}; }, (item) => { item.hashes.one = digest("changed"); },
    (item) => { item.source = "human"; }, (item) => { item.model = "unknown"; },
    (item) => { item.reviewer = " "; }, (item) => { item.fingerprint = digest("old"); },
    (item) => { delete item.hashes.two; }, (item) => { item.checks[0].id = "nonexistent"; }]) {
    const invalid = structuredClone(valid); mutate(invalid);
    assert.throws(() => validateAIReview(invalid, evaluation, hashes));
  }
});
test("objective status-score must match; taste scores are finite half steps in range", () => {
  const { evaluation } = fixture(), valid = batch(evaluation);
  const objectiveIndex = valid.checks.findIndex((item) => item.id === "runnable");
  const tasteIndex = valid.checks.findIndex((item) => item.id === "palette");
  for (const [index, changes] of [[objectiveIndex, { score: 4 }], [objectiveIndex, { status: "scored" }],
    [objectiveIndex, { status: "pending", score: 0 }], [tasteIndex, { status: "pass", score: 5 }],
    [tasteIndex, { score: -0.5 }], [tasteIndex, { score: 5.5 }], [tasteIndex, { score: 3.1 }],
    [tasteIndex, { score: NaN }], [tasteIndex, { score: "4" }], [tasteIndex, { score: Infinity }]]) {
    const invalid = structuredClone(valid);
    Object.assign(invalid.checks[index], changes);
    assert.throws(() => validateAIReview(invalid, evaluation, hashes));
  }
  for (const score of [0, 0.5, 3.5, 5]) {
    valid.checks[tasteIndex].score = score;
    validateAIReview(valid, evaluation, hashes);
  }
});
test("evidence requires actual artifact and viewport, not future or failed captures", () => {
  const { evaluation } = fixture(), valid = batch(evaluation);
  validateBrowserEvidence(evaluation.browserEvidence, evaluation, hashes);
  for (const changes of [{ refs: [] }, { refs: ["two-desktop"] }, { refs: ["one-mobile"] },
    { refs: ["not-captured"] }, { evidence: "" }, { refs: ["one-desktop", "one-desktop"] },
    { refs: ["one-dpr2"] }]) {
    const invalid = structuredClone(valid); Object.assign(invalid.checks[0], changes);
    assert.throws(() => validateAIReview(invalid, evaluation, hashes));
  }
  valid.checks[0].refs.push("one-dpr2", "one-reduced");
  validateAIReview(valid, evaluation, hashes);
  assert.throws(() => validateAIReview({ ...valid, at: "2026-10-11T08:00:00Z" }, evaluation, hashes));
  evaluation.browserEvidence[0].harnessError = "Fixture failure";
  assert.throws(() => validateAIReview(valid, evaluation, hashes));
  valid.checks.filter((item) => item.refs.includes("one-desktop")).forEach((item) => {
    Object.assign(item, { status: "pending", score: null });
  });
  validateAIReview(valid, evaluation, hashes);
});
test("original capture fingerprint can support newly frozen rubric without relabeling", () => {
  const { evaluation } = fixture();
  const fingerprint = evaluation.browserEvidence[0].fingerprint;
  assert.notEqual(fingerprint, evaluation.fingerprint);
  validateBrowserEvidence(evaluation.browserEvidence, evaluation, hashes);
  validateAIReview(batch(evaluation), evaluation, hashes);
  assert.equal(evaluation.browserEvidence[0].fingerprint, fingerprint);
  evaluation.browserEvidence[0].sha256 = digest("changed");
  assert.throws(() => validateBrowserEvidence(evaluation.browserEvidence, evaluation, hashes));
});
test("normalized records must match the real raw batch, including numeric score", () => {
  const { evaluation } = fixture();
  publish(evaluation, batch(evaluation));
  validateAIRecords(evaluation, hashes);
  evaluation.records[0].score = 2.5;
  evaluation.records[0].status = "partial";
  assert.throws(() => validateAIRecords(evaluation, hashes), /不一致/);
});
test("duplicate, orphan or missing normalized records are rejected", () => {
  for (const mutation of [(items) => items.push(items[0]), (items) => items.pop(),
    (items) => { items[0].session = "no-session"; }]) {
    const { evaluation } = fixture();
    publish(evaluation, batch(evaluation)); mutation(evaluation.records);
    assert.throws(() => validateAIRecords(evaluation, hashes));
  }
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
  const text = replaceJsonSection(markdown, "浏览器证据", evaluation.browserEvidence);
  for (const [path, content] of [["data/lab.json", JSON.stringify(lab)], [version.evaluationPath, text],
    [version.promptPath, "```text\nprompt\n```"], ["assets/evidence/frame.png", "frame"],
    ...version.results.map((item) => [item.url, `raw:${item.key}`])]) {
    await mkdir(join(dir, path, ".."), { recursive: true });
    await writeFile(join(dir, path), content);
  }
  return { dir, evaluation, version, text };
}
test("single-result import is validated, append-only and strips arbitrary payloads", async (t) => {
  const { dir, evaluation, version, text } = await importFixture(t);
  const input = batch(evaluation, { secret: "do-not-publish" }, ["one"]);
  input.checks[0].secret = "nested-do-not-publish";
  importAI(dir, input);
  assert.equal(await readFile(join(dir, version.evaluationPath), "utf8"), text);
  importAI(dir, input, { write: true });
  const output = await readFile(join(dir, version.evaluationPath), "utf8");
  assert.ok(!output.includes("do-not-publish"));
  const parsed = parseProtocol(output, "prompt");
  validateAIRecords(parsed, hashes);
  assert.equal(parsed.records.length, 8);
  assert.equal(summarizeScore({ ...version, evaluation: parsed }, "one").count, 1);
  assert.equal(summarizeScore({ ...version, evaluation: parsed }, "two").count, 0);
  assert.throws(() => importAI(dir, input), /已导入/);
  assert.equal(await readFile(join(dir, version.results[0].url), "utf8"), "raw:one");
});
test("import reads real Prompt, artifact and media bytes instead of stale generated hashes", async (t) => {
  for (const [path, content] of [["prompt", "```text\nchanged prompt\n```"], ["artifact", "changed"],
    ["media", "changed media"], ["prompt", "```text\nprompt\n```\n```text\nsecond\n```"]]) {
    const { dir, evaluation, version, text } = await importFixture(t);
    const target = path === "prompt" ? version.promptPath : path === "artifact" ? version.results[0].url : "assets/evidence/frame.png";
    await writeFile(join(dir, target), content);
    assert.throws(() => importAI(dir, batch(evaluation), { write: true }));
    assert.equal(await readFile(join(dir, version.evaluationPath), "utf8"), text);
  }
});
test("import rejects damaged existing sessions and records before appending", async (t) => {
  for (const mutate of [
    (protocol) => { protocol.records[0].score = 2.5; protocol.records[0].status = "partial"; },
    (protocol) => { protocol.aiReviews[0].version = 2; },
    (protocol) => { protocol.aiReviews.push(protocol.aiReviews[0]); },
    (protocol) => { protocol.records.pop(); }
  ]) {
    const { dir, evaluation, version } = await importFixture(t);
    importAI(dir, batch(evaluation), { write: true });
    let text = await readFile(join(dir, version.evaluationPath), "utf8");
    const parsed = parseProtocol(text, "prompt");
    mutate(parsed);
    text = replaceJsonSection(text, "AI 评分", parsed.records);
    text = replaceJsonSection(text, "AI 评审", parsed.aiReviews);
    await writeFile(join(dir, version.evaluationPath), text);
    assert.throws(() => importAI(dir, batch(evaluation, { reviewer: "New judge" }), { write: true }));
    assert.equal(await readFile(join(dir, version.evaluationPath), "utf8"), text);
  }
});
test("malformed or duplicate record blocks cannot be silently rewritten", () => {
  assert.throws(() => parseProtocol(markdown + "## AI 评分\n```json\n[]\n```", "prompt"), /重复/);
  assert.throws(() => parseProtocol(markdown.replace("## AI 评分\n```json\n[]\n```", "## AI 评分\n```json\n{}\n```"), "prompt"), /数组/);
  assert.throws(() => replaceJsonSection(markdown, "用户评价", []), /缺少/);
});
