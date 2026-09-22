# LLM Capability Lab

一个基于统一 Prompt 横向比较不同大模型能力的实验库。

每个测试使用同一版本的 Prompt，让不同模型独立生成结果，再对原始产物进行集中评测。

## 核心原则

- Prompt 按 `prompt-vN.md` 版本化，已被结果引用的版本不再修改。
- 不同模型使用相同版本的 Prompt，保证输入一致。
- 模型产物原样保存，不修复、不润色，也不覆盖失败结果。
- 每份结果使用 `run.yaml` 记录 Prompt 版本和最小运行信息。
- 每个测试的评测集中写在一个 Markdown 文件中。

## 目录结构

```text
llm-capability-lab/
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── prompts/
│   ├── 01-rocket-launch/
│   │   └── prompt-v1.md
│   ├── 02-vinylformac-replica/
│   │   └── prompt-v1.md
│   └── 03-pelican-bicycle/
│       └── prompt-v1.md
└── results/
    ├── 01-rocket-launch/
    │   ├── outputs/
    │   │   ├── agy-gemini-3-6-flash/
    │   │   │   ├── run.yaml
    │   │   │   └── agy-gemini-3-6-flash.html
    │   │   ├── claude-opus-4-8-max/
    │   │   │   ├── run.yaml
    │   │   │   └── claude-opus-4-8-max.html
    │   │   ├── gpt-5-6-sol-max/
    │   │   │   ├── run.yaml
    │   │   │   ├── gpt-5-6-sol-max.html
    │   │   │   ├── styles.css
    │   │   │   └── app.js
    │   │   ├── gpt-6-astra-xhigh/
    │   │   │   ├── run.yaml
    │   │   │   └── gpt-6-astra-xhigh.html
    │   │   └── kimi-k3/
    │   │       ├── run.yaml
    │   │       └── kimi-k3.html
    │   └── evaluations/
    │       └── evaluation-v1.md
    ├── 02-vinylformac-replica/
    │   └── outputs/
    │       ├── gpt-5-codex/
    │       │   ├── run.yaml
    │       │   └── gpt-5-codex.html
    │       ├── gpt-6-astra-xhigh/
    │       │   ├── run.yaml
    │       │   └── gpt-6-astra-xhigh.html
    │       └── kimi-k3/
    │           ├── run.yaml
    │           └── kimi-k3.html
    └── 03-pelican-bicycle/
        ├── outputs/
        │   ├── gpt-5-6-luna/
        │   │   ├── run.yaml
        │   │   └── gpt-5-6-luna.svg
        │   ├── gpt-5-6-sol-max/
        │   │   ├── run.yaml
        │   │   └── gpt-5-6-sol-max.svg
        │   ├── gpt-5-6-terra/
        │   │   ├── run.yaml
        │   │   └── gpt-5-6-terra.svg
        │   └── gpt-6-astra-xhigh/
        │       ├── run.yaml
        │       └── gpt-6-astra-xhigh.svg
        └── evaluations/
            └── evaluation-v1.md
```

## 测试清单

| # | 测试能力 | Prompt | 模型结果 | 评测 |
|---|---|---|---|---|
| 01 | 前端动画 / 视觉特效：一键点火并让火箭升入太空 | [prompt-v1](prompts/01-rocket-launch/prompt-v1.md) | [AGY Gemini](results/01-rocket-launch/outputs/agy-gemini-3-6-flash/agy-gemini-3-6-flash.html) · [Claude](results/01-rocket-launch/outputs/claude-opus-4-8-max/claude-opus-4-8-max.html) · [GPT](results/01-rocket-launch/outputs/gpt-5-6-sol-max/gpt-5-6-sol-max.html) · [Astra XHigh](results/01-rocket-launch/outputs/gpt-6-astra-xhigh/gpt-6-astra-xhigh.html) · [Kimi](results/01-rocket-launch/outputs/kimi-k3/kimi-k3.html) | [evaluation-v1](results/01-rocket-launch/evaluations/evaluation-v1.md) |
| 02 | 网页复刻：一比一还原 vinylformac.com 落地页，含动态小效果 | [prompt-v1](prompts/02-vinylformac-replica/prompt-v1.md) | [GPT-5 Codex](results/02-vinylformac-replica/outputs/gpt-5-codex/gpt-5-codex.html) · [Astra XHigh](results/02-vinylformac-replica/outputs/gpt-6-astra-xhigh/gpt-6-astra-xhigh.html) · [Kimi](results/02-vinylformac-replica/outputs/kimi-k3/kimi-k3.html) | — |
| 03 | SVG 插画生成：一只骑自行车的鹈鹕 | [prompt-v1](prompts/03-pelican-bicycle/prompt-v1.md) | [GPT-5.6 Luna](results/03-pelican-bicycle/outputs/gpt-5-6-luna/gpt-5-6-luna.svg) · [GPT-5.6 Sol Max](results/03-pelican-bicycle/outputs/gpt-5-6-sol-max/gpt-5-6-sol-max.svg) · [GPT-5.6 Terra](results/03-pelican-bicycle/outputs/gpt-5-6-terra/gpt-5-6-terra.svg) · [Astra XHigh](results/03-pelican-bicycle/outputs/gpt-6-astra-xhigh/gpt-6-astra-xhigh.svg) | [evaluation-v1](results/03-pelican-bicycle/evaluations/evaluation-v1.md) |

## 命名规范

| 内容 | 规则 | 示例 |
|---|---|---|
| 测试目录 | `NN-<测试简称>` | `01-rocket-launch` |
| Prompt | `prompt-vN.md` | `prompt-v1.md` |
| 模型目录 | 小写模型标识，可包含推理模式 | `gpt-5-6-sol-max` |
| 运行记录 | 固定使用 `run.yaml` | `outputs/<model>/run.yaml` |
| 评测文件 | `evaluation-vN.md` | `evaluation-v1.md` |

## 查看结果

直接用浏览器打开模型目录中 `run.yaml` 指定的入口文件。多文件产物的 HTML、CSS 和 JavaScript 保存在同一目录，相对引用保持有效。

## 新增测试

1. 在 `prompts/` 下创建测试目录和 `prompt-v1.md`。
2. 在 `results/<测试目录>/outputs/<模型目录>/` 中保存模型原始产物。
3. 在模型目录中添加 `run.yaml`，记录 Prompt、版本、模型和入口文件。
4. 在 `results/<测试目录>/evaluations/` 中创建一份评测 Markdown。
5. 更新本 README 的测试清单。

Agent 修改或扩展本项目时必须遵守 [AGENTS.md](AGENTS.md)。
