import { readFileSync } from "node:fs";
import { createReviewHandler } from "../server/reviews.mjs";
import { productionStore } from "../server/review-store.mjs";

let handler;
export default async function reviews(req, res) {
  if (!handler) {
    const lab = JSON.parse(readFileSync(new URL("../data/lab.json", import.meta.url), "utf8"));
    let store = null;
    try { store = productionStore(); } catch { /* No production file-system fallback. */ }
    const secret = process.env.REVIEW_COOKIE_SECRET || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    handler = createReviewHandler({ lab, store, secret });
  }
  return handler(req, res);
}
