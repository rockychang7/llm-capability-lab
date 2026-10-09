# LLM Capability Lab

一个横向比较大模型能力的实验库：同一版本的 Prompt 交给不同模型独立完成，产物原样保存，再集中评测。

## 在线查看

展示台是纯静态页面，部署在 Vercel，主页面是 [index.html](index.html)：

- **首页**：实验索引（版本、产物、评测进度、最高分）和“模型 × 实验”得分对照表。分数只在同一实验内可比，不算跨实验总分。
- **实验页**：顶部是模型收到的完整 Prompt，右上角可以切换 Prompt 版本查看历史结果；下面按 1440×900 桌面尺寸或 390×844 手机尺寸缩放预览原始产物，可以单个看，也可以并排看并一键同步重播；再往下是硬性检查、需求覆盖、质量评分、点评和运行记录。
- **待评**：产物已经保存，但还没有正式评分，不代表失败或零分。一个版本的产物全部评完之前不显示名次。

本地预览：在项目根目录运行 `python -m http.server 4173`，打开 `http://127.0.0.1:4173/`。

## 核心原则

- Prompt 按 `prompt-vN.md` 版本化，编号最大的是当前版本；已被结果引用的版本不再修改。
- 不同模型使用相同版本的 Prompt，而且只收到 Prompt 代码块里的原文。
- 模型产物原样保存，不修复、不润色，也不覆盖失败结果。
- 结果按 Prompt 版本分目录存放，升级 Prompt 不需要删除旧结果。
- 每份结果用 `run.yaml` 记录 Prompt 版本、调用渠道、运行工具、能否联网和来回轮数。
- 评分标准在运行模型之前写好，分三层：硬性检查（过 / 不过）、需求覆盖（逐条打勾）、质量评分（0–5 分，每档有标准）。格式见 [AGENTS.md](AGENTS.md)。

## 目录

| 路径 | 内容 |
|---|---|
| `prompts/<test-id>/prompt-vN.md` | 版本化 Prompt，模型输入的唯一来源 |
| `results/<test-id>/vN/outputs/<model-id>/` | 用第 N 版 Prompt 生成的原始产物和 `run.yaml` |
| `results/<test-id>/vN/evaluation.md` | 第 N 版的评分标准、分数和结论 |
| `data/experiments.json` | 实验的展示文案（标题、能力标签、观察要点），描述当前版本 |
| `data/models.json` | 模型名册：每个模型目录的显示名和厂商 |
| `data/lab.json` | 由脚本生成的展示数据，不要手改 |
| `assets/thumbs/` | 网页产物的缩略图（派生文件） |
| `scripts/` | 生成数据和缩略图的脚本 |
| `index.html` · `lab.css` · `lab.js` | 展示台页面 |

## 测试清单

| # | 测试能力 | 当前 Prompt | 历史 Prompt | 模型结果 | 评测 |
|---|---|---|---|---|---|
| 01 | 前端动画：照着详细需求，做一次从点火到入轨的火箭发射 | [prompt-v2](prompts/01-rocket-launch/prompt-v2.md) | [prompt-v1](prompts/01-rocket-launch/prompt-v1.md) | [Claude Opus 5.5 High](results/01-rocket-launch/v2/outputs/claude-opus-5-5-high/claude-opus-5-5-high.html) · [Claude Opus 5.5 Extra High](results/01-rocket-launch/v2/outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.html) · [GPT 6.1 Sol Extra High](results/01-rocket-launch/v2/outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.html) | [评测 v2](results/01-rocket-launch/v2/evaluation.md)（全部已评） |
| 02 | SVG 动画：骑自行车的加州褐鹈鹕（进阶版 + 动画） | [prompt-v2](prompts/02-pelican-bicycle/prompt-v2.md) | [prompt-v1](prompts/02-pelican-bicycle/prompt-v1.md) | [Claude Opus 5.5 High](results/02-pelican-bicycle/v2/outputs/claude-opus-5-5-high/claude-opus-5-5-high.svg) · [Claude Opus 5.5 Extra High](results/02-pelican-bicycle/v2/outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.svg) · [GPT 6.1 Sol Extra High](results/02-pelican-bicycle/v2/outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.svg) | [评测 v2](results/02-pelican-bicycle/v2/evaluation.md)（全部已评） |

v1 的旧结果和评测已从当前版本中移除，需要时可以在 git 历史（提交 `8917597` 及以前）里找到。

## 新增测试或结果

1. 新测试：在 `prompts/<NN-简称>/` 下创建 `prompt-v1.md`，并在 `data/experiments.json` 登记展示文案。
2. 跑模型之前：在 `results/<test-id>/vN/evaluation.md` 写好评分标准（维度、权重、档位，长需求再加需求清单和硬性检查）。
3. 跑模型：只把当前 Prompt 代码块里的原文发给模型，最好在空目录或全新对话里运行。把原始产物放进 `results/<test-id>/vN/outputs/<model-id>/`，补上 `run.yaml`。新模型目录要在 `data/models.json` 登记显示名和厂商。
4. 评分：一批产物全部看完后，在同一份 `evaluation.md` 里填硬性检查、需求清单、评分结果、点评和结论。
5. 运行 `node scripts/build-data.mjs` 生成 `data/lab.json`。脚本会检查漏登记、版本对不上、入口文件缺失、总分或需求清单合计算错等问题，有错会直接报出来。
6. 有网页产物时运行 `node scripts/capture-thumbs.mjs`（需要本机有 Chrome 或 Edge）生成缩略图，然后再跑一次第 5 步。
7. 更新本 README 的测试清单，然后运行 `vercel --prod` 发布（Vercel 项目连接 GitHub 后，推送也会自动部署）。

升级 Prompt 时新建 `prompt-v(N+1).md` 和 `results/<test-id>/v(N+1)/`，旧版本目录原样保留，页面会自动把新版本当作当前版本。

提交前可以用 `node scripts/build-data.mjs --check` 确认 `data/lab.json` 是最新的。

## 命名规范

| 内容 | 规则 | 示例 |
|---|---|---|
| 测试目录 | `NN-<测试简称>` | `01-rocket-launch` |
| Prompt | `prompt-vN.md` | `prompt-v2.md` |
| 结果版本目录 | `vN`，和 Prompt 版本一致 | `results/01-rocket-launch/v2/` |
| 模型目录 | 小写模型标识，可包含推理模式 | `gpt-5-6-sol-max` |
| 运行记录 | 固定使用 `run.yaml` | `outputs/<model>/run.yaml` |
| 评测文件 | 每个版本一份 `evaluation.md` | `v2/evaluation.md` |

Agent 修改或扩展本项目时必须遵守 [AGENTS.md](AGENTS.md)。
