const experiments = [
  {
    id: "rocket",
    number: "01",
    navTitle: "火箭发射动画",
    navMeta: "前端动画",
    eyebrow: "实验 01 · 前端动画与视觉特效",
    title: "模型能把一句“发射火箭”做到什么程度？",
    summary: "输入只描述目标，不提供技术方案。这个实验观察模型能否自己补齐火箭造型、点火反馈、升空过程和抵达太空的完整体验。",
    inputRule: "所有模型使用 prompt-v1，要求完全相同",
    promptUrl: "prompts/01-rocket-launch/prompt-v1.md",
    evaluationUrl: "results/01-rocket-launch/evaluations/evaluation-v1.md",
    artifactType: "page",
    defaultModel: "gpt-5-6-sol-max",
    capabilityIntro: "重点不是页面里有多少按钮，而是模型能否把一条模糊指令变成可信、连贯、能完成的视觉过程。",
    capabilities: [
      "第一眼能否认出一枚结构合理的火箭",
      "点击后是否真的经历点火、升空和进入太空",
      "火焰、烟雾、镜头与场景过渡是否自然",
      "最后是否给出明确的任务完成反馈"
    ],
    evaluationIntro: "每项先打 0–5 分，再按权重换算成 100 分。高分代表这一次产物更完整，不等于模型永远更强。",
    scale: [
      { score: "0–1", label: "没有实现，或核心功能严重缺失" },
      { score: "2–3", label: "基本能用，但问题容易被看见" },
      { score: "4–5", label: "完成度高，效果自然且完整" }
    ],
    rubric: [
      { name: "指令完成度", description: "是否点一下就能发射，并最终进入太空、明确结束。", weight: 25 },
      { name: "火箭真实感", description: "火箭的结构、比例、材质和细节是否可信。", weight: 20 },
      { name: "点火与发射效果", description: "尾焰、烟雾、光效和升空反馈是否有力度。", weight: 25 },
      { name: "动画流畅度", description: "运动、镜头和场景切换是否连续稳定。", weight: 20 },
      { name: "整体完成质量", description: "交互、信息和最终画面是否形成完整体验。", weight: 10 }
    ],
    models: [
      {
        id: "agy-gemini-3-6-flash",
        label: "AGY · Gemini 3.6 Flash",
        provider: "agy",
        model: "gemini-3-6-flash",
        mode: "unknown",
        promptVersion: "1",
        generatedAt: "unknown",
        score: 56,
        url: "results/01-rocket-launch/outputs/agy-gemini-3-6-flash/agy-gemini-3-6-flash.html"
      },
      {
        id: "claude-opus-4-8-max",
        label: "Claude Opus 4.8 · max",
        provider: "anthropic",
        model: "claude-opus-4-8",
        mode: "max",
        promptVersion: "1",
        generatedAt: "unknown",
        score: 85,
        url: "results/01-rocket-launch/outputs/claude-opus-4-8-max/claude-opus-4-8-max.html"
      },
      {
        id: "gpt-5-6-sol-max",
        label: "GPT-5.6 · sol-max",
        provider: "openai",
        model: "gpt-5-6",
        mode: "sol-max",
        promptVersion: "1",
        generatedAt: "unknown",
        score: 91,
        url: "results/01-rocket-launch/outputs/gpt-5-6-sol-max/gpt-5-6-sol-max.html"
      },
      {
        id: "gpt-6-astra-xhigh",
        label: "GPT-6 Astra · xhigh",
        provider: "openai",
        model: "gpt-6-astra",
        mode: "astra-xhigh",
        promptVersion: "1",
        generatedAt: "2026-09-22T15:45:15+08:00",
        score: null,
        url: "results/01-rocket-launch/outputs/gpt-6-astra-xhigh/gpt-6-astra-xhigh.html"
      },
      {
        id: "kimi-k3",
        label: "Kimi K3",
        provider: "moonshot-ai",
        model: "kimi-k3",
        mode: "unknown",
        promptVersion: "1",
        generatedAt: "unknown",
        score: 76,
        url: "results/01-rocket-launch/outputs/kimi-k3/kimi-k3.html"
      }
    ]
  },
  {
    id: "vinyl",
    number: "02",
    navTitle: "Vinyl 网页复刻",
    navMeta: "规格执行",
    eyebrow: "实验 02 · 网页复刻与规格执行",
    title: "面对一份很长的设计规格，模型能还原到什么程度？",
    summary: "输入把文案、布局、配色、动效和响应式规则写得很具体。这个实验观察模型能否持续遵守约束，并用一个 HTML 文件还原完整产品页。",
    inputRule: "所有模型使用同一份详细设计规格",
    promptUrl: "prompts/02-vinylformac-replica/prompt-v1.md",
    evaluationUrl: null,
    artifactType: "page",
    defaultModel: "gpt-5-codex",
    capabilityIntro: "这不是自由发挥题。模型需要同时记住很多细节，并把视觉、文字、动画和技术限制放进同一份可运行页面。",
    capabilities: [
      "页面结构、文案和尺寸是否按规格落地",
      "不用外部图片，能否画出可信的黑胶唱机场景",
      "加载、旋转、悬停和键盘焦点等动效是否齐全",
      "桌面和手机尺寸下是否都能正常阅读和操作"
    ],
    evaluationIntro: "这一组还没有正式评分，页面只展示可直接观察的比较维度，不会用未完成的评测制造排名。",
    scale: [
      { score: "先看", label: "核心页面是否完整、能正常打开" },
      { score: "再比", label: "规格细节和视觉还原有多少差异" },
      { score: "后评", label: "统一环境复核后再记录正式分数" }
    ],
    rubric: [
      { name: "规格遵守", description: "要求的结构、文案、链接和技术限制是否逐项做到。" },
      { name: "视觉还原", description: "布局、字体、颜色、间距和整体气质是否接近目标。" },
      { name: "核心场景", description: "黑胶唱机的结构、材质、光影和拟真程度是否可信。" },
      { name: "动效与交互", description: "入场、唱片、唱臂、悬停、焦点和降级是否完整。" },
      { name: "响应式与稳定性", description: "不同屏幕尺寸下是否清楚、可用且没有明显错误。" }
    ],
    models: [
      {
        id: "gpt-5-codex",
        label: "GPT-5 · Codex",
        provider: "openai",
        model: "gpt-5",
        mode: "codex",
        promptVersion: "1",
        generatedAt: "2026-08-04T13:59:28+08:00",
        score: null,
        url: "results/02-vinylformac-replica/outputs/gpt-5-codex/gpt-5-codex.html"
      },
      {
        id: "gpt-6-astra-xhigh",
        label: "GPT-6 Astra · xhigh",
        provider: "openai",
        model: "gpt-6-astra",
        mode: "astra-xhigh",
        promptVersion: "1",
        generatedAt: "2026-09-22T15:59:17+08:00",
        score: null,
        url: "results/02-vinylformac-replica/outputs/gpt-6-astra-xhigh/gpt-6-astra-xhigh.html"
      },
      {
        id: "kimi-k3",
        label: "Kimi K3",
        provider: "moonshot-ai",
        model: "kimi-k3",
        mode: "unknown",
        promptVersion: "1",
        generatedAt: "2026-08-04",
        score: null,
        url: "results/02-vinylformac-replica/outputs/kimi-k3/kimi-k3.html"
      }
    ]
  },
  {
    id: "pelican",
    number: "03",
    navTitle: "鹈鹕骑自行车",
    navMeta: "SVG 插画",
    eyebrow: "实验 03 · SVG 插画生成",
    title: "只给七个英文单词，模型能画清楚一个复杂动作吗？",
    summary: "Prompt 只有“生成一张鹈鹕骑自行车的 SVG”。没有风格、构图或细节提示，因此结果直接反映模型对主体、动作和矢量结构的默认理解。",
    inputRule: "所有模型只收到同一句七词英文指令",
    promptUrl: "prompts/03-pelican-bicycle/prompt-v1.md",
    evaluationUrl: "results/03-pelican-bicycle/evaluations/evaluation-v1.md",
    artifactType: "art",
    defaultModel: "gpt-5-6-luna",
    capabilityIntro: "鹈鹕和自行车各自不难，难点是要让两者在同一张图里保持结构正确，并且一眼看出“正在骑”。",
    capabilities: [
      "长喙、喉囊等特征能否让鹈鹕一眼可认",
      "车轮、车架、车把和脚踏是否组成合理自行车",
      "身体、翅膀和脚的位置能否表达骑行动作",
      "SVG 是否完整、独立、可缩放且没有外部依赖"
    ],
    evaluationIntro: "这一组按 100 分直接计分。当前评测只记录了 Luna 的结果，其余产物保留为待评估状态。",
    scale: [
      { score: "<60", label: "主体或结构存在明显缺失" },
      { score: "60–84", label: "能看懂主题，细节仍有不足" },
      { score: "85–100", label: "主题清楚，结构与画面完成度高" }
    ],
    rubric: [
      { name: "主题可识别性", description: "是否一眼看出是鹈鹕，而且它正在骑自行车。", weight: 30 },
      { name: "SVG 完整性", description: "文件能否独立打开，并主要使用真正的矢量图形。", weight: 25 },
      { name: "造型与细节", description: "鹈鹕特征、自行车结构和动作连接是否清楚。", weight: 25 },
      { name: "构图与完成度", description: "层次、配色、姿态和整体画面是否协调完整。", weight: 20 }
    ],
    models: [
      {
        id: "gpt-5-6-luna",
        label: "GPT-5.6 Luna",
        provider: "github-copilot",
        model: "gpt-5.6-luna",
        mode: "unknown",
        promptVersion: "1",
        generatedAt: "unknown",
        score: 94,
        url: "results/03-pelican-bicycle/outputs/gpt-5-6-luna/gpt-5-6-luna.svg"
      },
      {
        id: "gpt-5-6-sol-max",
        label: "GPT-5.6 · sol-max",
        provider: "openai",
        model: "gpt-5-6",
        mode: "sol-max",
        promptVersion: "1",
        generatedAt: "2026-09-18T17:10:11+08:00",
        score: null,
        url: "results/03-pelican-bicycle/outputs/gpt-5-6-sol-max/gpt-5-6-sol-max.svg"
      },
      {
        id: "gpt-5-6-terra",
        label: "GPT-5.6 Terra",
        provider: "github-copilot",
        model: "gpt-5.6-terra",
        mode: "unknown",
        promptVersion: "1",
        generatedAt: "2026-09-18T09:06:28Z",
        score: null,
        url: "results/03-pelican-bicycle/outputs/gpt-5-6-terra/gpt-5-6-terra.svg"
      },
      {
        id: "gpt-6-astra-xhigh",
        label: "GPT-6 Astra · xhigh",
        provider: "openai",
        model: "gpt-6-astra",
        mode: "astra-xhigh",
        promptVersion: "1",
        generatedAt: "2026-09-22T16:02:50+08:00",
        score: null,
        url: "results/03-pelican-bicycle/outputs/gpt-6-astra-xhigh/gpt-6-astra-xhigh.svg"
      }
    ]
  }
];

const elements = {
  labCount: document.querySelector("#lab-count"),
  chooser: document.querySelector("#experiment-chooser"),
  trigger: document.querySelector("#experiment-trigger"),
  selectedNumber: document.querySelector("#selected-number"),
  selectedTitle: document.querySelector("#selected-title"),
  selectedMeta: document.querySelector("#selected-meta"),
  panel: document.querySelector("#experiment-panel"),
  search: document.querySelector("#experiment-search"),
  matchCount: document.querySelector("#experiment-match-count"),
  noMatch: document.querySelector("#experiment-no-match"),
  nav: document.querySelector("#experiment-nav"),
  eyebrow: document.querySelector("#experiment-eyebrow"),
  title: document.querySelector("#experiment-title"),
  summary: document.querySelector("#experiment-summary"),
  inputRule: document.querySelector("#input-rule"),
  promptVersion: document.querySelector("#prompt-version"),
  promptShell: document.querySelector("#prompt-shell"),
  promptText: document.querySelector("#prompt-text"),
  promptLength: document.querySelector("#prompt-length"),
  promptExpand: document.querySelector("#prompt-expand"),
  promptCopy: document.querySelector("#prompt-copy"),
  promptFeedback: document.querySelector("#prompt-feedback"),
  modelPicker: document.querySelector("#model-picker"),
  viewSwitch: document.querySelector("#view-switch"),
  resultEmpty: document.querySelector("#result-empty"),
  focusView: document.querySelector("#focus-view"),
  compareView: document.querySelector("#compare-view"),
  previewModel: document.querySelector("#preview-model"),
  previewScore: document.querySelector("#preview-score"),
  previewFrame: document.querySelector("#preview-frame"),
  previewFrameWrap: document.querySelector("#preview-frame-wrap"),
  openResult: document.querySelector("#open-result"),
  reloadPreview: document.querySelector("#reload-preview"),
  runFacts: document.querySelector("#run-facts"),
  capabilityIntro: document.querySelector("#capability-intro"),
  capabilityList: document.querySelector("#capability-list"),
  evaluationIntro: document.querySelector("#evaluation-intro"),
  evaluationScale: document.querySelector("#evaluation-scale"),
  rubricList: document.querySelector("#rubric-list"),
  evaluationLink: document.querySelector("#evaluation-link"),
  rubricStatus: document.querySelector("#rubric-status")
};

let activeExperiment = experiments[0];
let activeModel = null;
let activeView = "focus";
let promptContent = "";
let promptRequest = 0;
const promptCache = new Map();

function scoreLabel(model) {
  return model.score === null ? "待评估" : `${model.score} / 100`;
}

function resultCount(experiment) {
  return experiment.models.length ? `${experiment.models.length} 份结果` : "暂无结果";
}

function renderExperimentNav(query = "") {
  const search = query.trim().toLocaleLowerCase();
  const matches = experiments.filter((experiment) =>
    [experiment.number, experiment.navTitle, experiment.navMeta, experiment.eyebrow]
      .some((value) => value.toLocaleLowerCase().includes(search))
  );
  elements.matchCount.textContent = `${matches.length} / ${experiments.length}`;
  elements.noMatch.hidden = matches.length > 0;
  elements.nav.replaceChildren(
    ...matches.map((experiment) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "experiment-option";
      button.dataset.experiment = experiment.id;
      const number = document.createElement("span");
      number.className = "option-number";
      number.textContent = experiment.number;
      const label = document.createElement("span");
      const title = document.createElement("strong");
      title.textContent = experiment.navTitle;
      const meta = document.createElement("small");
      meta.textContent = `${experiment.navMeta} · ${resultCount(experiment)}`;
      label.append(title, meta);
      button.append(number, label);
      if (experiment.id === activeExperiment.id) {
        button.classList.add("is-active");
        button.setAttribute("aria-current", "true");
      }
      button.addEventListener("click", () => {
        selectExperiment(experiment.id);
        closeExperimentPanel(true);
      });
      return button;
    })
  );
}

function openExperimentPanel() {
  elements.panel.hidden = false;
  elements.trigger.setAttribute("aria-expanded", "true");
  elements.search.value = "";
  renderExperimentNav();
  elements.search.focus();
}

function closeExperimentPanel(returnFocus = false) {
  elements.panel.hidden = true;
  elements.trigger.setAttribute("aria-expanded", "false");
  if (returnFocus) elements.trigger.focus();
}

function selectExperiment(id) {
  const nextExperiment = experiments.find((experiment) => experiment.id === id);
  if (!nextExperiment) return;

  activeExperiment = nextExperiment;
  activeModel =
    activeExperiment.models.find((model) => model.id === activeExperiment.defaultModel) ??
    activeExperiment.models[0] ?? null;
  activeView = "focus";
  renderExperiment();
  loadPrompt();
}

function renderExperiment() {
  elements.selectedNumber.textContent = activeExperiment.number;
  elements.selectedTitle.textContent = activeExperiment.navTitle;
  elements.selectedMeta.textContent = `${activeExperiment.navMeta} · ${resultCount(activeExperiment)}`;
  if (!elements.panel.hidden) renderExperimentNav(elements.search.value);

  elements.eyebrow.textContent = activeExperiment.eyebrow;
  elements.title.textContent = activeExperiment.title;
  elements.summary.textContent = activeExperiment.summary;
  elements.inputRule.textContent = activeExperiment.inputRule;
  elements.promptVersion.textContent = `v${activeExperiment.promptUrl.match(/prompt-v(\d+)\.md$/)?.[1] ?? "unknown"}`;
  elements.capabilityIntro.textContent = activeExperiment.capabilityIntro;
  elements.evaluationIntro.textContent = activeExperiment.evaluationIntro;
  elements.rubricStatus.textContent = activeExperiment.evaluationUrl ? "正式评测维度" : "观察项 · 尚无正式评分";

  elements.capabilityList.replaceChildren(
    ...activeExperiment.capabilities.map((capability) => {
      const item = document.createElement("li");
      item.textContent = capability;
      return item;
    })
  );

  elements.evaluationScale.replaceChildren(
    ...activeExperiment.scale.map((item) => {
      const block = document.createElement("div");
      block.className = "scale-item";
      const score = document.createElement("strong");
      score.textContent = item.score;
      const label = document.createElement("span");
      label.textContent = item.label;
      block.append(score, label);
      return block;
    })
  );

  elements.rubricList.replaceChildren(
    ...activeExperiment.rubric.map((item) => {
      const block = document.createElement("div");
      block.className = "rubric-item";
      const name = document.createElement("strong");
      name.textContent = item.name;
      const description = document.createElement("p");
      description.textContent = item.description;
      block.append(name, description);
      if (item.weight !== undefined) {
        const weight = document.createElement("span");
        weight.className = "rubric-weight";
        weight.textContent = `${item.weight}%`;
        block.append(weight);
      } else {
        block.classList.add("no-weight");
      }
      return block;
    })
  );

  if (activeExperiment.evaluationUrl) {
    elements.evaluationLink.href = activeExperiment.evaluationUrl;
    elements.evaluationLink.innerHTML = "阅读完整评测记录 <span aria-hidden='true'>↗</span>";
    elements.evaluationLink.classList.remove("is-disabled");
    elements.evaluationLink.removeAttribute("aria-disabled");
  } else {
    elements.evaluationLink.removeAttribute("href");
    elements.evaluationLink.textContent = "本实验尚无正式评测记录";
    elements.evaluationLink.classList.add("is-disabled");
    elements.evaluationLink.setAttribute("aria-disabled", "true");
  }

  renderModelPicker();
  renderView();
}

function renderModelPicker() {
  if (!activeModel) {
    elements.modelPicker.replaceChildren();
    return;
  }
  elements.modelPicker.replaceChildren(
    ...activeExperiment.models.map((model) => {
      const button = document.createElement("button");
      button.type = "button";
      button.role = "tab";
      button.className = "model-button";
      button.dataset.model = model.id;
      const label = document.createElement("span");
      label.textContent = model.label;
      const score = document.createElement("small");
      score.textContent = scoreLabel(model);
      button.append(label, score);
      button.addEventListener("click", () => {
        activeModel = model;
        renderModelPicker();
        renderFocus();
        elements.modelPicker.querySelector(`[data-model="${model.id}"]`).focus();
      });
      if (model.id === activeModel.id) {
        button.classList.add("is-active");
        button.setAttribute("aria-selected", "true");
      } else {
        button.setAttribute("aria-selected", "false");
      }
      button.tabIndex = model.id === activeModel.id ? 0 : -1;
      return button;
    })
  );
}

function renderFocus() {
  elements.previewModel.textContent = activeModel.label;
  elements.previewScore.textContent = scoreLabel(activeModel);
  elements.previewScore.classList.toggle("has-score", activeModel.score !== null);
  if (activeView === "focus") elements.previewFrame.src = activeModel.url;
  elements.previewFrame.title = `${activeExperiment.navTitle}：${activeModel.label} 原始结果`;
  elements.previewFrameWrap.classList.toggle("is-art", activeExperiment.artifactType === "art");
  elements.openResult.href = activeModel.url;

  const facts = [
    ["输入版本", `${activeExperiment.promptUrl.split("/")[1]} / v${activeModel.promptVersion}`, "同版本输入才能横向比较"],
    ["提供平台", activeModel.provider, "提供这次模型服务的平台"],
    ["模型名称", activeModel.model, "实际参与生成的模型"],
    ["运行模式", activeModel.mode, "当时记录的推理档位"],
    ["生成时间", activeModel.generatedAt, "没有记录则显示 unknown"],
    ["入口文件", activeModel.url.split("/").at(-1), "这份原始结果的打开入口"]
  ];

  elements.runFacts.replaceChildren(
    ...facts.map(([label, value, explanation]) => {
      const fact = document.createElement("div");
      fact.className = "run-fact";
      const term = document.createElement("dt");
      term.textContent = label;
      const detail = document.createElement("dd");
      detail.textContent = value;
      const help = document.createElement("small");
      help.textContent = explanation;
      fact.append(term, detail, help);
      return fact;
    })
  );
}

function renderComparison() {
  elements.compareView.classList.toggle("is-art", activeExperiment.artifactType === "art");
  elements.compareView.replaceChildren(
    ...activeExperiment.models.map((model) => {
      const item = document.createElement("article");
      item.className = "comparison-item";
      const heading = document.createElement("div");
      heading.className = "comparison-heading";
      const title = document.createElement("strong");
      title.textContent = model.label;
      const score = document.createElement("span");
      score.textContent = scoreLabel(model);
      heading.append(title, score);
      const frame = document.createElement("iframe");
      frame.className = "comparison-frame";
      frame.src = model.url;
      frame.title = `${activeExperiment.navTitle}：${model.label} 并排预览`;
      frame.loading = "lazy";
      const link = document.createElement("a");
      link.className = "comparison-open";
      link.href = model.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "全屏查看 ↗";
      item.append(heading, frame, link);
      return item;
    })
  );
}

function setView(view) {
  if (view !== "focus" && view !== "compare") return;
  activeView = view;
  renderView();
}

function renderView() {
  const hasResults = activeExperiment.models.length > 0;
  elements.resultEmpty.hidden = hasResults;
  elements.viewSwitch.hidden = !hasResults;
  if (!hasResults) {
    elements.modelPicker.hidden = true;
    elements.focusView.hidden = true;
    elements.compareView.hidden = true;
    elements.compareView.replaceChildren();
    elements.previewFrame.removeAttribute("src");
    elements.openResult.removeAttribute("href");
    return;
  }
  const showFocus = activeView === "focus";
  elements.focusView.hidden = !showFocus;
  elements.modelPicker.hidden = !showFocus;
  elements.compareView.hidden = showFocus;
  if (showFocus) {
    elements.compareView.replaceChildren();
    renderFocus();
  } else {
    elements.previewFrame.removeAttribute("src");
    renderComparison();
  }

  document.querySelectorAll(".view-button").forEach((button) => {
    const isActive = button.dataset.view === activeView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function extractPrompt(markdown) {
  const match = markdown.match(/^```text[ \t]*\r?\n([\s\S]*?)\r?\n```[ \t]*$/m);
  if (!match) throw new Error("未找到原始 Prompt 代码块");
  return match[1];
}

async function loadPrompt() {
  const request = ++promptRequest;
  const url = activeExperiment.promptUrl;
  promptContent = "";
  elements.promptText.textContent = "正在读取 Prompt…";
  elements.promptLength.textContent = "";
  elements.promptFeedback.textContent = "";
  elements.promptCopy.disabled = true;
  elements.promptExpand.hidden = true;
  elements.promptShell.classList.remove("is-collapsed");
  elements.promptExpand.setAttribute("aria-expanded", "false");

  try {
    if (!promptCache.has(url)) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      promptCache.set(url, extractPrompt(await response.text()));
    }
    if (request !== promptRequest) return;
    promptContent = promptCache.get(url);
    elements.promptText.textContent = promptContent;
    elements.promptLength.textContent = `${promptContent.length.toLocaleString()} 字符`;
    elements.promptCopy.disabled = false;
    if (elements.promptText.scrollHeight > 360) {
      elements.promptShell.classList.add("is-collapsed");
      elements.promptExpand.hidden = false;
      elements.promptExpand.innerHTML = "展开完整内容 <span aria-hidden='true'>↓</span>";
    }
  } catch (error) {
    if (request !== promptRequest) return;
    elements.promptText.textContent = "Prompt 读取失败，请通过本地 HTTP 服务打开实验台后重试。";
    elements.promptFeedback.textContent = error.message;
  }
}

elements.promptExpand.addEventListener("click", () => {
  const collapsed = elements.promptShell.classList.toggle("is-collapsed");
  elements.promptExpand.setAttribute("aria-expanded", String(!collapsed));
  elements.promptExpand.innerHTML = collapsed
    ? "展开完整内容 <span aria-hidden='true'>↓</span>"
    : "收起内容 <span aria-hidden='true'>↑</span>";
});

elements.promptCopy.addEventListener("click", async () => {
  const content = promptContent;
  const request = promptRequest;
  if (!content) return;
  try {
    await navigator.clipboard.writeText(content);
    if (request === promptRequest) elements.promptFeedback.textContent = "完整 Prompt 已复制";
  } catch {
    if (request === promptRequest) elements.promptFeedback.textContent = "复制失败，请手动选中文本复制";
  }
});

document.querySelectorAll(".view-button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

elements.reloadPreview.addEventListener("click", () => {
  if (activeModel) elements.previewFrame.src = activeModel.url;
});

elements.modelPicker.addEventListener("keydown", (event) => {
  const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
  if (!keys.includes(event.key) || !activeModel) return;
  event.preventDefault();
  const index = activeExperiment.models.findIndex((model) => model.id === activeModel.id);
  const next = event.key === "Home" ? 0
    : event.key === "End" ? activeExperiment.models.length - 1
    : (index + (event.key === "ArrowRight" ? 1 : -1) + activeExperiment.models.length) % activeExperiment.models.length;
  activeModel = activeExperiment.models[next];
  renderModelPicker();
  renderFocus();
  elements.modelPicker.querySelector(`[data-model="${activeModel.id}"]`).focus();
});

elements.labCount.innerHTML = `${String(experiments.length).padStart(2, "0")} EXPERIMENTS <span aria-hidden="true">/</span> ${String(experiments.reduce((count, experiment) => count + experiment.models.length, 0)).padStart(2, "0")} OUTPUTS`;

elements.trigger.addEventListener("click", () => {
  if (elements.panel.hidden) openExperimentPanel();
  else closeExperimentPanel(true);
});
elements.search.addEventListener("input", () => renderExperimentNav(elements.search.value));
elements.chooser.addEventListener("keydown", (event) => {
  if (elements.panel.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeExperimentPanel(true);
  } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    const options = [...elements.nav.querySelectorAll(".experiment-option")];
    if (!options.length) return;
    event.preventDefault();
    const index = options.indexOf(document.activeElement);
    const next = event.key === "ArrowDown"
      ? (index + 1) % options.length
      : (index - 1 + options.length) % options.length;
    options[next].focus();
  } else if (event.key === "Enter" && document.activeElement === elements.search) {
    const first = elements.nav.querySelector(".experiment-option");
    if (first) {
      event.preventDefault();
      first.click();
    }
  }
});
document.addEventListener("pointerdown", (event) => {
  if (!elements.panel.hidden && !elements.chooser.contains(event.target)) closeExperimentPanel();
});

selectExperiment(experiments[0].id);
