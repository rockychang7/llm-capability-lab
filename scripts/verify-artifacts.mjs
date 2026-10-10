import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { performance } from "node:perf_hooks";
import { localServer, launchBrowser, root } from "./browser-tools.mjs";
import { artifactDigest, digest, parseProtocol, replaceJsonSection } from "./evaluation.mjs";

const lab = JSON.parse(readFileSync(resolve(root, "data/lab.json"), "utf8"));
const profiles = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "no-preference" },
  { name: "mobile", viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: "no-preference" },
  { name: "dpr2", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "no-preference" },
  { name: "reduced", viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: "reduce" }
];
const out = resolve(root, "test-results/verification");
mkdirSync(out, { recursive: true });
const server = await localServer();
const browser = await launchBrowser();
const environment = { browser: browser.version(), platform: process.platform, node: process.version, profiles, clock: "real", concurrency: 4,
  checkerSha256: artifactDigest(resolve(root, "scripts/verify-artifacts.mjs")), limit: "功能检查；不测实体帧率、视觉语义或音效" };
const report = { environment, experiments: [] };

async function htmlProfile(result, profile) {
  const context = await browser.newContext(profile);
  const page = await context.newPage();
  const errors = [];
  const resources = new Set();
  const overflow = [];
  const path = `/${result.url}`;
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("favicon")) errors.push(message.text());
  });
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === path && url.origin === server.url) return route.continue();
    if (url.pathname.endsWith("/favicon.ico")) return route.fulfill({ status: 204 });
    resources.add(route.request().url());
    return route.abort();
  });
  const sample = async () => {
    const value = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      return { x: Math.max(html.scrollWidth, body?.scrollWidth ?? 0) > innerWidth + 1,
        y: Math.max(html.scrollHeight, body?.scrollHeight ?? 0) > innerHeight + 1 };
    });
    if (value.x || value.y) overflow.push(value);
  };
  // Hidden success headings must not count as completion.
  const completed = () => page.evaluate(() => [...document.querySelectorAll("h1,h2")].some((element) => {
    if (!element.textContent.includes("入轨成功")) return false;
    const box = element.getBoundingClientRect();
    if (!box.width || !box.height) return false;
    for (let node = element; node instanceof Element; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) < 0.95) return false;
    }
    return true;
  }));
  const run = async () => {
    await page.getByRole("button", { name: "点火", exact: true }).click({ timeout: 5000 });
    const start = performance.now();
    const samples = [];
    let nextSample = 0;
    while (performance.now() - start < 120000) {
      if (performance.now() - start >= nextSample) {
        await sample();
        samples.push(Number(((performance.now() - start) / 1000).toFixed(2)));
        nextSample += 5000;
      }
      if (await completed()) {
        await sample();
        samples.push(Number(((performance.now() - start) / 1000).toFixed(2)));
        return { success: true, seconds: Number(((performance.now() - start) / 1000).toFixed(2)), samples };
      }
      await page.waitForTimeout(300);
    }
    return { success: false, seconds: 120, samples };
  };
  const resultData = { profile: profile.name, runtime: false, replay: false, errors, resources: [], overflow };
  try {
    await page.goto(server.url + path);
    await sample();
    const declarations = await page.evaluate(() => {
      const refs = [...document.querySelectorAll("[src],link[href],object[data]")].map((element) =>
        element.getAttribute("src") ?? element.getAttribute("href") ?? element.getAttribute("data"));
      for (const style of document.querySelectorAll("style,[style]")) {
        const text = style.localName === "style" ? style.textContent : style.getAttribute("style");
        for (const match of text.matchAll(/url\(\s*['"]?([^)'"]+)/gi)) refs.push(match[1]);
        if (/@import/i.test(text)) refs.push("CSS @import");
      }
      return refs.filter((ref) => ref && !ref.startsWith("#") && !ref.startsWith("data:"));
    });
    declarations.forEach((ref) => resources.add(ref));
    const screenshotBase = resolve(out, `${result.key.replaceAll("/", "--")}-${profile.name}`);
    await page.screenshot({ path: `${screenshotBase}-ready.png` });
    resultData.first = await run();
    resultData.runtime = resultData.first.success;
    await page.screenshot({ path: `${screenshotBase}-complete.png` });
    if (resultData.runtime) {
      await page.getByRole("button", { name: "重新发射", exact: true }).click({ timeout: 5000 });
      await page.waitForTimeout(3000);
      const reset = !(await completed());
      if (reset) {
        resultData.second = await run();
        resultData.replay = resultData.second.success;
      }
    }
  } catch (error) {
    // Harness failures are recorded as unverified, not silently as model defects.
    resultData.harnessError = error.message;
  } finally {
    resultData.resources = [...resources];
    await context.close();
  }
  return resultData;
}

async function svgProfile(result, profile) {
  const context = await browser.newContext(profile);
  const page = await context.newPage();
  const resources = [];
  page.on("request", (request) => {
    if (request.url() !== `${server.url}/${result.url}` && !request.url().startsWith("data:")) resources.push(request.url());
  });
  try {
    // Browser XML parsing is separate from the actual img rendering environment.
    const source = readFileSync(resolve(root, result.url), "utf8");
    const structure = await page.evaluate((source) => {
      const doc = new DOMParser().parseFromString(source, "image/svg+xml");
      const root = doc.documentElement;
      const viewBox = (root.getAttribute("viewBox") ?? "").trim().split(/[\s,]+/).map(Number);
      const refs = [];
      let scripts = false;
      for (const element of doc.querySelectorAll("*")) {
        if (element.localName.toLowerCase() === "script") scripts = true;
        for (const attribute of element.attributes) {
          if (/^on/i.test(attribute.name) || /javascript\s*:/i.test(attribute.value)) scripts = true;
          if (["href", "src"].includes(attribute.localName) && !/^(#|data:|$)/i.test(attribute.value)) refs.push(attribute.value);
          for (const match of attribute.value.matchAll(/url\(\s*['"]?([^)'"]+)/gi)) {
            if (!/^(#|data:)/.test(match[1])) refs.push(match[1]);
          }
        }
      }
      const css = [...doc.querySelectorAll("style")].map((node) => node.textContent).join("\n");
      for (const match of css.matchAll(/url\(\s*['"]?([^)'"]+)/gi)) if (!/^(#|data:)/.test(match[1])) refs.push(match[1]);
      if (/@import|<\?xml-stylesheet/i.test(source)) refs.push("stylesheet import");
      return { valid: !doc.querySelector("parsererror") && root.localName === "svg" && viewBox.length === 4 &&
        viewBox.every(Number.isFinite) && viewBox[2] > 0 && viewBox[3] > 0, scripts, refs };
    }, source);
    await page.setContent('<style>body{margin:0;background:white}img{width:100vw;height:100vh;object-fit:contain}</style><img alt="artifact">');
    await page.locator("img").evaluate((img, url) => { img.src = url; }, `${server.url}/${result.url}`);
    await page.locator("img").evaluate((img) => img.decode());
    const frames = [];
    const start = performance.now();
    for (let i = 0; i < 25; i++) {
      frames.push(digest(await page.locator("img").screenshot()));
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: resolve(out, `${result.key.replaceAll("/", "--")}-${profile.name}-svg.png`) });
    return { profile: profile.name, ...structure, resources, uniqueFrames: new Set(frames).size,
      samples: frames.length, seconds: Number(((performance.now() - start) / 1000).toFixed(2)) };
  } catch (error) { return { profile: profile.name, harnessError: error.message }; }
  finally { await context.close(); }
}

try {
  const filter = process.argv.find((arg) => arg.startsWith("--experiment="))?.split("=")[1];
  if (filter && !lab.experiments.some((item) => item.id === filter)) throw new Error("未知实验 ID");
  for (const experiment of lab.experiments.filter((item) => !filter || item.id === filter)) {
    const version = experiment.versions.find((item) => item.version === experiment.latestVersion);
    if (version.evaluation?.protocol !== 2) continue;
    let text = readFileSync(resolve(root, version.evaluationPath), "utf8");
    const protocol = parseProtocol(text, version.prompt);
    const records = [];
    const items = [];
    for (const result of version.results) {
      console.log(`run   ${experiment.id}/${result.key}：4 环境并行，真实时钟`);
      const hash = artifactDigest(resolve(root, result.url));
      // The four profiles share the same concurrency for every artifact. No FPS claims.
      const observations = await Promise.all(profiles.map((profile) =>
        experiment.artifactType === "page" ? htmlProfile(result, profile) : svgProfile(result, profile)));
      if (hash !== artifactDigest(resolve(root, result.url))) throw new Error(`原始产物被修改：${result.url}`);
      const files = readdirSync(dirname(resolve(root, result.url))).filter((name) => name !== "run.yaml");
      for (const criterion of protocol.criteria.filter((item) => item.method === "auto")) {
        let passed;
        const complete = observations.every((item) => !item.harnessError);
        if (criterion.id === "runtime") passed = observations.every((item) => item.runtime);
        if (criterion.id === "replay") passed = observations.every((item) => item.replay);
        if (criterion.id === "console") passed = observations.every((item) => !item.errors.length);
        if (criterion.id === "viewport") passed = observations.every((item) => !item.overflow.length);
        if (criterion.id === "standalone") passed = files.length === 1 && observations.every((item) => !item.resources?.length && !item.refs?.length);
        if (criterion.id === "svg-valid") passed = observations.every((item) => item.valid);
        if (criterion.id === "no-script") passed = observations.every((item) => !item.scripts);
        if (criterion.id === "animation") passed = observations.every((item) => item.uniqueFrames > 1 && item.seconds >= 12);
        const status = !complete || passed === undefined ? "pending" : passed ? "pass" : "fail";
        const evidence = JSON.stringify({ ...environment, observations, files });
        records.push({ key: result.key, id: criterion.id, status, source: "auto",
          reviewer: "artifact-checker-v2", at: new Date().toISOString(), sha256: hash, fingerprint: protocol.fingerprint, evidence });
        console.log(`      ${criterion.id}: ${status}`);
      }
      items.push({ key: result.key, sha256: hash, observations });
    }
    report.experiments.push({ id: experiment.id, version: version.version, items });
    if (process.argv.includes("--write")) {
      text = replaceJsonSection(text, "验收记录", [...protocol.records, ...records]);
      writeFileSync(resolve(root, version.evaluationPath), text);
      console.log(`write ${version.evaluationPath}`);
    }
  }
  writeFileSync(resolve(out, "report.json"), JSON.stringify(report, null, 2) + "\n");
} finally {
  await browser.close();
  await server.close();
}
