# 02 · 鹈鹕骑自行车：评测（Prompt v1）

- **Prompt**：[prompt-v1.md](../../../prompts/02-pelican-bicycle/prompt-v1.md)
- **评测协议**：6
- **标准冻结日期**：2026-10-26（已有产物，事后冻结；协议 5 的旧评分与旧媒体已按维护者要求移除，不再展示）
- **评测日期**：未评测
- **评测者**：尚未登记
- **评测方式**：轻量评测：脚本一次真实渲染判硬性要求，AI 看连续帧拼图逐项打勾和打分
- **评测环境**：真实浏览器 img 模式，桌面 1440×900 / 手机 390×844 各一次；不测实体帧率与 DPR

## 协议说明

- 细则分两种判定：**脚本**项由 `verify-artifacts.mjs` 自动判断，AI 不再复核；**AI** 项由 AI 看拼图和首帧判断。
- 确定性项 pass / partial / fail = 5 / 2.5 / 0；partial 只表示看得见的部分完成，不代替不确定。脚本项按桌面、手机中较差的一次计。
- 品味项 0–5 分、0.5 步进。共同锚点：0 无有效画面；1 粗糙失衡；2 多处明显缺陷；3 连贯可读但普通；4 精致一致、缺陷轻微；5 出色且经得起细看。
- AI 一次看全部产物的拼图（桌面约每 0.15 秒一帧共 16 帧，手机每 0.3 秒一帧共 6 帧）及桌面首帧大图。看不出来就写 pending，不猜。通过项不写说明，其他项写一句依据。
- 拼图只覆盖约 2.4 秒；循环是否无缝只能按帧序列粗略判断，看不出写 pending。
- 总分 = Σ（维度分 ÷ 5 × 权重）。脚本取最新一次自动检查；每位 AI 只计最新完整批次，多位 AI 的总分等权平均。缺项不补分，没有完整评审显示待评。只比较本实验本版本。

## 评分维度

| ID | 名称 | 类型 | 权重 | 评分标准 |
|---|---|---|---|---|
| file | 文件与运行 | objective | 15 | 脚本检查合法 SVG、自包含、无脚本、img 模式动画 |
| drawing | 物种与自行车 | objective | 25 | AI 确认加州褐鹈鹕特征和自行车结构 |
| motion | 蹬踏与循环 | objective | 20 | AI 在连续帧中确认轮转、蹬踏同步和循环 |
| visual | 造型品味 | taste | 25 | AI 按共同 0–5 锚点评造型、比例、配色与线条 |
| direction | 动态品味 | taste | 15 | AI 按共同 0–5 锚点评蹬踏自然度与节奏 |

## 评分细则

| ID | 评分维度 | 判定 | 要求 | 怎么查 |
|---|---|---|---|---|
| svg-valid | file | 脚本 | 合法 SVG 且有有效 viewBox | XML 无解析错误、根元素为 svg、viewBox 四个正数，img 解码成功 |
| no-script | file | 脚本 | 无脚本 | 无 script 元素、on 事件属性或 javascript: URL |
| standalone | file | 脚本 | 无外部文件 | 目录只有一个产物文件；无外部 href / src / CSS url / import，img 模式无额外请求 |
| animation | file | 脚本 | img 模式确实在动 | 连续截图中至少两帧不同 |
| pelican | drawing | AI | 一眼认得出是鹈鹕且有大喉囊 | 首帧大图：长喙和喉囊清楚，不能只靠标题 |
| plumage | drawing | AI | 繁殖期羽色 | 首帧大图：黄白头顶、栗色后颈、红色喉囊；缺一 partial，缺两项及以上 fail |
| feathers | drawing | AI | 羽毛示意清楚 | 首帧大图：翅膀或身体有可辨认的羽毛层次 |
| bicycle | drawing | AI | 自行车结构正确 | 首帧大图：菱形车架、前后叉、两轮带辐条、车把和座椅；连接错误或缺件 partial |
| framing | drawing | AI | 主体完整不被裁切 | 桌面与手机：喙、尾、车轮都在画面内 |
| wheels | motion | AI | 两个车轮在转 | 连续帧中辐条或标记位置变化；只有一个轮转 partial |
| pedaling | motion | AI | 腿跟着曲柄蹬踏 | 连续帧中曲柄转动，两腿交替且两踏板相对；腿与曲柄明显不同步 partial |
| feet | motion | AI | 脚踩在踏板上 | 各帧双脚都落在对应踏板上；偶尔脱开 partial，持续脱开 fail |
| loop | motion | AI | 循环无明显跳变 | 帧序列中找到重复的姿态且前后衔接无突变；看不出写 pending |
| shape-taste | visual | AI | 造型与比例 | 低分 泛化鸟形、比例矛盾；3 易认、骑姿成立；5 喙、喉囊、颈和骑姿统一有神态 |
| color-taste | visual | AI | 配色与线条 | 低分 颜色杂乱、线条粗糙；3 协调整洁；5 羽色、明暗与线宽精致统一 |
| motion-taste | direction | AI | 蹬踏自然度与节奏 | 看连续帧：低分 机械抽动或漂浮；3 连贯可读；5 腿、脚、曲柄和身体有可信的节奏 |

## 自动检查

脚本一次真实渲染的判定、连续帧拼图与指纹。由 `node scripts/verify-artifacts.mjs --write` 追加，不手改。

```json
[
  {
    "id": "20261029064143648-gpt-6-1-terra-xhigh",
    "key": "gpt-6-1-terra-xhigh",
    "sha256": "0c1d52cc3c4c7087993c1e7163d4e782184c79e1d52be14eb5f275be26db23cf",
    "fingerprint": "c9569c4bbc9c5878c757f21e0107fe4da2c130a78f66a2622226b8b19a178c69",
    "at": "2026-10-29T06:41:47.553Z",
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
        "id": "svg-valid",
        "status": "pass",
        "evidence": "桌面：XML 无解析错误，viewBox 有效，img 解码成功；手机：XML 无解析错误，viewBox 有效，img 解码成功"
      },
      {
        "id": "no-script",
        "status": "pass",
        "evidence": "桌面：无 script、事件属性或 javascript: URL；手机：无 script、事件属性或 javascript: URL"
      },
      {
        "id": "standalone",
        "status": "pass",
        "evidence": "桌面：目录 1 个文件，外部引用 0 个；手机：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "animation",
        "status": "pass",
        "evidence": "桌面：img 模式 16 帧中 16 帧互不相同；手机：img 模式 6 帧中 6 帧互不相同"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029064143648/gpt-6-1-terra-xhigh-desktop-ready.jpg",
        "sha256": "d757c106fa287663c15e7f75cdaf285aed360b262070b77bca242b8ca7b9995e",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029064143648/gpt-6-1-terra-xhigh-desktop-sheet-1.jpg",
        "sha256": "46af24472b3e928355519d95b46f9314ec8ddf509f71281a629bdb66a444cf8d",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 0–2.25s"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029064143648/gpt-6-1-terra-xhigh-mobile-ready.jpg",
        "sha256": "a1d73db4eb163433b3b6f67fdcfabfe560aeaf2501bf20f8dde7c2f962417ae7",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029064143648/gpt-6-1-terra-xhigh-mobile-sheet-1.jpg",
        "sha256": "abb99811fd38704efe7d245a29a2079bae1d61ba78cf54b8215bade6b2da06c7",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 0–1.51s"
      }
    ]
  },
  {
    "id": "20261029065148840-claude-opus-5-5-xhigh",
    "key": "claude-opus-5-5-xhigh",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "c9569c4bbc9c5878c757f21e0107fe4da2c130a78f66a2622226b8b19a178c69",
    "at": "2026-10-29T06:52:05.751Z",
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
        "id": "svg-valid",
        "status": "pass",
        "evidence": "桌面：XML 无解析错误，viewBox 有效，img 解码成功；手机：XML 无解析错误，viewBox 有效，img 解码成功"
      },
      {
        "id": "no-script",
        "status": "pass",
        "evidence": "桌面：无 script、事件属性或 javascript: URL；手机：无 script、事件属性或 javascript: URL"
      },
      {
        "id": "standalone",
        "status": "pass",
        "evidence": "桌面：目录 1 个文件，外部引用 0 个；手机：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "animation",
        "status": "pass",
        "evidence": "桌面：img 模式 16 帧中 16 帧互不相同；手机：img 模式 6 帧中 6 帧互不相同"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/claude-opus-5-5-xhigh-desktop-ready.jpg",
        "sha256": "4ca2a1c830687c287a3ab189d7884f798c60e900534eb1ab5b94e8f5469386d6",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/claude-opus-5-5-xhigh-desktop-sheet-1.jpg",
        "sha256": "e9cfd65c73163456ecb23bcc57d945eee94d6516c5d1dbc1a63c2f1005b3ec1f",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 0–8.13s"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/claude-opus-5-5-xhigh-mobile-ready.jpg",
        "sha256": "1f3223c6d7477d52ca708b04fd5c27615cbc6f370675a9ad4fb27d025640d22e",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/claude-opus-5-5-xhigh-mobile-sheet-1.jpg",
        "sha256": "cbb35d1f129adae22b45ff2de9a659cc624d3d4ffbe1f30ff363b9bf75aeb2cf",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 0–3.25s"
      }
    ]
  },
  {
    "id": "20261029065148840-claude-opus-5-5-high",
    "key": "claude-opus-5-5-high",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "c9569c4bbc9c5878c757f21e0107fe4da2c130a78f66a2622226b8b19a178c69",
    "at": "2026-10-29T06:52:06.479Z",
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
        "id": "svg-valid",
        "status": "pass",
        "evidence": "桌面：XML 无解析错误，viewBox 有效，img 解码成功；手机：XML 无解析错误，viewBox 有效，img 解码成功"
      },
      {
        "id": "no-script",
        "status": "pass",
        "evidence": "桌面：无 script、事件属性或 javascript: URL；手机：无 script、事件属性或 javascript: URL"
      },
      {
        "id": "standalone",
        "status": "pass",
        "evidence": "桌面：目录 1 个文件，外部引用 0 个；手机：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "animation",
        "status": "pass",
        "evidence": "桌面：img 模式 16 帧中 16 帧互不相同；手机：img 模式 6 帧中 6 帧互不相同"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/claude-opus-5-5-high-desktop-ready.jpg",
        "sha256": "4ac01f7e62436f8bcfc48b75a8cb036444c12a5c974bbdcb5078bad783fb3634",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/claude-opus-5-5-high-desktop-sheet-1.jpg",
        "sha256": "f7543917a05f799123b87d34e3d098309de8b62397360a2b61a630ef06e90c4e",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 0–7.73s"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/claude-opus-5-5-high-mobile-ready.jpg",
        "sha256": "2f062a4e6b1dbbc465d3e035cb1eaa86014869c03dacc15c9e8772417a6e87fb",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/claude-opus-5-5-high-mobile-sheet-1.jpg",
        "sha256": "31c432ae5a4c6978ace9755a56d89dd4e6301969628185dfdea5d9c00dc1a971",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 0–3.4s"
      }
    ]
  },
  {
    "id": "20261029065148840-gpt-5-6-sol-xhigh",
    "key": "gpt-5-6-sol-xhigh",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "c9569c4bbc9c5878c757f21e0107fe4da2c130a78f66a2622226b8b19a178c69",
    "at": "2026-10-29T06:52:07.342Z",
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
        "id": "svg-valid",
        "status": "pass",
        "evidence": "桌面：XML 无解析错误，viewBox 有效，img 解码成功；手机：XML 无解析错误，viewBox 有效，img 解码成功"
      },
      {
        "id": "no-script",
        "status": "pass",
        "evidence": "桌面：无 script、事件属性或 javascript: URL；手机：无 script、事件属性或 javascript: URL"
      },
      {
        "id": "standalone",
        "status": "pass",
        "evidence": "桌面：目录 1 个文件，外部引用 0 个；手机：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "animation",
        "status": "pass",
        "evidence": "桌面：img 模式 16 帧中 16 帧互不相同；手机：img 模式 6 帧中 6 帧互不相同"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-5-6-sol-xhigh-desktop-ready.jpg",
        "sha256": "4c5f48a12cb82f8cc7d40431f840e3db2067e2965874edb609c5cf46f50b0870",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-5-6-sol-xhigh-desktop-sheet-1.jpg",
        "sha256": "4e8c382820d6e755c7295c83f9d131440a2b967edbc703a956debdf1229823b5",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 0–4.68s"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-5-6-sol-xhigh-mobile-ready.jpg",
        "sha256": "535ccd7078b9612964dbf491ebc1558a4f24bf8d2cf477c27eb11a72c11dfe55",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-5-6-sol-xhigh-mobile-sheet-1.jpg",
        "sha256": "89427564ecedf3242723b257a568ec99f653d3aa8b3efa3aaedb40dcf9efa6b6",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 0–1.91s"
      }
    ]
  },
  {
    "id": "20261029065148840-gpt-6-1-sol-xhigh",
    "key": "gpt-6-1-sol-xhigh",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "c9569c4bbc9c5878c757f21e0107fe4da2c130a78f66a2622226b8b19a178c69",
    "at": "2026-10-29T06:52:08.026Z",
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
        "id": "svg-valid",
        "status": "pass",
        "evidence": "桌面：XML 无解析错误，viewBox 有效，img 解码成功；手机：XML 无解析错误，viewBox 有效，img 解码成功"
      },
      {
        "id": "no-script",
        "status": "pass",
        "evidence": "桌面：无 script、事件属性或 javascript: URL；手机：无 script、事件属性或 javascript: URL"
      },
      {
        "id": "standalone",
        "status": "pass",
        "evidence": "桌面：目录 1 个文件，外部引用 0 个；手机：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "animation",
        "status": "pass",
        "evidence": "桌面：img 模式 16 帧中 16 帧互不相同；手机：img 模式 6 帧中 6 帧互不相同"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-6-1-sol-xhigh-desktop-ready.jpg",
        "sha256": "6f1c045895a18787465fbd6f233e07e14ad9fb25fca1777f5a8256edc538f431",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-6-1-sol-xhigh-desktop-sheet-1.jpg",
        "sha256": "aa8b42e5cb4697a2efae220f829b986dc145f3b1b2d596ffd7330e1e585ba2ef",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 0–2.27s"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-6-1-sol-xhigh-mobile-ready.jpg",
        "sha256": "a0a023b8ef54aa8288b49765d4644dc5090bb21eb2b7be8f9b1b62865620c520",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-6-1-sol-xhigh-mobile-sheet-1.jpg",
        "sha256": "c34176485356e948be533895d01d6a5bc1ea89846c9a4594b57bed0cc8c29c07",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 0–1.52s"
      }
    ]
  },
  {
    "id": "20261029065148840-gpt-6-1-terra-xhigh",
    "key": "gpt-6-1-terra-xhigh",
    "sha256": "0c1d52cc3c4c7087993c1e7163d4e782184c79e1d52be14eb5f275be26db23cf",
    "fingerprint": "c9569c4bbc9c5878c757f21e0107fe4da2c130a78f66a2622226b8b19a178c69",
    "at": "2026-10-29T06:52:08.679Z",
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
        "id": "svg-valid",
        "status": "pass",
        "evidence": "桌面：XML 无解析错误，viewBox 有效，img 解码成功；手机：XML 无解析错误，viewBox 有效，img 解码成功"
      },
      {
        "id": "no-script",
        "status": "pass",
        "evidence": "桌面：无 script、事件属性或 javascript: URL；手机：无 script、事件属性或 javascript: URL"
      },
      {
        "id": "standalone",
        "status": "pass",
        "evidence": "桌面：目录 1 个文件，外部引用 0 个；手机：目录 1 个文件，外部引用 0 个"
      },
      {
        "id": "animation",
        "status": "pass",
        "evidence": "桌面：img 模式 16 帧中 16 帧互不相同；手机：img 模式 6 帧中 6 帧互不相同"
      }
    ],
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-6-1-terra-xhigh-desktop-ready.jpg",
        "sha256": "02b04862c7d94ed4dc74d74ccb7b47e17a839437ee568bfdc32bf9613f9ba479",
        "kind": "frame",
        "viewport": "desktop",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-6-1-terra-xhigh-desktop-sheet-1.jpg",
        "sha256": "dc8c03b16abb401966054241f8eacf3562f5c94f119b04eae4fa5a8c1a202134",
        "kind": "sheet",
        "viewport": "desktop",
        "label": "时间轴 0–2.26s"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-6-1-terra-xhigh-mobile-ready.jpg",
        "sha256": "6b34e9d004b2a44dc0b1cfc4735f44305e12c093c046b73886d4afa5f302a8b3",
        "kind": "frame",
        "viewport": "mobile",
        "label": "初始画面"
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261029065148840/gpt-6-1-terra-xhigh-mobile-sheet-1.jpg",
        "sha256": "925aebbba3c0e630201be6bcb96b2a3dafd8fa4ce24f7641903523b1fc311b4d",
        "kind": "sheet",
        "viewport": "mobile",
        "label": "时间轴 0–1.51s"
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
    "id": "e305478a-bb43-4fb6-8acb-e49e14413ab8",
    "experiment": "02-pelican-bicycle",
    "version": 1,
    "fingerprint": "c9569c4bbc9c5878c757f21e0107fe4da2c130a78f66a2622226b8b19a178c69",
    "reviewer": "Codex",
    "model": "inherited-parent-unreported",
    "hashes": {
      "gpt-6-1-terra-xhigh": "0c1d52cc3c4c7087993c1e7163d4e782184c79e1d52be14eb5f275be26db23cf"
    },
    "at": "2026-10-29T06:54:01.749Z",
    "evidence": [
      "20261029065148840-gpt-6-1-terra-xhigh"
    ],
    "checks": [
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "pelican",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "plumage",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "feathers",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "bicycle",
        "status": "pending",
        "score": null,
        "note": "桌面首帧可见车架、车轮和车把，但座椅被主体遮挡，前叉结构不清楚。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "framing",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "wheels",
        "status": "pending",
        "score": null,
        "note": "桌面连续帧中的辐条细且对称，无法可靠确认两个车轮都在转。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "pedaling",
        "status": "pending",
        "score": null,
        "note": "桌面连续帧能看到腿部姿态变化，但双腿和两个踏板的对应关系看不清。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "feet",
        "status": "pending",
        "score": null,
        "note": "桌面连续帧中脚与踏板相互遮挡，无法确认各帧双脚均踩在踏板上。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "loop",
        "status": "pending",
        "score": null,
        "note": "桌面采样帧中难以确认完整循环的衔接位置及前后是否跳变。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "shape-taste",
        "status": "scored",
        "score": 3,
        "note": "首帧鹈鹕和骑姿可辨，但身体、长腿和车架的连接比较简化。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "color-taste",
        "status": "scored",
        "score": 3,
        "note": "首帧配色协调、线条整洁，但羽毛和明暗细节较简略。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "motion-taste",
        "status": "scored",
        "score": 2.5,
        "note": "桌面连续帧能读出腿部变化，但身体较静止且蹬踏细节不够清楚。"
      }
    ]
  },
  {
    "protocol": 6,
    "source": "ai",
    "id": "8b0ad863-e130-4ba0-8777-776abf5bd120",
    "experiment": "02-pelican-bicycle",
    "version": 1,
    "fingerprint": "c9569c4bbc9c5878c757f21e0107fe4da2c130a78f66a2622226b8b19a178c69",
    "reviewer": "Codex",
    "model": "inherited-parent-unreported",
    "hashes": {
      "gpt-6-1-terra-xhigh": "0c1d52cc3c4c7087993c1e7163d4e782184c79e1d52be14eb5f275be26db23cf"
    },
    "at": "2026-10-29T06:59:54.523Z",
    "evidence": [
      "20261029065148840-gpt-6-1-terra-xhigh"
    ],
    "checks": [
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "pelican",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "plumage",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "feathers",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "bicycle",
        "status": "partial",
        "score": 2.5,
        "note": "桌面首帧可见车架、车轮和车把，但前部深色叉管悬空，未连接轮轴。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "framing",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "wheels",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "pedaling",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "feet",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "loop",
        "status": "pass",
        "score": 5,
        "note": ""
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "shape-taste",
        "status": "scored",
        "score": 3,
        "note": "首帧鹈鹕和骑姿可辨，但身体、长腿和车架的连接比较简化。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "color-taste",
        "status": "scored",
        "score": 3,
        "note": "首帧配色协调、线条整洁，但羽毛和明暗细节较简略。"
      },
      {
        "key": "gpt-6-1-terra-xhigh",
        "id": "motion-taste",
        "status": "scored",
        "score": 2.5,
        "note": "桌面连续帧能读出腿部变化，但身体较静止且蹬踏细节不够清楚。"
      }
    ]
  }
]
```

## 评测结论

尚无实际评分，不补造结论。
