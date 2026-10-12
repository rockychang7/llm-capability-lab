import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join, sep } from "node:path";
import { localServer, launchBrowser, root } from "./browser-tools.mjs";

if (process.argv.some((arg) => arg.startsWith("--url="))) throw new Error("UI 测试只运行本地静态预览");
const lab = JSON.parse(readFileSync(resolve(root, "data/lab.json"), "utf8"));
const digest = (value) => createHash("sha256").update(value).digest("hex");
const number = (value) => Number.isFinite(value) ? value.toFixed(1) : "待评";
const latest = (experiment) => experiment.versions.find((item) => item.version === experiment.latestVersion);
const originals = new Map(lab.experiments.flatMap((experiment) => experiment.versions.flatMap((version) =>
  [version.promptPath, ...version.results.flatMap((result) => [result.url, result.url.replace(/[^/]+$/, "run.yaml")])]))
  .map((path) => [path, digest(readFileSync(resolve(root, path)))]));
for (const path of ["lab.js", "index.html", "lab.css"]) {
  const source = readFileSync(resolve(root, path), "utf8");
  assert.doesNotMatch(source, /\/api\/reviews|\b(?:localStorage|sessionStorage|indexedDB)\b|document\.cookie|rating-form|rating-options|user-review/);
  assert.doesNotMatch(source, /提交评价|用户评价|人工评分|草稿/);
}
const out = await mkdtemp(join(tmpdir(), "llm-lab-static-ui-"));
const server = await localServer();
let browser, checks = 0;
const base = server.url;
const currentScore = (version, result) => version.evaluation?.protocol === 5 ? result.score : {
  total: null, objective: null, taste: null, count: 0, dimensions: [], checks: [], judges: [], excluded: [], spread: null
};
const imageExperiment = lab.experiments.find((item) => item.artifactType === "image");
const rocket = lab.experiments.find((item) => item.artifactType === "page");
const imageVersion = latest(imageExperiment), imageResult = imageVersion.results[0];
const routeURL = (experiment, options = {}) => `${base}/#/${experiment.id}?${new URLSearchParams(options)}`;
async function newContext(viewport, data = null) {
  const context = await browser.newContext({ viewport });
  if (data) await context.route("**/data/lab.json", (route) => route.fulfill({ json: data }));
  await context.addInitScript(() => {
    if (window !== window.top) return;
    document.addEventListener("DOMContentLoaded", () => { document.documentElement.style.scrollBehavior = "auto"; });
    window.__labStorageAccess = [];
    for (const name of ["localStorage", "sessionStorage", "indexedDB"]) {
      Object.defineProperty(window, name, { configurable: true, get() {
        window.__labStorageAccess.push(name); throw new Error(`Static page accessed ${name}`);
      } });
    }
    Object.defineProperty(document, "cookie", { configurable: true,
      get() { window.__labStorageAccess.push("cookie"); return ""; },
      set() { window.__labStorageAccess.push("cookie"); }
    });
  });
  const page = await context.newPage(), errors = [], apiRequests = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.startsWith("/api/")) apiRequests.push(request.url());
  });
  return { context, page, errors, apiRequests };
}
async function assertStatic(state) {
  assert.deepEqual(state.errors, [], "UI exceptions");
  assert.deepEqual(state.apiRequests, [], "static frontend requested an API");
  assert.deepEqual(await state.page.evaluate(() => window.__labStorageAccess), [], "static frontend accessed browser storage");
  assert.deepEqual(await state.context.cookies(base), [], "static preview set a cookie");
}
async function clickAfterScroll(page, locator) {
  await locator.scrollIntoViewIfNeeded();
  // Chromium's iframe compositor needs a paint after scrolling before pointer input.
  await page.waitForTimeout(150);
  await locator.click();
}
async function canvasColors(canvas) {
  return canvas.evaluate((canvas) => {
    const data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
    const colors = new Set();
    for (let index = 0; index < data.length; index += 400) colors.add(`${data[index]},${data[index + 1]},${data[index + 2]}`);
    return colors.size;
  });
}
async function stable(page, name) {
  await page.locator("#app .page").waitFor();
  for (const owner of await page.locator("#app iframe").all()) {
    await owner.scrollIntoViewIfNeeded();
    const canvas = owner.contentFrame().locator("canvas").first();
    await canvas.waitFor();
    await page.waitForTimeout(1200);
    const size = await canvas.evaluate((canvas) => ({ width: canvas.width, height: canvas.height, viewport: innerWidth }));
    assert.equal(size.viewport, Number(await owner.getAttribute("width")), `${name}: wrong embedded viewport`);
    assert.ok(size.width > 100 && size.height > 100, `${name}: blank canvas size`);
    const colors = await canvasColors(canvas);
    if (colors <= 30) await page.screenshot({ path: resolve(out, `${name}-blank-diagnostic.png`) });
    assert.ok(colors > 30, `${name}: ${await owner.getAttribute("title")} has only ${colors} canvas colors`);
  }
  for (const image of await page.locator(".image-box img").all()) await image.evaluate((img) => img.decode());
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${name}: page overflow`);
  assert.equal(await page.locator("#app form,#app input,#app textarea").count(), 0, `${name}: editable rating form still present`);
  assert.equal(await page.getByRole("link", { name: "提交评价", exact: true }).count(), 0);
  assert.equal(await page.locator("#app").getByText("匿名复核", { exact: true }).count(), 0);
  assert.equal(await page.locator("#app").getByText("封存", { exact: true }).count(), 0);
  await page.screenshot({ path: resolve(out, `${name}.png`), fullPage: true });
  checks++;
}
async function assertHome(page, data) {
  for (const experiment of data.experiments) {
    const version = latest(experiment);
    for (const result of version.results) {
      const score = currentScore(version, result), token = `${experiment.id}:${result.key}`;
      assert.equal(await page.locator(`[data-home-score="${token}"]`).innerText(), number(score.total));
      assert.equal(await page.locator(`[data-home-count="${token}"]`).innerText(), `${score.count} 位 Agent`);
    }
  }
}
async function assertScore(page, version, result) {
  const score = currentScore(version, result), panel = page.locator(`[data-score="${result.key}"]`);
  assert.equal(await panel.isVisible(), true);
  for (const [metric, value] of [["total", number(score.total)], ["objective", number(score.objective)],
    ["taste", number(score.taste)], ["count", String(score.count)], ["spread", number(score.spread?.range)]]) {
    const field = panel.locator(`[data-metric="${metric}"] .readout-value`);
    assert.equal(await field.isVisible(), true, `${result.key}: ${metric} hidden`);
    assert.equal(await field.innerText(), value, `${result.key}: incorrect ${metric}`);
  }
  assert.equal(await page.locator("[data-judge]").count(), score.judges.length);
  for (const judge of score.judges) {
    const row = page.locator(`[data-judge="${judge.session}"]`);
    assert.equal(await row.locator("[data-judge-total]").innerText(), number(judge.total));
    assert.ok((await row.innerText()).includes(judge.reviewer));
    assert.ok((await row.innerText()).includes(judge.model));
  }
  assert.equal(await page.locator("[data-check]").count(), score.checks.length);
  assert.equal(await page.locator("[data-dimension]").count(), score.dimensions.length);
  for (const dimension of score.dimensions) {
    const row = panel.locator(`[data-dimension="${dimension.id}"]`);
    assert.equal(await row.isVisible(), true);
    assert.ok((await row.innerText()).includes(dimension.name));
    assert.ok((await row.locator("b").innerText()).startsWith(number(dimension.score)));
  }
  for (const check of score.checks) {
    const row = page.locator(`[data-check="${check.id}"]`);
    assert.equal(await row.isVisible(), true);
    assert.ok((await row.locator("th").innerText()).includes(check.text));
    assert.equal(await row.locator("td").first().innerText(), check.how);
    assert.ok((await row.locator("[data-check-score]").innerText()).startsWith(number(check.score)));
    assert.equal(await row.locator('.evidence[data-counted="true"]').count(), check.records.filter((item) => item.counted).length);
    assert.equal(await row.locator('.evidence[data-counted="false"]').count(), check.records.filter((item) => !item.counted).length);
  }
  assert.equal(await page.locator("[data-excluded]").count(), score.excluded.length);
  assert.ok((await page.locator(".score > .legend").innerText()).includes("品味是 AI 判断，不是人类共识"));
  assert.equal(await page.locator(".prompt-source").textContent(), version.prompt);
  const standards = page.locator(".standards");
  await clickAfterScroll(page, standards.locator("summary"));
  await standards.locator(".cells").waitFor({ state: "visible" });
  for (const dimension of version.evaluation.dimensions.filter((item) => ["objective", "taste"].includes(item.kind))) {
    assert.ok((await standards.innerText()).includes(dimension.rubric), "frozen rubric missing");
  }
  const runlog = page.locator(".bench-main > .runlog").last();
  await clickAfterScroll(page, runlog.locator("summary"));
  await runlog.locator(".cells").waitFor({ state: "visible" });
  assert.ok((await runlog.innerText()).includes(result.sha256));
  for (const value of Object.values(result.record)) assert.ok((await runlog.innerText()).includes(String(value)));
}
async function assertComparison(page, version) {
  assert.equal(await page.locator(".compare-card").count(), version.results.length);
  for (const result of version.results) {
    const score = currentScore(version, result), row = page.locator(`[data-score-row="${result.key}"]`);
    assert.deepEqual(await row.locator("td").allTextContents(), [
      number(score.total), number(score.objective), number(score.taste), String(score.count), number(score.spread?.range)
    ]);
    assert.equal(await page.locator(`[data-small-score="${result.key}"]`).innerText(), number(score.total));
  }
  assert.equal(await page.getByRole("link", { name: "评分与证据", exact: true }).count(), version.results.length);
}
async function svgPixels(page) {
  const image = page.locator(".image-box img").first();
  await image.evaluate((img) => img.decode());
  const colors = await image.evaluate((img) => {
    const canvas = document.createElement("canvas"); canvas.width = 300; canvas.height = 220;
    const context = canvas.getContext("2d"); context.drawImage(img, 0, 0, 300, 220);
    const data = context.getImageData(0, 0, 300, 220).data, colors = new Set();
    for (let index = 0; index < data.length; index += 40) colors.add(`${data[index]},${data[index + 1]},${data[index + 2]}`);
    return colors.size;
  });
  assert.ok(colors > 30, "blank original SVG pixels");
  const before = digest(await image.screenshot());
  await page.waitForTimeout(800);
  assert.notEqual(digest(await image.screenshot()), before, "static original SVG animation");
  checks++;
}
async function canvasMotion(page, viewport) {
  const owner = page.locator("iframe").first(), frame = owner.contentFrame();
  const canvas = frame.locator("canvas").first();
  await canvas.waitFor();
  await owner.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const ignition = frame.getByRole("button", { name: "点火", exact: true });
  const box = await owner.boundingBox();
  const point = await ignition.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: innerWidth, height: innerHeight };
  });
  await page.mouse.click(box.x + point.x * box.width / point.width, box.y + point.y * box.height / point.height);
  await frame.getByRole("button", { name: "发射中", exact: true }).waitFor();
  await page.waitForTimeout(1200);
  assert.ok(await canvasColors(canvas) > 30);
  const before = digest(await canvas.screenshot());
  await page.waitForTimeout(800);
  assert.notEqual(digest(await canvas.screenshot()), before, "original Canvas did not animate after ignition");
  await page.screenshot({ path: resolve(out, `${viewport}-original-canvas.png`) });
  checks++;
}
function fixtureData() {
  // These are rendering fixtures only; they never enter data files or formal evaluations.
  const experiment = structuredClone(imageExperiment), version = structuredClone(imageVersion), result = structuredClone(imageResult);
  const dimensions = [
    { id: "ui-objective", name: "Synthetic 确定性", kind: "objective", weight: 60, rubric: "Synthetic UI fixture rubric; not a real assessment." },
    { id: "ui-taste", name: "Synthetic 品味", kind: "taste", weight: 40, rubric: "Synthetic UI fixture rubric <img src=x onerror=alert(1)>." }
  ];
  const criteria = [
    { id: "ui-objective-rule", dimension: "ui-objective", text: "Synthetic 确定性规则", how: "Synthetic 浏览器证据测试" },
    { id: "ui-taste-rule", dimension: "ui-taste", text: "Synthetic 品味规则", how: "Synthetic 冻结标准 <img src=x onerror=alert(1)>" }
  ];
  const capture = (imageVersion.evaluation.browserEvidence ?? []).find((item) => item.key === result.key && item.viewport === "desktop" && item.sha256 === result.sha256);
  assert.ok(capture?.files.length, "evidence rendering fixture requires published browser media");
  const captures = ["desktop", "mobile", "dpr2", "reduced"].map((viewport) =>
    ({ ...structuredClone(capture), id: `synthetic-ui-${viewport}`, viewport }));
  captures.push(
    { ...structuredClone(captures[2]), id: "synthetic-ui-other-artifact", key: "synthetic-other-artifact" },
    { ...structuredClone(captures[3]), id: "synthetic-ui-other-hash", sha256: "0".repeat(64) }
  );
  const at = new Date(Math.max(Date.parse("2026-10-12T12:00:00Z"), Date.parse(capture.at) + 1000)).toISOString();
  const record = (id, viewport, status, score, session, counted) => ({ id, key: result.key, viewport, status, score,
    reviewer: `Synthetic ${session}`, model: "synthetic-ui-fixture-not-a-model", session, at, counted,
    source: "ui-test-fixture", evidence: "Synthetic UI rendering only <img src=x onerror=alert(1)>",
    refs: [], sha256: result.sha256 });
  const objectiveRecords = [
    record(criteria[0].id, "desktop", "pass", 5, "ui-complete-a", true),
    record(criteria[0].id, "mobile", "pass", 5, "ui-complete-a", true),
    record(criteria[0].id, "desktop", "pass", 5, "ui-complete-b", true),
    record(criteria[0].id, "mobile", "partial", 2.5, "ui-complete-b", true),
    record(criteria[0].id, "desktop", "fail", 0, "ui-old-complete", false),
    record(criteria[0].id, "desktop", "pending", null, "ui-incomplete", false)
  ];
  for (const record of objectiveRecords.slice(0, 2)) {
    record.refs = captures.map((capture) => capture.id);
  }
  const tasteRecords = [
    record(criteria[1].id, "desktop", "scored", 4.5, "ui-complete-a", true),
    record(criteria[1].id, "mobile", "scored", 3.5, "ui-complete-a", true),
    record(criteria[1].id, "desktop", "scored", 3, "ui-complete-b", true),
    record(criteria[1].id, "mobile", "scored", 4, "ui-complete-b", true)
  ];
  const judge = (session, objective, taste, total, values) => ({ session, reviewer: `Synthetic ${session}`,
    model: "synthetic-ui-fixture-not-a-model", at, objective, taste, total,
    dimensions: dimensions.map((item, index) => ({ ...item, score: values[index] })) });
  result.score = { total: 75, objective: 75, taste: 75, count: 2, aiJudges: 2,
    dimensions: dimensions.map((item) => ({ ...item, score: 3.75 })),
    checks: criteria.map((item, index) => ({ ...item, kind: dimensions[index].kind, score: 3.75, value: 0.75,
      records: index ? tasteRecords : objectiveRecords, disputed: true })),
    judges: [judge("ui-complete-a", 100, 80, 92, [5, 4]), judge("ui-complete-b", 50, 70, 58, [2.5, 3.5])],
    excluded: [{ session: "ui-incomplete", reviewer: "Synthetic ui-incomplete", model: "synthetic-ui-fixture-not-a-model", at,
      pending: [{ id: criteria[0].id, viewport: "desktop" }] }], spread: { min: 58, max: 92, range: 34 } };
  version.evaluation = { protocol: 5, dimensions, criteria, records: [...objectiveRecords, ...tasteRecords],
    aiReviews: [], browserEvidence: captures, freezeDate: "2026-10-12 (Synthetic UI fixture only)" };
  version.results = [result];
  experiment.versions = [version];
  experiment.latestVersion = version.version;
  return { vendors: structuredClone(lab.vendors), experiments: [experiment] };
}
try {
  browser = await launchBrowser();
  for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const state = await newContext(viewport), { page, context } = state;
    await page.goto(base);
    await stable(page, `${name}-home`);
    await assertHome(page, lab);
    for (const experiment of lab.experiments) {
      const version = latest(experiment);
      for (const result of version.results) {
        await page.goto(routeURL(experiment, { model: result.key, viewport: name }));
        await stable(page, `${name}-${experiment.id}-${result.key}-focus`);
        await assertScore(page, version, result);
      }
      await page.goto(routeURL(experiment, { view: "compare", viewport: name }));
      await stable(page, `${name}-${experiment.id}-compare`);
      await assertComparison(page, version);
      await clickAfterScroll(page, page.getByRole("link", { name: "评分与证据", exact: true }).first());
      await page.locator("[data-score]").waitFor();
      assert.equal(await page.locator('nav[aria-label="产物视图"] a[aria-current="true"]').innerText(), "单个查看");
      await page.goto(routeURL(experiment, { view: "rate", viewport: name }));
      await stable(page, `${name}-${experiment.id}-legacy-view`);
      assert.equal(await page.locator('nav[aria-label="产物视图"] a[aria-current="true"]').innerText(), "单个查看");
      assert.equal(await page.locator('nav[aria-label="产物视图"] a').count(), 2);
    }
    await page.goto(routeURL(imageExperiment, { model: imageResult.key, viewport: name }));
    await svgPixels(page);
    await clickAfterScroll(page, page.getByRole("button", { name: "重新加载", exact: true }));
    await page.locator(".image-box img").evaluate((img) => img.decode());
    assert.equal(await page.locator("#live").textContent(), "产物已重新加载。");
    await page.goto(routeURL(rocket, { viewport: name }));
    await canvasMotion(page, name);
    await clickAfterScroll(page, page.getByRole("link", { name: name === "desktop" ? "手机" : "桌面", exact: true }));
    await page.locator(`.frame-box.is-${name === "desktop" ? "mobile" : "desktop"}`).waitFor();
    assert.equal(Number(await page.locator("iframe").getAttribute("width")), name === "desktop" ? 390 : 1440);
    await assertStatic(state);
    await context.close();

    const data = fixtureData(), synthetic = await newContext(viewport, data);
    const syntheticExperiment = data.experiments[0], syntheticVersion = latest(syntheticExperiment), syntheticResult = syntheticVersion.results[0];
    await synthetic.page.goto(base);
    await stable(synthetic.page, `${name}-synthetic-home`);
    await assertHome(synthetic.page, data);
    await synthetic.page.goto(routeURL(syntheticExperiment));
    await assertScore(synthetic.page, syntheticVersion, syntheticResult);
    const records = syntheticVersion.results[0].score.checks[0].records;
    for (const [index, record] of records.slice(0, 2).entries()) {
      const evidence = synthetic.page.locator('[data-check="ui-objective-rule"] .evidence').nth(index);
      await clickAfterScroll(synthetic.page, evidence.locator("summary"));
      const text = await evidence.innerText();
      assert.ok(text.includes("Synthetic UI rendering only <img"));
      const allowedRefs = new Set([`synthetic-ui-${record.viewport}`, "synthetic-ui-dpr2", "synthetic-ui-reduced"]);
      for (const capture of syntheticVersion.evaluation.browserEvidence) {
        const media = evidence.locator(`[data-media-ref="${capture.id}"]`);
        if (allowedRefs.has(capture.id)) {
          assert.equal(await media.count(), capture.files.length, `${capture.id}: valid evidence reference omitted`);
          assert.equal(await media.first().isVisible(), true);
          assert.equal(await media.first().getAttribute("href"), capture.files[0].path);
          assert.ok(text.includes(capture.at));
          assert.ok(text.includes(capture.fingerprint));
          assert.ok(text.includes(capture.files[0].sha256));
        } else {
          assert.equal(await media.count(), 0, `${capture.id}: incompatible evidence reference accepted`);
          assert.ok(text.includes(`证据引用：${capture.id}（媒体未发布）`));
        }
      }
      checks++;
    }
    assert.equal(await synthetic.page.locator(".rules img,.standards img").count(), 0, "AI content interpreted as HTML");
    const capture = syntheticVersion.evaluation.browserEvidence[0];
    assert.equal((await fetch(`${base}/${capture.files[0].path}`)).status, 200);
    await clickAfterScroll(synthetic.page, synthetic.page.locator(".excluded-reviews > summary"));
    assert.ok((await synthetic.page.locator(".excluded-reviews").innerText()).includes("ui-objective-rule"));
    assert.equal(await synthetic.page.locator('[data-excluded="ui-old-complete"]').count(), 0, "replaced complete session shown as incomplete");
    await stable(synthetic.page, `${name}-synthetic-agent-scores`);
    await synthetic.page.goto(routeURL(syntheticExperiment, { view: "compare" }));
    await stable(synthetic.page, `${name}-synthetic-compare`);
    await assertComparison(synthetic.page, syntheticVersion);
    await assertStatic(synthetic);
    await synthetic.context.close();

    const pending = fixtureData(), pendingResult = latest(pending.experiments[0]).results[0];
    pendingResult.score = { ...pendingResult.score, total: null, objective: null, taste: null, count: 0, aiJudges: 0,
      dimensions: pendingResult.score.dimensions.map((item) => ({ ...item, score: null })),
      checks: pendingResult.score.checks.map((item) => ({ ...item, score: null, value: null, records: [], disputed: false })),
      judges: [], excluded: [], spread: null };
    const unscored = await newContext(viewport, pending);
    await unscored.page.goto(routeURL(pending.experiments[0]));
    await assertScore(unscored.page, latest(pending.experiments[0]), pendingResult);
    await stable(unscored.page, `${name}-synthetic-pending`);
    await assertStatic(unscored);
    await unscored.context.close();
  }
  for (const path of ["/.local/reviews.json", "/.env", "/server/reviews.mjs", "/api/reviews.js"]) {
    assert.equal((await fetch(base + path)).status, 403, "private server file exposed");
  }
  for (const [path, hash] of originals) assert.equal(digest(readFileSync(resolve(root, path))), hash, `original source changed: ${path}`);
  console.log(`ok    ${checks} 组静态 UI 检查：桌面、手机、Agent 分数与细项、对照、无表单/API/存储、原始 SVG/Canvas 动画及源码保护`);
} finally {
  if (browser) await browser.close();
  await server.close();
  assert.ok(resolve(out).startsWith(resolve(tmpdir()) + sep));
  if (process.env.KEEP_UI_SCREENSHOTS === "1") console.log(`UI screenshots: ${out}`);
  else await rm(out, { recursive: true, force: true });
}
