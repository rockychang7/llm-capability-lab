# Agent Instructions

## 项目目标

本项目使用同一版本的 Prompt，让不同大模型独立生成结果，再比较原始产物质量。可比性和原始记录比修复结果更重要。

## 目录职责

- `prompts/<test-id>/prompt-vN.md`：版本化 Prompt，是模型输入的唯一来源。
- `results/<test-id>/outputs/<model-id>/`：模型原始产物和对应的 `run.yaml`。
- `results/<test-id>/evaluations/evaluation-vN.md`：该测试的评分标准、分数和结论。
- `README.md`：只维护项目说明和测试索引，不复制 Prompt 正文或详细评测内容。
- `data/experiments.json`：实验展示文案；`data/models.json`：模型目录的显示名和厂商。
- `data/lab.json`：由 `node scripts/build-data.mjs` 生成，禁止手改。

## 必须遵守的规则

1. 不要为 Prompt 创建 YAML 元数据文件。Prompt 变更时新建下一个 `prompt-vN.md`，不要修改已被结果引用的版本。
2. 生成新模型结果时，只读取所选 Prompt 和本文件；在结果落盘前不要查看其他模型产物或现有评测，避免受到已有答案影响。
3. 模型产物必须原样保存。即使存在错误，也不要修改 HTML、CSS、JavaScript、文本或资源来改善结果。
4. 每个模型结果目录必须包含 `run.yaml`，最少记录 `prompt`、`prompt_version`、`provider`、`model`、`mode`、`generated_at` 和 `entrypoint`。
5. 不确定的运行信息写 `unknown`，不要根据目录名或提交时间猜测。
6. 首次运行直接保存在模型目录。出现第二次运行时，不要覆盖旧结果；把原结果整体移入 `run-01/`，新结果放入 `run-02/`，并更新 README 和评测文件中的链接。
7. 评测默认集中写入一份 `evaluation-vN.md`。没有明确需求时，不要拆分出额外的 schema、review、evidence 或 summary 文件。
8. 评分只能修改评测文件，不能为了通过评测而修改模型产物。模型自身的失败也属于有效结果，应如实记录。
9. 新增 Prompt、结果或评测后，同步更新根 `README.md` 中的测试清单和链接，并运行 `node scripts/build-data.mjs`，脚本报错必须修正后再提交。
10. 新模型目录必须在 `data/models.json` 登记显示名和 `vendor`（模型厂商）。展示页只从生成数据读取，不在 `lab.js` 里手写模型或分数。

## `run.yaml` 格式

```yaml
prompt: 01-rocket-launch
prompt_version: 1

provider: openai
model: gpt-5-6
mode: sol-max

generated_at: unknown
entrypoint: gpt-5-6-sol-max.html
```

字段保持精简。只有在实际工作需要记录新的可复现信息时才增加字段。

- `provider`：实际调用模型的渠道或平台（如 `openai`、`anthropic`、`github-copilot`），不是模型厂商；厂商写在 `data/models.json`。
- `model`：渠道里显示的模型标识，原样记录。
- `mode`：推理档位或运行模式，没有就写 `unknown`。

## 评测文件格式

`evaluation-vN.md` 必须使用以下结构，`scripts/build-data.mjs` 会解析并校验：

```markdown
# NN · 测试名：评测 vN

- **Prompt**：[prompt-vN.md](../../../prompts/<test-id>/prompt-vN.md)
- **评测日期**：YYYY-MM-DD 或 unknown
- **评测方式**：…
- **评测环境**：…

## 评分维度

（评分规则说明，可选）

| 维度 | 关注点 | 满分 | 权重 |
|---|---|---:|---:|
| 维度 A | … | 5 | 40 |

## 评分结果

| 模型 | 维度 A | … | 总分 |
|---|---:|---:|---:|
| [显示名](../outputs/<model-id>/<entrypoint>) | 4 | … | 88 |

**待评估**：尚未评分的结果链接（可选）。

## 模型点评

### [显示名](../outputs/<model-id>/<entrypoint>)

**优点**

- …

**不足**

- …

## 评测结论

…
```

- 权重合计必须为 100；总分 = Σ(维度得分 ÷ 满分 × 权重)，脚本会核对。
- 评分行和点评标题必须链接到产物文件，脚本靠链接对应结果目录。
- 没评分的结果不要写进评分表，页面会显示“待评”。
