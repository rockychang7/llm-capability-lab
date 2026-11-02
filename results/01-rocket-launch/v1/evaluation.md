# 01 · 火箭发射动画：评测（Prompt v1）

- **Prompt**：[prompt-v1.md](../../../prompts/01-rocket-launch/prompt-v1.md)
- **评测协议**：6
- **标准冻结日期**：2026-10-26（已有产物，事后冻结；协议 5 的旧评分与旧媒体已按维护者要求移除，不再展示）
- **评测日期**：2026-10-29、2026-11-02
- **评测者**：Codex（模型原标识未暴露）
- **评测方式**：轻量评测：脚本一次真实运行判硬性要求，AI 看时间轴拼图逐项打勾和打分
- **评测环境**：真实浏览器桌面 1440×900 / 手机 390×844 各跑一次；不测实体帧率、音效、DPR 与减少动态

## 协议说明

- 细则分两种判定：**脚本**项由 `verify-artifacts.mjs` 在一次真实运行中自动读数判断，AI 不再复核；**AI** 项由 AI 看拼图和关键帧判断。
- 确定性项 pass / partial / fail = 5 / 2.5 / 0；partial 只表示看得见的部分完成，不代替不确定。脚本项按桌面、手机中较差的一次计。
- 品味项 0–5 分、0.5 步进。共同锚点：0 无有效画面；1 粗糙失衡；2 多处明显缺陷；3 连贯可读但普通；4 精致一致、缺陷轻微；5 出色且经得起细看。
- AI 一次看全部产物的拼图（桌面每 3 秒一帧，手机每 6 秒一帧）及初始 / 成功画面。看不出来就写 pending，不猜。通过项不写说明，其他项写一句依据。
- 拼图只证明采样时刻，看不到帧间细节；动作“流畅”“有重量感”这类判断只按时间序列粗略评价。
- 总分 = Σ（维度分 ÷ 5 × 权重）。脚本取最新一次自动检查；每位 AI 只计最新完整批次，多位 AI 的总分等权平均。缺项不补分，没有完整评审显示待评。只比较本实验本版本。

## 评分维度

| ID | 名称 | 类型 | 权重 | 评分标准 |
|---|---|---|---|---|
| runtime | 运行与时序 | objective | 30 | 脚本读取运行结果、遥测读数与计时 |
| scenes | 关键画面 | objective | 40 | AI 在拼图中逐项确认 Prompt 要求的主要画面是否出现 |
| taste | 视觉与动画品味 | taste | 30 | AI 按共同 0–5 锚点评画面质感、动画镜头和整体完成度 |

## 评分细则

| ID | 评分维度 | 判定 | 要求 | 怎么查 |
|---|---|---|---|---|
| standalone | runtime | 脚本 | 单个自包含 HTML | 目录只有一个产物文件；拦截并统计外部请求与 DOM / CSS 外部引用 |
| runtime | runtime | 脚本 | 点火后到达成功 | 120 秒内出现可见的“入轨成功”标题 |
| replay | runtime | 脚本 | 可复位并再次发射 | 点“重新发射”后回到待命（高度归零、点火可点），再次点火开始倒计时；两项缺一 partial |
| console | runtime | 脚本 | 无运行错误 | 运行中无 pageerror 或 console.error（忽略 favicon） |
| viewport | runtime | 脚本 | 无页面滚动条 | 待命、每 5 秒及成功时检查滚动范围 |
| input-lock | runtime | 脚本 | 点火后按钮不可再点 | 点击后原按钮被禁用、隐藏或移除 |
| countdown | runtime | 脚本 | 从 T-10 开始倒计时 | 点击后 2 秒内读到 T-9～T-10，离台前倒数到 T-3 以内；缺一 partial |
| liftoff-time | runtime | 脚本 | 点击到离台 12–15 秒 | 遥测高度首次大于 0 的时刻；偏差 2 秒内 partial |
| total-time | runtime | 脚本 | 点击到成功 60–90 秒 | 出现可见“入轨成功”的时刻；偏差 3 秒内 partial |
| orbit-values | runtime | 脚本 | 最终约 400 km、7.7 km/s | 成功画面读数：高度 380–420、速度 7.5–7.9；只符一项 partial |
| telemetry | runtime | 脚本 | 遥测连续不跳变 | 飞行中每 0.5 秒读高度和速度；高度不回落、不出现每秒超过 100 km 的跳变 |
| rocket-look | scenes | AI | 待命时是一枚写实的两级火箭 | 初始画面：细长箭体、看得出分段和细节，不是卡通或平涂 |
| launch-site | scenes | AI | 黎明发射场 | 初始画面：黎明渐变天空、发射台、勤务塔都能认出；缺一 partial |
| ignition | scenes | AI | 点火有火焰和烟云 | 离台前后的拼图帧：明亮火焰和贴地扩散的烟云 |
| liftoff | scenes | AI | 离台并逐渐倾斜 | 拼图中火箭离开发射台，之后姿态逐渐转向一侧；只上升不倾斜 partial |
| tracking | scenes | AI | 镜头跟随火箭 | 飞行各帧火箭都在画面内且大致偏下；个别帧出框 partial |
| plume | scenes | AI | 尾焰随高度变化 | 对比低空与高空帧：从短亮粗变成大而淡；变化不明显 partial |
| sky | scenes | AI | 天空变暗并出现星空 | 对比各帧天空颜色由亮到近黑，并看到星点 |
| staging | scenes | AI | 一二级分离 | 有一级脱落的帧，以及之后二级继续带火焰飞行；只见其一 partial |
| fairing | scenes | AI | 整流罩分开露出卫星 | 有整流罩两瓣分开或卫星露出的帧 |
| orbit | scenes | AI | 入轨看到弧形地球 | 后段帧下方有弧形地球和大气边缘 |
| deploy | scenes | AI | 卫星分离并展开太阳能板 | 后段或成功画面中卫星与箭体分开、两侧有太阳能板；只见其一 partial |
| mobile-layout | scenes | AI | 手机竖屏完整可用 | 手机拼图与初始 / 成功画面：火箭、遥测和按钮都完整可见，不互相遮挡 |
| visual-taste | taste | AI | 画面质感 | 看初始画面与关键帧：低分 几何拼贴、扁平或脏乱；3 体积和光色协调；5 金属、光影、雾和地球细腻统一 |
| motion-taste | taste | AI | 动画与镜头 | 看拼图时间序列：低分 跳切、出框或阶段混乱；3 阶段清楚、镜头能跟；5 节奏有缓急、转场自然、收尾安静 |
| finish-taste | taste | AI | 整体完成度 | 桌面与手机一起看：低分 UI 抢画面或草率结束；3 完整可用；5 UI、画面与叙事一致精致 |

## 自动检查

脚本一次真实运行的判定、截图拼图与指纹。由 `node scripts/verify-artifacts.mjs --write` 追加，不手改。

```json
[
  {
    "id": "20261029070702049-claude-opus-5-5-xhigh",
    "key": "claude-opus-5-5-xhigh",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "5369c560fd5863215c2865a1a0f47eab37944a775c14d936b2a2daca0a883cb9",
    "at": "2026-10-29T07:11:05.950Z",
    "checker": "verify-artifacts@9edd49ce2d41",
    "environment": {
      "browser": "156.0.8078.48",
      "platform": "win32",
      "node": "v22.17.0",
      "viewports": {
        "desktop": {
          "width": 1440,
          "height": 900
        },
        "mobile": {
          "width": 390,
          "height": 844
        }
      },
      "clock": "real",
      "concurrency": 4,
      "limit": "单次真实运行的采样；不测实体帧率、音效或每一帧"
    },
    "results": [
      {
        "id": "standalone",
        "status": "pass",
        "evidence": "桌面：目录 1 个文件，外部引用 0 个；手机：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "runtime",
        "status": "pass",
        "evidence": "桌面：点火后 69.5s 出现可见的“入轨成功”；手机：点火后 69.1s 出现可见的“入轨成功”"
      },
      {
        "id": "replay",
        "status": "pass",
        "evidence": "桌面：复位回到待命（高度归零、点火可点）是，再次点火开始倒计时是；手机：复位回到待命（高度归零、点火可点）是，再次点火开始倒计时是"
      },
      {
        "id": "console",
        "status": "pass",
        "evidence": "桌面：无页面错误或 console.error；手机：无页面错误或 console.error"
      },
      {
        "id": "viewport",
        "status": "pass",
        "evidence": "桌面：待命、每 5 秒及成功时均无滚动范围；手机：待命、每 5 秒及成功时均无滚动范围"
      },
      {
        "id": "input-lock",
        "status": "pass",
        "evidence": "桌面：点击后点火按钮已禁用、隐藏或被替换；手机：点击后点火按钮已禁用、隐藏或被替换"
      },
      {
        "id": "countdown",
        "status": "pass",
        "evidence": "桌面：前 2 秒读到 T-10，离台前倒数到 T-3 以内；手机：前 2 秒读到 T-10，离台前倒数到 T-3 以内"
      },
      {
        "id": "liftoff-time",
        "status": "pass",
        "evidence": "桌面：点击后 12.2s 高度首次大于 0；手机：点击后 12s 高度首次大于 0"
      },
      {
        "id": "total-time",
        "status": "pass",
        "evidence": "桌面：点击到入轨成功 69.5s；手机：点击到入轨成功 69.1s"
      },
      {
        "id": "orbit-values",
        "status": "pass",
        "evidence": "桌面：成功画面高度 400.3 km，速度 7.67 km/s；手机：成功画面高度 400.3 km，速度 7.67 km/s"
      },
      {
        "id": "telemetry",
        "status": "pass",
        "evidence": "桌面：131 个高度读数，回落 0 次，跳变（>100 km/s）0 次；手机：133 个高度读数，回落 0 次，跳变（>100 km/s）0 次"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-xhigh-desktop-ready.jpg",
        "sha256": "4dcc77e8a6fa51240218769d705594774a1bbc65ee654dd81358dec70966ab74",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-xhigh-desktop-complete.jpg",
        "sha256": "c210e20c5cfb0ecff292aa9347f957397bb978992816bd79018631857f5c01ce",
        "kind": "frame",
        "viewport": "desktop",
        "label": "成功画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-xhigh-desktop-sheet-1.jpg",
        "sha256": "6e94cb67b7daaffca17d780e1e4c5809c8133efdfecc3e70f0b116f607b86507",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 0–33.1s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-xhigh-desktop-sheet-2.jpg",
        "sha256": "8359335e0f3505e2b9f0272f7053b39e92e6985da3609daec4b409ec46f41879",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 36.2–69.4s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-xhigh-desktop-sheet-3.jpg",
        "sha256": "a843db8aa41f73a15fa64943256cbdbeee9719414f2bdf91bb843fbd410d846c",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 69.5–69.5s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-xhigh-mobile-ready.jpg",
        "sha256": "ea0cb0601a5d2761e7f638af60d0991c1e9fecacc6b557a1ace7856058a53e8f",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-xhigh-mobile-complete.jpg",
        "sha256": "3e203148abcd8631ff3bb5197bc3251f51e66230b044494faa5d99cdb4a5ea61",
        "kind": "frame",
        "viewport": "mobile",
        "label": "成功画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-xhigh-mobile-sheet-1.jpg",
        "sha256": "eab8fb99c3f28b8b29d8bb89005569b0fec3b927acfbc87c511cb87258891e0d",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 0–66.4s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-xhigh-mobile-sheet-2.jpg",
        "sha256": "2fb5394b0259ec20d3226d96ac669634d638eec18383af3d2fa6782e22f8beed",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 69.1–69.1s"
      }
    ]
  },
  {
    "id": "20261029070702049-claude-opus-5-5-high",
    "key": "claude-opus-5-5-high",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "5369c560fd5863215c2865a1a0f47eab37944a775c14d936b2a2daca0a883cb9",
    "at": "2026-10-29T07:11:07.498Z",
    "checker": "verify-artifacts@9edd49ce2d41",
    "environment": {
      "browser": "156.0.8078.48",
      "platform": "win32",
      "node": "v22.17.0",
      "viewports": {
        "desktop": {
          "width": 1440,
          "height": 900
        },
        "mobile": {
          "width": 390,
          "height": 844
        }
      },
      "clock": "real",
      "concurrency": 4,
      "limit": "单次真实运行的采样；不测实体帧率、音效或每一帧"
    },
    "results": [
      {
        "id": "standalone",
        "status": "pass",
        "evidence": "桌面：目录 1 个文件，外部引用 0 个；手机：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "runtime",
        "status": "pass",
        "evidence": "桌面：点火后 77.2s 出现可见的“入轨成功”；手机：点火后 77s 出现可见的“入轨成功”"
      },
      {
        "id": "replay",
        "status": "partial",
        "evidence": "桌面：复位回到待命（高度归零、点火可点）否，再次点火开始倒计时是；手机：复位回到待命（高度归零、点火可点）否，再次点火开始倒计时是"
      },
      {
        "id": "console",
        "status": "pass",
        "evidence": "桌面：无页面错误或 console.error；手机：无页面错误或 console.error"
      },
      {
        "id": "viewport",
        "status": "pass",
        "evidence": "桌面：待命、每 5 秒及成功时均无滚动范围；手机：待命、每 5 秒及成功时均无滚动范围"
      },
      {
        "id": "input-lock",
        "status": "pass",
        "evidence": "桌面：点击后点火按钮已禁用、隐藏或被替换；手机：点击后点火按钮已禁用、隐藏或被替换"
      },
      {
        "id": "countdown",
        "status": "pass",
        "evidence": "桌面：前 2 秒读到 T-10，离台前倒数到 T-3 以内；手机：前 2 秒读到 T-10，离台前倒数到 T-3 以内"
      },
      {
        "id": "liftoff-time",
        "status": "pass",
        "evidence": "桌面：点击后 12.3s 高度首次大于 0；手机：点击后 12.5s 高度首次大于 0"
      },
      {
        "id": "total-time",
        "status": "pass",
        "evidence": "桌面：点击到入轨成功 77.2s；手机：点击到入轨成功 77s"
      },
      {
        "id": "orbit-values",
        "status": "pass",
        "evidence": "桌面：成功画面高度 400.2 km，速度 7.66 km/s；手机：成功画面高度 400.2 km，速度 7.66 km/s"
      },
      {
        "id": "telemetry",
        "status": "pass",
        "evidence": "桌面：144 个高度读数，回落 0 次，跳变（>100 km/s）0 次；手机：147 个高度读数，回落 0 次，跳变（>100 km/s）0 次"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-high-desktop-ready.jpg",
        "sha256": "9585526518e56e080e525905347cc33f4b0e627eb4167de79b632d84bac10858",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-high-desktop-complete.jpg",
        "sha256": "e6fe8a7ba94b46ae73e65db63983923fa57f69f23c45e94c43e914673a56d2c3",
        "kind": "frame",
        "viewport": "desktop",
        "label": "成功画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-high-desktop-sheet-1.jpg",
        "sha256": "e65892fac93c98dad593ece23d4540a9622154bff87d63fb84fc867672d60e70",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 0–33.1s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-high-desktop-sheet-2.jpg",
        "sha256": "7cee4c306aa36f57ba286df20a8c8aba07a59a55e98b7464eb32f8f452b46355",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 36.3–69s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-high-desktop-sheet-3.jpg",
        "sha256": "e4fd00eb8e621cc93f24c41aa6ea8c751a1bd81e0cf3ee9337d2be556fdec8a1",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 72.2–77.2s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-high-mobile-ready.jpg",
        "sha256": "50cd8834205e03ab43d0cb2356f8f2f4c38d696d32fd194f9cf4b330a1d2bfcc",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-high-mobile-complete.jpg",
        "sha256": "a601ae3e4d7caedece702807c02e6e4b5e4715c694483e4824be79ac292b1a43",
        "kind": "frame",
        "viewport": "mobile",
        "label": "成功画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-high-mobile-sheet-1.jpg",
        "sha256": "5a7c3c66e1cd2c6e5e019a5cc01b4cd3aa77c3289ed173817b4b05d6e4fc4e23",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 0–66.4s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/claude-opus-5-5-high-mobile-sheet-2.jpg",
        "sha256": "972795f0c42c60d24da0f9ae9d2765b04c2fc04f0a85b2d7fa82ffb4586e76d0",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 72.1–77s"
      }
    ]
  },
  {
    "id": "20261029070702049-gpt-5-6-sol-xhigh",
    "key": "gpt-5-6-sol-xhigh",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "5369c560fd5863215c2865a1a0f47eab37944a775c14d936b2a2daca0a883cb9",
    "at": "2026-10-29T07:11:09.006Z",
    "checker": "verify-artifacts@9edd49ce2d41",
    "environment": {
      "browser": "156.0.8078.48",
      "platform": "win32",
      "node": "v22.17.0",
      "viewports": {
        "desktop": {
          "width": 1440,
          "height": 900
        },
        "mobile": {
          "width": 390,
          "height": 844
        }
      },
      "clock": "real",
      "concurrency": 4,
      "limit": "单次真实运行的采样；不测实体帧率、音效或每一帧"
    },
    "results": [
      {
        "id": "standalone",
        "status": "pass",
        "evidence": "桌面：目录 1 个文件，外部引用 0 个；手机：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "runtime",
        "status": "pass",
        "evidence": "桌面：点火后 75s 出现可见的“入轨成功”；手机：点火后 74.9s 出现可见的“入轨成功”"
      },
      {
        "id": "replay",
        "status": "partial",
        "evidence": "桌面：复位回到待命（高度归零、点火可点）否，再次点火开始倒计时是；手机：复位回到待命（高度归零、点火可点）否，再次点火开始倒计时是"
      },
      {
        "id": "console",
        "status": "pass",
        "evidence": "桌面：无页面错误或 console.error；手机：无页面错误或 console.error"
      },
      {
        "id": "viewport",
        "status": "pass",
        "evidence": "桌面：待命、每 5 秒及成功时均无滚动范围；手机：待命、每 5 秒及成功时均无滚动范围"
      },
      {
        "id": "input-lock",
        "status": "pass",
        "evidence": "桌面：点击后点火按钮已禁用、隐藏或被替换；手机：点击后点火按钮已禁用、隐藏或被替换"
      },
      {
        "id": "countdown",
        "status": "pass",
        "evidence": "桌面：前 2 秒读到 T-10，离台前倒数到 T-3 以内；手机：前 2 秒读到 T-11，离台前倒数到 T-3 以内"
      },
      {
        "id": "liftoff-time",
        "status": "partial",
        "evidence": "桌面：点击后 10.3s 高度首次大于 0；手机：点击后 10.1s 高度首次大于 0"
      },
      {
        "id": "total-time",
        "status": "pass",
        "evidence": "桌面：点击到入轨成功 75s；手机：点击到入轨成功 74.9s"
      },
      {
        "id": "orbit-values",
        "status": "pass",
        "evidence": "桌面：成功画面高度 401.8 km，速度 7.71 km/s；手机：成功画面高度 401.8 km，速度 7.71 km/s"
      },
      {
        "id": "telemetry",
        "status": "pass",
        "evidence": "桌面：140 个高度读数，回落 0 次，跳变（>100 km/s）0 次；手机：143 个高度读数，回落 0 次，跳变（>100 km/s）0 次"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-5-6-sol-xhigh-desktop-ready.jpg",
        "sha256": "e5e6e4352b3681810a6c52febb2b1246d0050255676c62e2e36c484abf275150",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-5-6-sol-xhigh-desktop-complete.jpg",
        "sha256": "09cf183a7892050e60dda0b85af3ce377f535fa642443b9a056c3f2ca3a5bea0",
        "kind": "frame",
        "viewport": "desktop",
        "label": "成功画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-5-6-sol-xhigh-desktop-sheet-1.jpg",
        "sha256": "85a61cdf3e1f15eb4aa76a27ce1a30aab4da0dac744db70fe1c0cb73760354a5",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 0–33.4s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-5-6-sol-xhigh-desktop-sheet-2.jpg",
        "sha256": "2cc3177f9032607ced90060318d37dc50ab34bc82a8738f90c5e3e87bbc22da0",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 36.1–69.1s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-5-6-sol-xhigh-desktop-sheet-3.jpg",
        "sha256": "afe667559dfde1dcdcadaeb100536fd8cc79a9958b669b7e86ead7c046c6eb00",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 72.3–75s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-5-6-sol-xhigh-mobile-ready.jpg",
        "sha256": "ace8d1a35f585dd628874574acc7b34e79c8e89b08c6128df34fbbf53e4be4b0",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-5-6-sol-xhigh-mobile-complete.jpg",
        "sha256": "297f4e0b59c25178e4b51b7be0ab9ba1733cfbc30a58cd968b926a988c4e09ed",
        "kind": "frame",
        "viewport": "mobile",
        "label": "成功画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-5-6-sol-xhigh-mobile-sheet-1.jpg",
        "sha256": "70309541bc63a94089bc91ed813e90ef6efa04b8f6acddcd287271c68039f6c6",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 0–66.4s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-5-6-sol-xhigh-mobile-sheet-2.jpg",
        "sha256": "8afe05082f310aaca909a3aa111600f9b490bc6fc96818b73bd3b6c5eda0a508",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 72.2–74.9s"
      }
    ]
  },
  {
    "id": "20261029070702049-gpt-6-1-sol-xhigh",
    "key": "gpt-6-1-sol-xhigh",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "5369c560fd5863215c2865a1a0f47eab37944a775c14d936b2a2daca0a883cb9",
    "at": "2026-10-29T07:11:10.542Z",
    "checker": "verify-artifacts@9edd49ce2d41",
    "environment": {
      "browser": "156.0.8078.48",
      "platform": "win32",
      "node": "v22.17.0",
      "viewports": {
        "desktop": {
          "width": 1440,
          "height": 900
        },
        "mobile": {
          "width": 390,
          "height": 844
        }
      },
      "clock": "real",
      "concurrency": 4,
      "limit": "单次真实运行的采样；不测实体帧率、音效或每一帧"
    },
    "results": [
      {
        "id": "standalone",
        "status": "pass",
        "evidence": "桌面：目录 1 个文件，外部引用 0 个；手机：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "runtime",
        "status": "pass",
        "evidence": "桌面：点火后 78.9s 出现可见的“入轨成功”；手机：点火后 78.6s 出现可见的“入轨成功”"
      },
      {
        "id": "replay",
        "status": "partial",
        "evidence": "桌面：复位回到待命（高度归零、点火可点）否，再次点火开始倒计时是；手机：复位回到待命（高度归零、点火可点）否，再次点火开始倒计时是"
      },
      {
        "id": "console",
        "status": "pass",
        "evidence": "桌面：无页面错误或 console.error；手机：无页面错误或 console.error"
      },
      {
        "id": "viewport",
        "status": "pass",
        "evidence": "桌面：待命、每 5 秒及成功时均无滚动范围；手机：待命、每 5 秒及成功时均无滚动范围"
      },
      {
        "id": "input-lock",
        "status": "pass",
        "evidence": "桌面：点击后点火按钮已禁用、隐藏或被替换；手机：点击后点火按钮已禁用、隐藏或被替换"
      },
      {
        "id": "countdown",
        "status": "pass",
        "evidence": "桌面：前 2 秒读到 T-9.5，离台前倒数到 T-3 以内；手机：前 2 秒读到 T-9.5，离台前倒数到 T-3 以内"
      },
      {
        "id": "liftoff-time",
        "status": "partial",
        "evidence": "桌面：点击后 11.2s 高度首次大于 0；手机：点击后 11.4s 高度首次大于 0"
      },
      {
        "id": "total-time",
        "status": "pass",
        "evidence": "桌面：点击到入轨成功 78.9s；手机：点击到入轨成功 78.6s"
      },
      {
        "id": "orbit-values",
        "status": "pass",
        "evidence": "桌面：成功画面高度 400 km，速度 7.7 km/s；手机：成功画面高度 400 km，速度 7.7 km/s"
      },
      {
        "id": "telemetry",
        "status": "pass",
        "evidence": "桌面：147 个高度读数，回落 0 次，跳变（>100 km/s）0 次；手机：150 个高度读数，回落 0 次，跳变（>100 km/s）0 次"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-sol-xhigh-desktop-ready.jpg",
        "sha256": "418104c429f622b8c753c359500e2640cccb8a846e925f2a1f1cde945e3cfdde",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-sol-xhigh-desktop-complete.jpg",
        "sha256": "4c2b852f57021f10fb3e0bce3e5fdfa38aa7a74438728964ff7252e5bf7b7594",
        "kind": "frame",
        "viewport": "desktop",
        "label": "成功画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-sol-xhigh-desktop-sheet-1.jpg",
        "sha256": "5a5884d4825805f86b66bc820cc3456a429b86c1d2fefef1cdfb2e11788a9b2c",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 0–33.2s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-sol-xhigh-desktop-sheet-2.jpg",
        "sha256": "3241abd79ccd1f77544fcc6fa899f7c05a29fe426c80523d2bcbbc4b54b41910",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 36.5–69.2s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-sol-xhigh-desktop-sheet-3.jpg",
        "sha256": "eb7281dd22c23dbd3f7a49f6b901f759d89429cdf61fbb30454eda0fe381aca5",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 72.4–78.9s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-sol-xhigh-mobile-ready.jpg",
        "sha256": "5082c4730d08f979fe5937baf8c052e46129c12fe5e7789c50731a69d8081736",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-sol-xhigh-mobile-complete.jpg",
        "sha256": "d9c95f0ef7153e89ee26b227316cc3f3ddff55747cf73c7e70117d43df270708",
        "kind": "frame",
        "viewport": "mobile",
        "label": "成功画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-sol-xhigh-mobile-sheet-1.jpg",
        "sha256": "a21f931d75af9cb3b4d0118a817d151b696f8ec1119100665806d18bf3d9be16",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 0–66.5s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-sol-xhigh-mobile-sheet-2.jpg",
        "sha256": "db85f1115fea95c820655849952df7471e56122c7bcf5ee67f4fd4cb66e795dc",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 72.3–78.6s"
      }
    ]
  },
  {
    "id": "20261029070702049-gpt-6-1-terra-xhigh",
    "key": "gpt-6-1-terra-xhigh",
    "sha256": "2228066ee18a7a06840c5979a4049c9170c71677875a306ec04b99bc6a741b4a",
    "fingerprint": "5369c560fd5863215c2865a1a0f47eab37944a775c14d936b2a2daca0a883cb9",
    "at": "2026-10-29T07:11:12.015Z",
    "checker": "verify-artifacts@9edd49ce2d41",
    "environment": {
      "browser": "156.0.8078.48",
      "platform": "win32",
      "node": "v22.17.0",
      "viewports": {
        "desktop": {
          "width": 1440,
          "height": 900
        },
        "mobile": {
          "width": 390,
          "height": 844
        }
      },
      "clock": "real",
      "concurrency": 4,
      "limit": "单次真实运行的采样；不测实体帧率、音效或每一帧"
    },
    "results": [
      {
        "id": "standalone",
        "status": "pass",
        "evidence": "桌面：目录 1 个文件，外部引用 0 个；手机：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "runtime",
        "status": "pass",
        "evidence": "桌面：点火后 73.8s 出现可见的“入轨成功”；手机：点火后 73.5s 出现可见的“入轨成功”"
      },
      {
        "id": "replay",
        "status": "pass",
        "evidence": "桌面：复位回到待命（高度归零、点火可点）是，再次点火开始倒计时是；手机：复位回到待命（高度归零、点火可点）是，再次点火开始倒计时是"
      },
      {
        "id": "console",
        "status": "pass",
        "evidence": "桌面：无页面错误或 console.error；手机：无页面错误或 console.error"
      },
      {
        "id": "viewport",
        "status": "pass",
        "evidence": "桌面：待命、每 5 秒及成功时均无滚动范围；手机：待命、每 5 秒及成功时均无滚动范围"
      },
      {
        "id": "input-lock",
        "status": "pass",
        "evidence": "桌面：点击后点火按钮已禁用、隐藏或被替换；手机：点击后点火按钮已禁用、隐藏或被替换"
      },
      {
        "id": "countdown",
        "status": "pass",
        "evidence": "桌面：前 2 秒读到 T-10，离台前倒数到 T-3 以内；手机：前 2 秒读到 T-10，离台前倒数到 T-3 以内"
      },
      {
        "id": "liftoff-time",
        "status": "partial",
        "evidence": "桌面：点击后 11.6s 高度首次大于 0；手机：点击后 11.9s 高度首次大于 0"
      },
      {
        "id": "total-time",
        "status": "pass",
        "evidence": "桌面：点击到入轨成功 73.8s；手机：点击到入轨成功 73.5s"
      },
      {
        "id": "orbit-values",
        "status": "pass",
        "evidence": "桌面：成功画面高度 400 km，速度 7.7 km/s；手机：成功画面高度 400 km，速度 7.7 km/s"
      },
      {
        "id": "telemetry",
        "status": "pass",
        "evidence": "桌面：142 个高度读数，回落 0 次，跳变（>100 km/s）0 次；手机：143 个高度读数，回落 0 次，跳变（>100 km/s）0 次"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-terra-xhigh-desktop-ready.jpg",
        "sha256": "02f2f28d80b66a85179b8a9422823674de657f7e834239ad1f8738ff4c1df027",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-terra-xhigh-desktop-complete.jpg",
        "sha256": "f00cc20359559f182281ccdcf139abd667f029ac0b8e0524ac727ca3fe8c7335",
        "kind": "frame",
        "viewport": "desktop",
        "label": "成功画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-terra-xhigh-desktop-sheet-1.jpg",
        "sha256": "ba1252daaf7c4ef27ed9c8089a05c0bc75d1ff52549679439243ff74fadd79a0",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 0–33.4s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-terra-xhigh-desktop-sheet-2.jpg",
        "sha256": "169f5060149a5ba4966f13b094c30f3e9e3104fb73f260354086219d824a2712",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 36–69s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-terra-xhigh-desktop-sheet-3.jpg",
        "sha256": "10825f34105df708277e32c111c1f5d1d29a5aea5deae4fa5d9f547efa2bfe38",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 72.2–73.8s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-terra-xhigh-mobile-ready.jpg",
        "sha256": "123e6340bf0703f322484eed656e438b7b61a87685a3add3733c48818261f08c",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-terra-xhigh-mobile-complete.jpg",
        "sha256": "bb4165c614044ee97e43986af6181dc645f44c734541b4c5d9028edf96bb7e58",
        "kind": "frame",
        "viewport": "mobile",
        "label": "成功画面"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-terra-xhigh-mobile-sheet-1.jpg",
        "sha256": "60dcb4347205f2bbbf6d8bdb48b35ddafbc3fdeb79f29e67a4e2712bda5cd7ad",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 0–66.2s"
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261029070702049/gpt-6-1-terra-xhigh-mobile-sheet-2.jpg",
        "sha256": "17dbb6a6a85678fb2458f25bdca6aa1c59bcfc4567874aeb9dd1279e84b3bfe4",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 72.4–73.5s"
      }
    ]
  }
]
```

## AI 评审

由 `node scripts/import-ai.mjs <响应.json> --write` 校验后追加，不手改。

```json
[
  {
    "protocol": 6,
    "source": "ai",
    "id": "5d1118d9-28b0-414d-b7db-93f3398279b3",
    "experiment": "01-rocket-launch",
    "version": 1,
    "fingerprint": "5369c560fd5863215c2865a1a0f47eab37944a775c14d936b2a2daca0a883cb9",
    "reviewer": "Codex",
    "model": "inherited-parent-unreported",
    "hashes": {
      "gpt-6-1-terra-xhigh": "2228066ee18a7a06840c5979a4049c9170c71677875a306ec04b99bc6a741b4a"
    },
    "at": "2026-10-29T07:13:12.953Z",
    "evidence": [
      "20261029070702049-gpt-6-1-terra-xhigh"
    ],
    "checks": [
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "rocket-look",
        "status": "partial",
        "score": 2.5,
        "note": "桌面首帧箭体细长且有分段和阴影，但整体造型及细节较简化，偏几何插画。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "launch-site",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "ignition",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "liftoff",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "tracking",
        "status": "fail",
        "score": 0,
        "note": "手机拼图约 30–66 秒多帧火箭或二级主体被画面右边缘裁掉，未能持续跟随。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "plume",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "sky",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "staging",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "fairing",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "orbit",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "deploy",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "mobile-layout",
        "status": "fail",
        "score": 0,
        "note": "手机拼图 30–66 秒主体大幅出框，成功画面的卫星也未完整可见。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "visual-taste",
        "status": "scored",
        "score": 2.5,
        "note": "首帧和入轨画面色彩协调，但云、发射场与地球多为简化几何形状。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "motion-taste",
        "status": "scored",
        "score": 2.5,
        "note": "桌面时间轴阶段可辨，但手机约 30 秒后长时间出框，镜头跟随明显不足。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "finish-taste",
        "status": "scored",
        "score": 2.5,
        "note": "桌面有明确的成功与重发画面，但手机未完整呈现关键飞行和卫星画面。"
      }
    ]
  },
  {
    "protocol": 6,
    "source": "ai",
    "id": "16f3839b-9118-4e59-a8b9-69d87219a535",
    "experiment": "01-rocket-launch",
    "version": 1,
    "fingerprint": "5369c560fd5863215c2865a1a0f47eab37944a775c14d936b2a2daca0a883cb9",
    "reviewer": "Codex",
    "model": "inherited-parent-unreported",
    "hashes": {
      "claude-opus-5-5-xhigh": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
      "claude-opus-5-5-high": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
      "gpt-5-6-sol-xhigh": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
      "gpt-6-1-sol-xhigh": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af"
    },
    "at": "2026-11-02T03:26:05.660Z",
    "evidence": [
      "20261029070702049-claude-opus-5-5-xhigh",
      "20261029070702049-claude-opus-5-5-high",
      "20261029070702049-gpt-5-6-sol-xhigh",
      "20261029070702049-gpt-6-1-sol-xhigh"
    ],
    "checks": [
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "rocket-look",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "launch-site",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "ignition",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "liftoff",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "tracking",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "plume",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "sky",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "staging",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "fairing",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "orbit",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "deploy",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "mobile-layout",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "visual-taste",
        "status": "scored",
        "score": 4,
        "note": "待命大图的箭体接缝与明暗清楚，桌面 51–66s 的大气边缘和晨光统一，但云团与陆地仍较图案化。"
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "motion-taste",
        "status": "scored",
        "score": 4.5,
        "note": "桌面 9–24s 的缓慢离台到转弯、36–45s 分离和 57–66s 关机部署层次清楚，采样序列的收尾有明显放缓。"
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "finish-taste",
        "status": "scored",
        "score": 4.5,
        "note": "手机待命、飞行拼图与成功大图中主体、遥测和重发按钮分区清楚，任务视觉统一，成功浮层稍遮挡部署主体。"
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "rocket-look",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "launch-site",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "ignition",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "liftoff",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "tracking",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "plume",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "sky",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "staging",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "fairing",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "orbit",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "deploy",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "mobile-layout",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "visual-taste",
        "status": "scored",
        "score": 4,
        "note": "待命大图的箭体体积、塔架与黎明光色协调，桌面 54–75s 的地球和晨光有层次，但云雾与地表纹理仍偏简化。"
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "motion-taste",
        "status": "scored",
        "score": 4,
        "note": "桌面 12–33s 起飞转弯、45–57s 分离和 66–75s 卫星展开均可顺序辨认，采样中镜头稳定但部分阶段构图变化较少。"
      },
      {
        "key": "claude-opus-5-5-high",
        "id": "finish-taste",
        "status": "scored",
        "score": 4,
        "note": "手机全程拼图中的箭体、遥测与重发按钮保持可见，画面完整，但事件字幕和遥测在桌面缩览中偏细小。"
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "rocket-look",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "launch-site",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "ignition",
        "status": "partial",
        "score": 2.5,
        "note": "桌面 9–18s 可见明亮尾焰，但烟雾主要是随箭体上移的两团圆形雾斑，贴地翻涌扩散的烟云表现不足。"
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "liftoff",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "tracking",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "plume",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "sky",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "staging",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "fairing",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "orbit",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "deploy",
        "status": "partial",
        "score": 2.5,
        "note": "桌面 57–72s 可见卫星与展开的双侧电池板，但手机 54–72s 的部署主体移出右侧画框，竖屏只剩二级与罩瓣。"
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "mobile-layout",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "visual-taste",
        "status": "scored",
        "score": 2.5,
        "note": "待命箭体有明暗与接缝，但桌面 33–60s 的三角形火焰、椭圆陆地与线圈状云层明显偏几何插画，写实质感不足。"
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "motion-taste",
        "status": "scored",
        "score": 3,
        "note": "桌面 12–57s 的转弯、级间分离与开罩可读，但烟团随箭体漂移，手机 54s 后部署主体出框，镜头叙事受损。"
      },
      {
        "key": "gpt-5-6-sol-xhigh",
        "id": "finish-taste",
        "status": "scored",
        "score": 3,
        "note": "初始按钮和成功读数清楚，桌面流程完整，但手机 54–75s 看不到展开后的卫星，且桌面遥测字号偏小。"
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "rocket-look",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "launch-site",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "ignition",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "liftoff",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "tracking",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "plume",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "sky",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "staging",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "fairing",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "orbit",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "deploy",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "mobile-layout",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "visual-taste",
        "status": "scored",
        "score": 3.5,
        "note": "待命大图的铆钉、接缝与金属明暗清楚，桌面 54–79s 的陆地和高空尾焰仍是较硬的几何色面，细腻度有限。"
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "motion-taste",
        "status": "scored",
        "score": 4,
        "note": "桌面 12–33s 缓慢离塔并转弯、39–54s 关机分离开罩、60–75s 部署拉远均可读，一级残段在数帧中逗留较久。"
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "finish-taste",
        "status": "scored",
        "score": 4,
        "note": "手机成功大图中卫星、地球、读数与重发按钮完整分区，界面语言统一，但飞行时浅色遥测与雾层的对比度偏弱。"
      }
    ]
  }
]
```

## 评测结论

2026-11-02 为此前未评的四份产物补齐 AI 评审，批次 `16f3839b-9118-4e59-a8b9-69d87219a535` 共 60 项。评审者为 Codex，运行环境未暴露渠道模型原标识，记录为 `inherited-parent-unreported`。脚本项沿用已校验指纹的 2026-10-29 桌面 / 手机自动检查，本次只对其初始画面、时间轴拼图与成功画面作图像判断，没有改动标准、原始 Prompt 或产物。

| 产物 | 综合 / 100 | 确定性 / 100 | 品味 / 100 | 有效 AI |
|---|---|---|---|---|
| [Claude Opus 5.5 Extra High](outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.html) | 96.0 | 100.0 | 86.7 | 1 |
| [Claude Opus 5.5 High](outputs/claude-opus-5-5-high/claude-opus-5-5-high.html) | 92.6 | 98.1 | 80.0 | 1 |
| [GPT 6.1 Sol Extra High](outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.html) | 90.3 | 96.1 | 76.7 | 1 |
| [GPT 5.6 Sol Extra High](outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.html) | 80.9 | 91.3 | 56.7 | 1 |
| [GPT 6.1 Terra Extra High](outputs/gpt-6-1-terra-xhigh/rocket-launch.html) | 75.3 | 86.1 | 50.0 | 1 |

新增四份产物均能在采样序列中辨认起飞转弯、级间分离、开罩和弧形地球。Claude Extra High 的主要画面项全部通过，三项品味依次为 4 / 4.5 / 4.5；Claude High 的品味依次为 4 / 4 / 4，脚本的重发复位项部分通过。GPT 6.1 Sol 的品味为 3.5 / 4 / 4，主要扣分是较几何化的地球与尾焰，脚本的复位和离台时刻部分通过。GPT 5.6 的贴地烟云与部署项部分通过：桌面能看到卫星太阳能板，但手机后段部署主体出框；品味为 2.5 / 3 / 3，脚本的复位和离台时刻部分通过。

GPT 6.1 Terra 的既有评分保持不变：桌面画面呈现发射、级间分离与卫星展开，手机飞行后段主体多次出框。它与新增四份不是同一图像评审批次，运行来源部分信息未知，生成条件与其他结果的可比性无法确认。

全部分数只适用于本实验 Prompt v1。拼图只证明采样时刻，不证明每一帧、实体帧率或音效；品味是 AI 判断，不宣称人类共识。本次补评分来自当前维护对话，不冒充独立新上下文或已知原标识模型的评审。
