# LLM Capability Lab

一个横向比较大模型能力的实验库：同一版本的 Prompt 交给不同模型独立完成，产物原样保存，再集中评测。

## 在线查看

展示台是纯静态页面，部署在 [线上实验台](https://llm-capability-lab.vercel.app/)，主页面是 [index.html](index.html)：

- **首页**：实验索引和“模型 × 实验”核心验收状态，不再显示最高分、AI 总分排名或跨实验总分。
- **实验页**：完整 Prompt、版本切换、桌面 / 手机原始产物预览、逐项验收证据、原始运行条件和折叠的历史 AI 评分。重新加载 HTML 只会回到待命，需再次点击点火，不宣称同步启动。
- **匿名复核**：先完成随机顺序的人工清单，再做随机左右的成对比较；支持持平、无法判断、草稿保存 / 恢复、封存揭示身份、JSON 导出。记录只保存在浏览器，导入仓库后才会公开。
- **待确认**：无观察证据或意见冲突，不代表失败、零分或已经通过。

本地预览：在项目根目录运行 `python -m http.server 4173`，打开 `http://127.0.0.1:4173/`。

## 核心原则

- Prompt 按 `prompt-vN.md` 版本化，编号最大的是当前版本；已被结果引用的版本不再修改。
- 不同模型使用相同版本的 Prompt，而且只收到 Prompt 代码块里的原文。
- 模型产物原样保存，不修复、不润色，也不覆盖失败结果。
- 结果按 Prompt 版本分目录存放，升级 Prompt 不需要删除旧结果。
- 每份结果用 `run.yaml` 记录 Prompt 版本、调用渠道、运行工具、能否联网和来回轮数。
- 新实验的标准在运行模型前冻结。协议 2 分离脚本事实、人工核心验收、细节覆盖和匿名质量比较，不再把主观档位换算成精确总分。格式见 [AGENTS.md](AGENTS.md)。

## 评测协议 2

2026-10-10 起统一迁移评测方式。现有八份产物已经生成，因此新标准是**事后冻结、统一重新验收**，不是声称当初已经预注册。历史 AI 分数、点评和结论完整保留，但不参与当前状态或胜负。

- 每项记录绑定原始文件 SHA-256 和标准指纹，附检查者、日期、来源、结论与证据；产物或标准变化会使旧记录校验失败。`.gitattributes` 禁止 Git 自动转换 Prompt 和原始产物的换行，保证跨平台检出时原始字节不变。
- 核心要求：有确定失败就“未通过”；否则有未确认就“待确认”；其余有部分做到就“部分做到”；全部明确通过才“通过”。细节缺失不与核心互相抵扣。
- 同一复核者、同一视口取最新验收记录；不同复核者或视口出现不同结论时保留冲突，回到待确认，不简单平均。脚本记录使用全部固定环境。
- 人工质量只比较同版本的成对产物，按维度记录“左优 / 右优 / 持平 / 无法判断”和依据。仅汇总核心均通过的样本；每位复核者、每种视口只计最新完整会话，旧会话仍可追溯。不发布加权总分或总体冠军。
- 隐藏模型标签不等于严格双盲：文件路径、原始产物自身或此前接触可能透露身份。未提前查看身份是自报声明，不是经过认证的事实；本地封存也不是密码学签名。
- 生成工具、联网权限和轮数不同，结论只描述这批样本，不能全部归因于模型本身。视口模拟不等于实体手机或实体 60/120Hz 显示器测试。

## 验收与发布

```sh
npm ci
npm run build
node scripts/verify-artifacts.mjs --write
npm run build
npm test
npm run test:ui
npm run check
```

`verify` 只读取产物，默认只输出诊断；加 `--write` 才向同一份 `evaluation.md` 追加脚本记录，旧记录保留。使用本机 Chrome / Edge（可设置 `CHROME_PATH`），否则需要已安装的 Playwright Chromium。四个环境统一为桌面、手机、桌面 DPR 2、手机减少动态模式；火箭每个环境真实跑完两次，SVG 通过真实 `<img>` 连续采样验证图像变化。证明可运行或有动画，不证明每个视觉需求已满足；不宣称测到真实硬件帧率或音效听感。截图及诊断在忽略提交的 `test-results/`，正式文本证据保存在评测文件中。

`npm run build` 先校验并生成 `data/lab.json`，再把允许发布的静态文件复制到 `dist/`；Vercel 只发布 `dist/`，不会公开依赖、脚本、本地测试草稿或诊断截图。

人工复核在网站的“匿名复核”里完成，导出封存记录后：

```sh
node scripts/import-review.mjs <封存记录.json>
node scripts/import-review.mjs <封存记录.json> --write
npm run build
npm test
npm run check
```

第一条只校验，第二条才追加人工验收和比较到该版本唯一的 `evaluation.md`。未完成草稿、重复会话、指纹不匹配或不完整比较都会拒绝。检查 diff 后提交、推送并运行 `vercel deploy --prod --yes`；网页不会直接修改 GitHub，也不会自动将本地草稿视作已发布意见。

`node scripts/test-ui.mjs --url=https://<实际生产域名>/` 可在部署后检查线上桌面 / 手机页面。带参数时直接调用 Node，避免 Windows 下 npm 包装命令吞掉参数。测试会话只存于隔离浏览器，不写入正式评测文件。

## 目录

| 路径 | 内容 |
|---|---|
| `prompts/<test-id>/prompt-vN.md` | 版本化 Prompt，模型输入的唯一来源 |
| `results/<test-id>/vN/outputs/<model-id>/` | 用第 N 版 Prompt 生成的原始产物和 `run.yaml` |
| `results/<test-id>/vN/evaluation.md` | 第 N 版的验收标准、正式证据、人工比较和历史评分 |
| `data/experiments.json` | 实验的展示文案（标题、能力标签、观察要点），描述当前版本 |
| `data/models.json` | 模型名册：每个模型目录的显示名和厂商 |
| `data/lab.json` | 由脚本生成的展示数据，不要手改 |
| `assets/thumbs/` | 网页产物的缩略图（派生文件） |
| `scripts/` | 生成数据和缩略图的脚本 |
| `index.html` · `lab.css` · `lab.js` · `review.js` | 展示台与本地复核流程 |

## 测试清单

| # | 测试能力 | 当前 Prompt | 历史 Prompt | 模型结果 | 评测 |
|---|---|---|---|---|---|
| 01 | 前端动画：照着详细需求，做一次从点火到入轨的火箭发射 | [prompt-v2](prompts/01-rocket-launch/prompt-v2.md) | [prompt-v1](prompts/01-rocket-launch/prompt-v1.md) | [Claude Opus 5.5 High](results/01-rocket-launch/v2/outputs/claude-opus-5-5-high/claude-opus-5-5-high.html) · [Claude Opus 5.5 Extra High](results/01-rocket-launch/v2/outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.html) · [GPT 5.6 Sol Extra High](results/01-rocket-launch/v2/outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.html) · [GPT 6.1 Sol Extra High](results/01-rocket-launch/v2/outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.html) | [评测 v2](results/01-rocket-launch/v2/evaluation.md)（脚本完成，人工待复核） |
| 02 | SVG 动画：骑自行车的加州褐鹕（进阶版 + 动画） | [prompt-v2](prompts/02-pelican-bicycle/prompt-v2.md) | [prompt-v1](prompts/02-pelican-bicycle/prompt-v1.md) | [Claude Opus 5.5 High](results/02-pelican-bicycle/v2/outputs/claude-opus-5-5-high/claude-opus-5-5-high.svg) · [Claude Opus 5.5 Extra High](results/02-pelican-bicycle/v2/outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.svg) · [GPT 5.6 Sol Extra High](results/02-pelican-bicycle/v2/outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.svg) · [GPT 6.1 Sol Extra High](results/02-pelican-bicycle/v2/outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.svg) | [评测 v2](results/02-pelican-bicycle/v2/evaluation.md)（脚本完成，人工待复核） |

v1 的旧结果和评测已从当前版本中移除，需要时可以在 git 历史（提交 `8917597` 及以前）里找到。

## 新增测试或结果

1. 新测试：在 `prompts/<NN-简称>/` 下创建 `prompt-v1.md`，并在 `data/experiments.json` 登记展示文案。
2. 跑模型之前：在 `results/<test-id>/vN/evaluation.md` 冻结协议 2 的核心 / 细节验收项、检查方法和成对比较维度。
3. 跑模型：只把当前 Prompt 代码块里的原文发给模型，最好在空目录或全新对话里运行。把原始产物放进 `results/<test-id>/vN/outputs/<model-id>/`，补上 `run.yaml`。新模型目录要在 `data/models.json` 登记显示名和厂商。
4. 验收：先执行该实验的固定检查脚本，再由人工独立完成清单和匿名比较，导入封存记录。新实验的自动项目必须先实现对应检查器；未支持的项保持待确认，不允许默认通过。
5. 运行 `node scripts/build-data.mjs` 生成 `data/lab.json`。脚本检查登记、版本、入口、原始指纹、标准指纹、记录完整性和旧协议的历史总分，有错即失败。
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
