// Lightweight protocol-6 checker: one real run per artifact and viewport. Script criteria are decided here;
// the AI reviewer only looks at the timeline contact sheets and key frames saved alongside.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { performance } from "node:perf_hooks";
import { localServer, launchBrowser, root } from "./browser-tools.mjs";
import { artifactDigest, digest, parseProtocol, replaceJsonSection } from "./evaluation.mjs";
import { GAME_SHEETS, gameRun, gameResults } from "./game-checker.mjs";

const lab = JSON.parse(readFileSync(resolve(root, "data/lab.json"), "utf8"));
const write = process.argv.includes("--write");
const filter = process.argv.find((arg) => arg.startsWith("--experiment="))?.split("=")[1];
const only = process.argv.find((arg) => arg.startsWith("--artifact="))?.split("=")[1];
const concurrency = Number(process.argv.find((arg) => arg.startsWith("--concurrency="))?.split("=")[1] ?? 4);
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
// Frame cadence and sheet layout per artifact type; small sheets keep each cell legible.
const SHEETS = {
  page: { desktop: { every: 3, cols: 4, cell: 480, perSheet: 12 }, mobile: { every: 6, cols: 6, cell: 240, perSheet: 12 } },
  image: { desktop: { count: 16, every: 0.15, cols: 4, cell: 400, perSheet: 16 }, mobile: { count: 6, every: 0.3, cols: 6, cell: 240, perSheet: 6 } },
  game: GAME_SHEETS
};
const RANK = { pass: 0, partial: 1, fail: 2 };
const worst = (items) => items.reduce((a, b) => RANK[b] > RANK[a] ? b : a, "pass");
const round = (value) => Math.round(value * 10) / 10;
if (only && !filter) throw new Error("--artifact 必须同时指定 --experiment");
if (filter && !lab.experiments.some((item) => item.id === filter)) throw new Error("未知实验 ID");

const server = await localServer();
const browser = await launchBrowser();
const captureId = new Date().toISOString().replace(/[^0-9]/g, "");
const checker = `verify-artifacts@${digest(Buffer.concat(["verify-artifacts.mjs", "game-checker.mjs"].map((name) =>
  readFileSync(resolve(root, "scripts", name))))).slice(0, 12)}`;
const environment = { browser: browser.version(), platform: process.platform, node: process.version, viewports: VIEWPORTS,
  clock: "real", concurrency, limit: "单次真实运行的采样；不测实体帧率、音效或每一帧" };

async function pool(tasks) {
  const results = new Array(tasks.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, async () => {
    while (next < tasks.length) { const index = next++; results[index] = await tasks[index](); }
  }));
  return results;
}

// Text a viewer can actually see: hidden success overlays must not count as telemetry or completion.
function visibleText() {
  const cache = new Map(), out = [];
  const visible = (element) => {
    if (cache.has(element)) return cache.get(element);
    let ok = true;
    for (let node = element; node instanceof Element; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) < 0.1) { ok = false; break; }
    }
    cache.set(element, ok);
    return ok;
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const text = walker.currentNode.textContent.trim(), element = walker.currentNode.parentElement;
    if (!text || !element || !visible(element)) continue;
    const box = element.getBoundingClientRect();
    if (box.width && box.height && box.bottom > 0 && box.top < innerHeight) out.push(text);
  }
  return out.join(" ").replace(/\s+/g, " ");
}
const tMinus = (text) => [...text.matchAll(/T\s*[-−–]\s*(\d+(?::\d+)*(?:\.\d+)?)/g)]
  .map((match) => match[1].split(":").map(Number).reduce((sum, part) => sum * 60 + part, 0));
const reading = (text, label) => {
  const match = text.match(new RegExp(`${label}[^0-9]{0,24}?(\\d+(?:\\.\\d+)?)`));
  return match ? Number(match[1]) : null;
};

async function pageRun(result, viewport, layout) {
  const context = await browser.newContext({ viewport: VIEWPORTS[viewport] });
  const page = await context.newPage();
  const path = `/${result.url}`, errors = [], resources = new Set(), overflow = [], frames = [], log = [];
  const data = { viewport, errors, overflow, frames, log };
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
  const sampleOverflow = async () => {
    const value = await page.evaluate(() => ({
      x: Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth ?? 0) > innerWidth + 1,
      y: Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight ?? 0) > innerHeight + 1 }));
    if (value.x || value.y) overflow.push(value);
  };
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
  const shot = async (seconds, label) => frames.push({ seconds, label, buffer: await page.screenshot({ type: "jpeg", quality: 80 }) });
  try {
    await page.goto(server.url + path);
    await page.waitForTimeout(1500);
    data.declarations = await page.evaluate(() => {
      const refs = [...document.querySelectorAll("[src],link[href],object[data]")].map((element) =>
        element.getAttribute("src") ?? element.getAttribute("href") ?? element.getAttribute("data"));
      for (const style of document.querySelectorAll("style,[style]")) {
        const text = style.localName === "style" ? style.textContent : style.getAttribute("style");
        for (const match of text.matchAll(/url\(\s*['"]?([^)'"]+)/gi)) refs.push(match[1]);
        if (/@import/i.test(text)) refs.push("CSS @import");
      }
      return refs.filter((ref) => ref && !ref.startsWith("#") && !ref.startsWith("data:"));
    });
    await sampleOverflow();
    data.ready = await page.screenshot({ type: "jpeg", quality: 85 });
    await shot(0, "待命");
    const ignition = await page.getByRole("button", { name: "点火", exact: true }).elementHandle({ timeout: 5000 });
    await ignition.click();
    const start = performance.now();
    const elapsed = () => (performance.now() - start) / 1000;
    data.locked = await ignition.evaluate((element) => !element.isConnected || element.disabled ||
      element.getAttribute("aria-disabled") === "true" || getComputedStyle(element).pointerEvents === "none" ||
      getComputedStyle(element).visibility === "hidden" || !element.getClientRects().length);
    let nextFrame = layout.every, nextOverflow = 5;
    while (elapsed() < 120) {
      log.push({ t: round(elapsed()), text: await page.evaluate(visibleText) });
      if (elapsed() >= nextFrame) { await shot(round(elapsed()), `+${Math.round(elapsed())}s`); nextFrame += layout.every; }
      if (elapsed() >= nextOverflow) { await sampleOverflow(); nextOverflow += 5; }
      if (await completed()) { data.success = round(elapsed()); break; }
      await page.waitForTimeout(500);
    }
    if (data.success) {
      await page.waitForTimeout(1000);
      await sampleOverflow();
      data.final = await page.evaluate(visibleText);
      data.complete = await page.screenshot({ type: "jpeg", quality: 85 });
      await shot(data.success, `成功 ${Math.round(data.success)}s`);
      await page.getByRole("button", { name: "重新发射", exact: true }).click({ timeout: 5000 });
      await page.waitForTimeout(1500);
      const again = page.getByRole("button", { name: "点火", exact: true });
      const standbyText = await page.evaluate(visibleText);
      data.standby = !(await completed()) && reading(standbyText, "高度") === 0 && await again.isVisible() && await again.isEnabled();
      if (await again.isVisible()) {
        await again.click({ timeout: 3000 });
        await page.waitForTimeout(2500);
        data.restarted = tMinus(await page.evaluate(visibleText)).some((value) => value > 3 && value < 9.8);
      }
    }
  } catch (error) {
    data.error = error.message.split("\n")[0];
  } finally {
    data.resources = [...resources];
    await context.close();
  }
  return data;
}

async function imageRun(result, viewport, layout) {
  const context = await browser.newContext({ viewport: VIEWPORTS[viewport] });
  const page = await context.newPage();
  const frames = [], resources = [], data = { viewport, frames, resources };
  page.on("request", (request) => {
    if (request.url() !== `${server.url}/${result.url}` && !request.url().startsWith("data:")) resources.push(request.url());
  });
  try {
    // Browser XML parsing is separate from the actual img rendering environment.
    const source = readFileSync(resolve(root, result.url), "utf8");
    Object.assign(data, await page.evaluate((source) => {
      const doc = new DOMParser().parseFromString(source, "image/svg+xml");
      const svg = doc.documentElement;
      const viewBox = (svg.getAttribute("viewBox") ?? "").trim().split(/[\s,]+/).map(Number);
      const refs = [];
      let scripts = false;
      for (const element of doc.querySelectorAll("*")) {
        if (element.localName.toLowerCase() === "script") scripts = true;
        for (const attribute of element.attributes) {
          if (/^on/i.test(attribute.name) || /javascript\s*:/i.test(attribute.value)) scripts = true;
          if (["href", "src"].includes(attribute.localName) && !/^(#|data:|$)/i.test(attribute.value)) refs.push(attribute.value);
          for (const match of attribute.value.matchAll(/url\(\s*['"]?([^)'"]+)/gi)) if (!/^(#|data:)/.test(match[1])) refs.push(match[1]);
        }
      }
      const css = [...doc.querySelectorAll("style")].map((node) => node.textContent).join("\n");
      for (const match of css.matchAll(/url\(\s*['"]?([^)'"]+)/gi)) if (!/^(#|data:)/.test(match[1])) refs.push(match[1]);
      if (/@import|<\?xml-stylesheet/i.test(source)) refs.push("stylesheet import");
      return { valid: !doc.querySelector("parsererror") && svg.localName === "svg" && viewBox.length === 4 &&
        viewBox.every(Number.isFinite) && viewBox[2] > 0 && viewBox[3] > 0, scripts, refs };
    }, source));
    await page.setContent('<style>body{margin:0;background:white}img{width:100vw;height:100vh;object-fit:contain}</style><img alt="artifact">');
    await page.locator("img").evaluate((img, url) => { img.src = url; }, `${server.url}/${result.url}`);
    await page.locator("img").evaluate((img) => img.decode());
    data.decoded = true;
    await page.waitForTimeout(500);
    data.ready = await page.screenshot({ type: "jpeg", quality: 90 });
    const start = performance.now();
    for (let index = 0; index < layout.count; index++) {
      const wait = start + index * layout.every * 1000 - performance.now();
      if (wait > 0) await page.waitForTimeout(wait);
      const seconds = (performance.now() - start) / 1000;
      frames.push({ seconds: Number(seconds.toFixed(2)), label: `${seconds.toFixed(2)}s`, buffer: await page.screenshot({ type: "jpeg", quality: 80 }) });
    }
    data.unique = new Set(frames.map((frame) => digest(frame.buffer))).size;
  } catch (error) {
    data.error = error.message.split("\n")[0];
  } finally { await context.close(); }
  return data;
}

async function contactSheets(frames, layout, viewport, base) {
  const { width, height } = VIEWPORTS[viewport];
  const cellHeight = Math.round(layout.cell * (layout.aspect ?? height / width));
  const sheets = [];
  for (let start = 0; start < frames.length; start += layout.perSheet) {
    const chunk = frames.slice(start, start + layout.perSheet);
    const page = await browser.newPage({ viewport: { width: layout.cols * layout.cell, height: 200 } });
    await page.setContent(`<style>body{margin:0;background:#111;display:grid;grid-template-columns:repeat(${layout.cols},${layout.cell}px);font:600 14px system-ui;color:#fff}
      figure{margin:0;position:relative;border:1px solid #111}img{display:block;width:100%;height:${cellHeight}px;object-fit:cover}
      figcaption{position:absolute;left:4px;top:4px;padding:2px 6px;background:rgba(0,0,0,.72);border-radius:3px}</style>
      ${chunk.map((frame) => `<figure><img src="data:image/jpeg;base64,${frame.buffer.toString("base64")}"><figcaption>${frame.label}</figcaption></figure>`).join("")}`);
    const path = `${base}-sheet-${sheets.length + 1}.jpg`;
    await page.screenshot({ path, fullPage: true, type: "jpeg", quality: 82 });
    await page.close();
    sheets.push({ path, from: chunk[0].seconds, to: chunk.at(-1).seconds });
  }
  return sheets;
}

function pageResults(runs, files) {
  const byViewport = (fn) => runs.map((run) => fn(run));
  const label = (run) => run.viewport === "desktop" ? "桌面" : "手机";
  const judge = (fn) => {
    const items = byViewport(fn);
    return { status: worst(items.map((item) => item.status)), evidence: runs.map((run, index) => `${label(run)}：${items[index].text}`).join("；") };
  };
  const flight = (run) => run.log.filter((item) => run.success === undefined || item.t <= run.success);
  const liftoff = (run) => flight(run).find((item) => (reading(item.text, "高度") ?? 0) > 0)?.t ?? null;
  const band = (value, low, high, slack) => value === null ? "fail" : value >= low && value <= high ? "pass" :
    value >= low - slack && value <= high + slack ? "partial" : "fail";
  const error = (run) => run.error ? `（运行异常：${run.error}）` : "";
  return {
    standalone: judge((run) => {
      const external = [...run.resources, ...(run.declarations ?? [])];
      return { status: files.length === 1 && !external.length ? "pass" : "fail",
        text: `目录 ${files.length} 个文件，外部引用 ${external.length} 个${external.length ? `：${external.slice(0, 3).join("、")}` : ""}` };
    }),
    runtime: judge((run) => ({ status: run.success ? "pass" : "fail",
      text: run.success ? `点火后 ${run.success}s 出现可见的“入轨成功”` : `120s 内未出现可见的“入轨成功”${error(run)}` })),
    replay: judge((run) => {
      const ok = [run.standby, run.restarted].filter(Boolean).length;
      return { status: ok === 2 ? "pass" : ok === 1 ? "partial" : "fail",
        text: `复位回到待命（高度归零、点火可点）${run.standby ? "是" : "否"}，再次点火开始倒计时${run.restarted ? "是" : "否"}` };
    }),
    console: judge((run) => ({ status: run.errors.length ? "fail" : "pass",
      text: run.errors.length ? `${run.errors.length} 条错误：${run.errors[0].slice(0, 120)}` : "无页面错误或 console.error" })),
    viewport: judge((run) => ({ status: run.overflow.length ? "fail" : "pass",
      text: run.overflow.length ? `${run.overflow.length} 次采样出现滚动范围` : "待命、每 5 秒及成功时均无滚动范围" })),
    "input-lock": judge((run) => ({ status: run.locked ? "pass" : "fail",
      text: run.locked ? "点击后点火按钮已禁用、隐藏或被替换" : "点击后点火按钮仍可点击" })),
    countdown: judge((run) => {
      const first = run.log.filter((item) => item.t <= 2).flatMap((item) => tMinus(item.text));
      const lift = liftoff(run) ?? Infinity;
      const late = run.log.filter((item) => item.t < lift).flatMap((item) => tMinus(item.text)).some((value) => value <= 3);
      const start = first.some((value) => value >= 9 && value <= 10.05);
      return { status: start && late ? "pass" : start || late ? "partial" : "fail",
        text: `前 2 秒读到 T-${first.length ? round(Math.max(...first)) : "无"}，离台前${late ? "" : "未"}倒数到 T-3 以内` };
    }),
    "liftoff-time": judge((run) => {
      const value = liftoff(run);
      return { status: band(value, 12, 15, 2), text: value === null ? "遥测中读不到高度变为正数" : `点击后 ${value}s 高度首次大于 0` };
    }),
    "total-time": judge((run) => ({ status: band(run.success ?? null, 60, 90, 3),
      text: run.success ? `点击到入轨成功 ${run.success}s` : "未到达入轨成功" })),
    "orbit-values": judge((run) => {
      const altitude = run.final ? reading(run.final, "高度") : null, speed = run.final ? reading(run.final, "速度") : null;
      const ok = [altitude !== null && altitude >= 380 && altitude <= 420, speed !== null && speed >= 7.5 && speed <= 7.9].filter(Boolean).length;
      return { status: ok === 2 ? "pass" : ok === 1 ? "partial" : "fail", text: `成功画面高度 ${altitude ?? "无"} km，速度 ${speed ?? "无"} km/s` };
    }),
    telemetry: judge((run) => {
      const points = flight(run).map((item) => ({ t: item.t, altitude: reading(item.text, "高度"), speed: reading(item.text, "速度") }));
      const altitudes = points.filter((item) => item.altitude !== null);
      let drops = 0, jumps = 0;
      for (let index = 1; index < altitudes.length; index++) {
        const change = altitudes[index].altitude - altitudes[index - 1].altitude;
        const seconds = Math.max(altitudes[index].t - altitudes[index - 1].t, 0.25);
        if (change < -0.5) drops++;
        if (change / seconds > 100) jumps++;
      }
      const fields = altitudes.length && points.some((item) => item.speed !== null);
      return { status: fields && !drops && !jumps ? "pass" : "fail",
        text: `${altitudes.length} 个高度读数，回落 ${drops} 次，跳变（>100 km/s）${jumps} 次${fields ? "" : "，缺少高度或速度读数"}` };
    })
  };
}

function imageResults(runs, files) {
  const label = (run) => run.viewport === "desktop" ? "桌面" : "手机";
  const judge = (fn) => {
    const items = runs.map(fn);
    return { status: worst(items.map((item) => item.status)), evidence: runs.map((run, index) => `${label(run)}：${items[index].text}`).join("；") };
  };
  return {
    "svg-valid": judge((run) => ({ status: run.valid && run.decoded ? "pass" : "fail",
      text: run.valid && run.decoded ? "XML 无解析错误，viewBox 有效，img 解码成功" : `解析或解码失败${run.error ? `：${run.error}` : ""}` })),
    "no-script": judge((run) => ({ status: run.scripts === false ? "pass" : "fail",
      text: run.scripts === false ? "无 script、事件属性或 javascript: URL" : "发现脚本或未能检查" })),
    standalone: judge((run) => ({ status: files.length === 1 && !run.refs?.length && !run.resources.length ? "pass" : "fail",
      text: `目录 ${files.length} 个文件，外部引用 ${(run.refs?.length ?? 0) + run.resources.length} 个` })),
    animation: judge((run) => ({ status: run.unique > 1 ? "pass" : "fail",
      text: `img 模式 ${run.frames.length} 帧中 ${run.unique ?? 0} 帧互不相同` }))
  };
}

const mediaFile = (path, kind, viewport, extra = {}) => ({ path: relative(root, path).replaceAll("\\", "/"),
  sha256: artifactDigest(path), kind, viewport, ...extra });
try {
  for (const experiment of lab.experiments.filter((item) => !filter || item.id === filter)) {
    const version = experiment.versions.find((item) => item.version === experiment.latestVersion);
    if (!version.evaluationPath) continue;
    let text = readFileSync(resolve(root, version.evaluationPath), "utf8");
    const protocol = parseProtocol(text, version.prompt);
    const type = ["page", "game"].includes(experiment.artifactType) ? experiment.artifactType : "image";
    const runner = { page: pageRun, image: imageRun,
      game: (result, viewport) => gameRun({ browser, server, result, viewport, size: VIEWPORTS[viewport] }) }[type];
    const mediaDir = write ? resolve(root, `assets/evidence/${experiment.id}/v${version.version}/${captureId}`) :
      resolve(root, `test-results/verification/${experiment.id}/${captureId}`);
    mkdirSync(mediaDir, { recursive: true });
    const results = version.results.filter((item) => !only || item.key === only);
    if (!results.length) throw new Error("未知产物");
    console.log(`run   ${experiment.id}：${results.length} 份产物 × 桌面/手机，并发 ${concurrency}，真实时钟`);
    const tasks = results.flatMap((result) => Object.keys(VIEWPORTS).map((viewport) => () =>
      runner(result, viewport, SHEETS[type][viewport]).then((run) => ({ key: result.key, run }))));
    const runs = await pool(tasks);
    const records = [];
    for (const result of results) {
      const hash = artifactDigest(resolve(root, result.url));
      if (hash !== result.sha256) throw new Error(`原始产物与生成数据不一致：${result.url}，请先 build`);
      const own = runs.filter((item) => item.key === result.key).map((item) => item.run);
      const files = readdirSync(dirname(resolve(root, result.url))).filter((name) => name !== "run.yaml");
      const media = [];
      for (const run of own) {
        const base = resolve(mediaDir, `${result.key.replaceAll("/", "--")}-${run.viewport}`);
        if (run.ready) { writeFileSync(`${base}-ready.jpg`, run.ready); media.push(mediaFile(`${base}-ready.jpg`, "frame", run.viewport, { label: "初始画面" })); }
        if (run.complete) { writeFileSync(`${base}-complete.jpg`, run.complete); media.push(mediaFile(`${base}-complete.jpg`, "frame", run.viewport, { label: run.completeLabel ?? "成功画面" })); }
        for (const sheet of run.frames.length ? await contactSheets(run.frames, SHEETS[type][run.viewport], run.viewport, base) : []) {
          media.push(mediaFile(sheet.path, "sheet", run.viewport, { label: `时间轴 ${sheet.from}–${sheet.to}s` }));
        }
      }
      const decided = type === "page" ? pageResults(own, files) : type === "game" ?
        gameResults(own, files, readFileSync(resolve(root, result.url), "utf8")) : imageResults(own, files);
      const scripted = protocol.criteria.filter((item) => item.by === "script");
      const unsupported = scripted.filter((item) => !decided[item.id]).map((item) => item.id);
      if (unsupported.length) throw new Error(`检查器不支持脚本细则：${unsupported.join("、")}`);
      records.push({ id: `${captureId}-${result.key.replaceAll("/", "--")}`, key: result.key, sha256: hash,
        fingerprint: protocol.fingerprint, at: new Date().toISOString(), checker, environment,
        results: scripted.map((item) => ({ id: item.id, ...decided[item.id] })), files: media });
      console.log(`      ${result.key}：${scripted.map((item) => `${item.id}=${decided[item.id].status}`).join(" ")}`);
    }
    if (write) {
      text = replaceJsonSection(text, "自动检查", [...protocol.autoChecks, ...records]);
      writeFileSync(resolve(root, version.evaluationPath), text);
      console.log(`write ${version.evaluationPath}`);
    } else {
      writeFileSync(resolve(mediaDir, "report.json"), JSON.stringify(records, null, 2) + "\n");
      console.log(`diag  ${relative(root, mediaDir)}（未写入评测）`);
    }
  }
} finally {
  await browser.close();
  await server.close();
}
