import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { resolve, join, sep } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { digest, parseProtocol, validateRecord, validateSession, resolveChecks, acceptanceState, replaceJsonSection, sections } from "../scripts/evaluation.mjs";
import { createSession, sessionComplete, sessionMatches, validDraft, comparisonSummary, shuffle } from "../review.js";
import { importReview } from "../scripts/import-review.mjs";

const root = resolve(import.meta.dirname, "..");
const lab = JSON.parse(readFileSync(join(root, "data/lab.json"), "utf8"));
const experiment = lab.experiments[1];
const version = experiment.versions[0];
const text = readFileSync(join(root, version.evaluationPath), "utf8").replace(/\r\n/g, "\n");
const protocol = parseProtocol(text, version.prompt);
const hashes = Object.fromEntries(version.results.map((result) => [result.key, result.sha256]));
function completeSession() {
  const session = createSession(experiment, version, "test-only-reviewer", true, "desktop", () => 0.3);
  for (const key of session.order) session.assessments[key] = {
    observed: true,
    checks: Object.fromEntries(protocol.criteria.filter((item) => item.method === "human").map((item) => [
      item.id, { status: "pending", note: "Synthetic fixture; not an actual human observation" }
    ]))
  };
  session.tasks.forEach((task) => { task.choice = "unknown"; task.note = "Synthetic fixture"; task.at = "2026-10-10T00:00:00Z"; });
  session.sealedAt = "2026-10-10T01:00:00Z"; session.phase = "sealed"; session.index = 0;
  return session;
}
function record(overrides = {}) {
  return {
    key: version.results[0].key, id: "pelican", source: "human", reviewer: "test-reviewer",
    status: "pass", at: "2026-10-10T00:00:00Z", fingerprint: protocol.fingerprint,
    sha256: version.results[0].sha256, evidence: "Test-only evidence", ...overrides
  };
}

test("protocol parsing produces stable IDs and frozen fingerprint", () => {
  assert.equal(protocol.protocol, 2);
  assert.equal(protocol.fingerprint, version.evaluation.fingerprint);
  assert.equal(new Set(protocol.criteria.map((item) => item.id)).size, protocol.criteria.length);
});
test("invalid or duplicate criterion IDs are rejected", () => {
  assert.throws(() => parseProtocol(text.replace("| pouch |", "| pelican |"), version.prompt), /重复/);
  assert.throws(() => parseProtocol(text.replace("| core |", "| wrong |"), version.prompt), /无效/);
});
test("missing and non-array canonical records are rejected", () => {
  assert.throws(() => parseProtocol(text.replace("## 验收记录", "## removed"), version.prompt), /缺少/);
  assert.throws(() => parseProtocol(replaceJsonSection(text, "人工比较", {}), version.prompt), /数组/);
});
test("headings in fenced evidence never become Markdown sections", () => {
  const value = sections("## A\n```json\n## not-a-heading\n```\n## B\ntext");
  assert.ok(value.A.includes("## not-a-heading"));
  assert.equal(value["not-a-heading"], undefined);
});
test("artifact or rubric changes invalidate evidence", () => {
  assert.throws(() => validateRecord(record({ sha256: "bad" }), protocol, hashes), /指纹/);
  assert.throws(() => validateRecord(record({ fingerprint: "bad" }), protocol, hashes), /标准/);
});
test("source, evidence, reviewer and timestamp are checked", () => {
  for (const overrides of [{ source: "auto" }, { evidence: "" }, { reviewer: "unknown" }, { at: "invalid" }, { at: 2026 }, { viewport: "wrong" }, { status: "yes" }]) {
    assert.throws(() => validateRecord(record(overrides), protocol, hashes));
  }
  assert.doesNotThrow(() => validateRecord(record(), protocol, hashes));
});
test("core acceptance does not average away a failure", () => {
  const item = (status, tier = "core") => ({ status, tier });
  assert.equal(acceptanceState([item("pass"), item("fail"), item("pending")]), "fail");
  assert.equal(acceptanceState([item("partial"), item("pending")]), "pending");
  assert.equal(acceptanceState([item("partial"), item("pass")]), "partial");
  assert.equal(acceptanceState([item("pass"), item("fail", "detail")]), "pass");
  assert.equal(acceptanceState([]), "pending");
});
test("latest statement replaces only the same reviewer and viewport", () => {
  const records = [record({ status: "fail", viewport: "desktop" }), record({ status: "pass", viewport: "desktop", at: "2026-10-10T01:00:00Z" })];
  assert.equal(resolveChecks(protocol.criteria, records, records[0].key).find((item) => item.id === "pelican").status, "pass");
  records.push(record({ status: "fail", viewport: "mobile" }));
  const check = resolveChecks(protocol.criteria, records, records[0].key).find((item) => item.id === "pelican");
  assert.equal(check.status, "pending"); assert.equal(check.disputed, true); assert.equal(check.evidence.length, 2);
});
test("independent reviewer disagreements stay unresolved", () => {
  const check = resolveChecks(protocol.criteria, [record(), record({ reviewer: "other", status: "fail" })], version.results[0].key)[4];
  assert.equal(check.status, "pending"); assert.equal(check.disputed, true);
});
test("shuffle preserves input and all elements", () => {
  const items = [1, 2, 3, 4];
  assert.deepEqual(shuffle(items, () => 0), [2, 3, 4, 1]); assert.deepEqual(items, [1, 2, 3, 4]);
});
test("session covers all pairs and dimensions and is initially incomplete", () => {
  const session = createSession(experiment, version, "test", false, "mobile", () => 0);
  assert.equal(session.tasks.length, 18);
  assert.equal(new Set(session.tasks.map((task) => `${[task.left, task.right].sort()}|${task.dimension}`)).size, 18);
  assert.equal(sessionComplete(session, version), false); assert.equal(validDraft(session, version, experiment.id), true);
});
test("complete synthetic session validates, without publishing anything", () => {
  const session = completeSession();
  assert.equal(sessionComplete(session, version), true);
  assert.doesNotThrow(() => validateSession(session, protocol, hashes));
  assert.equal(validDraft(session, version, experiment.id), true);
});
test("unsealed or missing-observation sessions cannot be imported", () => {
  const session = completeSession(); session.sealedAt = null;
  assert.throws(() => validateSession(session, protocol, hashes), /封存/);
  session.sealedAt = "2026-10-10T01:00:00Z"; session.assessments[session.order[0]].observed = "yes";
  assert.throws(() => validateSession(session, protocol, hashes), /完整观看/);
});
test("partial tasks, repeated pairs, malformed orders and post-seal times are rejected", () => {
  for (const mutate of [
    (session) => session.tasks.pop(),
    (session) => { session.tasks[0] = session.tasks[1]; },
    (session) => session.order.push(session.order[0]),
    (session) => { session.tasks[0].at = "2026-10-11T00:00:00Z"; },
    (session) => { session.tasks[0].at = 2026; },
    (session) => { session.sealedAt = 2026; },
    (session) => { session.tasks[0].note = ""; },
    (session) => { session.assessments[session.order[0]].checks.pelican.status = "wrong"; }
  ]) {
    const session = completeSession(); mutate(session);
    assert.throws(() => validateSession(session, protocol, hashes));
  }
});
test("draft restoration rejects different outputs, experiment, version or malformed objects", () => {
  const session = completeSession();
  assert.equal(validDraft(session, version, "other"), false);
  session.version = 1; assert.equal(sessionMatches(session, version), false);
  session.version = version.version; session.hashes[session.order[0]] = "changed";
  assert.equal(sessionMatches(session, version), false);
  assert.equal(validDraft(null, version, experiment.id), false);
});
test("only eligible comparisons from the latest complete reviewer session are aggregated", () => {
  const first = completeSession();
  first.tasks.forEach((task) => { task.choice = "left"; });
  const second = structuredClone(first); second.id = "second"; second.sealedAt = "2026-10-10T02:00:00Z";
  second.tasks.forEach((task) => { task.choice = "tie"; });
  const fixture = structuredClone(version);
  fixture.results.forEach((result) => { result.acceptance.status = "pass"; });
  fixture.evaluation.sessions = [first, second];
  const summaries = comparisonSummary(fixture);
  assert.equal(summaries[0].eligible, 6);
  assert.ok(summaries[0].rows.every((row) => row.wins === 0 && row.ties === 3));
  fixture.results[0].acceptance.status = "partial";
  assert.equal(comparisonSummary(fixture)[0].eligible, 3);
  assert.equal(comparisonSummary(fixture)[0].excluded, 3);
});
test("import validates actual disk fingerprints, defaults to dry run and rejects duplicates", () => {
  const dir = mkdtempSync(join(tmpdir(), "llm-review-test-"));
  const write = (path, contents) => { const target = join(dir, path); mkdirSync(resolve(target, ".."), { recursive: true }); writeFileSync(target, contents); };
  try {
    write("data/lab.json", JSON.stringify(lab));
    write(version.evaluationPath, text);
    write(version.promptPath, readFileSync(join(root, version.promptPath)));
    version.results.forEach((result) => write(result.url, readFileSync(join(root, result.url))));
    const session = completeSession();
    const before = readFileSync(join(dir, version.evaluationPath), "utf8");
    const imported = importReview(dir, session);
    assert.equal(readFileSync(join(dir, version.evaluationPath), "utf8"), before);
    assert.equal(parseProtocol(imported.text, version.prompt).sessions.length, 1);
    importReview(dir, session, { write: true });
    assert.throws(() => importReview(dir, session), /已经导入/);
    const next = completeSession();
    write(version.results[0].url, "changed original");
    assert.throws(() => importReview(dir, next), /原始产物/);
  } finally {
    assert.ok(resolve(dir).startsWith(resolve(tmpdir()) + sep + "llm-review-test-"));
    rmSync(dir, { recursive: true, force: true });
  }
});

const historicalDigests = {
  "01-rocket-launch": "7b201c507da90e6825e76fc1dafaaa038a4b8aca02ad311054b355718ed4c384",
  "02-pelican-bicycle": "f39901ef3d97c2360288b4d8ee6c2f8498eb5d78e6d8d8aaca8619fc8d078ea3"
};
for (const experiment of lab.experiments) {
  test(`${experiment.id}: historical rubric, results and commentary stay byte-equivalent`, () => {
    const value = readFileSync(join(root, `results/${experiment.id}/v2/evaluation.md`), "utf8").replace(/\r\n/g, "\n");
    const historical = value.slice(value.indexOf("## 历史评分维度")).replace(/^## 历史/gm, "## ").trim();
    assert.equal(digest(historical), historicalDigests[experiment.id]);
  });
  test(`${experiment.id}: no old AI score is treated as a current verdict`, () => {
    const version = experiment.versions[0];
    version.results.forEach((result) => {
      assert.equal(result.score, null); assert.equal(result.acceptance.status, acceptanceState(result.acceptance.checks));
      assert.ok(result.legacyScore);
      result.acceptance.checks.filter((item) => item.evidence.length === 0).forEach((check) => assert.equal(check.status, "pending"));
    });
  });
}
test("generated data passes the real build checker", () => {
  execFileSync(process.execPath, ["scripts/build-data.mjs", "--check"], { cwd: root });
});
