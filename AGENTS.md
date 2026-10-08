# Agent Instructions

## 项目目标

本项目使用同一版本的 Prompt，让不同大模型独立生成结果，再比较原始产物质量。可比性和原始记录比修复结果更重要。

## 目录职责

- `prompts/<test-id>/prompt-vN.md`：版本化 Prompt，是模型输入的唯一来源。编号最大的版本就是当前版本，脚本自动识别。
- `results/<test-id>/vN/outputs/<model-id>/`：用 `prompt-vN.md` 生成的模型原始产物和对应的 `run.yaml`。
- `results/<test-id>/vN/evaluation.md`：`prompt-vN.md` 这一版的评分标准、分数和结论。
- `README.md`：只维护项目说明和测试索引，不复制 Prompt 正文或详细评测内容。
- `data/experiments.json`：实验展示文案，描述的是当前版本；`data/models.json`：模型目录的显示名和厂商。
- `data/lab.json`：由 `node scripts/build-data.mjs` 生成，禁止手改。
- `assets/thumbs/`：网页产物的缩略图，由 `node scripts/capture-thumbs.mjs` 生成。

## 必须遵守的规则

1. 不要为 Prompt 创建 YAML 元数据文件。Prompt 变更时新建下一个 `prompt-vN.md`，不要修改已被结果引用的版本。旧版本的结果和评测留在原来的 `vN/` 目录里，不要删除，也不要挪到新版本下。
2. 生成新模型结果时，默认使用该测试编号最大的 `prompt-vN.md`，并且只把文件里 ```` ```text ```` 代码块中的内容原样发给被测模型；版本号、变更说明、测试能力、来源链接都不能发。推荐在空目录或全新对话里运行，再把产物复制进 `results/`。如果必须在本仓库里运行，被测 agent 在结果落盘前只能读取所选 Prompt 和本文件，不要查看其他模型产物或现有评测，避免受到已有答案影响。
3. 模型产物必须原样保存。即使存在错误，也不要修改 HTML、CSS、JavaScript、SVG、文本或资源来改善结果。
4. 每个模型结果目录必须包含 `run.yaml`，字段见下文，一个都不能少。
5. 不确定的运行信息写 `unknown`，不要根据目录名或提交时间猜测。
6. 首次运行直接保存在模型目录。出现第二次运行时，不要覆盖旧结果；把原结果整体移入 `run-01/`，新结果放入 `run-02/`，并更新 README 和评测文件中的链接。
7. 每个 Prompt 版本只有一份 `evaluation.md`，评分标准要在运行模型之前写好。没有明确需求时，不要拆分出额外的 schema、review、evidence 或 summary 文件。
8. 评分只能修改评测文件，不能为了通过评测而修改模型产物。模型自身的失败也属于有效结果，应如实记录。开始评分后不要再改维度、权重和档位；确实要改，先改标准，再把已评的结果全部重评。
9. 新增 Prompt、结果或评测后，同步更新根 `README.md` 中的测试清单和链接，并运行 `node scripts/build-data.mjs`，脚本报错必须修正后再提交。
10. 新模型目录必须在 `data/models.json` 登记显示名和 `vendor`（模型厂商）。展示页只从生成数据读取，不在 `lab.js` 里手写模型或分数。

## `run.yaml` 格式

```yaml
prompt: 01-rocket-launch
prompt_version: 2

provider: openai
model: gpt-5-6
mode: sol-max
harness: codex-cli
web_access: no
turns: 1

generated_at: 2026-10-08
entrypoint: gpt-5-6-sol-max.html
```

字段保持精简。只有在实际工作需要记录新的可复现信息时才增加字段。

- `prompt_version`：必须和所在的 `vN/` 目录一致。
- `provider`：实际调用模型的渠道或平台（如 `openai`、`anthropic`、`github-copilot`），不是模型厂商；厂商写在 `data/models.json`。
- `model`：渠道里显示的模型标识，原样记录。
- `mode`：推理档位或运行模式，没有就写 `unknown`。
- `harness`：用什么工具跑的，如 `web-chat`、`api`、`claude-code`、`codex-cli`、`antigravity`。编程助手能自己打开浏览器检查和反复修改，网页对话不能，所以必须记录。
- `web_access`：生成时模型能否上网，只能是 `yes`、`no` 或 `unknown`。
- `turns`：一共来回了几轮（只发 Prompt、一次拿到结果就是 `1`），不清楚写 `unknown`。

## 评测文件格式

`results/<test-id>/vN/evaluation.md` 必须使用以下结构，`scripts/build-data.mjs` 会解析并校验：

```markdown
# NN · 测试名：评测（Prompt vN）

- **Prompt**：[prompt-vN.md](../../../prompts/<test-id>/prompt-vN.md)
- **评测日期**：YYYY-MM-DD；还没评时写“未评测”
- **评测者**：谁打的分（人名、角色或辅助打分的模型）
- **评测方式**：…
- **评测环境**：…

## 评分维度

（评分规则说明）

| 维度 | 关注点 | 满分 | 权重 |
|---|---|---:|---:|
| 需求覆盖 | 按需求清单逐条记分 | 34 | 40 |
| 维度 B | … | 5 | 60 |

### 评分档位

**维度 B**

- 1：…
- 2：…
- 3：…
- 4：…
- 5：…

## 硬性检查

| 检查项 | 怎么查 | [显示名](outputs/<model-id>/<entrypoint>) |
|---|---|---|
| 单个文件 | … | 通过 |
| 跑完全程 | … | 不通过：原因 |

## 需求清单

| # | 章节 | 要求 | [显示名](outputs/<model-id>/<entrypoint>) |
|---:|---|---|---:|
| 1 | 火箭 | … | 1 |
| 2 | 火箭 | … | 0.5 |

## 评分结果

| 模型 | 需求覆盖 | 维度 B | 总分 |
|---|---:|---:|---:|
| [显示名](outputs/<model-id>/<entrypoint>) | 30.5 | 4 | 84 |

## 模型点评

### [显示名](outputs/<model-id>/<entrypoint>)

**优点**

- …

**不足**

- …

## 评测结论

…
```

- 权重合计必须为 100；总分 = Σ(维度得分 ÷ 满分 × 权重)，脚本会核对。
- 评分档位、硬性检查、需求清单都是可选章节；Prompt 很短时可以不写需求清单。
- 硬性检查和需求清单的前几列是标准本身，之后每个结果占一列，表头链接到产物。硬性检查写“通过”或“不通过：原因”，需求清单写 1（做到）、0.5（部分做到）或 0（没做到），没检查的留空或写 —。
- 有需求清单时，名为“需求覆盖”的维度满分必须等于清单条数，每个结果的“需求覆盖”得分必须等于它在清单里的合计，脚本会核对。
- 评分行、点评标题和表头必须链接到产物文件，脚本靠链接对应结果目录；链接相对于评测文件，写成 `outputs/<model-id>/…`。
- 没评分的结果不要写进评分表，页面会显示“待评”。一个版本的结果全部评完之前，页面不显示名次。
