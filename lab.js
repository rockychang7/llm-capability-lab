import { STATUS_LABELS, summarizeScore } from "./review.js";

const VIEWPORTS = { desktop: { label: "桌面", width: 1440, height: 900 }, mobile: { label: "手机", width: 390, height: 844 } };
const app = document.querySelector("#app"), live = document.querySelector("#live");
const e = (value) => String(value ?? "").replace(/[&<>"']/g, (char) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[char]);
const label = (result) => result.label + (result.run ? ` · ${result.run}` : "");
const number = (value) => value === null || value === undefined ? "待评" : value.toFixed(1);
const badge = (status) => `<span class="status status-${status}">${STATUS_LABELS[status]}</span>`;
const arrow = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const replay = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/></svg>';
const heading = (title, note = "") => `<div class="section-head"><h2>${e(title)}</h2>${note ? `<p>${e(note)}</p>` : ""}</div>`;
const readouts = (items) => `<div class="readouts">${items.map(([name, value]) => `<div class="readout"><span class="readout-label">${e(name)}</span><span class="readout-value">${e(value)}</span></div>`).join("")}</div>`;
const latest = (experiment) => experiment.versions.find((version) => version.version === experiment.latestVersion);
const apiCache = new Map(), memory = new Map();
let lab, current, generation = 0;
let storageWarning = false;
let reviewQueue = Promise.resolve();
function requestReviews(url, options = {}, timeout = 12000) {
  // Establish one browser cookie before issuing another experiment's request.
  const operation = reviewQueue.then(async () => {
    const response = await fetch(url, { credentials: "same-origin", ...options, signal: AbortSignal.timeout(timeout) });
    return { response, data: await response.json() };
  });
  reviewQueue = operation.catch(() => {});
  return operation;
}
const observer = new ResizeObserver((entries) => entries.forEach(({ target }) => fitFrame(target)));
function announce(text) { live.textContent = text; }
function route() {
  const [path, query = ""] = location.hash.replace(/^#\/?/, "").split("?");
  return { path: decodeURIComponent(path), params: new URLSearchParams(query) };
}
function hash(experiment, options = {}) {
  const params = new URLSearchParams(Object.entries(options).filter(([, value]) => value !== undefined && value !== null));
  return `#/${experiment.id}${params.size ? `?${params}` : ""}`;
}
const scope = (experiment, version) => `${experiment.id}:v${version.version}:${version.evaluation.fingerprint}`;
const draftKey = (context, result) => `llm-lab-rating:${scope(context.experiment, context.version)}:${result.key}:${result.sha256}`;
function stored(key) {
  try { return JSON.parse(localStorage.getItem(key) ?? "null") ?? memory.get(key); }
  catch { storageWarning = true; return memory.get(key) ?? null; }
}
function store(key, value) {
  memory.set(key, value);
  try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value)); }
  catch { storageWarning = true; }
}
function scoreFor(experiment, version, result) {
  return apiCache.get(scope(experiment, version))?.data?.scores?.[result.key] ?? result.score ?? summarizeScore(version, result.key);
}
function weightLabel(version) {
  return ["ai", "human"].map((source) => `${source === "ai" ? "AI" : "人工"} ${version.evaluation.dimensions.filter((item) => item.source === source).reduce((sum, item) => sum + item.weight, 0)}%`).join(" + ");
}
function renderHome(params) {
  const entries = lab.experiments.map((experiment) => ({ experiment, version: latest(experiment) }));
  const results = entries.flatMap(({ version }) => version.results);
  document.title = "LLM Capability Lab · 大模型能力实验台";
  app.innerHTML = `<div class="page"><section class="intro"><div class="intro-text"><p class="kicker">实验台 / 索引</p><h1>同一份提示词，独立生成。<br>功能交给 AI，体验由用户评价。</h1></div>
    ${readouts([["实验", entries.length], ["模型", new Set(results.map((item) => item.model)).size], ["原始产物", results.length]])}</section>
    <section class="block">${heading("实验")}<div class="box scroll"><div class="exp-table"><div class="exp-row exp-row-head"><span>编号</span><span>实验</span><span>提示词</span><span>产物</span><span>评分权重</span><span>人工维度</span><span></span></div>
    ${entries.map(({ experiment, version }) => `<a class="exp-row" href="${hash(experiment)}"><span class="exp-no">${e(experiment.number)}</span><span class="exp-main"><span class="chip">${e(experiment.capability)}</span><span class="exp-title">${e(experiment.title)}</span><span class="exp-question">${e(experiment.question)}</span></span>
      <span class="exp-prompt">v${version.version}<span class="muted">${version.prompt.length.toLocaleString("zh-CN")} 字</span></span>
      <span class="sheet">${version.results.map((result) => `<span class="sheet-item">${result.thumb || experiment.artifactType === "image" ? `<img src="${e(result.thumb ?? result.url)}" alt="" loading="lazy">` : ""}</span>`).join("")}<span class="sheet-count">${version.results.length} 份</span></span>
      <span class="progress-text">${weightLabel(version)}</span><span class="mono">${version.evaluation.dimensions.filter((item) => item.source === "human").length} 项</span><span class="exp-arrow">${arrow}</span></a>`).join("")}
    </div></div></section>
    <section class="block" id="matrix">${heading("模型 × 实验")}<div class="box scroll"><table class="matrix"><thead><tr><th>模型</th>${entries.map(({ experiment }) => `<th>${e(experiment.title)}</th>`).join("")}</tr></thead><tbody>
    ${[...new Set(results.map((item) => item.model))].sort().map((model) => `<tr><th>${e(results.find((item) => item.model === model).label)}</th>${entries.map(({ experiment, version }) => `<td>${version.results.filter((item) => item.model === model).map((result) => {
      const score = scoreFor(experiment, version, result);
      return `<a class="cell" href="${hash(experiment, { model: result.key })}"><span data-home-score="${e(experiment.id)}:${e(result.key)}">${number(score.total)}</span><span class="cell-note" data-home-count="${e(experiment.id)}:${e(result.key)}">${score.count} 份评价</span></a>`;
    }).join("") || "—"}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>
    <section class="block" id="method">${heading("评分规则")}<dl class="cells"><div><dt>AI 功能分</dt><dd>逐项判断实现情况，以实际运行和画面为证据。</dd></div><div><dt>用户体验分</dt><dd>只评价少量整体维度，各 1–5 分。</dd></div><div><dt>总分</dt><dd>按实验冻结的权重合成；缺少评分则待评，不补分。</dd></div></dl></section></div>`;
  for (const { experiment, version } of entries) loadReviews(experiment, version);
  if (params.get("section")) requestAnimationFrame(() => document.getElementById(params.get("section"))?.scrollIntoView());
}
function preview(experiment, result, viewport) {
  if (experiment.artifactType === "image") return `<div class="image-box"><img src="${e(result.url)}" alt="${e(label(result))}"></div>`;
  const size = VIEWPORTS[viewport];
  return `<div class="frame-box is-${viewport}" style="--vw:${size.width};--vh:${size.height}"><iframe data-src="${e(result.url)}" width="${size.width}" height="${size.height}" title="${e(label(result))}" sandbox="allow-scripts"></iframe></div>`;
}
function fitFrame(box) {
  const width = Number(box.style.getPropertyValue("--vw")), height = Number(box.style.getPropertyValue("--vh"));
  const scale = box.classList.contains("is-mobile") ? Math.min((box.clientWidth - 24) / width, (box.clientHeight - 32) / height, 1) : box.clientWidth / width;
  box.style.setProperty("--scale", Math.max(0.05, scale));
}
function observeFrames() {
  observer.disconnect();
  app.querySelectorAll(".frame-box").forEach((box) => {
    fitFrame(box); observer.observe(box);
    const frame = box.querySelector("iframe");
    frame.getBoundingClientRect();
    frame.src = frame.dataset.src;
  });
}
function scoreMarkup(score) {
  return `${readouts([["综合 / 100", number(score.total)], ["AI / 100", number(score.ai)], ["人工 / 100", number(score.human)], ["有效用户评价", score.count]])}
    <div class="dimension-scores">${score.dimensions.map((item) => `<div><span>${item.source === "ai" ? "AI" : "人工"} · ${e(item.name)} <small>${item.weight}%</small></span><b>${number(item.score)}${item.score !== null ? '<small> / 5</small>' : ""}</b></div>`).join("")}</div>`;
}
function feedMarkup(reviews) {
  if (!reviews?.length) return '<p class="muted">还没有用户评价。</p>';
  return reviews.map((review) => `<article class="user-review"><header><b>${e(review.reviewer)}</b><span>${e(VIEWPORTS[review.viewport]?.label)} · ${e(review.at.slice(0, 10))}</span></header>
    <p class="small">${Object.entries(review.scores).map(([id, value]) => `${e(current.version.evaluation.dimensions.find((item) => item.id === id)?.name)} ${value}/5`).join(" · ")}</p>
    ${review.comment ? `<p>${e(review.comment)}</p>` : ""}</article>`).join("");
}
function humanForm(context, result) {
  const dimensions = context.version.evaluation.dimensions.filter((item) => item.source === "human");
  return `<section class="review" id="user-rating">${heading("你的评价")}<form id="rating-form" data-key="${e(result.key)}">
    <div class="review-fields"><label class="field">公开昵称<input name="reviewer" maxlength="40" required autocomplete="nickname"></label><label class="field">观看视口<select name="viewport">${Object.entries(VIEWPORTS).map(([id, value]) => `<option value="${id}" ${context.options.viewport === id ? "selected" : ""}>${value.label}</option>`).join("")}</select></label></div>
    ${dimensions.map((item) => `<fieldset class="rating-field"><legend>${e(item.name)} <span class="muted small">${item.weight}%</span></legend><div class="rating-options">${[1, 2, 3, 4, 5].map((value) =>
      `<label><input type="radio" name="score:${e(item.id)}" value="${value}" required><span>${value}<small>${["很差", "较差", "一般", "好", "很好"][value - 1]}</small></span></label>`).join("")}</div></fieldset>`).join("")}
    <label class="field">评论（选填）<textarea name="comment" maxlength="1000" rows="2"></textarea></label>
    <p class="rating-policy">昵称、评分及评论会公开。同一浏览器再次提交更新原评价；参与标识不认证真实身份，清除 Cookie 或换设备可能重复计入。</p>
    <div class="actions review-nav"><button class="btn btn-primary" type="submit" disabled>提交评价 ${arrow}</button><button class="btn" type="button" data-action="retry-reviews">刷新评价</button></div>
    <p class="rating-service" role="status">正在连接评价服务…</p><p id="review-error" class="form-error" role="alert"></p>
    </form>${storageWarning ? '<p class="form-error">浏览器草稿保存不可用，请保持页面打开直到提交成功。</p>' : ""}</section>`;
}
function checkTable(checks) {
  return `<div class="box scroll"><table class="acceptance-table"><thead><tr><th>功能要求</th><th>判断依据</th><th>AI 完成度</th><th>评审证据</th></tr></thead><tbody>
    ${checks.map((item) => `<tr><th>${e(item.text)}</th><td>${e(item.how)}</td><td>${item.value === null ? "待评" : `${(item.value * 100).toFixed(0)}%`}${item.disputed ? '<p class="muted small">含不同 AI 判断</p>' : ""}</td><td>
      ${item.records.length ? item.records.map((record) => `<details class="evidence"><summary>${e(record.model)} · ${e(record.viewport)} · ${badge(record.status)}</summary><p>${e(record.evidence)}</p></details>`).join("") : '<span class="muted">尚无 AI 评分</span>'}</td></tr>`).join("")}</tbody></table></div>`;
}
function renderFocus(experiment, version, options) {
  const result = version.results.find((item) => item.key === options.model) ?? version.results[0];
  if (!result) return '<div class="empty"><strong>暂无产物</strong></div>';
  const score = scoreFor(experiment, version, result);
  return `<section class="bench bench-row"><aside class="bench-list"><div class="list-head"><h2>原始产物 <span class="count">${version.results.length}</span></h2><span>按名称排序</span></div><ul class="model-list">
    ${version.results.map((item, index) => `<li><a class="model-item" href="${hash(experiment, { ...options, model: item.key })}" aria-current="${item.key === result.key}"><span class="model-rank">${String(index + 1).padStart(2, "0")}</span><span class="model-name"><b>${e(label(item))}</b><span>${e(lab.vendors[item.vendor]?.label ?? item.vendor)}</span></span><span class="model-score" data-small-score="${e(item.key)}">${number(scoreFor(experiment, version, item).total)}</span></a></li>`).join("")}
    </ul></aside><div class="bench-main"><div class="stage"><div class="stage-bar"><b>${e(label(result))}</b><a href="${e(result.url)}" target="_blank" rel="noopener">打开原始文件</a></div>${preview(experiment, result, options.viewport)}</div>
    ${humanForm(current, result)}
    <section class="score">${heading("评分", weightLabel(version))}<div data-score="${e(result.key)}">${scoreMarkup(score)}</div>
      <p class="legend">总分只在 AI 各项已评分且有人评价时显示；不把待评视为零分。用户分为最新有效评价的均值。</p></section>
    <section class="review">${heading("用户评价", "最近 20 份；同一参与标识只计最新评价")}<div data-feed="${e(result.key)}">${feedMarkup(score.reviews)}</div></section>
    <details class="runlog"><summary><h2>AI 功能标准与证据</h2></summary>${checkTable(summarizeScore(version, result.key).checks)}</details>
    <details class="runlog"><summary><h2>原始运行记录</h2></summary><dl class="cells">${Object.entries(result.record).map(([name, value]) => `<div><dt class="mono">${e(name)}</dt><dd>${e(value)}</dd></div>`).join("")}<div><dt>SHA-256</dt><dd class="mono small">${e(result.sha256)}</dd></div></dl></details></div></section>`;
}
function renderComparison(experiment, version, options) {
  return `<section class="bench"><div class="compare-grid ${experiment.artifactType === "image" ? "is-image" : ""} is-${options.viewport}">
    ${version.results.map((result) => `<article class="compare-card"><header><b>${e(label(result))}</b><span class="compare-score" data-small-score="${e(result.key)}">${number(scoreFor(experiment, version, result).total)}</span></header>${preview(experiment, result, options.viewport)}
      <p class="compare-meta">${e(result.record.harness)} · 联网 ${e(result.record.web_access)} · ${e(result.record.turns)} 轮</p><footer><a href="${hash(experiment, { ...options, view: "rate", model: result.key })}">评价这份产物</a><a href="${e(result.url)}" target="_blank" rel="noopener">原始文件</a></footer></article>`).join("")}
    </div></section><section class="block">${heading("评分对照", weightLabel(version))}<div class="box scroll"><table class="matrix"><thead><tr><th>产物</th><th>AI / 100</th><th>人工 / 100</th><th>综合 / 100</th><th>用户评价数</th></tr></thead><tbody>
    ${version.results.map((result) => {
      const score = scoreFor(experiment, version, result);
      return `<tr data-score-row="${e(result.key)}"><th>${e(label(result))}</th><td>${number(score.ai)}</td><td>${number(score.human)}</td><td>${number(score.total)}</td><td>${score.count}</td></tr>`;
    }).join("")}</tbody></table></div></section>`;
}
function renderExperiment(experiment, params) {
  const version = experiment.versions.find((item) => item.version === Number(params.get("v"))) ?? latest(experiment);
  const options = { v: version.version, view: ["compare", "rate"].includes(params.get("view")) ? params.get("view") : "focus",
    viewport: params.get("viewport") === "mobile" ? "mobile" : "desktop", model: params.get("model") ?? undefined };
  current = { experiment, version, options };
  document.title = `${experiment.title} · LLM Capability Lab`;
  app.innerHTML = `<div class="page"><div class="crumb"><a href="#/">实验</a><span>/</span><span>${e(experiment.number)}</span></div>
    <header class="exp-head"><div class="exp-head-text"><p class="kicker">${e(experiment.capability)} / PROMPT v${version.version}</p><h1>${e(experiment.title)}</h1><p class="exp-head-question">${e(experiment.question)}</p></div>
    <label class="readout-select field">提示词版本<select id="version-select">${experiment.versions.map((item) => `<option value="${item.version}" ${item === version ? "selected" : ""}>v${item.version}${item.version === experiment.latestVersion ? " · 当前" : ""}</option>`).join("")}</select></label></header>
    <details class="prompt"><summary class="prompt-head"><h2>完整 Prompt · ${version.prompt.length.toLocaleString("zh-CN")} 字</h2></summary><pre class="prompt-source">${e(version.prompt)}</pre><div class="actions prompt-actions"><button class="btn" type="button" data-action="copy-prompt">复制原文</button><a class="btn" href="${e(version.promptPath)}" target="_blank" rel="noopener">版本文件</a></div></details>
    <section class="bench"><div class="toolbar"><nav class="seg" aria-label="产物视图">${[["focus", "单个查看"], ["compare", "并排对照"], ["rate", "提交评价"]].map(([view, text]) => `<a href="${hash(experiment, { ...options, view })}" aria-current="${options.view === view}">${text}</a>`).join("")}</nav>
    <div class="toolbar-group"><div class="seg" aria-label="预览视口">${Object.entries(VIEWPORTS).map(([viewport, size]) => `<a href="${hash(experiment, { ...options, viewport })}" aria-current="${viewport === options.viewport}">${size.label}</a>`).join("")}</div><button class="btn" type="button" data-action="reload">${replay}重新加载</button></div></div></section>
    ${options.view === "compare" ? renderComparison(experiment, version, options) : renderFocus(experiment, version, options)}
    <details class="runlog"><summary><h2>本实验评分标准</h2></summary><dl class="cells">${version.evaluation.dimensions.map((item) => `<div><dt>${item.source === "ai" ? "AI" : "人工"} · ${e(item.name)} · ${item.weight}%</dt><dd>${e(item.rubric)}</dd></div>`).join("")}</dl>
      <p class="muted small">冻结日期：${e(version.evaluation.freezeDate)}。生成条件见原始运行记录；只比较本版本，不合并跨实验总榜。</p>
      <a class="text-link" href="${e(version.evaluationPath)}" target="_blank" rel="noopener">完整评测原文</a></details></div>`;
  observeFrames();
  restoreForm();
  refreshScores();
  loadReviews(experiment, version);
  if (options.view === "rate") requestAnimationFrame(() => document.getElementById("user-rating")?.scrollIntoView());
}
function restoreForm() {
  const form = document.getElementById("rating-form");
  if (!form) return;
  const result = current.version.results.find((item) => item.key === form.dataset.key);
  const value = stored(draftKey(current, result)) ?? apiCache.get(scope(current.experiment, current.version))?.data?.own?.[result.key];
  form.elements.reviewer.value = value?.reviewer ?? stored("llm-lab-nickname") ?? "";
  if (!value) return;
  form.elements.viewport.value = value.viewport ?? current.options.viewport;
  form.elements.comment.value = value.comment ?? "";
  for (const dimension of current.version.evaluation.dimensions.filter((item) => item.source === "human")) {
    const score = value.scores?.[dimension.id];
    const input = form.querySelector(`input[name="score:${dimension.id}"][value="${score}"]`);
    if (input) input.checked = true;
  }
}
function refreshScores() {
  if (!current) return;
  const { experiment, version } = current, state = apiCache.get(scope(experiment, version));
  for (const result of version.results) {
    const score = scoreFor(experiment, version, result);
    app.querySelector(`[data-score="${CSS.escape(result.key)}"]`)?.replaceChildren();
    const scoreElement = app.querySelector(`[data-score="${CSS.escape(result.key)}"]`);
    if (scoreElement) scoreElement.innerHTML = scoreMarkup(score);
    const feed = app.querySelector(`[data-feed="${CSS.escape(result.key)}"]`);
    if (feed) feed.innerHTML = feedMarkup(score.reviews);
    for (const node of app.querySelectorAll(`[data-small-score="${CSS.escape(result.key)}"]`)) node.textContent = number(score.total);
    const row = app.querySelector(`[data-score-row="${CSS.escape(result.key)}"]`);
    if (row) [...row.querySelectorAll("td")].forEach((node, index) => { node.textContent = [number(score.ai), number(score.human), number(score.total), score.count][index]; });
  }
  const service = app.querySelector(".rating-service"), form = app.querySelector("#rating-form");
  if (service) service.textContent = state?.error ? `${state.error}；尚未提交。` : state?.data ? "评价服务已连接。" : "正在连接评价服务…";
  if (form) form.querySelector('button[type="submit"]').disabled = !state?.data?.token || Boolean(state?.submitting);
}
async function loadReviews(experiment, version, force = false) {
  const key = scope(experiment, version), previous = apiCache.get(key);
  if (previous?.loading || previous?.submitting) return;
  if (!force && previous?.data && Date.now() - previous.at < 15000) return;
  const state = previous ?? {};
  state.loading = true;
  apiCache.set(key, state);
  try {
    const { response, data } = await requestReviews(`/api/reviews?${new URLSearchParams({ experiment: experiment.id, version: version.version })}`, {
      cache: "no-store"
    });
    if (!response.ok || !data.available) throw new Error(data.error ?? "评价服务暂不可用");
    state.data = data; state.at = Date.now(); state.error = null;
  } catch (error) {
    state.error = error.name === "TimeoutError" ? "评价服务响应超时，请重试" : error.message;
    state.data = null;
  } finally { state.loading = false; }
  if (current && scope(current.experiment, current.version) === key) {
    if (!document.getElementById("rating-form")?.dataset.dirty) restoreForm();
    refreshScores();
  } else if (!current) {
    for (const result of version.results) {
      const score = scoreFor(experiment, version, result);
      const token = `${experiment.id}:${result.key}`;
      app.querySelector(`[data-home-score="${CSS.escape(token)}"]`)?.replaceChildren(document.createTextNode(number(score.total)));
      app.querySelector(`[data-home-count="${CSS.escape(token)}"]`)?.replaceChildren(document.createTextNode(`${score.count} 份评价`));
    }
  }
}
function formDraft(form, context) {
  const result = context.version.results.find((item) => item.key === form.dataset.key);
  const key = draftKey(context, result), previous = stored(key), values = new FormData(form);
  const value = { reviewer: String(values.get("reviewer")).trim(),
    viewport: values.get("viewport"), comment: String(values.get("comment") ?? ""),
    scores: Object.fromEntries(context.version.evaluation.dimensions.filter((item) => item.source === "human")
      .flatMap((item) => values.has(`score:${item.id}`) ? [[item.id, Number(values.get(`score:${item.id}`))]] : [])) };
  const previousValues = previous ? Object.fromEntries(Object.entries(previous).filter(([name]) => name !== "id")) : null;
  value.id = JSON.stringify(previousValues) === JSON.stringify(value) ? previous.id : crypto.randomUUID();
  store(key, value); store("llm-lab-nickname", value.reviewer);
  return { key, value, result };
}
app.addEventListener("input", (event) => {
  const form = event.target.closest("#rating-form");
  if (form && current) { form.dataset.dirty = "true"; formDraft(form, current); }
});
app.addEventListener("submit", async (event) => {
  if (event.target.id !== "rating-form" || !current) return;
  event.preventDefault();
  const form = event.target, context = current, pageGeneration = generation;
  if (form.dataset.submitting === "true") return;
  const state = apiCache.get(scope(context.experiment, context.version)), { key, value, result } = formDraft(form, context);
  if (state?.submitting) return;
  const errorElement = document.getElementById("review-error");
  if (!state?.data?.token) { errorElement.textContent = "评价服务尚未连接，请刷新评价后重试。"; return; }
  state.submitting = true; form.dataset.submitting = "true"; errorElement.textContent = ""; refreshScores();
  try {
    const { response, data } = await requestReviews("/api/reviews", { method: "POST",
      headers: { "Content-Type": "application/json", "X-Review-Token": state.data.token },
      body: JSON.stringify({ ...value, experiment: context.experiment.id, version: context.version.version, key: result.key,
        sha256: result.sha256, fingerprint: context.version.evaluation.fingerprint })
    }, 15000);
    if (!response.ok || !data.submitted) throw new Error(data.error ?? "提交失败");
    state.data = data; state.at = Date.now(); state.error = null;
    const unchanged = stored(key)?.id === value.id;
    if (unchanged) store(key, null);
    if (generation === pageGeneration) {
      if (unchanged) delete form.dataset.dirty;
      refreshScores(); errorElement.textContent = "";
      form.querySelector(".rating-service").textContent = unchanged ? "评价已提交并保存，已更新汇总。" : "评价已提交；新修改的草稿仍待提交。";
    }
    announce("评价已提交并保存。");
  } catch (error) {
    if (generation === pageGeneration) errorElement.textContent = `${error.name === "TimeoutError" ? "请求超时，请重试" : error.message}。草稿已保留。`;
  } finally {
    state.submitting = false; form.dataset.submitting = "false";
    if (current && scope(current.experiment, current.version) === scope(context.experiment, context.version)) {
      const activeForm = document.getElementById("rating-form");
      if (activeForm) activeForm.querySelector('button[type="submit"]').disabled = !state?.data?.token;
    }
  }
});
app.addEventListener("change", (event) => {
  if (event.target.id === "version-select") location.hash = hash(current.experiment, { v: event.target.value, view: current.options.view });
});
app.addEventListener("click", async (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "reload") {
    app.querySelectorAll(".frame-box iframe,.image-box img").forEach((element) => { element.src = element.getAttribute("src"); });
    announce("产物已重新加载。");
  }
  if (action === "retry-reviews" && current) await loadReviews(current.experiment, current.version, true);
  if (action === "copy-prompt" && current) {
    try { await navigator.clipboard.writeText(current.version.prompt); announce("已复制 Prompt 原文。"); }
    catch { announce("剪贴板不可用，请从完整 Prompt 中选择原文。"); }
  }
});
function render() {
  generation++; observer.disconnect();
  const { path, params } = route();
  current = null;
  const experiment = lab.experiments.find((item) => item.id === path);
  experiment ? renderExperiment(experiment, params) : renderHome(params);
  document.querySelectorAll("[data-nav]").forEach((element) => {
    if (!experiment && element.dataset.nav === (params.get("section") ?? "home")) element.setAttribute("aria-current", "page");
    else element.removeAttribute("aria-current");
  });
}
window.addEventListener("hashchange", render);
try {
  const response = await fetch("data/lab.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  lab = await response.json(); render();
} catch (error) {
  app.innerHTML = `<div class="empty"><strong>无法加载实验数据</strong><p>${e(error.message)}</p></div>`;
}
