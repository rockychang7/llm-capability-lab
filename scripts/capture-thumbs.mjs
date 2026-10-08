#!/usr/bin/env node
// Captures one homepage thumbnail per experiment into assets/thumbs/<id>.png.
// Uses the top-scored result (or the first one) and a local headless Chrome/Edge.
// Screenshots are derived files; model artifacts are never modified.
// Usage: node scripts/capture-thumbs.mjs [--force]   then rerun node scripts/build-data.mjs
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const force = process.argv.includes("--force");
const browsers = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium"
].filter(Boolean);
const browser = browsers.find((path) => existsSync(path));
if (!browser) {
  console.error("error 未找到 Chrome/Edge，可用 CHROME_PATH 指定");
  process.exit(1);
}

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
const server = createServer((request, response) => {
  const path = normalize(join(root, decodeURIComponent(new URL(request.url, "http://x").pathname)));
  if (!path.startsWith(normalize(root)) || !existsSync(path)) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { "content-type": types[extname(path)] ?? "application/octet-stream" }).end(readFileSync(path));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const { experiments } = JSON.parse(readFileSync(join(root, "data/lab.json"), "utf8"));
mkdirSync(join(root, "assets/thumbs"), { recursive: true });

for (const experiment of experiments) {
  const target = join(root, "assets/thumbs", `${experiment.id}.png`);
  const result = experiment.results[0];
  if (!result) continue;
  if (existsSync(target) && !force) {
    console.log(`skip  ${experiment.id}（已存在，--force 可重新截图）`);
    continue;
  }
  // 1440×900 CSS viewport rendered at 0.5x -> 720×450 image.
  await promisify(execFile)(browser, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--mute-audio",
    "--force-device-scale-factor=0.5", "--window-size=1440,900",
    "--virtual-time-budget=4000", `--screenshot=${target}`,
    `${base}/${result.url}`
  ], { timeout: 60000 });
  console.log(`ok    ${experiment.id} ← ${result.key}`);
}

server.close();
