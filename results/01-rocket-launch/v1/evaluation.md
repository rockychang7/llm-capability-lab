# 01 · 火箭发射动画：评测（Prompt v1）

- **Prompt**：[prompt-v1.md](../../../prompts/01-rocket-launch/prompt-v1.md)
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
| standalone | core | auto | 单个自包含 HTML | 扫描 DOM 资源与 CSS 引用，并拦截完整运行及复发期间的资源请求；不替代休眠分支审计 |
| runtime | core | auto | 点火后能到达成功状态 | 四种固定环境真实运行，120 秒内出现可见入轨成功提示；视觉阶段另由人工验收 |
| replay | core | auto | 可复位并再次发射成功 | 每种环境成功后复位，成功提示消失，再点火跑到成功 |
| console | core | auto | 无运行异常 | 收集加载、两次全程中的 pageerror 与 console.error；排除 favicon 404 |
| viewport | core | auto | 桌面与手机无页面滚动条 | 待命、每 5 秒及成功时检查 document 与 body 的滚动范围 |
| rocket | core | ai | 可辨认的两级液体运载火箭 | 待命及分离阶段能辨认主体分段，不仅看源码 |
| liftoff | core | ai | 火箭确实离开发射台 | 完整观看点火及离台过程，不只核对文字 |
| staging | core | ai | 一级关机并与二级分离 | 观察关机、滑行、分离及脱落一级 |
| second-engine | core | ai | 二级点火继续飞行 | 观察分离后的二级尾焰 |
| fairing | core | ai | 两瓣整流罩脱落 | 观察展开、脱落及卫星显露 |
| orbit | core | ai | 到达地球轨道场景 | 观察弧形地球及轨道画面，不只看成功提示 |
| deployment | core | ai | 卫星从二级脱离 | 观察星箭分离 |
| solar-panels | core | ai | 卫星展开两块太阳能板 | 观察展开过程而非单张静态成品 |
| continuous | core | ai | 全程无明显黑屏或阶段跳断 | 两遍完整观看；记录可复现的时刻及环境 |
| mobile-controls | core | ai | 手机竖屏按钮和遥测可辨认可用 | 390×844 查看点火、复位及关键阶段；缩放预览不证明实体手机体验 |
| proportions | detail | ai | 箭长约直径 12 倍 | 待命画面测量估计比例 |
| framing | detail | ai | 待命火箭占画面高度一半以上 | 在桌面待命画面估计高度 |
| fins | detail | ai | 四片收拢栅格舵 | 画面逐个定位；不可见则注明 |
| legs | detail | ai | 四条收起着陆支腿 | 画面逐个定位 |
| nozzles | detail | ai | 至少三个钟形喷管 | 发动机舱可见部分核对数量 |
| metal | detail | ai | 圆柱明暗与金属高光 | 放大核对明暗及材质 |
| seams | detail | ai | 焊缝、面板缝与铆钉可辨 | 分别定位，缺少部分记 partial 并指明 |
| soot | detail | ai | 发动机舱烟熏痕迹 | 待命放大核对 |
| frost | detail | ai | 液氧段白霜可见 | 不以源码或改变对比度后的画面代替正常观看 |
| vapor | detail | ai | 侧面持续冒白汽并散开 | 观看待命动态 |
| fictional | detail | ai | 虚构任务名称、编号和徽标 | 核对画面，不能有真实机构标志 |
| illumination | detail | ai | 受光背光与暖色泛光灯对应 | 核对光源方向和箭体落光 |
| dawn | detail | ai | 黎明天空及云边缘光 | 待命核对天空、云与星星 |
| pad | detail | ai | 发射台和导流槽可辨 | 待命核对结构 |
| landscape | detail | ai | 远景场地和雾层可辨 | 核对地形、储罐及纵深 |
| tower | detail | ai | 勤务塔结构与障碍灯可辨 | 核对平台、爬梯与闪灯 |
| countdown | detail | ai | T-10 倒计时 | 点火后核对初始倒计时 |
| deluge | detail | ai | T-7 两侧白色水汽 | 核对时刻及两侧水幕 |
| umbilicals | detail | ai | 脐带臂依次摆开 | 核对不是同时消失 |
| ignition | detail | ai | 小火苗汇成分层火柱 | 观看点火变化及颜色层次 |
| split-flame | detail | ai | 导流槽排焰劈向两侧 | 正常帧率下观看两侧而非仅代码逻辑 |
| ground-smoke | detail | ai | 烟云贴地扩散遮住底部 | 观看点火及初段 |
| fire-light | detail | ai | 火光映亮环境并随火焰闪动 | 核对塔架、云底、台面和箭体 |
| weight | detail | ai | 前 2–3 秒缓慢抬升再加速 | 真实时钟观察位移变化 |
| turn | detail | ai | 离塔后平滑重力转弯 | 观察姿态连续性 |
| tracking | detail | ai | 跟随镜头中火箭偏下 | 核对飞行构图 |
| mach-disks | detail | ai | 低空尾焰菱形马赫盘可见 | 正常观看或放大定位，不只看绘制函数 |
| plume-altitude | detail | ai | 尾焰随高度变长变宽变淡 | 比较低空、高空及真空阶段 |
| trail | detail | ai | 低空浓密尾迹随风弯曲扩散 | 观看时序变化 |
| sky-transition | detail | ai | 穿云、天空变暗及星空出现 | 核对变化连续性 |
| max-q | detail | ai | Max-Q 云环和短暂抖动可見 | 观看该阶段，不只看遥测文字 |
| earth-details | detail | ai | 地球陆地、云、大气边缘和昼夜可辨 | 核对入轨细节；缺失部分注明 |
| final-camera | detail | ai | 收尾拉远并平静下来 | 观看部署后的镜头及动作 |
| telemetry | detail | ai | 遥测连续且与画面一致 | 核对各阶段及约 400 km / 7.7 km/s 最终值 |
| timing | detail | ai | 各段及总时长符合 Prompt | 真实计时离台、入轨、收尾；分别记录 12–15 / 40–50 / 10–20 / 60–90 秒 |
| reduced-motion | detail | ai | 减少动态时震动闪烁明显减弱 | 对照同阶段普通与减少动态画面；脚本只检查该模式能运行 |
| high-dpr | detail | ai | 高分屏画面清晰 | DPR 2 下放大核对；不能把画布尺寸当清晰度证据 |
| physical-refresh | detail | human | 实体 60/120Hz 播放速度一致 | 实体设备真实计时；无设备即 pending，虚拟时间不可替代 |

## 比较维度

| ID | 维度 | 观察重点 |
|---|---|---|
| realism | 写实与材质 | 结构比例、金属、光照与地球细节；不把信息量多等同真实 |
| effects | 火焰与烟雾 | 体积感、湍流、层次及环境联动 |
| camera | 镜头与运动 | 重量感、加速、构图及阶段连续性 |

## 浏览器证据

统一采集的真实录像与时间序列截图；派生媒体不修改原始产物。采样不能证明每一帧或实体设备性能。

```json
[
  {
    "id": "20261011071227453-claude-opus-5-5-xhigh-desktop",
    "key": "claude-opus-5-5-xhigh",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "desktop",
    "at": "2026-10-11T07:14:55.469Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-ready.png",
        "sha256": "6d7ca78db0a81b43311fd2288123ce4a5261f0e3aef22e8015c4727a8a802f56",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t0.png",
        "sha256": "711ff2029e2c1eb0b5255f44b2d452f9fba693c2039aecc12de112b616d88186",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t10.png",
        "sha256": "0307a76b92e3afe8975bd7b9e45f90878771e087858a41d0a308888ea9b3974b",
        "kind": "frame",
        "seconds": 10.25
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t20.png",
        "sha256": "e376a717edf296c2d3ccf4b25a1a8fcd566f0a64cf27072ab3665c47b5ac797f",
        "kind": "frame",
        "seconds": 20.03
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t30.png",
        "sha256": "7ffdae57d1d2983ab789c821cb6d429849e0352deff8758523a13324f2bf0d80",
        "kind": "frame",
        "seconds": 30.03
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t40.png",
        "sha256": "19f8af01a031cd178a1534eed4e262685f73d19713c2531d12a8822f31a94d25",
        "kind": "frame",
        "seconds": 40.31
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t50.png",
        "sha256": "c088b80541bc51080877802ea32972d18b23c3c44c20adda634e1f098d07fdcc",
        "kind": "frame",
        "seconds": 50.11
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t60.png",
        "sha256": "0cd9b27cd1145b5aadfb9d22f210fb0033be3687d6e8b2fb204b45eed20b77ec",
        "kind": "frame",
        "seconds": 60.27
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-complete.png",
        "sha256": "ac9176c42909be7744dfa8456c9a8ff01bbe4b0b1a3882a7f3d2ea214049094a",
        "kind": "frame",
        "seconds": 69.27
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-timeline.webm",
        "sha256": "10645287428c395d217a4e6c1abf2014f6badf66acd815df74c604bda5857741",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-xhigh-mobile",
    "key": "claude-opus-5-5-xhigh",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "mobile",
    "at": "2026-10-11T07:14:55.469Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-ready.png",
        "sha256": "4af5c83d951774b8170a8c344c4c600479c5a2b43b5c50741e27d9724a9bd36e",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t0.png",
        "sha256": "4ebab99a8119daa5ba961695ad39fe3332e399a0c955c160214c7ec955de7ce1",
        "kind": "frame",
        "seconds": 0.01
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t10.png",
        "sha256": "474bb813b8b359ee849dec8ac401d07a74e462bb1f543c942a150fc07577d035",
        "kind": "frame",
        "seconds": 10.26
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t20.png",
        "sha256": "5b4be5b52dfd68a69262c665ad6e5e677f13684ce32270bb24b101801165d6cd",
        "kind": "frame",
        "seconds": 20.03
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t30.png",
        "sha256": "6e824eb318eb04e0a2aff7c500640312efb512df657c33e79dd32fc7e8f9f617",
        "kind": "frame",
        "seconds": 30.04
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t40.png",
        "sha256": "bd3b9482945dcb6fac57fedad1b9b8a02525cec31372f50e3d6a275b9e4c199d",
        "kind": "frame",
        "seconds": 40.31
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t50.png",
        "sha256": "6cb4ced5f1daa450f93658a771eed29cae22fc7d11136ed044c6075ffc0b81f8",
        "kind": "frame",
        "seconds": 50.11
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t60.png",
        "sha256": "33e8399ee5d42ec92e1dcea0ee74c4320ac93c5e30e064b92c39600d33128d4c",
        "kind": "frame",
        "seconds": 60.27
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-complete.png",
        "sha256": "d873ad524c608aac61996fc6d6669f0bb7ce3a09c976d768029cd3d44ef0df7a",
        "kind": "frame",
        "seconds": 69.27
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-timeline.webm",
        "sha256": "f18ab6c5b8294ea99255205eeba143fef84439ef1ccc5ae54846b21350b8cd5f",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-xhigh-dpr2",
    "key": "claude-opus-5-5-xhigh",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "dpr2",
    "at": "2026-10-11T07:14:55.469Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-ready.png",
        "sha256": "8103c23f081a538d7a28b28883c4ece0737b2ef9c5d8b31af2d9e025cec915f8",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-complete.png",
        "sha256": "ea8caffcb77e63195ef28eb823fabecae0b19b0c95565e92088382fa720d2169",
        "kind": "frame",
        "seconds": 69.28
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-xhigh-reduced",
    "key": "claude-opus-5-5-xhigh",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "reduced",
    "at": "2026-10-11T07:14:55.469Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-ready.png",
        "sha256": "a5d0ddfe21bf4d63757f9338e90f68fc065230037d32c3d2dd8e7423c3c7027d",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-complete.png",
        "sha256": "1359237fe2ba9528e9f4902e2a5f92b1d085498f504fb4ffd7d1fc014449d0a3",
        "kind": "frame",
        "seconds": 67.99
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-high-desktop",
    "key": "claude-opus-5-5-high",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "desktop",
    "at": "2026-10-11T07:17:38.291Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-ready.png",
        "sha256": "1fb6353c7f1ba81ceac28e8788f11d94cf40601d959f001cd712db30dfec23e8",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t0.png",
        "sha256": "efa375e31673ded12a1ff9a6d6eba84661b85d8fc484758b4d02ab4fbfd070d8",
        "kind": "frame",
        "seconds": 0.01
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t10.png",
        "sha256": "ed959c4dae32b6d8aa1ece831afc027a86445470fddb4f20e1e5c1195d76603e",
        "kind": "frame",
        "seconds": 10.2
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t20.png",
        "sha256": "aa5b32fb82534b477dee557fb4a4a8b401724896da38679e0821fdab4437d27c",
        "kind": "frame",
        "seconds": 20.2
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t30.png",
        "sha256": "2a4aa483f6e326ca5231d99cc7a038409d6d59f21e45947997adb74871f1fd38",
        "kind": "frame",
        "seconds": 30.15
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t40.png",
        "sha256": "c0540e0160cd23b2fab69b3ab97bb12c09c63440e108d7152b4098c1e16f4c5a",
        "kind": "frame",
        "seconds": 40.04
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t50.png",
        "sha256": "68541177084a52e6be3044954d8a140bed4ac5af4915ce96313beaf1f61c15b3",
        "kind": "frame",
        "seconds": 50.29
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t60.png",
        "sha256": "ccf07b23a5880e6d3d807e7ba5f0e0ae006e074ec0487d18202fcc5e122ed234",
        "kind": "frame",
        "seconds": 60.08
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t70.png",
        "sha256": "c930d4eec16775dc8f71b2e875afe91b9000b59dcf6ac700b9258fd706a2ec3e",
        "kind": "frame",
        "seconds": 70.3
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-complete.png",
        "sha256": "f49bfd7da5852387c004f4dc3c52ea8b8b1a2c7c1d262ba7fcb4eefce5b5980d",
        "kind": "frame",
        "seconds": 76.96
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-timeline.webm",
        "sha256": "5f7292eb3b76876fb7c2fcaec6014c067cafe900ff220ff1a4706e17abfc37f2",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-high-mobile",
    "key": "claude-opus-5-5-high",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "mobile",
    "at": "2026-10-11T07:17:38.291Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-ready.png",
        "sha256": "02fea8c9c77998f0e77612ccaaf61bad0d62d846de8fd4e9d0ee55b53d70a31d",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t0.png",
        "sha256": "31dcee73a03f729923d9d1e190405858253d629314536620b5bad2bd09f3b045",
        "kind": "frame",
        "seconds": 0.01
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t10.png",
        "sha256": "c87ce0152c15c196929a60263af2797d4621a3e53ec64aecadcaf21f814d408a",
        "kind": "frame",
        "seconds": 10.18
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t20.png",
        "sha256": "bf76b33a1084e10da671ab57e5b3a22196d687fe8017b0b1e5f463868e334043",
        "kind": "frame",
        "seconds": 20.17
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t30.png",
        "sha256": "7cda0966e8a5c287cac09691c0a330e0de2bf80f02e5315ea56597f44830b617",
        "kind": "frame",
        "seconds": 30.13
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t40.png",
        "sha256": "ae47f3113b4cbb177ee966246eb530dffea28b68baeb1d25ddd583b3163d5ae3",
        "kind": "frame",
        "seconds": 40.02
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t50.png",
        "sha256": "274a772ff58cd23c17dd6ee979c8163a822fe5fa5f1fe3bf5c9ea0eb6296113d",
        "kind": "frame",
        "seconds": 50.27
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t60.png",
        "sha256": "9590dae1f7cf6a40fb739c9e354a2553f0be5e4bc77454a45a14e692942a680a",
        "kind": "frame",
        "seconds": 60.05
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t70.png",
        "sha256": "549f3c563a94160d3e1d36430e4cdcd287cfd8eb194b16109e3588b272e25773",
        "kind": "frame",
        "seconds": 70.27
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-complete.png",
        "sha256": "dcf0be971b1f0baac2198f83b0bd9e4f33e5df4c24908064ab50b88db9c8dc42",
        "kind": "frame",
        "seconds": 76.94
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-timeline.webm",
        "sha256": "b88e6d8a46eb98f6c7ad3f0d46681fe446119facea8a1e31335fb06235c72988",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-high-dpr2",
    "key": "claude-opus-5-5-high",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "dpr2",
    "at": "2026-10-11T07:17:38.291Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-ready.png",
        "sha256": "b2411764f71f52c8366e431bfd6ba4a45a9f56316cfb580ce74f49a3a128f26d",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-complete.png",
        "sha256": "2544c0b5924e147ac6f2113c91e3de04c06443cbae79407ff492569a86eca7e4",
        "kind": "frame",
        "seconds": 76.91
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-claude-opus-5-5-high-reduced",
    "key": "claude-opus-5-5-high",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "reduced",
    "at": "2026-10-11T07:17:38.291Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-ready.png",
        "sha256": "002bd33fe83eb84b781692a28d05b15b30b9c8df44042607771bba3bdd853208",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-complete.png",
        "sha256": "4d0787c4d98ee09a8fc840ce22ef54b3bfd99dca1b8764e65bf6251b4dd0fb0f",
        "kind": "frame",
        "seconds": 76.95
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-5-6-sol-xhigh-desktop",
    "key": "gpt-5-6-sol-xhigh",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "desktop",
    "at": "2026-10-11T07:20:15.812Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-ready.png",
        "sha256": "eeff48700d3ea1dead5324a69b7ca6e7b790dc0bacb0a14873bf19af0b1e6fcd",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t0.png",
        "sha256": "ffefb8bce452bbb8fee4fcaa4f8700c6b9d853848bb635ee0f3f96cc66b8ea2f",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t10.png",
        "sha256": "b79e45b66858927bd83f607b3487406469a6b3647c9227d81f3f94e2a831cdf9",
        "kind": "frame",
        "seconds": 10.16
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t20.png",
        "sha256": "5b42272b5c28c3bd65aee7e06e916ea1b07715595ed93fc160f859ea008407d6",
        "kind": "frame",
        "seconds": 20.13
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t30.png",
        "sha256": "2a949d628df080eddcec978e14e8c05a42395dffc48c4961d0092894e45c88ea",
        "kind": "frame",
        "seconds": 30.1
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t40.png",
        "sha256": "a1d9665e8977b47b9d6caa4b0093d5d31bf54792950c104953a934772bbec606",
        "kind": "frame",
        "seconds": 40.16
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t50.png",
        "sha256": "e674844a21f03738871fcbc17a472dc627a24e95cbf632bfd7e5590280b7b7be",
        "kind": "frame",
        "seconds": 50.13
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t60.png",
        "sha256": "191689f11dd8434fd6808ab519f3348adced17f4af057557d628488bbb06a585",
        "kind": "frame",
        "seconds": 60.16
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t70.png",
        "sha256": "a4e401422aeafb11a4064d142379ea614706963f0cb38defc28305a1ea8d0316",
        "kind": "frame",
        "seconds": 70.24
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-complete.png",
        "sha256": "5bc7f9b7b57fcd43bd53eec3d0d4f101d90d15bb52d945728fac34a37dda357c",
        "kind": "frame",
        "seconds": 74.69
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-timeline.webm",
        "sha256": "6a1cde569ac5235b9b040564e6aa22323c22a2183893107279d4b826b046c330",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-5-6-sol-xhigh-mobile",
    "key": "gpt-5-6-sol-xhigh",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "mobile",
    "at": "2026-10-11T07:20:15.812Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-ready.png",
        "sha256": "74d9d40a78caafe9bc54a3e947d42402c09aa1a534e3e0257656db561eedb413",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t0.png",
        "sha256": "22c2e50d42eda6e812fd44ce1a97414ba6e9dfba6a77777ed5f6be12700bad96",
        "kind": "frame",
        "seconds": 0.01
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t10.png",
        "sha256": "6271e9f6ebc3bfcdba29edbef8337dba259b405a62f0d73882503246b11b8a86",
        "kind": "frame",
        "seconds": 10.18
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t20.png",
        "sha256": "e92d0f7e9addf6e3e2e54301ce29505ba902c1e70ebf80c29c3624a958f13b04",
        "kind": "frame",
        "seconds": 20.15
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t30.png",
        "sha256": "b649facdce4d54472dc40adc53f0bf2c014c4fdc477425d9a627a4f8a59e5386",
        "kind": "frame",
        "seconds": 30.11
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t40.png",
        "sha256": "3107673c1cea26c202d4ff3744149d0f027f6f6e5374167d12b27cfb74c05871",
        "kind": "frame",
        "seconds": 40.13
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t50.png",
        "sha256": "554f57fb619b093cf3919d19a4b381a7d5e50cb253ddeaa0a3ab8511b93b2915",
        "kind": "frame",
        "seconds": 50.1
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t60.png",
        "sha256": "cb042c2fb691f033ce684e25e15b2c461584b01eb8dfefcbb8b01aff709cb12f",
        "kind": "frame",
        "seconds": 60.25
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t70.png",
        "sha256": "2f995eb45a2f46cbce32bffa283d9e7ac395192bd5e850b35804f0bd230e36b2",
        "kind": "frame",
        "seconds": 70.25
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-complete.png",
        "sha256": "7115decc15417085370b557653522174ca27a00ca23ced1cfd6e2bad6dfd4024",
        "kind": "frame",
        "seconds": 74.71
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-timeline.webm",
        "sha256": "54ab4b36df5e71d0e8f4492642b17c06d38609da983ec289123cff29ee7cce4f",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-5-6-sol-xhigh-dpr2",
    "key": "gpt-5-6-sol-xhigh",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "dpr2",
    "at": "2026-10-11T07:20:15.812Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-ready.png",
        "sha256": "6723980d06e6e9fd8358cc2e56dd2270f0404d1ac38166835df8a0f13c26836a",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-complete.png",
        "sha256": "5413c3635474d3ec427aa3cb667c0aafa8f3b6d78bd9d0daf196f7aff9ab151d",
        "kind": "frame",
        "seconds": 74.68
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-5-6-sol-xhigh-reduced",
    "key": "gpt-5-6-sol-xhigh",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "reduced",
    "at": "2026-10-11T07:20:15.812Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-ready.png",
        "sha256": "5e6b47e04cc0cbe6c6608559aa6e1236a4229e942862a5409da68b660d88b20a",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-complete.png",
        "sha256": "a1abed6d37fab83e87da48ced550318dba2ad8db52a197e717d49a9e87315694",
        "kind": "frame",
        "seconds": 74.07
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-6-1-sol-xhigh-desktop",
    "key": "gpt-6-1-sol-xhigh",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "desktop",
    "at": "2026-10-11T07:23:00.443Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-ready.png",
        "sha256": "337bab93af155ec189242a8f7ede17eb5204745136572eca371746125e36ccc0",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t0.png",
        "sha256": "0391abff9b0aff26f1a51bbd2e068bd1a3be307da0fe92e995a8432c9d95b1f7",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t10.png",
        "sha256": "99bfb0891fc3131edec3f66915c54eb7c5a15321633c16d6c5fa76feb9877889",
        "kind": "frame",
        "seconds": 10.1
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t20.png",
        "sha256": "af67a0ef91117dae89d51a8dd768d69fd9e00dfda4b0df575df64e3f03a63343",
        "kind": "frame",
        "seconds": 20.04
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t30.png",
        "sha256": "47ebf3debd766243dfdd2b6c50580ad601049d4f1c4bceaf53135bdd6121effd",
        "kind": "frame",
        "seconds": 30.1
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t40.png",
        "sha256": "046d5061397bc93ce200284001c7b2d4fcca74726d0eb0956c255510fe5bc980",
        "kind": "frame",
        "seconds": 40.1
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t50.png",
        "sha256": "a82ed58c22ab21bae4154b4c8392e59a09317951d387fc6744d821d124ee4070",
        "kind": "frame",
        "seconds": 50.1
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t60.png",
        "sha256": "4a083af89a314d14e4c3a9cfcd29f98a4e4f0d583e4444a944b8c7034a8a30a7",
        "kind": "frame",
        "seconds": 60.28
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t70.png",
        "sha256": "e354acebf9db309d989caa87089dfa73dbb7e67188adeabc1fecc5afc3b28107",
        "kind": "frame",
        "seconds": 70.23
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-complete.png",
        "sha256": "5b56f66a7b39a7be2336bd458ae0a3b0a02938a83dedd466daf05354af25feda",
        "kind": "frame",
        "seconds": 78.68
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-timeline.webm",
        "sha256": "74287c055fc798403c2cd87487a326bf9a9bfba4eb6826f19c0a870caa346ef4",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-6-1-sol-xhigh-mobile",
    "key": "gpt-6-1-sol-xhigh",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "mobile",
    "at": "2026-10-11T07:23:00.443Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-ready.png",
        "sha256": "3f725cd8d988d9ba28cdf511976dc09a51f79ff25872e39282edde94b691ec34",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t0.png",
        "sha256": "5f6951f769e4a757d92aa415569a74ea59a5fbfdefb6cc3117a275d8ab661545",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t10.png",
        "sha256": "468237e6b93569f412bf31dc4dcf5b51a89801a061c0162c340995414667d759",
        "kind": "frame",
        "seconds": 10.07
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t20.png",
        "sha256": "9c55e21057a41381e046e7695af3a0a1ba516786644a2b35598a310bd5deeeea",
        "kind": "frame",
        "seconds": 20.02
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t30.png",
        "sha256": "2100bcc746e26ba0cf43887969fe83306b950132c87e598ea6a6bf5c1edbb219",
        "kind": "frame",
        "seconds": 30.03
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t40.png",
        "sha256": "9e0005b9d6be1cd350539a0f96150cbb84e2e7afad651586f77229c2652d224a",
        "kind": "frame",
        "seconds": 40.23
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t50.png",
        "sha256": "241852280fbfe3269da1906356111dd4b2ac8103242191dde3e6d13be277de31",
        "kind": "frame",
        "seconds": 50.16
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t60.png",
        "sha256": "dfd2e7c527a83f64e4034e306b4d22364c9223c5ac94496e3b0044944f6bd530",
        "kind": "frame",
        "seconds": 60.06
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t70.png",
        "sha256": "b5cecc3f8748d1d3d4340b0429bad37a7bfe60332d5730c5728e859d8e08867d",
        "kind": "frame",
        "seconds": 70.21
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-complete.png",
        "sha256": "abe6b77281bbcd63e191631fc2abc40219079bdec627d95f2219643499ab7781",
        "kind": "frame",
        "seconds": 78.66
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-timeline.webm",
        "sha256": "cb7336612c4beb5fb4a31be9a40ade2c5081f3cb4aff165eb081b584d778122e",
        "kind": "video"
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-6-1-sol-xhigh-dpr2",
    "key": "gpt-6-1-sol-xhigh",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "dpr2",
    "at": "2026-10-11T07:23:00.443Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-ready.png",
        "sha256": "948245301bb7c36961edd40b47cacf5da558e5b40a9ceb50766d5706361cbb72",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-complete.png",
        "sha256": "f74c23dd121704951606debe932f878764647b2009bd651ab3e6e543805814bc",
        "kind": "frame",
        "seconds": 78.67
      }
    ],
    "harnessError": null
  },
  {
    "id": "20261011071227453-gpt-6-1-sol-xhigh-reduced",
    "key": "gpt-6-1-sol-xhigh",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "viewport": "reduced",
    "at": "2026-10-11T07:23:00.443Z",
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
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-ready.png",
        "sha256": "147ed7ccc440c154f93a632e2dcaf8ffd2429c06acd0d4271a8d4f6fbc35c9e3",
        "kind": "frame",
        "seconds": 0
      },
      {
        "path": "assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-complete.png",
        "sha256": "c423aab3c3e93e8c207250deec92cccb3f3897b73b1c631f8fc298330eb786b6",
        "kind": "frame",
        "seconds": 77.14
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
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:14:55.470Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.27,\"samples\":[0,5.26,10.25,15.09,20.03,25.06,30.03,35.04,40.31,45.12,50.11,55.26,60.27,65.19,69.27]},\"second\":{\"success\":true,\"seconds\":69.21,\"samples\":[0,5.28,10.24,15.19,20.2,25.21,30.21,35.24,40.27,45.25,50.24,55.22,60.19,65.15,69.21]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-ready.png\",\"sha256\":\"6d7ca78db0a81b43311fd2288123ce4a5261f0e3aef22e8015c4727a8a802f56\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t0.png\",\"sha256\":\"711ff2029e2c1eb0b5255f44b2d452f9fba693c2039aecc12de112b616d88186\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t10.png\",\"sha256\":\"0307a76b92e3afe8975bd7b9e45f90878771e087858a41d0a308888ea9b3974b\",\"kind\":\"frame\",\"seconds\":10.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t20.png\",\"sha256\":\"e376a717edf296c2d3ccf4b25a1a8fcd566f0a64cf27072ab3665c47b5ac797f\",\"kind\":\"frame\",\"seconds\":20.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t30.png\",\"sha256\":\"7ffdae57d1d2983ab789c821cb6d429849e0352deff8758523a13324f2bf0d80\",\"kind\":\"frame\",\"seconds\":30.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t40.png\",\"sha256\":\"19f8af01a031cd178a1534eed4e262685f73d19713c2531d12a8822f31a94d25\",\"kind\":\"frame\",\"seconds\":40.31},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t50.png\",\"sha256\":\"c088b80541bc51080877802ea32972d18b23c3c44c20adda634e1f098d07fdcc\",\"kind\":\"frame\",\"seconds\":50.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t60.png\",\"sha256\":\"0cd9b27cd1145b5aadfb9d22f210fb0033be3687d6e8b2fb204b45eed20b77ec\",\"kind\":\"frame\",\"seconds\":60.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-complete.png\",\"sha256\":\"ac9176c42909be7744dfa8456c9a8ff01bbe4b0b1a3882a7f3d2ea214049094a\",\"kind\":\"frame\",\"seconds\":69.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-timeline.webm\",\"sha256\":\"10645287428c395d217a4e6c1abf2014f6badf66acd815df74c604bda5857741\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.27,\"samples\":[0.01,5.26,10.26,15.09,20.03,25.07,30.04,35.04,40.31,45.13,50.11,55.27,60.27,65.19,69.27]},\"second\":{\"success\":true,\"seconds\":69.16,\"samples\":[0,5.26,10.2,15.14,20.15,25.16,30.17,35.19,40.22,45.2,50.2,55.17,60.14,65.1,69.16]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-ready.png\",\"sha256\":\"4af5c83d951774b8170a8c344c4c600479c5a2b43b5c50741e27d9724a9bd36e\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t0.png\",\"sha256\":\"4ebab99a8119daa5ba961695ad39fe3332e399a0c955c160214c7ec955de7ce1\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t10.png\",\"sha256\":\"474bb813b8b359ee849dec8ac401d07a74e462bb1f543c942a150fc07577d035\",\"kind\":\"frame\",\"seconds\":10.26},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t20.png\",\"sha256\":\"5b4be5b52dfd68a69262c665ad6e5e677f13684ce32270bb24b101801165d6cd\",\"kind\":\"frame\",\"seconds\":20.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t30.png\",\"sha256\":\"6e824eb318eb04e0a2aff7c500640312efb512df657c33e79dd32fc7e8f9f617\",\"kind\":\"frame\",\"seconds\":30.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t40.png\",\"sha256\":\"bd3b9482945dcb6fac57fedad1b9b8a02525cec31372f50e3d6a275b9e4c199d\",\"kind\":\"frame\",\"seconds\":40.31},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t50.png\",\"sha256\":\"6cb4ced5f1daa450f93658a771eed29cae22fc7d11136ed044c6075ffc0b81f8\",\"kind\":\"frame\",\"seconds\":50.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t60.png\",\"sha256\":\"33e8399ee5d42ec92e1dcea0ee74c4320ac93c5e30e064b92c39600d33128d4c\",\"kind\":\"frame\",\"seconds\":60.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-complete.png\",\"sha256\":\"d873ad524c608aac61996fc6d6669f0bb7ce3a09c976d768029cd3d44ef0df7a\",\"kind\":\"frame\",\"seconds\":69.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-timeline.webm\",\"sha256\":\"f18ab6c5b8294ea99255205eeba143fef84439ef1ccc5ae54846b21350b8cd5f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.28,\"samples\":[0.01,5.23,10.18,15.08,20.03,25.02,30.04,35.05,40.31,45.07,50.04,55.27,60.27,65.19,69.28]},\"second\":{\"success\":true,\"seconds\":69.13,\"samples\":[0,5.26,10.22,15.18,20.18,25.19,30.2,35.22,40.25,45.23,50.2,55.15,60.14,65.09,69.13]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-ready.png\",\"sha256\":\"8103c23f081a538d7a28b28883c4ece0737b2ef9c5d8b31af2d9e025cec915f8\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-complete.png\",\"sha256\":\"ea8caffcb77e63195ef28eb823fabecae0b19b0c95565e92088382fa720d2169\",\"kind\":\"frame\",\"seconds\":69.28}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":67.99,\"samples\":[0,5.22,10.18,15.04,20.67,25.02,30.03,35.04,40.31,45.03,50.58,55.26,60.27,65.19,67.99]},\"second\":{\"success\":true,\"seconds\":68.58,\"samples\":[0.01,5.3,10.26,15.22,20.19,25.22,30.21,35.22,40.24,45.26,50.26,55.24,60.23,65.17,68.58]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-ready.png\",\"sha256\":\"a5d0ddfe21bf4d63757f9338e90f68fc065230037d32c3d2dd8e7423c3c7027d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-complete.png\",\"sha256\":\"1359237fe2ba9528e9f4902e2a5f92b1d085498f504fb4ffd7d1fc014449d0a3\",\"kind\":\"frame\",\"seconds\":67.99}]}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:14:55.470Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.27,\"samples\":[0,5.26,10.25,15.09,20.03,25.06,30.03,35.04,40.31,45.12,50.11,55.26,60.27,65.19,69.27]},\"second\":{\"success\":true,\"seconds\":69.21,\"samples\":[0,5.28,10.24,15.19,20.2,25.21,30.21,35.24,40.27,45.25,50.24,55.22,60.19,65.15,69.21]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-ready.png\",\"sha256\":\"6d7ca78db0a81b43311fd2288123ce4a5261f0e3aef22e8015c4727a8a802f56\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t0.png\",\"sha256\":\"711ff2029e2c1eb0b5255f44b2d452f9fba693c2039aecc12de112b616d88186\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t10.png\",\"sha256\":\"0307a76b92e3afe8975bd7b9e45f90878771e087858a41d0a308888ea9b3974b\",\"kind\":\"frame\",\"seconds\":10.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t20.png\",\"sha256\":\"e376a717edf296c2d3ccf4b25a1a8fcd566f0a64cf27072ab3665c47b5ac797f\",\"kind\":\"frame\",\"seconds\":20.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t30.png\",\"sha256\":\"7ffdae57d1d2983ab789c821cb6d429849e0352deff8758523a13324f2bf0d80\",\"kind\":\"frame\",\"seconds\":30.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t40.png\",\"sha256\":\"19f8af01a031cd178a1534eed4e262685f73d19713c2531d12a8822f31a94d25\",\"kind\":\"frame\",\"seconds\":40.31},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t50.png\",\"sha256\":\"c088b80541bc51080877802ea32972d18b23c3c44c20adda634e1f098d07fdcc\",\"kind\":\"frame\",\"seconds\":50.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t60.png\",\"sha256\":\"0cd9b27cd1145b5aadfb9d22f210fb0033be3687d6e8b2fb204b45eed20b77ec\",\"kind\":\"frame\",\"seconds\":60.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-complete.png\",\"sha256\":\"ac9176c42909be7744dfa8456c9a8ff01bbe4b0b1a3882a7f3d2ea214049094a\",\"kind\":\"frame\",\"seconds\":69.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-timeline.webm\",\"sha256\":\"10645287428c395d217a4e6c1abf2014f6badf66acd815df74c604bda5857741\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.27,\"samples\":[0.01,5.26,10.26,15.09,20.03,25.07,30.04,35.04,40.31,45.13,50.11,55.27,60.27,65.19,69.27]},\"second\":{\"success\":true,\"seconds\":69.16,\"samples\":[0,5.26,10.2,15.14,20.15,25.16,30.17,35.19,40.22,45.2,50.2,55.17,60.14,65.1,69.16]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-ready.png\",\"sha256\":\"4af5c83d951774b8170a8c344c4c600479c5a2b43b5c50741e27d9724a9bd36e\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t0.png\",\"sha256\":\"4ebab99a8119daa5ba961695ad39fe3332e399a0c955c160214c7ec955de7ce1\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t10.png\",\"sha256\":\"474bb813b8b359ee849dec8ac401d07a74e462bb1f543c942a150fc07577d035\",\"kind\":\"frame\",\"seconds\":10.26},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t20.png\",\"sha256\":\"5b4be5b52dfd68a69262c665ad6e5e677f13684ce32270bb24b101801165d6cd\",\"kind\":\"frame\",\"seconds\":20.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t30.png\",\"sha256\":\"6e824eb318eb04e0a2aff7c500640312efb512df657c33e79dd32fc7e8f9f617\",\"kind\":\"frame\",\"seconds\":30.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t40.png\",\"sha256\":\"bd3b9482945dcb6fac57fedad1b9b8a02525cec31372f50e3d6a275b9e4c199d\",\"kind\":\"frame\",\"seconds\":40.31},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t50.png\",\"sha256\":\"6cb4ced5f1daa450f93658a771eed29cae22fc7d11136ed044c6075ffc0b81f8\",\"kind\":\"frame\",\"seconds\":50.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t60.png\",\"sha256\":\"33e8399ee5d42ec92e1dcea0ee74c4320ac93c5e30e064b92c39600d33128d4c\",\"kind\":\"frame\",\"seconds\":60.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-complete.png\",\"sha256\":\"d873ad524c608aac61996fc6d6669f0bb7ce3a09c976d768029cd3d44ef0df7a\",\"kind\":\"frame\",\"seconds\":69.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-timeline.webm\",\"sha256\":\"f18ab6c5b8294ea99255205eeba143fef84439ef1ccc5ae54846b21350b8cd5f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.28,\"samples\":[0.01,5.23,10.18,15.08,20.03,25.02,30.04,35.05,40.31,45.07,50.04,55.27,60.27,65.19,69.28]},\"second\":{\"success\":true,\"seconds\":69.13,\"samples\":[0,5.26,10.22,15.18,20.18,25.19,30.2,35.22,40.25,45.23,50.2,55.15,60.14,65.09,69.13]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-ready.png\",\"sha256\":\"8103c23f081a538d7a28b28883c4ece0737b2ef9c5d8b31af2d9e025cec915f8\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-complete.png\",\"sha256\":\"ea8caffcb77e63195ef28eb823fabecae0b19b0c95565e92088382fa720d2169\",\"kind\":\"frame\",\"seconds\":69.28}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":67.99,\"samples\":[0,5.22,10.18,15.04,20.67,25.02,30.03,35.04,40.31,45.03,50.58,55.26,60.27,65.19,67.99]},\"second\":{\"success\":true,\"seconds\":68.58,\"samples\":[0.01,5.3,10.26,15.22,20.19,25.22,30.21,35.22,40.24,45.26,50.26,55.24,60.23,65.17,68.58]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-ready.png\",\"sha256\":\"a5d0ddfe21bf4d63757f9338e90f68fc065230037d32c3d2dd8e7423c3c7027d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-complete.png\",\"sha256\":\"1359237fe2ba9528e9f4902e2a5f92b1d085498f504fb4ffd7d1fc014449d0a3\",\"kind\":\"frame\",\"seconds\":67.99}]}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:14:55.471Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.27,\"samples\":[0,5.26,10.25,15.09,20.03,25.06,30.03,35.04,40.31,45.12,50.11,55.26,60.27,65.19,69.27]},\"second\":{\"success\":true,\"seconds\":69.21,\"samples\":[0,5.28,10.24,15.19,20.2,25.21,30.21,35.24,40.27,45.25,50.24,55.22,60.19,65.15,69.21]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-ready.png\",\"sha256\":\"6d7ca78db0a81b43311fd2288123ce4a5261f0e3aef22e8015c4727a8a802f56\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t0.png\",\"sha256\":\"711ff2029e2c1eb0b5255f44b2d452f9fba693c2039aecc12de112b616d88186\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t10.png\",\"sha256\":\"0307a76b92e3afe8975bd7b9e45f90878771e087858a41d0a308888ea9b3974b\",\"kind\":\"frame\",\"seconds\":10.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t20.png\",\"sha256\":\"e376a717edf296c2d3ccf4b25a1a8fcd566f0a64cf27072ab3665c47b5ac797f\",\"kind\":\"frame\",\"seconds\":20.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t30.png\",\"sha256\":\"7ffdae57d1d2983ab789c821cb6d429849e0352deff8758523a13324f2bf0d80\",\"kind\":\"frame\",\"seconds\":30.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t40.png\",\"sha256\":\"19f8af01a031cd178a1534eed4e262685f73d19713c2531d12a8822f31a94d25\",\"kind\":\"frame\",\"seconds\":40.31},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t50.png\",\"sha256\":\"c088b80541bc51080877802ea32972d18b23c3c44c20adda634e1f098d07fdcc\",\"kind\":\"frame\",\"seconds\":50.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t60.png\",\"sha256\":\"0cd9b27cd1145b5aadfb9d22f210fb0033be3687d6e8b2fb204b45eed20b77ec\",\"kind\":\"frame\",\"seconds\":60.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-complete.png\",\"sha256\":\"ac9176c42909be7744dfa8456c9a8ff01bbe4b0b1a3882a7f3d2ea214049094a\",\"kind\":\"frame\",\"seconds\":69.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-timeline.webm\",\"sha256\":\"10645287428c395d217a4e6c1abf2014f6badf66acd815df74c604bda5857741\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.27,\"samples\":[0.01,5.26,10.26,15.09,20.03,25.07,30.04,35.04,40.31,45.13,50.11,55.27,60.27,65.19,69.27]},\"second\":{\"success\":true,\"seconds\":69.16,\"samples\":[0,5.26,10.2,15.14,20.15,25.16,30.17,35.19,40.22,45.2,50.2,55.17,60.14,65.1,69.16]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-ready.png\",\"sha256\":\"4af5c83d951774b8170a8c344c4c600479c5a2b43b5c50741e27d9724a9bd36e\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t0.png\",\"sha256\":\"4ebab99a8119daa5ba961695ad39fe3332e399a0c955c160214c7ec955de7ce1\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t10.png\",\"sha256\":\"474bb813b8b359ee849dec8ac401d07a74e462bb1f543c942a150fc07577d035\",\"kind\":\"frame\",\"seconds\":10.26},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t20.png\",\"sha256\":\"5b4be5b52dfd68a69262c665ad6e5e677f13684ce32270bb24b101801165d6cd\",\"kind\":\"frame\",\"seconds\":20.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t30.png\",\"sha256\":\"6e824eb318eb04e0a2aff7c500640312efb512df657c33e79dd32fc7e8f9f617\",\"kind\":\"frame\",\"seconds\":30.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t40.png\",\"sha256\":\"bd3b9482945dcb6fac57fedad1b9b8a02525cec31372f50e3d6a275b9e4c199d\",\"kind\":\"frame\",\"seconds\":40.31},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t50.png\",\"sha256\":\"6cb4ced5f1daa450f93658a771eed29cae22fc7d11136ed044c6075ffc0b81f8\",\"kind\":\"frame\",\"seconds\":50.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t60.png\",\"sha256\":\"33e8399ee5d42ec92e1dcea0ee74c4320ac93c5e30e064b92c39600d33128d4c\",\"kind\":\"frame\",\"seconds\":60.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-complete.png\",\"sha256\":\"d873ad524c608aac61996fc6d6669f0bb7ce3a09c976d768029cd3d44ef0df7a\",\"kind\":\"frame\",\"seconds\":69.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-timeline.webm\",\"sha256\":\"f18ab6c5b8294ea99255205eeba143fef84439ef1ccc5ae54846b21350b8cd5f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.28,\"samples\":[0.01,5.23,10.18,15.08,20.03,25.02,30.04,35.05,40.31,45.07,50.04,55.27,60.27,65.19,69.28]},\"second\":{\"success\":true,\"seconds\":69.13,\"samples\":[0,5.26,10.22,15.18,20.18,25.19,30.2,35.22,40.25,45.23,50.2,55.15,60.14,65.09,69.13]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-ready.png\",\"sha256\":\"8103c23f081a538d7a28b28883c4ece0737b2ef9c5d8b31af2d9e025cec915f8\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-complete.png\",\"sha256\":\"ea8caffcb77e63195ef28eb823fabecae0b19b0c95565e92088382fa720d2169\",\"kind\":\"frame\",\"seconds\":69.28}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":67.99,\"samples\":[0,5.22,10.18,15.04,20.67,25.02,30.03,35.04,40.31,45.03,50.58,55.26,60.27,65.19,67.99]},\"second\":{\"success\":true,\"seconds\":68.58,\"samples\":[0.01,5.3,10.26,15.22,20.19,25.22,30.21,35.22,40.24,45.26,50.26,55.24,60.23,65.17,68.58]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-ready.png\",\"sha256\":\"a5d0ddfe21bf4d63757f9338e90f68fc065230037d32c3d2dd8e7423c3c7027d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-complete.png\",\"sha256\":\"1359237fe2ba9528e9f4902e2a5f92b1d085498f504fb4ffd7d1fc014449d0a3\",\"kind\":\"frame\",\"seconds\":67.99}]}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:14:55.471Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.27,\"samples\":[0,5.26,10.25,15.09,20.03,25.06,30.03,35.04,40.31,45.12,50.11,55.26,60.27,65.19,69.27]},\"second\":{\"success\":true,\"seconds\":69.21,\"samples\":[0,5.28,10.24,15.19,20.2,25.21,30.21,35.24,40.27,45.25,50.24,55.22,60.19,65.15,69.21]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-ready.png\",\"sha256\":\"6d7ca78db0a81b43311fd2288123ce4a5261f0e3aef22e8015c4727a8a802f56\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t0.png\",\"sha256\":\"711ff2029e2c1eb0b5255f44b2d452f9fba693c2039aecc12de112b616d88186\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t10.png\",\"sha256\":\"0307a76b92e3afe8975bd7b9e45f90878771e087858a41d0a308888ea9b3974b\",\"kind\":\"frame\",\"seconds\":10.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t20.png\",\"sha256\":\"e376a717edf296c2d3ccf4b25a1a8fcd566f0a64cf27072ab3665c47b5ac797f\",\"kind\":\"frame\",\"seconds\":20.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t30.png\",\"sha256\":\"7ffdae57d1d2983ab789c821cb6d429849e0352deff8758523a13324f2bf0d80\",\"kind\":\"frame\",\"seconds\":30.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t40.png\",\"sha256\":\"19f8af01a031cd178a1534eed4e262685f73d19713c2531d12a8822f31a94d25\",\"kind\":\"frame\",\"seconds\":40.31},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t50.png\",\"sha256\":\"c088b80541bc51080877802ea32972d18b23c3c44c20adda634e1f098d07fdcc\",\"kind\":\"frame\",\"seconds\":50.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t60.png\",\"sha256\":\"0cd9b27cd1145b5aadfb9d22f210fb0033be3687d6e8b2fb204b45eed20b77ec\",\"kind\":\"frame\",\"seconds\":60.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-complete.png\",\"sha256\":\"ac9176c42909be7744dfa8456c9a8ff01bbe4b0b1a3882a7f3d2ea214049094a\",\"kind\":\"frame\",\"seconds\":69.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-timeline.webm\",\"sha256\":\"10645287428c395d217a4e6c1abf2014f6badf66acd815df74c604bda5857741\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.27,\"samples\":[0.01,5.26,10.26,15.09,20.03,25.07,30.04,35.04,40.31,45.13,50.11,55.27,60.27,65.19,69.27]},\"second\":{\"success\":true,\"seconds\":69.16,\"samples\":[0,5.26,10.2,15.14,20.15,25.16,30.17,35.19,40.22,45.2,50.2,55.17,60.14,65.1,69.16]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-ready.png\",\"sha256\":\"4af5c83d951774b8170a8c344c4c600479c5a2b43b5c50741e27d9724a9bd36e\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t0.png\",\"sha256\":\"4ebab99a8119daa5ba961695ad39fe3332e399a0c955c160214c7ec955de7ce1\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t10.png\",\"sha256\":\"474bb813b8b359ee849dec8ac401d07a74e462bb1f543c942a150fc07577d035\",\"kind\":\"frame\",\"seconds\":10.26},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t20.png\",\"sha256\":\"5b4be5b52dfd68a69262c665ad6e5e677f13684ce32270bb24b101801165d6cd\",\"kind\":\"frame\",\"seconds\":20.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t30.png\",\"sha256\":\"6e824eb318eb04e0a2aff7c500640312efb512df657c33e79dd32fc7e8f9f617\",\"kind\":\"frame\",\"seconds\":30.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t40.png\",\"sha256\":\"bd3b9482945dcb6fac57fedad1b9b8a02525cec31372f50e3d6a275b9e4c199d\",\"kind\":\"frame\",\"seconds\":40.31},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t50.png\",\"sha256\":\"6cb4ced5f1daa450f93658a771eed29cae22fc7d11136ed044c6075ffc0b81f8\",\"kind\":\"frame\",\"seconds\":50.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t60.png\",\"sha256\":\"33e8399ee5d42ec92e1dcea0ee74c4320ac93c5e30e064b92c39600d33128d4c\",\"kind\":\"frame\",\"seconds\":60.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-complete.png\",\"sha256\":\"d873ad524c608aac61996fc6d6669f0bb7ce3a09c976d768029cd3d44ef0df7a\",\"kind\":\"frame\",\"seconds\":69.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-timeline.webm\",\"sha256\":\"f18ab6c5b8294ea99255205eeba143fef84439ef1ccc5ae54846b21350b8cd5f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.28,\"samples\":[0.01,5.23,10.18,15.08,20.03,25.02,30.04,35.05,40.31,45.07,50.04,55.27,60.27,65.19,69.28]},\"second\":{\"success\":true,\"seconds\":69.13,\"samples\":[0,5.26,10.22,15.18,20.18,25.19,30.2,35.22,40.25,45.23,50.2,55.15,60.14,65.09,69.13]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-ready.png\",\"sha256\":\"8103c23f081a538d7a28b28883c4ece0737b2ef9c5d8b31af2d9e025cec915f8\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-complete.png\",\"sha256\":\"ea8caffcb77e63195ef28eb823fabecae0b19b0c95565e92088382fa720d2169\",\"kind\":\"frame\",\"seconds\":69.28}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":67.99,\"samples\":[0,5.22,10.18,15.04,20.67,25.02,30.03,35.04,40.31,45.03,50.58,55.26,60.27,65.19,67.99]},\"second\":{\"success\":true,\"seconds\":68.58,\"samples\":[0.01,5.3,10.26,15.22,20.19,25.22,30.21,35.22,40.24,45.26,50.26,55.24,60.23,65.17,68.58]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-ready.png\",\"sha256\":\"a5d0ddfe21bf4d63757f9338e90f68fc065230037d32c3d2dd8e7423c3c7027d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-complete.png\",\"sha256\":\"1359237fe2ba9528e9f4902e2a5f92b1d085498f504fb4ffd7d1fc014449d0a3\",\"kind\":\"frame\",\"seconds\":67.99}]}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:14:55.471Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.27,\"samples\":[0,5.26,10.25,15.09,20.03,25.06,30.03,35.04,40.31,45.12,50.11,55.26,60.27,65.19,69.27]},\"second\":{\"success\":true,\"seconds\":69.21,\"samples\":[0,5.28,10.24,15.19,20.2,25.21,30.21,35.24,40.27,45.25,50.24,55.22,60.19,65.15,69.21]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-ready.png\",\"sha256\":\"6d7ca78db0a81b43311fd2288123ce4a5261f0e3aef22e8015c4727a8a802f56\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t0.png\",\"sha256\":\"711ff2029e2c1eb0b5255f44b2d452f9fba693c2039aecc12de112b616d88186\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t10.png\",\"sha256\":\"0307a76b92e3afe8975bd7b9e45f90878771e087858a41d0a308888ea9b3974b\",\"kind\":\"frame\",\"seconds\":10.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t20.png\",\"sha256\":\"e376a717edf296c2d3ccf4b25a1a8fcd566f0a64cf27072ab3665c47b5ac797f\",\"kind\":\"frame\",\"seconds\":20.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t30.png\",\"sha256\":\"7ffdae57d1d2983ab789c821cb6d429849e0352deff8758523a13324f2bf0d80\",\"kind\":\"frame\",\"seconds\":30.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t40.png\",\"sha256\":\"19f8af01a031cd178a1534eed4e262685f73d19713c2531d12a8822f31a94d25\",\"kind\":\"frame\",\"seconds\":40.31},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t50.png\",\"sha256\":\"c088b80541bc51080877802ea32972d18b23c3c44c20adda634e1f098d07fdcc\",\"kind\":\"frame\",\"seconds\":50.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-t60.png\",\"sha256\":\"0cd9b27cd1145b5aadfb9d22f210fb0033be3687d6e8b2fb204b45eed20b77ec\",\"kind\":\"frame\",\"seconds\":60.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-complete.png\",\"sha256\":\"ac9176c42909be7744dfa8456c9a8ff01bbe4b0b1a3882a7f3d2ea214049094a\",\"kind\":\"frame\",\"seconds\":69.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-desktop-timeline.webm\",\"sha256\":\"10645287428c395d217a4e6c1abf2014f6badf66acd815df74c604bda5857741\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.27,\"samples\":[0.01,5.26,10.26,15.09,20.03,25.07,30.04,35.04,40.31,45.13,50.11,55.27,60.27,65.19,69.27]},\"second\":{\"success\":true,\"seconds\":69.16,\"samples\":[0,5.26,10.2,15.14,20.15,25.16,30.17,35.19,40.22,45.2,50.2,55.17,60.14,65.1,69.16]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-ready.png\",\"sha256\":\"4af5c83d951774b8170a8c344c4c600479c5a2b43b5c50741e27d9724a9bd36e\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t0.png\",\"sha256\":\"4ebab99a8119daa5ba961695ad39fe3332e399a0c955c160214c7ec955de7ce1\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t10.png\",\"sha256\":\"474bb813b8b359ee849dec8ac401d07a74e462bb1f543c942a150fc07577d035\",\"kind\":\"frame\",\"seconds\":10.26},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t20.png\",\"sha256\":\"5b4be5b52dfd68a69262c665ad6e5e677f13684ce32270bb24b101801165d6cd\",\"kind\":\"frame\",\"seconds\":20.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t30.png\",\"sha256\":\"6e824eb318eb04e0a2aff7c500640312efb512df657c33e79dd32fc7e8f9f617\",\"kind\":\"frame\",\"seconds\":30.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t40.png\",\"sha256\":\"bd3b9482945dcb6fac57fedad1b9b8a02525cec31372f50e3d6a275b9e4c199d\",\"kind\":\"frame\",\"seconds\":40.31},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t50.png\",\"sha256\":\"6cb4ced5f1daa450f93658a771eed29cae22fc7d11136ed044c6075ffc0b81f8\",\"kind\":\"frame\",\"seconds\":50.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-t60.png\",\"sha256\":\"33e8399ee5d42ec92e1dcea0ee74c4320ac93c5e30e064b92c39600d33128d4c\",\"kind\":\"frame\",\"seconds\":60.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-complete.png\",\"sha256\":\"d873ad524c608aac61996fc6d6669f0bb7ce3a09c976d768029cd3d44ef0df7a\",\"kind\":\"frame\",\"seconds\":69.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-mobile-timeline.webm\",\"sha256\":\"f18ab6c5b8294ea99255205eeba143fef84439ef1ccc5ae54846b21350b8cd5f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.28,\"samples\":[0.01,5.23,10.18,15.08,20.03,25.02,30.04,35.05,40.31,45.07,50.04,55.27,60.27,65.19,69.28]},\"second\":{\"success\":true,\"seconds\":69.13,\"samples\":[0,5.26,10.22,15.18,20.18,25.19,30.2,35.22,40.25,45.23,50.2,55.15,60.14,65.09,69.13]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-ready.png\",\"sha256\":\"8103c23f081a538d7a28b28883c4ece0737b2ef9c5d8b31af2d9e025cec915f8\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-dpr2-complete.png\",\"sha256\":\"ea8caffcb77e63195ef28eb823fabecae0b19b0c95565e92088382fa720d2169\",\"kind\":\"frame\",\"seconds\":69.28}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":67.99,\"samples\":[0,5.22,10.18,15.04,20.67,25.02,30.03,35.04,40.31,45.03,50.58,55.26,60.27,65.19,67.99]},\"second\":{\"success\":true,\"seconds\":68.58,\"samples\":[0.01,5.3,10.26,15.22,20.19,25.22,30.21,35.22,40.24,45.26,50.26,55.24,60.23,65.17,68.58]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-ready.png\",\"sha256\":\"a5d0ddfe21bf4d63757f9338e90f68fc065230037d32c3d2dd8e7423c3c7027d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-xhigh-reduced-complete.png\",\"sha256\":\"1359237fe2ba9528e9f4902e2a5f92b1d085498f504fb4ffd7d1fc014449d0a3\",\"kind\":\"frame\",\"seconds\":67.99}]}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:17:38.291Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.96,\"samples\":[0.01,5.22,10.2,15.18,20.2,25.14,30.15,35.28,40.04,45.3,50.29,55.08,60.08,65.31,70.3,75.11,76.96]},\"second\":{\"success\":true,\"seconds\":77.14,\"samples\":[0,5.31,10.06,15.12,20.32,25.19,30.29,35.06,40.14,45.21,50.23,55.21,60.25,65.24,70.25,75.26,77.14]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-ready.png\",\"sha256\":\"1fb6353c7f1ba81ceac28e8788f11d94cf40601d959f001cd712db30dfec23e8\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t0.png\",\"sha256\":\"efa375e31673ded12a1ff9a6d6eba84661b85d8fc484758b4d02ab4fbfd070d8\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t10.png\",\"sha256\":\"ed959c4dae32b6d8aa1ece831afc027a86445470fddb4f20e1e5c1195d76603e\",\"kind\":\"frame\",\"seconds\":10.2},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t20.png\",\"sha256\":\"aa5b32fb82534b477dee557fb4a4a8b401724896da38679e0821fdab4437d27c\",\"kind\":\"frame\",\"seconds\":20.2},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t30.png\",\"sha256\":\"2a4aa483f6e326ca5231d99cc7a038409d6d59f21e45947997adb74871f1fd38\",\"kind\":\"frame\",\"seconds\":30.15},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t40.png\",\"sha256\":\"c0540e0160cd23b2fab69b3ab97bb12c09c63440e108d7152b4098c1e16f4c5a\",\"kind\":\"frame\",\"seconds\":40.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t50.png\",\"sha256\":\"68541177084a52e6be3044954d8a140bed4ac5af4915ce96313beaf1f61c15b3\",\"kind\":\"frame\",\"seconds\":50.29},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t60.png\",\"sha256\":\"ccf07b23a5880e6d3d807e7ba5f0e0ae006e074ec0487d18202fcc5e122ed234\",\"kind\":\"frame\",\"seconds\":60.08},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t70.png\",\"sha256\":\"c930d4eec16775dc8f71b2e875afe91b9000b59dcf6ac700b9258fd706a2ec3e\",\"kind\":\"frame\",\"seconds\":70.3},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-complete.png\",\"sha256\":\"f49bfd7da5852387c004f4dc3c52ea8b8b1a2c7c1d262ba7fcb4eefce5b5980d\",\"kind\":\"frame\",\"seconds\":76.96},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-timeline.webm\",\"sha256\":\"5f7292eb3b76876fb7c2fcaec6014c067cafe900ff220ff1a4706e17abfc37f2\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.94,\"samples\":[0.01,5.2,10.18,15.16,20.17,25.12,30.13,35.25,40.02,45.28,50.27,55.07,60.05,65.29,70.27,75.09,76.94]},\"second\":{\"success\":true,\"seconds\":77.11,\"samples\":[0,5.01,10.04,15.09,20.19,25.29,30.29,35.03,40.11,45.18,50.2,55.18,60.23,65.21,70.22,75.23,77.11]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-ready.png\",\"sha256\":\"02fea8c9c77998f0e77612ccaaf61bad0d62d846de8fd4e9d0ee55b53d70a31d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t0.png\",\"sha256\":\"31dcee73a03f729923d9d1e190405858253d629314536620b5bad2bd09f3b045\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t10.png\",\"sha256\":\"c87ce0152c15c196929a60263af2797d4621a3e53ec64aecadcaf21f814d408a\",\"kind\":\"frame\",\"seconds\":10.18},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t20.png\",\"sha256\":\"bf76b33a1084e10da671ab57e5b3a22196d687fe8017b0b1e5f463868e334043\",\"kind\":\"frame\",\"seconds\":20.17},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t30.png\",\"sha256\":\"7cda0966e8a5c287cac09691c0a330e0de2bf80f02e5315ea56597f44830b617\",\"kind\":\"frame\",\"seconds\":30.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t40.png\",\"sha256\":\"ae47f3113b4cbb177ee966246eb530dffea28b68baeb1d25ddd583b3163d5ae3\",\"kind\":\"frame\",\"seconds\":40.02},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t50.png\",\"sha256\":\"274a772ff58cd23c17dd6ee979c8163a822fe5fa5f1fe3bf5c9ea0eb6296113d\",\"kind\":\"frame\",\"seconds\":50.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t60.png\",\"sha256\":\"9590dae1f7cf6a40fb739c9e354a2553f0be5e4bc77454a45a14e692942a680a\",\"kind\":\"frame\",\"seconds\":60.05},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t70.png\",\"sha256\":\"549f3c563a94160d3e1d36430e4cdcd287cfd8eb194b16109e3588b272e25773\",\"kind\":\"frame\",\"seconds\":70.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-complete.png\",\"sha256\":\"dcf0be971b1f0baac2198f83b0bd9e4f33e5df4c24908064ab50b88db9c8dc42\",\"kind\":\"frame\",\"seconds\":76.94},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-timeline.webm\",\"sha256\":\"b88e6d8a46eb98f6c7ad3f0d46681fe446119facea8a1e31335fb06235c72988\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.91,\"samples\":[0.01,5.14,10.15,15.12,20.14,25.31,30.1,35.22,40.47,45.25,50.23,55.02,60.02,65.2,70.17,75.05,76.91]},\"second\":{\"success\":true,\"seconds\":77.13,\"samples\":[0,5.3,10.05,15.11,20.31,25.19,30.28,35.05,40.13,45.2,50.22,55.2,60.25,65.23,70.24,75.25,77.13]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-ready.png\",\"sha256\":\"b2411764f71f52c8366e431bfd6ba4a45a9f56316cfb580ce74f49a3a128f26d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-complete.png\",\"sha256\":\"2544c0b5924e147ac6f2113c91e3de04c06443cbae79407ff492569a86eca7e4\",\"kind\":\"frame\",\"seconds\":76.91}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.95,\"samples\":[0.01,5.18,10.19,15.17,20.19,25.05,30.14,35.27,40.03,45.2,50.17,55.07,60.06,65.25,70.21,75.1,76.95]},\"second\":{\"success\":true,\"seconds\":77.16,\"samples\":[0,5.03,10.09,15.15,20.35,25.22,30.31,35.09,40.17,45.24,50.26,55.24,60.29,65.27,70.27,75.28,77.16]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-ready.png\",\"sha256\":\"002bd33fe83eb84b781692a28d05b15b30b9c8df44042607771bba3bdd853208\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-complete.png\",\"sha256\":\"4d0787c4d98ee09a8fc840ce22ef54b3bfd99dca1b8764e65bf6251b4dd0fb0f\",\"kind\":\"frame\",\"seconds\":76.95}]}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:17:38.291Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.96,\"samples\":[0.01,5.22,10.2,15.18,20.2,25.14,30.15,35.28,40.04,45.3,50.29,55.08,60.08,65.31,70.3,75.11,76.96]},\"second\":{\"success\":true,\"seconds\":77.14,\"samples\":[0,5.31,10.06,15.12,20.32,25.19,30.29,35.06,40.14,45.21,50.23,55.21,60.25,65.24,70.25,75.26,77.14]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-ready.png\",\"sha256\":\"1fb6353c7f1ba81ceac28e8788f11d94cf40601d959f001cd712db30dfec23e8\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t0.png\",\"sha256\":\"efa375e31673ded12a1ff9a6d6eba84661b85d8fc484758b4d02ab4fbfd070d8\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t10.png\",\"sha256\":\"ed959c4dae32b6d8aa1ece831afc027a86445470fddb4f20e1e5c1195d76603e\",\"kind\":\"frame\",\"seconds\":10.2},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t20.png\",\"sha256\":\"aa5b32fb82534b477dee557fb4a4a8b401724896da38679e0821fdab4437d27c\",\"kind\":\"frame\",\"seconds\":20.2},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t30.png\",\"sha256\":\"2a4aa483f6e326ca5231d99cc7a038409d6d59f21e45947997adb74871f1fd38\",\"kind\":\"frame\",\"seconds\":30.15},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t40.png\",\"sha256\":\"c0540e0160cd23b2fab69b3ab97bb12c09c63440e108d7152b4098c1e16f4c5a\",\"kind\":\"frame\",\"seconds\":40.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t50.png\",\"sha256\":\"68541177084a52e6be3044954d8a140bed4ac5af4915ce96313beaf1f61c15b3\",\"kind\":\"frame\",\"seconds\":50.29},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t60.png\",\"sha256\":\"ccf07b23a5880e6d3d807e7ba5f0e0ae006e074ec0487d18202fcc5e122ed234\",\"kind\":\"frame\",\"seconds\":60.08},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t70.png\",\"sha256\":\"c930d4eec16775dc8f71b2e875afe91b9000b59dcf6ac700b9258fd706a2ec3e\",\"kind\":\"frame\",\"seconds\":70.3},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-complete.png\",\"sha256\":\"f49bfd7da5852387c004f4dc3c52ea8b8b1a2c7c1d262ba7fcb4eefce5b5980d\",\"kind\":\"frame\",\"seconds\":76.96},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-timeline.webm\",\"sha256\":\"5f7292eb3b76876fb7c2fcaec6014c067cafe900ff220ff1a4706e17abfc37f2\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.94,\"samples\":[0.01,5.2,10.18,15.16,20.17,25.12,30.13,35.25,40.02,45.28,50.27,55.07,60.05,65.29,70.27,75.09,76.94]},\"second\":{\"success\":true,\"seconds\":77.11,\"samples\":[0,5.01,10.04,15.09,20.19,25.29,30.29,35.03,40.11,45.18,50.2,55.18,60.23,65.21,70.22,75.23,77.11]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-ready.png\",\"sha256\":\"02fea8c9c77998f0e77612ccaaf61bad0d62d846de8fd4e9d0ee55b53d70a31d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t0.png\",\"sha256\":\"31dcee73a03f729923d9d1e190405858253d629314536620b5bad2bd09f3b045\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t10.png\",\"sha256\":\"c87ce0152c15c196929a60263af2797d4621a3e53ec64aecadcaf21f814d408a\",\"kind\":\"frame\",\"seconds\":10.18},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t20.png\",\"sha256\":\"bf76b33a1084e10da671ab57e5b3a22196d687fe8017b0b1e5f463868e334043\",\"kind\":\"frame\",\"seconds\":20.17},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t30.png\",\"sha256\":\"7cda0966e8a5c287cac09691c0a330e0de2bf80f02e5315ea56597f44830b617\",\"kind\":\"frame\",\"seconds\":30.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t40.png\",\"sha256\":\"ae47f3113b4cbb177ee966246eb530dffea28b68baeb1d25ddd583b3163d5ae3\",\"kind\":\"frame\",\"seconds\":40.02},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t50.png\",\"sha256\":\"274a772ff58cd23c17dd6ee979c8163a822fe5fa5f1fe3bf5c9ea0eb6296113d\",\"kind\":\"frame\",\"seconds\":50.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t60.png\",\"sha256\":\"9590dae1f7cf6a40fb739c9e354a2553f0be5e4bc77454a45a14e692942a680a\",\"kind\":\"frame\",\"seconds\":60.05},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t70.png\",\"sha256\":\"549f3c563a94160d3e1d36430e4cdcd287cfd8eb194b16109e3588b272e25773\",\"kind\":\"frame\",\"seconds\":70.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-complete.png\",\"sha256\":\"dcf0be971b1f0baac2198f83b0bd9e4f33e5df4c24908064ab50b88db9c8dc42\",\"kind\":\"frame\",\"seconds\":76.94},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-timeline.webm\",\"sha256\":\"b88e6d8a46eb98f6c7ad3f0d46681fe446119facea8a1e31335fb06235c72988\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.91,\"samples\":[0.01,5.14,10.15,15.12,20.14,25.31,30.1,35.22,40.47,45.25,50.23,55.02,60.02,65.2,70.17,75.05,76.91]},\"second\":{\"success\":true,\"seconds\":77.13,\"samples\":[0,5.3,10.05,15.11,20.31,25.19,30.28,35.05,40.13,45.2,50.22,55.2,60.25,65.23,70.24,75.25,77.13]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-ready.png\",\"sha256\":\"b2411764f71f52c8366e431bfd6ba4a45a9f56316cfb580ce74f49a3a128f26d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-complete.png\",\"sha256\":\"2544c0b5924e147ac6f2113c91e3de04c06443cbae79407ff492569a86eca7e4\",\"kind\":\"frame\",\"seconds\":76.91}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.95,\"samples\":[0.01,5.18,10.19,15.17,20.19,25.05,30.14,35.27,40.03,45.2,50.17,55.07,60.06,65.25,70.21,75.1,76.95]},\"second\":{\"success\":true,\"seconds\":77.16,\"samples\":[0,5.03,10.09,15.15,20.35,25.22,30.31,35.09,40.17,45.24,50.26,55.24,60.29,65.27,70.27,75.28,77.16]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-ready.png\",\"sha256\":\"002bd33fe83eb84b781692a28d05b15b30b9c8df44042607771bba3bdd853208\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-complete.png\",\"sha256\":\"4d0787c4d98ee09a8fc840ce22ef54b3bfd99dca1b8764e65bf6251b4dd0fb0f\",\"kind\":\"frame\",\"seconds\":76.95}]}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:17:38.291Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.96,\"samples\":[0.01,5.22,10.2,15.18,20.2,25.14,30.15,35.28,40.04,45.3,50.29,55.08,60.08,65.31,70.3,75.11,76.96]},\"second\":{\"success\":true,\"seconds\":77.14,\"samples\":[0,5.31,10.06,15.12,20.32,25.19,30.29,35.06,40.14,45.21,50.23,55.21,60.25,65.24,70.25,75.26,77.14]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-ready.png\",\"sha256\":\"1fb6353c7f1ba81ceac28e8788f11d94cf40601d959f001cd712db30dfec23e8\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t0.png\",\"sha256\":\"efa375e31673ded12a1ff9a6d6eba84661b85d8fc484758b4d02ab4fbfd070d8\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t10.png\",\"sha256\":\"ed959c4dae32b6d8aa1ece831afc027a86445470fddb4f20e1e5c1195d76603e\",\"kind\":\"frame\",\"seconds\":10.2},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t20.png\",\"sha256\":\"aa5b32fb82534b477dee557fb4a4a8b401724896da38679e0821fdab4437d27c\",\"kind\":\"frame\",\"seconds\":20.2},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t30.png\",\"sha256\":\"2a4aa483f6e326ca5231d99cc7a038409d6d59f21e45947997adb74871f1fd38\",\"kind\":\"frame\",\"seconds\":30.15},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t40.png\",\"sha256\":\"c0540e0160cd23b2fab69b3ab97bb12c09c63440e108d7152b4098c1e16f4c5a\",\"kind\":\"frame\",\"seconds\":40.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t50.png\",\"sha256\":\"68541177084a52e6be3044954d8a140bed4ac5af4915ce96313beaf1f61c15b3\",\"kind\":\"frame\",\"seconds\":50.29},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t60.png\",\"sha256\":\"ccf07b23a5880e6d3d807e7ba5f0e0ae006e074ec0487d18202fcc5e122ed234\",\"kind\":\"frame\",\"seconds\":60.08},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t70.png\",\"sha256\":\"c930d4eec16775dc8f71b2e875afe91b9000b59dcf6ac700b9258fd706a2ec3e\",\"kind\":\"frame\",\"seconds\":70.3},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-complete.png\",\"sha256\":\"f49bfd7da5852387c004f4dc3c52ea8b8b1a2c7c1d262ba7fcb4eefce5b5980d\",\"kind\":\"frame\",\"seconds\":76.96},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-timeline.webm\",\"sha256\":\"5f7292eb3b76876fb7c2fcaec6014c067cafe900ff220ff1a4706e17abfc37f2\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.94,\"samples\":[0.01,5.2,10.18,15.16,20.17,25.12,30.13,35.25,40.02,45.28,50.27,55.07,60.05,65.29,70.27,75.09,76.94]},\"second\":{\"success\":true,\"seconds\":77.11,\"samples\":[0,5.01,10.04,15.09,20.19,25.29,30.29,35.03,40.11,45.18,50.2,55.18,60.23,65.21,70.22,75.23,77.11]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-ready.png\",\"sha256\":\"02fea8c9c77998f0e77612ccaaf61bad0d62d846de8fd4e9d0ee55b53d70a31d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t0.png\",\"sha256\":\"31dcee73a03f729923d9d1e190405858253d629314536620b5bad2bd09f3b045\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t10.png\",\"sha256\":\"c87ce0152c15c196929a60263af2797d4621a3e53ec64aecadcaf21f814d408a\",\"kind\":\"frame\",\"seconds\":10.18},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t20.png\",\"sha256\":\"bf76b33a1084e10da671ab57e5b3a22196d687fe8017b0b1e5f463868e334043\",\"kind\":\"frame\",\"seconds\":20.17},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t30.png\",\"sha256\":\"7cda0966e8a5c287cac09691c0a330e0de2bf80f02e5315ea56597f44830b617\",\"kind\":\"frame\",\"seconds\":30.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t40.png\",\"sha256\":\"ae47f3113b4cbb177ee966246eb530dffea28b68baeb1d25ddd583b3163d5ae3\",\"kind\":\"frame\",\"seconds\":40.02},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t50.png\",\"sha256\":\"274a772ff58cd23c17dd6ee979c8163a822fe5fa5f1fe3bf5c9ea0eb6296113d\",\"kind\":\"frame\",\"seconds\":50.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t60.png\",\"sha256\":\"9590dae1f7cf6a40fb739c9e354a2553f0be5e4bc77454a45a14e692942a680a\",\"kind\":\"frame\",\"seconds\":60.05},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t70.png\",\"sha256\":\"549f3c563a94160d3e1d36430e4cdcd287cfd8eb194b16109e3588b272e25773\",\"kind\":\"frame\",\"seconds\":70.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-complete.png\",\"sha256\":\"dcf0be971b1f0baac2198f83b0bd9e4f33e5df4c24908064ab50b88db9c8dc42\",\"kind\":\"frame\",\"seconds\":76.94},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-timeline.webm\",\"sha256\":\"b88e6d8a46eb98f6c7ad3f0d46681fe446119facea8a1e31335fb06235c72988\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.91,\"samples\":[0.01,5.14,10.15,15.12,20.14,25.31,30.1,35.22,40.47,45.25,50.23,55.02,60.02,65.2,70.17,75.05,76.91]},\"second\":{\"success\":true,\"seconds\":77.13,\"samples\":[0,5.3,10.05,15.11,20.31,25.19,30.28,35.05,40.13,45.2,50.22,55.2,60.25,65.23,70.24,75.25,77.13]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-ready.png\",\"sha256\":\"b2411764f71f52c8366e431bfd6ba4a45a9f56316cfb580ce74f49a3a128f26d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-complete.png\",\"sha256\":\"2544c0b5924e147ac6f2113c91e3de04c06443cbae79407ff492569a86eca7e4\",\"kind\":\"frame\",\"seconds\":76.91}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.95,\"samples\":[0.01,5.18,10.19,15.17,20.19,25.05,30.14,35.27,40.03,45.2,50.17,55.07,60.06,65.25,70.21,75.1,76.95]},\"second\":{\"success\":true,\"seconds\":77.16,\"samples\":[0,5.03,10.09,15.15,20.35,25.22,30.31,35.09,40.17,45.24,50.26,55.24,60.29,65.27,70.27,75.28,77.16]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-ready.png\",\"sha256\":\"002bd33fe83eb84b781692a28d05b15b30b9c8df44042607771bba3bdd853208\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-complete.png\",\"sha256\":\"4d0787c4d98ee09a8fc840ce22ef54b3bfd99dca1b8764e65bf6251b4dd0fb0f\",\"kind\":\"frame\",\"seconds\":76.95}]}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:17:38.292Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.96,\"samples\":[0.01,5.22,10.2,15.18,20.2,25.14,30.15,35.28,40.04,45.3,50.29,55.08,60.08,65.31,70.3,75.11,76.96]},\"second\":{\"success\":true,\"seconds\":77.14,\"samples\":[0,5.31,10.06,15.12,20.32,25.19,30.29,35.06,40.14,45.21,50.23,55.21,60.25,65.24,70.25,75.26,77.14]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-ready.png\",\"sha256\":\"1fb6353c7f1ba81ceac28e8788f11d94cf40601d959f001cd712db30dfec23e8\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t0.png\",\"sha256\":\"efa375e31673ded12a1ff9a6d6eba84661b85d8fc484758b4d02ab4fbfd070d8\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t10.png\",\"sha256\":\"ed959c4dae32b6d8aa1ece831afc027a86445470fddb4f20e1e5c1195d76603e\",\"kind\":\"frame\",\"seconds\":10.2},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t20.png\",\"sha256\":\"aa5b32fb82534b477dee557fb4a4a8b401724896da38679e0821fdab4437d27c\",\"kind\":\"frame\",\"seconds\":20.2},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t30.png\",\"sha256\":\"2a4aa483f6e326ca5231d99cc7a038409d6d59f21e45947997adb74871f1fd38\",\"kind\":\"frame\",\"seconds\":30.15},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t40.png\",\"sha256\":\"c0540e0160cd23b2fab69b3ab97bb12c09c63440e108d7152b4098c1e16f4c5a\",\"kind\":\"frame\",\"seconds\":40.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t50.png\",\"sha256\":\"68541177084a52e6be3044954d8a140bed4ac5af4915ce96313beaf1f61c15b3\",\"kind\":\"frame\",\"seconds\":50.29},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t60.png\",\"sha256\":\"ccf07b23a5880e6d3d807e7ba5f0e0ae006e074ec0487d18202fcc5e122ed234\",\"kind\":\"frame\",\"seconds\":60.08},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t70.png\",\"sha256\":\"c930d4eec16775dc8f71b2e875afe91b9000b59dcf6ac700b9258fd706a2ec3e\",\"kind\":\"frame\",\"seconds\":70.3},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-complete.png\",\"sha256\":\"f49bfd7da5852387c004f4dc3c52ea8b8b1a2c7c1d262ba7fcb4eefce5b5980d\",\"kind\":\"frame\",\"seconds\":76.96},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-timeline.webm\",\"sha256\":\"5f7292eb3b76876fb7c2fcaec6014c067cafe900ff220ff1a4706e17abfc37f2\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.94,\"samples\":[0.01,5.2,10.18,15.16,20.17,25.12,30.13,35.25,40.02,45.28,50.27,55.07,60.05,65.29,70.27,75.09,76.94]},\"second\":{\"success\":true,\"seconds\":77.11,\"samples\":[0,5.01,10.04,15.09,20.19,25.29,30.29,35.03,40.11,45.18,50.2,55.18,60.23,65.21,70.22,75.23,77.11]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-ready.png\",\"sha256\":\"02fea8c9c77998f0e77612ccaaf61bad0d62d846de8fd4e9d0ee55b53d70a31d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t0.png\",\"sha256\":\"31dcee73a03f729923d9d1e190405858253d629314536620b5bad2bd09f3b045\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t10.png\",\"sha256\":\"c87ce0152c15c196929a60263af2797d4621a3e53ec64aecadcaf21f814d408a\",\"kind\":\"frame\",\"seconds\":10.18},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t20.png\",\"sha256\":\"bf76b33a1084e10da671ab57e5b3a22196d687fe8017b0b1e5f463868e334043\",\"kind\":\"frame\",\"seconds\":20.17},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t30.png\",\"sha256\":\"7cda0966e8a5c287cac09691c0a330e0de2bf80f02e5315ea56597f44830b617\",\"kind\":\"frame\",\"seconds\":30.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t40.png\",\"sha256\":\"ae47f3113b4cbb177ee966246eb530dffea28b68baeb1d25ddd583b3163d5ae3\",\"kind\":\"frame\",\"seconds\":40.02},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t50.png\",\"sha256\":\"274a772ff58cd23c17dd6ee979c8163a822fe5fa5f1fe3bf5c9ea0eb6296113d\",\"kind\":\"frame\",\"seconds\":50.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t60.png\",\"sha256\":\"9590dae1f7cf6a40fb739c9e354a2553f0be5e4bc77454a45a14e692942a680a\",\"kind\":\"frame\",\"seconds\":60.05},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t70.png\",\"sha256\":\"549f3c563a94160d3e1d36430e4cdcd287cfd8eb194b16109e3588b272e25773\",\"kind\":\"frame\",\"seconds\":70.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-complete.png\",\"sha256\":\"dcf0be971b1f0baac2198f83b0bd9e4f33e5df4c24908064ab50b88db9c8dc42\",\"kind\":\"frame\",\"seconds\":76.94},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-timeline.webm\",\"sha256\":\"b88e6d8a46eb98f6c7ad3f0d46681fe446119facea8a1e31335fb06235c72988\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.91,\"samples\":[0.01,5.14,10.15,15.12,20.14,25.31,30.1,35.22,40.47,45.25,50.23,55.02,60.02,65.2,70.17,75.05,76.91]},\"second\":{\"success\":true,\"seconds\":77.13,\"samples\":[0,5.3,10.05,15.11,20.31,25.19,30.28,35.05,40.13,45.2,50.22,55.2,60.25,65.23,70.24,75.25,77.13]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-ready.png\",\"sha256\":\"b2411764f71f52c8366e431bfd6ba4a45a9f56316cfb580ce74f49a3a128f26d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-complete.png\",\"sha256\":\"2544c0b5924e147ac6f2113c91e3de04c06443cbae79407ff492569a86eca7e4\",\"kind\":\"frame\",\"seconds\":76.91}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.95,\"samples\":[0.01,5.18,10.19,15.17,20.19,25.05,30.14,35.27,40.03,45.2,50.17,55.07,60.06,65.25,70.21,75.1,76.95]},\"second\":{\"success\":true,\"seconds\":77.16,\"samples\":[0,5.03,10.09,15.15,20.35,25.22,30.31,35.09,40.17,45.24,50.26,55.24,60.29,65.27,70.27,75.28,77.16]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-ready.png\",\"sha256\":\"002bd33fe83eb84b781692a28d05b15b30b9c8df44042607771bba3bdd853208\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-complete.png\",\"sha256\":\"4d0787c4d98ee09a8fc840ce22ef54b3bfd99dca1b8764e65bf6251b4dd0fb0f\",\"kind\":\"frame\",\"seconds\":76.95}]}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:17:38.292Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.96,\"samples\":[0.01,5.22,10.2,15.18,20.2,25.14,30.15,35.28,40.04,45.3,50.29,55.08,60.08,65.31,70.3,75.11,76.96]},\"second\":{\"success\":true,\"seconds\":77.14,\"samples\":[0,5.31,10.06,15.12,20.32,25.19,30.29,35.06,40.14,45.21,50.23,55.21,60.25,65.24,70.25,75.26,77.14]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-ready.png\",\"sha256\":\"1fb6353c7f1ba81ceac28e8788f11d94cf40601d959f001cd712db30dfec23e8\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t0.png\",\"sha256\":\"efa375e31673ded12a1ff9a6d6eba84661b85d8fc484758b4d02ab4fbfd070d8\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t10.png\",\"sha256\":\"ed959c4dae32b6d8aa1ece831afc027a86445470fddb4f20e1e5c1195d76603e\",\"kind\":\"frame\",\"seconds\":10.2},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t20.png\",\"sha256\":\"aa5b32fb82534b477dee557fb4a4a8b401724896da38679e0821fdab4437d27c\",\"kind\":\"frame\",\"seconds\":20.2},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t30.png\",\"sha256\":\"2a4aa483f6e326ca5231d99cc7a038409d6d59f21e45947997adb74871f1fd38\",\"kind\":\"frame\",\"seconds\":30.15},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t40.png\",\"sha256\":\"c0540e0160cd23b2fab69b3ab97bb12c09c63440e108d7152b4098c1e16f4c5a\",\"kind\":\"frame\",\"seconds\":40.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t50.png\",\"sha256\":\"68541177084a52e6be3044954d8a140bed4ac5af4915ce96313beaf1f61c15b3\",\"kind\":\"frame\",\"seconds\":50.29},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t60.png\",\"sha256\":\"ccf07b23a5880e6d3d807e7ba5f0e0ae006e074ec0487d18202fcc5e122ed234\",\"kind\":\"frame\",\"seconds\":60.08},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-t70.png\",\"sha256\":\"c930d4eec16775dc8f71b2e875afe91b9000b59dcf6ac700b9258fd706a2ec3e\",\"kind\":\"frame\",\"seconds\":70.3},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-complete.png\",\"sha256\":\"f49bfd7da5852387c004f4dc3c52ea8b8b1a2c7c1d262ba7fcb4eefce5b5980d\",\"kind\":\"frame\",\"seconds\":76.96},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-desktop-timeline.webm\",\"sha256\":\"5f7292eb3b76876fb7c2fcaec6014c067cafe900ff220ff1a4706e17abfc37f2\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.94,\"samples\":[0.01,5.2,10.18,15.16,20.17,25.12,30.13,35.25,40.02,45.28,50.27,55.07,60.05,65.29,70.27,75.09,76.94]},\"second\":{\"success\":true,\"seconds\":77.11,\"samples\":[0,5.01,10.04,15.09,20.19,25.29,30.29,35.03,40.11,45.18,50.2,55.18,60.23,65.21,70.22,75.23,77.11]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-ready.png\",\"sha256\":\"02fea8c9c77998f0e77612ccaaf61bad0d62d846de8fd4e9d0ee55b53d70a31d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t0.png\",\"sha256\":\"31dcee73a03f729923d9d1e190405858253d629314536620b5bad2bd09f3b045\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t10.png\",\"sha256\":\"c87ce0152c15c196929a60263af2797d4621a3e53ec64aecadcaf21f814d408a\",\"kind\":\"frame\",\"seconds\":10.18},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t20.png\",\"sha256\":\"bf76b33a1084e10da671ab57e5b3a22196d687fe8017b0b1e5f463868e334043\",\"kind\":\"frame\",\"seconds\":20.17},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t30.png\",\"sha256\":\"7cda0966e8a5c287cac09691c0a330e0de2bf80f02e5315ea56597f44830b617\",\"kind\":\"frame\",\"seconds\":30.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t40.png\",\"sha256\":\"ae47f3113b4cbb177ee966246eb530dffea28b68baeb1d25ddd583b3163d5ae3\",\"kind\":\"frame\",\"seconds\":40.02},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t50.png\",\"sha256\":\"274a772ff58cd23c17dd6ee979c8163a822fe5fa5f1fe3bf5c9ea0eb6296113d\",\"kind\":\"frame\",\"seconds\":50.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t60.png\",\"sha256\":\"9590dae1f7cf6a40fb739c9e354a2553f0be5e4bc77454a45a14e692942a680a\",\"kind\":\"frame\",\"seconds\":60.05},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-t70.png\",\"sha256\":\"549f3c563a94160d3e1d36430e4cdcd287cfd8eb194b16109e3588b272e25773\",\"kind\":\"frame\",\"seconds\":70.27},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-complete.png\",\"sha256\":\"dcf0be971b1f0baac2198f83b0bd9e4f33e5df4c24908064ab50b88db9c8dc42\",\"kind\":\"frame\",\"seconds\":76.94},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-mobile-timeline.webm\",\"sha256\":\"b88e6d8a46eb98f6c7ad3f0d46681fe446119facea8a1e31335fb06235c72988\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.91,\"samples\":[0.01,5.14,10.15,15.12,20.14,25.31,30.1,35.22,40.47,45.25,50.23,55.02,60.02,65.2,70.17,75.05,76.91]},\"second\":{\"success\":true,\"seconds\":77.13,\"samples\":[0,5.3,10.05,15.11,20.31,25.19,30.28,35.05,40.13,45.2,50.22,55.2,60.25,65.23,70.24,75.25,77.13]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-ready.png\",\"sha256\":\"b2411764f71f52c8366e431bfd6ba4a45a9f56316cfb580ce74f49a3a128f26d\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-dpr2-complete.png\",\"sha256\":\"2544c0b5924e147ac6f2113c91e3de04c06443cbae79407ff492569a86eca7e4\",\"kind\":\"frame\",\"seconds\":76.91}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.95,\"samples\":[0.01,5.18,10.19,15.17,20.19,25.05,30.14,35.27,40.03,45.2,50.17,55.07,60.06,65.25,70.21,75.1,76.95]},\"second\":{\"success\":true,\"seconds\":77.16,\"samples\":[0,5.03,10.09,15.15,20.35,25.22,30.31,35.09,40.17,45.24,50.26,55.24,60.29,65.27,70.27,75.28,77.16]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-ready.png\",\"sha256\":\"002bd33fe83eb84b781692a28d05b15b30b9c8df44042607771bba3bdd853208\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/claude-opus-5-5-high-reduced-complete.png\",\"sha256\":\"4d0787c4d98ee09a8fc840ce22ef54b3bfd99dca1b8764e65bf6251b4dd0fb0f\",\"kind\":\"frame\",\"seconds\":76.95}]}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:20:15.813Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.69,\"samples\":[0,5.13,10.16,15.09,20.13,25.09,30.1,35.11,40.16,45.14,50.13,55.14,60.16,65.25,70.24,74.69]},\"second\":{\"success\":true,\"seconds\":74.79,\"samples\":[0,5.29,10.01,15.3,20.31,25.02,30.02,35.04,40.03,45.02,50.08,55.06,60.08,65.1,70.09,74.79]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-ready.png\",\"sha256\":\"eeff48700d3ea1dead5324a69b7ca6e7b790dc0bacb0a14873bf19af0b1e6fcd\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t0.png\",\"sha256\":\"ffefb8bce452bbb8fee4fcaa4f8700c6b9d853848bb635ee0f3f96cc66b8ea2f\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t10.png\",\"sha256\":\"b79e45b66858927bd83f607b3487406469a6b3647c9227d81f3f94e2a831cdf9\",\"kind\":\"frame\",\"seconds\":10.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t20.png\",\"sha256\":\"5b42272b5c28c3bd65aee7e06e916ea1b07715595ed93fc160f859ea008407d6\",\"kind\":\"frame\",\"seconds\":20.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t30.png\",\"sha256\":\"2a949d628df080eddcec978e14e8c05a42395dffc48c4961d0092894e45c88ea\",\"kind\":\"frame\",\"seconds\":30.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t40.png\",\"sha256\":\"a1d9665e8977b47b9d6caa4b0093d5d31bf54792950c104953a934772bbec606\",\"kind\":\"frame\",\"seconds\":40.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t50.png\",\"sha256\":\"e674844a21f03738871fcbc17a472dc627a24e95cbf632bfd7e5590280b7b7be\",\"kind\":\"frame\",\"seconds\":50.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t60.png\",\"sha256\":\"191689f11dd8434fd6808ab519f3348adced17f4af057557d628488bbb06a585\",\"kind\":\"frame\",\"seconds\":60.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t70.png\",\"sha256\":\"a4e401422aeafb11a4064d142379ea614706963f0cb38defc28305a1ea8d0316\",\"kind\":\"frame\",\"seconds\":70.24},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-complete.png\",\"sha256\":\"5bc7f9b7b57fcd43bd53eec3d0d4f101d90d15bb52d945728fac34a37dda357c\",\"kind\":\"frame\",\"seconds\":74.69},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"6a1cde569ac5235b9b040564e6aa22323c22a2183893107279d4b826b046c330\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.71,\"samples\":[0.01,5.22,10.18,15.11,20.15,25.11,30.11,35.1,40.13,45.13,50.1,55.27,60.25,65.26,70.25,74.71]},\"second\":{\"success\":true,\"seconds\":74.8,\"samples\":[0,5.3,10.01,15.31,20,25.03,30.03,35.05,40.04,45.03,50.09,55.07,60.08,65.1,70.1,74.8]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-ready.png\",\"sha256\":\"74d9d40a78caafe9bc54a3e947d42402c09aa1a534e3e0257656db561eedb413\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t0.png\",\"sha256\":\"22c2e50d42eda6e812fd44ce1a97414ba6e9dfba6a77777ed5f6be12700bad96\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t10.png\",\"sha256\":\"6271e9f6ebc3bfcdba29edbef8337dba259b405a62f0d73882503246b11b8a86\",\"kind\":\"frame\",\"seconds\":10.18},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t20.png\",\"sha256\":\"e92d0f7e9addf6e3e2e54301ce29505ba902c1e70ebf80c29c3624a958f13b04\",\"kind\":\"frame\",\"seconds\":20.15},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t30.png\",\"sha256\":\"b649facdce4d54472dc40adc53f0bf2c014c4fdc477425d9a627a4f8a59e5386\",\"kind\":\"frame\",\"seconds\":30.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t40.png\",\"sha256\":\"3107673c1cea26c202d4ff3744149d0f027f6f6e5374167d12b27cfb74c05871\",\"kind\":\"frame\",\"seconds\":40.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t50.png\",\"sha256\":\"554f57fb619b093cf3919d19a4b381a7d5e50cb253ddeaa0a3ab8511b93b2915\",\"kind\":\"frame\",\"seconds\":50.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t60.png\",\"sha256\":\"cb042c2fb691f033ce684e25e15b2c461584b01eb8dfefcbb8b01aff709cb12f\",\"kind\":\"frame\",\"seconds\":60.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t70.png\",\"sha256\":\"2f995eb45a2f46cbce32bffa283d9e7ac395192bd5e850b35804f0bd230e36b2\",\"kind\":\"frame\",\"seconds\":70.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-complete.png\",\"sha256\":\"7115decc15417085370b557653522174ca27a00ca23ced1cfd6e2bad6dfd4024\",\"kind\":\"frame\",\"seconds\":74.71},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"54ab4b36df5e71d0e8f4492642b17c06d38609da983ec289123cff29ee7cce4f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.68,\"samples\":[0,5.12,10.15,15.08,20.12,25.03,30.38,35.1,40.15,45.13,50.11,55.13,60.14,65.23,70.22,74.68]},\"second\":{\"success\":true,\"seconds\":74.82,\"samples\":[0,5.31,10.03,15.01,20.02,25.04,30.04,35.07,40.05,45.04,50.11,55.08,60.1,65.12,70.11,74.82]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-ready.png\",\"sha256\":\"6723980d06e6e9fd8358cc2e56dd2270f0404d1ac38166835df8a0f13c26836a\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-complete.png\",\"sha256\":\"5413c3635474d3ec427aa3cb667c0aafa8f3b6d78bd9d0daf196f7aff9ab151d\",\"kind\":\"frame\",\"seconds\":74.68}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.07,\"samples\":[0,5.14,10.17,15.1,20.14,25.01,30.01,35.09,40.12,45.12,50.09,55.15,60.17,65.25,70.25,74.07]},\"second\":{\"success\":true,\"seconds\":74.18,\"samples\":[0,5.26,10.25,15.21,20.19,25.18,30.14,35.11,40.09,45.06,50.11,55.12,60.13,65.13,70.13,74.18]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-ready.png\",\"sha256\":\"5e6b47e04cc0cbe6c6608559aa6e1236a4229e942862a5409da68b660d88b20a\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-complete.png\",\"sha256\":\"a1abed6d37fab83e87da48ced550318dba2ad8db52a197e717d49a9e87315694\",\"kind\":\"frame\",\"seconds\":74.07}]}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:20:15.813Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.69,\"samples\":[0,5.13,10.16,15.09,20.13,25.09,30.1,35.11,40.16,45.14,50.13,55.14,60.16,65.25,70.24,74.69]},\"second\":{\"success\":true,\"seconds\":74.79,\"samples\":[0,5.29,10.01,15.3,20.31,25.02,30.02,35.04,40.03,45.02,50.08,55.06,60.08,65.1,70.09,74.79]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-ready.png\",\"sha256\":\"eeff48700d3ea1dead5324a69b7ca6e7b790dc0bacb0a14873bf19af0b1e6fcd\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t0.png\",\"sha256\":\"ffefb8bce452bbb8fee4fcaa4f8700c6b9d853848bb635ee0f3f96cc66b8ea2f\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t10.png\",\"sha256\":\"b79e45b66858927bd83f607b3487406469a6b3647c9227d81f3f94e2a831cdf9\",\"kind\":\"frame\",\"seconds\":10.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t20.png\",\"sha256\":\"5b42272b5c28c3bd65aee7e06e916ea1b07715595ed93fc160f859ea008407d6\",\"kind\":\"frame\",\"seconds\":20.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t30.png\",\"sha256\":\"2a949d628df080eddcec978e14e8c05a42395dffc48c4961d0092894e45c88ea\",\"kind\":\"frame\",\"seconds\":30.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t40.png\",\"sha256\":\"a1d9665e8977b47b9d6caa4b0093d5d31bf54792950c104953a934772bbec606\",\"kind\":\"frame\",\"seconds\":40.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t50.png\",\"sha256\":\"e674844a21f03738871fcbc17a472dc627a24e95cbf632bfd7e5590280b7b7be\",\"kind\":\"frame\",\"seconds\":50.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t60.png\",\"sha256\":\"191689f11dd8434fd6808ab519f3348adced17f4af057557d628488bbb06a585\",\"kind\":\"frame\",\"seconds\":60.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t70.png\",\"sha256\":\"a4e401422aeafb11a4064d142379ea614706963f0cb38defc28305a1ea8d0316\",\"kind\":\"frame\",\"seconds\":70.24},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-complete.png\",\"sha256\":\"5bc7f9b7b57fcd43bd53eec3d0d4f101d90d15bb52d945728fac34a37dda357c\",\"kind\":\"frame\",\"seconds\":74.69},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"6a1cde569ac5235b9b040564e6aa22323c22a2183893107279d4b826b046c330\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.71,\"samples\":[0.01,5.22,10.18,15.11,20.15,25.11,30.11,35.1,40.13,45.13,50.1,55.27,60.25,65.26,70.25,74.71]},\"second\":{\"success\":true,\"seconds\":74.8,\"samples\":[0,5.3,10.01,15.31,20,25.03,30.03,35.05,40.04,45.03,50.09,55.07,60.08,65.1,70.1,74.8]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-ready.png\",\"sha256\":\"74d9d40a78caafe9bc54a3e947d42402c09aa1a534e3e0257656db561eedb413\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t0.png\",\"sha256\":\"22c2e50d42eda6e812fd44ce1a97414ba6e9dfba6a77777ed5f6be12700bad96\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t10.png\",\"sha256\":\"6271e9f6ebc3bfcdba29edbef8337dba259b405a62f0d73882503246b11b8a86\",\"kind\":\"frame\",\"seconds\":10.18},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t20.png\",\"sha256\":\"e92d0f7e9addf6e3e2e54301ce29505ba902c1e70ebf80c29c3624a958f13b04\",\"kind\":\"frame\",\"seconds\":20.15},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t30.png\",\"sha256\":\"b649facdce4d54472dc40adc53f0bf2c014c4fdc477425d9a627a4f8a59e5386\",\"kind\":\"frame\",\"seconds\":30.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t40.png\",\"sha256\":\"3107673c1cea26c202d4ff3744149d0f027f6f6e5374167d12b27cfb74c05871\",\"kind\":\"frame\",\"seconds\":40.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t50.png\",\"sha256\":\"554f57fb619b093cf3919d19a4b381a7d5e50cb253ddeaa0a3ab8511b93b2915\",\"kind\":\"frame\",\"seconds\":50.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t60.png\",\"sha256\":\"cb042c2fb691f033ce684e25e15b2c461584b01eb8dfefcbb8b01aff709cb12f\",\"kind\":\"frame\",\"seconds\":60.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t70.png\",\"sha256\":\"2f995eb45a2f46cbce32bffa283d9e7ac395192bd5e850b35804f0bd230e36b2\",\"kind\":\"frame\",\"seconds\":70.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-complete.png\",\"sha256\":\"7115decc15417085370b557653522174ca27a00ca23ced1cfd6e2bad6dfd4024\",\"kind\":\"frame\",\"seconds\":74.71},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"54ab4b36df5e71d0e8f4492642b17c06d38609da983ec289123cff29ee7cce4f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.68,\"samples\":[0,5.12,10.15,15.08,20.12,25.03,30.38,35.1,40.15,45.13,50.11,55.13,60.14,65.23,70.22,74.68]},\"second\":{\"success\":true,\"seconds\":74.82,\"samples\":[0,5.31,10.03,15.01,20.02,25.04,30.04,35.07,40.05,45.04,50.11,55.08,60.1,65.12,70.11,74.82]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-ready.png\",\"sha256\":\"6723980d06e6e9fd8358cc2e56dd2270f0404d1ac38166835df8a0f13c26836a\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-complete.png\",\"sha256\":\"5413c3635474d3ec427aa3cb667c0aafa8f3b6d78bd9d0daf196f7aff9ab151d\",\"kind\":\"frame\",\"seconds\":74.68}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.07,\"samples\":[0,5.14,10.17,15.1,20.14,25.01,30.01,35.09,40.12,45.12,50.09,55.15,60.17,65.25,70.25,74.07]},\"second\":{\"success\":true,\"seconds\":74.18,\"samples\":[0,5.26,10.25,15.21,20.19,25.18,30.14,35.11,40.09,45.06,50.11,55.12,60.13,65.13,70.13,74.18]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-ready.png\",\"sha256\":\"5e6b47e04cc0cbe6c6608559aa6e1236a4229e942862a5409da68b660d88b20a\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-complete.png\",\"sha256\":\"a1abed6d37fab83e87da48ced550318dba2ad8db52a197e717d49a9e87315694\",\"kind\":\"frame\",\"seconds\":74.07}]}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:20:15.813Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.69,\"samples\":[0,5.13,10.16,15.09,20.13,25.09,30.1,35.11,40.16,45.14,50.13,55.14,60.16,65.25,70.24,74.69]},\"second\":{\"success\":true,\"seconds\":74.79,\"samples\":[0,5.29,10.01,15.3,20.31,25.02,30.02,35.04,40.03,45.02,50.08,55.06,60.08,65.1,70.09,74.79]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-ready.png\",\"sha256\":\"eeff48700d3ea1dead5324a69b7ca6e7b790dc0bacb0a14873bf19af0b1e6fcd\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t0.png\",\"sha256\":\"ffefb8bce452bbb8fee4fcaa4f8700c6b9d853848bb635ee0f3f96cc66b8ea2f\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t10.png\",\"sha256\":\"b79e45b66858927bd83f607b3487406469a6b3647c9227d81f3f94e2a831cdf9\",\"kind\":\"frame\",\"seconds\":10.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t20.png\",\"sha256\":\"5b42272b5c28c3bd65aee7e06e916ea1b07715595ed93fc160f859ea008407d6\",\"kind\":\"frame\",\"seconds\":20.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t30.png\",\"sha256\":\"2a949d628df080eddcec978e14e8c05a42395dffc48c4961d0092894e45c88ea\",\"kind\":\"frame\",\"seconds\":30.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t40.png\",\"sha256\":\"a1d9665e8977b47b9d6caa4b0093d5d31bf54792950c104953a934772bbec606\",\"kind\":\"frame\",\"seconds\":40.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t50.png\",\"sha256\":\"e674844a21f03738871fcbc17a472dc627a24e95cbf632bfd7e5590280b7b7be\",\"kind\":\"frame\",\"seconds\":50.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t60.png\",\"sha256\":\"191689f11dd8434fd6808ab519f3348adced17f4af057557d628488bbb06a585\",\"kind\":\"frame\",\"seconds\":60.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t70.png\",\"sha256\":\"a4e401422aeafb11a4064d142379ea614706963f0cb38defc28305a1ea8d0316\",\"kind\":\"frame\",\"seconds\":70.24},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-complete.png\",\"sha256\":\"5bc7f9b7b57fcd43bd53eec3d0d4f101d90d15bb52d945728fac34a37dda357c\",\"kind\":\"frame\",\"seconds\":74.69},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"6a1cde569ac5235b9b040564e6aa22323c22a2183893107279d4b826b046c330\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.71,\"samples\":[0.01,5.22,10.18,15.11,20.15,25.11,30.11,35.1,40.13,45.13,50.1,55.27,60.25,65.26,70.25,74.71]},\"second\":{\"success\":true,\"seconds\":74.8,\"samples\":[0,5.3,10.01,15.31,20,25.03,30.03,35.05,40.04,45.03,50.09,55.07,60.08,65.1,70.1,74.8]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-ready.png\",\"sha256\":\"74d9d40a78caafe9bc54a3e947d42402c09aa1a534e3e0257656db561eedb413\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t0.png\",\"sha256\":\"22c2e50d42eda6e812fd44ce1a97414ba6e9dfba6a77777ed5f6be12700bad96\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t10.png\",\"sha256\":\"6271e9f6ebc3bfcdba29edbef8337dba259b405a62f0d73882503246b11b8a86\",\"kind\":\"frame\",\"seconds\":10.18},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t20.png\",\"sha256\":\"e92d0f7e9addf6e3e2e54301ce29505ba902c1e70ebf80c29c3624a958f13b04\",\"kind\":\"frame\",\"seconds\":20.15},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t30.png\",\"sha256\":\"b649facdce4d54472dc40adc53f0bf2c014c4fdc477425d9a627a4f8a59e5386\",\"kind\":\"frame\",\"seconds\":30.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t40.png\",\"sha256\":\"3107673c1cea26c202d4ff3744149d0f027f6f6e5374167d12b27cfb74c05871\",\"kind\":\"frame\",\"seconds\":40.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t50.png\",\"sha256\":\"554f57fb619b093cf3919d19a4b381a7d5e50cb253ddeaa0a3ab8511b93b2915\",\"kind\":\"frame\",\"seconds\":50.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t60.png\",\"sha256\":\"cb042c2fb691f033ce684e25e15b2c461584b01eb8dfefcbb8b01aff709cb12f\",\"kind\":\"frame\",\"seconds\":60.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t70.png\",\"sha256\":\"2f995eb45a2f46cbce32bffa283d9e7ac395192bd5e850b35804f0bd230e36b2\",\"kind\":\"frame\",\"seconds\":70.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-complete.png\",\"sha256\":\"7115decc15417085370b557653522174ca27a00ca23ced1cfd6e2bad6dfd4024\",\"kind\":\"frame\",\"seconds\":74.71},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"54ab4b36df5e71d0e8f4492642b17c06d38609da983ec289123cff29ee7cce4f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.68,\"samples\":[0,5.12,10.15,15.08,20.12,25.03,30.38,35.1,40.15,45.13,50.11,55.13,60.14,65.23,70.22,74.68]},\"second\":{\"success\":true,\"seconds\":74.82,\"samples\":[0,5.31,10.03,15.01,20.02,25.04,30.04,35.07,40.05,45.04,50.11,55.08,60.1,65.12,70.11,74.82]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-ready.png\",\"sha256\":\"6723980d06e6e9fd8358cc2e56dd2270f0404d1ac38166835df8a0f13c26836a\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-complete.png\",\"sha256\":\"5413c3635474d3ec427aa3cb667c0aafa8f3b6d78bd9d0daf196f7aff9ab151d\",\"kind\":\"frame\",\"seconds\":74.68}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.07,\"samples\":[0,5.14,10.17,15.1,20.14,25.01,30.01,35.09,40.12,45.12,50.09,55.15,60.17,65.25,70.25,74.07]},\"second\":{\"success\":true,\"seconds\":74.18,\"samples\":[0,5.26,10.25,15.21,20.19,25.18,30.14,35.11,40.09,45.06,50.11,55.12,60.13,65.13,70.13,74.18]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-ready.png\",\"sha256\":\"5e6b47e04cc0cbe6c6608559aa6e1236a4229e942862a5409da68b660d88b20a\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-complete.png\",\"sha256\":\"a1abed6d37fab83e87da48ced550318dba2ad8db52a197e717d49a9e87315694\",\"kind\":\"frame\",\"seconds\":74.07}]}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:20:15.814Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.69,\"samples\":[0,5.13,10.16,15.09,20.13,25.09,30.1,35.11,40.16,45.14,50.13,55.14,60.16,65.25,70.24,74.69]},\"second\":{\"success\":true,\"seconds\":74.79,\"samples\":[0,5.29,10.01,15.3,20.31,25.02,30.02,35.04,40.03,45.02,50.08,55.06,60.08,65.1,70.09,74.79]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-ready.png\",\"sha256\":\"eeff48700d3ea1dead5324a69b7ca6e7b790dc0bacb0a14873bf19af0b1e6fcd\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t0.png\",\"sha256\":\"ffefb8bce452bbb8fee4fcaa4f8700c6b9d853848bb635ee0f3f96cc66b8ea2f\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t10.png\",\"sha256\":\"b79e45b66858927bd83f607b3487406469a6b3647c9227d81f3f94e2a831cdf9\",\"kind\":\"frame\",\"seconds\":10.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t20.png\",\"sha256\":\"5b42272b5c28c3bd65aee7e06e916ea1b07715595ed93fc160f859ea008407d6\",\"kind\":\"frame\",\"seconds\":20.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t30.png\",\"sha256\":\"2a949d628df080eddcec978e14e8c05a42395dffc48c4961d0092894e45c88ea\",\"kind\":\"frame\",\"seconds\":30.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t40.png\",\"sha256\":\"a1d9665e8977b47b9d6caa4b0093d5d31bf54792950c104953a934772bbec606\",\"kind\":\"frame\",\"seconds\":40.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t50.png\",\"sha256\":\"e674844a21f03738871fcbc17a472dc627a24e95cbf632bfd7e5590280b7b7be\",\"kind\":\"frame\",\"seconds\":50.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t60.png\",\"sha256\":\"191689f11dd8434fd6808ab519f3348adced17f4af057557d628488bbb06a585\",\"kind\":\"frame\",\"seconds\":60.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t70.png\",\"sha256\":\"a4e401422aeafb11a4064d142379ea614706963f0cb38defc28305a1ea8d0316\",\"kind\":\"frame\",\"seconds\":70.24},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-complete.png\",\"sha256\":\"5bc7f9b7b57fcd43bd53eec3d0d4f101d90d15bb52d945728fac34a37dda357c\",\"kind\":\"frame\",\"seconds\":74.69},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"6a1cde569ac5235b9b040564e6aa22323c22a2183893107279d4b826b046c330\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.71,\"samples\":[0.01,5.22,10.18,15.11,20.15,25.11,30.11,35.1,40.13,45.13,50.1,55.27,60.25,65.26,70.25,74.71]},\"second\":{\"success\":true,\"seconds\":74.8,\"samples\":[0,5.3,10.01,15.31,20,25.03,30.03,35.05,40.04,45.03,50.09,55.07,60.08,65.1,70.1,74.8]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-ready.png\",\"sha256\":\"74d9d40a78caafe9bc54a3e947d42402c09aa1a534e3e0257656db561eedb413\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t0.png\",\"sha256\":\"22c2e50d42eda6e812fd44ce1a97414ba6e9dfba6a77777ed5f6be12700bad96\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t10.png\",\"sha256\":\"6271e9f6ebc3bfcdba29edbef8337dba259b405a62f0d73882503246b11b8a86\",\"kind\":\"frame\",\"seconds\":10.18},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t20.png\",\"sha256\":\"e92d0f7e9addf6e3e2e54301ce29505ba902c1e70ebf80c29c3624a958f13b04\",\"kind\":\"frame\",\"seconds\":20.15},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t30.png\",\"sha256\":\"b649facdce4d54472dc40adc53f0bf2c014c4fdc477425d9a627a4f8a59e5386\",\"kind\":\"frame\",\"seconds\":30.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t40.png\",\"sha256\":\"3107673c1cea26c202d4ff3744149d0f027f6f6e5374167d12b27cfb74c05871\",\"kind\":\"frame\",\"seconds\":40.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t50.png\",\"sha256\":\"554f57fb619b093cf3919d19a4b381a7d5e50cb253ddeaa0a3ab8511b93b2915\",\"kind\":\"frame\",\"seconds\":50.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t60.png\",\"sha256\":\"cb042c2fb691f033ce684e25e15b2c461584b01eb8dfefcbb8b01aff709cb12f\",\"kind\":\"frame\",\"seconds\":60.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t70.png\",\"sha256\":\"2f995eb45a2f46cbce32bffa283d9e7ac395192bd5e850b35804f0bd230e36b2\",\"kind\":\"frame\",\"seconds\":70.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-complete.png\",\"sha256\":\"7115decc15417085370b557653522174ca27a00ca23ced1cfd6e2bad6dfd4024\",\"kind\":\"frame\",\"seconds\":74.71},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"54ab4b36df5e71d0e8f4492642b17c06d38609da983ec289123cff29ee7cce4f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.68,\"samples\":[0,5.12,10.15,15.08,20.12,25.03,30.38,35.1,40.15,45.13,50.11,55.13,60.14,65.23,70.22,74.68]},\"second\":{\"success\":true,\"seconds\":74.82,\"samples\":[0,5.31,10.03,15.01,20.02,25.04,30.04,35.07,40.05,45.04,50.11,55.08,60.1,65.12,70.11,74.82]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-ready.png\",\"sha256\":\"6723980d06e6e9fd8358cc2e56dd2270f0404d1ac38166835df8a0f13c26836a\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-complete.png\",\"sha256\":\"5413c3635474d3ec427aa3cb667c0aafa8f3b6d78bd9d0daf196f7aff9ab151d\",\"kind\":\"frame\",\"seconds\":74.68}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.07,\"samples\":[0,5.14,10.17,15.1,20.14,25.01,30.01,35.09,40.12,45.12,50.09,55.15,60.17,65.25,70.25,74.07]},\"second\":{\"success\":true,\"seconds\":74.18,\"samples\":[0,5.26,10.25,15.21,20.19,25.18,30.14,35.11,40.09,45.06,50.11,55.12,60.13,65.13,70.13,74.18]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-ready.png\",\"sha256\":\"5e6b47e04cc0cbe6c6608559aa6e1236a4229e942862a5409da68b660d88b20a\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-complete.png\",\"sha256\":\"a1abed6d37fab83e87da48ced550318dba2ad8db52a197e717d49a9e87315694\",\"kind\":\"frame\",\"seconds\":74.07}]}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:20:15.814Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.69,\"samples\":[0,5.13,10.16,15.09,20.13,25.09,30.1,35.11,40.16,45.14,50.13,55.14,60.16,65.25,70.24,74.69]},\"second\":{\"success\":true,\"seconds\":74.79,\"samples\":[0,5.29,10.01,15.3,20.31,25.02,30.02,35.04,40.03,45.02,50.08,55.06,60.08,65.1,70.09,74.79]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-ready.png\",\"sha256\":\"eeff48700d3ea1dead5324a69b7ca6e7b790dc0bacb0a14873bf19af0b1e6fcd\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t0.png\",\"sha256\":\"ffefb8bce452bbb8fee4fcaa4f8700c6b9d853848bb635ee0f3f96cc66b8ea2f\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t10.png\",\"sha256\":\"b79e45b66858927bd83f607b3487406469a6b3647c9227d81f3f94e2a831cdf9\",\"kind\":\"frame\",\"seconds\":10.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t20.png\",\"sha256\":\"5b42272b5c28c3bd65aee7e06e916ea1b07715595ed93fc160f859ea008407d6\",\"kind\":\"frame\",\"seconds\":20.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t30.png\",\"sha256\":\"2a949d628df080eddcec978e14e8c05a42395dffc48c4961d0092894e45c88ea\",\"kind\":\"frame\",\"seconds\":30.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t40.png\",\"sha256\":\"a1d9665e8977b47b9d6caa4b0093d5d31bf54792950c104953a934772bbec606\",\"kind\":\"frame\",\"seconds\":40.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t50.png\",\"sha256\":\"e674844a21f03738871fcbc17a472dc627a24e95cbf632bfd7e5590280b7b7be\",\"kind\":\"frame\",\"seconds\":50.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t60.png\",\"sha256\":\"191689f11dd8434fd6808ab519f3348adced17f4af057557d628488bbb06a585\",\"kind\":\"frame\",\"seconds\":60.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-t70.png\",\"sha256\":\"a4e401422aeafb11a4064d142379ea614706963f0cb38defc28305a1ea8d0316\",\"kind\":\"frame\",\"seconds\":70.24},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-complete.png\",\"sha256\":\"5bc7f9b7b57fcd43bd53eec3d0d4f101d90d15bb52d945728fac34a37dda357c\",\"kind\":\"frame\",\"seconds\":74.69},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"6a1cde569ac5235b9b040564e6aa22323c22a2183893107279d4b826b046c330\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.71,\"samples\":[0.01,5.22,10.18,15.11,20.15,25.11,30.11,35.1,40.13,45.13,50.1,55.27,60.25,65.26,70.25,74.71]},\"second\":{\"success\":true,\"seconds\":74.8,\"samples\":[0,5.3,10.01,15.31,20,25.03,30.03,35.05,40.04,45.03,50.09,55.07,60.08,65.1,70.1,74.8]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-ready.png\",\"sha256\":\"74d9d40a78caafe9bc54a3e947d42402c09aa1a534e3e0257656db561eedb413\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t0.png\",\"sha256\":\"22c2e50d42eda6e812fd44ce1a97414ba6e9dfba6a77777ed5f6be12700bad96\",\"kind\":\"frame\",\"seconds\":0.01},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t10.png\",\"sha256\":\"6271e9f6ebc3bfcdba29edbef8337dba259b405a62f0d73882503246b11b8a86\",\"kind\":\"frame\",\"seconds\":10.18},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t20.png\",\"sha256\":\"e92d0f7e9addf6e3e2e54301ce29505ba902c1e70ebf80c29c3624a958f13b04\",\"kind\":\"frame\",\"seconds\":20.15},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t30.png\",\"sha256\":\"b649facdce4d54472dc40adc53f0bf2c014c4fdc477425d9a627a4f8a59e5386\",\"kind\":\"frame\",\"seconds\":30.11},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t40.png\",\"sha256\":\"3107673c1cea26c202d4ff3744149d0f027f6f6e5374167d12b27cfb74c05871\",\"kind\":\"frame\",\"seconds\":40.13},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t50.png\",\"sha256\":\"554f57fb619b093cf3919d19a4b381a7d5e50cb253ddeaa0a3ab8511b93b2915\",\"kind\":\"frame\",\"seconds\":50.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t60.png\",\"sha256\":\"cb042c2fb691f033ce684e25e15b2c461584b01eb8dfefcbb8b01aff709cb12f\",\"kind\":\"frame\",\"seconds\":60.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-t70.png\",\"sha256\":\"2f995eb45a2f46cbce32bffa283d9e7ac395192bd5e850b35804f0bd230e36b2\",\"kind\":\"frame\",\"seconds\":70.25},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-complete.png\",\"sha256\":\"7115decc15417085370b557653522174ca27a00ca23ced1cfd6e2bad6dfd4024\",\"kind\":\"frame\",\"seconds\":74.71},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"54ab4b36df5e71d0e8f4492642b17c06d38609da983ec289123cff29ee7cce4f\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.68,\"samples\":[0,5.12,10.15,15.08,20.12,25.03,30.38,35.1,40.15,45.13,50.11,55.13,60.14,65.23,70.22,74.68]},\"second\":{\"success\":true,\"seconds\":74.82,\"samples\":[0,5.31,10.03,15.01,20.02,25.04,30.04,35.07,40.05,45.04,50.11,55.08,60.1,65.12,70.11,74.82]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-ready.png\",\"sha256\":\"6723980d06e6e9fd8358cc2e56dd2270f0404d1ac38166835df8a0f13c26836a\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-dpr2-complete.png\",\"sha256\":\"5413c3635474d3ec427aa3cb667c0aafa8f3b6d78bd9d0daf196f7aff9ab151d\",\"kind\":\"frame\",\"seconds\":74.68}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.07,\"samples\":[0,5.14,10.17,15.1,20.14,25.01,30.01,35.09,40.12,45.12,50.09,55.15,60.17,65.25,70.25,74.07]},\"second\":{\"success\":true,\"seconds\":74.18,\"samples\":[0,5.26,10.25,15.21,20.19,25.18,30.14,35.11,40.09,45.06,50.11,55.12,60.13,65.13,70.13,74.18]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-ready.png\",\"sha256\":\"5e6b47e04cc0cbe6c6608559aa6e1236a4229e942862a5409da68b660d88b20a\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-5-6-sol-xhigh-reduced-complete.png\",\"sha256\":\"a1abed6d37fab83e87da48ced550318dba2ad8db52a197e717d49a9e87315694\",\"kind\":\"frame\",\"seconds\":74.07}]}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:23:00.444Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.68,\"samples\":[0,5.08,10.1,15.04,20.04,25.12,30.1,35.13,40.1,45.13,50.1,55.02,60.28,65.24,70.23,75.26,78.68]},\"second\":{\"success\":true,\"seconds\":78.81,\"samples\":[0,5.31,10.29,15.26,20.29,25.02,30.06,35.07,40.05,45.03,50.04,55.02,60.31,65.02,70.03,75.04,78.81]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-ready.png\",\"sha256\":\"337bab93af155ec189242a8f7ede17eb5204745136572eca371746125e36ccc0\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t0.png\",\"sha256\":\"0391abff9b0aff26f1a51bbd2e068bd1a3be307da0fe92e995a8432c9d95b1f7\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t10.png\",\"sha256\":\"99bfb0891fc3131edec3f66915c54eb7c5a15321633c16d6c5fa76feb9877889\",\"kind\":\"frame\",\"seconds\":10.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t20.png\",\"sha256\":\"af67a0ef91117dae89d51a8dd768d69fd9e00dfda4b0df575df64e3f03a63343\",\"kind\":\"frame\",\"seconds\":20.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t30.png\",\"sha256\":\"47ebf3debd766243dfdd2b6c50580ad601049d4f1c4bceaf53135bdd6121effd\",\"kind\":\"frame\",\"seconds\":30.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t40.png\",\"sha256\":\"046d5061397bc93ce200284001c7b2d4fcca74726d0eb0956c255510fe5bc980\",\"kind\":\"frame\",\"seconds\":40.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t50.png\",\"sha256\":\"a82ed58c22ab21bae4154b4c8392e59a09317951d387fc6744d821d124ee4070\",\"kind\":\"frame\",\"seconds\":50.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t60.png\",\"sha256\":\"4a083af89a314d14e4c3a9cfcd29f98a4e4f0d583e4444a944b8c7034a8a30a7\",\"kind\":\"frame\",\"seconds\":60.28},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t70.png\",\"sha256\":\"e354acebf9db309d989caa87089dfa73dbb7e67188adeabc1fecc5afc3b28107\",\"kind\":\"frame\",\"seconds\":70.23},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-complete.png\",\"sha256\":\"5b56f66a7b39a7be2336bd458ae0a3b0a02938a83dedd466daf05354af25feda\",\"kind\":\"frame\",\"seconds\":78.68},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"74287c055fc798403c2cd87487a326bf9a9bfba4eb6826f19c0a870caa346ef4\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.66,\"samples\":[0,5.06,10.07,15.02,20.02,25.06,30.03,35.24,40.23,45.2,50.16,55.08,60.06,65.22,70.21,75.24,78.66]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.27,10.27,15.25,20.23,25.24,30.27,35.29,40.28,45.26,50.26,55.25,60.23,65.24,70.26,75.26,78.72]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-ready.png\",\"sha256\":\"3f725cd8d988d9ba28cdf511976dc09a51f79ff25872e39282edde94b691ec34\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t0.png\",\"sha256\":\"5f6951f769e4a757d92aa415569a74ea59a5fbfdefb6cc3117a275d8ab661545\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t10.png\",\"sha256\":\"468237e6b93569f412bf31dc4dcf5b51a89801a061c0162c340995414667d759\",\"kind\":\"frame\",\"seconds\":10.07},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t20.png\",\"sha256\":\"9c55e21057a41381e046e7695af3a0a1ba516786644a2b35598a310bd5deeeea\",\"kind\":\"frame\",\"seconds\":20.02},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t30.png\",\"sha256\":\"2100bcc746e26ba0cf43887969fe83306b950132c87e598ea6a6bf5c1edbb219\",\"kind\":\"frame\",\"seconds\":30.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t40.png\",\"sha256\":\"9e0005b9d6be1cd350539a0f96150cbb84e2e7afad651586f77229c2652d224a\",\"kind\":\"frame\",\"seconds\":40.23},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t50.png\",\"sha256\":\"241852280fbfe3269da1906356111dd4b2ac8103242191dde3e6d13be277de31\",\"kind\":\"frame\",\"seconds\":50.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t60.png\",\"sha256\":\"dfd2e7c527a83f64e4034e306b4d22364c9223c5ac94496e3b0044944f6bd530\",\"kind\":\"frame\",\"seconds\":60.06},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t70.png\",\"sha256\":\"b5cecc3f8748d1d3d4340b0429bad37a7bfe60332d5730c5728e859d8e08867d\",\"kind\":\"frame\",\"seconds\":70.21},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-complete.png\",\"sha256\":\"abe6b77281bbcd63e191631fc2abc40219079bdec627d95f2219643499ab7781\",\"kind\":\"frame\",\"seconds\":78.66},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"cb7336612c4beb5fb4a31be9a40ade2c5081f3cb4aff165eb081b584d778122e\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.67,\"samples\":[0,5.07,10.08,15.28,20.69,25.07,30.07,35.12,40.09,45.06,50.01,55.29,60.27,65.23,70.22,75.23,78.67]},\"second\":{\"success\":true,\"seconds\":78.79,\"samples\":[0,5.28,10.26,15.23,20.25,25.3,30.03,35.03,40.01,45.31,50.01,55.3,60.28,65.3,70.31,75.31,78.79]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-ready.png\",\"sha256\":\"948245301bb7c36961edd40b47cacf5da558e5b40a9ceb50766d5706361cbb72\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-complete.png\",\"sha256\":\"f74c23dd121704951606debe932f878764647b2009bd651ab3e6e543805814bc\",\"kind\":\"frame\",\"seconds\":78.67}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.14,\"samples\":[0,5.11,10.11,15.31,20.75,25.09,30.08,35.07,40.07,45.09,50.04,55.03,60.31,65.26,70.26,75.27,77.14]},\"second\":{\"success\":true,\"seconds\":77.15,\"samples\":[0,5.27,10.22,15.19,20.19,25.19,30.3,35.3,40.29,45.27,50.28,55.27,60.24,65.25,70.24,75.28,77.15]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-ready.png\",\"sha256\":\"147ed7ccc440c154f93a632e2dcaf8ffd2429c06acd0d4271a8d4f6fbc35c9e3\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-complete.png\",\"sha256\":\"c423aab3c3e93e8c207250deec92cccb3f3897b73b1c631f8fc298330eb786b6\",\"kind\":\"frame\",\"seconds\":77.14}]}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:23:00.444Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.68,\"samples\":[0,5.08,10.1,15.04,20.04,25.12,30.1,35.13,40.1,45.13,50.1,55.02,60.28,65.24,70.23,75.26,78.68]},\"second\":{\"success\":true,\"seconds\":78.81,\"samples\":[0,5.31,10.29,15.26,20.29,25.02,30.06,35.07,40.05,45.03,50.04,55.02,60.31,65.02,70.03,75.04,78.81]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-ready.png\",\"sha256\":\"337bab93af155ec189242a8f7ede17eb5204745136572eca371746125e36ccc0\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t0.png\",\"sha256\":\"0391abff9b0aff26f1a51bbd2e068bd1a3be307da0fe92e995a8432c9d95b1f7\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t10.png\",\"sha256\":\"99bfb0891fc3131edec3f66915c54eb7c5a15321633c16d6c5fa76feb9877889\",\"kind\":\"frame\",\"seconds\":10.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t20.png\",\"sha256\":\"af67a0ef91117dae89d51a8dd768d69fd9e00dfda4b0df575df64e3f03a63343\",\"kind\":\"frame\",\"seconds\":20.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t30.png\",\"sha256\":\"47ebf3debd766243dfdd2b6c50580ad601049d4f1c4bceaf53135bdd6121effd\",\"kind\":\"frame\",\"seconds\":30.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t40.png\",\"sha256\":\"046d5061397bc93ce200284001c7b2d4fcca74726d0eb0956c255510fe5bc980\",\"kind\":\"frame\",\"seconds\":40.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t50.png\",\"sha256\":\"a82ed58c22ab21bae4154b4c8392e59a09317951d387fc6744d821d124ee4070\",\"kind\":\"frame\",\"seconds\":50.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t60.png\",\"sha256\":\"4a083af89a314d14e4c3a9cfcd29f98a4e4f0d583e4444a944b8c7034a8a30a7\",\"kind\":\"frame\",\"seconds\":60.28},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t70.png\",\"sha256\":\"e354acebf9db309d989caa87089dfa73dbb7e67188adeabc1fecc5afc3b28107\",\"kind\":\"frame\",\"seconds\":70.23},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-complete.png\",\"sha256\":\"5b56f66a7b39a7be2336bd458ae0a3b0a02938a83dedd466daf05354af25feda\",\"kind\":\"frame\",\"seconds\":78.68},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"74287c055fc798403c2cd87487a326bf9a9bfba4eb6826f19c0a870caa346ef4\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.66,\"samples\":[0,5.06,10.07,15.02,20.02,25.06,30.03,35.24,40.23,45.2,50.16,55.08,60.06,65.22,70.21,75.24,78.66]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.27,10.27,15.25,20.23,25.24,30.27,35.29,40.28,45.26,50.26,55.25,60.23,65.24,70.26,75.26,78.72]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-ready.png\",\"sha256\":\"3f725cd8d988d9ba28cdf511976dc09a51f79ff25872e39282edde94b691ec34\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t0.png\",\"sha256\":\"5f6951f769e4a757d92aa415569a74ea59a5fbfdefb6cc3117a275d8ab661545\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t10.png\",\"sha256\":\"468237e6b93569f412bf31dc4dcf5b51a89801a061c0162c340995414667d759\",\"kind\":\"frame\",\"seconds\":10.07},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t20.png\",\"sha256\":\"9c55e21057a41381e046e7695af3a0a1ba516786644a2b35598a310bd5deeeea\",\"kind\":\"frame\",\"seconds\":20.02},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t30.png\",\"sha256\":\"2100bcc746e26ba0cf43887969fe83306b950132c87e598ea6a6bf5c1edbb219\",\"kind\":\"frame\",\"seconds\":30.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t40.png\",\"sha256\":\"9e0005b9d6be1cd350539a0f96150cbb84e2e7afad651586f77229c2652d224a\",\"kind\":\"frame\",\"seconds\":40.23},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t50.png\",\"sha256\":\"241852280fbfe3269da1906356111dd4b2ac8103242191dde3e6d13be277de31\",\"kind\":\"frame\",\"seconds\":50.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t60.png\",\"sha256\":\"dfd2e7c527a83f64e4034e306b4d22364c9223c5ac94496e3b0044944f6bd530\",\"kind\":\"frame\",\"seconds\":60.06},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t70.png\",\"sha256\":\"b5cecc3f8748d1d3d4340b0429bad37a7bfe60332d5730c5728e859d8e08867d\",\"kind\":\"frame\",\"seconds\":70.21},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-complete.png\",\"sha256\":\"abe6b77281bbcd63e191631fc2abc40219079bdec627d95f2219643499ab7781\",\"kind\":\"frame\",\"seconds\":78.66},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"cb7336612c4beb5fb4a31be9a40ade2c5081f3cb4aff165eb081b584d778122e\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.67,\"samples\":[0,5.07,10.08,15.28,20.69,25.07,30.07,35.12,40.09,45.06,50.01,55.29,60.27,65.23,70.22,75.23,78.67]},\"second\":{\"success\":true,\"seconds\":78.79,\"samples\":[0,5.28,10.26,15.23,20.25,25.3,30.03,35.03,40.01,45.31,50.01,55.3,60.28,65.3,70.31,75.31,78.79]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-ready.png\",\"sha256\":\"948245301bb7c36961edd40b47cacf5da558e5b40a9ceb50766d5706361cbb72\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-complete.png\",\"sha256\":\"f74c23dd121704951606debe932f878764647b2009bd651ab3e6e543805814bc\",\"kind\":\"frame\",\"seconds\":78.67}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.14,\"samples\":[0,5.11,10.11,15.31,20.75,25.09,30.08,35.07,40.07,45.09,50.04,55.03,60.31,65.26,70.26,75.27,77.14]},\"second\":{\"success\":true,\"seconds\":77.15,\"samples\":[0,5.27,10.22,15.19,20.19,25.19,30.3,35.3,40.29,45.27,50.28,55.27,60.24,65.25,70.24,75.28,77.15]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-ready.png\",\"sha256\":\"147ed7ccc440c154f93a632e2dcaf8ffd2429c06acd0d4271a8d4f6fbc35c9e3\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-complete.png\",\"sha256\":\"c423aab3c3e93e8c207250deec92cccb3f3897b73b1c631f8fc298330eb786b6\",\"kind\":\"frame\",\"seconds\":77.14}]}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:23:00.444Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.68,\"samples\":[0,5.08,10.1,15.04,20.04,25.12,30.1,35.13,40.1,45.13,50.1,55.02,60.28,65.24,70.23,75.26,78.68]},\"second\":{\"success\":true,\"seconds\":78.81,\"samples\":[0,5.31,10.29,15.26,20.29,25.02,30.06,35.07,40.05,45.03,50.04,55.02,60.31,65.02,70.03,75.04,78.81]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-ready.png\",\"sha256\":\"337bab93af155ec189242a8f7ede17eb5204745136572eca371746125e36ccc0\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t0.png\",\"sha256\":\"0391abff9b0aff26f1a51bbd2e068bd1a3be307da0fe92e995a8432c9d95b1f7\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t10.png\",\"sha256\":\"99bfb0891fc3131edec3f66915c54eb7c5a15321633c16d6c5fa76feb9877889\",\"kind\":\"frame\",\"seconds\":10.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t20.png\",\"sha256\":\"af67a0ef91117dae89d51a8dd768d69fd9e00dfda4b0df575df64e3f03a63343\",\"kind\":\"frame\",\"seconds\":20.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t30.png\",\"sha256\":\"47ebf3debd766243dfdd2b6c50580ad601049d4f1c4bceaf53135bdd6121effd\",\"kind\":\"frame\",\"seconds\":30.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t40.png\",\"sha256\":\"046d5061397bc93ce200284001c7b2d4fcca74726d0eb0956c255510fe5bc980\",\"kind\":\"frame\",\"seconds\":40.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t50.png\",\"sha256\":\"a82ed58c22ab21bae4154b4c8392e59a09317951d387fc6744d821d124ee4070\",\"kind\":\"frame\",\"seconds\":50.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t60.png\",\"sha256\":\"4a083af89a314d14e4c3a9cfcd29f98a4e4f0d583e4444a944b8c7034a8a30a7\",\"kind\":\"frame\",\"seconds\":60.28},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t70.png\",\"sha256\":\"e354acebf9db309d989caa87089dfa73dbb7e67188adeabc1fecc5afc3b28107\",\"kind\":\"frame\",\"seconds\":70.23},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-complete.png\",\"sha256\":\"5b56f66a7b39a7be2336bd458ae0a3b0a02938a83dedd466daf05354af25feda\",\"kind\":\"frame\",\"seconds\":78.68},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"74287c055fc798403c2cd87487a326bf9a9bfba4eb6826f19c0a870caa346ef4\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.66,\"samples\":[0,5.06,10.07,15.02,20.02,25.06,30.03,35.24,40.23,45.2,50.16,55.08,60.06,65.22,70.21,75.24,78.66]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.27,10.27,15.25,20.23,25.24,30.27,35.29,40.28,45.26,50.26,55.25,60.23,65.24,70.26,75.26,78.72]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-ready.png\",\"sha256\":\"3f725cd8d988d9ba28cdf511976dc09a51f79ff25872e39282edde94b691ec34\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t0.png\",\"sha256\":\"5f6951f769e4a757d92aa415569a74ea59a5fbfdefb6cc3117a275d8ab661545\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t10.png\",\"sha256\":\"468237e6b93569f412bf31dc4dcf5b51a89801a061c0162c340995414667d759\",\"kind\":\"frame\",\"seconds\":10.07},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t20.png\",\"sha256\":\"9c55e21057a41381e046e7695af3a0a1ba516786644a2b35598a310bd5deeeea\",\"kind\":\"frame\",\"seconds\":20.02},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t30.png\",\"sha256\":\"2100bcc746e26ba0cf43887969fe83306b950132c87e598ea6a6bf5c1edbb219\",\"kind\":\"frame\",\"seconds\":30.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t40.png\",\"sha256\":\"9e0005b9d6be1cd350539a0f96150cbb84e2e7afad651586f77229c2652d224a\",\"kind\":\"frame\",\"seconds\":40.23},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t50.png\",\"sha256\":\"241852280fbfe3269da1906356111dd4b2ac8103242191dde3e6d13be277de31\",\"kind\":\"frame\",\"seconds\":50.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t60.png\",\"sha256\":\"dfd2e7c527a83f64e4034e306b4d22364c9223c5ac94496e3b0044944f6bd530\",\"kind\":\"frame\",\"seconds\":60.06},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t70.png\",\"sha256\":\"b5cecc3f8748d1d3d4340b0429bad37a7bfe60332d5730c5728e859d8e08867d\",\"kind\":\"frame\",\"seconds\":70.21},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-complete.png\",\"sha256\":\"abe6b77281bbcd63e191631fc2abc40219079bdec627d95f2219643499ab7781\",\"kind\":\"frame\",\"seconds\":78.66},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"cb7336612c4beb5fb4a31be9a40ade2c5081f3cb4aff165eb081b584d778122e\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.67,\"samples\":[0,5.07,10.08,15.28,20.69,25.07,30.07,35.12,40.09,45.06,50.01,55.29,60.27,65.23,70.22,75.23,78.67]},\"second\":{\"success\":true,\"seconds\":78.79,\"samples\":[0,5.28,10.26,15.23,20.25,25.3,30.03,35.03,40.01,45.31,50.01,55.3,60.28,65.3,70.31,75.31,78.79]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-ready.png\",\"sha256\":\"948245301bb7c36961edd40b47cacf5da558e5b40a9ceb50766d5706361cbb72\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-complete.png\",\"sha256\":\"f74c23dd121704951606debe932f878764647b2009bd651ab3e6e543805814bc\",\"kind\":\"frame\",\"seconds\":78.67}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.14,\"samples\":[0,5.11,10.11,15.31,20.75,25.09,30.08,35.07,40.07,45.09,50.04,55.03,60.31,65.26,70.26,75.27,77.14]},\"second\":{\"success\":true,\"seconds\":77.15,\"samples\":[0,5.27,10.22,15.19,20.19,25.19,30.3,35.3,40.29,45.27,50.28,55.27,60.24,65.25,70.24,75.28,77.15]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-ready.png\",\"sha256\":\"147ed7ccc440c154f93a632e2dcaf8ffd2429c06acd0d4271a8d4f6fbc35c9e3\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-complete.png\",\"sha256\":\"c423aab3c3e93e8c207250deec92cccb3f3897b73b1c631f8fc298330eb786b6\",\"kind\":\"frame\",\"seconds\":77.14}]}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:23:00.444Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.68,\"samples\":[0,5.08,10.1,15.04,20.04,25.12,30.1,35.13,40.1,45.13,50.1,55.02,60.28,65.24,70.23,75.26,78.68]},\"second\":{\"success\":true,\"seconds\":78.81,\"samples\":[0,5.31,10.29,15.26,20.29,25.02,30.06,35.07,40.05,45.03,50.04,55.02,60.31,65.02,70.03,75.04,78.81]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-ready.png\",\"sha256\":\"337bab93af155ec189242a8f7ede17eb5204745136572eca371746125e36ccc0\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t0.png\",\"sha256\":\"0391abff9b0aff26f1a51bbd2e068bd1a3be307da0fe92e995a8432c9d95b1f7\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t10.png\",\"sha256\":\"99bfb0891fc3131edec3f66915c54eb7c5a15321633c16d6c5fa76feb9877889\",\"kind\":\"frame\",\"seconds\":10.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t20.png\",\"sha256\":\"af67a0ef91117dae89d51a8dd768d69fd9e00dfda4b0df575df64e3f03a63343\",\"kind\":\"frame\",\"seconds\":20.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t30.png\",\"sha256\":\"47ebf3debd766243dfdd2b6c50580ad601049d4f1c4bceaf53135bdd6121effd\",\"kind\":\"frame\",\"seconds\":30.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t40.png\",\"sha256\":\"046d5061397bc93ce200284001c7b2d4fcca74726d0eb0956c255510fe5bc980\",\"kind\":\"frame\",\"seconds\":40.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t50.png\",\"sha256\":\"a82ed58c22ab21bae4154b4c8392e59a09317951d387fc6744d821d124ee4070\",\"kind\":\"frame\",\"seconds\":50.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t60.png\",\"sha256\":\"4a083af89a314d14e4c3a9cfcd29f98a4e4f0d583e4444a944b8c7034a8a30a7\",\"kind\":\"frame\",\"seconds\":60.28},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t70.png\",\"sha256\":\"e354acebf9db309d989caa87089dfa73dbb7e67188adeabc1fecc5afc3b28107\",\"kind\":\"frame\",\"seconds\":70.23},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-complete.png\",\"sha256\":\"5b56f66a7b39a7be2336bd458ae0a3b0a02938a83dedd466daf05354af25feda\",\"kind\":\"frame\",\"seconds\":78.68},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"74287c055fc798403c2cd87487a326bf9a9bfba4eb6826f19c0a870caa346ef4\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.66,\"samples\":[0,5.06,10.07,15.02,20.02,25.06,30.03,35.24,40.23,45.2,50.16,55.08,60.06,65.22,70.21,75.24,78.66]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.27,10.27,15.25,20.23,25.24,30.27,35.29,40.28,45.26,50.26,55.25,60.23,65.24,70.26,75.26,78.72]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-ready.png\",\"sha256\":\"3f725cd8d988d9ba28cdf511976dc09a51f79ff25872e39282edde94b691ec34\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t0.png\",\"sha256\":\"5f6951f769e4a757d92aa415569a74ea59a5fbfdefb6cc3117a275d8ab661545\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t10.png\",\"sha256\":\"468237e6b93569f412bf31dc4dcf5b51a89801a061c0162c340995414667d759\",\"kind\":\"frame\",\"seconds\":10.07},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t20.png\",\"sha256\":\"9c55e21057a41381e046e7695af3a0a1ba516786644a2b35598a310bd5deeeea\",\"kind\":\"frame\",\"seconds\":20.02},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t30.png\",\"sha256\":\"2100bcc746e26ba0cf43887969fe83306b950132c87e598ea6a6bf5c1edbb219\",\"kind\":\"frame\",\"seconds\":30.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t40.png\",\"sha256\":\"9e0005b9d6be1cd350539a0f96150cbb84e2e7afad651586f77229c2652d224a\",\"kind\":\"frame\",\"seconds\":40.23},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t50.png\",\"sha256\":\"241852280fbfe3269da1906356111dd4b2ac8103242191dde3e6d13be277de31\",\"kind\":\"frame\",\"seconds\":50.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t60.png\",\"sha256\":\"dfd2e7c527a83f64e4034e306b4d22364c9223c5ac94496e3b0044944f6bd530\",\"kind\":\"frame\",\"seconds\":60.06},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t70.png\",\"sha256\":\"b5cecc3f8748d1d3d4340b0429bad37a7bfe60332d5730c5728e859d8e08867d\",\"kind\":\"frame\",\"seconds\":70.21},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-complete.png\",\"sha256\":\"abe6b77281bbcd63e191631fc2abc40219079bdec627d95f2219643499ab7781\",\"kind\":\"frame\",\"seconds\":78.66},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"cb7336612c4beb5fb4a31be9a40ade2c5081f3cb4aff165eb081b584d778122e\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.67,\"samples\":[0,5.07,10.08,15.28,20.69,25.07,30.07,35.12,40.09,45.06,50.01,55.29,60.27,65.23,70.22,75.23,78.67]},\"second\":{\"success\":true,\"seconds\":78.79,\"samples\":[0,5.28,10.26,15.23,20.25,25.3,30.03,35.03,40.01,45.31,50.01,55.3,60.28,65.3,70.31,75.31,78.79]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-ready.png\",\"sha256\":\"948245301bb7c36961edd40b47cacf5da558e5b40a9ceb50766d5706361cbb72\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-complete.png\",\"sha256\":\"f74c23dd121704951606debe932f878764647b2009bd651ab3e6e543805814bc\",\"kind\":\"frame\",\"seconds\":78.67}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.14,\"samples\":[0,5.11,10.11,15.31,20.75,25.09,30.08,35.07,40.07,45.09,50.04,55.03,60.31,65.26,70.26,75.27,77.14]},\"second\":{\"success\":true,\"seconds\":77.15,\"samples\":[0,5.27,10.22,15.19,20.19,25.19,30.3,35.3,40.29,45.27,50.28,55.27,60.24,65.25,70.24,75.28,77.15]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-ready.png\",\"sha256\":\"147ed7ccc440c154f93a632e2dcaf8ffd2429c06acd0d4271a8d4f6fbc35c9e3\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-complete.png\",\"sha256\":\"c423aab3c3e93e8c207250deec92cccb3f3897b73b1c631f8fc298330eb786b6\",\"kind\":\"frame\",\"seconds\":77.14}]}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v3",
    "at": "2026-10-11T07:23:00.445Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "b1adc95ef2314b486fdeaebfefffddb3f06e7756c3e34c1e59074c86a42a1fdd",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"44ace925afc177168d55a0190543065be682e6fd5152c3058daec8c4dfcaa3ff\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.68,\"samples\":[0,5.08,10.1,15.04,20.04,25.12,30.1,35.13,40.1,45.13,50.1,55.02,60.28,65.24,70.23,75.26,78.68]},\"second\":{\"success\":true,\"seconds\":78.81,\"samples\":[0,5.31,10.29,15.26,20.29,25.02,30.06,35.07,40.05,45.03,50.04,55.02,60.31,65.02,70.03,75.04,78.81]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-ready.png\",\"sha256\":\"337bab93af155ec189242a8f7ede17eb5204745136572eca371746125e36ccc0\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t0.png\",\"sha256\":\"0391abff9b0aff26f1a51bbd2e068bd1a3be307da0fe92e995a8432c9d95b1f7\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t10.png\",\"sha256\":\"99bfb0891fc3131edec3f66915c54eb7c5a15321633c16d6c5fa76feb9877889\",\"kind\":\"frame\",\"seconds\":10.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t20.png\",\"sha256\":\"af67a0ef91117dae89d51a8dd768d69fd9e00dfda4b0df575df64e3f03a63343\",\"kind\":\"frame\",\"seconds\":20.04},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t30.png\",\"sha256\":\"47ebf3debd766243dfdd2b6c50580ad601049d4f1c4bceaf53135bdd6121effd\",\"kind\":\"frame\",\"seconds\":30.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t40.png\",\"sha256\":\"046d5061397bc93ce200284001c7b2d4fcca74726d0eb0956c255510fe5bc980\",\"kind\":\"frame\",\"seconds\":40.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t50.png\",\"sha256\":\"a82ed58c22ab21bae4154b4c8392e59a09317951d387fc6744d821d124ee4070\",\"kind\":\"frame\",\"seconds\":50.1},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t60.png\",\"sha256\":\"4a083af89a314d14e4c3a9cfcd29f98a4e4f0d583e4444a944b8c7034a8a30a7\",\"kind\":\"frame\",\"seconds\":60.28},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-t70.png\",\"sha256\":\"e354acebf9db309d989caa87089dfa73dbb7e67188adeabc1fecc5afc3b28107\",\"kind\":\"frame\",\"seconds\":70.23},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-complete.png\",\"sha256\":\"5b56f66a7b39a7be2336bd458ae0a3b0a02938a83dedd466daf05354af25feda\",\"kind\":\"frame\",\"seconds\":78.68},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-desktop-timeline.webm\",\"sha256\":\"74287c055fc798403c2cd87487a326bf9a9bfba4eb6826f19c0a870caa346ef4\",\"kind\":\"video\"}]},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.66,\"samples\":[0,5.06,10.07,15.02,20.02,25.06,30.03,35.24,40.23,45.2,50.16,55.08,60.06,65.22,70.21,75.24,78.66]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.27,10.27,15.25,20.23,25.24,30.27,35.29,40.28,45.26,50.26,55.25,60.23,65.24,70.26,75.26,78.72]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-ready.png\",\"sha256\":\"3f725cd8d988d9ba28cdf511976dc09a51f79ff25872e39282edde94b691ec34\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t0.png\",\"sha256\":\"5f6951f769e4a757d92aa415569a74ea59a5fbfdefb6cc3117a275d8ab661545\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t10.png\",\"sha256\":\"468237e6b93569f412bf31dc4dcf5b51a89801a061c0162c340995414667d759\",\"kind\":\"frame\",\"seconds\":10.07},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t20.png\",\"sha256\":\"9c55e21057a41381e046e7695af3a0a1ba516786644a2b35598a310bd5deeeea\",\"kind\":\"frame\",\"seconds\":20.02},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t30.png\",\"sha256\":\"2100bcc746e26ba0cf43887969fe83306b950132c87e598ea6a6bf5c1edbb219\",\"kind\":\"frame\",\"seconds\":30.03},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t40.png\",\"sha256\":\"9e0005b9d6be1cd350539a0f96150cbb84e2e7afad651586f77229c2652d224a\",\"kind\":\"frame\",\"seconds\":40.23},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t50.png\",\"sha256\":\"241852280fbfe3269da1906356111dd4b2ac8103242191dde3e6d13be277de31\",\"kind\":\"frame\",\"seconds\":50.16},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t60.png\",\"sha256\":\"dfd2e7c527a83f64e4034e306b4d22364c9223c5ac94496e3b0044944f6bd530\",\"kind\":\"frame\",\"seconds\":60.06},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-t70.png\",\"sha256\":\"b5cecc3f8748d1d3d4340b0429bad37a7bfe60332d5730c5728e859d8e08867d\",\"kind\":\"frame\",\"seconds\":70.21},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-complete.png\",\"sha256\":\"abe6b77281bbcd63e191631fc2abc40219079bdec627d95f2219643499ab7781\",\"kind\":\"frame\",\"seconds\":78.66},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-mobile-timeline.webm\",\"sha256\":\"cb7336612c4beb5fb4a31be9a40ade2c5081f3cb4aff165eb081b584d778122e\",\"kind\":\"video\"}]},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.67,\"samples\":[0,5.07,10.08,15.28,20.69,25.07,30.07,35.12,40.09,45.06,50.01,55.29,60.27,65.23,70.22,75.23,78.67]},\"second\":{\"success\":true,\"seconds\":78.79,\"samples\":[0,5.28,10.26,15.23,20.25,25.3,30.03,35.03,40.01,45.31,50.01,55.3,60.28,65.3,70.31,75.31,78.79]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-ready.png\",\"sha256\":\"948245301bb7c36961edd40b47cacf5da558e5b40a9ceb50766d5706361cbb72\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-dpr2-complete.png\",\"sha256\":\"f74c23dd121704951606debe932f878764647b2009bd651ab3e6e543805814bc\",\"kind\":\"frame\",\"seconds\":78.67}]},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.14,\"samples\":[0,5.11,10.11,15.31,20.75,25.09,30.08,35.07,40.07,45.09,50.04,55.03,60.31,65.26,70.26,75.27,77.14]},\"second\":{\"success\":true,\"seconds\":77.15,\"samples\":[0,5.27,10.22,15.19,20.19,25.19,30.3,35.3,40.29,45.27,50.28,55.27,60.24,65.25,70.24,75.28,77.15]},\"files\":[{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-ready.png\",\"sha256\":\"147ed7ccc440c154f93a632e2dcaf8ffd2429c06acd0d4271a8d4f6fbc35c9e3\",\"kind\":\"frame\",\"seconds\":0},{\"path\":\"assets/evidence/01-rocket-launch/v1/20261011071227453/gpt-6-1-sol-xhigh-reduced-complete.png\",\"sha256\":\"c423aab3c3e93e8c207250deec92cccb3f3897b73b1c631f8fc298330eb786b6\",\"kind\":\"frame\",\"seconds\":77.14}]}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
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
