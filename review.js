export const STATUS_LABELS = { pass: "通过", partial: "部分通过", fail: "未通过", scored: "已评分", pending: "未判断" };
export const POLICY = Object.freeze({
  scale: 5, tasteStep: 0.5, judges: ["script", "ai"],
  scriptSelection: "latest", judgeSelection: "latest-complete"
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

// Latest script run for an artifact under the current rubric; never mixes runs.
export function latestAutoCheck(evaluation, result) {
  return latestBy(evaluation.autoChecks.filter((item) => item.key === result.key && item.sha256 === result.sha256 &&
    item.fingerprint === evaluation.fingerprint), () => "auto")[0] ?? null;
}

export function summarizeScore(version, key) {
  const evaluation = version.evaluation, result = version.results.find((item) => item.key === key);
  const empty = { total: null, objective: null, taste: null, count: 0, aiJudges: 0, auto: null,
    dimensions: [], checks: [], judges: [], excluded: [], spread: null };
  if (!evaluation || !result) return empty;
  const criteria = evaluation.criteria.map((item) => ({ ...item,
    kind: evaluation.dimensions.find((dimension) => dimension.id === item.dimension).kind }));
  const auto = latestAutoCheck(evaluation, result);
  const scriptScore = (id) => {
    const status = auto?.results.find((item) => item.id === id)?.status;
    return status ? POINTS[status] : null;
  };
  const candidates = evaluation.aiReviews.filter((batch) =>
    batch.fingerprint === evaluation.fingerprint && batch.hashes[key] === result.sha256);
  const assess = (batch) => {
    const checks = criteria.map((criterion) => ({ ...criterion, score: criterion.by === "script" ? scriptScore(criterion.id) :
      batch.checks.find((item) => item.key === key && item.id === criterion.id)?.score ?? null }));
    const missing = checks.filter((item) => item.score === null);
    return { batch, checks, complete: !missing.length,
      aiComplete: !missing.some((item) => item.by === "ai"), pending: missing.map((item) => item.id) };
  };
  const assessed = candidates.map(assess);
  // Whole AI sessions only; a judge needs both its own complete batch and a complete script run.
  const selected = latestBy(assessed.filter((item) => item.aiComplete).map((item) => item.batch), identity)
    .filter((batch) => assessed.find((item) => item.batch.id === batch.id).complete);
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
    if (criterion.by === "script") {
      const item = auto?.results.find((record) => record.id === criterion.id);
      const score = scriptScore(criterion.id);
      return { ...criterion, score, value: score === null ? null : score / POLICY.scale, disputed: false,
        records: item ? [{ source: "script", reviewer: auto.checker, model: "script", session: auto.id, at: auto.at,
          status: item.status, score, note: item.evidence, counted: true }] : [] };
    }
    const records = candidates.flatMap((batch) => batch.checks.filter((item) => item.key === key && item.id === criterion.id)
      .map((item) => ({ source: "ai", reviewer: batch.reviewer, model: batch.model, session: batch.id, at: batch.at,
        status: item.status, score: item.score, note: item.note, counted: selectedIds.has(batch.id) })));
    const score = mean(records.filter((item) => item.counted).map((item) => item.score));
    return { ...criterion, score, value: score === null ? null : score / POLICY.scale, records,
      disputed: new Set(records.filter((item) => item.counted).map((item) => item.score)).size > 1 };
  });
  const totals = judges.map((item) => item.total), total = mean(totals);
  const objective = sourceScore(dimensions, "objective"), taste = sourceScore(dimensions, "taste");
  return { total: total === null ? null : round(total),
    objective: objective === null ? null : round(objective), taste: taste === null ? null : round(taste),
    count: judges.length, aiJudges: judges.length, auto: auto ? { id: auto.id, at: auto.at, files: auto.files } : null,
    dimensions, checks,
    judges: judges.map((item) => ({ ...item, total: round(item.total), objective: round(item.objective), taste: round(item.taste) })),
    excluded: assessed.filter((item) => !selectedIds.has(item.batch.id) && !item.aiComplete).map(({ batch, pending }) => ({
      session: batch.id, reviewer: batch.reviewer, model: batch.model, at: batch.at, pending
    })),
    spread: totals.length ? { min: round(Math.min(...totals)), max: round(Math.max(...totals)),
      range: round(Math.max(...totals) - Math.min(...totals)) } : null };
}
