// Protocol-6 checker for keyboard-driven canvas games (Super Mario 1-1). One real run per viewport: the desktop run
// emulates a 144Hz display and the mobile run 60Hz, so the same blind input script also measures refresh independence.
// Measurements read the game canvas itself, mapped to 256×240 game pixels; nothing in the artifact is changed.
import { performance } from "node:perf_hooks";

export const GAME_SHEETS = { desktop: { cols: 4, cell: 480, perSheet: 12, aspect: 240 / 256 }, mobile: { cols: 6, cell: 240, perSheet: 12 } };
const HZ = { desktop: 144, mobile: 60 };
const WALK = 1.5625, RUN = 2.5625, TOLERANCE = 0.12, LIMIT = 150;
const round = (value, digits = 1) => Math.round(value * 10 ** digits) / 10 ** digits;

// Runs inside the page before any artifact script.
function probe({ hz }) {
  const lab = window.__lab = { hz, keys: [], canvases: [], blits: new WeakMap(), lastSource: null,
    audio: { contexts: 0, oscillators: [], buffers: 0 } };
  const createElement = Document.prototype.createElement, drawImage = CanvasRenderingContext2D.prototype.drawImage;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // requestAnimationFrame at the emulated refresh rate with real timestamps, drift-corrected.
  let handle = 0, next = performance.now();
  const queue = new Map();
  window.requestAnimationFrame = (callback) => { queue.set(++handle, callback); return handle; };
  window.cancelAnimationFrame = (id) => { queue.delete(id); };
  const tick = () => {
    const now = performance.now(), callbacks = [...queue.values()];
    next = Math.max(next + 1000 / hz, now - 100);
    queue.clear();
    for (const callback of callbacks) { try { callback(now); } catch (error) { setTimeout(() => { throw error; }); } }
    setTimeout(tick, Math.max(0, next - performance.now()));
  };
  setTimeout(tick, 0);
  Document.prototype.createElement = function (...args) {
    const element = createElement.apply(this, args);
    if (element instanceof HTMLCanvasElement) lab.canvases.push(element);
    return element;
  };
  if (window.OffscreenCanvas) {
    const Native = window.OffscreenCanvas;
    window.OffscreenCanvas = class OffscreenCanvas extends Native { constructor(...args) { super(...args); lab.canvases.push(this); } };
  }
  // Records how a 256×240 buffer is blitted onto another canvas (integer scale, smoothing).
  CanvasRenderingContext2D.prototype.drawImage = function (source, ...rest) {
    if (source && source.width === 256 && source.height === 240 && source !== this.canvas) {
      const size = rest.length >= 8 ? [rest[6], rest[7]] : rest.length >= 4 ? [rest[2], rest[3]] : [256, 240];
      lab.blits.set(this.canvas, { width: size[0], height: size[1], smoothing: this.imageSmoothingEnabled });
      if (this.canvas.isConnected) lab.lastSource = source;
    }
    return drawImage.call(this, source, ...rest);
  };
  for (const name of ["AudioContext", "webkitAudioContext"]) {
    const Native = window[name];
    if (typeof Native !== "function") continue;
    window[name] = class extends Native { constructor(...args) { super(...args); lab.audio.contexts++; } };
  }
  if (window.OscillatorNode) {
    const start = OscillatorNode.prototype.start;
    OscillatorNode.prototype.start = function (...args) { lab.audio.oscillators.push({ t: performance.now(), type: this.type }); return start.apply(this, args); };
  }
  if (window.AudioBufferSourceNode) {
    const start = AudioBufferSourceNode.prototype.start;
    AudioBufferSourceNode.prototype.start = function (...args) { lab.audio.buffers++; return start.apply(this, args); };
  }
  for (const type of ["keydown", "keyup"]) addEventListener(type, (event) => {
    if (!event.repeat) lab.keys.push({ t: performance.now(), type, code: event.code });
  }, true);

  const area = (canvas) => { const box = canvas.getBoundingClientRect(); return box.width * box.height; };
  const visible = () => [...document.querySelectorAll("canvas")].filter((canvas) => {
    const box = canvas.getBoundingClientRect(), style = getComputedStyle(canvas);
    return box.width > 0 && box.height > 0 && style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.1;
  }).sort((a, b) => area(b) - area(a));
  const exact = (canvas) => canvas.width === 256 && canvas.height === 240;
  const every = () => [...new Set([...document.querySelectorAll("canvas"), ...lab.canvases])];
  lab.source = () => { const shown = visible(); return shown.find(exact) ?? lab.lastSource ?? every().find(exact) ?? shown[0] ?? null; };
  lab.grab = () => {
    const source = lab.source();
    if (!source?.width || !source?.height) return null;
    if (!lab.scratch) {
      lab.scratch = createElement.call(document, "canvas");
      lab.scratch.width = 256; lab.scratch.height = 240;
      lab.context = lab.scratch.getContext("2d", { willReadFrequently: true });
    }
    lab.context.imageSmoothingEnabled = false;
    lab.context.clearRect(0, 0, 256, 240);
    try { drawImage.call(lab.context, source, 0, 0, source.width, source.height, 0, 0, 256, 240); } catch { return null; }
    return lab.context.getImageData(0, 0, 256, 240).data;
  };
  const changed = (a, b, i) => Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]) + Math.abs(a[i + 3] - b[i + 3]) > 48;
  lab.stats = (frame = lab.grab()) => {
    if (!frame) return null;
    let black = 0;
    for (let i = 0; i < frame.length; i += 4) if (frame[i + 3] >= 128 && frame[i] < 32 && frame[i + 1] < 32 && frame[i + 2] < 32) black++;
    return { black: black / (frame.length / 4) };
  };
  lab.display = () => {
    const canvas = visible()[0];
    if (!canvas) return null;
    const box = canvas.getBoundingClientRect();
    return { width: canvas.width, height: canvas.height, box: [box.left, box.top, box.width, box.height], viewport: [innerWidth, innerHeight],
      rendering: getComputedStyle(canvas).imageRendering, buffer: every().some(exact), blit: lab.blits.get(canvas) ?? null };
  };
  lab.box = () => { const canvas = visible()[0]; if (!canvas) return null; const box = canvas.getBoundingClientRect(); return { x: box.left, y: box.top, width: box.width, height: box.height }; };
  lab.mark = () => { lab.ref = lab.grab(); };
  // Title → (black WORLD 1-1 screen) → level. Without a black screen, a large picture change counts as started.
  lab.waitStart = async (limit) => {
    const begin = performance.now();
    let sawBlack = false;
    while (performance.now() - begin < limit) {
      await sleep(50);
      const frame = lab.grab();
      if (!frame) continue;
      const { black } = lab.stats(frame);
      if (black >= 0.6) sawBlack = true;
      else if (sawBlack && black < 0.3) return { ok: true, black: true, ms: Math.round(performance.now() - begin) };
      if (!sawBlack && performance.now() - begin > 2500) {
        let diff = 0;
        if (lab.ref) for (let i = 0; i < frame.length; i += 4) if (changed(frame, lab.ref, i)) diff++;
        const change = diff / (frame.length / 4);
        return { ok: change >= 0.12, black: false, change: Math.round(change * 1000) / 1000, ms: Math.round(performance.now() - begin) };
      }
    }
    return { ok: false, black: sawBlack, ms: limit };
  };
  // Pixels that change while Mario stands still (HUD, animated tiles) are ignored by the jump measurement.
  lab.idle = async (ms) => {
    const first = lab.grab(), mask = new Uint8Array(256 * 240), begin = performance.now();
    while (first && performance.now() - begin < ms) {
      await sleep(50);
      const frame = lab.grab();
      if (!frame) break;
      for (let p = 0; p < mask.length; p++) if (changed(frame, first, p * 4)) mask[p] = 1;
    }
    lab.mask = mask;
    return { volatile: mask.reduce((sum, value) => sum + value, 0) };
  };
  lab.trackJump = async (ms) => {
    const base = lab.grab(), samples = [], begin = performance.now();
    while (base && performance.now() - begin < ms) {
      await sleep(12);
      const frame = lab.grab();
      if (!frame) break;
      let top = null;
      for (let y = 32; y < 208 && top === null; y++) {
        let count = 0;
        for (let x = 0; x < 128; x++) { const p = y * 256 + x; if (!lab.mask?.[p] && changed(frame, base, p * 4)) count++; }
        if (count >= 2) top = y;
      }
      samples.push({ t: Math.round(performance.now()), top });
    }
    return samples;
  };
  // Horizontal camera shift between two frames: best alignment of rows 32–207 (later frame b equals a shifted left).
  const shift = (a, b, max) => {
    let best = 0, bestCost = Infinity;
    for (let dx = 0; dx <= max; dx++) {
      let cost = 0, count = 0;
      for (let y = 32; y < 208; y += 2) for (let x = 0; x < 256 - dx; x++) {
        const i = (y * 256 + x + dx) * 4, j = (y * 256 + x) * 4;
        cost += Math.abs(a[i] - b[j]) + Math.abs(a[i + 1] - b[j + 1]) + Math.abs(a[i + 2] - b[j + 2]); count++;
      }
      if (cost / count < bestCost) { bestCost = cost / count; best = dx; }
    }
    return best;
  };
  lab.scrollStart = (step) => {
    const state = lab.scroll = { prev: lab.grab(), samples: [{ t: performance.now(), dx: 0 }] };
    state.timer = setInterval(() => {
      const frame = lab.grab();
      if (!frame || !state.prev) return;
      state.samples.push({ t: performance.now(), dx: shift(state.prev, frame, 48) });
      state.prev = frame;
    }, step);
  };
  lab.scrollStop = () => { clearInterval(lab.scroll?.timer); return lab.scroll?.samples ?? []; };
}

// Steady camera speed in game pixels per 60Hz frame: median of the 0.1 s steps after `from` (page clock) in which the
// camera moved, so an early death or a wall does not drag the reading down and a too-fast game reads as too fast.
function steadySpeed(samples, from) {
  const speeds = [];
  for (let i = 1; i < samples.length; i++) {
    if (samples[i - 1].t >= from && samples[i].dx >= 1) speeds.push(samples[i].dx / (samples[i].t - samples[i - 1].t) * 1000 / 60);
  }
  if (speeds.length < 3) return null;
  speeds.sort((a, b) => a - b);
  const middle = speeds.length >> 1;
  return speeds.length % 2 ? speeds[middle] : (speeds[middle - 1] + speeds[middle]) / 2;
}

export async function gameRun({ browser, server, result, viewport, size }) {
  const hz = HZ[viewport], mobile = viewport === "mobile";
  const context = await browser.newContext({ viewport: size });
  await context.addInitScript(probe, { hz });
  const page = await context.newPage();
  const path = `/${result.url}`, errors = [], resources = new Set(), frames = [];
  const data = { viewport, hz, errors, frames, lives: 1 };
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
  const begin = performance.now();
  const elapsed = () => (performance.now() - begin) / 1000;
  const wait = (ms) => page.waitForTimeout(ms);
  const lab = (fn, arg) => page.evaluate(fn, arg);
  // Desktop frames show the game canvas; mobile frames show the whole screen and only key events.
  const shot = async (label, key = false) => {
    if (mobile && !key) return;
    const box = mobile ? null : await lab(() => window.__lab.box());
    const clip = box && box.width > 8 && box.height > 8 ? { x: Math.max(0, box.x), y: Math.max(0, box.y),
      width: Math.min(box.width, size.width - Math.max(0, box.x)), height: Math.min(box.height, size.height - Math.max(0, box.y)) } : undefined;
    frames.push({ seconds: round(elapsed()), label: `${round(elapsed())}s ${label}`, buffer: await page.screenshot({ type: "jpeg", quality: 85, clip }) });
  };
  const start = async () => {
    for (const key of ["Enter", "Space", "KeyZ", "click"]) {
      await lab(() => window.__lab.mark());
      if (key === "click") {
        const box = await lab(() => window.__lab.box());
        if (box) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await page.keyboard.press("Enter");
      } else await page.keyboard.press(key);
      const waiting = lab((limit) => window.__lab.waitStart(limit), 10000);
      await wait(700);
      await shot(`按 ${key === "click" ? "点击+Enter" : key} 后`, true);
      const outcome = await waiting;
      if (outcome.ok) return { key, ...outcome };
    }
    return null;
  };
  // Waits for the black WORLD 1-1 screen after a death and for the level to come back.
  const restart = async (limit) => {
    const from = performance.now();
    let black = false, last = 0;
    while (performance.now() - from < limit && elapsed() < LIMIT) {
      const stats = await lab(() => window.__lab.stats());
      const now = performance.now();
      if (stats && stats.black >= 0.6) {
        if (!black || now - last > 2000) { black = true; last = now; await shot("黑屏", true); }
      } else if (black && stats && stats.black < 0.3) return true;
      else if (!black && now - last > 500 && now - from < 6000) { last = now; await shot("等待"); }
      await wait(100);
    }
    return false;
  };
  const move = async (keys, hold, shots = []) => {
    await lab(() => window.__lab.scrollStart(100));
    const t = performance.now();
    for (const key of keys) await page.keyboard.down(key);
    for (const [ms, label] of shots) { await wait(Math.max(0, t + ms - performance.now())); await shot(label, true); }
    await wait(Math.max(0, t + hold - performance.now()));
    const samples = await lab(() => window.__lab.scrollStop());
    const pressed = await lab(() => window.__lab.keys.filter((item) => item.type === "keydown" && item.code === "ArrowRight").at(-1)?.t ?? null);
    const total = samples.reduce((sum, sample) => sum + sample.dx, 0);
    return { total, pressed, samples: samples.length,
      speed: pressed === null ? null : steadySpeed(samples, pressed + 800) };
  };
  const release = async (keys) => { for (const key of [...keys].reverse()) await page.keyboard.up(key); };
  const jump = async (hold, label) => {
    const tracking = lab((ms) => window.__lab.trackJump(ms), 1500);
    await wait(80);
    const t = performance.now();
    await page.keyboard.down("KeyZ");
    if (hold > 300) { await wait(380); await shot(label, true); }
    await wait(Math.max(0, t + hold - performance.now()));
    await page.keyboard.up("KeyZ");
    if (hold <= 300) { await wait(160); await shot(label, true); }
    const samples = await tracking;
    const tops = samples.map((sample) => sample.top).filter((top) => top !== null);
    return { rise: tops.length ? Math.max(...tops) - Math.min(...tops) : null, samples: samples.length };
  };
  const life = async () => {
    data.lives++;
    await wait(800);
    await shot(`第 ${data.lives} 次开局`, true);
  };
  const run = async () => {
    const keys = ["KeyX", "ArrowRight"];
    data.run = await move(keys, 2000, [[1000, "奔跑"]]);
    await page.keyboard.up("ArrowRight");
    await page.keyboard.down("ArrowLeft");
    await wait(120);
    await shot("刹车", true);
    await wait(180);
    await release(["KeyX", "ArrowLeft"]);
  };
  try {
    await page.goto(server.url + path);
    await wait(1500);
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
    data.ready = await page.screenshot({ type: "jpeg", quality: 85 });
    await shot("标题", true);
    data.start = await start();
    await wait(1000);
    data.display = await lab(() => window.__lab.display());
    await shot("开局", true);
    await lab((ms) => window.__lab.idle(ms), 2000);
    data.short = await jump(50, "短跳");
    await wait(300);
    data.long = await jump(600, "长跳");
    await wait(400);
    data.walk = await move(["ArrowRight"], 2600, [[1000, "行走"], [2000, "行走"]]);
    await release(["ArrowRight"]);
    data.audio = await lab(() => ({ contexts: window.__lab.audio.contexts, oscillators: window.__lab.audio.oscillators,
      buffers: window.__lab.audio.buffers, jumps: window.__lab.keys.filter((item) => item.type === "keydown" && item.code === "KeyZ").map((item) => item.t) }));
    let restarted = await restart(12000);
    if (restarted) { await life(); await run(); }
    else {
      // No restart after the first life: measure running on a fresh page instead.
      data.reloaded = true;
      await page.reload();
      await wait(1500);
      data.restartedStart = await start();
      await wait(1000);
      await shot("刷新后开局", true);
      await run();
    }
    restarted = await restart(12000);
    while (restarted && elapsed() < LIMIT) {
      await life();
      const keys = ["ArrowRight"];
      await page.keyboard.down("ArrowRight");
      for (let second = 1; second <= 5; second++) { await wait(1000); await shot("行走"); }
      await release(keys);
      restarted = await restart(12000);
    }
    await wait(1500);
    await shot("结束", true);
    data.complete = await page.screenshot({ type: "jpeg", quality: 85 });
    data.completeLabel = "结束画面";
  } catch (error) {
    data.error = error.message.split("\n")[0];
  } finally {
    data.resources = [...resources];
    data.seconds = round(elapsed());
    await context.close();
  }
  return data;
}

// ---- Source inspection: CONFIG object and the string level map. ----
const ESCAPES = { n: "\n", t: "\t", r: "\r", b: "\b", f: "\f", v: "\v", 0: "\0" };
function lex(code, from = 0, nested = false) {
  const tokens = [];
  let i = from, depth = 0;
  const regexAllowed = () => {
    const last = tokens.findLast((token) => token.type !== "comment");
    return !last || (last.type === "punct" && !")]}".includes(last.value)) ||
      (last.type === "word" && /^(return|typeof|case|do|else|in|of|new|delete|void|throw|yield|await)$/.test(last.value));
  };
  while (i < code.length) {
    const c = code[i], n = code[i + 1];
    if (/\s/.test(c)) { i++; continue; }
    if (c === "/" && n === "/") {
      const end = code.indexOf("\n", i) < 0 ? code.length : code.indexOf("\n", i);
      tokens.push({ type: "comment", value: code.slice(i + 2, end), start: i, end }); i = end; continue;
    }
    if (c === "/" && n === "*") {
      const close = code.indexOf("*/", i + 2), end = close < 0 ? code.length : close + 2;
      tokens.push({ type: "comment", value: code.slice(i + 2, close < 0 ? end : close), start: i, end }); i = end; continue;
    }
    if (c === "'" || c === "\"" || c === "`") {
      let j = i + 1, value = "", interp = false;
      while (j < code.length && code[j] !== c && (c === "`" || code[j] !== "\n")) {
        if (code[j] === "\\") {
          const next = code[j + 1];
          if (next === "\n") j += 2;
          else { value += ESCAPES[next] ?? next; j += 2; }
        } else if (c === "`" && code[j] === "$" && code[j + 1] === "{") { interp = true; j = lex(code, j + 2, true).end; }
        else value += code[j++];
      }
      tokens.push({ type: "string", value, interp, template: c === "`", start: i, end: j + 1 }); i = j + 1; continue;
    }
    if (c === "/" && regexAllowed()) {
      let j = i + 1, inClass = false;
      while (j < code.length && code[j] !== "\n") {
        if (code[j] === "\\") { j += 2; continue; }
        if (code[j] === "[") inClass = true;
        else if (code[j] === "]") inClass = false;
        else if (code[j] === "/" && !inClass) break;
        j++;
      }
      j++;
      while (/[a-z]/i.test(code[j] ?? "")) j++;
      tokens.push({ type: "regex", start: i, end: j }); i = j; continue;
    }
    if (/[\w$.]/.test(c)) {
      let j = i;
      while (j < code.length && /[\w$.]/.test(code[j])) j++;
      tokens.push({ type: "word", value: code.slice(i, j), start: i, end: j }); i = j; continue;
    }
    if (nested) {
      if (c === "{") depth++;
      else if (c === "}") { if (depth === 0) return { tokens, end: i + 1 }; depth--; }
    }
    tokens.push({ type: "punct", value: c, start: i, end: i + 1 }); i++;
  }
  return { tokens, end: i };
}
const commonest = (values) => {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
};

function findConfig(tokens) {
  const code = tokens.filter((token) => token.type !== "comment");
  for (let k = 0; k < code.length - 2; k++) {
    if (code[k].type !== "word" || !/(^|\.)CONFIG$/.test(code[k].value) || code[k + 1].value !== "=" || code[k + 2].value === "=") continue;
    let m = k + 2;
    if (code[m]?.value === "Object.freeze" && code[m + 1]?.value === "(") m += 2;
    if (code[m]?.value !== "{") continue;
    let depth = 0, end = m;
    for (; end < code.length; end++) {
      if (code[end].value === "{") depth++;
      else if (code[end].value === "}" && --depth === 0) break;
    }
    const numbers = code.slice(m, end).filter((token) => token.type === "word" && /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(token.value)).map((token) => Number(token.value));
    return { numbers };
  }
  return null;
}

function mapCandidates(tokens) {
  const code = tokens.filter((token) => token.type !== "comment"), found = [];
  const longestRun = (rows) => {
    let best = [], current = [];
    for (const row of rows) {
      if (row.length >= 180 && row.length <= 260) { current.push(row); if (current.length > best.length) best = current.slice(); }
      else current = [];
    }
    return best;
  };
  for (let k = 0; k < code.length; k++) {
    if (code[k].value !== "[" || code[k].type !== "punct") continue;
    const rows = [];
    let m = k + 1, current = null, ok = true;
    for (; m < code.length; m++) {
      const token = code[m];
      if (token.type === "string" && !token.interp) {
        if (current !== null && code[m - 1].value !== "+") { ok = false; break; }
        current = (current ?? "") + token.value;
      } else if (token.value === "+" && current !== null) continue;
      else if (token.value === "," && current !== null) { rows.push(current); current = null; }
      else if (token.value === "]") { if (current !== null) rows.push(current); break; }
      else { ok = false; break; }
    }
    if (!ok || m >= code.length) continue;
    const run = longestRun(rows);
    if (run.length >= 13) found.push({ kind: "array", rows: run.length > 16 ? run.slice(0, 15) : run, start: code[k].start, end: code[m].end });
    k = m;
  }
  for (const token of code) {
    if (token.type !== "string" || token.interp || !token.value.includes("\n")) continue;
    let lines = token.value.split("\n");
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines.at(-1).trim()) lines.pop();
    const indent = Math.min(...lines.map((line) => line.match(/^\s*/)[0].length));
    lines = lines.map((line) => line.slice(indent));
    const run = longestRun(lines);
    if (run.length >= 13) found.push({ kind: "text", rows: run.length > 16 ? run.slice(0, 15) : run, start: token.start, end: token.end });
  }
  return found;
}

// Expected World 1-1 features from the Prompt (x in tiles, y rows from the top, ground rows 13–14).
const LAYOUT = {
  pits: [[69, 2], [86, 3], [153, 2]],
  pipes: [[28, 2], [38, 3], [46, 4], [57, 4], [163, 2], [179, 2]],
  stairs: [[134, [1, 2, 3, 4]], [140, [4, 3, 2, 1]], [148, [1, 2, 3, 4, 4]], [155, [4, 3, 2, 1]], [181, [1, 2, 3, 4, 5, 6, 7, 8, 8]]],
  flag: 198,
  blocks: [[9, [16]], [9, [20, 21, 22, 23, 24]], [5, [22]], [9, [77, 78, 79]], [5, [80, 81, 82, 83, 84, 85, 86, 87]],
    [5, [91, 92, 93, 94]], [9, [94]], [9, [100, 101]], [9, [106, 109, 112]], [5, [109]], [9, [118]], [5, [121, 122, 123]],
    [5, [128, 129, 130, 131]], [9, [129, 130]], [9, [168, 169, 170, 171]]]
};
export function checkLayout(rows) {
  const offset = 15 - rows.length;
  const cell = (x, y) => { const row = rows[y - offset]; return row === undefined || x < 0 || x >= row.length ? null : row[x]; };
  const sky = commonest(rows.filter((_, index) => index + offset <= 4).join(""));
  const filled = (x, y) => { const value = cell(x, y); return value !== null && value !== sky; };
  const height = (x) => { let h = 0; while (h < 12 && filled(x, 12 - h)) h++; return h; };
  const ground13 = commonest(rows[13 - offset] ?? ""), ground14 = commonest(rows[14 - offset] ?? "");
  const runs = [];
  for (let x = 0; x <= 196; x++) {
    if (cell(x, 13) !== ground13 && cell(x, 14) !== ground14) {
      if (runs.at(-1)?.end === x - 1) runs.at(-1).end = x; else runs.push({ start: x, end: x });
    }
  }
  const near = (fn) => [-1, 0, 1].some(fn);
  const features = (d) => [
    ...LAYOUT.pits.map(([x, w]) => [`坑 x=${x}`, runs.some((run) => Math.abs(run.start - (x + d)) <= 1 && run.end - run.start + 1 === w)]),
    ["只有 3 个坑", runs.length === 3],
    ...LAYOUT.pipes.map(([x, h]) => [`管道 x=${x}`, near((s) => height(x + d + s) === h && height(x + d + s + 1) === h)]),
    ...LAYOUT.stairs.map(([x, hs]) => [`台阶 x=${x}`, near((s) => hs.every((h, i) => height(x + d + s + i) === h))]),
    [`旗杆底座 x=${LAYOUT.flag}`, near((s) => { const x = LAYOUT.flag + d + s; return height(x) >= 1 && height(x - 1) === 0 && height(x + 1) === 0; })],
    ...LAYOUT.blocks.map(([y, xs]) => [`${y === 9 ? "低层" : "高层"} x=${xs[0]}${xs.length > 1 ? `–${xs.at(-1)}` : ""}`,
      near((s) => xs.every((x) => filled(x + d + s, y)))])
  ];
  let best = null;
  for (const d of [0, -1, 1, -2, 2, -3, 3]) {
    const list = features(d), matched = list.filter(([, ok]) => ok).length;
    if (!best || matched > best.matched) best = { d, matched, total: list.length, missing: list.filter(([, ok]) => !ok).map(([name]) => name) };
  }
  return { ...best, pits: runs.length };
}

export function inspectSource(html) {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)].filter(([, attrs]) => !/\bsrc\s*=/i.test(attrs) &&
    (!/\btype\s*=/i.test(attrs) || /\btype\s*=\s*["']?(module|(text|application)\/(java|ecma)script)\b/i.test(attrs))).map((match) => match[2]);
  const code = scripts.join("\n;\n"), { tokens } = lex(code);
  const config = findConfig(tokens);
  const targets = [1.5625, 2.5625, 0.0371, 0.0557, 0.0508, 0.1016, 0.125, 0.4375, 4.5];
  const configHits = config ? targets.filter((target) => config.numbers.some((value) => Math.abs(value - target) <= target * 0.005)) : [];
  const candidates = mapCandidates(tokens).map((candidate) => {
    const bottom = candidate.rows.at(-1), sky = commonest(candidate.rows.slice(0, 3).join("")), ground = commonest(bottom);
    return { ...candidate, score: ground === sky ? 0 : [...bottom].filter((value) => value === ground).length / bottom.length };
  }).sort((a, b) => b.score - a.score || b.rows.length - a.rows.length);
  const map = candidates[0] ?? null;
  let legend = null;
  if (map) {
    const comments = tokens.filter((token) => token.type === "comment" && token.start >= map.start - 3000 && token.start <= map.end).map((token) => token.value).join("\n");
    const chars = [...new Set(map.rows.join(""))].filter((value) => value.trim());
    const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const mentioned = chars.filter((value) => new RegExp(`(^|[\\s'"\`(\\[,，:：=/])${escape(value)}($|[\\s'"\`)\\],，:：=/-])`).test(comments));
    legend = { chars: chars.length, mentioned: mentioned.length, missing: chars.filter((value) => !mentioned.includes(value)) };
  }
  return { config: config && { hits: configHits.length, total: targets.length, missing: targets.filter((value) => !configHits.includes(value)) },
    map: map && { kind: map.kind, rows: map.rows.length, lengths: [...new Set(map.rows.map((row) => row.length))], legend, layout: checkLayout(map.rows) } };
}

// ---- Verdicts ----
function displayVerdict(d) {
  if (!d) return { status: "fail", text: "进入关卡后找不到可见画布" };
  const [left, top, width, height] = d.box, [vw, vh] = d.viewport;
  const cssX = width / d.width, cssY = height / d.height, native = d.width === 256 && d.height === 240;
  const blit = !native && d.blit ? d.blit : null;
  const gameWidth = (blit ? blit.width : d.width) * cssX, gameHeight = (blit ? blit.height : d.height) * cssY;
  const scale = Math.round(gameWidth / 256);
  const integer = scale >= 1 && Math.abs(gameWidth / 256 - scale) <= 0.02 && Math.abs(gameHeight / 240 - scale) <= 0.02;
  const inside = left >= -1 && top >= -1 && left + width <= vw + 1 && top + height <= vh + 1;
  const cssScaled = Math.abs(cssX - 1) > 0.01 || Math.abs(cssY - 1) > 0.01;
  const crisp = (!cssScaled || /pixelated|crisp-edges/.test(d.rendering)) && (!blit || blit.smoothing === false || (blit.width === 256 && blit.height === 240));
  const met = [d.buffer, integer && inside, crisp].filter(Boolean).length;
  return { status: met === 3 ? "pass" : "partial",
    text: `画布 ${d.width}×${d.height}，游戏画面显示 ${round(gameWidth)}×${round(gameHeight)}（${integer ? `${scale} 倍` : "非整数倍"}），${inside ? "完整在视口内" : "超出视口"}，image-rendering ${d.rendering}${blit ? `，缓冲绘制为 ${blit.width}×${blit.height}、平滑${blit.smoothing ? "开" : "关"}` : ""}；${d.buffer ? "有" : "没有"} 256×240 画布或缓冲` };
}
const band = (value, target) => value === null || value === undefined ? null : Math.abs(value / target - 1) <= TOLERANCE;
const fmt = (value, digits = 3) => value === null || value === undefined ? "无" : round(value, digits);
function ratioVerdict(a, b) {
  if (!a || !b) return null;
  const ratio = a / b;
  return { ratio, status: ratio >= 0.88 && ratio <= 1.14 ? "pass" : ratio >= 0.75 && ratio <= 1.33 ? "partial" : "fail" };
}

export function gameResults(runs, files, source) {
  const RANK = { pass: 0, partial: 1, fail: 2 };
  const label = (run) => `${run.viewport === "desktop" ? "桌面" : "手机"} ${run.hz}Hz`;
  const judge = (fn) => {
    const items = runs.map(fn);
    return { status: items.map((item) => item.status).reduce((a, b) => RANK[b] > RANK[a] ? b : a, "pass"),
      evidence: runs.map((run, index) => `${label(run)}：${items[index].text}`).join("；") };
  };
  const error = (run) => run.error ? `（运行异常：${run.error}）` : "";
  const notStarted = (run) => run.start ? "" : "（未能从标题开始）";
  const code = inspectSource(source), map = code.map;
  const desktop = runs.find((run) => run.viewport === "desktop"), mobile = runs.find((run) => run.viewport === "mobile");
  const walkRatio = ratioVerdict(desktop?.walk?.speed, mobile?.walk?.speed), runRatio = ratioVerdict(desktop?.run?.speed, mobile?.run?.speed);
  const refresh = !walkRatio ? "fail" : [walkRatio, runRatio].filter(Boolean).map((item) => item.status).reduce((a, b) => RANK[b] > RANK[a] ? b : a, "pass");
  const formatOk = map && map.kind === "array" && map.rows >= 13 && map.rows <= 16 && map.lengths.length === 1 &&
    map.lengths[0] >= 200 && map.lengths[0] <= 230 && map.legend.chars > 0 && map.legend.mentioned / map.legend.chars >= 0.6;
  return {
    standalone: judge((run) => {
      const external = [...run.resources, ...(run.declarations ?? [])];
      return { status: files.length === 1 && !external.length ? "pass" : "fail",
        text: `目录 ${files.length} 个文件，外部引用 ${external.length} 个${external.length ? `：${external.slice(0, 3).join("、")}` : ""}` };
    }),
    console: judge((run) => ({ status: run.errors.length ? "fail" : "pass",
      text: run.errors.length ? `${run.errors.length} 条错误：${run.errors[0].slice(0, 120)}` : `${run.seconds}s 固定操作中无页面错误或 console.error` })),
    "pixel-display": judge((run) => displayVerdict(run.display)),
    config: { status: !code.config ? "fail" : code.config.hits >= 7 ? "pass" : "partial",
      evidence: code.config ? `CONFIG 对象含特征数值 ${code.config.hits}/${code.config.total}${code.config.missing.length ? `，缺 ${code.config.missing.join("、")}` : ""}` : "源码中没有名为 CONFIG 的对象字面量" },
    "level-format": { status: !map ? "fail" : formatOk ? "pass" : "partial",
      evidence: map ? `${map.kind === "array" ? "字符串数组" : "多行字符串"} ${map.rows} 行，行长 ${map.lengths.join("/")}；注释说明了 ${map.legend.mentioned}/${map.legend.chars} 种字符${map.legend.missing.length ? `（未说明 ${map.legend.missing.slice(0, 6).map((value) => JSON.stringify(value)).join(" ")}）` : ""}` :
        "源码中找不到 13 行以上、每行约 212 字符的字符串地图" },
    layout: { status: !map ? "fail" : map.layout.matched >= 28 ? "pass" : map.layout.matched >= 19 ? "partial" : "fail",
      evidence: map ? `整体平移 ${map.layout.d} 格，符合 ${map.layout.matched}/${map.layout.total} 项，地图中共 ${map.layout.pits} 个坑${map.layout.missing.length ? `；未符合：${map.layout.missing.join("、")}` : ""}` : "没有可读取的关卡地图" },
    playable: judge((run) => ({ status: (run.walk?.total ?? 0) >= 48 ? "pass" : "fail",
      text: `开始方式 ${run.start ? `${run.start.key}${run.start.black ? "（有黑屏过场）" : "（无黑屏过场）"}` : "无"}，按住 → 2.6s 镜头卷动 ${run.walk ? run.walk.total : "无"} 像素${notStarted(run)}${error(run)}` })),
    "jump-control": judge((run) => {
      const short = run.short?.rise ?? null, long = run.long?.rise ?? null;
      const ok = [long !== null && long >= 32, long !== null && short !== null && long >= short * 1.5].filter(Boolean).length;
      return { status: ok === 2 ? "pass" : ok === 1 ? "partial" : "fail",
        text: `短按起落差 ${short ?? "无"} 像素，长按 ${long ?? "无"} 像素${long && short ? `（${round(long / Math.max(short, 1), 2)} 倍）` : ""}${notStarted(run)}` };
    }),
    speed: judge((run) => {
      const walk = run.walk?.speed ?? null, running = run.run?.speed ?? null;
      const ok = [band(walk, WALK), band(running, RUN)].filter(Boolean).length;
      return { status: ok === 2 ? "pass" : ok === 1 ? "partial" : "fail",
        text: `走 ${fmt(walk)} 像素/帧（目标 1.5625），跑 ${fmt(running)}（目标 2.5625）${run.reloaded ? "，跑步在刷新后测得" : ""}${notStarted(run)}` };
    }),
    "refresh-rate": { status: refresh,
      evidence: `走速 桌面 144Hz ${fmt(desktop?.walk?.speed)}、手机 60Hz ${fmt(mobile?.walk?.speed)}，比值 ${walkRatio ? round(walkRatio.ratio, 2) : "测不到"}；跑速 ${fmt(desktop?.run?.speed)} / ${fmt(mobile?.run?.speed)}，比值 ${runRatio ? round(runRatio.ratio, 2) : "测不到"}` },
    audio: judge((run) => {
      const audio = run.audio, jumps = audio?.jumps ?? [];
      const voiced = audio?.oscillators.some((item) => ["square", "custom"].includes(item.type) && jumps.some((t) => item.t >= t && item.t - t <= 300));
      const types = [...new Set((audio?.oscillators ?? []).map((item) => item.type))];
      return { status: !audio?.contexts ? "fail" : voiced ? "pass" : "partial",
        text: `AudioContext ${audio?.contexts ?? 0} 个，振荡器启动 ${audio?.oscillators.length ?? 0} 次（${types.join("/") || "无"}），缓冲源 ${audio?.buffers ?? 0} 次；按 Z 后 0.3s 内${voiced ? "有" : "没有"}方波` };
    })
  };
}
