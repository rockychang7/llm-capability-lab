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
- `.local/`、`.env*`：旧本地数据及私密配置，禁止发布或提交；当前静态评分不再使用评价数据库。

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

## 评测协议 5

```markdown
# NN · 测试名：评测（Prompt vN）

- **Prompt**：[prompt-vN.md](../../../prompts/<test-id>/prompt-vN.md)
- **评测协议**：5
- **标准冻结日期**：YYYY-MM-DD（现有产物明确事后冻结）
- **评测日期**：未评测
- **评测者**：尚未登记
- **评测方式**：纯 Agent 确定性验收与品味评分，完整评审总分等权平均
- **评测环境**：实际环境及未测边界

## 协议说明

…

## 评分维度

| ID | 名称 | 类型 | 权重 | 评分标准 |
|---|---|---|---|---|
| function | 功能实现 | objective | 70 | 细则 pass / partial / fail 对应 5 / 2.5 / 0 |
| visual | 视觉品味 | taste | 30 | 0–5 分、0.5 步进；具体锚点和优缺点 |

## 评分细则

| ID | 评分维度 | 要求 | 怎么查 |
|---|---|---|---|
| runnable | function | 可运行 | 真实运行并检查错误 |
| composition | visual | 构图与主体层次 | 低分：拥堵失衡；3：清楚但普通；5：焦点稳定、空间和细节精致；逐项写优缺点 |

## 浏览器证据

（json 围栏，初始 []）

## 功能检查证据

（json 围栏，初始 []）

## AI 评分

（json 围栏，初始 []）

## AI 评审

（json 围栏，初始 []）

## 评测结论

尚无实际评分，不补造结论。
```

每个记录章节使用一个 `json` 围栏数组。ID 为唯一小写连字符标识。协议 5 完全删除人工评分、用户提交、匿名复核和成对比较；旧评分不兼容展示。

- 每个实验由 Agent 单独划分细粒度确定性与品味维度、正整数权重及检查依据，在评分前冻结；`kind` 仅 `objective/taste`，必须包含两类，合计 100。品味细则须有具体锚点，不仅一个笼统总印象。
- 确定性项 `pass/partial/fail` 对应 `score: 5/2.5/0`。`partial` 必须说明可观察的部分完成，不能用来代替不确定。品味项 `status: scored`，`score` 为 0–5、0.5 步进。两类未观察都写 `pending`、`score: null`；无真实评审不自动填模板，不伪造模型身份。
- 每批可覆盖一份或多份产物；所选产物须完整覆盖全部细则及桌面 / 手机，每项含 `key,id,viewport,status,score,evidence,refs`。批次含实际 `reviewer,model,id,at,hashes,fingerprint,experiment,version,protocol,source`，`source` 只能 `ai`。评分记录必须与真实批次逐项一致。
- 使用原始源码与真实运行证据；动态要求检查录像或真实时间序列，不以成功提示、静态成品或源码意图替代。引用须匹配产物、视口、采集时间和媒体指纹，非 pending 至少有一个本视口引用；可附同产物 DPR / 减少动态证据。媒体可在新标准下复用但不改采集指纹，旧判断不能重标。
- 每位评审对确定性细则取两视口较低分、品味细则取均值；同维度细则等权。完整评审总分 = Σ（维度分 ÷ 5 × 权重）。最后对各评审未经中间舍入的总分等权算术平均，展示一位小数；确定性 / 品味分别按自己的权重归一到 100。
- 每个 `reviewer + model` 对每份产物只计最新完整批次；同一时间按批次 ID 字典序确定最新。未完成批次明确列缺项且不计均分，不覆盖旧完整评分；无完整评审则待评，不补零、不补中间分、不重新分配权重。复评可只评一个结果，不必重评整个实验。
- 各评审可使用同一模型，登记实际独立 Agent 身份，不能冒称多模型共识。运行环境未暴露模型原标识时明确记录 `inherited-parent-unreported`，不得猜测。品味是 AI 判断，不宣称人类共识、客观真理或永久模型能力；只比较同实验同版本，不做跨实验总榜。
- `evaluation.md` 是唯一正式标准、证据、AI 批次与结论来源。网站纯静态展示，不调用评分 API、不提交评价、不读取 Redis、不暴露模型密钥。保留已有共享数据库连接，不因移除人工功能删除共享数据；私密目录与配置继续禁止发布。

## 工具与验证

1. `npm run build` 生成展示数据与发布目录。
2. `node scripts/verify-artifacts.mjs --write` 真实运行、录像、截图并追加脚本及浏览器证据；旧协议记录不能改标签复用。
3. `npm run prepare-ai` 生成公开产物身份、标准、实际证据和空白响应模板，不包含旧分数或其他评审判断。
4. `node scripts/import-ai.mjs <响应.json> [--write]` 校验完整 AI 批次并导入，不需要 mapping。
5. 单结果复评使用 `node scripts/prepare-ai.mjs --experiment=<test-id> --artifact=<key>`；独立 Agent 不看其他评审的分数，真实观察后生成新批次再导入。禁止将测试 fixture 写入正式评测。
6. 修改后运行 `npm run build`、`npm test`、`npm run test:ui`、`npm run check`，确认原始 Prompt 输入与 `outputs/` 产物无变更（基线例外只允许版本路径和 run.yaml 编号迁移）。

真实评审不可用时诚实保留待评。最后运行静态本地预览，检查桌面 / 手机、真实 SVG/Canvas 像素、分数与有效 Agent 数、细项证据，并确认没有人工入口或 API 请求。
