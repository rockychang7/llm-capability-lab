import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { resolve, sep, extname } from "node:path";
import { chromium } from "playwright";

export const root = resolve(import.meta.dirname, "..");
export async function localServer({ reviews = null, port = 0 } = {}) {
  const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webm": "video/webm" };
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://local").pathname);
      if (pathname === "/api/reviews") {
        if (reviews) return await reviews(request, response);
        response.writeHead(503, { "Content-Type": "application/json", "Cache-Control": "no-store" }).end(JSON.stringify({ available: false, error: "此静态预览未开启评价服务" }));
        return;
      }
      if (pathname.split("/").some((part) => part.startsWith(".")) || /^\/(server|api)\//.test(pathname)) { response.writeHead(403).end(); return; }
      const path = resolve(root, "." + pathname);
      if (!path.startsWith(root + sep) && path !== root) { response.writeHead(403).end(); return; }
      const target = path === root ? resolve(root, "index.html") : path;
      const content = readFileSync(target);
      const headers = { "Content-Type": types[extname(target)] ?? "text/plain", "Cache-Control": "no-store", "Accept-Ranges": "bytes" };
      const range = request.headers.range;
      if (range) {
        const match = range.match(/^bytes=(\d*)-(\d*)$/);
        const start = match?.[1] ? Number(match[1]) : Math.max(0, content.length - Number(match?.[2]));
        const end = match?.[1] && match[2] ? Math.min(Number(match[2]), content.length - 1) : content.length - 1;
        if (!match || (!match[1] && !match[2]) || !Number.isSafeInteger(start) || start < 0 || start > end) {
          response.writeHead(416, { ...headers, "Content-Range": `bytes */${content.length}` }).end(); return;
        }
        response.writeHead(206, { ...headers, "Content-Length": end - start + 1, "Content-Range": `bytes ${start}-${end}/${content.length}` });
        response.end(request.method === "HEAD" ? undefined : content.subarray(start, end + 1));
      } else {
        response.writeHead(200, { ...headers, "Content-Length": content.length });
        response.end(request.method === "HEAD" ? undefined : content);
      }
    } catch { response.writeHead(404).end("Not found"); }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });
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
