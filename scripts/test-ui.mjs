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
  await page.goto(`${base}/#/${experiment.id}?view=blind`);
  await page.locator('input[name="reviewer"]').fill("UI-test-only-do-not-publish");
  await page.locator('input[name="blind"]').check();
  await page.getByRole("button", { name: /开始复核/ }).click();
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
  for (let i = 0; i < version.results.length; i++) {
    await anonymous(page);
    await page.locator("#observed").check();
    for (const item of version.evaluation.criteria.filter((item) => item.method === "human")) {
      await page.locator(`select[data-check="${item.id}"]`).selectOption("pending");
      await page.locator(`textarea[data-check="${item.id}"]`).fill("Synthetic UI test; not a human observation.");
    }
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
      assert.equal(await page.locator('textarea[data-check="pelican"]').inputValue(), "Synthetic UI test; not a human observation.");
      checks++;
    }
    await page.getByRole("button", { name: /下一步/ }).click();
  }
  const taskCount = version.results.length * (version.results.length - 1) / 2 * version.evaluation.dimensions.length;
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
  validateSession(JSON.parse(readFileSync(sealedPath, "utf8")), version.evaluation, Object.fromEntries(version.results.map((result) => [result.key, result.sha256])));
  await stable(page, "desktop-sealed-test-only");
  assert.deepEqual(errors, []);
  await context.close();

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
