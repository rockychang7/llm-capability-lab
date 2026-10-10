import { STATUS_LABELS, createSession, assessmentComplete, sessionComplete, sessionMatches, comparisonSummary, validDraft } from "./review.js";

const VIEWPORTS = {
  desktop: { label: "桌面", width: 1440, height: 900 },
  mobile: { label: "手机", width: 390, height: 844 }
};
const app = document.querySelector("#app");
const live = document.querySelector("#live");
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[char]);
const e = escapeHtml;
const label = (result) => result.label + (result.run ? ` · ${result.run}` : "");
const badge = (status = "pending") => `<span class="status status-${status}">${STATUS_LABELS[status]}</span>`;
const arrow = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const replay = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/></svg>';
let lab;
let current;
let draft;
let memory = new Map();
let storageWarning = false;
const observer = new ResizeObserver((entries) => entries.forEach(({ target }) => fitFrame(target)));

function route() {
  const [path, query = ""] = location.hash.replace(/^#\/?/, "").split("?");
  return { path: decodeURIComponent(path), params: new URLSearchParams(query) };
}
function hash(experiment, options = {}) {
  const params = new URLSearchParams(Object.entries(options).filter(([, value]) => value !== undefined && value !== null));
  return `#/${experiment.id}${params.size ? `?${params}` : ""}`;
}
const latest = (experiment) => experiment.versions.find((version) => version.version === experiment.latestVersion);
const heading = (title, note = "") => `<div class="section-head"><h2>${e(title)}</h2>${note ? `<p>${e(note)}</p>` : ""}</div>`;
const readouts = (items) => `<div class="readouts">${items.map(([name, value]) => `<div class="readout"><span class="readout-label">${e(name)}</span><span class="readout-value">${e(value)}</span></div>`).join("")}</div>`;
function announce(text) { live.textContent = text; }

function renderHome(params) {
  const entries = lab.experiments.map((experiment) => ({ experiment, version: latest(experiment) }));
  const results = entries.flatMap(({ version }) => version.results);
  document.title = "LLM Capability Lab · 大模型能力实验台";
  app.innerHTML = `<div class="page">
    <section class="intro"><div class="intro-text"><p class="kicker">实验台 / 索引</p><h1>同一份提示词，独立生成。<br>原始产物，可复查的结论。</h1></div>
      ${readouts([["实验", entries.length], ["模型", new Set(results.map((item) => item.model)).size], ["产物", results.length], ["核心通过", results.filter((item) => item.acceptance?.status === "pass").length], ["待确认", results.filter((item) => !item.acceptance || item.acceptance.status === "pending").length]])}
    </section>
    <section class="block">${heading("实验", "自动检查与人工验收分开记录；不再用 AI 总分排列名次。")}
      <div class="box scroll"><div class="exp-table"><div class="exp-row exp-row-head"><span>编号</span><span>实验</span><span>提示词</span><span>产物</span><span>核心验收</span><span>人工记录</span><span></span></div>
      ${entries.map(({ experiment, version }) => `<a class="exp-row" href="${hash(experiment)}">
        <span class="exp-no">${e(experiment.number)}</span><span class="exp-main"><span class="chip">${e(experiment.capability)}</span><span class="exp-title">${e(experiment.title)}</span><span class="exp-question">${e(experiment.question)}</span></span>
        <span class="exp-prompt"><span class="exp-version">v${version.version}</span><span class="muted">${version.prompt.length.toLocaleString("zh-CN")} 字</span></span>
        <span class="sheet">${version.results.map((result) => `<span class="sheet-item ${experiment.artifactType === "image" ? "is-image" : ""}">${result.thumb || experiment.artifactType === "image" ? `<img src="${e(result.thumb ?? result.url)}" alt="" loading="lazy">` : ""}</span>`).join("")}<span class="sheet-count">${version.results.length} 份</span></span>
        <span class="progress-text">${version.stats.passed} 通过 · ${version.stats.failed} 未通过<br>${version.stats.partial} 部分 · ${version.stats.pending} 待确认</span>
        <span class="mono">${version.evaluation?.sessions?.length ?? 0} 份</span><span class="exp-arrow">${arrow}</span>
      </a>`).join("")}</div></div>
    </section>
    <section class="block" id="matrix">${heading("模型 × 实验", "每次运行单独呈现；状态不是分数，也不合并跨实验排名。")}
      <div class="box scroll"><table class="matrix"><thead><tr><th>模型</th>${entries.map(({ experiment }) => `<th><a href="${hash(experiment)}">${e(experiment.title)}</a></th>`).join("")}</tr></thead><tbody>
      ${[...new Set(results.map((item) => item.model))].sort().map((model) => `<tr><th>${e(results.find((item) => item.model === model).label)}</th>${entries.map(({ experiment, version }) => `<td>${version.results.filter((item) => item.model === model).map((result) => `<a class="cell acceptance-cell" href="${hash(experiment, { model: result.key })}">${badge(result.acceptance?.status)}<span class="cell-note">${e(result.run ?? "")}</span></a>`).join("") || "—"}</td>`).join("")}</tr>`).join("")}
      </tbody></table></div>
    </section>
    <section class="block" id="method">${heading("评测协议 2")}
      <div class="method-grid">
        <div class="card"><p class="card-tag">01 / 可测量的事实</p><h3>脚本验收</h3><p>固定环境、真实运行、重复检查。记录原始产物指纹、检查版本和证据；不会用“能运行”代替“画得对”。</p></div>
        <div class="card"><p class="card-tag">02 / 核心与细节分开</p><h3>人工逐项确认</h3><p>核心要求决定是否通过，细节单独呈现。没观察到的保留待确认；复核者意见冲突时不强行取平均。</p></div>
        <div class="card"><p class="card-tag">03 / 不制造精确分数</p><h3>匿名成对比较</h3><p>随机顺序、隐藏标签、允许持平或无法判断。只汇总核心通过样本的比较，显示票数和观察依据，不给总体排名。</p></div>
      </div>
    </section></div>`;
  if (params.get("section")) requestAnimationFrame(() => document.getElementById(params.get("section"))?.scrollIntoView());
}

function preview(experiment, result, viewport, title) {
  if (experiment.artifactType === "image") return `<div class="image-box"><img src="${e(result.url)}" alt="${e(title)}"></div>`;
  const size = VIEWPORTS[viewport];
  // Scripts can run, but original artifacts cannot inspect the review UI or storage.
  return `<div class="frame-box is-${viewport}" style="--vw:${size.width};--vh:${size.height}"><iframe data-src="${e(result.url)}" width="${size.width}" height="${size.height}" title="${e(title)}" sandbox="allow-scripts" loading="eager"></iframe></div>`;
}
function fitFrame(box) {
  const width = Number(box.style.getPropertyValue("--vw"));
  const height = Number(box.style.getPropertyValue("--vh"));
  const mobile = box.classList.contains("is-mobile");
  const scale = mobile ? Math.min((box.clientWidth - 24) / width, (box.clientHeight - 32) / height, 1) : box.clientWidth / width;
  box.style.setProperty("--scale", Math.max(0.05, scale));
}
function observeFrames() {
  observer.disconnect();
  app.querySelectorAll(".frame-box").forEach((box) => {
    fitFrame(box);
    observer.observe(box);
    const frame = box.querySelector("iframe");
    // Establish the embedded viewport before original scripts read innerWidth.
    frame.getBoundingClientRect();
    frame.src = frame.dataset.src;
  });
}
function reloadPreviews() {
  app.querySelectorAll(".frame-box iframe,.image-box img").forEach((element) => { element.src = element.getAttribute("src"); });
  announce("产物已重新加载；HTML 回到待命状态。");
}
function protocolInfo(version) {
  return `<details class="runlog"><summary><h2>评测信息与结论</h2></summary><dl class="cells">
    ${[["协议", version.evaluation?.protocol ?? "未制定"], ["评测日期", version.evaluation?.date ?? "未评测"], ["评测者", version.evaluation?.evaluator], ["方法", version.evaluation?.method], ["环境", version.evaluation?.environment]].map(([name, value]) => `<div><dt>${e(name)}</dt><dd>${e(value ?? "unknown")}</dd></div>`).join("")}
    </dl>${(version.evaluation?.conclusion ?? []).map((text) => `<p>${e(text)}</p>`).join("")}
    ${version.evaluationPath ? `<a class="text-link" href="${e(version.evaluationPath)}" target="_blank" rel="noopener">完整评测原文</a>` : ""}</details>`;
}
function evidenceText(text) {
  try { return JSON.stringify(JSON.parse(text), null, 2); } catch { return text; }
}
function checkTable(checks) {
  return `<div class="scroll box"><table class="acceptance-table"><thead><tr><th>要求</th><th>检查方式</th><th>结论</th><th>证据</th></tr></thead><tbody>
    ${checks.map((item) => `<tr><th>${e(item.text)}<span class="muted small">${e(item.id)}</span></th><td><span class="small">${item.method === "auto" ? "脚本" : "人工"}</span><p>${e(item.how)}</p></td><td>${badge(item.status)}${item.disputed ? '<p class="is-pending small">复核意见冲突</p>' : ""}</td><td>${item.evidence.length ? item.evidence.map((record) => `<details class="evidence"><summary>${e(record.reviewer)} · ${e(record.at.slice(0, 10))} · ${STATUS_LABELS[record.status]}</summary><pre>${e(evidenceText(record.evidence))}</pre></details>`).join("") : '<span class="muted">尚无观察记录</span>'}</td></tr>`).join("")}
    </tbody></table></div>`;
}
function historyPanel(version, result) {
  if (!result.legacyScore) return "";
  const meta = version.evaluation?.legacy ?? version.evaluation;
  return `<details class="runlog history-record"><summary><h2>历史 AI 评分</h2><span class="muted">不参与当前验收与比较</span></summary>
    <p class="muted">原记录保留，不代表已通过新协议。评测者：${e(meta?.evaluator)}；日期：${e(meta?.date)}。</p>
    <dl class="cells"><div><dt>历史总分</dt><dd>${e(result.legacyScore.total)}</dd></div>${(result.legacyScore.dimensions ?? []).map((dimension) => `<div><dt>${e(dimension.name)}</dt><dd>${e(dimension.value)} / ${e(dimension.max)}</dd></div>`).join("")}</dl>
    ${["strengths", "weaknesses"].map((key) => `<h3>${key === "strengths" ? "历史优点" : "历史不足"}</h3><ul>${(result.legacyReview?.[key] ?? []).map((text) => `<li>${e(text)}</li>`).join("")}</ul>`).join("")}
    ${meta?.conclusion?.map((text) => `<p>${e(text)}</p>`).join("") ?? ""}
    </details>`;
}
function runPanel(result) {
  return `<details class="runlog"><summary><h2>原始运行记录</h2></summary><dl class="cells">${Object.entries(result.record).map(([name, value]) => `<div><dt class="mono">${e(name)}</dt><dd>${e(value)}</dd></div>`).join("")}<div><dt>SHA-256</dt><dd class="mono small">${e(result.sha256)}</dd></div></dl></details>`;
}
function renderFocus(experiment, version, options) {
  const result = version.results.find((item) => item.key === options.model) ?? version.results[0];
  if (!result) return '<div class="empty"><strong>暂无产物</strong></div>';
  const coreChecks = result.acceptance?.checks.filter((item) => item.tier === "core") ?? [];
  return `<section class="bench bench-row"><aside class="bench-list"><div class="list-head"><h2>原始产物 <span class="count">${version.results.length}</span></h2><span>按名称排序</span></div><ul class="model-list">
    ${version.results.map((item, index) => `<li><a class="model-item" href="${hash(experiment, { ...options, model: item.key })}" aria-current="${item.key === result.key}"><span class="model-rank">${String(index + 1).padStart(2, "0")}</span><span class="model-name"><b>${e(label(item))}</b><span>${e(lab.vendors[item.vendor]?.label ?? item.vendor)}</span></span>${badge(item.acceptance?.status)}</a></li>`).join("")}
    </ul></aside><div class="bench-main"><div class="stage"><div class="stage-bar"><b>${e(label(result))}</b><a href="${e(result.url)}" target="_blank" rel="noopener">打开原始文件</a></div>${preview(experiment, result, options.viewport, label(result))}</div>
    <section class="score">${heading("核心验收", result.acceptance ? `${coreChecks.filter((item) => item.status !== "pending").length}/${coreChecks.length} 项已有明确记录；细节不抵消核心缺失。` : "该版本尚未采用协议 2。")}
      ${result.acceptance ? checkTable(coreChecks) : '<p class="muted">仅保留历史记录，不显示当前排名。</p>'}
      ${result.acceptance ? `<details class="runlog"><summary><h2>细节覆盖</h2></summary>${checkTable(result.acceptance.checks.filter((item) => item.tier === "detail"))}</details>` : ""}
    </section>${runPanel(result)}${historyPanel(version, result)}</div></section>`;
}
function renderComparison(experiment, version, options) {
  const summaries = version.evaluation?.protocol === 2 && version.evaluation.sessions.length ? comparisonSummary(version) : [];
  return `<section class="bench"><div class="compare-grid ${experiment.artifactType === "image" ? "is-image" : ""} is-${options.viewport}">${version.results.map((result) => `<article class="compare-card"><header><b>${e(label(result))}</b>${badge(result.acceptance?.status)}</header>${preview(experiment, result, options.viewport, label(result))}<p class="compare-meta">${e(result.record.harness)} · 联网 ${e(result.record.web_access)} · ${e(result.record.turns)} 轮</p><footer><a href="${hash(experiment, { ...options, view: "focus", model: result.key })}">验收与证据</a><a href="${e(result.url)}" target="_blank" rel="noopener">原始文件</a></footer></article>`).join("")}</div></section>
    <section class="block">${heading("已发布的人工比较", "每位评测者、每种视口仅汇总最新一份完整会话；不是模型总排名。")}
      ${summaries.length ? summaries.map((dimension) => `<section class="comparison-dimension"><h3>${e(dimension.name)}</h3><p class="muted">${e(dimension.focus)} · 纳入 ${dimension.eligible} 对 · 暂不纳入 ${dimension.excluded} 对</p><div class="box scroll"><table class="matrix"><thead><tr><th>产物</th><th>优于对方</th><th>不及对方</th><th>持平</th><th>无法判断</th></tr></thead><tbody>${dimension.rows.map((row) => `<tr><th>${e(label(version.results.find((item) => item.key === row.key)))}</th><td>${row.wins}</td><td>${row.losses}</td><td>${row.ties}</td><td>${row.unknown}</td></tr>`).join("")}</tbody></table></div></section>`).join("") : '<p class="muted">尚无可比较记录。</p>'}
      <p class="legend">只纳入两份产物均核心通过的比较。待确认、部分做到或未通过的样本不计入质量胜负；原始意见仍保留。</p>
      <details class="runlog"><summary><h2>人工会话原始记录</h2><span class="mono">${version.evaluation?.sessions?.length ?? 0} 份</span></summary>
        ${(version.evaluation?.sessions ?? []).map((session) => `<details class="evidence"><summary>${e(session.reviewer)} · ${e(session.viewport)} · ${e(session.sealedAt.slice(0, 10))}</summary><p>未提前查看身份：${session.blindDeclared ? "评测者声明是" : "未声明"}（声明未经身份或观察验证）</p><ul>${session.tasks.map((task) => `<li>${e(label(version.results.find((item) => item.key === task.left)))} / ${e(label(version.results.find((item) => item.key === task.right)))} · ${e(task.dimension)} · ${e({ left: "左侧优", right: "右侧优", tie: "持平", unknown: "无法判断" }[task.choice])}：${e(task.note)}</li>`).join("")}</ul></details>`).join("") || '<p class="muted">尚未发布人工会话。</p>'}
      </details>
    </section>`;
}
function draftKey(experiment, version) { return `llm-lab-review:${experiment.id}:v${version.version}:${version.evaluation.fingerprint}`; }
function loadDraft(experiment, version) {
  const key = draftKey(experiment, version);
  let value = memory.get(key);
  try { value = JSON.parse(localStorage.getItem(key) ?? "null") ?? value; } catch { storageWarning = true; }
  return validDraft(value, version, experiment.id) ? value : null;
}
function saveDraft() {
  if (!draft || !current) return;
  const key = draftKey(current.experiment, current.version);
  memory.set(key, structuredClone(draft));
  try { localStorage.setItem(key, JSON.stringify(draft)); } catch { storageWarning = true; }
}
function exportDraft() {
  const blob = new Blob([JSON.stringify(draft, null, 2) + "\n"], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${draft.experiment}-v${draft.version}-${draft.id}${draft.sealedAt ? "" : "-draft"}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function blindControls() {
  return `<div class="actions"><button class="btn" type="button" data-action="reload">${replay}重新加载产物</button><button class="btn" type="button" data-action="export">导出${draft.sealedAt ? "封存记录" : "草稿"}</button></div>`;
}
function renderBlind(experiment, version) {
  if (version.evaluation?.protocol !== 2 || version.results.length < 2) return '<div class="empty"><strong>此版本未开放匿名比较</strong><p>需要协议 2 和至少两份产物。</p></div>';
  draft = loadDraft(experiment, version);
  const warning = storageWarning ? '<p class="banner">浏览器存储不可用，请及时导出草稿；离开页面可能丢失记录。</p>' : "";
  if (!draft) return `<section class="blind-start block">${heading("开始匿名复核")}
    <p class="muted">本次记录只保存在当前浏览器，导入仓库后才会发布。隐藏标签不能保证产物自身不透露模型身份；匿名声明由评测者自报。</p>
    <form id="start-review"><div class="review-fields"><label class="field">评测者<input name="reviewer" maxlength="100" required autocomplete="off" placeholder="姓名或固定复核代号"></label><label class="field">评测视口<select name="viewport"><option value="desktop">桌面 1440 × 900</option><option value="mobile">手机 390 × 844</option></select></label></div>
    <label class="checkbox-line"><input type="checkbox" name="blind">我尚未查看本批产物的模型身份和历史分数</label>
    <div class="actions"><button class="btn btn-primary" type="submit">开始复核 ${arrow}</button><label class="btn">恢复草稿<input id="restore-review" class="sr-only" type="file" accept=".json,application/json"></label></div></form><p id="review-error" class="form-error" role="alert"></p>${warning}</section>`;
  if (draft.sealedAt) return `<section class="block">${heading("记录已封存", "本地封存不等于已发布，也不是数字签名或身份认证。")}
    <div class="banner"><p>${e(draft.reviewer)} · ${e(VIEWPORTS[draft.viewport].label)} · ${e(draft.sealedAt)}<br>请导出记录，通过仓库校验后发布。封存后本页不再编辑。</p></div>
    <dl class="cells">${draft.order.map((key, index) => `<div><dt>样本 ${index + 1}</dt><dd>${e(label(version.results.find((item) => item.key === key)))}</dd></div>`).join("")}</dl>
    <div class="toolbar review-nav">${blindControls()}<button class="btn" type="button" data-action="new-review">新建复核</button></div>${warning}</section>`;
  const resultFor = (key) => version.results.find((item) => item.key === key);
  const sampleName = (key) => `样本 ${draft.order.indexOf(key) + 1}`;
  const acceptance = draft.phase === "acceptance";
  const index = draft.index;
  const size = acceptance ? draft.order.length : draft.tasks.length;
  let workspace;
  if (acceptance) {
    const key = draft.order[index];
    const assessment = draft.assessments[key] ?? { observed: false, checks: {} };
    workspace = `<div class="blind-acceptance"><div class="blind-media"><div class="stage"><div class="stage-bar"><b>${sampleName(key)}</b><span>${e(VIEWPORTS[draft.viewport].label)}</span></div>${preview(experiment, resultFor(key), draft.viewport, sampleName(key))}</div>
      <label class="checkbox-line"><input type="checkbox" id="observed" ${assessment.observed ? "checked" : ""}>${experiment.artifactType === "page" ? "我已完整观看两次发射，含复位与最终画面" : "我已连续观看至少三个完整踩踏周期"}</label></div>
      <div class="blind-checks">${version.evaluation.criteria.filter((item) => item.method === "human").map((item) => `<fieldset class="check-field"><legend>${e(item.text)} <span class="chip">${item.tier === "core" ? "核心" : "细节"}</span></legend><p class="small muted">${e(item.how)}</p><label class="field">结论<select data-check="${item.id}" data-field="status"><option value="">请选择</option>${Object.entries(STATUS_LABELS).map(([value, text]) => `<option value="${value}" ${assessment.checks[item.id]?.status === value ? "selected" : ""}>${text}</option>`).join("")}</select></label><label class="field">观察依据<textarea data-check="${item.id}" data-field="note" rows="2" maxlength="3000" placeholder="具体画面、阶段或无法确认的原因">${e(assessment.checks[item.id]?.note ?? "")}</textarea></label></fieldset>`).join("")}</div></div>`;
  } else {
    const task = draft.tasks[index];
    const dimension = version.evaluation.dimensions.find((item) => item.id === task.dimension);
    workspace = `<section class="pair-workspace"><div class="pair-head"><div><h2>${e(dimension.name)}</h2><p class="muted">${e(dimension.focus)}</p></div><button type="button" class="btn" data-action="swap">互换左右</button></div>
      <div class="compare-grid blind-pair is-${draft.viewport}">${[["left", task.left], ["right", task.right]].map(([side, key]) => `<article class="compare-card"><header><b>${side === "left" ? "左侧" : "右侧"} · ${sampleName(key)}</b></header>${preview(experiment, resultFor(key), draft.viewport, sampleName(key))}</article>`).join("")}</div>
      <fieldset class="choice-group"><legend>比较结论</legend>${[["left", "左侧更好"], ["right", "右侧更好"], ["tie", "没有明显差异"], ["unknown", "无法判断"]].map(([value, text]) => `<label><input type="radio" name="choice" value="${value}" ${task.choice === value ? "checked" : ""}>${text}</label>`).join("")}</fieldset>
      <label class="field">观察依据<textarea id="comparison-note" rows="3" maxlength="3000" placeholder="具体差异或无法判断的原因">${e(task.note)}</textarea></label></section>`;
  }
  return `<section class="block">${heading(acceptance ? "匿名逐项验收" : "匿名成对比较", `${acceptance ? "第一阶段" : "第二阶段"} · ${index + 1}/${size} · 本地草稿，尚未发布`)}
    <div class="toolbar review-nav">${blindControls()}<span class="small muted">${e(draft.reviewer)} · ${e(VIEWPORTS[draft.viewport].label)} · 自动保存</span></div>
    ${workspace}<p id="review-error" class="form-error" role="alert"></p>
    <div class="review-nav actions"><button class="btn" type="button" data-action="previous" ${acceptance && index === 0 ? "disabled" : ""}>上一步</button><button class="btn btn-primary" type="button" data-action="next">${!acceptance && index === size - 1 ? "封存并揭示身份" : "下一步"} ${arrow}</button></div>${warning}</section>`;
}
function renderExperiment(experiment, params) {
  const version = experiment.versions.find((item) => item.version === Number(params.get("v"))) ?? latest(experiment);
  const options = { v: version.version, view: ["compare", "blind"].includes(params.get("view")) ? params.get("view") : "focus", viewport: params.get("viewport") === "mobile" ? "mobile" : "desktop", model: params.get("model") ?? undefined };
  current = { experiment, version, options };
  const blind = options.view === "blind";
  const sessions = version.evaluation?.sessions?.length ?? 0;
  document.title = `${experiment.title} · LLM Capability Lab`;
  app.innerHTML = `<div class="page"><div class="crumb"><a href="#/">实验</a><span>/</span><span>${e(experiment.number)}</span></div>
    <header class="exp-head"><div class="exp-head-text"><p class="kicker">${e(experiment.capability)} / PROMPT v${version.version}</p><h1>${e(experiment.title)}</h1><p class="exp-head-question">${e(experiment.question)}</p></div>
      <label class="readout-select field">提示词版本<select id="version-select">${experiment.versions.map((item) => `<option value="${item.version}" ${item === version ? "selected" : ""}>v${item.version}${item.version === experiment.latestVersion ? " · 当前" : " · 历史"}</option>`).join("")}</select></label></header>
    <details class="prompt"><summary class="prompt-head"><h2>模型收到的完整 Prompt · ${version.prompt.length.toLocaleString("zh-CN")} 字</h2></summary><pre class="prompt-source">${e(version.prompt)}</pre><div class="actions prompt-actions"><button class="btn" type="button" data-action="copy-prompt">复制原文</button><a class="btn" href="${e(version.promptPath)}" target="_blank" rel="noopener">版本文件</a></div><p class="prompt-change muted">${e(version.change)}</p></details>
    <section class="bench"><div class="toolbar"><nav class="seg" aria-label="产物视图">${[["focus", "单个查看"], ["compare", "并排对照"], ["blind", "匿名复核"]].map(([view, text]) => `<a href="${hash(experiment, { ...options, view, model: view === "blind" ? undefined : options.model })}" aria-current="${options.view === view}">${text}</a>`).join("")}</nav>
      ${!blind ? `<div class="toolbar-group"><div class="seg" aria-label="预览视口">${Object.entries(VIEWPORTS).map(([viewport, size]) => `<a class="mono" href="${hash(experiment, { ...options, viewport })}" aria-current="${viewport === options.viewport}">${size.label}</a>`).join("")}</div><button type="button" class="btn" data-action="reload" title="HTML 重新加载后回到待命，需要再次点击点火">${replay}重新加载</button></div>` : ""}</div></section>
    ${!blind ? `<div class="banner"><p>生成条件并不完全相同：运行工具、联网权限、轮数见各产物记录。当前 ${version.stats.pending} 份待确认，已发布 ${sessions} 份人工会话。旧 AI 分数不参与当前结论。</p></div>` : ""}
    ${blind ? renderBlind(experiment, version) : options.view === "compare" ? renderComparison(experiment, version, options) : renderFocus(experiment, version, options)}
    ${!blind ? protocolInfo(version) : ""}</div>`;
  observeFrames();
}

function render() {
  observer.disconnect();
  const { path, params } = route();
  current = null;
  draft = null;
  const experiment = lab.experiments.find((item) => item.id === path);
  if (experiment) renderExperiment(experiment, params);
  else renderHome(params);
  document.querySelector('[data-nav="matrix"]').hidden = false;
  document.querySelectorAll("[data-nav]").forEach((element) => {
    if (!experiment && element.dataset.nav === (params.get("section") ?? "home")) element.setAttribute("aria-current", "page");
    else element.removeAttribute("aria-current");
  });
}
function reviewError(message) {
  const target = document.getElementById("review-error");
  if (target) target.textContent = message;
  announce(message);
}
function moveDraft(direction) {
  const version = current.version;
  if (direction > 0) {
    if (draft.phase === "acceptance" && !assessmentComplete(draft, version, draft.order[draft.index])) {
      reviewError("请确认完整观看，并为每项填写结论与观察依据；不确定的项目可以选择待确认。"); return;
    }
    if (draft.phase === "comparison") {
      const task = draft.tasks[draft.index];
      if (!task.choice || !task.note.trim()) { reviewError("请选择比较结论并填写观察依据。"); return; }
      task.at = new Date().toISOString();
    }
  }
  if (direction < 0 && draft.index === 0 && draft.phase === "comparison") {
    draft.phase = "acceptance"; draft.index = draft.order.length - 1;
  } else if (direction > 0 && draft.phase === "acceptance" && draft.index === draft.order.length - 1) {
    draft.phase = "comparison"; draft.index = 0;
  } else if (direction > 0 && draft.phase === "comparison" && draft.index === draft.tasks.length - 1) {
    if (!sessionComplete(draft, version)) { reviewError("会话仍有未完成项目，请回到对应步骤。"); return; }
    draft.sealedAt = new Date().toISOString(); draft.phase = "sealed"; draft.index = 0;
  } else draft.index += direction;
  saveDraft();
  render();
  document.querySelector(".bench")?.scrollIntoView();
}
app.addEventListener("submit", (event) => {
  if (event.target.id !== "start-review") return;
  event.preventDefault();
  const values = new FormData(event.target);
  const reviewer = String(values.get("reviewer")).trim();
  if (!reviewer || reviewer === "unknown") { reviewError("请填写固定评测者代号，不能使用 unknown。"); return; }
  draft = createSession(current.experiment, current.version, reviewer, values.has("blind"), values.get("viewport"));
  saveDraft();
  render();
});
app.addEventListener("input", (event) => {
  if (!draft || draft.sealedAt) return;
  const target = event.target;
  if (draft.phase === "acceptance") {
    const key = draft.order[draft.index];
    const assessment = draft.assessments[key] ??= { observed: false, checks: {} };
    if (target.id === "observed") assessment.observed = target.checked;
    if (target.dataset.check) {
      const answer = assessment.checks[target.dataset.check] ??= { status: "", note: "" };
      answer[target.dataset.field] = target.value;
    }
  } else {
    const task = draft.tasks[draft.index];
    if (target.name === "choice") task.choice = target.value;
    if (target.id === "comparison-note") task.note = target.value;
    if (target.name === "choice" || target.id === "comparison-note") task.at = new Date().toISOString();
  }
  saveDraft();
});
app.addEventListener("change", async (event) => {
  if (event.target.id === "version-select") location.hash = hash(current.experiment, { v: event.target.value, view: current.options.view });
  if (event.target.id !== "restore-review") return;
  try {
    const restored = JSON.parse(await event.target.files[0].text());
    if (!sessionMatches(restored, current.version) || !validDraft(restored, current.version, current.experiment.id)) throw new Error("草稿格式无效，或标准 / 原始产物已变化，不能恢复。");
    draft = restored; saveDraft(); render(); announce("草稿已恢复。");
  } catch (error) { reviewError(error.message); }
});
app.addEventListener("click", async (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "reload") reloadPreviews();
  if (action === "copy-prompt") {
    try { await navigator.clipboard.writeText(current.version.prompt); announce("已复制模型收到的原文。"); }
    catch { announce("无法访问剪贴板，请从展开的 Prompt 原文中选择复制。"); }
  }
  if (!draft) return;
  if (action === "export") exportDraft();
  if (action === "new-review") {
    if (!confirm("请先导出已有记录。新建会替换当前浏览器的本地会话，是否继续？")) return;
    const key = draftKey(current.experiment, current.version);
    memory.delete(key);
    try { localStorage.removeItem(key); } catch { storageWarning = true; }
    draft = null; render();
  }
  if (draft.sealedAt) return;
  if (action === "next") moveDraft(1);
  if (action === "previous") moveDraft(-1);
  if (action === "swap") {
    const task = draft.tasks[draft.index];
    [task.left, task.right] = [task.right, task.left];
    if (task.choice === "left") task.choice = "right";
    else if (task.choice === "right") task.choice = "left";
    saveDraft(); render();
  }
});
window.addEventListener("hashchange", render);
try {
  const response = await fetch("data/lab.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  lab = await response.json();
  render();
} catch (error) {
  app.innerHTML = `<div class="empty"><strong>无法加载实验数据</strong><p>${e(error.message)}</p><a class="text-link" href="https://github.com/rockychang7/llm-capability-lab">查看仓库原始文件</a></div>`;
}
