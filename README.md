# LLM Capability Lab

一个横向比较大模型能力的实验库：同一版本的 Prompt 交给不同模型独立完成，产物原样保存，再集中评测。

## 在线查看

展示台是纯静态页面，部署在 Vercel，主页面是 [index.html](index.html)：

- **总览**：所有实验卡片，以及“模型 × 实验”得分对照表。分数只在同一实验内可比，不算跨实验总分。
- **实验详情**：顶部是模型收到的完整 Prompt；下方切换模型，按评测时的 1440×900 桌面尺寸或 390×844 手机尺寸缩放预览原始产物，也可以并排比较；再往下是逐项得分、点评和运行记录。
- **待评**：产物已经保存，但还没有正式评分，不代表失败或零分。

本地预览：在项目根目录运行 `python -m http.server 4173`，打开 `http://127.0.0.1:4173/`。

## 核心原则

- Prompt 按 `prompt-vN.md` 版本化，已被结果引用的版本不再修改。
- 不同模型使用相同版本的 Prompt，保证输入一致。
- 模型产物原样保存，不修复、不润色，也不覆盖失败结果。
- 每份结果用 `run.yaml` 记录 Prompt 版本和最小运行信息。
- 每个测试的评测集中写在一份 `evaluation-vN.md`，格式见 [AGENTS.md](AGENTS.md)。

## 目录

| 路径 | 内容 |
|---|---|
| `prompts/<test-id>/prompt-vN.md` | 版本化 Prompt，模型输入的唯一来源 |
| `results/<test-id>/outputs/<model-id>/` | 模型原始产物和 `run.yaml` |
| `results/<test-id>/evaluations/evaluation-vN.md` | 评分标准、分数和结论 |
| `data/experiments.json` | 实验的展示文案（标题、能力标签、观察要点） |
| `data/models.json` | 模型名册：每个模型目录的显示名和厂商 |
| `data/lab.json` | 由脚本生成的展示数据，不要手改 |
| `assets/thumbs/` | 首页卡片缩略图（产物截图，派生文件） |
| `scripts/` | 生成数据和缩略图的脚本 |
| `index.html` · `lab.css` · `lab.js` | 展示台页面 |

## 测试清单

| # | 测试能力 | Prompt | 模型结果 | 评测 |
|---|---|---|---|---|
| 01 | 前端动画：一键点火并让火箭升入太空 | [prompt-v1](prompts/01-rocket-launch/prompt-v1.md) | [Gemini 3.6 Flash](results/01-rocket-launch/outputs/agy-gemini-3-6-flash/agy-gemini-3-6-flash.html) · [Claude Opus 4.8 Max](results/01-rocket-launch/outputs/claude-opus-4-8-max/claude-opus-4-8-max.html) · [GPT-5.6 Sol Max](results/01-rocket-launch/outputs/gpt-5-6-sol-max/gpt-5-6-sol-max.html) · [GPT-6 Astra XHigh](results/01-rocket-launch/outputs/gpt-6-astra-xhigh/gpt-6-astra-xhigh.html) · [Kimi K3](results/01-rocket-launch/outputs/kimi-k3/kimi-k3.html) | [evaluation-v1](results/01-rocket-launch/evaluations/evaluation-v1.md) |
| 02 | 规格执行：一比一还原 vinylformac.com 落地页 | [prompt-v1](prompts/02-vinylformac-replica/prompt-v1.md) | [GPT-5 Codex](results/02-vinylformac-replica/outputs/gpt-5-codex/gpt-5-codex.html) · [GPT-6 Astra XHigh](results/02-vinylformac-replica/outputs/gpt-6-astra-xhigh/gpt-6-astra-xhigh.html) · [Kimi K3](results/02-vinylformac-replica/outputs/kimi-k3/kimi-k3.html) | — |
| 03 | SVG 插画：一只骑自行车的鹈鹕 | [prompt-v1](prompts/03-pelican-bicycle/prompt-v1.md) | [GPT-5.6 Luna](results/03-pelican-bicycle/outputs/gpt-5-6-luna/gpt-5-6-luna.svg) · [GPT-5.6 Sol Max](results/03-pelican-bicycle/outputs/gpt-5-6-sol-max/gpt-5-6-sol-max.svg) · [GPT-5.6 Terra](results/03-pelican-bicycle/outputs/gpt-5-6-terra/gpt-5-6-terra.svg) · [GPT-6 Astra XHigh](results/03-pelican-bicycle/outputs/gpt-6-astra-xhigh/gpt-6-astra-xhigh.svg) | [evaluation-v1](results/03-pelican-bicycle/evaluations/evaluation-v1.md) |

## 新增测试或结果

1. 新测试：在 `prompts/<NN-简称>/` 下创建 `prompt-v1.md`，并在 `data/experiments.json` 登记展示文案。
2. 新结果：把原始产物放进 `results/<test-id>/outputs/<model-id>/`，补上 `run.yaml`。新模型目录要在 `data/models.json` 登记显示名和厂商。
3. 评分：按统一模板写 `results/<test-id>/evaluations/evaluation-vN.md`。
4. 运行 `node scripts/build-data.mjs` 生成 `data/lab.json`。脚本会检查漏登记、入口文件缺失、总分算错等问题，有错会直接报出来。
5. 新测试需要缩略图时运行 `node scripts/capture-thumbs.mjs`（需要本机有 Chrome 或 Edge），然后再跑一次第 4 步。
6. 更新本 README 的测试清单，然后运行 `vercel --prod` 发布（Vercel 项目连接 GitHub 后，推送也会自动部署）。

提交前可以用 `node scripts/build-data.mjs --check` 确认 `data/lab.json` 是最新的。

## 命名规范

| 内容 | 规则 | 示例 |
|---|---|---|
| 测试目录 | `NN-<测试简称>` | `01-rocket-launch` |
| Prompt | `prompt-vN.md` | `prompt-v1.md` |
| 模型目录 | 小写模型标识，可包含推理模式 | `gpt-5-6-sol-max` |
| 运行记录 | 固定使用 `run.yaml` | `outputs/<model>/run.yaml` |
| 评测文件 | `evaluation-vN.md` | `evaluation-v1.md` |

Agent 修改或扩展本项目时必须遵守 [AGENTS.md](AGENTS.md)。
