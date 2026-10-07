const experiments = [
  {
    id: "rocket",
    number: "01",
    navTitle: "火箭发射动画",
    navMeta: "前端动画 · 5 份结果",
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
    navMeta: "规格执行 · 3 份结果",
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
      { name: "规格遵守", description: "要求的结构、文案、链接和技术限制是否逐项做到。", weight: 30 },
      { name: "视觉还原", description: "布局、字体、颜色、间距和整体气质是否接近目标。", weight: 25 },
      { name: "核心场景", description: "黑胶唱机的结构、材质、光影和拟真程度是否可信。", weight: 25 },
      { name: "动效与交互", description: "入场、唱片、唱臂、悬停、焦点和降级是否完整。", weight: 10 },
      { name: "响应式与稳定性", description: "不同屏幕尺寸下是否清楚、可用且没有明显错误。", weight: 10 }
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
    navMeta: "SVG 插画 · 4 份结果",
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
  nav: document.querySelector("#experiment-nav"),
  eyebrow: document.querySelector("#experiment-eyebrow"),
  title: document.querySelector("#experiment-title"),
  summary: document.querySelector("#experiment-summary"),
  promptLink: document.querySelector("#prompt-link"),
  inputRule: document.querySelector("#input-rule"),
  modelPicker: document.querySelector("#model-picker"),
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
  evaluationLink: document.querySelector("#evaluation-link")
};

let activeExperiment = experiments[0];
let activeModel = activeExperiment.models[0];
let activeView = "focus";

function scoreLabel(model) {
  return model.score === null ? "待评估" : `${model.score} / 100`;
}

function createExperimentNav() {
  elements.nav.replaceChildren(
    ...experiments.map((experiment) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "experiment-tab";
      button.dataset.experiment = experiment.id;
      button.innerHTML = `
        <span class="experiment-number">${experiment.number}</span>
        <span>
          <strong>${experiment.navTitle}</strong>
          <small>${experiment.navMeta}</small>
        </span>
      `;
      button.addEventListener("click", () => selectExperiment(experiment.id));
      return button;
    })
  );
}

function selectExperiment(id) {
  const nextExperiment = experiments.find((experiment) => experiment.id === id);
  if (!nextExperiment) {
    return;
  }

  activeExperiment = nextExperiment;
  activeModel =
    activeExperiment.models.find((model) => model.id === activeExperiment.defaultModel) ??
    activeExperiment.models[0];
  renderExperiment();

  if (window.innerWidth < 821) {
    document.querySelector(".experiment-intro").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderExperiment() {
  document.querySelectorAll(".experiment-tab").forEach((button) => {
    const isActive = button.dataset.experiment === activeExperiment.id;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "page" : "false");
  });

  elements.eyebrow.textContent = activeExperiment.eyebrow;
  elements.title.textContent = activeExperiment.title;
  elements.summary.textContent = activeExperiment.summary;
  elements.inputRule.textContent = activeExperiment.inputRule;
  elements.promptLink.href = activeExperiment.promptUrl;
  elements.capabilityIntro.textContent = activeExperiment.capabilityIntro;
  elements.evaluationIntro.textContent = activeExperiment.evaluationIntro;

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
      block.innerHTML = `<strong>${item.score}</strong><span>${item.label}</span>`;
      return block;
    })
  );

  elements.rubricList.replaceChildren(
    ...activeExperiment.rubric.map((item) => {
      const block = document.createElement("div");
      block.className = "rubric-item";
      block.style.setProperty("--weight", `${item.weight}%`);
      block.innerHTML = `
        <strong>${item.name}</strong>
        <p>${item.description}</p>
        <span class="rubric-weight">${item.weight}%</span>
      `;
      return block;
    })
  );

  if (activeExperiment.evaluationUrl) {
    elements.evaluationLink.href = activeExperiment.evaluationUrl;
    elements.evaluationLink.textContent = "查看完整评测记录 ↗";
    elements.evaluationLink.classList.remove("is-disabled");
    elements.evaluationLink.removeAttribute("aria-disabled");
  } else {
    elements.evaluationLink.removeAttribute("href");
    elements.evaluationLink.textContent = "本实验尚未完成正式评测";
    elements.evaluationLink.classList.add("is-disabled");
    elements.evaluationLink.setAttribute("aria-disabled", "true");
  }

  renderModelPicker();
  renderModel();
  renderComparison();
}

function renderModelPicker() {
  elements.modelPicker.replaceChildren(
    ...activeExperiment.models.map((model) => {
      const button = document.createElement("button");
      button.type = "button";
      button.role = "tab";
      button.className = "model-button";
      button.dataset.model = model.id;
      button.textContent = model.label;
      button.addEventListener("click", () => {
        activeModel = model;
        renderModelPicker();
        renderModel();
      });
      if (model.id === activeModel.id) {
        button.classList.add("is-active");
        button.setAttribute("aria-selected", "true");
      } else {
        button.setAttribute("aria-selected", "false");
      }
      return button;
    })
  );
}

function renderModel() {
  elements.previewModel.textContent = activeModel.label;
  elements.previewScore.textContent = scoreLabel(activeModel);
  elements.previewScore.classList.toggle("has-score", activeModel.score !== null);
  elements.previewFrame.src = activeModel.url;
  elements.previewFrame.title = `${activeExperiment.navTitle}：${activeModel.label} 原始结果`;
  elements.previewFrame.className = "preview-frame";
  elements.previewFrameWrap.classList.toggle("is-art", activeExperiment.artifactType === "art");
  elements.openResult.href = activeModel.url;

  const facts = [
    ["Prompt / version", `${activeExperiment.promptUrl.split("/")[1]} / v${activeModel.promptVersion}`],
    ["Provider", activeModel.provider],
    ["Model", activeModel.model],
    ["Mode", activeModel.mode],
    ["Generated at", activeModel.generatedAt],
    ["Entrypoint", activeModel.url.split("/").at(-1)]
  ];

  elements.runFacts.replaceChildren(
    ...facts.map(([label, value]) => {
      const fact = document.createElement("div");
      fact.className = "run-fact";
      fact.innerHTML = `<span>${label}</span><strong title="${value}">${value}</strong>`;
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
      item.innerHTML = `
        <div class="comparison-heading">
          <strong>${model.label}</strong>
          <span>${scoreLabel(model)}</span>
        </div>
        <iframe
          class="comparison-frame"
          src="${model.url}"
          title="${activeExperiment.navTitle}：${model.label} 并排预览"
          loading="lazy"
        ></iframe>
        <a class="comparison-open" href="${model.url}" target="_blank" rel="noopener">打开原始结果 ↗</a>
      `;
      return item;
    })
  );
}

function setView(view) {
  activeView = view;
  const showFocus = activeView === "focus";
  elements.focusView.hidden = !showFocus;
  elements.compareView.hidden = showFocus;

  document.querySelectorAll(".view-button").forEach((button) => {
    const isActive = button.dataset.view === activeView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

document.querySelectorAll(".view-button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

elements.reloadPreview.addEventListener("click", () => {
  elements.previewFrame.src = activeModel.url;
});

createExperimentNav();
selectExperiment(experiments[0].id);
setView(activeView);
