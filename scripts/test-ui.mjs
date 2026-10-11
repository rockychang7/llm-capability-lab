import assert from "node:assert/strict";
import { mkdirSync, readFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join, sep } from "node:path";
import { localServer, launchBrowser, root } from "./browser-tools.mjs";
import { digest } from "./evaluation.mjs";
import { FileReviewStore } from "../server/review-store.mjs";
import { createReviewHandler } from "../server/reviews.mjs";

if (process.argv.some((arg) => arg.startsWith("--url="))) throw new Error("提交测试只运行隔离本地数据库，禁止向生产环境写测试评价");
const lab = JSON.parse(readFileSync(resolve(root, "data/lab.json"), "utf8"));
const temp = await mkdtemp(join(tmpdir(), "llm-lab-ui-"));
const out = resolve(root, "test-results/ui");
mkdirSync(out, { recursive: true });
const store = new FileReviewStore(join(temp, "reviews.json"));
const handler = createReviewHandler({ lab, store, secret: "isolated-ui-test-secret" });
const server = await localServer({ reviews: handler });
const browser = await launchBrowser();
const base = server.url;
let checks = 0;
const imageExperiment = lab.experiments.find((item) => item.artifactType === "image");
const version = imageExperiment.versions.find((item) => item.version === imageExperiment.latestVersion);
const result = version.results[0];
const routeURL = `${base}/#/${imageExperiment.id}?model=${result.key}`;
const humanDimensions = version.evaluation.dimensions.filter((item) => item.source === "human");
const waitService = (page) => page.waitForFunction(() => document.querySelector(".rating-service")?.textContent.includes("已连接"));
async function selectScores(page, values = [4, 5]) {
  for (let index = 0; index < humanDimensions.length; index++) {
    await page.locator(`input[name="score:${humanDimensions[index].id}"][value="${values[index]}"]`).check({ force: true });
  }
}
async function draft(page) {
  return page.evaluate(() => {
    const key = Object.keys(localStorage).find((key) => key.startsWith("llm-lab-rating:"));
    return key ? JSON.parse(localStorage.getItem(key)) : null;
  });
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
  assert.equal(await page.locator("#app").getByText("匿名复核", { exact: true }).count(), 0);
  assert.equal(await page.locator("#app").getByText("封存", { exact: true }).count(), 0);
  await page.screenshot({ path: resolve(out, `${name}.png`), fullPage: true });
  checks++;
}
async function submit(page) {
  await page.getByRole("button", { name: /提交评价/ }).click();
  await page.waitForFunction(() => document.querySelector(".rating-service")?.textContent.includes("已提交"));
}
try {
  for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage(), errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base);
    await stable(page, `${name}-home`);
    for (const experiment of lab.experiments) {
      for (const view of ["focus", "compare", "rate"]) {
        await page.goto(`${base}/#/${experiment.id}?view=${view}&viewport=${name}`);
        await stable(page, `${name}-${experiment.id}-${view}`);
        if (view !== "compare") {
          await waitService(page);
          assert.equal(await page.locator(".rating-field").count(), 2, "human workload is not two broad ratings");
          assert.equal(await page.locator("select[data-check]").count(), 0, "fine-grained human checks still present");
          assert.ok((await page.locator(".stage-bar").innerText()).includes(experiment.versions[0].results[0].label));
        }
      }
    }
    assert.deepEqual(errors, [], `${name}: UI exceptions`);
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage(), errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  // Home initializes multiple experiment APIs; all tokens must share the eventual cookie.
  await page.goto(base);
  await page.locator(".exp-row").nth(1).waitFor();
  await page.waitForTimeout(500);
  await page.goto(routeURL);
  await waitService(page);
  await page.locator('input[name="reviewer"]').fill("Synthetic UI test only");
  await selectScores(page);
  await page.locator('textarea[name="comment"]').fill("<img src=x onerror=alert(1)> test-only");
  const initialDraft = await draft(page);
  assert.ok(initialDraft.id);
  await page.reload();
  await waitService(page);
  assert.equal(await page.locator('input[name="reviewer"]').inputValue(), "Synthetic UI test only");
  assert.equal(await page.locator(`input[name="score:${humanDimensions[0].id}"][value="4"]`).isChecked(), true);
  await submit(page);
  assert.equal(await draft(page), null);
  assert.equal(await page.locator("[data-feed] .user-review").count(), 1);
  assert.equal(await page.locator("[data-feed] img").count(), 0, "public comment interpreted as HTML");
  assert.ok((await page.locator("[data-feed]").innerText()).includes("<img src=x onerror=alert(1)>"));
  assert.equal(await page.locator("[data-score] .readout-value").last().innerText(), "1");
  assert.equal(await page.locator("[data-score] .readout-value").first().innerText(), "待评", "missing AI score fabricated");
  await page.reload();
  await waitService(page);
  assert.equal(await page.locator(`input[name="score:${humanDimensions[0].id}"][value="4"]`).isChecked(), true);
  await page.locator('input[name="reviewer"]').fill("Updated nickname");
  await page.locator('select[name="viewport"]').selectOption("mobile");
  await selectScores(page, [2, 3]);
  await submit(page);
  assert.equal(await page.locator("[data-feed] .user-review").count(), 1);
  assert.equal(await page.locator("[data-score] .readout-value").last().innerText(), "1");
  assert.ok((await page.locator("[data-feed]").innerText()).includes("Updated nickname"));
  checks++;

  // A failed request retains the exact id for an unchanged retry.
  await selectScores(page, [5, 5]);
  await page.locator('textarea[name="comment"]').fill("retry-test");
  const retryDraft = await draft(page);
  await page.route("**/api/reviews", async (route) => {
    if (route.request().method() === "POST") return route.fulfill({ status: 503, json: { error: "Synthetic outage" } });
    return route.continue();
  });
  await page.getByRole("button", { name: /提交评价/ }).click();
  await page.locator("#review-error").filter({ hasText: "草稿已保留" }).waitFor();
  assert.equal((await draft(page)).id, retryDraft.id);
  await page.unroute("**/api/reviews");
  await submit(page);
  assert.equal(await page.locator("[data-score] .readout-value").last().innerText(), "1");
  checks++;

  // New edits during a slow response are not removed by the earlier submission.
  let release, arrived;
  const arrivedPromise = new Promise((resolve) => { arrived = resolve; });
  const delayed = new Promise((resolve) => { release = resolve; });
  await page.route("**/api/reviews", async (route) => {
    if (route.request().method() === "POST") { arrived(); await delayed; }
    await route.continue();
  });
  await page.locator('textarea[name="comment"]').fill("first snapshot");
  await page.getByRole("button", { name: /提交评价/ }).click();
  await arrivedPromise;
  await page.locator('textarea[name="comment"]').fill("newer unsent draft");
  release();
  await page.waitForFunction(() => document.querySelector(".rating-service")?.textContent.includes("新修改"));
  assert.equal((await draft(page)).comment, "newer unsent draft");
  await page.unroute("**/api/reviews");
  await page.waitForFunction(() => !document.querySelector('#rating-form button[type="submit"]').disabled);
  await submit(page);
  assert.ok((await page.locator("[data-feed]").innerText()).includes("newer unsent draft"));
  checks++;

  // Navigating away and back while submitting keeps correct state and draft.
  let releaseNavigation, navigationArrived;
  const navigationWait = new Promise((resolve) => { navigationArrived = resolve; });
  const navigationDelay = new Promise((resolve) => { releaseNavigation = resolve; });
  await page.route("**/api/reviews", async (route) => {
    if (route.request().method() === "POST") { navigationArrived(); await navigationDelay; }
    await route.continue();
  });
  await page.locator('textarea[name="comment"]').fill("navigation snapshot");
  await page.getByRole("button", { name: /提交评价/ }).click();
  await navigationWait;
  await page.evaluate(() => { location.hash = "#/"; });
  await page.locator(".exp-table").waitFor();
  await page.evaluate((hash) => { location.hash = hash; }, routeURL.slice(base.length + 1));
  await page.locator("#rating-form").waitFor();
  assert.equal(await page.getByRole("button", { name: /提交评价/ }).isDisabled(), true);
  releaseNavigation();
  await page.waitForFunction(() => !document.querySelector('#rating-form button[type="submit"]').disabled);
  await page.unroute("**/api/reviews");
  await page.getByRole("button", { name: "刷新评价" }).click();
  await page.waitForFunction(() => document.querySelector("[data-feed]")?.textContent.includes("navigation snapshot"));
  assert.equal(await draft(page), null);
  checks++;

  // Original SVG uses real image pixels and visibly changes over time.
  const image = page.locator(".image-box img");
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
  await stable(page, "desktop-rating-submitted");
  assert.deepEqual(errors, []);
  await context.close();

  const secondContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const secondPage = await secondContext.newPage();
  await secondPage.goto(routeURL);
  await waitService(secondPage);
  assert.equal(await secondPage.locator("[data-score] .readout-value").last().innerText(), "1", "other user cannot see persisted review");
  await secondPage.locator('input[name="reviewer"]').fill("Second synthetic user");
  await selectScores(secondPage, [1, 1]);
  await submit(secondPage);
  assert.equal(await secondPage.locator("[data-score] .readout-value").last().innerText(), "2");
  await stable(secondPage, "mobile-rating-submitted");
  await secondContext.close();

  const offlineContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await offlineContext.route("**/api/reviews?*", (route) => route.fulfill({ status: 503,
    json: { available: false, error: "评价服务暂不可用" } }));
  const offline = await offlineContext.newPage();
  await offline.goto(routeURL);
  await offline.locator(".rating-service").filter({ hasText: "不可用" }).waitFor();
  assert.equal(await offline.getByRole("button", { name: /提交评价/ }).isDisabled(), true);
  await offline.locator('input[name="reviewer"]').fill("Offline draft");
  await selectScores(offline, [3, 3]);
  await offline.reload();
  await offline.locator("#rating-form").waitFor();
  assert.equal(await offline.locator('input[name="reviewer"]').inputValue(), "Offline draft");
  await stable(offline, "mobile-service-unavailable");
  await offlineContext.close();

  const rocket = lab.experiments.find((item) => item.artifactType === "page");
  const canvasContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const canvasPage = await canvasContext.newPage();
  await canvasPage.goto(`${base}/#/${rocket.id}?viewport=mobile`);
  const owner = canvasPage.locator("iframe").first(), frame = owner.contentFrame();
  await frame.locator("canvas").first().waitFor();
  await owner.scrollIntoViewIfNeeded();
  const ignition = frame.getByRole("button", { name: "点火", exact: true });
  const box = await owner.boundingBox();
  const point = await ignition.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: innerWidth, height: innerHeight };
  });
  await canvasPage.mouse.click(box.x + point.x * box.width / point.width, box.y + point.y * box.height / point.height);
  await frame.getByRole("button", { name: "发射中", exact: true }).waitFor();
  await canvasPage.waitForTimeout(1200);
  assert.ok(await canvasColors(frame.locator("canvas").first()) > 30);
  await canvasPage.screenshot({ path: resolve(out, "mobile-original-canvas.png") });
  await canvasContext.close();
  checks++;
  for (const path of ["/.local/reviews.json", "/.env", "/server/reviews.mjs", "/api/reviews.js"]) {
    assert.equal((await fetch(base + path)).status, 403, "private server file exposed");
  }
  console.log(`ok    ${checks} 组 UI / 评分流程检查：桌面、手机、真实提交、持久化、改评去重、故障草稿、原始 SVG 动画与 Canvas`);
} finally {
  await browser.close();
  await server.close();
  assert.ok(resolve(temp).startsWith(resolve(tmpdir()) + sep));
  await rm(temp, { recursive: true, force: true });
}
