export const STATUS_LABELS = { pass: "做到", partial: "部分做到", fail: "未做到", pending: "未判断" };
export const POLICY = Object.freeze({ scale: 5, viewports: ["desktop", "mobile"], humanDimensions: 3 });
export const date = (value) => typeof value === "string" && Number.isFinite(Date.parse(value));
export const name = (value) => typeof value === "string" && Boolean(value.trim()) && value !== "unknown";
const points = { pass: 1, partial: 0.5, fail: 0 };
const round = (value) => Math.round(value * 10) / 10;

export function latestBy(items, key) {
  const latest = new Map();
  for (const item of items) {
    const token = key(item), previous = latest.get(token);
    const byRevision = Number.isSafeInteger(item.revision) && Number.isSafeInteger(previous?.revision);
    if (!previous || (byRevision ? item.revision > previous.revision : Date.parse(item.at) > Date.parse(previous.at))) latest.set(token, item);
  }
  return [...latest.values()];
}

export function validateHumanReview(review, protocol, hashes) {
  if (!review || review.protocol !== 4 || review.source !== "human" || review.fingerprint !== protocol.fingerprint ||
      !hashes[review.key] || review.sha256 !== hashes[review.key]) throw new Error("评价标准或原始产物已变化，请刷新页面");
  if (!/^[a-f0-9]{64}$/.test(review.participant) || !name(review.id) || !date(review.at) ||
      !name(review.reviewer) || review.reviewer.length > 40 || !POLICY.viewports.includes(review.viewport) ||
      !Number.isSafeInteger(review.revision) || review.revision < 1) throw new Error("评价身份或日期无效");
  const dimensions = protocol.dimensions.filter((item) => item.source === "human");
  if (!review.scores || Array.isArray(review.scores) ||
      Object.keys(review.scores).length !== dimensions.length ||
      dimensions.some((item) => !Number.isInteger(review.scores[item.id]) || review.scores[item.id] < 1 || review.scores[item.id] > 5)) {
    throw new Error("请为所有人工维度选择 1–5 分");
  }
  if (typeof review.comment !== "string" || review.comment.length > 1000) throw new Error("评论最多 1000 字");
}

export function summarizeScore(version, key, additionalReviews = []) {
  const evaluation = version.evaluation;
  if (!evaluation) return { total: null, ai: null, human: null, count: 0, dimensions: [], checks: [] };
  const checks = evaluation.criteria.map((criterion) => {
    const records = latestBy(evaluation.records.filter((item) => item.key === key && item.id === criterion.id),
      (item) => JSON.stringify([item.reviewer, item.model, item.viewport]));
    const judges = new Map();
    for (const record of records) {
      const id = JSON.stringify([record.reviewer, record.model]);
      const environments = judges.get(id) ?? {};
      environments[record.viewport] = record;
      judges.set(id, environments);
    }
    const values = [...judges.values()].map((environments) =>
      POLICY.viewports.every((viewport) => Object.hasOwn(points, environments[viewport]?.status)) ?
        Math.min(...POLICY.viewports.map((viewport) => points[environments[viewport].status])) : null);
    const value = values.length && !values.includes(null) ? values.reduce((sum, item) => sum + item, 0) / values.length : null;
    return { ...criterion, value, records, disputed: new Set(records.map((record) => record.status)).size > 1 };
  });
  const result = version.results.find((item) => item.key === key);
  const reviews = latestBy([...evaluation.humanReviews, ...additionalReviews].filter((item) =>
    item.key === key && item.fingerprint === evaluation.fingerprint && item.sha256 === result?.sha256),
  (item) => item.participant);
  const dimensions = evaluation.dimensions.map((dimension) => {
    let score = null;
    if (dimension.source === "human" && reviews.length) {
      score = reviews.reduce((sum, item) => sum + item.scores[dimension.id], 0) / reviews.length;
    } else if (dimension.source === "ai") {
      const selected = checks.filter((check) => check.dimension === dimension.id);
      if (selected.length && selected.every((check) => check.value !== null)) {
        score = selected.reduce((sum, check) => sum + check.value, 0) / selected.length * POLICY.scale;
      }
    }
    return { ...dimension, score };
  });
  const sourceScore = (source) => {
    const selected = dimensions.filter((item) => item.source === source);
    return selected.every((item) => item.score !== null) ?
      round(selected.reduce((sum, item) => sum + item.score / POLICY.scale * item.weight, 0) /
        selected.reduce((sum, item) => sum + item.weight, 0) * 100) : null;
  };
  return { total: dimensions.every((item) => item.score !== null) ?
    round(dimensions.reduce((sum, item) => sum + item.score / POLICY.scale * item.weight, 0)) : null,
  ai: sourceScore("ai"), human: sourceScore("human"), dimensions, checks, count: reviews.length,
  reviews: reviews.sort((a, b) => Date.parse(b.at) - Date.parse(a.at)),
  aiJudges: new Set(evaluation.aiReviews.map((item) => JSON.stringify([item.reviewer, item.model]))).size };
}
