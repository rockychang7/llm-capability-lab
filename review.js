export const STATUS_LABELS = { pass: "通过", partial: "部分做到", fail: "未通过", pending: "待确认" };

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createSession(experiment, version, reviewer, blindDeclared, viewport, random = Math.random) {
  const keys = version.results.map((result) => result.key);
  const tasks = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (const dimension of version.evaluation.dimensions) {
        const pair = shuffle([keys[i], keys[j]], random);
        tasks.push({ left: pair[0], right: pair[1], dimension: dimension.id, choice: null, note: "", at: null });
      }
    }
  }
  return {
    protocol: 2, id: crypto.randomUUID(), experiment: experiment.id, version: version.version,
    fingerprint: version.evaluation.fingerprint, reviewer: reviewer.trim(), blindDeclared, viewport,
    hashes: Object.fromEntries(version.results.map((result) => [result.key, result.sha256])),
    order: shuffle(keys, random), assessments: {}, tasks: shuffle(tasks, random),
    createdAt: new Date().toISOString(), sealedAt: null, phase: "acceptance", index: 0
  };
}

export function assessmentComplete(session, version, key) {
  const assessment = session.assessments?.[key];
  return Boolean(assessment?.observed === true && version.evaluation.criteria.filter((item) => item.method === "human")
    .every((item) => Object.hasOwn(STATUS_LABELS, assessment.checks?.[item.id]?.status) &&
      typeof assessment.checks[item.id].note === "string" && assessment.checks[item.id].note.trim()));
}

export function sessionComplete(session, version) {
  return session.order.every((key) => assessmentComplete(session, version, key)) &&
    session.tasks.every((task) => ["left", "right", "tie", "unknown"].includes(task.choice) && task.note?.trim());
}

export function sessionMatches(session, version) {
  return session?.protocol === 2 && session.version === version.version && session.fingerprint === version.evaluation?.fingerprint &&
    version.results.length === Object.keys(session.hashes ?? {}).length &&
    version.results.every((result) => session.hashes[result.key] === result.sha256);
}

export function validDraft(session, version, experimentId) {
  if (!sessionMatches(session, version) || session.experiment !== experimentId ||
      typeof session.id !== "string" || !session.id || typeof session.reviewer !== "string" ||
      !session.reviewer.trim() || session.reviewer === "unknown" ||
      typeof session.blindDeclared !== "boolean" || !["desktop", "mobile"].includes(session.viewport)) return false;
  const keys = version.results.map((item) => item.key);
  if (!Array.isArray(session.order) || session.order.length !== keys.length ||
      new Set(session.order).size !== keys.length || session.order.some((key) => !keys.includes(key)) ||
      !session.assessments || typeof session.assessments !== "object" || Array.isArray(session.assessments)) return false;
  const expected = keys.length * (keys.length - 1) / 2 * version.evaluation.dimensions.length;
  if (!Array.isArray(session.tasks) || session.tasks.length !== expected) return false;
  const seen = new Set();
  for (const task of session.tasks) {
    if (!task || !keys.includes(task.left) || !keys.includes(task.right) || task.left === task.right ||
        !version.evaluation.dimensions.some((item) => item.id === task.dimension) ||
        typeof task.note !== "string" || ![null, "left", "right", "tie", "unknown"].includes(task.choice)) return false;
    const key = `${[task.left, task.right].sort().join("|")}|${task.dimension}`;
    if (seen.has(key)) return false;
    seen.add(key);
  }
  for (const key of Object.keys(session.assessments)) {
    const value = session.assessments[key];
    if (!keys.includes(key) || !value || typeof value.observed !== "boolean" ||
        !value.checks || typeof value.checks !== "object") return false;
    for (const [id, answer] of Object.entries(value.checks)) {
      if (!version.evaluation.criteria.some((item) => item.id === id && item.method === "human") ||
          !answer || typeof answer.note !== "string" ||
          !["", ...Object.keys(STATUS_LABELS)].includes(answer.status)) return false;
    }
  }
  if (session.sealedAt) return session.phase === "sealed" && typeof session.sealedAt === "string" &&
    Number.isFinite(Date.parse(session.sealedAt)) && sessionComplete(session, version) &&
    session.tasks.every((task) => typeof task.at === "string" && Number.isFinite(Date.parse(task.at)) &&
      Date.parse(task.at) <= Date.parse(session.sealedAt));
  return ["acceptance", "comparison"].includes(session.phase) && Number.isInteger(session.index) &&
    session.index >= 0 && session.index < (session.phase === "acceptance" ? keys.length : expected);
}

export function comparisonSummary(version) {
  const results = new Map(version.results.map((result) => [result.key, result]));
  const latest = new Map();
  for (const session of version.evaluation.sessions ?? []) {
    const key = JSON.stringify([session.reviewer, session.viewport]);
    if (!latest.has(key) || Date.parse(session.sealedAt) >= Date.parse(latest.get(key).sealedAt)) latest.set(key, session);
  }
  return version.evaluation.dimensions.map((dimension) => {
    const rows = version.results.map((result) => ({ key: result.key, wins: 0, losses: 0, ties: 0, unknown: 0 }));
    const byKey = new Map(rows.map((row) => [row.key, row]));
    let eligible = 0;
    let excluded = 0;
    for (const session of latest.values()) {
      for (const task of session.tasks.filter((task) => task.dimension === dimension.id)) {
        if (results.get(task.left)?.acceptance?.status !== "pass" || results.get(task.right)?.acceptance?.status !== "pass") {
          excluded++;
          continue;
        }
        eligible++;
        const left = byKey.get(task.left);
        const right = byKey.get(task.right);
        if (task.choice === "left") { left.wins++; right.losses++; }
        else if (task.choice === "right") { right.wins++; left.losses++; }
        else if (task.choice === "tie") { left.ties++; right.ties++; }
        else { left.unknown++; right.unknown++; }
      }
    }
    return { ...dimension, rows, eligible, excluded };
  });
}
