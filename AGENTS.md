# Agent Instructions

## 项目目标

同一版本 Prompt 给不同模型独立生成，比较原始产物。可比性、来源诚实和原始记录比修复结果重要。

## 目录职责

- `prompts/<test-id>/prompt-vN.md`：唯一模型输入，编号最大为当前版本。
- `results/<test-id>/vN/outputs/<model-id>/`：原始产物与完整 `run.yaml`。
- `results/<test-id>/vN/evaluation.md`：每版本唯一正式标准和记录，不另建正式 schema、review、evidence 或 summary 文档。
- `README.md`：项目说明与测试索引，不复制 Prompt 正文或详细评测。
- `data/experiments.json`：当前版本展示文案；`data/models.json`：显示名与厂商。
- `data/lab.json`：通过 `node scripts/build-data.mjs` 生成，禁止手改。
- `assets/thumbs/`、`assets/evidence/`：派生缩略图及统一真实浏览器媒体，不是模型生成产物。
- `test-results/`：忽略提交的诊断、临时 AI 评审材料与测试截图。
- `.local/`：本地预览的评价数据库和 Cookie 签名密钥，禁止发布或提交。

## 必须遵守

1. 不创建 Prompt YAML 元数据。正常 Prompt 变更新建下一版本，不修改已被引用版本；旧结果保留原目录，不挪到新版本。
2. **明确授权的基线例外**：2026-10-11 原进阶 v2 改为新 v1，旧基础 v1 与全部旧评分从当前仓库删除，结果和缩略图一起迁移。只同步 `prompt_version`；原进阶 Prompt 输入与产物字节不变。不为已删除旧评分重建兼容展示。
3. 默认只使用编号最大的 Prompt，只把唯一 `text` 围栏代码块原样发送给模型，不发送版本说明、测试能力、来源或评测。推荐空目录 / 全新会话；在本仓库生成时，被测模型落盘前只能读取该 Prompt 与本文件，不能看其他产物或评测。
4. 原始 HTML、CSS、JS、SVG、资源和文本必须原样保存，失败也是有效结果。验收不得修改产物以通过检查。
5. 每结果必须完整 `run.yaml`，不确定写 `unknown`，不能根据目录或提交时间猜测。第二次运行时把原结果整体移到 `run-01/`，新结果放 `run-02/`，不覆盖；更新全部链接。
6. 新标准运行模型前冻结。现有产物迁移明确注明事后冻结；验收开始后不改方法或维度。确需改标准，先冻结新标准再统一重评，不重新标注旧指纹记录。
7. 新模型必须登记 `data/models.json` 的显示名和 `vendor`。页面仅从生成数据读取，不在 `lab.js` 写死模型或结论。
8. 新增 Prompt、结果或评测更新 README 索引，运行 build 与完整检查。有错误先修复再提交。

## run.yaml

```yaml
prompt: 01-rocket-launch
prompt_version: 1
provider: openai
model: gpt-5-6
mode: sol-max
harness: codex-cli
web_access: no
turns: 1
generated_at: 2026-10-08
entrypoint: gpt-5-6-sol-max.html
```

字段一个不能少，只有确有复现需要才扩展。`prompt_version` 与 `vN` 一致；`provider` 为实际调用渠道，不是厂商；`model` 为渠道原标识；`harness` 必须记录实际运行工具；`web_access` 仅 `yes/no/unknown`；`turns` 为实际正整数或 `unknown`。不能改写运行日期把迁移冒充新生成。

## 评测协议 4

```markdown
# NN · 测试名：评测（Prompt vN）

- **Prompt**：[prompt-vN.md](../../../prompts/<test-id>/prompt-vN.md)
- **评测协议**：4
- **标准冻结日期**：YYYY-MM-DD（现有产物明确事后冻结）
- **评测日期**：未评测
- **评测者**：尚未登记
- **评测方式**：AI 功能评分 + 用户粗粒度主观评分，按本实验权重合成
- **评测环境**：实际环境及未测边界

## 协议说明

…

## 评分维度

| ID | 名称 | 来源 | 权重 | 评分标准 |
|---|---|---|---|---|
| function | 功能实现 | ai | 70 | 功能项完成比例乘 5 |
| ui | UI 效果 | human | 15 | 1 很差至 5 很好，整体界面观感 |
| overall | 整体效果 | human | 15 | 1 很差至 5 很好，整体主观体验 |

## 功能标准

| ID | 评分维度 | 要求 | 怎么查 |
|---|---|---|---|
| runnable | function | 可运行 | 真实运行并检查错误 |

## 浏览器证据

（json 围栏，初始 []）

## 功能检查证据

（json 围栏，初始 []）

## AI 功能评分

（json 围栏，初始 []）

## AI 评审

（json 围栏，初始 []）

## 用户评价

（json 围栏，初始 []）

## 评测结论

尚无实际评分，不补造结论。
```

每个记录章节使用一个 `json` 围栏数组。ID 为唯一小写连字符标识，不再使用匿名、成对比较、人工逐项验收或封存。旧评分不兼容展示。

- Agent 每个实验单独划分功能维度、人工维度、权重及判断依据，并在评分前冻结。维度来源仅 `ai/human`，权重为正整数、合计 100；必须同时有 AI 和人工维度。人工仅 1–3 个整体维度，推荐两个，不把细节清单转嫁给用户。
- 可功能性判断的项目全部归 AI。脚本、源码、截图和录像只是证据，不直接冒充实际 AI 判断。无真实评审则待评，不自动填模板或伪造评审模型。
- AI 完整覆盖全部产物、功能标准及桌面 / 手机；每项含 `key,id,viewport,status,evidence,refs`。批次含实际 `reviewer,model,id,at,hashes,fingerprint,experiment,version,protocol,source`，导入后生成评分记录。`pass/partial/fail` 对应 `1/0.5/0`；`pending` 是缺失，不是零分。每位 AI 取两个视口较低值，多位评审各自最新判断等权平均；同维度功能项等权，比例乘 5。
- AI 使用原始源码与真实运行证据；动态要求需观察时序，不以成功提示或静态截图代替。引用必须匹配产物、视口、采集时间和媒体指纹。改标准后允许复用未变的媒体，但保留原采集指纹，不把旧结论改标签当新分数。
- 每个用户可单独评价一份产物，仅填写公开昵称、整体维度 1–5 分，评论选填。服务端生成参与标识、日期和递增修订号；同一浏览器对同一产物只计最新评价，改昵称或视口不增加票数。展示均值和有效数量，不伪装人类评价。
- 参与标识不认证真实身份；清除 Cookie 或换设备可能重复计入，禁止宣称一人一票、严格盲测或数字签名。
- 综合分 = Σ（维度分 ÷ 5 × 权重），满分 100。AI / 人工分别按各自权重归一到 100；任一功能维度缺分或无人评价时综合分待评，不补默认值、不重分配权重。只比较同实验同版本，不做跨实验总榜。
- 标准、Prompt 和产物指纹绑定新评分。`evaluation.md` 是正式标准与已归档评测唯一来源；线上数据库保存实时公开用户提交，不另建正式评测文档，校验后可归档回同一文件。
- 生产评价必须有持久化数据库；缺配置时明确服务不可用、保留浏览器草稿，不把本地保存冒充线上提交。密钥仅服务端使用，不发布 `.local/`、`.env` 或服务器源代码。

## 工具与验证

1. `npm run build` 生成展示数据与发布目录。
2. `node scripts/verify-artifacts.mjs --write` 真实运行、录像、截图并追加脚本及浏览器证据；旧协议记录不能改标签复用。
3. `npm run prepare-ai` 生成公开产物身份、标准、实际证据和空白响应模板，不包含旧分数或其他评审判断。
4. `node scripts/import-ai.mjs <响应.json> [--write]` 校验完整 AI 批次并导入，不需要 mapping。
5. 网站用户提交直接写评价 API。`node scripts/import-review.mjs <服务端评价或数组.json> [--write]` 校验后归档，禁止导入测试 fixture 或伪造人工评价。
6. 修改后运行 `npm run build`、`npm test`、`npm run test:ui`、`npm run check`，确认原始 Prompt 输入与 `outputs/` 产物无变更（基线例外只允许版本路径和 run.yaml 编号迁移）。

真实评审不可用时诚实保留待评；测试 fixture 不能写入正式评测。最后运行本地预览、检查桌面 / 手机、实际提交持久化及真实 SVG/Canvas 像素。
