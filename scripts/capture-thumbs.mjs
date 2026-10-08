#!/usr/bin/env node
// Captures a thumbnail for every page-type result into assets/thumbs/<test-id>/v<N>/<model>[--run-NN].png,
// using a local headless Chrome/Edge. SVG results need no thumbnail: the page shows the SVG itself.
// Screenshots are derived files; model artifacts are never modified.
// Usage: node scripts/capture-thumbs.mjs [--force]   then rerun node scripts/build-data.mjs
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize } from "node:path";
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

for (const experiment of experiments) {
  if (experiment.artifactType !== "page") continue;
  for (const version of experiment.versions) {
    for (const result of version.results) {
      const relative = `assets/thumbs/${experiment.id}/v${version.version}/${result.key.replace("/", "--")}.png`;
      const target = join(root, relative);
      if (existsSync(target) && !force) {
        console.log(`skip  ${relative}（已存在，--force 可重新截图）`);
        continue;
      }
      mkdirSync(dirname(target), { recursive: true });
      // 1440×900 CSS viewport rendered at 0.25x -> 360×225 image.
      await promisify(execFile)(browser, [
        "--headless=new", "--disable-gpu", "--hide-scrollbars", "--mute-audio",
        "--force-device-scale-factor=0.25", "--window-size=1440,900",
        "--virtual-time-budget=4000", `--screenshot=${target}`,
        `${base}/${result.url}`
      ], { timeout: 60000 });
      console.log(`ok    ${relative}`);
    }
  }
}

server.close();
