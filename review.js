export const STATUS_LABELS = { pass: "通过", partial: "部分做到", fail: "未通过", pending: "待确认" };
export const POLICY = Object.freeze({ target: 16, minimumJudges: 2, viewports: ["desktop", "mobile"] });
const choices = ["left", "right", "tie", "unknown"];
const date = (value) => typeof value === "string" && Number.isFinite(Date.parse(value));
const name = (value) => typeof value === "string" && value.trim() && value !== "unknown";
export const pairKey = (task) => `${[task.left, task.right].sort().join("|")}|${task.dimension}`;
export const recordRef = (record) => JSON.stringify([record.source, record.reviewer, record.at, record.key, record.id, record.viewport]);

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function resolveViewport(item, records, viewport) {
  const selected = records.filter((record) => record.viewport === viewport || item.method === "auto");
  const latest = new Map();
  for (const record of selected) {
    const key = JSON.stringify([record.source, record.reviewer]);
    if (!latest.has(key) || Date.parse(record.at) >= Date.parse(latest.get(key).at)) latest.set(key, record);
  }
  const evidence = [...latest.values()];
  const human = evidence.filter((record) => record.source === "human");
  const active = item.method === "auto" ? evidence : human.length ? human : evidence.filter((record) => record.source === "ai");
  const states = new Set(active.map((record) => record.status));
  const aiReady = new Set(active.filter((record) => record.source === "ai" && record.independentDeclared).map((record) => record.family)).size >= POLICY.minimumJudges;
  const ready = item.method === "auto" || human.length > 0 || aiReady;
  // A visual core failure reported by AI is a review risk, not an automatic disqualification.
  const agreed = states.size === 1 ? active[0].status : "pending";
  const status = ready && !(item.tier === "core" && !human.length && item.method !== "auto" && agreed !== "pass") ? agreed : "pending";
  return { status, disputed: states.size > 1, source: item.method === "auto" ? "auto" : human.length ? "human" : "ai",
    aiReady, risk: !human.length && evidence.some((record) => record.source === "ai" && record.status !== "pass"),
    evidence, audited: human.some((record) => record.status !== "pending") };
}

export function createQueue(version, viewport, random = Math.random, target = POLICY.target) {
  const risks = [], candidates = [];
  for (const result of version.results) {
    for (const item of version.evaluation.criteria.filter((item) => item.method !== "auto")) {
      const state = result.acceptance?.checks.find((check) => check.id === item.id)?.viewports?.[viewport];
      if (state?.audited && !state.disputed) continue;
      const task = { key: result.key, id: item.id, reason: "audit" };
      if (state?.disputed || (item.tier === "core" && state?.risk) || item.method === "human") {
        risks.push({ ...task, reason: state?.disputed ? "dispute" : item.method === "human" ? "human-only" : "core-risk" });
      } else candidates.push(task);
    }
  }
  const sampled = [];
  for (const key of shuffle(version.results.map((item) => item.key), random)) {
    for (const tier of ["core", "detail"]) {
      const item = shuffle(candidates.filter((task) => task.key === key &&
        version.evaluation.criteria.find((item) => item.id === task.id)?.tier === tier), random)[0];
      if (item) sampled.push(item);
    }
  }
  const used = new Set([...risks, ...sampled].map((item) => `${item.key}|${item.id}`));
  const remaining = shuffle(candidates.filter((item) => !used.has(`${item.key}|${item.id}`)), random);
  const budget = Math.max(0, target - risks.length - 4);
  return [...risks, ...sampled.slice(0, Math.max(8, budget)), ...remaining.slice(0, Math.max(0, budget - sampled.length))];
}

export function createSession(experiment, version, reviewer, blindDeclared, viewport, random = Math.random) {
  const keys = version.results.map((result) => result.key);
  const pairs = [];
  for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) pairs.push([keys[i], keys[j]]);
  return {
    protocol: 3, source: "human", id: crypto.randomUUID(), experiment: experiment.id, version: version.version,
    fingerprint: version.evaluation.fingerprint, reviewer: reviewer.trim(), blindDeclared, viewport,
    hashes: Object.fromEntries(version.results.map((result) => [result.key, result.sha256])),
    order: shuffle(keys, random), assessments: {}, queue: createQueue(version, viewport, random),
    tasks: shuffle(pairs, random).slice(0, 4).map((pair, index) => {
      const [left, right] = shuffle(pair, random);
      return { left, right, dimension: version.evaluation.dimensions[index % version.evaluation.dimensions.length].id,
        choice: null, note: "", at: null };
    }),
    createdAt: new Date().toISOString(), sealedAt: null, phase: "acceptance", index: 0
  };
}
export function answerComplete(answer) {
  return answer && Object.hasOwn(STATUS_LABELS, answer.status) && date(answer.at) &&
    (answer.note?.trim() || (answer.evidenceRef && answer.initialStatus === answer.status));
}
export function assessmentComplete(session, version, key, id) {
  const assessment = session.assessments?.[key];
  return Boolean(assessment?.observed === true && (id ? answerComplete(assessment.checks?.[id]) :
    Object.values(assessment.checks ?? {}).some(answerComplete)));
}
export function sessionComplete(session) {
  return session.queue.every((task) => assessmentComplete(session, null, task.key, task.id)) &&
    session.tasks.every((task) => choices.includes(task.choice) && task.note?.trim() && date(task.at));
}
export function expandAudit(session, version, task, answer) {
  const check = version.results.find((item) => item.key === task.key)?.acceptance?.checks.find((item) => item.id === task.id);
  const ai = check?.viewports?.[session.viewport]?.evidence.filter((item) => item.source === "ai") ?? [];
  const mismatch = ai.length && ai.some((item) => item.status !== answer.status);
  if (task.reason !== "audit" || answer.status === "pending" || (!mismatch && !(check?.tier === "core" && answer.status !== "pass"))) return;
  const known = new Set(session.queue.map((item) => `${item.key}|${item.id}`));
  for (const item of version.evaluation.criteria.filter((item) => item.method !== "auto")) {
    if (!known.has(`${task.key}|${item.id}`)) session.queue.push({ key: task.key, id: item.id, reason: "expanded" });
  }
  session.expanded = true;
}
export function sealSession(session) {
  const sealed = structuredClone(session);
  for (const [key, assessment] of Object.entries(sealed.assessments)) {
    assessment.checks = Object.fromEntries(Object.entries(assessment.checks).filter(([, answer]) => assessment.observed && answerComplete(answer)));
    if (!Object.keys(assessment.checks).length) delete sealed.assessments[key];
  }
  sealed.tasks = sealed.tasks.filter((task) => choices.includes(task.choice) && task.note?.trim() && date(task.at));
  if (!Object.keys(sealed.assessments).length && !sealed.tasks.length) throw new Error("至少完成一个观察项或一组成对比较后再封存。");
  sealed.sealedAt = new Date().toISOString(); sealed.phase = "sealed"; sealed.index = 0;
  return sealed;
}
export function sessionMatches(session, version) {
  return session?.protocol === 3 && session.version === version.version && session.fingerprint === version.evaluation?.fingerprint &&
    version.results.length === Object.keys(session.hashes ?? {}).length &&
    version.results.every((result) => session.hashes[result.key] === result.sha256);
}
export function validateHumanSession(session, protocol, hashes, { sealed = true } = {}) {
  if (!session || session.protocol !== 3 || session.source !== "human" || session.fingerprint !== protocol.fingerprint) throw new Error("人工会话协议、来源或标准无效");
  if (!name(session.id) || !name(session.reviewer) || typeof session.blindDeclared !== "boolean" ||
      !POLICY.viewports.includes(session.viewport)) throw new Error("人工会话身份或环境无效");
  if (!date(session.createdAt) || (sealed && !date(session.sealedAt))) throw new Error("只接受有效日期的已封存记录");
  if (sealed && Date.parse(session.createdAt) > Date.parse(session.sealedAt)) throw new Error("创建时间晚于封存");
  const keys = Object.keys(hashes).sort();
  if (JSON.stringify(Object.keys(session.hashes ?? {}).sort()) !== JSON.stringify(keys) ||
      keys.some((key) => session.hashes[key] !== hashes[key])) throw new Error("会话不属于当前原始产物");
  if (!Array.isArray(session.order) || session.order.length !== keys.length || new Set(session.order).size !== keys.length ||
      session.order.some((key) => !keys.includes(key))) throw new Error("匿名顺序无效");
  if (!Array.isArray(session.queue) || !Array.isArray(session.tasks) || !session.assessments || Array.isArray(session.assessments)) throw new Error("任务队列无效");
  const seen = new Set();
  for (const task of session.queue) {
    const token = `${task.key}|${task.id}`;
    if (seen.has(token) || !keys.includes(task.key) || !protocol.criteria.some((item) => item.id === task.id && item.method !== "auto") ||
        !["audit", "dispute", "core-risk", "human-only", "expanded"].includes(task.reason)) throw new Error("复核任务重复或无效");
    seen.add(token);
  }
  let completed = 0;
  for (const [key, assessment] of Object.entries(session.assessments)) {
    if (!keys.includes(key) || !assessment || typeof assessment.observed !== "boolean" || !assessment.checks || Array.isArray(assessment.checks)) throw new Error("观察记录无效");
    for (const [id, answer] of Object.entries(assessment.checks)) {
      if (!seen.has(`${key}|${id}`) || !answer || typeof answer.note !== "string") throw new Error("观察项不属于队列");
      if (!sealed) {
        if (!["", ...Object.keys(STATUS_LABELS)].includes(answer.status)) throw new Error("草稿结论无效");
        continue;
      }
      if (!assessment.observed || !answerComplete(answer) || Date.parse(answer.at) > Date.parse(session.sealedAt) ||
          Date.parse(answer.at) < Date.parse(session.createdAt)) throw new Error("观察未完成或日期不在会话期间");
      if (answer.evidenceRef) {
        const ref = protocol.records?.find((record) => recordRef(record) === answer.evidenceRef);
        if (!ref || ref.source !== "ai" || ref.key !== key || ref.id !== id || ref.viewport !== session.viewport ||
            !date(answer.revealedAt) || !Object.hasOwn(STATUS_LABELS, answer.initialStatus) ||
            Date.parse(answer.revealedAt) > Date.parse(answer.at) ||
            (!answer.note.trim() && answer.status !== ref.status)) throw new Error("引用证据或独立判断无效");
      }
      completed++;
    }
  }
  const pairs = new Set();
  for (const task of session.tasks) {
    const token = pairKey(task);
    if (pairs.has(token) || !keys.includes(task.left) || !keys.includes(task.right) || task.left === task.right ||
        !protocol.dimensions.some((item) => item.id === task.dimension) || typeof task.note !== "string" ||
        !(sealed ? choices : [null, ...choices]).includes(task.choice)) throw new Error("比较任务重复或无效");
    if (sealed && (!task.note.trim() || !date(task.at) || Date.parse(task.at) > Date.parse(session.sealedAt) ||
        Date.parse(task.at) < Date.parse(session.createdAt))) throw new Error("比较依据或日期无效");
    pairs.add(token);
  }
  if (sealed && !completed && !session.tasks.length) throw new Error("不能导入空会话");
}
export function validDraft(session, version, experimentId) {
  try {
    if (!sessionMatches(session, version) || session.experiment !== experimentId) return false;
    validateHumanSession(session, version.evaluation, session.hashes, { sealed: Boolean(session.sealedAt) });
    if (session.sealedAt) return session.phase === "sealed";
    const size = session.phase === "acceptance" ? session.queue.length : session.tasks.length;
    return ["acceptance", "comparison"].includes(session.phase) && Number.isInteger(session.index) && session.index >= 0 && session.index < size;
  } catch { return false; }
}
export function comparisonSummary(version, source = "human") {
  const results = new Map(version.results.map((result) => [result.key, result]));
  const latest = new Map();
  const sessions = source === "human" ? version.evaluation.sessions : version.evaluation.aiReviews;
  for (const session of sessions ?? []) for (const task of source === "human" ? session.tasks : session.comparisons) {
    const viewport = task.viewport ?? session.viewport;
    const key = JSON.stringify([session.reviewer, viewport, pairKey(task)]);
    if (!latest.has(key) || Date.parse(task.at) >= Date.parse(latest.get(key).task.at)) latest.set(key, { task, viewport });
  }
  return version.evaluation.dimensions.map((dimension) => {
    const rows = version.results.map((result) => ({ key: result.key, wins: 0, losses: 0, ties: 0, unknown: 0 }));
    const byKey = new Map(rows.map((row) => [row.key, row]));
    let eligible = 0, excluded = 0;
    for (const { task } of latest.values()) {
      if (task.dimension !== dimension.id) continue;
      if (results.get(task.left)?.acceptance?.status !== "pass" || results.get(task.right)?.acceptance?.status !== "pass") { excluded++; continue; }
      eligible++;
      const left = byKey.get(task.left), right = byKey.get(task.right);
      const choice = source === "ai" && task.choice !== task.reverseChoice ? "unknown" : task.choice;
      if (choice === "left") { left.wins++; right.losses++; }
      else if (choice === "right") { right.wins++; left.losses++; }
      else if (choice === "tie") { left.ties++; right.ties++; }
      else { left.unknown++; right.unknown++; }
    }
    return { ...dimension, source, rows, eligible, excluded };
  });
}
