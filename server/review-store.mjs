import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";

export class StorageUnavailable extends Error {}
export class RateLimited extends Error {}

export class FileReviewStore {
  constructor(path) { this.path = path; this.queue = Promise.resolve(); }
  async read() {
    try { return JSON.parse(await readFile(this.path, "utf8")); }
    catch (error) { if (error.code === "ENOENT") return { reviews: {}, limits: {} }; throw error; }
  }
  async list(scope) {
    await this.queue;
    return Object.values((await this.read()).reviews[scope] ?? {});
  }
  async put(scope, review, ip) {
    const operation = this.queue.then(async () => {
      const data = await this.read(), now = Date.now();
      const reviews = data.reviews[scope] ??= {}, field = `${review.participant}:${review.key}`;
      const submissions = (data.submissions ??= {})[scope] ??= {};
      const receipt = `${field}:${review.id}`;
      // An old request replay must not overwrite a newer rating.
      if (submissions[receipt] || reviews[field]?.id === review.id) return reviews[field];
      for (const [key, value] of Object.entries(data.limits)) if (value.until < now) delete data.limits[key];
      const limit = data.limits[ip] ??= { count: 0, until: now + 60000 };
      if (++limit.count > 30) throw new RateLimited();
      const saved = { ...review, revision: (reviews[field]?.revision ?? 0) + 1 };
      reviews[field] = saved;
      submissions[receipt] = saved.revision;
      await mkdir(dirname(this.path), { recursive: true });
      const temp = `${this.path}.${randomUUID()}.tmp`;
      await writeFile(temp, JSON.stringify(data), { mode: 0o600 });
      await rename(temp, this.path);
      return saved;
    });
    this.queue = operation.catch(() => {});
    return operation;
  }
}

const saveScript = `
local old = redis.call('HGET', KEYS[1], ARGV[1])
local review = cjson.decode(ARGV[2])
local revision = 0
if old then
  local previous = cjson.decode(old)
  if previous.id == review.id or redis.call('HEXISTS', KEYS[3], ARGV[3]) == 1 then return old end
  revision = previous.revision
end
local count = redis.call('INCR', KEYS[2])
if count == 1 then redis.call('EXPIRE', KEYS[2], 60) end
if count > 30 then return 'RATE_LIMIT' end
review.revision = revision + 1
local saved = cjson.encode(review)
redis.call('HSET', KEYS[1], ARGV[1], saved)
redis.call('HSET', KEYS[3], ARGV[3], review.revision)
return saved`;

export class RedisReviewStore {
  constructor(url, token, fetcher = fetch) {
    if (!url?.startsWith("https://") || !token) throw new StorageUnavailable();
    this.url = url; this.token = token; this.fetcher = fetcher;
  }
  async command(args) {
    try {
      const response = await this.fetcher(this.url, { method: "POST",
        headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
        body: JSON.stringify(args), signal: AbortSignal.timeout(8000) });
      const result = await response.json();
      if (!response.ok || result.error || !Object.hasOwn(result, "result")) throw new StorageUnavailable();
      return result.result;
    } catch { throw new StorageUnavailable(); }
  }
  async list(scope) {
    const values = await this.command(["HVALS", `lab:reviews:${scope}`]);
    if (!Array.isArray(values)) throw new StorageUnavailable();
    return values.map((item) => JSON.parse(item));
  }
  async put(scope, review, ip) {
    // Deduplication, revision and rate limit are one atomic Redis operation.
    const field = `${review.participant}:${review.key}`;
    const saved = await this.command(["EVAL", saveScript, 3, `lab:reviews:${scope}`, `lab:limit:${ip}`,
      `lab:submissions:${scope}`, field, JSON.stringify(review), `${field}:${review.id}`]);
    if (saved === "RATE_LIMIT") throw new RateLimited();
    if (typeof saved !== "string") throw new StorageUnavailable();
    return JSON.parse(saved);
  }
}

export function productionStore(env = process.env) {
  return new RedisReviewStore(env.UPSTASH_REDIS_REST_URL ?? env.KV_REST_API_URL,
    env.UPSTASH_REDIS_REST_TOKEN ?? env.KV_REST_API_TOKEN);
}
