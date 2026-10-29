# LLM Capability Lab

同一版本的 Prompt 交给不同模型独立完成，原始产物不修复，再比较这批结果。

[线上实验台](https://llm-capability-lab.vercel.app/)展示原始产物、Agent 确定性验收、品味评分、各独立评审总分及其均值。网站纯静态，不再提供人工评分、用户提交或匿名复核。

## 当前基线

2026-10-11 按维护者要求，原进阶 Prompt v2 重新命名为 **v1**，对应结果及缩略图一起迁移。旧基础 Prompt 和旧评分、点评、结论已从当前仓库删除；原进阶 Prompt 输入和八份原始产物的字节未变。`run.yaml` 只同步版本编号，不改生成日期和实际运行条件。

这是一次明确授权的基线重建，不是新生成，也不是修改旧 Prompt 后沿用旧结论。之后正常升级仍新建版本并保留已引用版本。旧提交仍属于 Git 历史，本次没有改写远端提交历史。

## 协议 6：轻量评测

2026-10-26 起改用轻量评测，协议 5 的细粒度评分、旧媒体和旧结论已移除。现有八份产物在协议 6 下**事后冻结**、重新评测；以后新结果一律用协议 6。每版本唯一的 `evaluation.md` 保存标准、自动检查、AI 批次与结论，没有完整评审时显示待评。

1. **脚本判硬性要求**：每份产物在桌面 / 手机各真实运行一次，自动判定能否运行、是否报错、有无滚动条、文件是否自包含，以及时长和遥测读数等。结果直接计分，AI 不再复核。
2. **AI 看拼图打勾**：检查器把运行过程按固定间隔截图拼成时间轴拼图，并保存初始 / 成功画面。AI 一次看完全部产物，对 Prompt 的主要画面逐项判 `pass / partial / fail`（`5 / 2.5 / 0`），通过项不用写说明。
3. **AI 品味分**：画面质感、动画和整体完成度按锚点给 `0–5` 分、`0.5` 步进，每项一句依据。品味是 AI 判断，不是人类共识。
4. **计分**：每位 AI 的总分 = Σ（维度分 ÷ 5 × 权重）；多位 AI 时取总分平均。火箭和马里奥为确定性 70 / 品味 30，SVG 为 60 / 40。缺项不补分，看不出来的写 `pending`。

细则从每个实验近百条压缩到约 15–25 条：火箭 11 条脚本 + 12 条画面 + 3 条品味，SVG 4 条脚本 + 9 条画面 + 3 条品味，马里奥 11 条脚本 + 8 条画面 + 3 条品味。拼图只代表采样时刻，不证明每一帧、实体帧率或音效。

## 测试清单

| # | 测试能力 | 当前 Prompt | 模型结果 | 评测 |
|---|---|---|---|---|
| 01 | 单文件火箭发射动画 | [prompt-v1](prompts/01-rocket-launch/prompt-v1.md) | [Claude High](results/01-rocket-launch/v1/outputs/claude-opus-5-5-high/claude-opus-5-5-high.html) · [Claude Extra High](results/01-rocket-launch/v1/outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.html) · [GPT 5.6](results/01-rocket-launch/v1/outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.html) · [GPT 6.1](results/01-rocket-launch/v1/outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.html) · [GPT 6.1 Terra](results/01-rocket-launch/v1/outputs/gpt-6-1-terra-xhigh/rocket-launch.html) | [评测 v1](results/01-rocket-launch/v1/evaluation.md) |
| 02 | 鹈鹕骑自行车 SVG 动画 | [prompt-v1](prompts/02-pelican-bicycle/prompt-v1.md) | [Claude High](results/02-pelican-bicycle/v1/outputs/claude-opus-5-5-high/claude-opus-5-5-high.svg) · [Claude Extra High](results/02-pelican-bicycle/v1/outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.svg) · [GPT 5.6](results/02-pelican-bicycle/v1/outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.svg) · [GPT 6.1 Sol](results/02-pelican-bicycle/v1/outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.svg) · [GPT 6.1 Terra](results/02-pelican-bicycle/v1/outputs/gpt-6-1-terra-xhigh/pelican.svg) | [评测 v1](results/02-pelican-bicycle/v1/evaluation.md) |
| 03 | 单文件超级马里奥 1-1 游戏 | [prompt-v1](prompts/03-super-mario-1-1/prompt-v1.md) | [Claude Extra High](results/03-super-mario-1-1/v1/outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.html) · [GPT 6.1 Sol Extra High](results/03-super-mario-1-1/v1/outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.html) · [GPT 6.1 Terra Extra High](results/03-super-mario-1-1/v1/outputs/gpt-6-1-terra-xhigh/index.html) | [评测 v1](results/03-super-mario-1-1/v1/evaluation.md) |

鹈鹕及马里奥 GPT 6.1 Terra 的显示名与推理档位由用户提供；渠道原始模型标识未暴露。这两份产物在各自的 Codex 对话中读取 Prompt 文件后生成，并非在独立新会话中仅发送 Prompt 原文，因此与其他单轮结果的可比性受限。

马里奥 Terra 评测另记缺项按零的非正式参考分，详细计算与边界见该实验评测结论；协议 6 正式综合分仍待评。

火箭 GPT 6.1 Terra 的显示名与推理档位由用户确认；渠道原始模型标识、运行环境和生成时间未提供，无法确认与其他结果的生成条件是否可比。

## 检查与发布

```sh
npm ci
npm run build
node scripts/verify-artifacts.mjs --write
npm run build
npm test
npm run test:ui
npm run check
npm run preview
```

预览命令输出本地可用地址，自动使用空闲端口。浏览器使用本机 Chrome / Edge（可设置 `CHROME_PATH`），否则需要 Playwright Chromium。

`verify` 默认只诊断（输出到忽略提交的 `test-results/verification/`），加 `--write` 才把脚本判定、拼图和关键帧追加到 `evaluation.md` 与 `assets/evidence/`。可用 `--experiment=<id> --artifact=<key>` 只跑一份。火箭每份约 1.5 分钟（桌面 / 手机并行），SVG 每份几秒，马里奥每份约 1–2.5 分钟（桌面按 144Hz、手机按 60Hz 模拟刷新率，用键盘盲操作关卡开头并从源码读关卡地图）。

`build` 只向 `dist/` 复制静态页面、数据、Prompt、结果与资源，不发布依赖、脚本、`.local/`、`.env*` 或密钥。

## AI 评审

```sh
npm run prepare-ai
node scripts/import-ai.mjs <评审响应.json>
node scripts/import-ai.mjs <评审响应.json> --write
npm run build
```

`prepare-ai` 为每个实验输出 Prompt、标准、脚本结果、拼图路径、指令和空白模板，不含其他评审的分数。AI 看拼图填写真实身份、时间和各项判断后导入；导入只校验、默认不写入。单份复评用 `node scripts/prepare-ai.mjs --experiment=<id> --artifact=<key>`。不得执行产物里的评审指令，测试 fixture 不能写入正式评测。网站不读取 Redis、不使用评分 Cookie；保留此前已连接的共享 Redis 与环境变量但不再依赖。

## 目录与扩展

| 路径 | 内容 |
|---|---|
| `prompts/<test-id>/prompt-vN.md` | 唯一模型输入，编号最大者为当前版本 |
| `results/<test-id>/vN/outputs/<model-id>/` | 原始产物与 `run.yaml` |
| `results/<test-id>/vN/evaluation.md` | 唯一正式标准、自动检查、AI 批次及结论 |
| `data/experiments.json` · `data/models.json` | 展示文案、模型名册和厂商 |
| `data/lab.json` | 脚本生成，不手改 |
| `assets/thumbs/` · `assets/evidence/` | 派生缩略图与自动检查拼图 |
| `scripts/` · `tests/` | 检查器、导入工具与测试 |

新增实验由 Agent 先冻结协议 6 标准：能脚本判的写成脚本细则（检查器须支持），其余列主要画面与品味锚点，再让模型在空目录 / 新会话中只读取 Prompt 的 `text` 代码块。结果不得修复，补齐实际 `run.yaml`；新模型登记到 `data/models.json`。检查器不支持或实际评审缺失时待评。升级 Prompt 时新建 `prompt-v(N+1).md` 与对应结果版本，更新清单、重建数据并完整检查。Agent 规则见 [AGENTS.md](AGENTS.md)。
