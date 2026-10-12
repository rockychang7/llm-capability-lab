export const STATUS_LABELS = { pass: "通过", partial: "部分通过", fail: "未通过", scored: "已评分", pending: "未判断" };
export const POLICY = Object.freeze({
  scale: 5, viewports: ["desktop", "mobile"], tasteStep: 0.5,
  objectiveViewport: "minimum", tasteViewport: "mean", judgeSelection: "latest-complete"
});
export const date = (value) => typeof value === "string" && Number.isFinite(Date.parse(value));
export const name = (value) => typeof value === "string" && Boolean(value.trim()) && value.trim() !== "unknown";
export const POINTS = Object.freeze({ pass: 5, partial: 2.5, fail: 0, pending: null });
const round = (value) => Math.round(value * 10) / 10;
const mean = (items) => items.length ? items.reduce((sum, value) => sum + value, 0) / items.length : null;
const identity = (item) => JSON.stringify([item.reviewer, item.model]);

export function latestBy(items, key) {
  const latest = new Map();
  for (const item of items) {
    const token = key(item), previous = latest.get(token);
    if (!previous || Date.parse(item.at) > Date.parse(previous.at) ||
        (Date.parse(item.at) === Date.parse(previous.at) && item.id > previous.id)) latest.set(token, item);
  }
  return [...latest.values()];
}

export function summarizeScore(version, key) {
  const evaluation = version.evaluation, result = version.results.find((item) => item.key === key);
  const empty = { total: null, objective: null, taste: null, count: 0, aiJudges: 0,
    dimensions: [], checks: [], judges: [], excluded: [], spread: null };
  if (!evaluation || !result) return empty;
  const criteria = evaluation.criteria.map((item) => ({ ...item,
    kind: evaluation.dimensions.find((dimension) => dimension.id === item.dimension).kind }));
  const candidates = evaluation.aiReviews.filter((batch) =>
    batch.fingerprint === evaluation.fingerprint && batch.hashes[key] === result.sha256);
  const assess = (batch) => {
    const records = evaluation.records.filter((item) => item.session === batch.id && item.key === key);
    const checks = criteria.map((criterion) => {
      const environments = POLICY.viewports.map((viewport) =>
        records.find((item) => item.id === criterion.id && item.viewport === viewport));
      const values = environments.map((item) => item?.score);
      const complete = values.every((value) => typeof value === "number" && Number.isFinite(value));
      return { ...criterion, score: complete ?
        criterion.kind === "objective" ? Math.min(...values) : mean(values) : null };
    });
    return { batch, checks, complete: checks.every((item) => item.score !== null),
      pending: checks.filter((item) => item.score === null).map((item) => item.id) };
  };
  const assessed = candidates.map(assess);
  // Select whole complete sessions, never stitch criteria from unrelated review rounds.
  const selected = latestBy(assessed.filter((item) => item.complete).map((item) => item.batch), identity);
  const selectedIds = new Set(selected.map((item) => item.id));
  const sourceScore = (dimensions, kind) => {
    const items = dimensions.filter((item) => item.kind === kind);
    return items.length && items.every((item) => item.score !== null) ?
      items.reduce((sum, item) => sum + item.score / POLICY.scale * item.weight, 0) /
        items.reduce((sum, item) => sum + item.weight, 0) * 100 : null;
  };
  const judges = selected.map((batch) => {
    const assessment = assessed.find((item) => item.batch.id === batch.id);
    const dimensions = evaluation.dimensions.map((dimension) => ({ ...dimension,
      score: mean(assessment.checks.filter((item) => item.dimension === dimension.id).map((item) => item.score)) }));
    return { reviewer: batch.reviewer, model: batch.model, session: batch.id, at: batch.at, dimensions,
      total: dimensions.reduce((sum, item) => sum + item.score / POLICY.scale * item.weight, 0),
      objective: sourceScore(dimensions, "objective"), taste: sourceScore(dimensions, "taste") };
  });
  const dimensions = evaluation.dimensions.map((dimension) => ({ ...dimension,
    score: mean(judges.map((judge) => judge.dimensions.find((item) => item.id === dimension.id).score)) }));
  const checks = criteria.map((criterion) => {
    const score = mean(selected.map((batch) => assessed.find((item) => item.batch.id === batch.id)
      .checks.find((item) => item.id === criterion.id).score));
    const records = evaluation.records.filter((item) => item.key === key && item.id === criterion.id &&
      candidates.some((batch) => batch.id === item.session)).map((item) => ({ ...item, counted: selectedIds.has(item.session) }));
    return { ...criterion, score, value: score === null ? null : score / POLICY.scale, records,
      disputed: new Set(records.filter((item) => item.counted).map((item) => item.score)).size > 1 };
  });
  const totals = judges.map((item) => item.total), total = mean(totals);
  const objective = sourceScore(dimensions, "objective"), taste = sourceScore(dimensions, "taste");
  return { total: total === null ? null : round(total),
    objective: objective === null ? null : round(objective), taste: taste === null ? null : round(taste),
    count: judges.length, aiJudges: judges.length, dimensions, checks,
    judges: judges.map((item) => ({ ...item, total: round(item.total), objective: round(item.objective), taste: round(item.taste) })),
    excluded: assessed.filter((item) => !item.complete).map(({ batch, pending }) => ({
      session: batch.id, reviewer: batch.reviewer, model: batch.model, at: batch.at, pending
    })),
    spread: totals.length ? { min: round(Math.min(...totals)), max: round(Math.max(...totals)),
      range: round(Math.max(...totals) - Math.min(...totals)) } : null };
}
