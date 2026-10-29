# 03 · 超级马里奥 1-1：评测（Prompt v1）

- **Prompt**：[prompt-v1.md](../../../prompts/03-super-mario-1-1/prompt-v1.md)
- **评测协议**：6
- **标准冻结日期**：2026-10-26（新实验，运行模型前冻结）
- **评测日期**：2026-10-26、2026-10-29
- **评测者**：脚本 verify-artifacts；AI 评审 GPT 6.1 Sol Medium subagent（gpt-6.1-sol / medium，评 Sol 产物）、Claude Code subagent（claude-sonnet-5-5，评 Claude 产物）与 Codex AI reviewer（模型原标识未暴露，评 Terra 产物）
- **评测方式**：轻量评测：脚本一次真实运行判硬性要求，AI 看时间轴拼图逐项打勾和打分
- **评测环境**：Windows，Chrome 155.0.8059.85，Node.js v22.17.0；真实浏览器桌面 1440×900 / 手机 390×844 各跑一次；桌面把 requestAnimationFrame 模拟为 144Hz、手机模拟为 60Hz；检查器只用键盘盲操作关卡开头一段，不测地下房间、道具、乌龟壳、旗杆结算、实体帧率、音色与手感细节

## 协议说明

- 细则分两种判定：**脚本**项由 `verify-artifacts.mjs` 在一次真实运行中自动读数判断，AI 不再复核；**AI** 项由 AI 看拼图和关键帧判断。
- 检查器的固定操作：打开页面截标题 → 按 Enter 开始（2.5 秒内画面没有变化再依次试空格、Z、点击画布后按 Enter）→ 等过场黑屏结束后 1 秒 → 站立 2 秒 → 点按 Z 约 50 ms 短跳、按住 Z 约 600 ms 长跳 → 按住 → 走 2.6 秒后松开，等马里奥撞上第一只栗子怪死亡并重来 → 按住 X 和 → 跑 2 秒，再按 ← 0.3 秒刹车 → 之后每条命都按住 → 走 5 秒，直到 12 秒内不再出现过场黑屏或总时长约 150 秒。第一条命结束后没有重来时，刷新页面重新开始再测跑步。
- 画面读数：检查器直接读取游戏画布（优先 256×240 的画布或缓冲），换算到 256×240 像素坐标。镜头卷动量 = 每 0.1 秒相邻两帧在像素行 32–207 的最佳水平对齐量；速度取按键 0.8 秒后镜头在动的各 0.1 秒采样的中位数；跳跃高度 = 出生点附近（像素 x 0–127）相对起跳前画面最高变化行的起落差，扣除站立时本来就在变化的像素。像素/帧按每秒 60 帧换算。黑屏 = 至少 60% 像素接近黑色。
- 确定性项 pass / partial / fail = 5 / 2.5 / 0；partial 只表示看得见的部分完成，不代替不确定。脚本项按桌面、手机中较差的一次计；读不到数据按 fail 并写明原因。
- 品味项 0–5 分、0.5 步进。共同锚点：0 无有效画面；1 粗糙失衡；2 多处明显缺陷；3 连贯可读但普通；4 精致一致、缺陷轻微；5 出色且经得起细看。
- AI 一次看全部产物的拼图（桌面截游戏画布，按事件并在等待时每 0.5–1 秒一帧；手机截整屏，只截关键事件）及初始 / 结束画面。看不出来就写 pending，不猜。通过项不写说明，其他项写一句依据。
- 拼图只证明采样时刻，看不到帧间细节。检查器走不到的地下房间、隐藏方块、道具、乌龟壳和旗杆结算不评画面，关卡布局由地图脚本项覆盖；手感只按测得的数值和时间序列粗略评价。
- 总分 = Σ（维度分 ÷ 5 × 权重）。脚本取最新一次自动检查；每位 AI 只计最新完整批次，多位 AI 的总分等权平均。缺项不补分，没有完整评审显示待评。只比较本实验本版本。

## 评分维度

| ID | 名称 | 类型 | 权重 | 评分标准 |
|---|---|---|---|---|
| runtime | 运行与规格 | objective | 40 | 脚本读取运行结果、键盘操作下的画面测量与源码结构 |
| scenes | 关键画面 | objective | 30 | AI 在拼图中逐项确认 Prompt 要求的主要画面和流程是否出现 |
| taste | 像素与还原品味 | taste | 30 | AI 按共同 0–5 锚点评像素美术、动作镜头和整体还原度 |

## 评分细则

| ID | 评分维度 | 判定 | 要求 | 怎么查 |
|---|---|---|---|---|
| standalone | runtime | 脚本 | 单个自包含 HTML，不加载外部资源 | 目录只有一个产物文件；拦截并统计外部请求与 DOM / CSS 外部引用（图片、音频、字体、脚本库都算），有任何一个即 fail |
| console | runtime | 脚本 | 无运行错误 | 整个固定操作过程中无 pageerror 或 console.error（忽略 favicon） |
| pixel-display | runtime | 脚本 | 256×240 内部分辨率，整数倍放大并关闭平滑 | 进入关卡后查三个条件：有 256×240 的画布或缓冲；游戏画面显示为 256×240 的同一整数倍且画布完整在视口内；CSS 放大时 image-rendering 为 pixelated / crisp-edges，缓冲放大绘制时关闭 imageSmoothing。全满足 pass，有可见画布但缺任一项 partial |
| config | runtime | 脚本 | 物理数值集中在 CONFIG 对象 | 源码中名为 CONFIG 的对象字面量含 Prompt 的 9 个特征数值（1.5625、2.5625、0.0371、0.0557、0.0508、0.1016、0.125、0.4375、4.5，误差 0.5%）至少 7 个 pass；有 CONFIG 但不足 7 个 partial |
| level-format | runtime | 脚本 | 关卡是带图例注释的字符串地图 | 源码中有一个由 13–16 个字符串字面量组成的数组，各行等长、长 200–230 字符，且前方或内部注释说明了其中至少 60% 的非空白字符 pass；能找到地图但缺图例、行长不符或不是数组字面量 partial |
| layout | runtime | 脚本 | 关卡布局贴近 Prompt | 从地图读取 31 项：3 个坑的位置和宽度及“只有 3 个坑”、6 根管道的位置和高度、5 段台阶逐列高度、x≈198 的旗杆底座、15 组低层 / 高层砖块与 ? 块。地图底部对齐第 14 行，天空以外的字符算实体；允许整体平移 ±3 格、单项再 ±1 格。符合 ≥ 28 项 pass，≥ 19 项 partial |
| playable | runtime | 脚本 | 能从标题进入可操作的关卡 | 开始后按住 → 2.6 秒内镜头累计向右卷动 ≥ 48 像素（3 格） |
| jump-control | runtime | 脚本 | 长按跳明显高于短按跳 | 点按 Z 约 50 ms 与按住约 600 ms 各跳一次：长按起落差 ≥ 32 像素且 ≥ 短按的 1.5 倍 pass，只满足其一 partial |
| speed | runtime | 脚本 | 走 / 跑最高速度符合给定数值 | 走：按住 → 0.8 秒后、镜头在动时的卷动速度中位数在 1.5625 像素/帧 ±12% 内；跑：按住 X 和 → 同样测，在 2.5625 ±12% 内；两项都符合 pass，一项 partial |
| refresh-rate | runtime | 脚本 | 60Hz 与 144Hz 下速度一致 | 比较桌面 144Hz 与手机 60Hz 两次运行按 speed 方法测得的走速：比值 0.88–1.14 pass，0.75–1.33 partial，超出或测不到 fail；两边都测到跑速时同样判定并取较差 |
| audio | runtime | 脚本 | 用 Web Audio 合成音效 | 运行中创建了 AudioContext，且按 Z 后 0.3 秒内启动了 square 或自定义波形的振荡器 pass；只创建 AudioContext 或只有其他波形 partial；没有 Web Audio fail |
| title | scenes | AI | 标题画面 | 初始画面：有游戏名或标题标志，并提示怎么开始；只有其一 partial；直接是可玩的关卡 fail |
| intermission | scenes | AI | WORLD 1-1 过场 | 开始后与每次死亡后的帧：黑底显示 WORLD 1-1 和剩余命数；只见其一 partial |
| hud | scenes | AI | 顶部 HUD | 关卡帧顶部能读到 MARIO 与 6 位分数、金币数、WORLD 1-1、TIME，且 TIME 在先后帧中从约 400 递减；缺一两项 partial |
| overworld | scenes | AI | 关卡开头的场景 | 开局与行走帧：FC 式蓝天、白云、绿色灌木或山丘、棕色砖地面，以及前方的 ? 块与砖块行；缺一两类 partial |
| mario | scenes | AI | 小马里奥形象与动作帧 | 各帧的小马里奥约 16×16 像素、红帽红衣，站立、走路、跳跃、刹车姿态至少能分出三种；能认出但姿态少于三种 partial |
| goomba | scenes | AI | 栗子怪 | 行走帧中有可辨认的栗子怪（棕色蘑菇头、两只脚）在地面朝马里奥走来；有敌人但不像栗子怪 partial |
| death | scenes | AI | 死亡动画与重来 | 撞上栗子怪后的帧：马里奥换成死亡姿势、上跳后掉出屏幕，随后回到过场且命数减 1；只见其一 partial；撞上后没死 fail |
| game-over | scenes | AI | GAME OVER 画面 | 命用完后的帧出现 GAME OVER 画面；检查器跑到结束都没出现 fail |
| pixel-taste | taste | AI | 像素美术 | 看开局与行走帧：低分 色块拼凑、比例或配色不像 FC；3 能认出是 1-1 但精灵或地形粗糙；5 调色、精灵、砖块 / ? 块、云山灌木都接近原版像素画 |
| motion-taste | taste | AI | 动作与镜头 | 看跳跃、行走、刹车、死亡的时间序列：低分 姿态不变、跳跃或卷屏异常；3 动作帧和卷屏正常；5 动作帧、跳跃弧线、死亡动画和卷屏都像原版 |
| fidelity-taste | taste | AI | 整体还原度 | 桌面与手机拼图一起看：低分 只有零散画面、流程残缺；3 流程完整可玩；5 标题、过场、HUD、死亡与 GAME OVER 一致精致，像原版 |

## 自动检查

脚本一次真实运行的判定、截图拼图与指纹。由 `node scripts/verify-artifacts.mjs --write` 追加，不手改。

```json
[
  {
    "id": "20261026092329613-gpt-6-1-sol-xhigh",
    "key": "gpt-6-1-sol-xhigh",
    "sha256": "df626ebc5b9b718fb39c4033218c87a5ada67bd05467a6e7f0dcc32f62c0869d",
    "fingerprint": "47c925ac54a49a845fd4bd3b63345aa392a7abe158c8230b7d250cdce8f9f9f0",
    "at": "2026-10-26T09:24:29.089Z",
    "checker": "verify-artifacts@9edd49ce2d41",
    "environment": {
      "browser": "155.0.8059.85",
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
        "evidence": "桌面 144Hz：目录 1 个文件，外部引用 0 个；手机 60Hz：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "console",
        "status": "pass",
        "evidence": "桌面 144Hz：56.7s 固定操作中无页面错误或 console.error；手机 60Hz：56.4s 固定操作中无页面错误或 console.error"
      },
      {
        "id": "pixel-display",
        "status": "pass",
        "evidence": "桌面 144Hz：画布 256×240，游戏画面显示 768×720（3 倍），完整在视口内，image-rendering crisp-edges；有 256×240 画布或缓冲；手机 60Hz：画布 256×240，游戏画面显示 256×240（1 倍），完整在视口内，image-rendering crisp-edges；有 256×240 画布或缓冲"
      },
      {
        "id": "config",
        "status": "pass",
        "evidence": "CONFIG 对象含特征数值 9/9"
      },
      {
        "id": "level-format",
        "status": "partial",
        "evidence": "字符串数组 15 行，行长 212/228；注释说明了 14/14 种字符"
      },
      {
        "id": "layout",
        "status": "partial",
        "evidence": "整体平移 0 格，符合 24/31 项，地图中共 3 个坑；未符合：管道 x=163、台阶 x=134、台阶 x=140、台阶 x=148、台阶 x=155、台阶 x=181、旗杆底座 x=198"
      },
      {
        "id": "playable",
        "status": "pass",
        "evidence": "桌面 144Hz：开始方式 Enter（有黑屏过场），按住 → 2.6s 镜头卷动 157 像素；手机 60Hz：开始方式 Enter（有黑屏过场），按住 → 2.6s 镜头卷动 149 像素"
      },
      {
        "id": "jump-control",
        "status": "pass",
        "evidence": "桌面 144Hz：短按起落差 24 像素，长按 60 像素（2.5 倍）；手机 60Hz：短按起落差 24 像素，长按 60 像素（2.5 倍）"
      },
      {
        "id": "speed",
        "status": "pass",
        "evidence": "桌面 144Hz：走 1.543 像素/帧（目标 1.5625），跑 2.51（目标 2.5625）；手机 60Hz：走 1.517 像素/帧（目标 1.5625），跑 2.543（目标 2.5625）"
      },
      {
        "id": "refresh-rate",
        "status": "pass",
        "evidence": "走速 桌面 144Hz 1.543、手机 60Hz 1.517，比值 1.02；跑速 2.51 / 2.543，比值 0.99"
      },
      {
        "id": "audio",
        "status": "pass",
        "evidence": "桌面 144Hz：AudioContext 1 个，振荡器启动 52 次（square/triangle），缓冲源 0 次；按 Z 后 0.3s 内有方波；手机 60Hz：AudioContext 1 个，振荡器启动 52 次（square/triangle），缓冲源 0 次；按 Z 后 0.3s 内有方波"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026092329613/gpt-6-1-sol-xhigh-desktop-ready.jpg",
        "sha256": "148c84e7c6f2eb949f5cc5c44b7c71bf870af4e91f846f3803db002840b2c646",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026092329613/gpt-6-1-sol-xhigh-desktop-complete.jpg",
        "sha256": "148c84e7c6f2eb949f5cc5c44b7c71bf870af4e91f846f3803db002840b2c646",
        "kind": "frame",
        "viewport": "desktop",
        "label": "结束画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026092329613/gpt-6-1-sol-xhigh-desktop-sheet-1.jpg",
        "sha256": "fa52255bd24d9fab4be46612b072c3d4a1880020956e081d1d563cafec0b9e26",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 1.7–15.5s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026092329613/gpt-6-1-sol-xhigh-desktop-sheet-2.jpg",
        "sha256": "ffdd92737386449b48f1bda0acdf3ec3fedcfd25834fd7b515136c5005a73d47",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 16–24.4s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026092329613/gpt-6-1-sol-xhigh-desktop-sheet-3.jpg",
        "sha256": "e702390ebaa7814830b7d19242af2bafec302b20615a01c8c32e5b42f03e2ea6",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 27.3–39.8s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026092329613/gpt-6-1-sol-xhigh-desktop-sheet-4.jpg",
        "sha256": "1d3beb7939b73e58105ba29fa12a053852a19d2b5cbae14796e2247e196d5ac3",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 40.9–47.3s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026092329613/gpt-6-1-sol-xhigh-desktop-sheet-5.jpg",
        "sha256": "ccd7a6ca3b5c5e0b8ff18d4b3f9e1d6d9509b9230d65c368dc879dd7ae2f5543",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 47.9–56.6s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026092329613/gpt-6-1-sol-xhigh-mobile-ready.jpg",
        "sha256": "c3956030f7e385f2ee849496c3b69807551b4a3330fb6d4e05d7635c2714b311",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026092329613/gpt-6-1-sol-xhigh-mobile-complete.jpg",
        "sha256": "c3956030f7e385f2ee849496c3b69807551b4a3330fb6d4e05d7635c2714b311",
        "kind": "frame",
        "viewport": "mobile",
        "label": "结束画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026092329613/gpt-6-1-sol-xhigh-mobile-sheet-1.jpg",
        "sha256": "bce7200030eae7f9684d134edde21a3717b6d8ee2889ede9b937c89ea001dfbf",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 1.7–24.5s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026092329613/gpt-6-1-sol-xhigh-mobile-sheet-2.jpg",
        "sha256": "e5b2a9973bf0f5e217dbedb151f92381b815d1bae05972ab7b68fca5642ae111",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 27.3–56.4s"
      }
    ]
  },
  {
    "id": "20261026094120752-claude-opus-5-5-xhigh",
    "key": "claude-opus-5-5-xhigh",
    "sha256": "96e3f23558b687e4c70b3c45ccfd65ead8395cc161836537aaf5d8e6c45015f5",
    "fingerprint": "47c925ac54a49a845fd4bd3b63345aa392a7abe158c8230b7d250cdce8f9f9f0",
    "at": "2026-10-26T09:42:26.431Z",
    "checker": "verify-artifacts@9edd49ce2d41",
    "environment": {
      "browser": "155.0.8059.85",
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
        "evidence": "桌面 144Hz：目录 1 个文件，外部引用 0 个；手机 60Hz：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "console",
        "status": "pass",
        "evidence": "桌面 144Hz：63s 固定操作中无页面错误或 console.error；手机 60Hz：62.9s 固定操作中无页面错误或 console.error"
      },
      {
        "id": "pixel-display",
        "status": "pass",
        "evidence": "桌面 144Hz：画布 256×240，游戏画面显示 768×720（3 倍），完整在视口内，image-rendering crisp-edges；有 256×240 画布或缓冲；手机 60Hz：画布 256×240，游戏画面显示 256×240（1 倍），完整在视口内，image-rendering crisp-edges；有 256×240 画布或缓冲"
      },
      {
        "id": "config",
        "status": "pass",
        "evidence": "CONFIG 对象含特征数值 9/9"
      },
      {
        "id": "level-format",
        "status": "pass",
        "evidence": "字符串数组 15 行，行长 212；注释说明了 16/16 种字符"
      },
      {
        "id": "layout",
        "status": "pass",
        "evidence": "整体平移 0 格，符合 31/31 项，地图中共 3 个坑"
      },
      {
        "id": "playable",
        "status": "pass",
        "evidence": "桌面 144Hz：开始方式 Enter（有黑屏过场），按住 → 2.6s 镜头卷动 149 像素；手机 60Hz：开始方式 Enter（有黑屏过场），按住 → 2.6s 镜头卷动 141 像素"
      },
      {
        "id": "jump-control",
        "status": "pass",
        "evidence": "桌面 144Hz：短按起落差 25 像素，长按 64 像素（2.56 倍）；手机 60Hz：短按起落差 28 像素，长按 64 像素（2.29 倍）"
      },
      {
        "id": "speed",
        "status": "pass",
        "evidence": "桌面 144Hz：走 1.54 像素/帧（目标 1.5625），跑 2.584（目标 2.5625）；手机 60Hz：走 1.515 像素/帧（目标 1.5625），跑 2.527（目标 2.5625）"
      },
      {
        "id": "refresh-rate",
        "status": "pass",
        "evidence": "走速 桌面 144Hz 1.54、手机 60Hz 1.515，比值 1.02；跑速 2.584 / 2.527，比值 1.02"
      },
      {
        "id": "audio",
        "status": "pass",
        "evidence": "桌面 144Hz：AudioContext 1 个，振荡器启动 80 次（square/triangle），缓冲源 0 次；按 Z 后 0.3s 内有方波；手机 60Hz：AudioContext 1 个，振荡器启动 80 次（square/triangle），缓冲源 0 次；按 Z 后 0.3s 内有方波"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026094120752/claude-opus-5-5-xhigh-desktop-ready.jpg",
        "sha256": "82dfe0c4e607e2992d2bf3cefbe1e50997c693ac1b41020f2ff101b0377eee85",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026094120752/claude-opus-5-5-xhigh-desktop-complete.jpg",
        "sha256": "82dfe0c4e607e2992d2bf3cefbe1e50997c693ac1b41020f2ff101b0377eee85",
        "kind": "frame",
        "viewport": "desktop",
        "label": "结束画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026094120752/claude-opus-5-5-xhigh-desktop-sheet-1.jpg",
        "sha256": "7e10d289a8e29babaa417800c9c4abd4732aa2c7a6a648db1f309af4f0c02465",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 1.7–16.1s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026094120752/claude-opus-5-5-xhigh-desktop-sheet-2.jpg",
        "sha256": "4f1e5b6505a1337944f37181177699768ec429f0811eae042f087a598e34ee8c",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 16.7–25.6s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026094120752/claude-opus-5-5-xhigh-desktop-sheet-3.jpg",
        "sha256": "3434b7bcaa128b82c3666d38c70e285d56b071ad3089bb597fc68e6aa784690a",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 26.2–36.4s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026094120752/claude-opus-5-5-xhigh-desktop-sheet-4.jpg",
        "sha256": "70ca19ed79fd8107552a03449fe9f8d7ff8b160a8abc9b8082ae882fec79f8e1",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 36.9–49.4s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026094120752/claude-opus-5-5-xhigh-desktop-sheet-5.jpg",
        "sha256": "ee0d7282ed84f0051ac5f889ea80d48fee5de304615506083ec1578bc88177b4",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 50–62.9s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026094120752/claude-opus-5-5-xhigh-mobile-ready.jpg",
        "sha256": "9fed655d2d79e9df222db06143de8d21a93674cdef6442ea5b02aca4d1867e3b",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026094120752/claude-opus-5-5-xhigh-mobile-complete.jpg",
        "sha256": "cc728ffa8471a76253abdc6b43555fd678f7f3b93d898405a744b762abe54ff8",
        "kind": "frame",
        "viewport": "mobile",
        "label": "结束画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026094120752/claude-opus-5-5-xhigh-mobile-sheet-1.jpg",
        "sha256": "92ecb0f7302bffe8ce2e291d1d2fad6a8b724394291d623f06087c972a531ad1",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 1.7–24.1s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261026094120752/claude-opus-5-5-xhigh-mobile-sheet-2.jpg",
        "sha256": "e62edf5feeb0cf9808abcee28d9a5e5802f12fb88c6f4731c194517be537050f",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 27.8–62.8s"
      }
    ]
  },
  {
    "id": "20261029065204220-gpt-6-1-terra-xhigh",
    "key": "gpt-6-1-terra-xhigh",
    "sha256": "054b7ea84643f5f5240cf696d80d88ed51dad493bd6c63e8774edf77b49b7ae2",
    "fingerprint": "47c925ac54a49a845fd4bd3b63345aa392a7abe158c8230b7d250cdce8f9f9f0",
    "at": "2026-10-29T06:53:08.827Z",
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
        "evidence": "桌面 144Hz：目录 1 个文件，外部引用 0 个；手机 60Hz：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "console",
        "status": "fail",
        "evidence": "桌面 144Hz：2 条错误：particles is not iterable；手机 60Hz：2 条错误：particles is not iterable"
      },
      {
        "id": "pixel-display",
        "status": "partial",
        "evidence": "桌面 144Hz：画布 256×240，游戏画面显示 768×702（非整数倍），完整在视口内，image-rendering crisp-edges；有 256×240 画布或缓冲；手机 60Hz：画布 256×240，游戏画面显示 256×240（1 倍），完整在视口内，image-rendering crisp-edges；有 256×240 画布或缓冲"
      },
      {
        "id": "config",
        "status": "pass",
        "evidence": "CONFIG 对象含特征数值 9/9"
      },
      {
        "id": "level-format",
        "status": "fail",
        "evidence": "源码中找不到 13 行以上、每行约 212 字符的字符串地图"
      },
      {
        "id": "layout",
        "status": "fail",
        "evidence": "没有可读取的关卡地图"
      },
      {
        "id": "playable",
        "status": "fail",
        "evidence": "桌面 144Hz：开始方式 无，按住 → 2.6s 镜头卷动 0 像素（未能从标题开始）；手机 60Hz：开始方式 无，按住 → 2.6s 镜头卷动 0 像素（未能从标题开始）"
      },
      {
        "id": "jump-control",
        "status": "fail",
        "evidence": "桌面 144Hz：短按起落差 无 像素，长按 无 像素（未能从标题开始）；手机 60Hz：短按起落差 无 像素，长按 无 像素（未能从标题开始）"
      },
      {
        "id": "speed",
        "status": "fail",
        "evidence": "桌面 144Hz：走 无 像素/帧（目标 1.5625），跑 无（目标 2.5625），跑步在刷新后测得（未能从标题开始）；手机 60Hz：走 无 像素/帧（目标 1.5625），跑 无（目标 2.5625），跑步在刷新后测得（未能从标题开始）"
      },
      {
        "id": "refresh-rate",
        "status": "fail",
        "evidence": "走速 桌面 144Hz 无、手机 60Hz 无，比值 测不到；跑速 无 / 无，比值 测不到"
      },
      {
        "id": "audio",
        "status": "fail",
        "evidence": "桌面 144Hz：AudioContext 0 个，振荡器启动 0 次（无），缓冲源 0 次；按 Z 后 0.3s 内没有方波；手机 60Hz：AudioContext 0 个，振荡器启动 0 次（无），缓冲源 0 次；按 Z 后 0.3s 内没有方波"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261029065204220/gpt-6-1-terra-xhigh-desktop-ready.jpg",
        "sha256": "ea5a4ef13f8c254545bc784d3825b3f572e64c8934ce7a81df2fa982d92ef960",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261029065204220/gpt-6-1-terra-xhigh-desktop-complete.jpg",
        "sha256": "ea5a4ef13f8c254545bc784d3825b3f572e64c8934ce7a81df2fa982d92ef960",
        "kind": "frame",
        "viewport": "desktop",
        "label": "结束画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261029065204220/gpt-6-1-terra-xhigh-desktop-sheet-1.jpg",
        "sha256": "3693a9d997d771bcf1e5527abda10e50b25bc39e4ca63556ab67372c80581372",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 1.7–22s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261029065204220/gpt-6-1-terra-xhigh-desktop-sheet-2.jpg",
        "sha256": "af26d331b44e5aa69c09ea6e612284906b9e9dd5e8449ec4a9c10aaa42a1e55a",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 22.6–40.8s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261029065204220/gpt-6-1-terra-xhigh-desktop-sheet-3.jpg",
        "sha256": "511767127b3bf68bc171c0741cd48d910833259375c1f930aa628f876c98b5ad",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 43.4–52.7s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261029065204220/gpt-6-1-terra-xhigh-desktop-sheet-4.jpg",
        "sha256": "3b94af263378037a14b5eabc17bb81831441313bad40949e69843db28a7ec703",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 53.3–62.2s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261029065204220/gpt-6-1-terra-xhigh-mobile-ready.jpg",
        "sha256": "af850a90fef3de168745963a84ac51d563e05ddd6eaa2762384a610fe1c71af1",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261029065204220/gpt-6-1-terra-xhigh-mobile-complete.jpg",
        "sha256": "af850a90fef3de168745963a84ac51d563e05ddd6eaa2762384a610fe1c71af1",
        "kind": "frame",
        "viewport": "mobile",
        "label": "结束画面"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261029065204220/gpt-6-1-terra-xhigh-mobile-sheet-1.jpg",
        "sha256": "323e1f4b0edd31edcd9908888dcff190cbba7ea90bb22abd265f40fa1f4151b8",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 1.7–38.2s"
      },
      {
        "path": "assets/evidence/03-super-mario-1-1/v1/20261029065204220/gpt-6-1-terra-xhigh-mobile-sheet-2.jpg",
        "sha256": "5c941bb1233cd19ea1e5dfcae9cb7ef70f8f052843f9b168bb187736d333d73f",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 40.8–62.1s"
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
    "id": "389addc4-7619-4056-bf7f-121ce0e66ce1",
    "experiment": "03-super-mario-1-1",
    "version": 1,
    "fingerprint": "47c925ac54a49a845fd4bd3b63345aa392a7abe158c8230b7d250cdce8f9f9f0",
    "reviewer": "GPT 6.1 Sol Medium subagent",
    "model": "gpt-6.1-sol",
    "hashes": {
      "gpt-6-1-sol-xhigh": "df626ebc5b9b718fb39c4033218c87a5ada67bd05467a6e7f0dcc32f62c0869d"
    },
    "at": "2026-10-26T09:28:03.026Z",
    "evidence": [
      "20261026092329613-gpt-6-1-sol-xhigh"
    ],
    "checks": [
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "title",
        "status": "partial",
        "score": 2.5,
        "note": "桌面及手机初始画面有 SUPER MARIO BROS. 标志和 1 PLAYER GAME 菜单，但未提示用于开始的按键或具体操作。"
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "intermission",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "hud",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "overworld",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "mario",
        "status": "partial",
        "score": 2.5,
        "note": "桌面 4.8、7.2、9.2、11.7、21.9 秒可辨认小尺寸红帽红衣角色及地面与腾空姿态，但无法从这些采样明确区分站立、走路、跳跃、刹车中的至少三种动作帧。"
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "goomba",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "death",
        "status": "partial",
        "score": 2.5,
        "note": "桌面 14.3–16.6 秒可见接敌后角色腾空并消失，17 秒过场命数由开局的 3 减为 2 且 19.7 秒重来，但采样未完整显示死亡姿势及掉出屏幕的过程。"
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "game-over",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "pixel-taste",
        "status": "scored",
        "score": 4,
        "note": "桌面 4.8、12.7、21.9 秒的蓝天、砖块、问号块、绿管道和栗子怪具有统一清晰的 FC 像素感，但云朵及山丘灌木纹理较简化，地面砖纹也较密。"
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "motion-taste",
        "status": "scored",
        "score": 3.5,
        "note": "桌面 7.2、9.2 秒跳跃高度和 11.7–13.8 秒地形横移呈现正常的跳跃与卷屏观感，但 14.3–17 秒死亡序列及 21.9 秒刹车姿态在采样中不够完整鲜明，未达到原版动作细腻度的高分锚点。"
      },
      {
        "key": "gpt-6-1-sol-xhigh",
        "id": "fidelity-taste",
        "status": "scored",
        "score": 4,
        "note": "桌面 1.7–34.9 秒及手机 1.7–35 秒均呈现风格一致的标题、黑底命数过场、关卡 HUD、减命重来和 GAME OVER，但标题缺明确开始操作提示且动作细节表现有限。"
      }
    ]
  },
  {
    "protocol": 6,
    "source": "ai",
    "id": "da79e634-5aee-4e11-a184-5f8075071f8c",
    "experiment": "03-super-mario-1-1",
    "version": 1,
    "fingerprint": "47c925ac54a49a845fd4bd3b63345aa392a7abe158c8230b7d250cdce8f9f9f0",
    "reviewer": "Claude Code subagent (Sonnet reviewer)",
    "model": "claude-sonnet-5-5",
    "hashes": {
      "claude-opus-5-5-xhigh": "96e3f23558b687e4c70b3c45ccfd65ead8395cc161836537aaf5d8e6c45015f5"
    },
    "at": "2026-10-26T09:43:41Z",
    "evidence": [
      "20261026094120752-claude-opus-5-5-xhigh"
    ],
    "checks": [
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "title",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "intermission",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "hud",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "overworld",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "mario",
        "status": "pass",
        "score": 5,
        "note": "5.3s 站立、7.7s/9.7s 跳跃、12.2s 行走能分出三种红帽红衣小马里奥姿态；刹车姿态在拼图里看不清。"
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "goomba",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "death",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "game-over",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "pixel-taste",
        "status": "scored",
        "score": 4.5,
        "note": "标题牌、蘑菇光标、带眼睛的山丘、云、砖地、? 块和 HUD 字体都很像 FC 原版；灌木没有深色描边，略有差别。"
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "motion-taste",
        "status": "scored",
        "score": 4,
        "note": "7.7s/9.7s 跳跃弧线自然、卷屏顺畅，撞栗子怪后马里奥在空中再消失（16.1s 到 16.7s）；刹车和死亡姿势在拼图里看不够清楚。"
      },
      {
        "key": "claude-opus-5-5-xhigh",
        "id": "fidelity-taste",
        "status": "scored",
        "score": 4.5,
        "note": "标题、过场（x3/x2/x1）、HUD、死亡、GAME OVER 到回标题流程完整一致，桌面和手机画面相同，只是手机上画面只有 1 倍显示偏小。"
      }
    ]
  },
  {
    "protocol": 6,
    "source": "ai",
    "id": "77c15caf-953a-44dc-bb6d-04a7653f412c",
    "experiment": "03-super-mario-1-1",
    "version": 1,
    "fingerprint": "47c925ac54a49a845fd4bd3b63345aa392a7abe158c8230b7d250cdce8f9f9f0",
    "reviewer": "Codex AI reviewer",
    "model": "inherited-parent-unreported",
    "hashes": {
      "gpt-6-1-terra-xhigh": "054b7ea84643f5f5240cf696d80d88ed51dad493bd6c63e8774edf77b49b7ae2"
    },
    "at": "2026-10-29T14:58:47+08:00",
    "evidence": [
      "20261029065204220-gpt-6-1-terra-xhigh"
    ],
    "checks": [
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "title",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "intermission",
        "status": "pending",
        "score": null,
        "note": "桌面 2.5–10.1 秒与手机相应帧仍是标题，没有可判断的过场画面。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "hud",
        "status": "pending",
        "score": null,
        "note": "桌面 13–22 秒与手机相应帧仍是标题，未看到关卡 HUD。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "overworld",
        "status": "pending",
        "score": null,
        "note": "桌面 13–22 秒与手机相应帧仍是标题，未看到关卡场景。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "mario",
        "status": "pending",
        "score": null,
        "note": "桌面 13–22 秒的开局、跳跃和行走采样均停在标题，未看到角色。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "goomba",
        "status": "pending",
        "score": null,
        "note": "桌面 19.8–22 秒行走与等待帧仍是标题，未看到敌人。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "death",
        "status": "pending",
        "score": null,
        "note": "桌面 19.8–27.2 秒仍是标题，未出现接敌、死亡或重来画面。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "game-over",
        "status": "fail",
        "score": 0,
        "note": "桌面 62.2 秒与手机 62.1 秒结束画面仍为标题，检查结束未出现 GAME OVER。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "pixel-taste",
        "status": "pending",
        "score": null,
        "note": "桌面和手机拼图只有标题，没有可评估的精灵与关卡地形。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "motion-taste",
        "status": "pending",
        "score": null,
        "note": "桌面跳跃、行走和刹车采样始终是静止标题，无法评估动作与镜头。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "fidelity-taste",
        "status": "scored",
        "score": 1,
        "note": "桌面和手机从初始到结束均只有简化标题，过场、关卡和死亡流程没有呈现。"
      }
    ]
  }
]
```

## 评测结论

2026-10-29 新增 [GPT 6.1 Terra Extra High](outputs/gpt-6-1-terra-xhigh/index.html)。显示名与推理档位由用户提供，生成对话未暴露渠道原始模型标识；此产物在已有对话上下文中读取 Prompt 后生成，并非独立新会话仅接收 Prompt 原文，与以下单轮结果的可比性受限。

该产物的桌面和手机自动检查均报告 `particles is not iterable`，无法完成开始游戏的操作。自包含与 CONFIG 项通过，像素显示部分通过，其余自动项未通过；原始 HTML 保持不变。地图格式和布局检查无法从该产物的动态地图构造读取所需的字符串数组。

AI 评审批次 `77c15caf-953a-44dc-bb6d-04a7653f412c` 仅依据该次自动检查的桌面与手机拼图和关键帧：标题与开始提示通过；检查结束未出现 GAME OVER，按冻结细则判未通过；整体还原度为 1 / 5。其余关卡画面与动作无法观察，标记待评。批次不完整，不计有效 AI 数，不计算综合分；这些判断不代表未观察到的内容一定没有实现。评审模型原标识未暴露，也不是独立上下文的评审。

非正式参考分：GPT 6.1 Terra Extra High 为 14.8 / 100。按用户要求，仅在这个假设性计算中把未观察到的 AI 细则暂按零分计算：运行与规格 9.1 / 40、关键画面 3.75 / 30、像素与还原品味 2 / 30，合计按未舍入值计算。此参考分违反协议 6 的缺项不补分规则，不是正式综合分，不计入有效 Agent 或产物比较；正式综合分仍为待评。

2026-10-26 完成两份产物的协议 6 评测，标准在两次生成之前冻结。两份产物都在独立上下文中生成，模型只收到 Prompt 的完整 `text` 正文：

- GPT 6.1：`gpt-6.1-sol / xhigh`，实际通道为 `custom`，工具为 `codex-desktop-subagent`；落盘前仅另读取了允许的 `AGENTS.md`。
- Claude：`claude-opus-5-5 / xhigh`，工具为 `claude-code` 子代理；在仓库外的空目录生成，生成器自报未联网、未读取仓库文件，成品按字节原样复制进 `outputs/`。

每份产物的生成与 AI 评审都是不同的独立子代理，未共享上下文或生成器自查结论。

| 产物 | 综合 / 100 | 确定性 / 100 | 品味 / 100 | 有效独立 AI |
|---|---|---|---|---|
| [Claude Opus 5.5 Extra High](outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.html) | 96.0 | 100.0 | 86.7 | 1（claude-sonnet-5-5） |
| [GPT 6.1 Sol Extra High](outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.html) | 83.7 | 86.8 | 76.7 | 1（gpt-6.1-sol） |

**可比性提醒**：目前两份产物由不同的 AI 评审打分，且各自的评审与被评模型同属一家厂商（Claude 产物由 Sonnet 评，GPT 产物由 GPT 6.1 评）。脚本项是同一检查器、同一标准，可以直接比较；画面与品味分来自不同评审，不是同一把尺子。要比较综合分，应让同一位 AI 评审把两份产物放在一批里一起评。

GPT 6.1 Sol Extra High（AI 批次 `389addc4-7619-4056-bf7f-121ce0e66ce1`）：

- 脚本 11 项：9 项通过、2 项部分通过。自包含、运行、像素显示、CONFIG、可操作性、长短跳、走跑速度、模拟刷新率一致性与 Web Audio 均通过。
- 地图格式与布局部分通过：15 行字符串地图混有 212 / 228 两种行长；布局符合 24 / 31 项，出口管道、台阶和旗杆底座存在偏差。原始 HTML 未修补。
- AI 画面 8 项：5 项通过、3 项部分通过。标题缺明确的开始操作提示；拼图中可辨认的角色动作与死亡过程不够完整，依冻结标准记部分通过，不据源码补判。
- 三项品味分依次为像素美术 4 / 5、动作与镜头 3.5 / 5、整体还原度 4 / 5；这是该 AI 按冻结锚点作出的判断，不代表人类共识。

Claude Opus 5.5 Extra High（AI 批次 `da79e634-5aee-4e11-a184-5f8075071f8c`）：

- 脚本 11 项全部通过：15 行 × 212 列字符串地图，注释说明了全部 16 种字符，布局符合 31 / 31 项；CONFIG 含 9 / 9 个特征数值；走 1.54 / 1.515、跑 2.584 / 2.527 像素/帧（目标 1.5625 / 2.5625）；短按与长按起落差 25–28 / 64 像素；144Hz 与 60Hz 的走、跑速度之比均为 1.02；画布 256×240，桌面 3 倍、手机 1 倍整数放大，image-rendering 为 crisp-edges；按跳跃有方波音效；约 63 秒固定操作无报错。
- AI 画面 8 项全部通过：标题、WORLD 1-1 过场（命数 3→2→1）、HUD 与 TIME 递减、开头场景、马里奥站立 / 跳跃 / 行走姿态、栗子怪、死亡后重来、GAME OVER 后回到标题都在拼图中出现。评审同时注明刹车姿态和死亡姿势在采样帧里看不清；死亡项按“撞上后在空中消失、回到过场且命数减 1”判为通过。
- 三项品味分依次为像素美术 4.5 / 5、动作与镜头 4 / 5、整体还原度 4.5 / 5；扣分理由是灌木缺深色描边、刹车与死亡姿势在拼图中不够清楚、手机上只有 1 倍显示偏小。这是该 AI 按冻结锚点作出的判断，不代表人类共识。

正式证据仅为本文件所列自动检查记录及其关键帧 / 拼图（两份产物各 11 张）。生成器的自查未计入评分。当前结果不等于全关卡实玩通关，也不证明未采样的地下房间、道具、龟壳、旗杆结算、实体帧率或音色均满足要求。
