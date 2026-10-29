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
- `assets/thumbs/`、`assets/evidence/`：派生缩略图及自动检查拼图 / 关键帧，不是模型生成产物。
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

## 评测协议 6（轻量）

2026-10-26 按维护者要求，协议 5 的细粒度评分、旧批次、旧媒体与旧结论全部移除，不兼容展示；现有产物在协议 6 下事后冻结并重新评测，以后新结果一律使用协议 6。

```markdown
# NN · 测试名：评测（Prompt vN）

- **Prompt**：[prompt-vN.md](../../../prompts/<test-id>/prompt-vN.md)
- **评测协议**：6
- **标准冻结日期**：YYYY-MM-DD（现有产物明确事后冻结）
- **评测日期**：未评测
- **评测者**：尚未登记
- **评测方式**：轻量评测：脚本一次真实运行判硬性要求，AI 看时间轴拼图逐项打勾和打分
- **评测环境**：实际环境及未测边界

## 协议说明

…

## 评分维度

| ID | 名称 | 类型 | 权重 | 评分标准 |
|---|---|---|---|---|
| runtime | 运行与时序 | objective | 30 | 脚本读取运行结果与读数 |
| scenes | 关键画面 | objective | 40 | AI 在拼图中逐项确认 |
| taste | 品味 | taste | 30 | 0–5 分、0.5 步进，具体锚点 |

## 评分细则

| ID | 评分维度 | 判定 | 要求 | 怎么查 |
|---|---|---|---|---|
| runtime | runtime | 脚本 | 可运行 | 检查器实际运行的判定条件 |
| ignition | scenes | AI | 点火有火焰 | 看哪几帧、什么算通过 / 部分 |
| visual-taste | taste | AI | 画面质感 | 低分：…；3：…；5：… |

## 自动检查

（json 围栏，初始 []）

## AI 评审

（json 围栏，初始 []）

## 评测结论

尚无实际评分，不补造结论。
```

- **少而关键**：每个实验约 15–25 条细则。能用脚本量的（运行、报错、滚动条、时长、读数、文件结构）一律标 `脚本`，AI 不再复核；画面要求只列 Prompt 的主要场景，小细节并入品味分。`kind` 仅 `objective/taste`，两类都要有，权重为正整数且合计 100；品味只能 `AI` 判定，并有具体锚点。
- **脚本项**：`verify-artifacts.mjs` 对每份产物在桌面 1440×900 / 手机 390×844 各真实运行一次，判定取两者中较差的；检查器不支持的脚本细则会直接报错，先补检查器再冻结。记录含 `id,key,sha256,fingerprint,at,checker,environment,results,files`，`results` 覆盖全部脚本细则，每项 `id,status,evidence`，`status` 为 `pass/partial/fail/pending`。
- **AI 项**：AI 只看自动检查保存的时间轴拼图和初始 / 成功画面，一批可一次评完全部产物。每项 `key,id,status,score,note`：确定性 `pass/partial/fail` = `5/2.5/0`；品味 `scored`、0–5、0.5 步进；看不出写 `pending`、`score: null`。`pass` 的 `note` 可为空，其余必须一句依据。批次含 `protocol,source,id,experiment,version,fingerprint,reviewer,model,hashes,at,evidence,checks`，`source` 只能 `ai`，`evidence` 引用本批产物此前的自动检查记录。
- **计分**：脚本取该产物最新自动检查；每个 `reviewer + model` 对每份产物只计最新完整批次（同一时间按批次 ID 字典序）。每位 AI 的总分 = Σ（维度分 ÷ 5 × 权重），维度内细则等权；多位 AI 的未舍入总分等权平均，展示一位小数；确定性 / 品味分别按自己的权重归一到 100。脚本或 AI 有缺项则待评，不补零、不拼接批次、不重分配权重。默认一位 AI 即可，有分歧再加评审。
- **诚实边界**：拼图只代表采样时刻，不证明每一帧、实体帧率或音效；看不出就 pending，不用源码意图或状态文字替代画面。运行环境未暴露模型原标识时记录 `inherited-parent-unreported`。品味是 AI 判断，不宣称人类共识；只比较同实验同版本，不做跨实验总榜。
- `evaluation.md` 是唯一正式标准、证据与结论来源。网站纯静态展示，不调用评分 API、不提交评价、不读取 Redis、不暴露模型密钥。保留已有共享数据库连接，私密目录与配置继续禁止发布。

## 工具与验证

1. `npm run build` 生成展示数据与发布目录。
2. `node scripts/verify-artifacts.mjs --write` 每份产物桌面 / 手机各真实运行一次，追加脚本判定、拼图和关键帧。不加 `--write` 只把诊断输出到 `test-results/verification/`。可用 `--experiment=<id> --artifact=<key>` 只跑一份。
3. `npm run prepare-ai` 生成 AI 材料：Prompt、标准、脚本结果、拼图路径与空白响应模板，不含其他评审分数。
4. `node scripts/import-ai.mjs <响应.json> [--write]` 校验完整 AI 批次并导入。
5. 修改后运行 `npm run build`、`npm test`、`npm run test:ui`、`npm run check`，确认原始 Prompt 输入与 `outputs/` 产物无变更。禁止将测试 fixture 写入正式评测。

真实评审不可用时诚实保留待评。最后运行静态本地预览，检查桌面 / 手机、分数与有效 Agent 数、细项依据，并确认没有人工入口或 API 请求。
