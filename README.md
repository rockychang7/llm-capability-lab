# LLM Capability Lab

同一版本的 Prompt 交给不同模型独立完成，原始产物不修复，再比较这批结果。

[线上实验台](https://llm-capability-lab.vercel.app/)是纯静态网站，提供原始产物、脚本事实、AI 视觉验收、人工抽查和分维度比较。没有加权总分、历史评分或总体排名。

## 当前基线

2026-10-11 按维护者要求，原进阶 Prompt v2 重新命名为 **v1**，对应结果及缩略图一起迁移。旧基础 Prompt 和旧评分、点评、结论已从当前仓库删除；原进阶 Prompt 输入和八份原始产物的字节未变。`run.yaml` 只同步版本编号，不改生成日期和实际运行条件。

这是一次明确授权的基线重建，不是新生成，也不是修改旧 Prompt 后沿用旧结论。之后正常升级仍新建版本并保留已引用版本。旧提交仍属于 Git 历史，本次没有改写远端提交历史。

## 协议 3

现有产物的标准在 2026-10-11 **事后冻结**，然后统一重新验收；不能声称生成前已预注册。正式记录只在该版本唯一的 `evaluation.md` 中。

1. **脚本事实**：统一浏览器真实运行，只判断可量化事实。通过的自动项不要求人工再次确认，检查器失败或不支持的项保留待确认。
2. **AI 全量视觉验收**：每位评审分别检查全部 `ai` 项及桌面 / 手机两视口。使用实际录像和截图，不以源码或成功提示代替视觉观察。两位不同模型家族独立评审一致通过才可作为 AI 核心通过；单评审、缺证据、分歧及核心非通过送人工复核。
3. **人工定向复核**：优先检查核心风险、分歧及仅人工可测项，加随机抽查与少量匿名比较。每会话常规目标约 16 项（包含 4 组比较），不是硬上限；抽查发现误判时扩大该产物范围。先独立判断，再查看 AI 建议；可引用一致的已有证据，修改结论须简短说明。
4. **分段封存**：可跳过、进入比较或随时封存已完成项。没有完成的任务不生成记录，也不因其他项目抽查完成而自动通过。允许验收-only、比较-only 或混合会话，不要求全清单与全部产物对。
5. **分别发布**：显示核心状态、需求覆盖数量、AI 共识项与实际人工覆盖数。AI 和人工的比较票数分开；只纳入双方核心均通过的比较，没有加权总分或跨实验总榜。

桌面、手机分别判断，人工只覆盖实际检查项及视口。人工结论优先于同视口 AI 意见；不同人工评审意见冲突时仍待确认。同一来源、评审者、视口及项目取最新记录；比较按评审者、视口、产物对及维度取最新记录，部分新会话不会抹掉其他比较。

核心任一确定失败即未通过；否则待确认优先于部分做到，全部核心通过才通过。细节不能抵扣核心缺失。AI 核心失败只是风险，不直接冒充人工定论。

匿名仅隐藏界面标签，原始产物、路径和此前接触可能透露身份。评审独立性与匿名声明是自报，不是认证；本地封存不是数字签名。不同生成工具、联网权限和轮数仍公开；少量比较不代表模型永久能力。

## 测试清单

| # | 测试能力 | 当前 Prompt | 模型结果 | 评测 |
|---|---|---|---|---|
| 01 | 单文件火箭发射动画 | [prompt-v1](prompts/01-rocket-launch/prompt-v1.md) | [Claude High](results/01-rocket-launch/v1/outputs/claude-opus-5-5-high/claude-opus-5-5-high.html) · [Claude Extra High](results/01-rocket-launch/v1/outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.html) · [GPT 5.6](results/01-rocket-launch/v1/outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.html) · [GPT 6.1](results/01-rocket-launch/v1/outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.html) | [评测 v1](results/01-rocket-launch/v1/evaluation.md) |
| 02 | 鹈鹕骑自行车 SVG 动画 | [prompt-v1](prompts/02-pelican-bicycle/prompt-v1.md) | [Claude High](results/02-pelican-bicycle/v1/outputs/claude-opus-5-5-high/claude-opus-5-5-high.svg) · [Claude Extra High](results/02-pelican-bicycle/v1/outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.svg) · [GPT 5.6](results/02-pelican-bicycle/v1/outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.svg) · [GPT 6.1](results/02-pelican-bicycle/v1/outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.svg) | [评测 v1](results/02-pelican-bicycle/v1/evaluation.md) |

## 检查与发布

```sh
npm ci
npx playwright install ffmpeg
npm run build
node scripts/verify-artifacts.mjs --write
npm run build
npm test
npm run test:ui
npm run check
npm run preview
```

预览命令输出本地可用地址，自动使用空闲端口。浏览器使用本机 Chrome / Edge（可设置 `CHROME_PATH`），否则需要 Playwright Chromium。

`verify` 默认只诊断，加 `--write` 才将新脚本记录与浏览器证据清单追加到 `evaluation.md`。四个环境：桌面 1440×900、手机 390×844、桌面 DPR 2、手机减少动态。火箭真实跑两次；SVG 在 `<img>` 模式采样至少 12 秒。桌面 / 手机录制真实录像，其他环境保存截图。采样证明有限时刻，不证明每帧、实体 60/120Hz 或音效听感。

媒体保存在 `assets/evidence/`，属于只读派生证据，各文件有 SHA-256，可随静态站发布。诊断、草稿和匿名 AI 包在忽略提交的 `test-results/`。`build` 只向 `dist/` 复制静态页面、数据、Prompt、结果与资源，不发布依赖、脚本、临时映射或密钥。

## AI 评审

```sh
npm run prepare-ai
```

命令为每个实验输出一个匿名证据包及包外的 `-mapping.json`。证据包只含 Prompt、标准、两视口媒体、附加环境证据、指令和空白响应模板，没有旧评分、其他评审或模型目录名。

将同一证据包分别交给两个不同家族、独立上下文的视觉评审模型；不要提供包外映射、其他评审答案或仓库访问。根据实际执行信息填写评审者、模型与模型家族。没有模型接入或没看证据就不填写结论。

```sh
node scripts/import-ai.mjs <评审响应.json> --mapping=<包外mapping.json>
node scripts/import-ai.mjs <评审响应.json> --mapping=<包外mapping.json> --write
npm run build
```

默认只校验。导入要求全部视觉项和两视口、真实浏览器证据引用、产物 / 媒体 / 标准指纹、有效来源与封存时间。可选比较必须包含左右反转后的独立判断，`reverseChoice` 归一到**原始**左右身份，不一致统计为无法判断。网站不调用模型 API、不保存密钥，评审在本地 CLI 或独立模型会话执行。本仓库不会把空模板当成实际 AI 评审。

## 人工复核

网站“匿名复核”支持风险队列、随机抽查、跳过、草稿自动保存 / 恢复、随时封存已完成项和 JSON 导出。实际观察后再填写结论；没有依据可选待确认。

```sh
node scripts/import-review.mjs <封存记录.json>
node scripts/import-review.mjs <封存记录.json> --write
npm run build
```

未封存、空会话、重复会话、错误来源、无观察依据、过期指纹和错配证据均拒绝；未完成任务不会补造人工记录。导入后检查 diff，运行完整检查并提交推送。网页不会直接修改 GitHub，本地草稿也不会自动公开。

`node scripts/test-ui.mjs --url=https://<生产域名>/` 可检查生产页面，测试会话仅在隔离浏览器里，不写入正式评测。

## 目录与扩展

| 路径 | 内容 |
|---|---|
| `prompts/<test-id>/prompt-vN.md` | 唯一模型输入，编号最大者为当前版本 |
| `results/<test-id>/vN/outputs/<model-id>/` | 原始产物与 `run.yaml` |
| `results/<test-id>/vN/evaluation.md` | 唯一正式标准、验收、AI 批次、人工会话及结论 |
| `data/experiments.json` · `data/models.json` | 展示文案、模型名册和厂商 |
| `data/lab.json` | 脚本生成，不手改 |
| `assets/thumbs/` · `assets/evidence/` | 派生缩略图与浏览器证据 |
| `scripts/` · `tests/` | 检查器、导入工具与测试 |

新增实验先冻结协议 3 标准，再让模型在空目录 / 新会话中只读取 Prompt 的 `text` 代码块。结果不得修复，补齐实际 `run.yaml`；新模型登记到 `data/models.json`。新增自动标准先实现检查器，不支持时待确认。升级 Prompt 时新建 `prompt-v(N+1).md` 与对应结果版本，更新测试清单，重建数据并运行完整检查。Agent 规则见 [AGENTS.md](AGENTS.md)。
