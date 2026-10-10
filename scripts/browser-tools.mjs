import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { resolve, sep, extname } from "node:path";
import { chromium } from "playwright";

export const root = resolve(import.meta.dirname, "..");
export async function localServer() {
  const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png" };
  const server = createServer((request, response) => {
    try {
      const path = resolve(root, "." + decodeURIComponent(new URL(request.url, "http://local").pathname));
      if (!path.startsWith(root + sep) && path !== root) { response.writeHead(403).end(); return; }
      const target = path === root ? resolve(root, "index.html") : path;
      response.writeHead(200, { "Content-Type": types[extname(target)] ?? "text/plain", "Cache-Control": "no-store" });
      response.end(readFileSync(target));
    } catch { response.writeHead(404).end("Not found"); }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((resolve) => server.close(resolve)) };
}

export async function launchBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
  ].filter(Boolean);
  const executablePath = candidates.find((path) => existsSync(path));
  return chromium.launch({ ...(executablePath ? { executablePath } : {}), headless: true });
}
