# 02 · 鹈鹕骑自行车：评测（Prompt v1）

- **Prompt**：[prompt-v1.md](../../../prompts/02-pelican-bicycle/prompt-v1.md)
- **评测协议**：3
- **标准冻结日期**：2026-10-11（已有产物，事后冻结）
- **评测日期**：脚本重新验收；AI 与人工尚未登记
- **评测者**：统一浏览器检查器；不冒充人工
- **评测方式**：脚本事实、双独立 AI 视觉验收、风险优先人工抽查及少量匿名比较
- **评测环境**：真实浏览器、真实时钟；桌面 1440×900 / 手机 390×844，另检查 DPR 2 与减少动态模式。实体刷新率、听感及未覆盖的连续时刻不得推断。

## 协议说明

2026-10-11 按维护者要求用原进阶版重新建立 v1，删除旧基础 Prompt 和全部旧评分。原始产物字节不变。协议 3 在统一重评前事后冻结，不继承旧协议记录或重新标注旧证据。

- auto 只判断可量化事实；ai 判断真实浏览器证据中的视觉要求；human 只记录真实人工观察。脚本通过不需要人工再次确认。
- 桌面与手机分别验收。AI 每批完整覆盖全部 ai 项，两位不同模型家族的独立评审一致通过才可作为 AI 验收结论；独立声明是自报，不是认证。缺证据、单评审、分歧或核心非通过进入待确认。
- 人工同视口结论优先于 AI，但只覆盖实际复核的项目；人工分歧保留 pending。任何确定核心 fail 即未通过；否则 pending 优先于 partial，全部 core pass 才通过。细节单列，不抵扣核心失败。
- 人工队列包含核心风险、意见分歧、仅人工可测项及随机抽查，常规目标约 16 项（含 4 组比较），不是上限。每份产物尽量覆盖核心和细节；抽查发现误判则扩大该产物复核范围。
- 人工先独立选结论，之后才能揭示 AI 建议；可引用同项同视口的 AI 证据。改变判断或不认同引用结论必须写简短依据，不能批量冒充人工确认。
- 允许跳过、分段封存与导入；只导入实际完成的项目。未做项不产生人工记录，也不因抽查完成而自动通过。
- 比较按维度单列 AI 与人工来源，AI 包含反转左右后归一到原位置的第二结论，不一致为无法判断。只汇总双方核心通过的比较，不发布加权总分或总榜。
- 每位评审、每种视口、每个项目或产物对只计最新记录；旧记录保留。记录与真实媒体绑定产物 SHA-256 和含策略的标准指纹。
- 匿名仅隐藏界面标签，原始文件、画面或此前接触可能透露身份。本地封存不是数字签名。单次产物、少量比较不代表模型永久能力。

## 验收标准

| ID | 级别 | 方法 | 要求 | 验证方式 |
|---|---|---|---|---|
| svg-valid | core | auto | 合法 SVG 且具有有效 viewBox | 浏览器 XML 解析无错误、根元素与 viewBox 核对、img 解码成功 |
| no-script | core | auto | 无脚本和事件属性 | XML DOM 扫描 script 与 on 开头属性，禁 javascript URL |
| standalone | core | auto | 无外部文件引用 | XML DOM、CSS URL 与 import 检查，只允许内部片段或内嵌 data；img 模式网络请求另核对 |
| animation | core | auto | img 模式动画确实在运行 | 每种固定环境真实采样 12 秒以上，至少两个采样帧不同；不据此证明正确蹬踏或无缝 |
| pelican | core | ai | 可辨认的加州褐鹈鹕 | 正常 img 画面辨认形象，不能仅靠标题 |
| pouch | core | ai | 大喉囊可见 | 正常画面定位喉囊 |
| plumage | core | ai | 繁殖羽色齐全 | 分别定位黄白头顶、栗色后颈、红喉囊，缺失注明 |
| frame | core | ai | 自行车菱形车架连接正确 | 核对主车架、后叉及前叉，不只看零件数量 |
| spokes | core | ai | 两轮具有辐条 | 正常画面定位两轮辐条 |
| wheel-spin | core | ai | 两个车轮确实旋转 | 连续观察轮上标记与辐条 |
| foot-contact | core | ai | 双脚始终踩在踏板上 | 至少三完整循环，记录脱离相位；明显脱脚即 fail |
| crank-sync | core | ai | 腿随曲柄同步蹬踏 | 连续观察相位，独立摆动或漂移不能通过 |
| seamless | core | ai | 循环接缝无明显跳变 | 至少三完整循环及接缝附近观察 |
| feathers | detail | ai | 羽毛示意和层次清楚 | 正常画面与局部放大核对 |
| bicycle-parts | detail | ai | 车把、座椅、曲柄和踏板可辨 | 每个部件分别定位，遮挡不等于没画 |
| anatomy | detail | ai | 骑姿与关节运动可信 | 核对腿长、关节弯曲及遮挡层次 |
| composition | detail | ai | 主体完整未被 viewBox 裁切 | 两种展示尺寸核对喙、尾、车轮及构图 |

## 比较维度

| ID | 维度 | 观察重点 |
|---|---|---|
| identity | 形象与羽毛 | 鹈鹕辨识度、繁殖羽色和羽毛层次 |
| craft | 构图与细节 | 结构可信度、层次、配色及完成度 |
| motion | 动作与节奏 | 骑姿自然度、循环节奏和额外动态细节 |

## 浏览器证据

统一采集的真实录像与时间序列截图；派生媒体不修改原始产物。采样不能证明每一帧或实体设备性能。

```json
[
  {
    "id": "20261011071227453-claude-opus-5-5-xhigh-desktop",
    "key": "claude-opus-5-5-xhigh",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "desktop",
    "at": "2026-10-11T07:23:58.617Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t0.png",
        "sha256": "2a453e70fa63417adb59a59bf9add8b39ad9e9edb5665c6466f6d8bbde053218",
        "kind": "frame",
        "seconds": 2.88
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t6.png",
        "sha256": "448886f74ad08abc24744b3d44f07575391f99fd939e4619b83039b6cec589d3",
        "kind": "frame",
        "seconds": 14.95
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t12.png",
        "sha256": "d8afd2c7ad04e9ff6e07c5569b7893440e098251ff34c75c699a73cd27997fa1",
        "kind": "frame",
        "seconds": 27.74
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t18.png",
        "sha256": "6f2b18027fea6d6706fa67c7db3b7bf3b97e004e1487387c75d6c99d96752a19",
        "kind": "frame",
        "seconds": 38.87
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t24.png",
        "sha256": "9e90184480301970f0105f62b2a5675be96241f5de7263f5f64f98dd25e07e98",
        "kind": "frame",
        "seconds": 50.14
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-timeline.webm",
        "sha256": "319f597db79510065bb776a3789c893eba96d4083eb556d3317715a9f862730a",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-xhigh-mobile",
    "key": "claude-opus-5-5-xhigh",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "mobile",
    "at": "2026-10-11T07:23:58.617Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t0.png",
        "sha256": "3dba3503fd0d738109c537624efc65b5080aa397025c7b9e12103319b21bc6a1",
        "kind": "frame",
        "seconds": 2.87
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t6.png",
        "sha256": "cda221e81435962c2cea9218ca111efcac0cd890b3f37c76deba8a4548531bf3",
        "kind": "frame",
        "seconds": 14.17
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t12.png",
        "sha256": "95d58768e6e0635105c98565f20370be09ef89500772f673432da412ef921b71",
        "kind": "frame",
        "seconds": 25.58
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t18.png",
        "sha256": "4f5db04316892c4ca79c73016a54224f4bb59ee2bac60c17f70bbf11eefe55fd",
        "kind": "frame",
        "seconds": 36.2
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t24.png",
        "sha256": "ca4e9f5826839bd7e0b5f18a35ff52bc37427603c2155f59a0c43f7b7ec7f246",
        "kind": "frame",
        "seconds": 47.92
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-timeline.webm",
        "sha256": "3e7c828e497b99e335afcefa6b8f225ce48a3469ba03108e9677683afdcb6f68",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-xhigh-dpr2",
    "key": "claude-opus-5-5-xhigh",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "dpr2",
    "at": "2026-10-11T07:23:58.617Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t0.png",
        "sha256": "add4a742579f75980f67d2f2518850d1245a7c18bf9b789360e6ccfb2d0d4031",
        "kind": "frame",
        "seconds": 4.18
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t6.png",
        "sha256": "6a96030a3264918967df79870bce7bc48465cd1cf5603b4d98bb7ca01396d92c",
        "kind": "frame",
        "seconds": 19.36
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t12.png",
        "sha256": "3fe220e83e014c478275a43eaff28c6d98637a83d41441fdf7898527767434aa",
        "kind": "frame",
        "seconds": 32.71
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t18.png",
        "sha256": "29ad1a6457be5748bcef881b7a4acb8b8012738f36852c3e614ed8550f3241a2",
        "kind": "frame",
        "seconds": 46.71
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t24.png",
        "sha256": "571bea17644a0772f661ef7056b6f1702275eef5e4ba1bc443a83b2da8e772f1",
        "kind": "frame",
        "seconds": 56.91
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-xhigh-reduced",
    "key": "claude-opus-5-5-xhigh",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "reduced",
    "at": "2026-10-11T07:23:58.617Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t0.png",
        "sha256": "385d09b7181997248f539421b4e9e52f6809f4bacd1da3c75a7bab19ba2ba03b",
        "kind": "frame",
        "seconds": 2.88
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t6.png",
        "sha256": "aa44ba4d004285c0799f37712c2cdfc972851a5e54a73f9454639718731670a4",
        "kind": "frame",
        "seconds": 15.29
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t12.png",
        "sha256": "5f8128b7ab534521bf806afb6e0007a59ae8810874ac8c3619da67e56d69b5ee",
        "kind": "frame",
        "seconds": 26.25
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t18.png",
        "sha256": "2773484ced1d3639d9edf2f91e5d5ff9a6c02bdb38185f1d95ff4e35b9afea1e",
        "kind": "frame",
        "seconds": 37.51
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t24.png",
        "sha256": "fea56d437a5fbbdbb16e4198d3c58d5a746f17329a46b9e557872f7ceed4e02c",
        "kind": "frame",
        "seconds": 49.74
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-high-desktop",
    "key": "claude-opus-5-5-high",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "desktop",
    "at": "2026-10-11T07:24:38.743Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t0.png",
        "sha256": "e743b155e6fbc743ccd73cd1e80b1a4a9e3cd278943a943d80a8917d6c72d0f2",
        "kind": "frame",
        "seconds": 2.15
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t6.png",
        "sha256": "ec871b8289b553ffa158f5ed04a754595ab2991b6067e471bb103546be40c0dd",
        "kind": "frame",
        "seconds": 11
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t12.png",
        "sha256": "270d7f11ed8478d3817e0ef9b40685d2c1b71bf46cd242ca387d160678f7523a",
        "kind": "frame",
        "seconds": 18.29
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t18.png",
        "sha256": "f4423703b33b347f2ba41bca4acb40357c50976862c22d9926cb00e216db6451",
        "kind": "frame",
        "seconds": 25.87
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t24.png",
        "sha256": "6970c25aeeca608ec1345eab153ea2f85911a223e3f5e26b8f66c0ff6ce4548b",
        "kind": "frame",
        "seconds": 34.13
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-timeline.webm",
        "sha256": "7d22e605c4e933413766fe0adf3304a64100ecd5af1cb2047e2f0209b4544ded",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-high-mobile",
    "key": "claude-opus-5-5-high",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "mobile",
    "at": "2026-10-11T07:24:38.743Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t0.png",
        "sha256": "695a0e1f2354993f776536a56656516bba8a6974242c8fbafe1fa288010689fd",
        "kind": "frame",
        "seconds": 2.18
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t6.png",
        "sha256": "96db30c729a8d87ce50037e541d491f952dd84380b425edef930dcb899990b6a",
        "kind": "frame",
        "seconds": 11.42
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t12.png",
        "sha256": "7f5eef264dc9ddb695a380a369178f338182faf22de78f9093b061c97d1e821d",
        "kind": "frame",
        "seconds": 19.01
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t18.png",
        "sha256": "57ee8da701b853be4ec8f243859d7a982b06124e73516fdabcb71014704bda84",
        "kind": "frame",
        "seconds": 26.48
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t24.png",
        "sha256": "d0b87a986686f83b71dae75c5ac276ab250d45daf36cfb9d41e46788897d7b67",
        "kind": "frame",
        "seconds": 33.88
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-timeline.webm",
        "sha256": "6764058dfc2b6bf522e52f3a605d846224c80b23982031e5eb385cddcdbd926f",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-high-dpr2",
    "key": "claude-opus-5-5-high",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "dpr2",
    "at": "2026-10-11T07:24:38.743Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t0.png",
        "sha256": "b0fabce2e085e4950417b646c4de95460a4d301ca2f3d34ee4fad458b330ce4a",
        "kind": "frame",
        "seconds": 3.04
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t6.png",
        "sha256": "37c18fbea762ce9920704e8d55641313c1b068e61ebd583a30060a8b4a759505",
        "kind": "frame",
        "seconds": 13.19
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t12.png",
        "sha256": "068be0a64c7d08db2bed6dbd8a17a8fe7d29307fd2c0dfd2c4c82093575491dd",
        "kind": "frame",
        "seconds": 22.36
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t18.png",
        "sha256": "2a2a59639806ef7a3da46e71d782a901911f81a8427dd4ebb239efec6e98c6b1",
        "kind": "frame",
        "seconds": 31.67
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t24.png",
        "sha256": "cc167dc1ede61eb6329de82fff06b1d9684b654d56fd268bf8808ab50ff55aee",
        "kind": "frame",
        "seconds": 38.73
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-high-reduced",
    "key": "claude-opus-5-5-high",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "reduced",
    "at": "2026-10-11T07:24:38.743Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t0.png",
        "sha256": "982136f86bff2fd8ba9e480fca3579c473f2b1ccf193074660166733f63b390b",
        "kind": "frame",
        "seconds": 2.19
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t6.png",
        "sha256": "6a0fd1b579d587a0d9066dca81f7d348365898ca60fadbf8f884c97a00ac70b8",
        "kind": "frame",
        "seconds": 10.44
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t12.png",
        "sha256": "69dc00b44f5f6b835c65f5c8bc11446070306132bcd701b15b430d0e636fc0c1",
        "kind": "frame",
        "seconds": 17.61
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t18.png",
        "sha256": "6bfa38dfd87f502b75b949d47f6b45009f9fce0ee53ceb34314b1ec1cc027437",
        "kind": "frame",
        "seconds": 25.04
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t24.png",
        "sha256": "0e125853c508b547f60d6460db9ce51bfde3467592dcbaf045eed15fb1181190",
        "kind": "frame",
        "seconds": 32.29
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-5-6-sol-xhigh-desktop",
    "key": "gpt-5-6-sol-xhigh",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "desktop",
    "at": "2026-10-11T07:25:15.460Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t0.png",
        "sha256": "c49ab78bfe0d165923f7e43c6b6002d61b1b35d9705a213f90e66c4fa2650c29",
        "kind": "frame",
        "seconds": 1.84
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t6.png",
        "sha256": "fc75b6185a0b3eacd3afee2b0fcccb6e1308d254320b344142d8994a220e45fc",
        "kind": "frame",
        "seconds": 9.03
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t12.png",
        "sha256": "300f4edce68975cd849ed03d8e673596efaf4c006ae1ac8c2b8339834e4c8418",
        "kind": "frame",
        "seconds": 16.43
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t18.png",
        "sha256": "ba6fe228bca73bc67c303a1a6e7b73ce1ac6370247e054a1b384b42821bcd203",
        "kind": "frame",
        "seconds": 23.83
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t24.png",
        "sha256": "b6a6efa4d554ded30f1f2d189517b10d9172fab25695079ce4ce7c0833e9bd2e",
        "kind": "frame",
        "seconds": 31.5
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-timeline.webm",
        "sha256": "110891eb6adf1072a7fcd30188e901390672e173b862b87629937a79d0ac83fd",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-5-6-sol-xhigh-mobile",
    "key": "gpt-5-6-sol-xhigh",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "mobile",
    "at": "2026-10-11T07:25:15.460Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t0.png",
        "sha256": "ca0a4cb970ac3fe720efc2414cd04d55e25c17bbae4be6e9fc1b882abb6c15f6",
        "kind": "frame",
        "seconds": 1.32
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t6.png",
        "sha256": "8c8e71eefbae1fc3fd569a1f1ac9ccb7c6e64ffd6378f445715bf3a6c8c78563",
        "kind": "frame",
        "seconds": 8.5
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t12.png",
        "sha256": "6d78d293df04430072d88c734fa02b53a082e10f963f4ed3a0d365471dc14e22",
        "kind": "frame",
        "seconds": 15.9
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t18.png",
        "sha256": "c4732eb845788d24c38210105386890ede933f591a1f99ab914947a6aff6fa4a",
        "kind": "frame",
        "seconds": 23.56
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t24.png",
        "sha256": "d82c06490ea455239a0565fb66291ebc121141a5c3d54c1fc7dfb30521a697fd",
        "kind": "frame",
        "seconds": 31.27
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-timeline.webm",
        "sha256": "94ef1b556f191fe2aa498e0a41a0416000988e57e4b5a975e45550c478a2a453",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-5-6-sol-xhigh-dpr2",
    "key": "gpt-5-6-sol-xhigh",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "dpr2",
    "at": "2026-10-11T07:25:15.460Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t0.png",
        "sha256": "86956a3009fb385f824ee6027e750ebd90f29b317c6a9d778156ec37c27fccf2",
        "kind": "frame",
        "seconds": 1.87
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t6.png",
        "sha256": "18d7249e5658dda0ef4400d4461b8488714fbd45e544c828b199b06f69b3fe04",
        "kind": "frame",
        "seconds": 10.52
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t12.png",
        "sha256": "635ee9a334912e42e39621a2b3396117e893107c0fed4c7caa74d5d80ba70b15",
        "kind": "frame",
        "seconds": 19.05
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t18.png",
        "sha256": "383b0929988a9633d4090142f3e9d3559d6d0bbae5366345513be250ea8465df",
        "kind": "frame",
        "seconds": 27.88
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t24.png",
        "sha256": "0c2d53c063c87685e5277f4f1afee24556d3794dea3e449803a754f31e2f4810",
        "kind": "frame",
        "seconds": 35.52
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-5-6-sol-xhigh-reduced",
    "key": "gpt-5-6-sol-xhigh",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "reduced",
    "at": "2026-10-11T07:25:15.460Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t0.png",
        "sha256": "deb4812218c4b51e13a329ed56fee2eaedc372ba318e8877fa51a9fc951bc18c",
        "kind": "frame",
        "seconds": 1.13
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t6.png",
        "sha256": "67994d3d021edccb8d1d242f79da2db91e4bcb86fe367a8ec1cc34721a1cc404",
        "kind": "frame",
        "seconds": 8.28
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t12.png",
        "sha256": "7feead8f98897b359adef540919e44036ebf7a48f17095a71c33b2dbe92ff920",
        "kind": "frame",
        "seconds": 16.16
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t18.png",
        "sha256": "6515c3831575d5c178b166b975a039388161593f36330a5a571bae3722bc9c31",
        "kind": "frame",
        "seconds": 23.57
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t24.png",
        "sha256": "0140c495a8bd78919e37996a5981003643aa77ec5bef4f899dd0248df13f73d3",
        "kind": "frame",
        "seconds": 31.14
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-6-1-sol-xhigh-desktop",
    "key": "gpt-6-1-sol-xhigh",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "desktop",
    "at": "2026-10-11T07:25:43.077Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t0.png",
        "sha256": "514ef88302859d790afc95db5ffde182898b6fa178ce010743ac63c8f983b913",
        "kind": "frame",
        "seconds": 0.8
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t6.png",
        "sha256": "12e2f40c4588bd5366816ceb2b59e95b6e6fe2bf5e0f586e7c09cb0e47b6d9a6",
        "kind": "frame",
        "seconds": 6.51
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t12.png",
        "sha256": "b000b7c8d978def28b4d7e4ffdf68ba286cadb53750a8ec783fe748f3360f82f",
        "kind": "frame",
        "seconds": 12.91
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t18.png",
        "sha256": "0ca87d24bc00c7f5a24a96d5ecfb4ce3301a81350d5a37b6d1ba448d13b8cd19",
        "kind": "frame",
        "seconds": 18.44
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t24.png",
        "sha256": "a4be2f65671a261476224591e80daf7e432a2c0adf4b3bde6f53ea274d659858",
        "kind": "frame",
        "seconds": 23.93
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-timeline.webm",
        "sha256": "7c01dad3f60b1530c3622ebd90dfd368fbefd2a5584400bfb3c4083de24de7e9",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-6-1-sol-xhigh-mobile",
    "key": "gpt-6-1-sol-xhigh",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "mobile",
    "at": "2026-10-11T07:25:43.077Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t0.png",
        "sha256": "68027d6791e823d0db4c110682d318f6974e7014199a1efe7492faec5b6fffd6",
        "kind": "frame",
        "seconds": 0.65
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t6.png",
        "sha256": "077a085049b8261456aa3927374246b9ae8918b67ce7b100ea04a9ba1f0aa783",
        "kind": "frame",
        "seconds": 6.3
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t12.png",
        "sha256": "0437f60394d325bf0b6c689df51c429c4fef276e02b99e6cc4e9b61c1783628b",
        "kind": "frame",
        "seconds": 11.84
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t18.png",
        "sha256": "6a2ee813713ea01af14cd538b4c8a02f4950f999b22f072da5dab0f916fc0cdb",
        "kind": "frame",
        "seconds": 17.33
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t24.png",
        "sha256": "d889a589effb2f9bf968175f59b92e67b6350abc854f1d346b7df5a050dad4d5",
        "kind": "frame",
        "seconds": 22.72
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-timeline.webm",
        "sha256": "a77b4f8513edea4ca126844deb6281f0d2a6f1974cd609f5fde4762643faf592",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-6-1-sol-xhigh-dpr2",
    "key": "gpt-6-1-sol-xhigh",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "dpr2",
    "at": "2026-10-11T07:25:43.077Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t0.png",
        "sha256": "4bcc3940c1a1ae6c767895e3da6501a789dfd8aa33ce06a7c90be7a21d6d7d11",
        "kind": "frame",
        "seconds": 1.05
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t6.png",
        "sha256": "094b4e5231f8c45819cde6b04c2d1e2c0dc69ebaabaf55b2a9cd210f66aa5487",
        "kind": "frame",
        "seconds": 7.4
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t12.png",
        "sha256": "6abb47ad444e5940e0d4ed7292b3a18481f140300f2ff3cb545494fc99cfdb3d",
        "kind": "frame",
        "seconds": 13.9
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t18.png",
        "sha256": "b2c7a06aade99b535c8d79e37e73831583e0d1f67439adf39a08a646778b8a66",
        "kind": "frame",
        "seconds": 20.49
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t24.png",
        "sha256": "a6b1507f2a263008dc846a10e25a0d198fcbea296210c6d2a6f30892fc930f9c",
        "kind": "frame",
        "seconds": 26.36
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-6-1-sol-xhigh-reduced",
    "key": "gpt-6-1-sol-xhigh",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "viewport": "reduced",
    "at": "2026-10-11T07:25:43.077Z",
    "environment": {
      "browser": "154.0.8037.98",
      "platform": "win32",
      "node": "v22.17.0",
      "profiles": [
        {
          "name": "desktop",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "mobile",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "no-preference"
        },
        {
          "name": "dpr2",
          "viewport": {
            "width": 1440,
            "height": 900
          },
          "deviceScaleFactor": 2,
          "reducedMotion": "no-preference"
        },
        {
          "name": "reduced",
          "viewport": {
            "width": 390,
            "height": 844
          },
          "deviceScaleFactor": 1,
          "reducedMotion": "reduce"
        }
      ],
      "clock": "real",
      "concurrency": 4,
      "checkerSha256": "44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff",
      "limit": "功能检查；不测实体帧率、视觉语义或音效"
    },
    "files": [
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t0.png",
        "sha256": "c34457598611f6aa85f08566ac913b8530458f3bc9bc34ef189eea06142c8362",
        "kind": "frame",
        "seconds": 0.81
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t6.png",
        "sha256": "0e01e894865140ab53648d5fc1acaf2158188c6b56cb089973e3b29a94d35e02",
        "kind": "frame",
        "seconds": 6.33
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t12.png",
        "sha256": "8eb0fed98301d78a0d4aa660a60b90a0787f206be27a02652c7914c1411472d0",
        "kind": "frame",
        "seconds": 11.88
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t18.png",
        "sha256": "a18954c6a5a9af699a9637279bdfc3a57229d4ba667004e996545e1c1ab9749e",
        "kind": "frame",
        "seconds": 17.3
      },
      {
        "path": "assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t24.png",
        "sha256": "0becd2be4b0e721f3369b3c147dbc284cd1bd86aa0ed21612faa7a3568cdb62f",
        "kind": "frame",
        "seconds": 22.7
      }
    ],
    "harnessError": null
  }
]
```

## 验收记录

```json
[
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:23:58.617Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":50.66,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t0.png\",\"sha256\":\"2a453e70fa63417adb59a59bf9add8b39ad9e9edb5665c6466f6d8bbde053218\",\"kind\":\"frame\",\"seconds\":2.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t6.png\",\"sha256\":\"448886f74ad08abc24744b3d44f07575391f99fd939e4619b83039b6cec589d3\",\"kind\":\"frame\",\"seconds\":14.95},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t12.png\",\"sha256\":\"d8afd2c7ad04e9ff6e07c5569b7893440e098251ff34c75c699a73cd27997fa1\",\"kind\":\"frame\",\"seconds\":27.74},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t18.png\",\"sha256\":\"6f2b18027fea6d6706fa67c7db3b7bf3b97e004e1487387c75d6c99d96752a19\",\"kind\":\"frame\",\"seconds\":38.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t24.png\",\"sha256\":\"9e90184480301970f0105f62b2a5675be96241f5de7263f5f64f98dd25e07e98\",\"kind\":\"frame\",\"seconds\":50.14},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-timeline.webm\",\"sha256\":\"319f597db79510065bb776a3789c893eba96d4083eb556d3317715a9f862730a\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":48.44,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t0.png\",\"sha256\":\"3dba3503fd0d738109c537624efc65b5080aa397025c7b9e12103319b21bc6a1\",\"kind\":\"frame\",\"seconds\":2.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t6.png\",\"sha256\":\"cda221e81435962c2cea9218ca111efcac0cd890b3f37c76deba8a4548531bf3\",\"kind\":\"frame\",\"seconds\":14.17},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t12.png\",\"sha256\":\"95d58768e6e0635105c98565f20370be09ef89500772f673432da412ef921b71\",\"kind\":\"frame\",\"seconds\":25.58},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t18.png\",\"sha256\":\"4f5db04316892c4ca79c73016a54224f4bb59ee2bac60c17f70bbf11eefe55fd\",\"kind\":\"frame\",\"seconds\":36.2},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t24.png\",\"sha256\":\"ca4e9f5826839bd7e0b5f18a35ff52bc37427603c2155f59a0c43f7b7ec7f246\",\"kind\":\"frame\",\"seconds\":47.92},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-timeline.webm\",\"sha256\":\"3e7c828e497b99e335afcefa6b8f225ce48a3469ba03108e9677683afdcb6f68\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":57.43,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t0.png\",\"sha256\":\"add4a742579f75980f67d2f2518850d1245a7c18bf9b789360e6ccfb2d0d4031\",\"kind\":\"frame\",\"seconds\":4.18},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t6.png\",\"sha256\":\"6a96030a3264918967df79870bce7bc48465cd1cf5603b4d98bb7ca01396d92c\",\"kind\":\"frame\",\"seconds\":19.36},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t12.png\",\"sha256\":\"3fe220e83e014c478275a43eaff28c6d98637a83d41441fdf7898527767434aa\",\"kind\":\"frame\",\"seconds\":32.71},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t18.png\",\"sha256\":\"29ad1a6457be5748bcef881b7a4acb8b8012738f36852c3e614ed8550f3241a2\",\"kind\":\"frame\",\"seconds\":46.71},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t24.png\",\"sha256\":\"571bea17644a0772f661ef7056b6f1702275eef5e4ba1bc443a83b2da8e772f1\",\"kind\":\"frame\",\"seconds\":56.91}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":50.26,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t0.png\",\"sha256\":\"385d09b7181997248f539421b4e9e52f6809f4bacd1da3c75a7bab19ba2ba03b\",\"kind\":\"frame\",\"seconds\":2.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t6.png\",\"sha256\":\"aa44ba4d004285c0799f37712c2cdfc972851a5e54a73f9454639718731670a4\",\"kind\":\"frame\",\"seconds\":15.29},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t12.png\",\"sha256\":\"5f8128b7ab534521bf806afb6e0007a59ae8810874ac8c3619da67e56d69b5ee\",\"kind\":\"frame\",\"seconds\":26.25},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t18.png\",\"sha256\":\"2773484ced1d3639d9edf2f91e5d5ff9a6c02bdb38185f1d95ff4e35b9afea1e\",\"kind\":\"frame\",\"seconds\":37.51},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t24.png\",\"sha256\":\"fea56d437a5fbbdbb16e4198d3c58d5a746f17329a46b9e557872f7ceed4e02c\",\"kind\":\"frame\",\"seconds\":49.74}]}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:23:58.618Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":50.66,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t0.png\",\"sha256\":\"2a453e70fa63417adb59a59bf9add8b39ad9e9edb5665c6466f6d8bbde053218\",\"kind\":\"frame\",\"seconds\":2.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t6.png\",\"sha256\":\"448886f74ad08abc24744b3d44f07575391f99fd939e4619b83039b6cec589d3\",\"kind\":\"frame\",\"seconds\":14.95},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t12.png\",\"sha256\":\"d8afd2c7ad04e9ff6e07c5569b7893440e098251ff34c75c699a73cd27997fa1\",\"kind\":\"frame\",\"seconds\":27.74},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t18.png\",\"sha256\":\"6f2b18027fea6d6706fa67c7db3b7bf3b97e004e1487387c75d6c99d96752a19\",\"kind\":\"frame\",\"seconds\":38.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t24.png\",\"sha256\":\"9e90184480301970f0105f62b2a5675be96241f5de7263f5f64f98dd25e07e98\",\"kind\":\"frame\",\"seconds\":50.14},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-timeline.webm\",\"sha256\":\"319f597db79510065bb776a3789c893eba96d4083eb556d3317715a9f862730a\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":48.44,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t0.png\",\"sha256\":\"3dba3503fd0d738109c537624efc65b5080aa397025c7b9e12103319b21bc6a1\",\"kind\":\"frame\",\"seconds\":2.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t6.png\",\"sha256\":\"cda221e81435962c2cea9218ca111efcac0cd890b3f37c76deba8a4548531bf3\",\"kind\":\"frame\",\"seconds\":14.17},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t12.png\",\"sha256\":\"95d58768e6e0635105c98565f20370be09ef89500772f673432da412ef921b71\",\"kind\":\"frame\",\"seconds\":25.58},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t18.png\",\"sha256\":\"4f5db04316892c4ca79c73016a54224f4bb59ee2bac60c17f70bbf11eefe55fd\",\"kind\":\"frame\",\"seconds\":36.2},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t24.png\",\"sha256\":\"ca4e9f5826839bd7e0b5f18a35ff52bc37427603c2155f59a0c43f7b7ec7f246\",\"kind\":\"frame\",\"seconds\":47.92},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-timeline.webm\",\"sha256\":\"3e7c828e497b99e335afcefa6b8f225ce48a3469ba03108e9677683afdcb6f68\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":57.43,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t0.png\",\"sha256\":\"add4a742579f75980f67d2f2518850d1245a7c18bf9b789360e6ccfb2d0d4031\",\"kind\":\"frame\",\"seconds\":4.18},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t6.png\",\"sha256\":\"6a96030a3264918967df79870bce7bc48465cd1cf5603b4d98bb7ca01396d92c\",\"kind\":\"frame\",\"seconds\":19.36},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t12.png\",\"sha256\":\"3fe220e83e014c478275a43eaff28c6d98637a83d41441fdf7898527767434aa\",\"kind\":\"frame\",\"seconds\":32.71},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t18.png\",\"sha256\":\"29ad1a6457be5748bcef881b7a4acb8b8012738f36852c3e614ed8550f3241a2\",\"kind\":\"frame\",\"seconds\":46.71},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t24.png\",\"sha256\":\"571bea17644a0772f661ef7056b6f1702275eef5e4ba1bc443a83b2da8e772f1\",\"kind\":\"frame\",\"seconds\":56.91}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":50.26,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t0.png\",\"sha256\":\"385d09b7181997248f539421b4e9e52f6809f4bacd1da3c75a7bab19ba2ba03b\",\"kind\":\"frame\",\"seconds\":2.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t6.png\",\"sha256\":\"aa44ba4d004285c0799f37712c2cdfc972851a5e54a73f9454639718731670a4\",\"kind\":\"frame\",\"seconds\":15.29},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t12.png\",\"sha256\":\"5f8128b7ab534521bf806afb6e0007a59ae8810874ac8c3619da67e56d69b5ee\",\"kind\":\"frame\",\"seconds\":26.25},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t18.png\",\"sha256\":\"2773484ced1d3639d9edf2f91e5d5ff9a6c02bdb38185f1d95ff4e35b9afea1e\",\"kind\":\"frame\",\"seconds\":37.51},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t24.png\",\"sha256\":\"fea56d437a5fbbdbb16e4198d3c58d5a746f17329a46b9e557872f7ceed4e02c\",\"kind\":\"frame\",\"seconds\":49.74}]}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:23:58.618Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":50.66,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t0.png\",\"sha256\":\"2a453e70fa63417adb59a59bf9add8b39ad9e9edb5665c6466f6d8bbde053218\",\"kind\":\"frame\",\"seconds\":2.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t6.png\",\"sha256\":\"448886f74ad08abc24744b3d44f07575391f99fd939e4619b83039b6cec589d3\",\"kind\":\"frame\",\"seconds\":14.95},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t12.png\",\"sha256\":\"d8afd2c7ad04e9ff6e07c5569b7893440e098251ff34c75c699a73cd27997fa1\",\"kind\":\"frame\",\"seconds\":27.74},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t18.png\",\"sha256\":\"6f2b18027fea6d6706fa67c7db3b7bf3b97e004e1487387c75d6c99d96752a19\",\"kind\":\"frame\",\"seconds\":38.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t24.png\",\"sha256\":\"9e90184480301970f0105f62b2a5675be96241f5de7263f5f64f98dd25e07e98\",\"kind\":\"frame\",\"seconds\":50.14},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-timeline.webm\",\"sha256\":\"319f597db79510065bb776a3789c893eba96d4083eb556d3317715a9f862730a\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":48.44,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t0.png\",\"sha256\":\"3dba3503fd0d738109c537624efc65b5080aa397025c7b9e12103319b21bc6a1\",\"kind\":\"frame\",\"seconds\":2.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t6.png\",\"sha256\":\"cda221e81435962c2cea9218ca111efcac0cd890b3f37c76deba8a4548531bf3\",\"kind\":\"frame\",\"seconds\":14.17},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t12.png\",\"sha256\":\"95d58768e6e0635105c98565f20370be09ef89500772f673432da412ef921b71\",\"kind\":\"frame\",\"seconds\":25.58},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t18.png\",\"sha256\":\"4f5db04316892c4ca79c73016a54224f4bb59ee2bac60c17f70bbf11eefe55fd\",\"kind\":\"frame\",\"seconds\":36.2},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t24.png\",\"sha256\":\"ca4e9f5826839bd7e0b5f18a35ff52bc37427603c2155f59a0c43f7b7ec7f246\",\"kind\":\"frame\",\"seconds\":47.92},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-timeline.webm\",\"sha256\":\"3e7c828e497b99e335afcefa6b8f225ce48a3469ba03108e9677683afdcb6f68\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":57.43,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t0.png\",\"sha256\":\"add4a742579f75980f67d2f2518850d1245a7c18bf9b789360e6ccfb2d0d4031\",\"kind\":\"frame\",\"seconds\":4.18},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t6.png\",\"sha256\":\"6a96030a3264918967df79870bce7bc48465cd1cf5603b4d98bb7ca01396d92c\",\"kind\":\"frame\",\"seconds\":19.36},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t12.png\",\"sha256\":\"3fe220e83e014c478275a43eaff28c6d98637a83d41441fdf7898527767434aa\",\"kind\":\"frame\",\"seconds\":32.71},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t18.png\",\"sha256\":\"29ad1a6457be5748bcef881b7a4acb8b8012738f36852c3e614ed8550f3241a2\",\"kind\":\"frame\",\"seconds\":46.71},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t24.png\",\"sha256\":\"571bea17644a0772f661ef7056b6f1702275eef5e4ba1bc443a83b2da8e772f1\",\"kind\":\"frame\",\"seconds\":56.91}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":50.26,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t0.png\",\"sha256\":\"385d09b7181997248f539421b4e9e52f6809f4bacd1da3c75a7bab19ba2ba03b\",\"kind\":\"frame\",\"seconds\":2.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t6.png\",\"sha256\":\"aa44ba4d004285c0799f37712c2cdfc972851a5e54a73f9454639718731670a4\",\"kind\":\"frame\",\"seconds\":15.29},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t12.png\",\"sha256\":\"5f8128b7ab534521bf806afb6e0007a59ae8810874ac8c3619da67e56d69b5ee\",\"kind\":\"frame\",\"seconds\":26.25},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t18.png\",\"sha256\":\"2773484ced1d3639d9edf2f91e5d5ff9a6c02bdb38185f1d95ff4e35b9afea1e\",\"kind\":\"frame\",\"seconds\":37.51},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t24.png\",\"sha256\":\"fea56d437a5fbbdbb16e4198d3c58d5a746f17329a46b9e557872f7ceed4e02c\",\"kind\":\"frame\",\"seconds\":49.74}]}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:23:58.618Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":50.66,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t0.png\",\"sha256\":\"2a453e70fa63417adb59a59bf9add8b39ad9e9edb5665c6466f6d8bbde053218\",\"kind\":\"frame\",\"seconds\":2.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t6.png\",\"sha256\":\"448886f74ad08abc24744b3d44f07575391f99fd939e4619b83039b6cec589d3\",\"kind\":\"frame\",\"seconds\":14.95},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t12.png\",\"sha256\":\"d8afd2c7ad04e9ff6e07c5569b7893440e098251ff34c75c699a73cd27997fa1\",\"kind\":\"frame\",\"seconds\":27.74},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t18.png\",\"sha256\":\"6f2b18027fea6d6706fa67c7db3b7bf3b97e004e1487387c75d6c99d96752a19\",\"kind\":\"frame\",\"seconds\":38.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t24.png\",\"sha256\":\"9e90184480301970f0105f62b2a5675be96241f5de7263f5f64f98dd25e07e98\",\"kind\":\"frame\",\"seconds\":50.14},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-timeline.webm\",\"sha256\":\"319f597db79510065bb776a3789c893eba96d4083eb556d3317715a9f862730a\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":48.44,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t0.png\",\"sha256\":\"3dba3503fd0d738109c537624efc65b5080aa397025c7b9e12103319b21bc6a1\",\"kind\":\"frame\",\"seconds\":2.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t6.png\",\"sha256\":\"cda221e81435962c2cea9218ca111efcac0cd890b3f37c76deba8a4548531bf3\",\"kind\":\"frame\",\"seconds\":14.17},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t12.png\",\"sha256\":\"95d58768e6e0635105c98565f20370be09ef89500772f673432da412ef921b71\",\"kind\":\"frame\",\"seconds\":25.58},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t18.png\",\"sha256\":\"4f5db04316892c4ca79c73016a54224f4bb59ee2bac60c17f70bbf11eefe55fd\",\"kind\":\"frame\",\"seconds\":36.2},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t24.png\",\"sha256\":\"ca4e9f5826839bd7e0b5f18a35ff52bc37427603c2155f59a0c43f7b7ec7f246\",\"kind\":\"frame\",\"seconds\":47.92},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-timeline.webm\",\"sha256\":\"3e7c828e497b99e335afcefa6b8f225ce48a3469ba03108e9677683afdcb6f68\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":57.43,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t0.png\",\"sha256\":\"add4a742579f75980f67d2f2518850d1245a7c18bf9b789360e6ccfb2d0d4031\",\"kind\":\"frame\",\"seconds\":4.18},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t6.png\",\"sha256\":\"6a96030a3264918967df79870bce7bc48465cd1cf5603b4d98bb7ca01396d92c\",\"kind\":\"frame\",\"seconds\":19.36},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t12.png\",\"sha256\":\"3fe220e83e014c478275a43eaff28c6d98637a83d41441fdf7898527767434aa\",\"kind\":\"frame\",\"seconds\":32.71},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t18.png\",\"sha256\":\"29ad1a6457be5748bcef881b7a4acb8b8012738f36852c3e614ed8550f3241a2\",\"kind\":\"frame\",\"seconds\":46.71},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-t24.png\",\"sha256\":\"571bea17644a0772f661ef7056b6f1702275eef5e4ba1bc443a83b2da8e772f1\",\"kind\":\"frame\",\"seconds\":56.91}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":50.26,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t0.png\",\"sha256\":\"385d09b7181997248f539421b4e9e52f6809f4bacd1da3c75a7bab19ba2ba03b\",\"kind\":\"frame\",\"seconds\":2.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t6.png\",\"sha256\":\"aa44ba4d004285c0799f37712c2cdfc972851a5e54a73f9454639718731670a4\",\"kind\":\"frame\",\"seconds\":15.29},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t12.png\",\"sha256\":\"5f8128b7ab534521bf806afb6e0007a59ae8810874ac8c3619da67e56d69b5ee\",\"kind\":\"frame\",\"seconds\":26.25},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t18.png\",\"sha256\":\"2773484ced1d3639d9edf2f91e5d5ff9a6c02bdb38185f1d95ff4e35b9afea1e\",\"kind\":\"frame\",\"seconds\":37.51},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-t24.png\",\"sha256\":\"fea56d437a5fbbdbb16e4198d3c58d5a746f17329a46b9e557872f7ceed4e02c\",\"kind\":\"frame\",\"seconds\":49.74}]}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:24:38.744Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":34.65,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t0.png\",\"sha256\":\"e743b155e6fbc743ccd73cd1e80b1a4a9e3cd278943a943d80a8917d6c72d0f2\",\"kind\":\"frame\",\"seconds\":2.15},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t6.png\",\"sha256\":\"ec871b8289b553ffa158f5ed04a754595ab2991b6067e471bb103546be40c0dd\",\"kind\":\"frame\",\"seconds\":11},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t12.png\",\"sha256\":\"270d7f11ed8478d3817e0ef9b40685d2c1b71bf46cd242ca387d160678f7523a\",\"kind\":\"frame\",\"seconds\":18.29},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t18.png\",\"sha256\":\"f4423703b33b347f2ba41bca4acb40357c50976862c22d9926cb00e216db6451\",\"kind\":\"frame\",\"seconds\":25.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t24.png\",\"sha256\":\"6970c25aeeca608ec1345eab153ea2f85911a223e3f5e26b8f66c0ff6ce4548b\",\"kind\":\"frame\",\"seconds\":34.13},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-timeline.webm\",\"sha256\":\"7d22e605c4e933413766fe0adf3304a64100ecd5af1cb2047e2f0209b4544ded\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":34.4,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t0.png\",\"sha256\":\"695a0e1f2354993f776536a56656516bba8a6974242c8fbafe1fa288010689fd\",\"kind\":\"frame\",\"seconds\":2.18},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t6.png\",\"sha256\":\"96db30c729a8d87ce50037e541d491f952dd84380b425edef930dcb899990b6a\",\"kind\":\"frame\",\"seconds\":11.42},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t12.png\",\"sha256\":\"7f5eef264dc9ddb695a380a369178f338182faf22de78f9093b061c97d1e821d\",\"kind\":\"frame\",\"seconds\":19.01},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t18.png\",\"sha256\":\"57ee8da701b853be4ec8f243859d7a982b06124e73516fdabcb71014704bda84\",\"kind\":\"frame\",\"seconds\":26.48},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t24.png\",\"sha256\":\"d0b87a986686f83b71dae75c5ac276ab250d45daf36cfb9d41e46788897d7b67\",\"kind\":\"frame\",\"seconds\":33.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-timeline.webm\",\"sha256\":\"6764058dfc2b6bf522e52f3a605d846224c80b23982031e5eb385cddcdbd926f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":39.24,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t0.png\",\"sha256\":\"b0fabce2e085e4950417b646c4de95460a4d301ca2f3d34ee4fad458b330ce4a\",\"kind\":\"frame\",\"seconds\":3.04},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t6.png\",\"sha256\":\"37c18fbea762ce9920704e8d55641313c1b068e61ebd583a30060a8b4a759505\",\"kind\":\"frame\",\"seconds\":13.19},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t12.png\",\"sha256\":\"068be0a64c7d08db2bed6dbd8a17a8fe7d29307fd2c0dfd2c4c82093575491dd\",\"kind\":\"frame\",\"seconds\":22.36},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t18.png\",\"sha256\":\"2a2a59639806ef7a3da46e71d782a901911f81a8427dd4ebb239efec6e98c6b1\",\"kind\":\"frame\",\"seconds\":31.67},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t24.png\",\"sha256\":\"cc167dc1ede61eb6329de82fff06b1d9684b654d56fd268bf8808ab50ff55aee\",\"kind\":\"frame\",\"seconds\":38.73}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.79,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t0.png\",\"sha256\":\"982136f86bff2fd8ba9e480fca3579c473f2b1ccf193074660166733f63b390b\",\"kind\":\"frame\",\"seconds\":2.19},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t6.png\",\"sha256\":\"6a0fd1b579d587a0d9066dca81f7d348365898ca60fadbf8f884c97a00ac70b8\",\"kind\":\"frame\",\"seconds\":10.44},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t12.png\",\"sha256\":\"69dc00b44f5f6b835c65f5c8bc11446070306132bcd701b15b430d0e636fc0c1\",\"kind\":\"frame\",\"seconds\":17.61},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t18.png\",\"sha256\":\"6bfa38dfd87f502b75b949d47f6b45009f9fce0ee53ceb34314b1ec1cc027437\",\"kind\":\"frame\",\"seconds\":25.04},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t24.png\",\"sha256\":\"0e125853c508b547f60d6460db9ce51bfde3467592dcbaf045eed15fb1181190\",\"kind\":\"frame\",\"seconds\":32.29}]}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:24:38.744Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":34.65,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t0.png\",\"sha256\":\"e743b155e6fbc743ccd73cd1e80b1a4a9e3cd278943a943d80a8917d6c72d0f2\",\"kind\":\"frame\",\"seconds\":2.15},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t6.png\",\"sha256\":\"ec871b8289b553ffa158f5ed04a754595ab2991b6067e471bb103546be40c0dd\",\"kind\":\"frame\",\"seconds\":11},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t12.png\",\"sha256\":\"270d7f11ed8478d3817e0ef9b40685d2c1b71bf46cd242ca387d160678f7523a\",\"kind\":\"frame\",\"seconds\":18.29},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t18.png\",\"sha256\":\"f4423703b33b347f2ba41bca4acb40357c50976862c22d9926cb00e216db6451\",\"kind\":\"frame\",\"seconds\":25.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t24.png\",\"sha256\":\"6970c25aeeca608ec1345eab153ea2f85911a223e3f5e26b8f66c0ff6ce4548b\",\"kind\":\"frame\",\"seconds\":34.13},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-timeline.webm\",\"sha256\":\"7d22e605c4e933413766fe0adf3304a64100ecd5af1cb2047e2f0209b4544ded\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":34.4,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t0.png\",\"sha256\":\"695a0e1f2354993f776536a56656516bba8a6974242c8fbafe1fa288010689fd\",\"kind\":\"frame\",\"seconds\":2.18},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t6.png\",\"sha256\":\"96db30c729a8d87ce50037e541d491f952dd84380b425edef930dcb899990b6a\",\"kind\":\"frame\",\"seconds\":11.42},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t12.png\",\"sha256\":\"7f5eef264dc9ddb695a380a369178f338182faf22de78f9093b061c97d1e821d\",\"kind\":\"frame\",\"seconds\":19.01},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t18.png\",\"sha256\":\"57ee8da701b853be4ec8f243859d7a982b06124e73516fdabcb71014704bda84\",\"kind\":\"frame\",\"seconds\":26.48},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t24.png\",\"sha256\":\"d0b87a986686f83b71dae75c5ac276ab250d45daf36cfb9d41e46788897d7b67\",\"kind\":\"frame\",\"seconds\":33.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-timeline.webm\",\"sha256\":\"6764058dfc2b6bf522e52f3a605d846224c80b23982031e5eb385cddcdbd926f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":39.24,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t0.png\",\"sha256\":\"b0fabce2e085e4950417b646c4de95460a4d301ca2f3d34ee4fad458b330ce4a\",\"kind\":\"frame\",\"seconds\":3.04},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t6.png\",\"sha256\":\"37c18fbea762ce9920704e8d55641313c1b068e61ebd583a30060a8b4a759505\",\"kind\":\"frame\",\"seconds\":13.19},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t12.png\",\"sha256\":\"068be0a64c7d08db2bed6dbd8a17a8fe7d29307fd2c0dfd2c4c82093575491dd\",\"kind\":\"frame\",\"seconds\":22.36},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t18.png\",\"sha256\":\"2a2a59639806ef7a3da46e71d782a901911f81a8427dd4ebb239efec6e98c6b1\",\"kind\":\"frame\",\"seconds\":31.67},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t24.png\",\"sha256\":\"cc167dc1ede61eb6329de82fff06b1d9684b654d56fd268bf8808ab50ff55aee\",\"kind\":\"frame\",\"seconds\":38.73}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.79,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t0.png\",\"sha256\":\"982136f86bff2fd8ba9e480fca3579c473f2b1ccf193074660166733f63b390b\",\"kind\":\"frame\",\"seconds\":2.19},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t6.png\",\"sha256\":\"6a0fd1b579d587a0d9066dca81f7d348365898ca60fadbf8f884c97a00ac70b8\",\"kind\":\"frame\",\"seconds\":10.44},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t12.png\",\"sha256\":\"69dc00b44f5f6b835c65f5c8bc11446070306132bcd701b15b430d0e636fc0c1\",\"kind\":\"frame\",\"seconds\":17.61},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t18.png\",\"sha256\":\"6bfa38dfd87f502b75b949d47f6b45009f9fce0ee53ceb34314b1ec1cc027437\",\"kind\":\"frame\",\"seconds\":25.04},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t24.png\",\"sha256\":\"0e125853c508b547f60d6460db9ce51bfde3467592dcbaf045eed15fb1181190\",\"kind\":\"frame\",\"seconds\":32.29}]}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:24:38.744Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":34.65,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t0.png\",\"sha256\":\"e743b155e6fbc743ccd73cd1e80b1a4a9e3cd278943a943d80a8917d6c72d0f2\",\"kind\":\"frame\",\"seconds\":2.15},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t6.png\",\"sha256\":\"ec871b8289b553ffa158f5ed04a754595ab2991b6067e471bb103546be40c0dd\",\"kind\":\"frame\",\"seconds\":11},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t12.png\",\"sha256\":\"270d7f11ed8478d3817e0ef9b40685d2c1b71bf46cd242ca387d160678f7523a\",\"kind\":\"frame\",\"seconds\":18.29},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t18.png\",\"sha256\":\"f4423703b33b347f2ba41bca4acb40357c50976862c22d9926cb00e216db6451\",\"kind\":\"frame\",\"seconds\":25.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t24.png\",\"sha256\":\"6970c25aeeca608ec1345eab153ea2f85911a223e3f5e26b8f66c0ff6ce4548b\",\"kind\":\"frame\",\"seconds\":34.13},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-timeline.webm\",\"sha256\":\"7d22e605c4e933413766fe0adf3304a64100ecd5af1cb2047e2f0209b4544ded\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":34.4,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t0.png\",\"sha256\":\"695a0e1f2354993f776536a56656516bba8a6974242c8fbafe1fa288010689fd\",\"kind\":\"frame\",\"seconds\":2.18},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t6.png\",\"sha256\":\"96db30c729a8d87ce50037e541d491f952dd84380b425edef930dcb899990b6a\",\"kind\":\"frame\",\"seconds\":11.42},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t12.png\",\"sha256\":\"7f5eef264dc9ddb695a380a369178f338182faf22de78f9093b061c97d1e821d\",\"kind\":\"frame\",\"seconds\":19.01},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t18.png\",\"sha256\":\"57ee8da701b853be4ec8f243859d7a982b06124e73516fdabcb71014704bda84\",\"kind\":\"frame\",\"seconds\":26.48},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t24.png\",\"sha256\":\"d0b87a986686f83b71dae75c5ac276ab250d45daf36cfb9d41e46788897d7b67\",\"kind\":\"frame\",\"seconds\":33.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-timeline.webm\",\"sha256\":\"6764058dfc2b6bf522e52f3a605d846224c80b23982031e5eb385cddcdbd926f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":39.24,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t0.png\",\"sha256\":\"b0fabce2e085e4950417b646c4de95460a4d301ca2f3d34ee4fad458b330ce4a\",\"kind\":\"frame\",\"seconds\":3.04},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t6.png\",\"sha256\":\"37c18fbea762ce9920704e8d55641313c1b068e61ebd583a30060a8b4a759505\",\"kind\":\"frame\",\"seconds\":13.19},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t12.png\",\"sha256\":\"068be0a64c7d08db2bed6dbd8a17a8fe7d29307fd2c0dfd2c4c82093575491dd\",\"kind\":\"frame\",\"seconds\":22.36},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t18.png\",\"sha256\":\"2a2a59639806ef7a3da46e71d782a901911f81a8427dd4ebb239efec6e98c6b1\",\"kind\":\"frame\",\"seconds\":31.67},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t24.png\",\"sha256\":\"cc167dc1ede61eb6329de82fff06b1d9684b654d56fd268bf8808ab50ff55aee\",\"kind\":\"frame\",\"seconds\":38.73}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.79,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t0.png\",\"sha256\":\"982136f86bff2fd8ba9e480fca3579c473f2b1ccf193074660166733f63b390b\",\"kind\":\"frame\",\"seconds\":2.19},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t6.png\",\"sha256\":\"6a0fd1b579d587a0d9066dca81f7d348365898ca60fadbf8f884c97a00ac70b8\",\"kind\":\"frame\",\"seconds\":10.44},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t12.png\",\"sha256\":\"69dc00b44f5f6b835c65f5c8bc11446070306132bcd701b15b430d0e636fc0c1\",\"kind\":\"frame\",\"seconds\":17.61},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t18.png\",\"sha256\":\"6bfa38dfd87f502b75b949d47f6b45009f9fce0ee53ceb34314b1ec1cc027437\",\"kind\":\"frame\",\"seconds\":25.04},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t24.png\",\"sha256\":\"0e125853c508b547f60d6460db9ce51bfde3467592dcbaf045eed15fb1181190\",\"kind\":\"frame\",\"seconds\":32.29}]}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:24:38.744Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":34.65,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t0.png\",\"sha256\":\"e743b155e6fbc743ccd73cd1e80b1a4a9e3cd278943a943d80a8917d6c72d0f2\",\"kind\":\"frame\",\"seconds\":2.15},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t6.png\",\"sha256\":\"ec871b8289b553ffa158f5ed04a754595ab2991b6067e471bb103546be40c0dd\",\"kind\":\"frame\",\"seconds\":11},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t12.png\",\"sha256\":\"270d7f11ed8478d3817e0ef9b40685d2c1b71bf46cd242ca387d160678f7523a\",\"kind\":\"frame\",\"seconds\":18.29},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t18.png\",\"sha256\":\"f4423703b33b347f2ba41bca4acb40357c50976862c22d9926cb00e216db6451\",\"kind\":\"frame\",\"seconds\":25.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-t24.png\",\"sha256\":\"6970c25aeeca608ec1345eab153ea2f85911a223e3f5e26b8f66c0ff6ce4548b\",\"kind\":\"frame\",\"seconds\":34.13},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-desktop-timeline.webm\",\"sha256\":\"7d22e605c4e933413766fe0adf3304a64100ecd5af1cb2047e2f0209b4544ded\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":34.4,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t0.png\",\"sha256\":\"695a0e1f2354993f776536a56656516bba8a6974242c8fbafe1fa288010689fd\",\"kind\":\"frame\",\"seconds\":2.18},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t6.png\",\"sha256\":\"96db30c729a8d87ce50037e541d491f952dd84380b425edef930dcb899990b6a\",\"kind\":\"frame\",\"seconds\":11.42},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t12.png\",\"sha256\":\"7f5eef264dc9ddb695a380a369178f338182faf22de78f9093b061c97d1e821d\",\"kind\":\"frame\",\"seconds\":19.01},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t18.png\",\"sha256\":\"57ee8da701b853be4ec8f243859d7a982b06124e73516fdabcb71014704bda84\",\"kind\":\"frame\",\"seconds\":26.48},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-t24.png\",\"sha256\":\"d0b87a986686f83b71dae75c5ac276ab250d45daf36cfb9d41e46788897d7b67\",\"kind\":\"frame\",\"seconds\":33.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-mobile-timeline.webm\",\"sha256\":\"6764058dfc2b6bf522e52f3a605d846224c80b23982031e5eb385cddcdbd926f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":39.24,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t0.png\",\"sha256\":\"b0fabce2e085e4950417b646c4de95460a4d301ca2f3d34ee4fad458b330ce4a\",\"kind\":\"frame\",\"seconds\":3.04},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t6.png\",\"sha256\":\"37c18fbea762ce9920704e8d55641313c1b068e61ebd583a30060a8b4a759505\",\"kind\":\"frame\",\"seconds\":13.19},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t12.png\",\"sha256\":\"068be0a64c7d08db2bed6dbd8a17a8fe7d29307fd2c0dfd2c4c82093575491dd\",\"kind\":\"frame\",\"seconds\":22.36},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t18.png\",\"sha256\":\"2a2a59639806ef7a3da46e71d782a901911f81a8427dd4ebb239efec6e98c6b1\",\"kind\":\"frame\",\"seconds\":31.67},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-dpr2-t24.png\",\"sha256\":\"cc167dc1ede61eb6329de82fff06b1d9684b654d56fd268bf8808ab50ff55aee\",\"kind\":\"frame\",\"seconds\":38.73}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.79,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t0.png\",\"sha256\":\"982136f86bff2fd8ba9e480fca3579c473f2b1ccf193074660166733f63b390b\",\"kind\":\"frame\",\"seconds\":2.19},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t6.png\",\"sha256\":\"6a0fd1b579d587a0d9066dca81f7d348365898ca60fadbf8f884c97a00ac70b8\",\"kind\":\"frame\",\"seconds\":10.44},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t12.png\",\"sha256\":\"69dc00b44f5f6b835c65f5c8bc11446070306132bcd701b15b430d0e636fc0c1\",\"kind\":\"frame\",\"seconds\":17.61},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t18.png\",\"sha256\":\"6bfa38dfd87f502b75b949d47f6b45009f9fce0ee53ceb34314b1ec1cc027437\",\"kind\":\"frame\",\"seconds\":25.04},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/claude-opus-5-5-high-reduced-t24.png\",\"sha256\":\"0e125853c508b547f60d6460db9ce51bfde3467592dcbaf045eed15fb1181190\",\"kind\":\"frame\",\"seconds\":32.29}]}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:25:15.460Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.01,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t0.png\",\"sha256\":\"c49ab78bfe0d165923f7e43c6b6002d61b1b35d9705a213f90e66c4fa2650c29\",\"kind\":\"frame\",\"seconds\":1.84},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t6.png\",\"sha256\":\"fc75b6185a0b3eacd3afee2b0fcccb6e1308d254320b344142d8994a220e45fc\",\"kind\":\"frame\",\"seconds\":9.03},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t12.png\",\"sha256\":\"300f4edce68975cd849ed03d8e673596efaf4c006ae1ac8c2b8339834e4c8418\",\"kind\":\"frame\",\"seconds\":16.43},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t18.png\",\"sha256\":\"ba6fe228bca73bc67c303a1a6e7b73ce1ac6370247e054a1b384b42821bcd203\",\"kind\":\"frame\",\"seconds\":23.83},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t24.png\",\"sha256\":\"b6a6efa4d554ded30f1f2d189517b10d9172fab25695079ce4ce7c0833e9bd2e\",\"kind\":\"frame\",\"seconds\":31.5},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"110891eb6adf1072a7fcd30188e901390672e173b862b87629937a79d0ac83fd\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.78,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t0.png\",\"sha256\":\"ca0a4cb970ac3fe720efc2414cd04d55e25c17bbae4be6e9fc1b882abb6c15f6\",\"kind\":\"frame\",\"seconds\":1.32},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t6.png\",\"sha256\":\"8c8e71eefbae1fc3fd569a1f1ac9ccb7c6e64ffd6378f445715bf3a6c8c78563\",\"kind\":\"frame\",\"seconds\":8.5},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t12.png\",\"sha256\":\"6d78d293df04430072d88c734fa02b53a082e10f963f4ed3a0d365471dc14e22\",\"kind\":\"frame\",\"seconds\":15.9},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t18.png\",\"sha256\":\"c4732eb845788d24c38210105386890ede933f591a1f99ab914947a6aff6fa4a\",\"kind\":\"frame\",\"seconds\":23.56},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t24.png\",\"sha256\":\"d82c06490ea455239a0565fb66291ebc121141a5c3d54c1fc7dfb30521a697fd\",\"kind\":\"frame\",\"seconds\":31.27},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"94ef1b556f191fe2aa498e0a41a0416000988e57e4b5a975e45550c478a2a453\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":36.06,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t0.png\",\"sha256\":\"86956a3009fb385f824ee6027e750ebd90f29b317c6a9d778156ec37c27fccf2\",\"kind\":\"frame\",\"seconds\":1.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t6.png\",\"sha256\":\"18d7249e5658dda0ef4400d4461b8488714fbd45e544c828b199b06f69b3fe04\",\"kind\":\"frame\",\"seconds\":10.52},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t12.png\",\"sha256\":\"635ee9a334912e42e39621a2b3396117e893107c0fed4c7caa74d5d80ba70b15\",\"kind\":\"frame\",\"seconds\":19.05},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t18.png\",\"sha256\":\"383b0929988a9633d4090142f3e9d3559d6d0bbae5366345513be250ea8465df\",\"kind\":\"frame\",\"seconds\":27.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t24.png\",\"sha256\":\"0c2d53c063c87685e5277f4f1afee24556d3794dea3e449803a754f31e2f4810\",\"kind\":\"frame\",\"seconds\":35.52}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.67,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t0.png\",\"sha256\":\"deb4812218c4b51e13a329ed56fee2eaedc372ba318e8877fa51a9fc951bc18c\",\"kind\":\"frame\",\"seconds\":1.13},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t6.png\",\"sha256\":\"67994d3d021edccb8d1d242f79da2db91e4bcb86fe367a8ec1cc34721a1cc404\",\"kind\":\"frame\",\"seconds\":8.28},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t12.png\",\"sha256\":\"7feead8f98897b359adef540919e44036ebf7a48f17095a71c33b2dbe92ff920\",\"kind\":\"frame\",\"seconds\":16.16},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t18.png\",\"sha256\":\"6515c3831575d5c178b166b975a039388161593f36330a5a571bae3722bc9c31\",\"kind\":\"frame\",\"seconds\":23.57},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t24.png\",\"sha256\":\"0140c495a8bd78919e37996a5981003643aa77ec5bef4f899dd0248df13f73d3\",\"kind\":\"frame\",\"seconds\":31.14}]}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:25:15.461Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.01,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t0.png\",\"sha256\":\"c49ab78bfe0d165923f7e43c6b6002d61b1b35d9705a213f90e66c4fa2650c29\",\"kind\":\"frame\",\"seconds\":1.84},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t6.png\",\"sha256\":\"fc75b6185a0b3eacd3afee2b0fcccb6e1308d254320b344142d8994a220e45fc\",\"kind\":\"frame\",\"seconds\":9.03},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t12.png\",\"sha256\":\"300f4edce68975cd849ed03d8e673596efaf4c006ae1ac8c2b8339834e4c8418\",\"kind\":\"frame\",\"seconds\":16.43},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t18.png\",\"sha256\":\"ba6fe228bca73bc67c303a1a6e7b73ce1ac6370247e054a1b384b42821bcd203\",\"kind\":\"frame\",\"seconds\":23.83},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t24.png\",\"sha256\":\"b6a6efa4d554ded30f1f2d189517b10d9172fab25695079ce4ce7c0833e9bd2e\",\"kind\":\"frame\",\"seconds\":31.5},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"110891eb6adf1072a7fcd30188e901390672e173b862b87629937a79d0ac83fd\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.78,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t0.png\",\"sha256\":\"ca0a4cb970ac3fe720efc2414cd04d55e25c17bbae4be6e9fc1b882abb6c15f6\",\"kind\":\"frame\",\"seconds\":1.32},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t6.png\",\"sha256\":\"8c8e71eefbae1fc3fd569a1f1ac9ccb7c6e64ffd6378f445715bf3a6c8c78563\",\"kind\":\"frame\",\"seconds\":8.5},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t12.png\",\"sha256\":\"6d78d293df04430072d88c734fa02b53a082e10f963f4ed3a0d365471dc14e22\",\"kind\":\"frame\",\"seconds\":15.9},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t18.png\",\"sha256\":\"c4732eb845788d24c38210105386890ede933f591a1f99ab914947a6aff6fa4a\",\"kind\":\"frame\",\"seconds\":23.56},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t24.png\",\"sha256\":\"d82c06490ea455239a0565fb66291ebc121141a5c3d54c1fc7dfb30521a697fd\",\"kind\":\"frame\",\"seconds\":31.27},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"94ef1b556f191fe2aa498e0a41a0416000988e57e4b5a975e45550c478a2a453\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":36.06,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t0.png\",\"sha256\":\"86956a3009fb385f824ee6027e750ebd90f29b317c6a9d778156ec37c27fccf2\",\"kind\":\"frame\",\"seconds\":1.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t6.png\",\"sha256\":\"18d7249e5658dda0ef4400d4461b8488714fbd45e544c828b199b06f69b3fe04\",\"kind\":\"frame\",\"seconds\":10.52},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t12.png\",\"sha256\":\"635ee9a334912e42e39621a2b3396117e893107c0fed4c7caa74d5d80ba70b15\",\"kind\":\"frame\",\"seconds\":19.05},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t18.png\",\"sha256\":\"383b0929988a9633d4090142f3e9d3559d6d0bbae5366345513be250ea8465df\",\"kind\":\"frame\",\"seconds\":27.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t24.png\",\"sha256\":\"0c2d53c063c87685e5277f4f1afee24556d3794dea3e449803a754f31e2f4810\",\"kind\":\"frame\",\"seconds\":35.52}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.67,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t0.png\",\"sha256\":\"deb4812218c4b51e13a329ed56fee2eaedc372ba318e8877fa51a9fc951bc18c\",\"kind\":\"frame\",\"seconds\":1.13},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t6.png\",\"sha256\":\"67994d3d021edccb8d1d242f79da2db91e4bcb86fe367a8ec1cc34721a1cc404\",\"kind\":\"frame\",\"seconds\":8.28},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t12.png\",\"sha256\":\"7feead8f98897b359adef540919e44036ebf7a48f17095a71c33b2dbe92ff920\",\"kind\":\"frame\",\"seconds\":16.16},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t18.png\",\"sha256\":\"6515c3831575d5c178b166b975a039388161593f36330a5a571bae3722bc9c31\",\"kind\":\"frame\",\"seconds\":23.57},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t24.png\",\"sha256\":\"0140c495a8bd78919e37996a5981003643aa77ec5bef4f899dd0248df13f73d3\",\"kind\":\"frame\",\"seconds\":31.14}]}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:25:15.461Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.01,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t0.png\",\"sha256\":\"c49ab78bfe0d165923f7e43c6b6002d61b1b35d9705a213f90e66c4fa2650c29\",\"kind\":\"frame\",\"seconds\":1.84},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t6.png\",\"sha256\":\"fc75b6185a0b3eacd3afee2b0fcccb6e1308d254320b344142d8994a220e45fc\",\"kind\":\"frame\",\"seconds\":9.03},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t12.png\",\"sha256\":\"300f4edce68975cd849ed03d8e673596efaf4c006ae1ac8c2b8339834e4c8418\",\"kind\":\"frame\",\"seconds\":16.43},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t18.png\",\"sha256\":\"ba6fe228bca73bc67c303a1a6e7b73ce1ac6370247e054a1b384b42821bcd203\",\"kind\":\"frame\",\"seconds\":23.83},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t24.png\",\"sha256\":\"b6a6efa4d554ded30f1f2d189517b10d9172fab25695079ce4ce7c0833e9bd2e\",\"kind\":\"frame\",\"seconds\":31.5},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"110891eb6adf1072a7fcd30188e901390672e173b862b87629937a79d0ac83fd\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.78,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t0.png\",\"sha256\":\"ca0a4cb970ac3fe720efc2414cd04d55e25c17bbae4be6e9fc1b882abb6c15f6\",\"kind\":\"frame\",\"seconds\":1.32},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t6.png\",\"sha256\":\"8c8e71eefbae1fc3fd569a1f1ac9ccb7c6e64ffd6378f445715bf3a6c8c78563\",\"kind\":\"frame\",\"seconds\":8.5},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t12.png\",\"sha256\":\"6d78d293df04430072d88c734fa02b53a082e10f963f4ed3a0d365471dc14e22\",\"kind\":\"frame\",\"seconds\":15.9},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t18.png\",\"sha256\":\"c4732eb845788d24c38210105386890ede933f591a1f99ab914947a6aff6fa4a\",\"kind\":\"frame\",\"seconds\":23.56},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t24.png\",\"sha256\":\"d82c06490ea455239a0565fb66291ebc121141a5c3d54c1fc7dfb30521a697fd\",\"kind\":\"frame\",\"seconds\":31.27},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"94ef1b556f191fe2aa498e0a41a0416000988e57e4b5a975e45550c478a2a453\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":36.06,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t0.png\",\"sha256\":\"86956a3009fb385f824ee6027e750ebd90f29b317c6a9d778156ec37c27fccf2\",\"kind\":\"frame\",\"seconds\":1.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t6.png\",\"sha256\":\"18d7249e5658dda0ef4400d4461b8488714fbd45e544c828b199b06f69b3fe04\",\"kind\":\"frame\",\"seconds\":10.52},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t12.png\",\"sha256\":\"635ee9a334912e42e39621a2b3396117e893107c0fed4c7caa74d5d80ba70b15\",\"kind\":\"frame\",\"seconds\":19.05},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t18.png\",\"sha256\":\"383b0929988a9633d4090142f3e9d3559d6d0bbae5366345513be250ea8465df\",\"kind\":\"frame\",\"seconds\":27.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t24.png\",\"sha256\":\"0c2d53c063c87685e5277f4f1afee24556d3794dea3e449803a754f31e2f4810\",\"kind\":\"frame\",\"seconds\":35.52}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.67,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t0.png\",\"sha256\":\"deb4812218c4b51e13a329ed56fee2eaedc372ba318e8877fa51a9fc951bc18c\",\"kind\":\"frame\",\"seconds\":1.13},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t6.png\",\"sha256\":\"67994d3d021edccb8d1d242f79da2db91e4bcb86fe367a8ec1cc34721a1cc404\",\"kind\":\"frame\",\"seconds\":8.28},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t12.png\",\"sha256\":\"7feead8f98897b359adef540919e44036ebf7a48f17095a71c33b2dbe92ff920\",\"kind\":\"frame\",\"seconds\":16.16},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t18.png\",\"sha256\":\"6515c3831575d5c178b166b975a039388161593f36330a5a571bae3722bc9c31\",\"kind\":\"frame\",\"seconds\":23.57},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t24.png\",\"sha256\":\"0140c495a8bd78919e37996a5981003643aa77ec5bef4f899dd0248df13f73d3\",\"kind\":\"frame\",\"seconds\":31.14}]}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:25:15.461Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.01,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t0.png\",\"sha256\":\"c49ab78bfe0d165923f7e43c6b6002d61b1b35d9705a213f90e66c4fa2650c29\",\"kind\":\"frame\",\"seconds\":1.84},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t6.png\",\"sha256\":\"fc75b6185a0b3eacd3afee2b0fcccb6e1308d254320b344142d8994a220e45fc\",\"kind\":\"frame\",\"seconds\":9.03},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t12.png\",\"sha256\":\"300f4edce68975cd849ed03d8e673596efaf4c006ae1ac8c2b8339834e4c8418\",\"kind\":\"frame\",\"seconds\":16.43},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t18.png\",\"sha256\":\"ba6fe228bca73bc67c303a1a6e7b73ce1ac6370247e054a1b384b42821bcd203\",\"kind\":\"frame\",\"seconds\":23.83},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t24.png\",\"sha256\":\"b6a6efa4d554ded30f1f2d189517b10d9172fab25695079ce4ce7c0833e9bd2e\",\"kind\":\"frame\",\"seconds\":31.5},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"110891eb6adf1072a7fcd30188e901390672e173b862b87629937a79d0ac83fd\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.78,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t0.png\",\"sha256\":\"ca0a4cb970ac3fe720efc2414cd04d55e25c17bbae4be6e9fc1b882abb6c15f6\",\"kind\":\"frame\",\"seconds\":1.32},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t6.png\",\"sha256\":\"8c8e71eefbae1fc3fd569a1f1ac9ccb7c6e64ffd6378f445715bf3a6c8c78563\",\"kind\":\"frame\",\"seconds\":8.5},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t12.png\",\"sha256\":\"6d78d293df04430072d88c734fa02b53a082e10f963f4ed3a0d365471dc14e22\",\"kind\":\"frame\",\"seconds\":15.9},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t18.png\",\"sha256\":\"c4732eb845788d24c38210105386890ede933f591a1f99ab914947a6aff6fa4a\",\"kind\":\"frame\",\"seconds\":23.56},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t24.png\",\"sha256\":\"d82c06490ea455239a0565fb66291ebc121141a5c3d54c1fc7dfb30521a697fd\",\"kind\":\"frame\",\"seconds\":31.27},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"94ef1b556f191fe2aa498e0a41a0416000988e57e4b5a975e45550c478a2a453\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":36.06,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t0.png\",\"sha256\":\"86956a3009fb385f824ee6027e750ebd90f29b317c6a9d778156ec37c27fccf2\",\"kind\":\"frame\",\"seconds\":1.87},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t6.png\",\"sha256\":\"18d7249e5658dda0ef4400d4461b8488714fbd45e544c828b199b06f69b3fe04\",\"kind\":\"frame\",\"seconds\":10.52},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t12.png\",\"sha256\":\"635ee9a334912e42e39621a2b3396117e893107c0fed4c7caa74d5d80ba70b15\",\"kind\":\"frame\",\"seconds\":19.05},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t18.png\",\"sha256\":\"383b0929988a9633d4090142f3e9d3559d6d0bbae5366345513be250ea8465df\",\"kind\":\"frame\",\"seconds\":27.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-t24.png\",\"sha256\":\"0c2d53c063c87685e5277f4f1afee24556d3794dea3e449803a754f31e2f4810\",\"kind\":\"frame\",\"seconds\":35.52}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.67,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t0.png\",\"sha256\":\"deb4812218c4b51e13a329ed56fee2eaedc372ba318e8877fa51a9fc951bc18c\",\"kind\":\"frame\",\"seconds\":1.13},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t6.png\",\"sha256\":\"67994d3d021edccb8d1d242f79da2db91e4bcb86fe367a8ec1cc34721a1cc404\",\"kind\":\"frame\",\"seconds\":8.28},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t12.png\",\"sha256\":\"7feead8f98897b359adef540919e44036ebf7a48f17095a71c33b2dbe92ff920\",\"kind\":\"frame\",\"seconds\":16.16},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t18.png\",\"sha256\":\"6515c3831575d5c178b166b975a039388161593f36330a5a571bae3722bc9c31\",\"kind\":\"frame\",\"seconds\":23.57},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-t24.png\",\"sha256\":\"0140c495a8bd78919e37996a5981003643aa77ec5bef4f899dd0248df13f73d3\",\"kind\":\"frame\",\"seconds\":31.14}]}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:25:43.077Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":24.45,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t0.png\",\"sha256\":\"514ef88302859d790afc95db5ffde182898b6fa178ce010743ac63c8f983b913\",\"kind\":\"frame\",\"seconds\":0.8},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t6.png\",\"sha256\":\"12e2f40c4588bd5366816ceb2b59e95b6e6fe2bf5e0f586e7c09cb0e47b6d9a6\",\"kind\":\"frame\",\"seconds\":6.51},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t12.png\",\"sha256\":\"b000b7c8d978def28b4d7e4ffdf68ba286cadb53750a8ec783fe748f3360f82f\",\"kind\":\"frame\",\"seconds\":12.91},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t18.png\",\"sha256\":\"0ca87d24bc00c7f5a24a96d5ecfb4ce3301a81350d5a37b6d1ba448d13b8cd19\",\"kind\":\"frame\",\"seconds\":18.44},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t24.png\",\"sha256\":\"a4be2f65671a261476224591e80daf7e432a2c0adf4b3bde6f53ea274d659858\",\"kind\":\"frame\",\"seconds\":23.93},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"7c01dad3f60b1530c3622ebd90dfd368fbefd2a5584400bfb3c4083de24de7e9\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.24,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t0.png\",\"sha256\":\"68027d6791e823d0db4c110682d318f6974e7014199a1efe7492faec5b6fffd6\",\"kind\":\"frame\",\"seconds\":0.65},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t6.png\",\"sha256\":\"077a085049b8261456aa3927374246b9ae8918b67ce7b100ea04a9ba1f0aa783\",\"kind\":\"frame\",\"seconds\":6.3},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t12.png\",\"sha256\":\"0437f60394d325bf0b6c689df51c429c4fef276e02b99e6cc4e9b61c1783628b\",\"kind\":\"frame\",\"seconds\":11.84},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t18.png\",\"sha256\":\"6a2ee813713ea01af14cd538b4c8a02f4950f999b22f072da5dab0f916fc0cdb\",\"kind\":\"frame\",\"seconds\":17.33},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t24.png\",\"sha256\":\"d889a589effb2f9bf968175f59b92e67b6350abc854f1d346b7df5a050dad4d5\",\"kind\":\"frame\",\"seconds\":22.72},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"a77b4f8513edea4ca126844deb6281f0d2a6f1974cd609f5fde4762643faf592\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":26.88,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t0.png\",\"sha256\":\"4bcc3940c1a1ae6c767895e3da6501a789dfd8aa33ce06a7c90be7a21d6d7d11\",\"kind\":\"frame\",\"seconds\":1.05},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t6.png\",\"sha256\":\"094b4e5231f8c45819cde6b04c2d1e2c0dc69ebaabaf55b2a9cd210f66aa5487\",\"kind\":\"frame\",\"seconds\":7.4},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t12.png\",\"sha256\":\"6abb47ad444e5940e0d4ed7292b3a18481f140300f2ff3cb545494fc99cfdb3d\",\"kind\":\"frame\",\"seconds\":13.9},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t18.png\",\"sha256\":\"b2c7a06aade99b535c8d79e37e73831583e0d1f67439adf39a08a646778b8a66\",\"kind\":\"frame\",\"seconds\":20.49},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t24.png\",\"sha256\":\"a6b1507f2a263008dc846a10e25a0d198fcbea296210c6d2a6f30892fc930f9c\",\"kind\":\"frame\",\"seconds\":26.36}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.22,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t0.png\",\"sha256\":\"c34457598611f6aa85f08566ac913b8530458f3bc9bc34ef189eea06142c8362\",\"kind\":\"frame\",\"seconds\":0.81},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t6.png\",\"sha256\":\"0e01e894865140ab53648d5fc1acaf2158188c6b56cb089973e3b29a94d35e02\",\"kind\":\"frame\",\"seconds\":6.33},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t12.png\",\"sha256\":\"8eb0fed98301d78a0d4aa660a60b90a0787f206be27a02652c7914c1411472d0\",\"kind\":\"frame\",\"seconds\":11.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t18.png\",\"sha256\":\"a18954c6a5a9af699a9637279bdfc3a57229d4ba667004e996545e1c1ab9749e\",\"kind\":\"frame\",\"seconds\":17.3},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t24.png\",\"sha256\":\"0becd2be4b0e721f3369b3c147dbc284cd1bd86aa0ed21612faa7a3568cdb62f\",\"kind\":\"frame\",\"seconds\":22.7}]}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:25:43.077Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":24.45,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t0.png\",\"sha256\":\"514ef88302859d790afc95db5ffde182898b6fa178ce010743ac63c8f983b913\",\"kind\":\"frame\",\"seconds\":0.8},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t6.png\",\"sha256\":\"12e2f40c4588bd5366816ceb2b59e95b6e6fe2bf5e0f586e7c09cb0e47b6d9a6\",\"kind\":\"frame\",\"seconds\":6.51},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t12.png\",\"sha256\":\"b000b7c8d978def28b4d7e4ffdf68ba286cadb53750a8ec783fe748f3360f82f\",\"kind\":\"frame\",\"seconds\":12.91},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t18.png\",\"sha256\":\"0ca87d24bc00c7f5a24a96d5ecfb4ce3301a81350d5a37b6d1ba448d13b8cd19\",\"kind\":\"frame\",\"seconds\":18.44},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t24.png\",\"sha256\":\"a4be2f65671a261476224591e80daf7e432a2c0adf4b3bde6f53ea274d659858\",\"kind\":\"frame\",\"seconds\":23.93},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"7c01dad3f60b1530c3622ebd90dfd368fbefd2a5584400bfb3c4083de24de7e9\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.24,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t0.png\",\"sha256\":\"68027d6791e823d0db4c110682d318f6974e7014199a1efe7492faec5b6fffd6\",\"kind\":\"frame\",\"seconds\":0.65},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t6.png\",\"sha256\":\"077a085049b8261456aa3927374246b9ae8918b67ce7b100ea04a9ba1f0aa783\",\"kind\":\"frame\",\"seconds\":6.3},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t12.png\",\"sha256\":\"0437f60394d325bf0b6c689df51c429c4fef276e02b99e6cc4e9b61c1783628b\",\"kind\":\"frame\",\"seconds\":11.84},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t18.png\",\"sha256\":\"6a2ee813713ea01af14cd538b4c8a02f4950f999b22f072da5dab0f916fc0cdb\",\"kind\":\"frame\",\"seconds\":17.33},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t24.png\",\"sha256\":\"d889a589effb2f9bf968175f59b92e67b6350abc854f1d346b7df5a050dad4d5\",\"kind\":\"frame\",\"seconds\":22.72},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"a77b4f8513edea4ca126844deb6281f0d2a6f1974cd609f5fde4762643faf592\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":26.88,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t0.png\",\"sha256\":\"4bcc3940c1a1ae6c767895e3da6501a789dfd8aa33ce06a7c90be7a21d6d7d11\",\"kind\":\"frame\",\"seconds\":1.05},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t6.png\",\"sha256\":\"094b4e5231f8c45819cde6b04c2d1e2c0dc69ebaabaf55b2a9cd210f66aa5487\",\"kind\":\"frame\",\"seconds\":7.4},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t12.png\",\"sha256\":\"6abb47ad444e5940e0d4ed7292b3a18481f140300f2ff3cb545494fc99cfdb3d\",\"kind\":\"frame\",\"seconds\":13.9},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t18.png\",\"sha256\":\"b2c7a06aade99b535c8d79e37e73831583e0d1f67439adf39a08a646778b8a66\",\"kind\":\"frame\",\"seconds\":20.49},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t24.png\",\"sha256\":\"a6b1507f2a263008dc846a10e25a0d198fcbea296210c6d2a6f30892fc930f9c\",\"kind\":\"frame\",\"seconds\":26.36}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.22,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t0.png\",\"sha256\":\"c34457598611f6aa85f08566ac913b8530458f3bc9bc34ef189eea06142c8362\",\"kind\":\"frame\",\"seconds\":0.81},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t6.png\",\"sha256\":\"0e01e894865140ab53648d5fc1acaf2158188c6b56cb089973e3b29a94d35e02\",\"kind\":\"frame\",\"seconds\":6.33},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t12.png\",\"sha256\":\"8eb0fed98301d78a0d4aa660a60b90a0787f206be27a02652c7914c1411472d0\",\"kind\":\"frame\",\"seconds\":11.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t18.png\",\"sha256\":\"a18954c6a5a9af699a9637279bdfc3a57229d4ba667004e996545e1c1ab9749e\",\"kind\":\"frame\",\"seconds\":17.3},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t24.png\",\"sha256\":\"0becd2be4b0e721f3369b3c147dbc284cd1bd86aa0ed21612faa7a3568cdb62f\",\"kind\":\"frame\",\"seconds\":22.7}]}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:25:43.077Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":24.45,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t0.png\",\"sha256\":\"514ef88302859d790afc95db5ffde182898b6fa178ce010743ac63c8f983b913\",\"kind\":\"frame\",\"seconds\":0.8},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t6.png\",\"sha256\":\"12e2f40c4588bd5366816ceb2b59e95b6e6fe2bf5e0f586e7c09cb0e47b6d9a6\",\"kind\":\"frame\",\"seconds\":6.51},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t12.png\",\"sha256\":\"b000b7c8d978def28b4d7e4ffdf68ba286cadb53750a8ec783fe748f3360f82f\",\"kind\":\"frame\",\"seconds\":12.91},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t18.png\",\"sha256\":\"0ca87d24bc00c7f5a24a96d5ecfb4ce3301a81350d5a37b6d1ba448d13b8cd19\",\"kind\":\"frame\",\"seconds\":18.44},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t24.png\",\"sha256\":\"a4be2f65671a261476224591e80daf7e432a2c0adf4b3bde6f53ea274d659858\",\"kind\":\"frame\",\"seconds\":23.93},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"7c01dad3f60b1530c3622ebd90dfd368fbefd2a5584400bfb3c4083de24de7e9\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.24,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t0.png\",\"sha256\":\"68027d6791e823d0db4c110682d318f6974e7014199a1efe7492faec5b6fffd6\",\"kind\":\"frame\",\"seconds\":0.65},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t6.png\",\"sha256\":\"077a085049b8261456aa3927374246b9ae8918b67ce7b100ea04a9ba1f0aa783\",\"kind\":\"frame\",\"seconds\":6.3},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t12.png\",\"sha256\":\"0437f60394d325bf0b6c689df51c429c4fef276e02b99e6cc4e9b61c1783628b\",\"kind\":\"frame\",\"seconds\":11.84},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t18.png\",\"sha256\":\"6a2ee813713ea01af14cd538b4c8a02f4950f999b22f072da5dab0f916fc0cdb\",\"kind\":\"frame\",\"seconds\":17.33},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t24.png\",\"sha256\":\"d889a589effb2f9bf968175f59b92e67b6350abc854f1d346b7df5a050dad4d5\",\"kind\":\"frame\",\"seconds\":22.72},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"a77b4f8513edea4ca126844deb6281f0d2a6f1974cd609f5fde4762643faf592\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":26.88,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t0.png\",\"sha256\":\"4bcc3940c1a1ae6c767895e3da6501a789dfd8aa33ce06a7c90be7a21d6d7d11\",\"kind\":\"frame\",\"seconds\":1.05},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t6.png\",\"sha256\":\"094b4e5231f8c45819cde6b04c2d1e2c0dc69ebaabaf55b2a9cd210f66aa5487\",\"kind\":\"frame\",\"seconds\":7.4},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t12.png\",\"sha256\":\"6abb47ad444e5940e0d4ed7292b3a18481f140300f2ff3cb545494fc99cfdb3d\",\"kind\":\"frame\",\"seconds\":13.9},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t18.png\",\"sha256\":\"b2c7a06aade99b535c8d79e37e73831583e0d1f67439adf39a08a646778b8a66\",\"kind\":\"frame\",\"seconds\":20.49},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t24.png\",\"sha256\":\"a6b1507f2a263008dc846a10e25a0d198fcbea296210c6d2a6f30892fc930f9c\",\"kind\":\"frame\",\"seconds\":26.36}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.22,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t0.png\",\"sha256\":\"c34457598611f6aa85f08566ac913b8530458f3bc9bc34ef189eea06142c8362\",\"kind\":\"frame\",\"seconds\":0.81},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t6.png\",\"sha256\":\"0e01e894865140ab53648d5fc1acaf2158188c6b56cb089973e3b29a94d35e02\",\"kind\":\"frame\",\"seconds\":6.33},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t12.png\",\"sha256\":\"8eb0fed98301d78a0d4aa660a60b90a0787f206be27a02652c7914c1411472d0\",\"kind\":\"frame\",\"seconds\":11.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t18.png\",\"sha256\":\"a18954c6a5a9af699a9637279bdfc3a57229d4ba667004e996545e1c1ab9749e\",\"kind\":\"frame\",\"seconds\":17.3},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t24.png\",\"sha256\":\"0becd2be4b0e721f3369b3c147dbc284cd1bd86aa0ed21612faa7a3568cdb62f\",\"kind\":\"frame\",\"seconds\":22.7}]}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:25:43.078Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "22e01ff413b39ebeba0ad47e2152e3bc61991553bf4b1d210bb8193a0be32a65",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":24.45,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t0.png\",\"sha256\":\"514ef88302859d790afc95db5ffde182898b6fa178ce010743ac63c8f983b913\",\"kind\":\"frame\",\"seconds\":0.8},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t6.png\",\"sha256\":\"12e2f40c4588bd5366816ceb2b59e95b6e6fe2bf5e0f586e7c09cb0e47b6d9a6\",\"kind\":\"frame\",\"seconds\":6.51},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t12.png\",\"sha256\":\"b000b7c8d978def28b4d7e4ffdf68ba286cadb53750a8ec783fe748f3360f82f\",\"kind\":\"frame\",\"seconds\":12.91},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t18.png\",\"sha256\":\"0ca87d24bc00c7f5a24a96d5ecfb4ce3301a81350d5a37b6d1ba448d13b8cd19\",\"kind\":\"frame\",\"seconds\":18.44},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t24.png\",\"sha256\":\"a4be2f65671a261476224591e80daf7e432a2c0adf4b3bde6f53ea274d659858\",\"kind\":\"frame\",\"seconds\":23.93},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"7c01dad3f60b1530c3622ebd90dfd368fbefd2a5584400bfb3c4083de24de7e9\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.24,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t0.png\",\"sha256\":\"68027d6791e823d0db4c110682d318f6974e7014199a1efe7492faec5b6fffd6\",\"kind\":\"frame\",\"seconds\":0.65},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t6.png\",\"sha256\":\"077a085049b8261456aa3927374246b9ae8918b67ce7b100ea04a9ba1f0aa783\",\"kind\":\"frame\",\"seconds\":6.3},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t12.png\",\"sha256\":\"0437f60394d325bf0b6c689df51c429c4fef276e02b99e6cc4e9b61c1783628b\",\"kind\":\"frame\",\"seconds\":11.84},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t18.png\",\"sha256\":\"6a2ee813713ea01af14cd538b4c8a02f4950f999b22f072da5dab0f916fc0cdb\",\"kind\":\"frame\",\"seconds\":17.33},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t24.png\",\"sha256\":\"d889a589effb2f9bf968175f59b92e67b6350abc854f1d346b7df5a050dad4d5\",\"kind\":\"frame\",\"seconds\":22.72},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"a77b4f8513edea4ca126844deb6281f0d2a6f1974cd609f5fde4762643faf592\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":26.88,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t0.png\",\"sha256\":\"4bcc3940c1a1ae6c767895e3da6501a789dfd8aa33ce06a7c90be7a21d6d7d11\",\"kind\":\"frame\",\"seconds\":1.05},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t6.png\",\"sha256\":\"094b4e5231f8c45819cde6b04c2d1e2c0dc69ebaabaf55b2a9cd210f66aa5487\",\"kind\":\"frame\",\"seconds\":7.4},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t12.png\",\"sha256\":\"6abb47ad444e5940e0d4ed7292b3a18481f140300f2ff3cb545494fc99cfdb3d\",\"kind\":\"frame\",\"seconds\":13.9},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t18.png\",\"sha256\":\"b2c7a06aade99b535c8d79e37e73831583e0d1f67439adf39a08a646778b8a66\",\"kind\":\"frame\",\"seconds\":20.49},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-t24.png\",\"sha256\":\"a6b1507f2a263008dc846a10e25a0d198fcbea296210c6d2a6f30892fc930f9c\",\"kind\":\"frame\",\"seconds\":26.36}]},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.22,\"files\":[{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t0.png\",\"sha256\":\"c34457598611f6aa85f08566ac913b8530458f3bc9bc34ef189eea06142c8362\",\"kind\":\"frame\",\"seconds\":0.81},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t6.png\",\"sha256\":\"0e01e894865140ab53648d5fc1acaf2158188c6b56cb089973e3b29a94d35e02\",\"kind\":\"frame\",\"seconds\":6.33},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t12.png\",\"sha256\":\"8eb0fed98301d78a0d4aa660a60b90a0787f206be27a02652c7914c1411472d0\",\"kind\":\"frame\",\"seconds\":11.88},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t18.png\",\"sha256\":\"a18954c6a5a9af699a9637279bdfc3a57229d4ba667004e996545e1c1ab9749e\",\"kind\":\"frame\",\"seconds\":17.3},{\"path\":\"assets/evidence/02-pelican-bicycle/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-t24.png\",\"sha256\":\"0becd2be4b0e721f3369b3c147dbc284cd1bd86aa0ed21612faa7a3568cdb62f\",\"kind\":\"frame\",\"seconds\":22.7}]}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  }
]
```

## AI 评审

独立评审封存批次；当前没有实际执行的 AI 评审，不填造数据。

```json
[]
```

## 人工比较

允许部分完成会话；没有人工观察时保持空数组。

```json
[]
```

## 评测结论

旧评分已经删除。本版重新执行脚本事实检查；AI 视觉评审与人工抽查未完成前保持待确认，不发布分数或排名。
