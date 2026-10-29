const VIEWPORTS = { desktop: { label: "桌面", width: 1440, height: 900 }, mobile: { label: "手机", width: 390, height: 844 } };
const KINDS = { objective: "确定性", taste: "品味" };
const JUDGES = { script: "脚本判定", ai: "AI 判定" };
const PROTOCOL = 6;
const STATUS_LABELS = { pass: "做到", partial: "部分做到", fail: "未做到", scored: "已评分", pending: "待评" };
const app = document.querySelector("#app"), live = document.querySelector("#live");
const e = (value) => String(value ?? "").replace(/[&<>"']/g, (char) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[char]);
const label = (result) => result.label + (result.run ? ` · ${result.run}` : "");
const number = (value) => Number.isFinite(value) ? value.toFixed(1) : "待评";
const badge = (status) => `<span class="status status-${e(status)}">${e(STATUS_LABELS[status] ?? status)}</span>`;
const arrow = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const replay = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/></svg>';
const heading = (title, note = "") => `<div class="section-head"><h2>${e(title)}</h2>${note ? `<p>${e(note)}</p>` : ""}</div>`;
const readouts = (items) => `<div class="readouts">${items.map(([name, value, id]) => `<div class="readout"${id ? ` data-metric="${e(id)}"` : ""}><span class="readout-label">${e(name)}</span><span class="readout-value">${e(value)}</span></div>`).join("")}</div>`;
const latest = (experiment) => experiment.versions.find((version) => version.version === experiment.latestVersion);
const dimensionsFor = (version) => (version.evaluation?.dimensions ?? []).filter((item) => Object.hasOwn(KINDS, item.kind));
let lab, current;
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
function scoreFor(version, result) {
  // Only generated current-protocol scores are authoritative; older data stays unscored.
  if (version.evaluation?.protocol === PROTOCOL && result.score) return result.score;
  const dimensions = dimensionsFor(version);
  return { total: null, objective: null, taste: null, count: 0, aiJudges: 0, auto: null,
    dimensions: dimensions.map((item) => ({ ...item, score: null })),
    checks: (version.evaluation?.criteria ?? []).flatMap((item) => {
      const dimension = dimensions.find((dimension) => dimension.id === item.dimension);
      return dimension ? [{ ...item, kind: dimension.kind, score: null, value: null, records: [], disputed: false }] : [];
    }), judges: [], excluded: [], spread: null };
}
function weightLabel(version) {
  if (!dimensionsFor(version).length) return "评分标准待更新";
  return Object.entries(KINDS).map(([kind, name]) =>
    `${name} ${dimensionsFor(version).filter((item) => item.kind === kind).reduce((sum, item) => sum + item.weight, 0)}%`).join(" + ");
}
function renderHome(params) {
  const entries = lab.experiments.map((experiment) => ({ experiment, version: latest(experiment) }));
  const results = entries.flatMap(({ version }) => version.results);
  document.title = "LLM Capability Lab · 大模型能力实验台";
  app.innerHTML = `<div class="page"><section class="intro"><div class="intro-text"><p class="kicker">实验台 / 索引</p><h1>同一份提示词，独立生成。<br>Agent 评分，证据公开。</h1></div>
    ${readouts([["实验", entries.length], ["模型", new Set(results.map((item) => item.model)).size], ["原始产物", results.length]])}</section>
    <section class="block">${heading("实验")}<div class="box scroll"><div class="exp-table"><div class="exp-row exp-row-head"><span>编号</span><span>实验</span><span>提示词</span><span>产物</span><span>评分权重</span><span>评分维度</span><span></span></div>
    ${entries.map(({ experiment, version }) => `<a class="exp-row" href="${hash(experiment)}"><span class="exp-no">${e(experiment.number)}</span><span class="exp-main"><span class="chip">${e(experiment.capability)}</span><span class="exp-title">${e(experiment.title)}</span><span class="exp-question">${e(experiment.question)}</span></span>
      <span class="exp-prompt">v${version.version}<span class="muted">${version.prompt.length.toLocaleString("zh-CN")} 字</span></span>
      <span class="sheet">${version.results.map((result) => `<span class="sheet-item">${result.thumb || experiment.artifactType === "image" ? `<img src="${e(result.thumb ?? result.url)}" alt="" loading="lazy">` : ""}</span>`).join("")}<span class="sheet-count">${version.results.length} 份</span></span>
      <span class="progress-text">${weightLabel(version)}</span><span class="mono">${dimensionsFor(version).length} 项</span><span class="exp-arrow">${arrow}</span></a>`).join("")}
    </div></div></section>
    <section class="block" id="matrix">${heading("模型 × 实验")}<div class="box scroll"><table class="matrix"><thead><tr><th>模型</th>${entries.map(({ experiment }) => `<th>${e(experiment.title)}</th>`).join("")}</tr></thead><tbody>
    ${[...new Set(results.map((item) => item.model))].sort().map((model) => `<tr><th>${e(results.find((item) => item.model === model).label)}</th>${entries.map(({ experiment, version }) => `<td>${version.results.filter((item) => item.model === model).map((result) => {
      const score = scoreFor(version, result);
      return `<a class="cell" href="${hash(experiment, { model: result.key })}"><span data-home-score="${e(experiment.id)}:${e(result.key)}">${number(score.total)}</span><span class="cell-note" data-home-count="${e(experiment.id)}:${e(result.key)}">${score.count} 位 Agent</span></a>`;
    }).join("") || "—"}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>
    <section class="block" id="method">${heading("评分规则")}<dl class="cells"><div><dt>确定性分</dt><dd>能自动量的（能否运行、时长、读数）由脚本跑一次真实浏览器直接判；画面要求由 AI 看时间轴拼图打勾。做到 / 部分做到 / 未做到为 5 / 2.5 / 0 分。</dd></div>
      <div><dt>品味分</dt><dd>AI 看拼图和关键画面，按冻结锚点给出 0–5 分，步进 0.5。品味是 AI 判断，不是人类共识。</dd></div>
      <div><dt>综合分</dt><dd>脚本结果加每位 AI 的完整评审，按本实验冻结权重合成，再等权平均各 AI 总分。缺项不补分；无完整评审时待评。</dd></div>
      <div><dt>比较范围</dt><dd>只比较同一实验、同一 Prompt 版本。保留评审模型、批次、分差与真实浏览器证据，不合并跨实验总榜。</dd></div></dl></section></div>`;
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
  return `${readouts([["综合 / 100", number(score.total), "total"], ["确定性 / 100", number(score.objective), "objective"],
    ["品味 / 100", number(score.taste), "taste"], ["完整 Agent 数", score.count, "count"], ["Agent 分差", number(score.spread?.range), "spread"]])}
    <div class="dimension-scores">${score.dimensions.map((item) => `<div data-dimension="${e(item.id)}"><span>${e(KINDS[item.kind])} · ${e(item.name)} <small>${item.weight}%</small></span><b>${number(item.score)}${Number.isFinite(item.score) ? '<small> / 5</small>' : ""}</b></div>`).join("")}</div>
    ${score.spread ? `<p class="legend">完整 Agent 综合分范围：${number(score.spread.min)} 至 ${number(score.spread.max)} / 100。</p>` : ""}`;
}
function judgesMarkup(score) {
  if (!score.judges.length) return '<p class="muted agent-empty">尚无完整 Agent 评审，综合分待评。</p>';
  return `<div class="box scroll"><table class="judge-table"><thead><tr><th>Agent / 批次</th><th>综合 / 100</th><th>确定性 / 100</th><th>品味 / 100</th>${score.dimensions.map((item) => `<th>${e(item.name)} / 5</th>`).join("")}</tr></thead><tbody>
    ${score.judges.map((judge) => `<tr data-judge="${e(judge.session)}"><th><b>${e(judge.reviewer)}</b><span>${e(judge.model)}</span><span>${e(judge.at)}</span><span class="mono small">${e(judge.session)}</span></th>
      <td data-judge-total>${number(judge.total)}</td><td>${number(judge.objective)}</td><td>${number(judge.taste)}</td>
      ${score.dimensions.map((item) => `<td>${number(judge.dimensions.find((dimension) => dimension.id === item.id)?.score)}</td>`).join("")}</tr>`).join("")}
    </tbody></table></div>`;
}
function pendingLabel(pending) {
  if (Number.isInteger(pending)) return `${pending} 项待评`;
  if (!Array.isArray(pending)) return typeof pending === "string" ? pending : "含待评项";
  return pending.map((item) => typeof item === "string" ? item :
    `${item.id ?? item.dimension ?? "待评项"}${item.viewport ? ` · ${VIEWPORTS[item.viewport]?.label ?? item.viewport}` : ""}`).join("；");
}
function excludedMarkup(score) {
  if (!score.excluded.length) return "";
  return `<details class="runlog excluded-reviews"><summary><h2>未完整评审 · ${score.excluded.length} 批</h2><span class="muted">不计入汇总</span></summary><ul class="excluded-list">
    ${score.excluded.map((item) => `<li data-excluded="${e(item.session)}"><b>${e(item.reviewer)} · ${e(item.model)}</b><p class="muted small">${e(item.at)} · ${e(item.session)}</p><p>${e(pendingLabel(item.pending))}</p></li>`).join("")}</ul></details>`;
}
function mediaMarkup(auto) {
  return `<div class="evidence-media">${(auto?.files ?? []).map((file) =>
    /^assets\/evidence\/[a-zA-Z0-9/_-]+\.(png|jpg)$/.test(file.path) ?
      `<a href="${e(file.path)}" target="_blank" rel="noopener" data-media-ref="${e(auto.id)}">${e(VIEWPORTS[file.viewport]?.label ?? file.viewport)} · ${e(file.label ?? file.kind)}</a>` : "").join("")}</div>`;
}
function checkTable(version, result, score) {
  if (!score.checks.length) return '<p class="muted agent-empty">尚无当前协议的逐项标准。</p>';
  return `<div class="box scroll"><table class="acceptance-table"><thead><tr><th>评分规则</th><th>判断依据</th><th>得分 / 5</th><th>判定记录</th></tr></thead><tbody>
    ${score.checks.map((item) => `<tr data-check="${e(item.id)}"><th>${e(item.text)}<span class="muted small">${e(JUDGES[item.by])} · ${e(KINDS[item.kind])} · ${e(score.dimensions.find((dimension) => dimension.id === item.dimension)?.name)}</span><span class="mono small muted">${e(item.id)}</span></th>
      <td>${e(item.how)}</td><td data-check-score>${number(item.score)}${item.disputed ? '<p class="muted small">存在不同判断</p>' : ""}</td><td>
      ${item.records.length ? item.records.map((record) => `<details class="evidence" data-counted="${record.counted === true}"><summary>${e(record.reviewer)} · ${e(record.model)} · ${badge(record.status)} · ${number(record.score)} / 5<span class="record-counted">${record.counted ? "计入汇总" : "未计入汇总"}</span></summary>
        <p class="small muted">${e(record.at)} · 批次 ${e(record.session)}</p><p class="evidence-text">${e(record.note || "通过，无需说明。")}</p></details>`).join("") : '<span class="muted">尚无判定。</span>'}</td></tr>`).join("")}</tbody></table></div>`;
}
function browserEvidenceMarkup(version, result, score) {
  return `<details class="runlog browser-evidence"><summary><h2>自动检查截图${score.auto ? ` · ${score.auto.files.length} 张` : ""}</h2></summary>
    ${score.auto ? `<p class="muted small">采集 ${e(score.auto.at)} · ${e(score.auto.id)}。截图是一次真实运行的采样时刻，不证明每一帧。</p>${mediaMarkup(score.auto)}` : '<p class="muted small">尚未运行自动检查。</p>'}</details>`;
}
function renderFocus(experiment, version, options) {
  const result = version.results.find((item) => item.key === options.model) ?? version.results[0];
  if (!result) return '<div class="empty"><strong>暂无产物</strong></div>';
  const score = scoreFor(version, result);
  return `<section class="bench bench-row"><aside class="bench-list"><div class="list-head"><h2>原始产物 <span class="count">${version.results.length}</span></h2><span>按名称排序</span></div><ul class="model-list">
    ${version.results.map((item, index) => `<li><a class="model-item" href="${hash(experiment, { ...options, model: item.key })}" aria-current="${item.key === result.key}"><span class="model-rank">${String(index + 1).padStart(2, "0")}</span><span class="model-name"><b>${e(label(item))}</b><span>${e(lab.vendors[item.vendor]?.label ?? item.vendor)}</span></span><span class="model-score" data-small-score="${e(item.key)}">${number(scoreFor(version, item).total)}</span></a></li>`).join("")}
    </ul></aside><div class="bench-main"><div class="stage"><div class="stage-bar"><b>${e(label(result))}</b><a href="${e(result.url)}" target="_blank" rel="noopener">打开原始文件</a></div>${preview(experiment, result, options.viewport)}</div>
    <section class="score">${heading("Agent 评分", weightLabel(version))}<div data-score="${e(result.key)}">${scoreMarkup(score)}</div>
      <p class="legend">品味是 AI 判断，不是人类共识。仅最新完整评审计入汇总，每位 Agent 等权；未完整评审不补分，无完整评审时待评。</p></section>
    ${version.evaluation?.conclusion?.length ? `<details class="runlog evaluation-conclusion"><summary><h2>本实验评测结论</h2></summary><pre class="prompt-source">${e(version.evaluation.conclusion.join("\n\n"))}</pre></details>` : ""}
    <section class="agent-scores">${heading("各 Agent 得分", "每位 Agent 按冻结维度权重计算")}<div data-judges="${e(result.key)}">${judgesMarkup(score)}</div>${excludedMarkup(score)}</section>
    <section class="rules">${heading("逐项规则与判定", "脚本项取桌面与手机较差的一次；AI 项看拼图判断")}${checkTable(version, result, score)}</section>
    ${browserEvidenceMarkup(version, result, score)}
    <details class="runlog"><summary><h2>原始运行记录</h2></summary><dl class="cells">${Object.entries(result.record).map(([name, value]) => `<div><dt class="mono">${e(name)}</dt><dd>${e(value)}</dd></div>`).join("")}<div><dt>SHA-256</dt><dd class="mono small">${e(result.sha256)}</dd></div></dl></details></div></section>`;
}
function renderComparison(experiment, version, options) {
  return `<section class="bench"><div class="compare-grid ${experiment.artifactType === "image" ? "is-image" : ""} is-${options.viewport}">
    ${version.results.map((result) => {
      const score = scoreFor(version, result);
      return `<article class="compare-card"><header><b>${e(label(result))}</b><span class="compare-score" data-small-score="${e(result.key)}">${number(score.total)}</span></header>${preview(experiment, result, options.viewport)}
      <p class="compare-meta">${score.count} 位 Agent · ${e(result.record.harness)} · 联网 ${e(result.record.web_access)} · ${e(result.record.turns)} 轮</p><footer><a href="${hash(experiment, { ...options, view: "focus", model: result.key })}">评分与证据</a><a href="${e(result.url)}" target="_blank" rel="noopener">原始文件</a></footer></article>`;
    }).join("")}
    </div></section><section class="block">${heading("Agent 评分对照", weightLabel(version))}<div class="box scroll"><table class="matrix comparison-table"><thead><tr><th>产物</th><th>综合 / 100</th><th>确定性 / 100</th><th>品味 / 100</th><th>完整 Agent 数</th><th>Agent 分差</th></tr></thead><tbody>
    ${version.results.map((result) => {
      const score = scoreFor(version, result);
      return `<tr data-score-row="${e(result.key)}"><th><a href="${hash(experiment, { ...options, view: "focus", model: result.key })}">${e(label(result))}</a></th><td>${number(score.total)}</td><td>${number(score.objective)}</td><td>${number(score.taste)}</td><td>${score.count}</td><td>${number(score.spread?.range)}</td></tr>`;
    }).join("")}</tbody></table></div><p class="legend">品味是 AI 判断，不是人类共识。分差为本产物完整 Agent 综合分的最高值减最低值。</p></section>`;
}
function renderExperiment(experiment, params) {
  const version = experiment.versions.find((item) => item.version === Number(params.get("v"))) ?? latest(experiment);
  const options = { v: version.version, view: params.get("view") === "compare" ? "compare" : "focus",
    viewport: params.get("viewport") === "mobile" ? "mobile" : "desktop", model: params.get("model") ?? undefined };
  current = { experiment, version, options };
  document.title = `${experiment.title} · LLM Capability Lab`;
  app.innerHTML = `<div class="page"><div class="crumb"><a href="#/">实验</a><span>/</span><span>${e(experiment.number)}</span></div>
    <header class="exp-head"><div class="exp-head-text"><p class="kicker">${e(experiment.capability)} / PROMPT v${version.version}</p><h1>${e(experiment.title)}</h1><p class="exp-head-question">${e(experiment.question)}</p></div>
    <label class="readout-select field">提示词版本<select id="version-select">${experiment.versions.map((item) => `<option value="${item.version}" ${item === version ? "selected" : ""}>v${item.version}${item.version === experiment.latestVersion ? " · 当前" : ""}</option>`).join("")}</select></label></header>
    <details class="prompt"><summary class="prompt-head"><h2>完整 Prompt · ${version.prompt.length.toLocaleString("zh-CN")} 字</h2></summary><pre class="prompt-source">${e(version.prompt)}</pre><div class="actions prompt-actions"><button class="btn" type="button" data-action="copy-prompt">复制原文</button><a class="btn" href="${e(version.promptPath)}" target="_blank" rel="noopener">版本文件</a></div></details>
    <section class="bench"><div class="toolbar"><nav class="seg" aria-label="产物视图">${[["focus", "单个查看"], ["compare", "并排对照"]].map(([view, text]) => `<a href="${hash(experiment, { ...options, view })}" aria-current="${options.view === view}">${text}</a>`).join("")}</nav>
    <div class="toolbar-group"><div class="seg" aria-label="预览视口">${Object.entries(VIEWPORTS).map(([viewport, size]) => `<a href="${hash(experiment, { ...options, viewport })}" aria-current="${viewport === options.viewport}">${size.label}</a>`).join("")}</div><button class="btn" type="button" data-action="reload">${replay}重新加载</button></div></div></section>
    ${options.view === "compare" ? renderComparison(experiment, version, options) : renderFocus(experiment, version, options)}
    <details class="runlog standards"><summary><h2>本实验评分标准</h2></summary><dl class="cells">${dimensionsFor(version).map((item) => `<div><dt>${e(KINDS[item.kind])} · ${e(item.name)} · ${item.weight}%</dt><dd>${e(item.rubric)}</dd></div>`).join("")}</dl>
      <p class="muted small">协议：${e(version.evaluation?.protocol ?? "待定")}。冻结日期：${e(version.evaluation?.freezeDate ?? "未冻结")}。生成条件见原始运行记录；只比较本版本，不合并跨实验总榜。</p>
      ${version.evaluationPath ? `<a class="text-link" href="${e(version.evaluationPath)}" target="_blank" rel="noopener">完整评测原文</a>` : ""}</details></div>`;
  observeFrames();
}
app.addEventListener("change", (event) => {
  if (event.target.id === "version-select") location.hash = hash(current.experiment, { ...current.options, v: event.target.value });
});
app.addEventListener("click", async (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "reload") {
    app.querySelectorAll(".frame-box iframe,.image-box img").forEach((element) => { element.src = element.getAttribute("src"); });
    announce("产物已重新加载。");
  }
  if (action === "copy-prompt" && current) {
    try { await navigator.clipboard.writeText(current.version.prompt); announce("已复制 Prompt 原文。"); }
    catch { announce("剪贴板不可用，请从完整 Prompt 中选择原文。"); }
  }
});
function render() {
  observer.disconnect();
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
