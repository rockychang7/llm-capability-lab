import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, existsSync } from "node:fs";
import { resolve, join, sep } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { digest, parseProtocol, validateRecord, validateRecordSession, validateSession, validateAIReview, resolveChecks, acceptanceState, replaceJsonSection, sections } from "../scripts/evaluation.mjs";
import { createSession, createQueue, sealSession, sessionMatches, validDraft, comparisonSummary, expandAudit, recordRef } from "../review.js";
import { importReview } from "../scripts/import-review.mjs";
import { importAI } from "../scripts/import-ai.mjs";
import { localServer } from "../scripts/browser-tools.mjs";

const root = resolve(import.meta.dirname, "..");
const lab = JSON.parse(readFileSync(join(root, "data/lab.json"), "utf8"));
const experiment = lab.experiments[1], version = experiment.versions[0];
const text = readFileSync(join(root, version.evaluationPath), "utf8").replace(/\r\n/g, "\n");
const protocol = parseProtocol(text, version.prompt);
const hashes = Object.fromEntries(version.results.map((item) => [item.key, item.sha256]));
function record(overrides = {}) {
  return { key: version.results[0].key, id: "pelican", source: "ai", reviewer: "judge-a", model: "test-model",
    family: "family-a", independentDeclared: true, viewport: "desktop", session: "test-batch", refs: ["test-media"],
    status: "pass", at: "2026-10-11T00:00:00Z", fingerprint: protocol.fingerprint,
    sha256: version.results[0].sha256, evidence: "Synthetic test observation, never published", ...overrides };
}
function humanSession() {
  const session = createSession(experiment, version, "test-only-reviewer", true, "desktop", () => 0.3);
  const task = session.queue[0];
  session.assessments[task.key] = { observed: true, checks: { [task.id]: {
    status: "pending", note: "Synthetic fixture; not an actual human observation", at: new Date().toISOString()
  } } };
  return sealSession(session);
}
function aiFixture() {
  const fixture = structuredClone(protocol);
  fixture.browserEvidence = Object.keys(hashes).flatMap((key) => ["desktop", "mobile"].map((viewport) => ({
    id: `${key}-${viewport}`, key, viewport, sha256: hashes[key], fingerprint: protocol.fingerprint,
    at: new Date().toISOString(), files: [{ path: "assets/evidence/fixture.png", kind: "frame", sha256: digest("fixture") }]
  })));
  const batch = { protocol: 3, source: "ai", id: crypto.randomUUID(), experiment: experiment.id, version: version.version,
    reviewer: "synthetic-judge", model: "synthetic-model", family: "synthetic-family", independentDeclared: true,
    fingerprint: protocol.fingerprint, hashes, sealedAt: new Date().toISOString(), comparisons: [],
    checks: Object.keys(hashes).flatMap((key) => ["desktop", "mobile"].flatMap((viewport) =>
      protocol.criteria.filter((item) => item.method === "ai").map((item) => ({
        key, id: item.id, viewport, status: "pending", evidence: "Synthetic only", refs: [`${key}-${viewport}`]
      })))) };
  return { fixture, batch };
}
test("protocol 3 fingerprint freezes criteria, dimensions, prompt and policy", () => {
  assert.equal(protocol.protocol, 3); assert.equal(protocol.fingerprint, version.evaluation.fingerprint);
  assert.notEqual(parseProtocol(text.replace("大喉囊可见", "changed"), version.prompt).fingerprint, protocol.fingerprint);
  assert.throws(() => parseProtocol(text.replace("| pouch |", "| pelican |"), version.prompt), /重复/);
  assert.throws(() => parseProtocol(text.replace("**评测协议**：3", "**评测协议**：2"), version.prompt), /协议/);
});
test("fenced headings and canonical record arrays are parsed safely", () => {
  assert.equal(sections("## A\n```json\n## not-heading\n```\n## B\ntext")["not-heading"], undefined);
  assert.throws(() => parseProtocol(replaceJsonSection(text, "AI 评审", {}), version.prompt), /数组/);
});
test("sources, artifact hashes, rubric, identities, viewports and evidence are validated", () => {
  assert.doesNotThrow(() => validateRecord(record(), protocol, hashes));
  for (const overrides of [{ sha256: "bad" }, { fingerprint: "bad" }, { source: "auto" }, { reviewer: "unknown" },
    { at: 2026 }, { evidence: "" }, { viewport: "all" }, { refs: [] }, { independentDeclared: false }, { family: "" }]) {
    assert.throws(() => validateRecord(record(overrides), protocol, hashes));
  }
  assert.throws(() => validateRecord(record({ id: "animation", source: "human" }), protocol, hashes), /来源/);
});
test("two independent families and both viewports are needed for AI visual core pass", () => {
  const status = (records) => resolveChecks(protocol.criteria, records, record().key).find((item) => item.id === "pelican").status;
  assert.equal(status([record()]), "pending");
  const both = ["desktop", "mobile"].flatMap((viewport) => [record({ viewport }), record({ viewport, reviewer: "judge-b", family: "family-b" })]);
  assert.equal(status(both), "pass");
  assert.equal(status(both.map((item) => ({ ...item, family: "same-family" }))), "pending");
  assert.equal(status(both.map((item) => ({ ...item, status: "fail" }))), "pending");
  both[1].status = "fail"; assert.equal(status(both), "pending");
});
test("human resolution overrides AI only for actually reviewed criterion and viewport", () => {
  const human = record({ source: "human", reviewer: "person", status: "fail" });
  const check = resolveChecks(protocol.criteria, [record(), human], human.key).find((item) => item.id === "pelican");
  assert.equal(check.status, "fail"); assert.equal(check.viewports.desktop.source, "human");
  assert.equal(check.viewports.mobile.status, "pending");
  const conflict = resolveChecks(protocol.criteria, [human, { ...human, reviewer: "other", status: "pass" }], human.key).find((item) => item.id === "pelican");
  assert.equal(conflict.status, "pending"); assert.equal(conflict.disputed, true);
  const latest = resolveChecks(protocol.criteria, [human, { ...human, at: "2026-10-11T01:00:00Z", status: "pass" }], human.key).find((item) => item.id === "pelican");
  assert.equal(latest.viewports.desktop.status, "pass");
});
test("core failures cannot be compensated with detail or averages", () => {
  assert.equal(acceptanceState([{ tier: "core", status: "fail" }, { tier: "core", status: "pending" }]), "fail");
  assert.equal(acceptanceState([{ tier: "core", status: "partial" }, { tier: "core", status: "pending" }]), "pending");
  assert.equal(acceptanceState([{ tier: "core", status: "pass" }, { tier: "detail", status: "fail" }]), "pass");
});
test("normal human queue is small, stratified and never reconfirms auto items", () => {
  const session = createSession(experiment, version, "test", false, "mobile", () => 0.2);
  assert.equal(session.queue.length + session.tasks.length, 16);
  for (const result of version.results) {
    assert.ok(session.queue.some((task) => task.key === result.key && protocol.criteria.find((item) => item.id === task.id).tier === "core"));
    assert.ok(session.queue.some((task) => task.key === result.key && protocol.criteria.find((item) => item.id === task.id).tier === "detail"));
  }
  assert.ok(session.queue.every((task) => protocol.criteria.find((item) => item.id === task.id).method !== "auto"));
  assert.equal(validDraft(session, version, experiment.id), true);
});
test("risk tasks are not cut off by the routine budget", () => {
  const fixture = structuredClone(version);
  for (const result of fixture.results) for (const check of result.acceptance.checks.filter((item) => item.tier === "core" && item.method === "ai")) check.viewports.desktop.risk = true;
  const queue = createQueue(fixture, "desktop", () => 0);
  assert.equal(queue.filter((item) => item.reason === "core-risk").length, 36);
  assert.ok(queue.length > 16);
});
test("audit failure expands the affected artifact but does not manufacture answers", () => {
  const session = createSession(experiment, version, "test", false, "desktop", () => 0);
  const task = session.queue.find((task) => protocol.criteria.find((item) => item.id === task.id).tier === "core");
  expandAudit(session, version, task, { status: "fail" });
  assert.equal(session.expanded, true);
  assert.equal(session.queue.filter((item) => item.key === task.key).length, protocol.criteria.filter((item) => item.method !== "auto").length);
  assert.deepEqual(session.assessments, {});
});
test("partial checklist-only and comparison-only sessions can seal and validate", () => {
  const session = humanSession();
  assert.equal(Object.values(session.assessments).flatMap((item) => Object.keys(item.checks)).length, 1);
  assert.equal(session.tasks.length, 0); assert.doesNotThrow(() => validateSession(session, protocol, hashes));
  const comparison = createSession(experiment, version, "test", false, "desktop");
  comparison.tasks[0] = { ...comparison.tasks[0], choice: "unknown", note: "Synthetic", at: new Date().toISOString() };
  assert.doesNotThrow(() => validateSession(sealSession(comparison), protocol, hashes));
  assert.throws(() => sealSession(createSession(experiment, version, "test", false, "desktop")), /至少/);
});
test("incomplete, wrong-source, duplicate and post-seal records are rejected", () => {
  for (const mutate of [
    (s) => { s.sealedAt = null; }, (s) => { s.source = "ai"; },
    (s) => { s.assessments[s.queue[0].key].observed = false; },
    (s) => { s.queue.push(s.queue[0]); },
    (s) => { s.assessments[s.queue[0].key].checks[s.queue[0].id].at = "2099-01-01T00:00:00Z"; },
    (s) => { s.assessments[s.queue[0].key].checks[s.queue[0].id].at = "2000-01-01T00:00:00Z"; },
    (s) => { s.createdAt = "2099-01-01T00:00:00Z"; }
  ]) { const session = humanSession(); mutate(session); assert.throws(() => validateSession(session, protocol, hashes)); }
  const session = humanSession(); session.version = 99; assert.equal(sessionMatches(session, version), false);
  assert.equal(validDraft(null, version, experiment.id), false);
});
test("AI references can remove repeated prose only after independent judgment", () => {
  const session = humanSession(), task = session.queue[0], answer = session.assessments[task.key].checks[task.id];
  const reference = record({ key: task.key, id: task.id, status: "pass" });
  const fixture = { ...protocol, records: [reference] };
  answer.status = "pass"; answer.initialStatus = "pass"; answer.note = "";
  answer.revealedAt = answer.at; answer.evidenceRef = recordRef(reference);
  assert.doesNotThrow(() => validateSession(session, fixture, hashes));
  answer.initialStatus = "fail"; assert.throws(() => validateSession(session, fixture, hashes));
  answer.note = "Changed after actual re-observation"; assert.doesNotThrow(() => validateSession(session, fixture, hashes));
  answer.evidenceRef = "wrong"; assert.throws(() => validateSession(session, fixture, hashes), /引用/);
});
test("AI import requires full two-viewport coverage and current relevant browser media", () => {
  const { fixture, batch } = aiFixture();
  assert.doesNotThrow(() => validateAIReview(batch, fixture, hashes));
  batch.checks.pop(); assert.throws(() => validateAIReview(batch, fixture, hashes), /完整/);
  const other = aiFixture(); other.batch.checks[0].refs = ["wrong"];
  assert.throws(() => validateAIReview(other.batch, other.fixture, hashes), /证据/);
  const future = aiFixture(); future.fixture.browserEvidence[0].at = "2099-01-01T00:00:00Z";
  assert.throws(() => validateAIReview(future.batch, future.fixture, hashes), /早于/);
});
test("canonical rows cannot invent a different family, date or evidence from the sealed session", () => {
  const { fixture, batch } = aiFixture();
  fixture.aiReviews = [batch];
  const check = batch.checks[0];
  const ai = { ...check, source: "ai", session: batch.id, reviewer: batch.reviewer, model: batch.model,
    family: batch.family, independentDeclared: true, at: batch.sealedAt };
  assert.doesNotThrow(() => validateRecordSession(ai, fixture));
  for (const overrides of [{ family: "invented-family" }, { model: "invented-model" }, { at: "2000-01-01T00:00:00Z" },
    { evidence: "different observation" }, { refs: [] }, { reviewer: "different-reviewer" }]) {
    assert.throws(() => validateRecordSession({ ...ai, ...overrides }, fixture));
  }
  const session = humanSession(), task = session.queue[0], answer = session.assessments[task.key].checks[task.id];
  const human = { key: task.key, id: task.id, source: "human", session: session.id, reviewer: session.reviewer,
    viewport: session.viewport, status: answer.status, at: answer.at, evidence: answer.note };
  fixture.sessions = [session];
  assert.doesNotThrow(() => validateRecordSession(human, fixture));
  assert.throws(() => validateRecordSession({ ...human, evidence: "different observation" }, fixture));
});
test("partial sessions aggregate latest per pair rather than dropping unrelated old votes", () => {
  const fixture = structuredClone(version); fixture.results.forEach((item) => item.acceptance.status = "pass");
  const session = createSession(experiment, version, "test", false, "desktop", () => 0);
  session.tasks.forEach((task) => Object.assign(task, { choice: "left", note: "Synthetic", at: new Date().toISOString() }));
  const first = sealSession(session), second = structuredClone(first);
  second.id = "second"; second.tasks = [second.tasks[0]]; second.tasks[0].choice = "tie";
  second.tasks[0].at = "2099-01-01T00:00:00Z";
  fixture.evaluation.sessions = [first, second];
  assert.equal(comparisonSummary(fixture).reduce((sum, item) => sum + item.eligible, 0), 4);
  fixture.results.forEach((item) => item.acceptance.status = "pending");
  assert.equal(comparisonSummary(fixture).reduce((sum, item) => sum + item.excluded, 0), 4);
});
test("AI position disagreement is unknown and never enters human vote counts", () => {
  const fixture = structuredClone(version); fixture.results.forEach((item) => item.acceptance.status = "pass");
  fixture.evaluation.aiReviews = [{ reviewer: "ai", comparisons: [{ left: version.results[0].key, right: version.results[1].key,
    dimension: protocol.dimensions[0].id, viewport: "desktop", choice: "left", reverseChoice: "right", at: new Date().toISOString() }] }];
  assert.equal(comparisonSummary(fixture, "ai")[0].rows[0].unknown, 1);
  assert.equal(comparisonSummary(fixture)[0].eligible, 0);
});
test("importers verify real disk bytes, dry-run safely, and do not publish test fixtures", () => {
  const dir = mkdtempSync(join(tmpdir(), "llm-review-test-"));
  const write = (path, value) => { mkdirSync(resolve(dir, path, ".."), { recursive: true }); writeFileSync(join(dir, path), value); };
  try {
    write("data/lab.json", JSON.stringify(lab)); write(version.evaluationPath, text);
    write(version.promptPath, readFileSync(join(root, version.promptPath)));
    version.results.forEach((item) => write(item.url, readFileSync(join(root, item.url))));
    // No real media is copied into this isolated canonical fixture.
    const fixtureText = replaceJsonSection(text, "浏览器证据", []);
    write(version.evaluationPath, fixtureText);
    const session = humanSession();
    const before = readFileSync(join(dir, version.evaluationPath), "utf8");
    assert.equal(parseProtocol(importReview(dir, session).text, version.prompt).records.filter((item) => item.source === "human").length, 1);
    assert.equal(readFileSync(join(dir, version.evaluationPath), "utf8"), before);
    importReview(dir, session, { write: true }); assert.throws(() => importReview(dir, session), /已经导入/);
    const { fixture, batch } = aiFixture();
    write("assets/evidence/fixture.png", "fixture");
    write(version.evaluationPath, replaceJsonSection(fixtureText, "浏览器证据", fixture.browserEvidence));
    assert.equal(importAI(dir, batch).checks, batch.checks.length);
    importAI(dir, batch, { write: true }); assert.throws(() => importAI(dir, batch), /已导入/);
    write(version.results[0].url, "changed artifact"); assert.throws(() => importReview(dir, humanSession()), /原始产物/);
  } finally {
    assert.ok(resolve(dir).startsWith(resolve(tmpdir()) + sep + "llm-review-test-"));
    rmSync(dir, { recursive: true, force: true });
  }
});
for (const experiment of lab.experiments) test(`${experiment.id}: only new baseline and no historical scores`, () => {
  assert.equal(experiment.latestVersion, 1); assert.equal(experiment.versions.length, 1);
  assert.equal(existsSync(join(root, `prompts/${experiment.id}/prompt-v2.md`)), false);
  const version = experiment.versions[0];
  assert.ok(!/## 历史|## 评分结果/.test(readFileSync(join(root, version.evaluationPath), "utf8")));
  for (const item of version.results) {
    assert.equal(item.legacyScore, undefined); assert.equal(item.score, undefined);
    assert.equal(item.acceptance.status, acceptanceState(item.acceptance.checks));
  }
});
test("local preview serves correct media types and byte ranges for evidence playback", async () => {
  const server = await localServer();
  try {
    const full = readFileSync(join(root, "lab.js"));
    const response = await fetch(`${server.url}/lab.js`, { headers: { Range: "bytes=0-9" } });
    assert.equal(response.status, 206);
    assert.equal(response.headers.get("content-range"), `bytes 0-9/${full.length}`);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), full.subarray(0, 10));
    const suffix = await fetch(`${server.url}/lab.js`, { headers: { Range: "bytes=-5" } });
    assert.deepEqual(Buffer.from(await suffix.arrayBuffer()), full.subarray(-5));
    const head = await fetch(`${server.url}/lab.js`, { method: "HEAD" });
    assert.equal(Number(head.headers.get("content-length")), full.length);
    assert.equal(await head.text(), "");
    for (const range of ["bytes=-", "bytes=999999999999999999999999-", "bytes=10-2", "items=0-5"]) {
      const invalid = await fetch(`${server.url}/lab.js`, { headers: { Range: range } });
      assert.equal(invalid.status, 416);
    }
    const video = lab.experiments.flatMap((item) => item.versions).flatMap((item) => item.evaluation.browserEvidence)
      .flatMap((item) => item.files).find((item) => item.kind === "video");
    if (video) {
      const response = await fetch(`${server.url}/${video.path}`, { headers: { Range: "bytes=0-3" } });
      assert.equal(response.headers.get("content-type"), "video/webm");
      assert.equal(response.status, 206);
      assert.equal((await response.arrayBuffer()).byteLength, 4);
    }
  } finally { await server.close(); }
});
test("generated data passes real consistency checker", () => {
  execFileSync(process.execPath, ["scripts/build-data.mjs", "--check"], { cwd: root });
});
