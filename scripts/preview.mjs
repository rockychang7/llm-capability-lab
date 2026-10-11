import { localServer } from "./browser-tools.mjs";
import { readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { root } from "./browser-tools.mjs";
import { FileReviewStore } from "../server/review-store.mjs";
import { createReviewHandler } from "../server/reviews.mjs";
const directory = resolve(root, ".local");
await mkdir(directory, { recursive: true });
const secretPath = resolve(directory, "review-secret");
let secret;
try { secret = await readFile(secretPath, "utf8"); }
catch (error) {
  if (error.code !== "ENOENT") throw error;
  secret = randomBytes(32).toString("hex");
  await writeFile(secretPath, secret, { mode: 0o600 });
}
const lab = JSON.parse(readFileSync(resolve(root, "data/lab.json"), "utf8"));
const server = await localServer({ port: Number(process.env.PORT ?? 0), reviews: createReviewHandler({
  lab, store: new FileReviewStore(resolve(directory, "reviews.json")), secret
}) });
console.log(`Preview: ${server.url}/`);
console.log("User reviews: persisted in .local/reviews.json (local only)");
process.on("SIGINT", async () => { await server.close(); process.exit(0); });
