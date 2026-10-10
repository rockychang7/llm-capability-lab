import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve, sep } from "node:path";
import "./build-data.mjs";

const root = resolve(import.meta.dirname, "..");
const destination = resolve(root, "dist");
// Never clean an arbitrary path: only this project's generated deployment directory.
if (destination !== root + sep + "dist") throw new Error("Invalid deployment directory");
rmSync(destination, { recursive: true, force: true });
mkdirSync(destination);
for (const path of ["index.html", "lab.js", "review.js", "lab.css", "data", "prompts", "results", "assets"]) {
  cpSync(resolve(root, path), resolve(destination, path), { recursive: true });
}
console.log("ok    已生成 dist/：仅发布静态页面、展示数据、原始 Prompt / 产物与评测记录");
