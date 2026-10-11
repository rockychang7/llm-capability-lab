import assert from "node:assert/strict";
import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { localServer, launchBrowser, root } from "./browser-tools.mjs";
import { digest, validateSession } from "./evaluation.mjs";

const remote = process.argv.find((arg) => arg.startsWith("--url="))?.slice(6);
const server = remote ? null : await localServer();
const base = (remote ?? server.url).replace(/\/$/, "");
const out = resolve(root, "test-results/ui");
mkdirSync(out, { recursive: true });
const browser = await launchBrowser();
let checks = 0;
const lab = await (await fetch(`${base}/data/lab.json`, { cache: "no-store" })).json();
const experiment = lab.experiments.find((item) => item.artifactType === "image");
const version = experiment.versions.find((item) => item.version === experiment.latestVersion);

async function stable(page, name) {
  await page.locator("#app .page").waitFor();
  let previewIndex = 0;
  for (const frame of await page.locator("#app iframe").all()) {
    await frame.scrollIntoViewIfNeeded();
    await frame.contentFrame().locator("canvas").first().waitFor();
    await page.waitForTimeout(1200);
    const dimensions = await frame.contentFrame().locator("canvas").first().evaluate((canvas) =>
      ({ width: canvas.width, height: canvas.height, viewportWidth: innerWidth, viewportHeight: innerHeight }));
    assert.equal(dimensions.viewportWidth, Number(await frame.getAttribute("width")), `${name}: wrong embedded viewport`);
    assert.ok(dimensions.width > 100 && dimensions.height > 100, `${name}: blank initial canvas`);
    assert.ok(await canvasColors(frame.contentFrame().locator("canvas").first()) > 30, `${name}: original canvas has no substantive pixels`);
    await page.screenshot({ path: resolve(out, `${name}-preview-${++previewIndex}.png`) });
  }
  await page.locator("#app").evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${name}: page overflow`);
  await page.screenshot({ path: resolve(out, `${name}.png`), fullPage: true });
  checks++;
}
async function canvasColors(canvas) {
  return canvas.evaluate((canvas) => {
    const context = canvas.getContext("2d");
    if (!context) return -1;
    const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const colors = new Set();
    for (let i = 0; i < data.length; i += 400) colors.add(`${data[i]},${data[i + 1]},${data[i + 2]},${data[i + 3]}`);
    return colors.size;
  });
}
async function clickEmbedded(page, owner, button) {
  await owner.scrollIntoViewIfNeeded();
  const box = await owner.boundingBox();
  const point = await button.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: innerWidth, height: innerHeight };
  });
  // Opaque-origin frames report unscaled control bounds; map to real pointer coordinates.
  await page.mouse.click(box.x + point.x * box.width / point.width, box.y + point.y * box.height / point.height);
}
async function anonymous(page) {
  const surface = await page.locator("#app").innerText();
  for (const result of version.results) assert.ok(!surface.includes(result.label), "model identity leaked in anonymous UI");
  assert.ok(!surface.includes("历史 AI 评分"));
  assert.equal(await page.locator("#app [title],#app img[alt]").evaluateAll((nodes) =>
    nodes.some((node) => /Claude|GPT|opus|gpt/i.test(node.getAttribute("title") ?? node.getAttribute("alt") ?? ""))), false);
  checks++;
}
async function localDraft(page) {
  return page.evaluate(() => {
    const key = Object.keys(localStorage).find((key) => key.startsWith("llm-lab-review:"));
    return key ? JSON.parse(localStorage.getItem(key)) : null;
  });
}
async function startReview(page) {
  await page.goto(`${base}/#/${experiment.id}?view=blind`);
  await page.locator('input[name="reviewer"]').fill("UI-test-only-do-not-publish");
  await page.locator('input[name="blind"]').check();
  await page.getByRole("button", { name: /开始复核/ }).click();
}
async function answerCurrent(page) {
  await page.locator("#observed").check();
  await page.locator("select[data-check]").selectOption("pending");
  await page.locator("textarea[data-check]").fill("Synthetic UI test; not a human observation.");
}
try {
  for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base);
    await stable(page, `${name}-home`);
    assert.equal(await page.getByText("最高分", { exact: true }).count(), 0);
    for (const experiment of lab.experiments) {
      for (const view of ["focus", "compare", "blind"]) {
        await page.goto(`${base}/#/${experiment.id}?view=${view}&viewport=${name}`);
        await stable(page, `${name}-${experiment.id}-${view}`);
        if (view === "blind" && experiment.artifactType === "image") await anonymous(page);
      }
    }
    assert.deepEqual(errors, [], `${name}: unhandled JavaScript exceptions`);
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await startReview(page);
  await anonymous(page);
  // Real pixels from original SVG in img mode, not a substitute illustration.
  const image = page.locator(".image-box img");
  await image.evaluate((img) => img.decode());
  const imageColors = await image.evaluate((img) => {
    const canvas = document.createElement("canvas");
    canvas.width = 300; canvas.height = 220;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, 300, 220);
    const data = context.getImageData(0, 0, 300, 220).data;
    const colors = new Set();
    for (let i = 0; i < data.length; i += 40) colors.add(`${data[i]},${data[i + 1]},${data[i + 2]}`);
    return colors.size;
  });
  assert.ok(imageColors > 30, "SVG has no substantive rendered image");
  const first = digest(await image.screenshot());
  await page.waitForTimeout(800);
  assert.notEqual(digest(await image.screenshot()), first, "SVG animation is blank/static");
  const initial = await localDraft(page);
  assert.ok(initial.queue.length + initial.tasks.length <= 16, "routine queue still requires a full checklist");
  assert.equal(initial.tasks.length, 4);
  if (await page.getByText("统一浏览器录像", { exact: true }).count()) {
    await page.getByText("统一浏览器录像", { exact: true }).click();
    const metadata = await page.locator("video").evaluate(async (video) => {
      if (video.readyState < 1) await new Promise((resolve, reject) => {
        video.addEventListener("loadedmetadata", resolve, { once: true });
        video.addEventListener("error", () => reject(new Error("Evidence video failed to decode")), { once: true });
        video.load();
      });
      return { width: video.videoWidth, height: video.videoHeight, duration: video.duration };
    });
    assert.ok(metadata.width > 100 && metadata.height > 100 && metadata.duration >= 12, "evidence video is blank or too short");
    checks++;
  }
  const firstId = initial.queue[0].id;
  await page.getByRole("button", { name: /下一步/ }).click();
  assert.ok((await page.locator("#review-error").innerText()).length > 0, "incomplete answer advanced");
  for (let i = 0; i < initial.queue.length; i++) {
    await anonymous(page);
    assert.equal(await page.locator("select[data-check]").count(), 1, "review presents a full per-artifact checklist");
    const id = await page.locator("select[data-check]").getAttribute("data-check");
    assert.notEqual(version.evaluation.criteria.find((item) => item.id === id).method, "auto");
    await answerCurrent(page);
    if (i === 0) {
      const downloadPromise = page.waitForEvent("download");
      await page.getByRole("button", { name: "导出草稿" }).click();
      const download = await downloadPromise;
      const path = resolve(out, "draft-test-only.json");
      await download.saveAs(path);
      await page.reload();
      await page.locator("#observed").waitFor();
      assert.equal(await page.locator("#observed").isChecked(), true);
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await page.locator("#restore-review").setInputFiles(path);
      await page.locator("#observed").waitFor();
      assert.equal(await page.locator(`textarea[data-check="${firstId}"]`).inputValue(), "Synthetic UI test; not a human observation.");
      checks++;
    }
    await page.getByRole("button", { name: /下一步/ }).click();
  }
  const taskCount = initial.tasks.length;
  for (let i = 0; i < taskCount; i++) {
    await anonymous(page);
    await page.locator('input[name="choice"][value="left"]').check();
    await page.locator("#comparison-note").fill("Synthetic UI test; not a real quality verdict.");
    if (i === 0) {
      const leftSample = await page.locator(".blind-pair header").first().innerText();
      await page.getByRole("button", { name: "互换左右" }).click();
      assert.equal(await page.locator('input[name="choice"][value="right"]').isChecked(), true);
      assert.equal(await page.locator(".blind-pair header").last().innerText(), leftSample.replace("左侧", "右侧"));
      await page.getByRole("button", { name: "上一步" }).click();
      await page.locator("#observed").waitFor();
      await page.getByRole("button", { name: /下一步/ }).click();
      assert.equal(await page.locator("#comparison-note").inputValue(), "Synthetic UI test; not a real quality verdict.");
      await stable(page, "desktop-blind-pair");
      await page.setViewportSize({ width: 390, height: 844 });
      await stable(page, "mobile-blind-pair");
      await page.setViewportSize({ width: 1440, height: 900 });
      checks++;
    }
    await page.locator(`input[name="choice"][value="${i % 2 ? "tie" : "unknown"}"]`).check();
    await page.getByRole("button", { name: i === taskCount - 1 ? /封存并揭示身份/ : /下一步/ }).click();
  }
  await page.getByText("记录已封存", { exact: true }).waitFor();
  for (const result of version.results) assert.ok((await page.locator("#app").innerText()).includes(result.label));
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "导出封存记录" }).click();
  const sealed = await downloadPromise;
  const sealedPath = resolve(out, "sealed-test-only.json");
  await sealed.saveAs(sealedPath);
  const sealedSession = JSON.parse(readFileSync(sealedPath, "utf8"));
  validateSession(sealedSession, version.evaluation, Object.fromEntries(version.results.map((result) => [result.key, result.sha256])));
  assert.equal(Object.values(sealedSession.assessments).reduce((sum, item) => sum + Object.keys(item.checks).length, 0), initial.queue.length);
  await stable(page, "desktop-sealed-test-only");
  assert.deepEqual(errors, []);
  await context.close();

  // Partial and comparison-only sessions must not manufacture unobserved checks.
  for (const mode of ["partial", "comparison-only"]) {
    const partialContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const partialPage = await partialContext.newPage();
    await startReview(partialPage);
    if (mode === "partial") {
      await partialPage.getByRole("button", { name: "跳过", exact: true }).click();
      assert.equal(Object.keys((await localDraft(partialPage)).assessments).length, 0);
      await answerCurrent(partialPage);
    } else {
      await partialPage.getByRole("button", { name: "进入比较", exact: true }).click();
      await partialPage.locator('input[name="choice"][value="unknown"]').check();
      await partialPage.locator("#comparison-note").fill("Synthetic comparison only.");
    }
    await partialPage.getByRole("button", { name: "封存已完成项", exact: true }).click();
    await partialPage.getByText("记录已封存", { exact: true }).waitFor();
    const session = await localDraft(partialPage);
    validateSession(session, version.evaluation, Object.fromEntries(version.results.map((result) => [result.key, result.sha256])));
    assert.equal(Object.values(session.assessments).reduce((sum, item) => sum + Object.keys(item.checks).length, 0), mode === "partial" ? 1 : 0);
    assert.equal(session.tasks.length, mode === "comparison-only" ? 1 : 0);
    await stable(partialPage, `mobile-${mode}-sealed`);
    await partialContext.close();
  }

  // Inject clearly synthetic AI evidence only into this isolated browser response.
  const assistedLab = structuredClone(lab);
  const assistedVersion = assistedLab.experiments.find((item) => item.id === experiment.id).versions.find((item) => item.version === version.version);
  for (const result of assistedVersion.results) for (const check of result.acceptance.checks.filter((item) => item.method === "ai")) {
    const record = { key: result.key, id: check.id, source: "ai", reviewer: "synthetic-ui-judge", status: "pass",
      viewport: "desktop", at: new Date().toISOString(), evidence: "Synthetic UI evidence; never published." };
    assistedVersion.evaluation.records.push(record);
    check.viewports.desktop.evidence = [record];
  }
  const assistedContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await assistedContext.route("**/data/lab.json", (route) => route.fulfill({ json: assistedLab }));
  const assistedPage = await assistedContext.newPage();
  await startReview(assistedPage);
  await anonymous(assistedPage);
  const reveal = assistedPage.getByRole("button", { name: "查看 AI 证据", exact: true });
  assert.equal(await reveal.isDisabled(), true);
  assert.equal(await assistedPage.getByText("Synthetic UI evidence; never published.", { exact: true }).count(), 0);
  await assistedPage.locator("#observed").check();
  await assistedPage.locator("select[data-check]").selectOption("pass");
  await reveal.click();
  await assistedPage.locator('input[name="evidence-ref"]').check();
  assert.equal(await assistedPage.locator("textarea[data-check]").inputValue(), "");
  await assistedPage.getByRole("button", { name: "封存已完成项", exact: true }).click();
  const assistedSession = await localDraft(assistedPage);
  validateSession(assistedSession, assistedVersion.evaluation, Object.fromEntries(version.results.map((result) => [result.key, result.sha256])));
  const answer = Object.values(assistedSession.assessments).flatMap((item) => Object.values(item.checks))[0];
  assert.equal(answer.initialStatus, "pass");
  assert.ok(answer.evidenceRef && answer.revealedAt);
  checks++;
  await assistedContext.close();

  const reviewedLab = structuredClone(lab);
  const reviewedVersion = reviewedLab.experiments.find((item) => item.id === experiment.id).versions.find((item) => item.version === version.version);
  for (const result of reviewedVersion.results) for (const check of result.acceptance.checks.filter((item) => item.method !== "auto")) {
    check.viewports.desktop.audited = true;
    check.viewports.desktop.disputed = false;
  }
  const reviewedContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await reviewedContext.route("**/data/lab.json", (route) => route.fulfill({ json: reviewedLab }));
  const reviewedPage = await reviewedContext.newPage();
  await startReview(reviewedPage);
  assert.equal((await localDraft(reviewedPage)).queue.length, 0);
  assert.equal(await reviewedPage.getByRole("button", { name: "上一步", exact: true }).isDisabled(), true);
  await reviewedPage.locator('input[name="choice"][value="unknown"]').check();
  await reviewedPage.locator("#comparison-note").fill("Synthetic empty-queue comparison.");
  await reviewedPage.getByRole("button", { name: "封存已完成项", exact: true }).click();
  await reviewedPage.getByText("记录已封存", { exact: true }).waitFor();
  checks++;
  await reviewedContext.close();

  // Verify an actual original HTML canvas through the sandboxed website preview.
  const rocket = lab.experiments.find((item) => item.artifactType === "page");
  for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const canvasContext = await browser.newContext({ viewport });
    const canvasPage = await canvasContext.newPage();
    const errors = [];
    canvasPage.on("pageerror", (error) => errors.push(error.message));
    await canvasPage.goto(`${base}/#/${rocket.id}?viewport=${name}`);
    const owner = canvasPage.locator("iframe").first();
    const iframe = owner.contentFrame();
    await owner.scrollIntoViewIfNeeded();
    await iframe.locator("canvas").first().waitFor();
    await canvasPage.waitForTimeout(1500);
    assert.ok(await canvasColors(iframe.locator("canvas").first()) > 30, "original canvas is blank or not framed correctly");
    await clickEmbedded(canvasPage, owner, iframe.getByRole("button", { name: "点火", exact: true }));
    await iframe.getByRole("button", { name: "发射中", exact: true }).waitFor();
    await canvasPage.waitForTimeout(1500);
    await canvasPage.screenshot({ path: resolve(out, `${name}-original-canvas.png`) });
    assert.deepEqual(errors, []);
    await canvasContext.close();
    checks++;
  }
  console.log(`ok    ${checks} 项 UI / 流程检查；桌面与手机；原始 SVG 动画、Canvas 像素、匿名与封存导出；${base}`);
} finally {
  await browser.close();
  await server?.close();
}
