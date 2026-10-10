# 01 · 火箭发射动画：评测（Prompt v2）

- **Prompt**：[prompt-v2.md](../../../prompts/01-rocket-launch/prompt-v2.md)
- **评测协议**：2
- **标准冻结日期**：2026-10-10
- **评测日期**：未完成人工复核
- **评测者**：统一脚本检查；人工复核者尚未登记
- **评测方式**：核心验收与细节覆盖分离；视觉质量采用匿名成对比较，不再输出加权总分。历史 AI 分数不参与当前结论。
- **评测环境**：自动检查使用本机 Chrome、真实时钟；桌面 1440×900 / 手机 390×844，DPR 1、DPR 2、减少动态模式。具体版本和实测范围写在验收证据内；不宣称验证实体 60/120Hz 屏幕或音效听感。

## 协议说明

本次先冻结新标准，再对全部四份原始产物统一复核。旧记录完整保留在历史章节，不将旧“通过”迁移为新协议结论。Prompt 与产物不变。

- 验收状态为 pass（通过）、partial（部分做到）、fail（未通过）、pending（待确认）。未测、不可判断、证据不足均为 pending，不折算为零分或半分。
- core 项任一 fail 即核心未通过；没有 fail 但有 pending 则待确认；全部已确认但含 partial 则核心部分做到；所有 core 项 pass 才算核心通过。detail 项独立展示，不抵消核心失败。
- 每条非 pending 结论必须有证据、检查者、时间、原始产物 SHA-256 和标准指纹。代码存在不等于画面可见；文字成功提示不等于完成所有视觉阶段。
- 自动检查采用统一环境及同一脚本，真实时钟完整运行并复发；截图只证明采样时刻，不证明每一帧无闪烁或真实设备性能。
- 人工复核先完整观看至少两遍，再逐项填写观察依据。视觉证据应注明点击后的秒数、阶段、视口及可见现象。精细要求允许部分做到，但核心功能缺失不得用精美画面抵消。
- 匿名会话随机产物顺序、随机比较顺序和左右位置；每个维度允许左优、右优、持平、无法判断。封存前不展示身份和历史分数。匿名声明是评测者自述，不能保证评测者此前未见产物或从画面认不出来源。
- 不同人工评测者或视口结论冲突时，该项回到 pending，保留双方证据，先复核再下结论。同一评测者、同一视口后续记录更新其旧结论，不同视口不相互覆盖。人工比较同一评测者、同一视口只汇总最新完整会话，旧会话保留，不重复计票。
- 只有两边均核心通过的人工比较计入正式维度统计；其余比较保留但不纳入。仅报胜 / 负 / 平 / 无法判断次数，不计算跨维度或跨实验总榜。单次生成和单评测者不是统计显著的模型能力排名。
- AI 可协助找证据，不能冒充人工。未来使用多 AI 评测者时，每个评测者必须独立评完整批产物，不读取旧分数，再由人工裁决分歧。

## 验收标准

| ID | 级别 | 方法 | 要求 | 验证方式 |
|---|---|---|---|---|
| standalone | core | auto | 单个自包含 HTML | 扫描 DOM 资源与 CSS 引用，并拦截完整运行及复发期间的资源请求；不替代休眠分支审计 |
| runtime | core | auto | 点火后能到达成功状态 | 四种固定环境真实运行，120 秒内出现可见入轨成功提示；视觉阶段另由人工验收 |
| replay | core | auto | 可复位并再次发射成功 | 每种环境成功后复位，成功提示消失，再点火跑到成功 |
| console | core | auto | 无运行异常 | 收集加载、两次全程中的 pageerror 与 console.error；排除 favicon 404 |
| viewport | core | auto | 桌面与手机无页面滚动条 | 待命、每 5 秒及成功时检查 document 与 body 的滚动范围 |
| rocket | core | human | 可辨认的两级液体运载火箭 | 待命及分离阶段能辨认主体分段，不仅看源码 |
| liftoff | core | human | 火箭确实离开发射台 | 完整观看点火及离台过程，不只核对文字 |
| staging | core | human | 一级关机并与二级分离 | 观察关机、滑行、分离及脱落一级 |
| second-engine | core | human | 二级点火继续飞行 | 观察分离后的二级尾焰 |
| fairing | core | human | 两瓣整流罩脱落 | 观察展开、脱落及卫星显露 |
| orbit | core | human | 到达地球轨道场景 | 观察弧形地球及轨道画面，不只看成功提示 |
| deployment | core | human | 卫星从二级脱离 | 观察星箭分离 |
| solar-panels | core | human | 卫星展开两块太阳能板 | 观察展开过程而非单张静态成品 |
| continuous | core | human | 全程无明显黑屏或阶段跳断 | 两遍完整观看；记录可复现的时刻及环境 |
| mobile-controls | core | human | 手机竖屏按钮和遥测可辨认可用 | 390×844 查看点火、复位及关键阶段；缩放预览不证明实体手机体验 |
| proportions | detail | human | 箭长约直径 12 倍 | 待命画面测量估计比例 |
| framing | detail | human | 待命火箭占画面高度一半以上 | 在桌面待命画面估计高度 |
| fins | detail | human | 四片收拢栅格舵 | 画面逐个定位；不可见则注明 |
| legs | detail | human | 四条收起着陆支腿 | 画面逐个定位 |
| nozzles | detail | human | 至少三个钟形喷管 | 发动机舱可见部分核对数量 |
| metal | detail | human | 圆柱明暗与金属高光 | 放大核对明暗及材质 |
| seams | detail | human | 焊缝、面板缝与铆钉可辨 | 分别定位，缺少部分记 partial 并指明 |
| soot | detail | human | 发动机舱烟熏痕迹 | 待命放大核对 |
| frost | detail | human | 液氧段白霜可见 | 不以源码或改变对比度后的画面代替正常观看 |
| vapor | detail | human | 侧面持续冒白汽并散开 | 观看待命动态 |
| fictional | detail | human | 虚构任务名称、编号和徽标 | 核对画面，不能有真实机构标志 |
| illumination | detail | human | 受光背光与暖色泛光灯对应 | 核对光源方向和箭体落光 |
| dawn | detail | human | 黎明天空及云边缘光 | 待命核对天空、云与星星 |
| pad | detail | human | 发射台和导流槽可辨 | 待命核对结构 |
| landscape | detail | human | 远景场地和雾层可辨 | 核对地形、储罐及纵深 |
| tower | detail | human | 勤务塔结构与障碍灯可辨 | 核对平台、爬梯与闪灯 |
| countdown | detail | human | T-10 倒计时 | 点火后核对初始倒计时 |
| deluge | detail | human | T-7 两侧白色水汽 | 核对时刻及两侧水幕 |
| umbilicals | detail | human | 脐带臂依次摆开 | 核对不是同时消失 |
| ignition | detail | human | 小火苗汇成分层火柱 | 观看点火变化及颜色层次 |
| split-flame | detail | human | 导流槽排焰劈向两侧 | 正常帧率下观看两侧而非仅代码逻辑 |
| ground-smoke | detail | human | 烟云贴地扩散遮住底部 | 观看点火及初段 |
| fire-light | detail | human | 火光映亮环境并随火焰闪动 | 核对塔架、云底、台面和箭体 |
| weight | detail | human | 前 2–3 秒缓慢抬升再加速 | 真实时钟观察位移变化 |
| turn | detail | human | 离塔后平滑重力转弯 | 观察姿态连续性 |
| tracking | detail | human | 跟随镜头中火箭偏下 | 核对飞行构图 |
| mach-disks | detail | human | 低空尾焰菱形马赫盘可见 | 正常观看或放大定位，不只看绘制函数 |
| plume-altitude | detail | human | 尾焰随高度变长变宽变淡 | 比较低空、高空及真空阶段 |
| trail | detail | human | 低空浓密尾迹随风弯曲扩散 | 观看时序变化 |
| sky-transition | detail | human | 穿云、天空变暗及星空出现 | 核对变化连续性 |
| max-q | detail | human | Max-Q 云环和短暂抖动可見 | 观看该阶段，不只看遥测文字 |
| earth-details | detail | human | 地球陆地、云、大气边缘和昼夜可辨 | 核对入轨细节；缺失部分注明 |
| final-camera | detail | human | 收尾拉远并平静下来 | 观看部署后的镜头及动作 |
| telemetry | detail | human | 遥测连续且与画面一致 | 核对各阶段及约 400 km / 7.7 km/s 最终值 |
| timing | detail | human | 各段及总时长符合 Prompt | 真实计时离台、入轨、收尾；分别记录 12–15 / 40–50 / 10–20 / 60–90 秒 |
| reduced-motion | detail | human | 减少动态时震动闪烁明显减弱 | 对照同阶段普通与减少动态画面；脚本只检查该模式能运行 |
| high-dpr | detail | human | 高分屏画面清晰 | DPR 2 下放大核对；不能把画布尺寸当清晰度证据 |
| physical-refresh | detail | human | 实体 60/120Hz 播放速度一致 | 实体设备真实计时；无设备即 pending，虚拟时间不可替代 |

## 比较维度

| ID | 维度 | 观察重点 |
|---|---|---|
| realism | 写实与材质 | 结构比例、金属、光照与地球细节；不把信息量多等同真实 |
| effects | 火焰与烟雾 | 体积感、湍流、层次及环境联动 |
| camera | 镜头与运动 | 重量感、加速、构图及阶段连续性 |

## 验收记录

脚本与人工导入只更新此记录块。无记录的检查保持 pending；正式记录绑定原始产物与冻结标准。

```json
[
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:41:30.369Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":70.12,\"samples\":[0.01,5.06,10.08,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.31,\"samples\":[0,5.3,10.28,15.28,20.26,25.27,30.31,35.29,40.29,45.29,50.27,55.28,60.26,65.26]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.94,\"samples\":[0,5.06,10.09,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.28,\"samples\":[0,5.3,10.29,15.25,20.23,25.25,30.28,35.27,40.26,45.26,50.25,55.26,60.24,65.24]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.94,\"samples\":[0.01,5.06,10.08,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.3,\"samples\":[0,5.29,10.28,15.26,20.25,25.26,30.29,35.28,40.27,45.27,50.26,55.27,60.26,65.25]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.01,\"samples\":[0.01,5.06,10.09,15.11,20.1,25.12,30.18,35.2,40.21,45.23,50.23,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":68.93,\"samples\":[0,5.28,10.28,15.28,20.26,25.27,30.27,35.26,40.22,45.21,50.21,55.19,60.19,65.18]}}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:41:30.370Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":70.12,\"samples\":[0.01,5.06,10.08,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.31,\"samples\":[0,5.3,10.28,15.28,20.26,25.27,30.31,35.29,40.29,45.29,50.27,55.28,60.26,65.26]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.94,\"samples\":[0,5.06,10.09,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.28,\"samples\":[0,5.3,10.29,15.25,20.23,25.25,30.28,35.27,40.26,45.26,50.25,55.26,60.24,65.24]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.94,\"samples\":[0.01,5.06,10.08,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.3,\"samples\":[0,5.29,10.28,15.26,20.25,25.26,30.29,35.28,40.27,45.27,50.26,55.27,60.26,65.25]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.01,\"samples\":[0.01,5.06,10.09,15.11,20.1,25.12,30.18,35.2,40.21,45.23,50.23,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":68.93,\"samples\":[0,5.28,10.28,15.28,20.26,25.27,30.27,35.26,40.22,45.21,50.21,55.19,60.19,65.18]}}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:41:30.370Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":70.12,\"samples\":[0.01,5.06,10.08,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.31,\"samples\":[0,5.3,10.28,15.28,20.26,25.27,30.31,35.29,40.29,45.29,50.27,55.28,60.26,65.26]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.94,\"samples\":[0,5.06,10.09,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.28,\"samples\":[0,5.3,10.29,15.25,20.23,25.25,30.28,35.27,40.26,45.26,50.25,55.26,60.24,65.24]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.94,\"samples\":[0.01,5.06,10.08,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.3,\"samples\":[0,5.29,10.28,15.26,20.25,25.26,30.29,35.28,40.27,45.27,50.26,55.27,60.26,65.25]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.01,\"samples\":[0.01,5.06,10.09,15.11,20.1,25.12,30.18,35.2,40.21,45.23,50.23,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":68.93,\"samples\":[0,5.28,10.28,15.28,20.26,25.27,30.27,35.26,40.22,45.21,50.21,55.19,60.19,65.18]}}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:41:30.370Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":70.12,\"samples\":[0.01,5.06,10.08,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.31,\"samples\":[0,5.3,10.28,15.28,20.26,25.27,30.31,35.29,40.29,45.29,50.27,55.28,60.26,65.26]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.94,\"samples\":[0,5.06,10.09,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.28,\"samples\":[0,5.3,10.29,15.25,20.23,25.25,30.28,35.27,40.26,45.26,50.25,55.26,60.24,65.24]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.94,\"samples\":[0.01,5.06,10.08,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.3,\"samples\":[0,5.29,10.28,15.26,20.25,25.26,30.29,35.28,40.27,45.27,50.26,55.27,60.26,65.25]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.01,\"samples\":[0.01,5.06,10.09,15.11,20.1,25.12,30.18,35.2,40.21,45.23,50.23,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":68.93,\"samples\":[0,5.28,10.28,15.28,20.26,25.27,30.27,35.26,40.22,45.21,50.21,55.19,60.19,65.18]}}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:41:30.370Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":70.12,\"samples\":[0.01,5.06,10.08,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.31,\"samples\":[0,5.3,10.28,15.28,20.26,25.27,30.31,35.29,40.29,45.29,50.27,55.28,60.26,65.26]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.94,\"samples\":[0,5.06,10.09,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.28,\"samples\":[0,5.3,10.29,15.25,20.23,25.25,30.28,35.27,40.26,45.26,50.25,55.26,60.24,65.24]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.94,\"samples\":[0.01,5.06,10.08,15.11,20.09,25.11,30.17,35.19,40.21,45.22,50.22,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":69.3,\"samples\":[0,5.29,10.28,15.26,20.25,25.26,30.29,35.28,40.27,45.27,50.26,55.27,60.26,65.25]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.01,\"samples\":[0.01,5.06,10.09,15.11,20.1,25.12,30.18,35.2,40.21,45.23,50.23,55.2,60.19,65.18]},\"second\":{\"success\":true,\"seconds\":68.93,\"samples\":[0,5.28,10.28,15.28,20.26,25.27,30.27,35.26,40.22,45.21,50.21,55.19,60.19,65.18]}}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:44:13.078Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.95,\"samples\":[0.01,5.04,10.09,15.15,20.16,25.16,30.21,35.23,40.3,45.31,50.3,55.31,60.01,65.03,70.06,75.05]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.03,10.06,15.07,20.16,25.2,30.26,35.3,40.03,45.08,50.1,55.1,60.12,65.11,70.08,75.08]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.7,\"samples\":[0.01,5.31,10.3,15.27,20.28,25.28,30.01,35.03,40.05,45.07,50.05,55.06,60.08,65.1,70.13,75.12]},\"second\":{\"success\":true,\"seconds\":77.22,\"samples\":[0,5.31,10.01,15.03,20.09,25.17,30.22,35.25,40.3,45.03,50.07,55.06,60.07,65.08,70.05,75.03]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.07,10.12,15.17,20.19,25.19,30.24,35.26,40.33,45.02,50,55.02,60.03,65.06,70.09,75.08]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.02,10.05,15.07,20.16,25.2,30.25,35.29,40.03,45.07,50.09,55.09,60.11,65.1,70.07,75.07]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.06,10.12,15.17,20.18,25.19,30.24,35.25,40.32,45.02,50.32,55.02,60.03,65.05,70.08,75.07]},\"second\":{\"success\":true,\"seconds\":77.27,\"samples\":[0,5.05,10.07,15.09,20.18,25.22,30.28,35.32,40.05,45.09,50.12,55.12,60.13,65.12,70.09,75.1]}}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:44:13.078Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.95,\"samples\":[0.01,5.04,10.09,15.15,20.16,25.16,30.21,35.23,40.3,45.31,50.3,55.31,60.01,65.03,70.06,75.05]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.03,10.06,15.07,20.16,25.2,30.26,35.3,40.03,45.08,50.1,55.1,60.12,65.11,70.08,75.08]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.7,\"samples\":[0.01,5.31,10.3,15.27,20.28,25.28,30.01,35.03,40.05,45.07,50.05,55.06,60.08,65.1,70.13,75.12]},\"second\":{\"success\":true,\"seconds\":77.22,\"samples\":[0,5.31,10.01,15.03,20.09,25.17,30.22,35.25,40.3,45.03,50.07,55.06,60.07,65.08,70.05,75.03]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.07,10.12,15.17,20.19,25.19,30.24,35.26,40.33,45.02,50,55.02,60.03,65.06,70.09,75.08]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.02,10.05,15.07,20.16,25.2,30.25,35.29,40.03,45.07,50.09,55.09,60.11,65.1,70.07,75.07]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.06,10.12,15.17,20.18,25.19,30.24,35.25,40.32,45.02,50.32,55.02,60.03,65.05,70.08,75.07]},\"second\":{\"success\":true,\"seconds\":77.27,\"samples\":[0,5.05,10.07,15.09,20.18,25.22,30.28,35.32,40.05,45.09,50.12,55.12,60.13,65.12,70.09,75.1]}}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:44:13.078Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.95,\"samples\":[0.01,5.04,10.09,15.15,20.16,25.16,30.21,35.23,40.3,45.31,50.3,55.31,60.01,65.03,70.06,75.05]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.03,10.06,15.07,20.16,25.2,30.26,35.3,40.03,45.08,50.1,55.1,60.12,65.11,70.08,75.08]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.7,\"samples\":[0.01,5.31,10.3,15.27,20.28,25.28,30.01,35.03,40.05,45.07,50.05,55.06,60.08,65.1,70.13,75.12]},\"second\":{\"success\":true,\"seconds\":77.22,\"samples\":[0,5.31,10.01,15.03,20.09,25.17,30.22,35.25,40.3,45.03,50.07,55.06,60.07,65.08,70.05,75.03]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.07,10.12,15.17,20.19,25.19,30.24,35.26,40.33,45.02,50,55.02,60.03,65.06,70.09,75.08]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.02,10.05,15.07,20.16,25.2,30.25,35.29,40.03,45.07,50.09,55.09,60.11,65.1,70.07,75.07]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.06,10.12,15.17,20.18,25.19,30.24,35.25,40.32,45.02,50.32,55.02,60.03,65.05,70.08,75.07]},\"second\":{\"success\":true,\"seconds\":77.27,\"samples\":[0,5.05,10.07,15.09,20.18,25.22,30.28,35.32,40.05,45.09,50.12,55.12,60.13,65.12,70.09,75.1]}}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:44:13.078Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.95,\"samples\":[0.01,5.04,10.09,15.15,20.16,25.16,30.21,35.23,40.3,45.31,50.3,55.31,60.01,65.03,70.06,75.05]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.03,10.06,15.07,20.16,25.2,30.26,35.3,40.03,45.08,50.1,55.1,60.12,65.11,70.08,75.08]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.7,\"samples\":[0.01,5.31,10.3,15.27,20.28,25.28,30.01,35.03,40.05,45.07,50.05,55.06,60.08,65.1,70.13,75.12]},\"second\":{\"success\":true,\"seconds\":77.22,\"samples\":[0,5.31,10.01,15.03,20.09,25.17,30.22,35.25,40.3,45.03,50.07,55.06,60.07,65.08,70.05,75.03]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.07,10.12,15.17,20.19,25.19,30.24,35.26,40.33,45.02,50,55.02,60.03,65.06,70.09,75.08]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.02,10.05,15.07,20.16,25.2,30.25,35.29,40.03,45.07,50.09,55.09,60.11,65.1,70.07,75.07]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.06,10.12,15.17,20.18,25.19,30.24,35.25,40.32,45.02,50.32,55.02,60.03,65.05,70.08,75.07]},\"second\":{\"success\":true,\"seconds\":77.27,\"samples\":[0,5.05,10.07,15.09,20.18,25.22,30.28,35.32,40.05,45.09,50.12,55.12,60.13,65.12,70.09,75.1]}}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:44:13.078Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.95,\"samples\":[0.01,5.04,10.09,15.15,20.16,25.16,30.21,35.23,40.3,45.31,50.3,55.31,60.01,65.03,70.06,75.05]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.03,10.06,15.07,20.16,25.2,30.26,35.3,40.03,45.08,50.1,55.1,60.12,65.11,70.08,75.08]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.7,\"samples\":[0.01,5.31,10.3,15.27,20.28,25.28,30.01,35.03,40.05,45.07,50.05,55.06,60.08,65.1,70.13,75.12]},\"second\":{\"success\":true,\"seconds\":77.22,\"samples\":[0,5.31,10.01,15.03,20.09,25.17,30.22,35.25,40.3,45.03,50.07,55.06,60.07,65.08,70.05,75.03]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.07,10.12,15.17,20.19,25.19,30.24,35.26,40.33,45.02,50,55.02,60.03,65.06,70.09,75.08]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.02,10.05,15.07,20.16,25.2,30.25,35.29,40.03,45.07,50.09,55.09,60.11,65.1,70.07,75.07]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.06,10.12,15.17,20.18,25.19,30.24,35.25,40.32,45.02,50.32,55.02,60.03,65.05,70.08,75.07]},\"second\":{\"success\":true,\"seconds\":77.27,\"samples\":[0,5.05,10.07,15.09,20.18,25.22,30.28,35.32,40.05,45.09,50.12,55.12,60.13,65.12,70.09,75.1]}}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:46:48.328Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.76,\"samples\":[0,5.02,10.02,15.03,20.04,25.07,30.09,35.13,40.17,45.19,50.24,55.23,60.31,65.03,70.05]},\"second\":{\"success\":true,\"seconds\":74.68,\"samples\":[0,5.02,10.01,15.06,20.08,25.14,30.14,35.15,40.19,45.24,50.26,55.25,60.27,65.29,70.3]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.78,\"samples\":[0,5.04,10.04,15.05,20.06,25.09,30.12,35.16,40.19,45.22,50.26,55.26,60.01,65.06,70.08]},\"second\":{\"success\":true,\"seconds\":74.65,\"samples\":[0,5.3,10.29,15.03,20.05,25.1,30.11,35.12,40.16,45.21,50.23,55.22,60.24,65.26,70.27]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.78,\"samples\":[0,5.04,10.04,15.05,20.06,25.09,30.11,35.15,40.19,45.21,50.26,55.25,60.32,65.05,70.07]},\"second\":{\"success\":true,\"seconds\":74.66,\"samples\":[0,5.31,10.3,15.03,20.06,25.11,30.12,35.13,40.17,45.21,50.24,55.23,60.25,65.27,70.28]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.17,\"samples\":[0,5.04,10.05,15.05,20.07,25.1,30.12,35.16,40.2,45.22,50.27,55.26,60.01,65.06,70.08]},\"second\":{\"success\":true,\"seconds\":74.32,\"samples\":[0,5.28,10.28,15.02,20.03,25.09,30.1,35.1,40.14,45.19,50.2,55.21,60.22,65.24,70.26]}}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:46:48.329Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.76,\"samples\":[0,5.02,10.02,15.03,20.04,25.07,30.09,35.13,40.17,45.19,50.24,55.23,60.31,65.03,70.05]},\"second\":{\"success\":true,\"seconds\":74.68,\"samples\":[0,5.02,10.01,15.06,20.08,25.14,30.14,35.15,40.19,45.24,50.26,55.25,60.27,65.29,70.3]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.78,\"samples\":[0,5.04,10.04,15.05,20.06,25.09,30.12,35.16,40.19,45.22,50.26,55.26,60.01,65.06,70.08]},\"second\":{\"success\":true,\"seconds\":74.65,\"samples\":[0,5.3,10.29,15.03,20.05,25.1,30.11,35.12,40.16,45.21,50.23,55.22,60.24,65.26,70.27]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.78,\"samples\":[0,5.04,10.04,15.05,20.06,25.09,30.11,35.15,40.19,45.21,50.26,55.25,60.32,65.05,70.07]},\"second\":{\"success\":true,\"seconds\":74.66,\"samples\":[0,5.31,10.3,15.03,20.06,25.11,30.12,35.13,40.17,45.21,50.24,55.23,60.25,65.27,70.28]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.17,\"samples\":[0,5.04,10.05,15.05,20.07,25.1,30.12,35.16,40.2,45.22,50.27,55.26,60.01,65.06,70.08]},\"second\":{\"success\":true,\"seconds\":74.32,\"samples\":[0,5.28,10.28,15.02,20.03,25.09,30.1,35.1,40.14,45.19,50.2,55.21,60.22,65.24,70.26]}}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:46:48.329Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.76,\"samples\":[0,5.02,10.02,15.03,20.04,25.07,30.09,35.13,40.17,45.19,50.24,55.23,60.31,65.03,70.05]},\"second\":{\"success\":true,\"seconds\":74.68,\"samples\":[0,5.02,10.01,15.06,20.08,25.14,30.14,35.15,40.19,45.24,50.26,55.25,60.27,65.29,70.3]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.78,\"samples\":[0,5.04,10.04,15.05,20.06,25.09,30.12,35.16,40.19,45.22,50.26,55.26,60.01,65.06,70.08]},\"second\":{\"success\":true,\"seconds\":74.65,\"samples\":[0,5.3,10.29,15.03,20.05,25.1,30.11,35.12,40.16,45.21,50.23,55.22,60.24,65.26,70.27]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.78,\"samples\":[0,5.04,10.04,15.05,20.06,25.09,30.11,35.15,40.19,45.21,50.26,55.25,60.32,65.05,70.07]},\"second\":{\"success\":true,\"seconds\":74.66,\"samples\":[0,5.31,10.3,15.03,20.06,25.11,30.12,35.13,40.17,45.21,50.24,55.23,60.25,65.27,70.28]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.17,\"samples\":[0,5.04,10.05,15.05,20.07,25.1,30.12,35.16,40.2,45.22,50.27,55.26,60.01,65.06,70.08]},\"second\":{\"success\":true,\"seconds\":74.32,\"samples\":[0,5.28,10.28,15.02,20.03,25.09,30.1,35.1,40.14,45.19,50.2,55.21,60.22,65.24,70.26]}}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:46:48.329Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.76,\"samples\":[0,5.02,10.02,15.03,20.04,25.07,30.09,35.13,40.17,45.19,50.24,55.23,60.31,65.03,70.05]},\"second\":{\"success\":true,\"seconds\":74.68,\"samples\":[0,5.02,10.01,15.06,20.08,25.14,30.14,35.15,40.19,45.24,50.26,55.25,60.27,65.29,70.3]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.78,\"samples\":[0,5.04,10.04,15.05,20.06,25.09,30.12,35.16,40.19,45.22,50.26,55.26,60.01,65.06,70.08]},\"second\":{\"success\":true,\"seconds\":74.65,\"samples\":[0,5.3,10.29,15.03,20.05,25.1,30.11,35.12,40.16,45.21,50.23,55.22,60.24,65.26,70.27]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.78,\"samples\":[0,5.04,10.04,15.05,20.06,25.09,30.11,35.15,40.19,45.21,50.26,55.25,60.32,65.05,70.07]},\"second\":{\"success\":true,\"seconds\":74.66,\"samples\":[0,5.31,10.3,15.03,20.06,25.11,30.12,35.13,40.17,45.21,50.24,55.23,60.25,65.27,70.28]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.17,\"samples\":[0,5.04,10.05,15.05,20.07,25.1,30.12,35.16,40.2,45.22,50.27,55.26,60.01,65.06,70.08]},\"second\":{\"success\":true,\"seconds\":74.32,\"samples\":[0,5.28,10.28,15.02,20.03,25.09,30.1,35.1,40.14,45.19,50.2,55.21,60.22,65.24,70.26]}}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:46:48.329Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.76,\"samples\":[0,5.02,10.02,15.03,20.04,25.07,30.09,35.13,40.17,45.19,50.24,55.23,60.31,65.03,70.05]},\"second\":{\"success\":true,\"seconds\":74.68,\"samples\":[0,5.02,10.01,15.06,20.08,25.14,30.14,35.15,40.19,45.24,50.26,55.25,60.27,65.29,70.3]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.78,\"samples\":[0,5.04,10.04,15.05,20.06,25.09,30.12,35.16,40.19,45.22,50.26,55.26,60.01,65.06,70.08]},\"second\":{\"success\":true,\"seconds\":74.65,\"samples\":[0,5.3,10.29,15.03,20.05,25.1,30.11,35.12,40.16,45.21,50.23,55.22,60.24,65.26,70.27]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.78,\"samples\":[0,5.04,10.04,15.05,20.06,25.09,30.11,35.15,40.19,45.21,50.26,55.25,60.32,65.05,70.07]},\"second\":{\"success\":true,\"seconds\":74.66,\"samples\":[0,5.31,10.3,15.03,20.06,25.11,30.12,35.13,40.17,45.21,50.24,55.23,60.25,65.27,70.28]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.17,\"samples\":[0,5.04,10.05,15.05,20.07,25.1,30.12,35.16,40.2,45.22,50.27,55.26,60.01,65.06,70.08]},\"second\":{\"success\":true,\"seconds\":74.32,\"samples\":[0,5.28,10.28,15.02,20.03,25.09,30.1,35.1,40.14,45.19,50.2,55.21,60.22,65.24,70.26]}}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:49:31.923Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.54,\"samples\":[0,5.32,10.02,15.04,20.03,25.06,30.08,35.06,40.07,45.08,50.08,55.08,60.07,65.11,70.1,75.1]},\"second\":{\"success\":true,\"seconds\":78.75,\"samples\":[0,5,10.01,15.02,20.01,25.01,30.01,35.02,40.31,45.02,50.01,55.31,60.03,65.01,70.3,75.3]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.51,\"samples\":[0.01,5.3,10.29,15.32,20.3,25.02,30.04,35.03,40.03,45.04,50.04,55.04,60.03,65.07,70.06,75.06]},\"second\":{\"success\":true,\"seconds\":78.75,\"samples\":[0,5.31,10.29,15.3,20.3,25.3,30.3,35.29,40.28,45.28,50.27,55.29,60.3,65.3,70.29,75.32]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.53,\"samples\":[0,5.31,10.01,15.03,20.02,25.05,30.07,35.05,40.06,45.07,50.07,55.07,60.06,65.1,70.09,75.09]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.3,10.31,15.01,20.31,25.31,30.3,35.01,40.31,45.01,50.32,55.3,60.02,65.31,70.29,75.28]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.28,\"samples\":[0,5.3,10.31,15.02,20.32,25.03,30.06,35.04,40.05,45.05,50.06,55.06,60.05,65.08,70.08,75.08]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.01,10.31,15.03,20.03,25.03,30.03,35.04,40.03,45.02,50.02,55.02,60.04,65.05,70.04,75.06]}}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:49:31.923Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.54,\"samples\":[0,5.32,10.02,15.04,20.03,25.06,30.08,35.06,40.07,45.08,50.08,55.08,60.07,65.11,70.1,75.1]},\"second\":{\"success\":true,\"seconds\":78.75,\"samples\":[0,5,10.01,15.02,20.01,25.01,30.01,35.02,40.31,45.02,50.01,55.31,60.03,65.01,70.3,75.3]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.51,\"samples\":[0.01,5.3,10.29,15.32,20.3,25.02,30.04,35.03,40.03,45.04,50.04,55.04,60.03,65.07,70.06,75.06]},\"second\":{\"success\":true,\"seconds\":78.75,\"samples\":[0,5.31,10.29,15.3,20.3,25.3,30.3,35.29,40.28,45.28,50.27,55.29,60.3,65.3,70.29,75.32]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.53,\"samples\":[0,5.31,10.01,15.03,20.02,25.05,30.07,35.05,40.06,45.07,50.07,55.07,60.06,65.1,70.09,75.09]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.3,10.31,15.01,20.31,25.31,30.3,35.01,40.31,45.01,50.32,55.3,60.02,65.31,70.29,75.28]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.28,\"samples\":[0,5.3,10.31,15.02,20.32,25.03,30.06,35.04,40.05,45.05,50.06,55.06,60.05,65.08,70.08,75.08]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.01,10.31,15.03,20.03,25.03,30.03,35.04,40.03,45.02,50.02,55.02,60.04,65.05,70.04,75.06]}}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:49:31.923Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.54,\"samples\":[0,5.32,10.02,15.04,20.03,25.06,30.08,35.06,40.07,45.08,50.08,55.08,60.07,65.11,70.1,75.1]},\"second\":{\"success\":true,\"seconds\":78.75,\"samples\":[0,5,10.01,15.02,20.01,25.01,30.01,35.02,40.31,45.02,50.01,55.31,60.03,65.01,70.3,75.3]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.51,\"samples\":[0.01,5.3,10.29,15.32,20.3,25.02,30.04,35.03,40.03,45.04,50.04,55.04,60.03,65.07,70.06,75.06]},\"second\":{\"success\":true,\"seconds\":78.75,\"samples\":[0,5.31,10.29,15.3,20.3,25.3,30.3,35.29,40.28,45.28,50.27,55.29,60.3,65.3,70.29,75.32]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.53,\"samples\":[0,5.31,10.01,15.03,20.02,25.05,30.07,35.05,40.06,45.07,50.07,55.07,60.06,65.1,70.09,75.09]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.3,10.31,15.01,20.31,25.31,30.3,35.01,40.31,45.01,50.32,55.3,60.02,65.31,70.29,75.28]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.28,\"samples\":[0,5.3,10.31,15.02,20.32,25.03,30.06,35.04,40.05,45.05,50.06,55.06,60.05,65.08,70.08,75.08]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.01,10.31,15.03,20.03,25.03,30.03,35.04,40.03,45.02,50.02,55.02,60.04,65.05,70.04,75.06]}}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:49:31.923Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.54,\"samples\":[0,5.32,10.02,15.04,20.03,25.06,30.08,35.06,40.07,45.08,50.08,55.08,60.07,65.11,70.1,75.1]},\"second\":{\"success\":true,\"seconds\":78.75,\"samples\":[0,5,10.01,15.02,20.01,25.01,30.01,35.02,40.31,45.02,50.01,55.31,60.03,65.01,70.3,75.3]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.51,\"samples\":[0.01,5.3,10.29,15.32,20.3,25.02,30.04,35.03,40.03,45.04,50.04,55.04,60.03,65.07,70.06,75.06]},\"second\":{\"success\":true,\"seconds\":78.75,\"samples\":[0,5.31,10.29,15.3,20.3,25.3,30.3,35.29,40.28,45.28,50.27,55.29,60.3,65.3,70.29,75.32]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.53,\"samples\":[0,5.31,10.01,15.03,20.02,25.05,30.07,35.05,40.06,45.07,50.07,55.07,60.06,65.1,70.09,75.09]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.3,10.31,15.01,20.31,25.31,30.3,35.01,40.31,45.01,50.32,55.3,60.02,65.31,70.29,75.28]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.28,\"samples\":[0,5.3,10.31,15.02,20.32,25.03,30.06,35.04,40.05,45.05,50.06,55.06,60.05,65.08,70.08,75.08]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.01,10.31,15.03,20.03,25.03,30.03,35.04,40.03,45.02,50.02,55.02,60.04,65.05,70.04,75.06]}}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:49:31.923Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.54,\"samples\":[0,5.32,10.02,15.04,20.03,25.06,30.08,35.06,40.07,45.08,50.08,55.08,60.07,65.11,70.1,75.1]},\"second\":{\"success\":true,\"seconds\":78.75,\"samples\":[0,5,10.01,15.02,20.01,25.01,30.01,35.02,40.31,45.02,50.01,55.31,60.03,65.01,70.3,75.3]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.51,\"samples\":[0.01,5.3,10.29,15.32,20.3,25.02,30.04,35.03,40.03,45.04,50.04,55.04,60.03,65.07,70.06,75.06]},\"second\":{\"success\":true,\"seconds\":78.75,\"samples\":[0,5.31,10.29,15.3,20.3,25.3,30.3,35.29,40.28,45.28,50.27,55.29,60.3,65.3,70.29,75.32]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.53,\"samples\":[0,5.31,10.01,15.03,20.02,25.05,30.07,35.05,40.06,45.07,50.07,55.07,60.06,65.1,70.09,75.09]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.3,10.31,15.01,20.31,25.31,30.3,35.01,40.31,45.01,50.32,55.3,60.02,65.31,70.29,75.28]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.28,\"samples\":[0,5.3,10.31,15.02,20.32,25.03,30.06,35.04,40.05,45.05,50.06,55.06,60.05,65.08,70.08,75.08]},\"second\":{\"success\":true,\"seconds\":77.25,\"samples\":[0,5.01,10.31,15.03,20.03,25.03,30.03,35.04,40.03,45.02,50.02,55.02,60.04,65.05,70.04,75.06]}}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:10:35.174Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.08,20.07,25.1,30.14,35.26,40.3,45.31,50.31,55.03,60.02,65.02,69.1]},\"second\":{\"success\":true,\"seconds\":69.14,\"samples\":[0,5.3,10.3,15.29,20.28,25.29,30.3,35.04,40.04,45.05,50.05,55.06,60.06,65.07,69.14]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.08,20.06,25.1,30.14,35.26,40.3,45.31,50.32,55.03,60.03,65.02,69.1]},\"second\":{\"success\":true,\"seconds\":69.13,\"samples\":[0,5.29,10.29,15.29,20.28,25.29,30.3,35.03,40.04,45.04,50.05,55.06,60.06,65.06,69.13]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.07,20.06,25.1,30.13,35.26,40.29,45.31,50.31,55.03,60.02,65.01,69.1]},\"second\":{\"success\":true,\"seconds\":69.15,\"samples\":[0,5.31,10.31,15.3,20.29,25.3,30.31,35.05,40.06,45.06,50.06,55.07,60.07,65.08,69.15]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.16,\"samples\":[0.01,5.07,10.07,15.08,20.06,25.1,30.14,35.26,40.29,45.31,50.31,55.03,60.03,65.01,68.16]},\"second\":{\"success\":true,\"seconds\":68.68,\"samples\":[0,5.01,10.31,15.29,20.29,25.25,30.24,35.28,40.28,45.26,50.26,55.25,60.24,65.26,68.68]}}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:10:35.175Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.08,20.07,25.1,30.14,35.26,40.3,45.31,50.31,55.03,60.02,65.02,69.1]},\"second\":{\"success\":true,\"seconds\":69.14,\"samples\":[0,5.3,10.3,15.29,20.28,25.29,30.3,35.04,40.04,45.05,50.05,55.06,60.06,65.07,69.14]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.08,20.06,25.1,30.14,35.26,40.3,45.31,50.32,55.03,60.03,65.02,69.1]},\"second\":{\"success\":true,\"seconds\":69.13,\"samples\":[0,5.29,10.29,15.29,20.28,25.29,30.3,35.03,40.04,45.04,50.05,55.06,60.06,65.06,69.13]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.07,20.06,25.1,30.13,35.26,40.29,45.31,50.31,55.03,60.02,65.01,69.1]},\"second\":{\"success\":true,\"seconds\":69.15,\"samples\":[0,5.31,10.31,15.3,20.29,25.3,30.31,35.05,40.06,45.06,50.06,55.07,60.07,65.08,69.15]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.16,\"samples\":[0.01,5.07,10.07,15.08,20.06,25.1,30.14,35.26,40.29,45.31,50.31,55.03,60.03,65.01,68.16]},\"second\":{\"success\":true,\"seconds\":68.68,\"samples\":[0,5.01,10.31,15.29,20.29,25.25,30.24,35.28,40.28,45.26,50.26,55.25,60.24,65.26,68.68]}}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:10:35.175Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.08,20.07,25.1,30.14,35.26,40.3,45.31,50.31,55.03,60.02,65.02,69.1]},\"second\":{\"success\":true,\"seconds\":69.14,\"samples\":[0,5.3,10.3,15.29,20.28,25.29,30.3,35.04,40.04,45.05,50.05,55.06,60.06,65.07,69.14]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.08,20.06,25.1,30.14,35.26,40.3,45.31,50.32,55.03,60.03,65.02,69.1]},\"second\":{\"success\":true,\"seconds\":69.13,\"samples\":[0,5.29,10.29,15.29,20.28,25.29,30.3,35.03,40.04,45.04,50.05,55.06,60.06,65.06,69.13]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.07,20.06,25.1,30.13,35.26,40.29,45.31,50.31,55.03,60.02,65.01,69.1]},\"second\":{\"success\":true,\"seconds\":69.15,\"samples\":[0,5.31,10.31,15.3,20.29,25.3,30.31,35.05,40.06,45.06,50.06,55.07,60.07,65.08,69.15]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.16,\"samples\":[0.01,5.07,10.07,15.08,20.06,25.1,30.14,35.26,40.29,45.31,50.31,55.03,60.03,65.01,68.16]},\"second\":{\"success\":true,\"seconds\":68.68,\"samples\":[0,5.01,10.31,15.29,20.29,25.25,30.24,35.28,40.28,45.26,50.26,55.25,60.24,65.26,68.68]}}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:10:35.175Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.08,20.07,25.1,30.14,35.26,40.3,45.31,50.31,55.03,60.02,65.02,69.1]},\"second\":{\"success\":true,\"seconds\":69.14,\"samples\":[0,5.3,10.3,15.29,20.28,25.29,30.3,35.04,40.04,45.05,50.05,55.06,60.06,65.07,69.14]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.08,20.06,25.1,30.14,35.26,40.3,45.31,50.32,55.03,60.03,65.02,69.1]},\"second\":{\"success\":true,\"seconds\":69.13,\"samples\":[0,5.29,10.29,15.29,20.28,25.29,30.3,35.03,40.04,45.04,50.05,55.06,60.06,65.06,69.13]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.07,20.06,25.1,30.13,35.26,40.29,45.31,50.31,55.03,60.02,65.01,69.1]},\"second\":{\"success\":true,\"seconds\":69.15,\"samples\":[0,5.31,10.31,15.3,20.29,25.3,30.31,35.05,40.06,45.06,50.06,55.07,60.07,65.08,69.15]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.16,\"samples\":[0.01,5.07,10.07,15.08,20.06,25.1,30.14,35.26,40.29,45.31,50.31,55.03,60.03,65.01,68.16]},\"second\":{\"success\":true,\"seconds\":68.68,\"samples\":[0,5.01,10.31,15.29,20.29,25.25,30.24,35.28,40.28,45.26,50.26,55.25,60.24,65.26,68.68]}}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:10:35.175Z",
    "sha256": "b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.08,20.07,25.1,30.14,35.26,40.3,45.31,50.31,55.03,60.02,65.02,69.1]},\"second\":{\"success\":true,\"seconds\":69.14,\"samples\":[0,5.3,10.3,15.29,20.28,25.29,30.3,35.04,40.04,45.05,50.05,55.06,60.06,65.07,69.14]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.08,20.06,25.1,30.14,35.26,40.3,45.31,50.32,55.03,60.03,65.02,69.1]},\"second\":{\"success\":true,\"seconds\":69.13,\"samples\":[0,5.29,10.29,15.29,20.28,25.29,30.3,35.03,40.04,45.04,50.05,55.06,60.06,65.06,69.13]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":69.1,\"samples\":[0.01,5.07,10.07,15.07,20.06,25.1,30.13,35.26,40.29,45.31,50.31,55.03,60.02,65.01,69.1]},\"second\":{\"success\":true,\"seconds\":69.15,\"samples\":[0,5.31,10.31,15.3,20.29,25.3,30.31,35.05,40.06,45.06,50.06,55.07,60.07,65.08,69.15]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":68.16,\"samples\":[0.01,5.07,10.07,15.08,20.06,25.1,30.14,35.26,40.29,45.31,50.31,55.03,60.03,65.01,68.16]},\"second\":{\"success\":true,\"seconds\":68.68,\"samples\":[0,5.01,10.31,15.29,20.29,25.25,30.24,35.28,40.28,45.26,50.26,55.25,60.24,65.26,68.68]}}],\"files\":[\"claude-opus-5-5-xhigh.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:13:17.592Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.66,\"samples\":[0.01,5.11,10.15,15.18,20.3,25.08,30.15,35.17,40.3,45.08,50.09,55.1,60.09,65.09,70.07,75.09,76.66]},\"second\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.02,10.03,15.06,20.07,25.07,30.07,35.07,40.16,45.17,50.14,55.13,60.12,65.1,70.11,75.1,76.97]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.08,10.12,15.15,20.27,25.05,30.13,35.14,40.27,45.05,50.07,55.07,60.06,65.06,70.04,75.06,76.97]},\"second\":{\"success\":true,\"seconds\":76.69,\"samples\":[0,5.31,10.02,15.01,20.31,25.3,30.29,35.28,40.12,45.17,50.18,55.16,60.16,65.14,70.13,75.12,76.69]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.99,\"samples\":[0.01,5.09,10.13,15.16,20.28,25.06,30.14,35.16,40.29,45.08,50.08,55.09,60.08,65.07,70.06,75.07,76.99]},\"second\":{\"success\":true,\"seconds\":76.74,\"samples\":[0,5.31,10.33,15.03,20.03,25.01,30.01,35.02,40.19,45.24,50.24,55.22,60.22,65.2,70.19,75.19,76.74]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.98,\"samples\":[0.01,5.08,10.12,15.16,20.27,25.06,30.13,35.15,40.28,45.06,50.07,55.08,60.07,65.07,70.05,75.07,76.98]},\"second\":{\"success\":true,\"seconds\":76.78,\"samples\":[0,5,10.02,15,20,25.03,30.05,35.07,40.23,45.28,50.28,55.27,60.26,65.24,70.23,75.23,76.78]}}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:13:17.592Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.66,\"samples\":[0.01,5.11,10.15,15.18,20.3,25.08,30.15,35.17,40.3,45.08,50.09,55.1,60.09,65.09,70.07,75.09,76.66]},\"second\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.02,10.03,15.06,20.07,25.07,30.07,35.07,40.16,45.17,50.14,55.13,60.12,65.1,70.11,75.1,76.97]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.08,10.12,15.15,20.27,25.05,30.13,35.14,40.27,45.05,50.07,55.07,60.06,65.06,70.04,75.06,76.97]},\"second\":{\"success\":true,\"seconds\":76.69,\"samples\":[0,5.31,10.02,15.01,20.31,25.3,30.29,35.28,40.12,45.17,50.18,55.16,60.16,65.14,70.13,75.12,76.69]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.99,\"samples\":[0.01,5.09,10.13,15.16,20.28,25.06,30.14,35.16,40.29,45.08,50.08,55.09,60.08,65.07,70.06,75.07,76.99]},\"second\":{\"success\":true,\"seconds\":76.74,\"samples\":[0,5.31,10.33,15.03,20.03,25.01,30.01,35.02,40.19,45.24,50.24,55.22,60.22,65.2,70.19,75.19,76.74]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.98,\"samples\":[0.01,5.08,10.12,15.16,20.27,25.06,30.13,35.15,40.28,45.06,50.07,55.08,60.07,65.07,70.05,75.07,76.98]},\"second\":{\"success\":true,\"seconds\":76.78,\"samples\":[0,5,10.02,15,20,25.03,30.05,35.07,40.23,45.28,50.28,55.27,60.26,65.24,70.23,75.23,76.78]}}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:13:17.592Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.66,\"samples\":[0.01,5.11,10.15,15.18,20.3,25.08,30.15,35.17,40.3,45.08,50.09,55.1,60.09,65.09,70.07,75.09,76.66]},\"second\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.02,10.03,15.06,20.07,25.07,30.07,35.07,40.16,45.17,50.14,55.13,60.12,65.1,70.11,75.1,76.97]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.08,10.12,15.15,20.27,25.05,30.13,35.14,40.27,45.05,50.07,55.07,60.06,65.06,70.04,75.06,76.97]},\"second\":{\"success\":true,\"seconds\":76.69,\"samples\":[0,5.31,10.02,15.01,20.31,25.3,30.29,35.28,40.12,45.17,50.18,55.16,60.16,65.14,70.13,75.12,76.69]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.99,\"samples\":[0.01,5.09,10.13,15.16,20.28,25.06,30.14,35.16,40.29,45.08,50.08,55.09,60.08,65.07,70.06,75.07,76.99]},\"second\":{\"success\":true,\"seconds\":76.74,\"samples\":[0,5.31,10.33,15.03,20.03,25.01,30.01,35.02,40.19,45.24,50.24,55.22,60.22,65.2,70.19,75.19,76.74]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.98,\"samples\":[0.01,5.08,10.12,15.16,20.27,25.06,30.13,35.15,40.28,45.06,50.07,55.08,60.07,65.07,70.05,75.07,76.98]},\"second\":{\"success\":true,\"seconds\":76.78,\"samples\":[0,5,10.02,15,20,25.03,30.05,35.07,40.23,45.28,50.28,55.27,60.26,65.24,70.23,75.23,76.78]}}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:13:17.592Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.66,\"samples\":[0.01,5.11,10.15,15.18,20.3,25.08,30.15,35.17,40.3,45.08,50.09,55.1,60.09,65.09,70.07,75.09,76.66]},\"second\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.02,10.03,15.06,20.07,25.07,30.07,35.07,40.16,45.17,50.14,55.13,60.12,65.1,70.11,75.1,76.97]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.08,10.12,15.15,20.27,25.05,30.13,35.14,40.27,45.05,50.07,55.07,60.06,65.06,70.04,75.06,76.97]},\"second\":{\"success\":true,\"seconds\":76.69,\"samples\":[0,5.31,10.02,15.01,20.31,25.3,30.29,35.28,40.12,45.17,50.18,55.16,60.16,65.14,70.13,75.12,76.69]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.99,\"samples\":[0.01,5.09,10.13,15.16,20.28,25.06,30.14,35.16,40.29,45.08,50.08,55.09,60.08,65.07,70.06,75.07,76.99]},\"second\":{\"success\":true,\"seconds\":76.74,\"samples\":[0,5.31,10.33,15.03,20.03,25.01,30.01,35.02,40.19,45.24,50.24,55.22,60.22,65.2,70.19,75.19,76.74]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.98,\"samples\":[0.01,5.08,10.12,15.16,20.27,25.06,30.13,35.15,40.28,45.06,50.07,55.08,60.07,65.07,70.05,75.07,76.98]},\"second\":{\"success\":true,\"seconds\":76.78,\"samples\":[0,5,10.02,15,20,25.03,30.05,35.07,40.23,45.28,50.28,55.27,60.26,65.24,70.23,75.23,76.78]}}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:13:17.592Z",
    "sha256": "42076058bb04ee338f9cd948b4265b7d8602de5c886ec65a970fadcb480931be",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.66,\"samples\":[0.01,5.11,10.15,15.18,20.3,25.08,30.15,35.17,40.3,45.08,50.09,55.1,60.09,65.09,70.07,75.09,76.66]},\"second\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.02,10.03,15.06,20.07,25.07,30.07,35.07,40.16,45.17,50.14,55.13,60.12,65.1,70.11,75.1,76.97]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.97,\"samples\":[0,5.08,10.12,15.15,20.27,25.05,30.13,35.14,40.27,45.05,50.07,55.07,60.06,65.06,70.04,75.06,76.97]},\"second\":{\"success\":true,\"seconds\":76.69,\"samples\":[0,5.31,10.02,15.01,20.31,25.3,30.29,35.28,40.12,45.17,50.18,55.16,60.16,65.14,70.13,75.12,76.69]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.99,\"samples\":[0.01,5.09,10.13,15.16,20.28,25.06,30.14,35.16,40.29,45.08,50.08,55.09,60.08,65.07,70.06,75.07,76.99]},\"second\":{\"success\":true,\"seconds\":76.74,\"samples\":[0,5.31,10.33,15.03,20.03,25.01,30.01,35.02,40.19,45.24,50.24,55.22,60.22,65.2,70.19,75.19,76.74]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":76.98,\"samples\":[0.01,5.08,10.12,15.16,20.27,25.06,30.13,35.15,40.28,45.06,50.07,55.08,60.07,65.07,70.05,75.07,76.98]},\"second\":{\"success\":true,\"seconds\":76.78,\"samples\":[0,5,10.02,15,20,25.03,30.05,35.07,40.23,45.28,50.28,55.27,60.26,65.24,70.23,75.23,76.78]}}],\"files\":[\"claude-opus-5-5-high.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:15:53.117Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.6,\"samples\":[0,5.03,10.11,15.15,20.19,25.25,30.27,35.32,40.05,45.13,50.17,55.17,60.23,65.23,70.24,74.6]},\"second\":{\"success\":true,\"seconds\":74.76,\"samples\":[0,5.02,10,15.03,20.05,25.08,30.08,35.15,40.21,45.22,50.24,55.25,60.28,65.04,70.06,74.76]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.62,\"samples\":[0,5.04,10.13,15.16,20.2,25.26,30.28,35.01,40.06,45.14,50.18,55.19,60.24,65.24,70.25,74.62]},\"second\":{\"success\":true,\"seconds\":74.77,\"samples\":[0,5.31,10.02,15.04,20.06,25.09,30.09,35.16,40.22,45.23,50.25,55.26,60.29,65.06,70.07,74.77]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.59,\"samples\":[0.01,5.02,10.1,15.15,20.18,25.24,30.26,35.31,40.04,45.12,50.15,55.16,60.21,65.22,70.22,74.59]},\"second\":{\"success\":true,\"seconds\":74.75,\"samples\":[0,5.01,10.31,15.02,20.04,25.07,30.07,35.14,40.19,45.21,50.23,55.24,60.27,65.03,70.05,74.75]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.32,\"samples\":[0,5.01,10.01,15.31,20.03,25.04,30.03,35.06,40.07,45.15,50.19,55.2,60.24,65.25,70.26,74.32]},\"second\":{\"success\":true,\"seconds\":74.14,\"samples\":[0,5.31,10.02,15.04,20.07,25.09,30.1,35.15,40.21,45.24,50.26,55.27,60.29,65.05,70.07,74.14]}}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:15:53.117Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.6,\"samples\":[0,5.03,10.11,15.15,20.19,25.25,30.27,35.32,40.05,45.13,50.17,55.17,60.23,65.23,70.24,74.6]},\"second\":{\"success\":true,\"seconds\":74.76,\"samples\":[0,5.02,10,15.03,20.05,25.08,30.08,35.15,40.21,45.22,50.24,55.25,60.28,65.04,70.06,74.76]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.62,\"samples\":[0,5.04,10.13,15.16,20.2,25.26,30.28,35.01,40.06,45.14,50.18,55.19,60.24,65.24,70.25,74.62]},\"second\":{\"success\":true,\"seconds\":74.77,\"samples\":[0,5.31,10.02,15.04,20.06,25.09,30.09,35.16,40.22,45.23,50.25,55.26,60.29,65.06,70.07,74.77]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.59,\"samples\":[0.01,5.02,10.1,15.15,20.18,25.24,30.26,35.31,40.04,45.12,50.15,55.16,60.21,65.22,70.22,74.59]},\"second\":{\"success\":true,\"seconds\":74.75,\"samples\":[0,5.01,10.31,15.02,20.04,25.07,30.07,35.14,40.19,45.21,50.23,55.24,60.27,65.03,70.05,74.75]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.32,\"samples\":[0,5.01,10.01,15.31,20.03,25.04,30.03,35.06,40.07,45.15,50.19,55.2,60.24,65.25,70.26,74.32]},\"second\":{\"success\":true,\"seconds\":74.14,\"samples\":[0,5.31,10.02,15.04,20.07,25.09,30.1,35.15,40.21,45.24,50.26,55.27,60.29,65.05,70.07,74.14]}}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:15:53.117Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.6,\"samples\":[0,5.03,10.11,15.15,20.19,25.25,30.27,35.32,40.05,45.13,50.17,55.17,60.23,65.23,70.24,74.6]},\"second\":{\"success\":true,\"seconds\":74.76,\"samples\":[0,5.02,10,15.03,20.05,25.08,30.08,35.15,40.21,45.22,50.24,55.25,60.28,65.04,70.06,74.76]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.62,\"samples\":[0,5.04,10.13,15.16,20.2,25.26,30.28,35.01,40.06,45.14,50.18,55.19,60.24,65.24,70.25,74.62]},\"second\":{\"success\":true,\"seconds\":74.77,\"samples\":[0,5.31,10.02,15.04,20.06,25.09,30.09,35.16,40.22,45.23,50.25,55.26,60.29,65.06,70.07,74.77]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.59,\"samples\":[0.01,5.02,10.1,15.15,20.18,25.24,30.26,35.31,40.04,45.12,50.15,55.16,60.21,65.22,70.22,74.59]},\"second\":{\"success\":true,\"seconds\":74.75,\"samples\":[0,5.01,10.31,15.02,20.04,25.07,30.07,35.14,40.19,45.21,50.23,55.24,60.27,65.03,70.05,74.75]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.32,\"samples\":[0,5.01,10.01,15.31,20.03,25.04,30.03,35.06,40.07,45.15,50.19,55.2,60.24,65.25,70.26,74.32]},\"second\":{\"success\":true,\"seconds\":74.14,\"samples\":[0,5.31,10.02,15.04,20.07,25.09,30.1,35.15,40.21,45.24,50.26,55.27,60.29,65.05,70.07,74.14]}}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:15:53.117Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.6,\"samples\":[0,5.03,10.11,15.15,20.19,25.25,30.27,35.32,40.05,45.13,50.17,55.17,60.23,65.23,70.24,74.6]},\"second\":{\"success\":true,\"seconds\":74.76,\"samples\":[0,5.02,10,15.03,20.05,25.08,30.08,35.15,40.21,45.22,50.24,55.25,60.28,65.04,70.06,74.76]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.62,\"samples\":[0,5.04,10.13,15.16,20.2,25.26,30.28,35.01,40.06,45.14,50.18,55.19,60.24,65.24,70.25,74.62]},\"second\":{\"success\":true,\"seconds\":74.77,\"samples\":[0,5.31,10.02,15.04,20.06,25.09,30.09,35.16,40.22,45.23,50.25,55.26,60.29,65.06,70.07,74.77]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.59,\"samples\":[0.01,5.02,10.1,15.15,20.18,25.24,30.26,35.31,40.04,45.12,50.15,55.16,60.21,65.22,70.22,74.59]},\"second\":{\"success\":true,\"seconds\":74.75,\"samples\":[0,5.01,10.31,15.02,20.04,25.07,30.07,35.14,40.19,45.21,50.23,55.24,60.27,65.03,70.05,74.75]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.32,\"samples\":[0,5.01,10.01,15.31,20.03,25.04,30.03,35.06,40.07,45.15,50.19,55.2,60.24,65.25,70.26,74.32]},\"second\":{\"success\":true,\"seconds\":74.14,\"samples\":[0,5.31,10.02,15.04,20.07,25.09,30.1,35.15,40.21,45.24,50.26,55.27,60.29,65.05,70.07,74.14]}}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:15:53.117Z",
    "sha256": "94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.6,\"samples\":[0,5.03,10.11,15.15,20.19,25.25,30.27,35.32,40.05,45.13,50.17,55.17,60.23,65.23,70.24,74.6]},\"second\":{\"success\":true,\"seconds\":74.76,\"samples\":[0,5.02,10,15.03,20.05,25.08,30.08,35.15,40.21,45.22,50.24,55.25,60.28,65.04,70.06,74.76]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.62,\"samples\":[0,5.04,10.13,15.16,20.2,25.26,30.28,35.01,40.06,45.14,50.18,55.19,60.24,65.24,70.25,74.62]},\"second\":{\"success\":true,\"seconds\":74.77,\"samples\":[0,5.31,10.02,15.04,20.06,25.09,30.09,35.16,40.22,45.23,50.25,55.26,60.29,65.06,70.07,74.77]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.59,\"samples\":[0.01,5.02,10.1,15.15,20.18,25.24,30.26,35.31,40.04,45.12,50.15,55.16,60.21,65.22,70.22,74.59]},\"second\":{\"success\":true,\"seconds\":74.75,\"samples\":[0,5.01,10.31,15.02,20.04,25.07,30.07,35.14,40.19,45.21,50.23,55.24,60.27,65.03,70.05,74.75]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":74.32,\"samples\":[0,5.01,10.01,15.31,20.03,25.04,30.03,35.06,40.07,45.15,50.19,55.2,60.24,65.25,70.26,74.32]},\"second\":{\"success\":true,\"seconds\":74.14,\"samples\":[0,5.31,10.02,15.04,20.07,25.09,30.1,35.15,40.21,45.24,50.26,55.27,60.29,65.05,70.07,74.14]}}],\"files\":[\"gpt-5-6-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:18:36.880Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.59,\"samples\":[0,5.3,10.31,15.31,20.03,25.02,30.01,35.02,40.05,45.04,50.07,55.08,60.12,65.11,70.13,75.14,78.59]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.3,10.27,15.25,20.25,25.29,30.28,35.29,40.28,45.26,50.24,55.25,60.26,65.25,70.25,75.27,78.72]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.58,\"samples\":[0,5.29,10.3,15.29,20.02,25.01,30.31,35.01,40.03,45.03,50.06,55.07,60.11,65.1,70.12,75.12,78.58]},\"second\":{\"success\":true,\"seconds\":78.66,\"samples\":[0,5.01,10.29,15.3,20.28,25.29,30.27,35.27,40.26,45.24,50.22,55.2,60.2,65.2,70.21,75.22,78.66]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.61,\"samples\":[0,5.01,10.02,15.02,20.05,25.04,30.03,35.04,40.07,45.07,50.09,55.11,60.14,65.14,70.16,75.16,78.61]},\"second\":{\"success\":true,\"seconds\":78.63,\"samples\":[0,5.01,10.04,15.06,20.07,25.1,30.09,35.08,40.09,45.09,50.1,55.11,60.11,65.1,70.07,75.1,78.63]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.06,\"samples\":[0.01,5.03,10.04,15.04,20.07,25.09,30.11,35.14,40.14,45.13,50.14,55.12,60.16,65.15,70.17,75.17,77.06]},\"second\":{\"success\":true,\"seconds\":77.18,\"samples\":[0,5.03,10.31,15.31,20.31,25,30.31,35.3,40.3,45.29,50.3,55.31,60.31,65.31,70.29,75.28,77.18]}}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "runtime",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:18:36.880Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.59,\"samples\":[0,5.3,10.31,15.31,20.03,25.02,30.01,35.02,40.05,45.04,50.07,55.08,60.12,65.11,70.13,75.14,78.59]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.3,10.27,15.25,20.25,25.29,30.28,35.29,40.28,45.26,50.24,55.25,60.26,65.25,70.25,75.27,78.72]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.58,\"samples\":[0,5.29,10.3,15.29,20.02,25.01,30.31,35.01,40.03,45.03,50.06,55.07,60.11,65.1,70.12,75.12,78.58]},\"second\":{\"success\":true,\"seconds\":78.66,\"samples\":[0,5.01,10.29,15.3,20.28,25.29,30.27,35.27,40.26,45.24,50.22,55.2,60.2,65.2,70.21,75.22,78.66]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.61,\"samples\":[0,5.01,10.02,15.02,20.05,25.04,30.03,35.04,40.07,45.07,50.09,55.11,60.14,65.14,70.16,75.16,78.61]},\"second\":{\"success\":true,\"seconds\":78.63,\"samples\":[0,5.01,10.04,15.06,20.07,25.1,30.09,35.08,40.09,45.09,50.1,55.11,60.11,65.1,70.07,75.1,78.63]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.06,\"samples\":[0.01,5.03,10.04,15.04,20.07,25.09,30.11,35.14,40.14,45.13,50.14,55.12,60.16,65.15,70.17,75.17,77.06]},\"second\":{\"success\":true,\"seconds\":77.18,\"samples\":[0,5.03,10.31,15.31,20.31,25,30.31,35.3,40.3,45.29,50.3,55.31,60.31,65.31,70.29,75.28,77.18]}}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "replay",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:18:36.880Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.59,\"samples\":[0,5.3,10.31,15.31,20.03,25.02,30.01,35.02,40.05,45.04,50.07,55.08,60.12,65.11,70.13,75.14,78.59]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.3,10.27,15.25,20.25,25.29,30.28,35.29,40.28,45.26,50.24,55.25,60.26,65.25,70.25,75.27,78.72]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.58,\"samples\":[0,5.29,10.3,15.29,20.02,25.01,30.31,35.01,40.03,45.03,50.06,55.07,60.11,65.1,70.12,75.12,78.58]},\"second\":{\"success\":true,\"seconds\":78.66,\"samples\":[0,5.01,10.29,15.3,20.28,25.29,30.27,35.27,40.26,45.24,50.22,55.2,60.2,65.2,70.21,75.22,78.66]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.61,\"samples\":[0,5.01,10.02,15.02,20.05,25.04,30.03,35.04,40.07,45.07,50.09,55.11,60.14,65.14,70.16,75.16,78.61]},\"second\":{\"success\":true,\"seconds\":78.63,\"samples\":[0,5.01,10.04,15.06,20.07,25.1,30.09,35.08,40.09,45.09,50.1,55.11,60.11,65.1,70.07,75.1,78.63]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.06,\"samples\":[0.01,5.03,10.04,15.04,20.07,25.09,30.11,35.14,40.14,45.13,50.14,55.12,60.16,65.15,70.17,75.17,77.06]},\"second\":{\"success\":true,\"seconds\":77.18,\"samples\":[0,5.03,10.31,15.31,20.31,25,30.31,35.3,40.3,45.29,50.3,55.31,60.31,65.31,70.29,75.28,77.18]}}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "console",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:18:36.880Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.59,\"samples\":[0,5.3,10.31,15.31,20.03,25.02,30.01,35.02,40.05,45.04,50.07,55.08,60.12,65.11,70.13,75.14,78.59]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.3,10.27,15.25,20.25,25.29,30.28,35.29,40.28,45.26,50.24,55.25,60.26,65.25,70.25,75.27,78.72]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.58,\"samples\":[0,5.29,10.3,15.29,20.02,25.01,30.31,35.01,40.03,45.03,50.06,55.07,60.11,65.1,70.12,75.12,78.58]},\"second\":{\"success\":true,\"seconds\":78.66,\"samples\":[0,5.01,10.29,15.3,20.28,25.29,30.27,35.27,40.26,45.24,50.22,55.2,60.2,65.2,70.21,75.22,78.66]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.61,\"samples\":[0,5.01,10.02,15.02,20.05,25.04,30.03,35.04,40.07,45.07,50.09,55.11,60.14,65.14,70.16,75.16,78.61]},\"second\":{\"success\":true,\"seconds\":78.63,\"samples\":[0,5.01,10.04,15.06,20.07,25.1,30.09,35.08,40.09,45.09,50.1,55.11,60.11,65.1,70.07,75.1,78.63]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.06,\"samples\":[0.01,5.03,10.04,15.04,20.07,25.09,30.11,35.14,40.14,45.13,50.14,55.12,60.16,65.15,70.17,75.17,77.06]},\"second\":{\"success\":true,\"seconds\":77.18,\"samples\":[0,5.03,10.31,15.31,20.31,25,30.31,35.3,40.3,45.29,50.3,55.31,60.31,65.31,70.29,75.28,77.18]}}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "viewport",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:18:36.881Z",
    "sha256": "a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af",
    "fingerprint": "97658194b6a7ec268b25043501aa84357e5968afdf74a0256aaed03f3b6eeecf",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.59,\"samples\":[0,5.3,10.31,15.31,20.03,25.02,30.01,35.02,40.05,45.04,50.07,55.08,60.12,65.11,70.13,75.14,78.59]},\"second\":{\"success\":true,\"seconds\":78.72,\"samples\":[0,5.3,10.27,15.25,20.25,25.29,30.28,35.29,40.28,45.26,50.24,55.25,60.26,65.25,70.25,75.27,78.72]}},{\"profile\":\"mobile\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.58,\"samples\":[0,5.29,10.3,15.29,20.02,25.01,30.31,35.01,40.03,45.03,50.06,55.07,60.11,65.1,70.12,75.12,78.58]},\"second\":{\"success\":true,\"seconds\":78.66,\"samples\":[0,5.01,10.29,15.3,20.28,25.29,30.27,35.27,40.26,45.24,50.22,55.2,60.2,65.2,70.21,75.22,78.66]}},{\"profile\":\"dpr2\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":78.61,\"samples\":[0,5.01,10.02,15.02,20.05,25.04,30.03,35.04,40.07,45.07,50.09,55.11,60.14,65.14,70.16,75.16,78.61]},\"second\":{\"success\":true,\"seconds\":78.63,\"samples\":[0,5.01,10.04,15.06,20.07,25.1,30.09,35.08,40.09,45.09,50.1,55.11,60.11,65.1,70.07,75.1,78.63]}},{\"profile\":\"reduced\",\"runtime\":true,\"replay\":true,\"errors\":[],\"resources\":[],\"overflow\":[],\"first\":{\"success\":true,\"seconds\":77.06,\"samples\":[0.01,5.03,10.04,15.04,20.07,25.09,30.11,35.14,40.14,45.13,50.14,55.12,60.16,65.15,70.17,75.17,77.06]},\"second\":{\"success\":true,\"seconds\":77.18,\"samples\":[0,5.03,10.31,15.31,20.31,25,30.31,35.3,40.3,45.29,50.3,55.31,60.31,65.31,70.29,75.28,77.18]}}],\"files\":[\"gpt-6-1-sol-xhigh.html\"]}"
  }
]
```

## 人工比较

只导入网站已封存的人工会话；浏览器本地草稿不是已发布结论。

```json
[]
```

## 评测结论

协议 2 已冻结，全部结果进入统一复核。视觉核心验收和人工比较尚未完成，不发布当前总分或胜者。生成工具、联网权限并不完全相同，只比较这批原始样本，不把差异全部归因于模型。

## 历史评测信息

- **Prompt**：[prompt-v2.md](../../../prompts/01-rocket-launch/prompt-v2.md)
- **评测日期**：2026-10-09；Claude Opus 5.5 Extra High、GPT 5.6 Sol Extra High 两列于 2026-10-09 补评
- **评测者**：旧 Claude 记录来自原评测者：Claude 子代理（与被测模型同为 Claude 系列，可能存在同源偏差）；原分数、硬性检查值、需求勾选值和点评保留，本轮不重评。新增 GPT 6.1 记录由 GPT 6.1 Sol Extra High 独立子代理给出（未参与生成，与生成者不同上下文，但同模型系列，仍可能存在同源偏差）；主代理仅按其封存的最终报告整合文档，不改变分数。新增 Claude Opus 5.5 Extra High 一列由 Claude Opus 5.5 子代理评分：与被测产物是同一个模型，同源偏差风险最高；未查看生成会话或生成者自检，按既定标准逐条记分，建议人工复核。新增 GPT 5.6 Sol Extra High 一列由 GPT 5.6 Sol Extra High 独立子代理评分：未参与生成且使用独立上下文，但与被测产物是同一个模型，仍存在同源偏差；主代理仅按其封存报告整合，不改变分数
- **评测方式**：旧 Claude 记录（保留原评测者的方法说明，未重新验证）：通读全部源码，再用无头 Chrome 截图逐段核对：注入脚本把页面时钟换成虚拟时间，按“点击点火后第 N 秒”截取待命、倒计时、水幕、脐带臂、点火、离台前 3 秒、离塔、穿云、Max-Q、一级关机与分离、二级点火、整流罩分离、入轨、星箭分离、入轨成功等 30 多帧，并测试“重新发射”后再发射一次。截图证明不了的部分（音效、真实 60/120Hz 下的流畅度、窗口实时缩放）只按源码判断，点评里注明。被测产物由 Claude Opus 5.5（high）在本仓库的 Claude Code 中生成，评测者是同系列模型的子代理，打分可能偏宽，建议人工复核。新增 GPT 6.1 记录：先只提取固定评分维度、档位、硬性检查前两列和需求清单前三列，未查看生成会话、生成者自检、其他实验或旧模型源码；独立封存分数后才读取完整评测文件。使用自有无头 Chrome 与 Playwright 进程，真实时钟下完整观看桌面发射、手机连续两次发射及复位、减弱动态桌面完整发射及复位，核对点火、离台、Max-Q、分离、入轨和遥测；另做真实窗口缩放、高分屏待命与倒计时抽查。桌面第二遍及手机高分屏序列使用虚拟时钟逐阶段核对，仅作为阶段与构图的辅助证据，不作为真实耗时、音效或设备帧率证据。同步长跳步出现的黑底未在真实时钟手机复核中复现，不据此判定原产物缺陷；未完成的检查在点评中明确注明。新增 Claude Opus 5.5 Extra High 记录：评分前已按要求通读完整评测文件（含另两列的分数和点评），并为校准“白霜”可见度看过 High 产物的待命帧；通读全部源码后，用注入虚拟时钟的临时副本（每帧 1/60 秒，避开页面自带的掉帧降画质逻辑）截取待命、T-9.5 至 T+65 共 50 余帧画布，另拍含界面层的全页截图（待命、T-1、入轨成功）和 390×844 竖屏 8 帧；再用逐帧完整绘制的脚本跑“发射→重新发射→再发射→再复位”，分别按 60 fps、120 fps、25 fps 和减少动态效果各跑一遍，记录遥测、按钮状态、页面报错以及画布是否整帧空白；马赫盘用关闭菱形绘制后的差分对比确认。音效、真实屏幕刷新率和窗口实时拖拽缩放只按源码判断。新增 GPT 5.6 记录：封存前只读取固定标准，未查看其他模型产物、旧分数、生成过程或生成者自检；使用真实时钟和 `requestAnimationFrame` 语义完整观看桌面正常动态、手机减弱动态及手机重放，逐段核对待命、倒计时、水幕、点火、离台、Max-Q、两级分离、整流罩分离、入轨、卫星部署、成功和重新发射，并检查源码、控制台、页面尺寸及 DPR 2 画布；全部新分数封存后才读取旧分数用于比较
- **评测环境**：旧 Claude 记录：本地 Chrome 无头模式（file:// 打开临时副本，原文件未改动）；桌面 1280×800、1440×900 及 2 倍像素密度，手机 390×844（放在 iframe 里），另跑一遍 `--force-prefers-reduced-motion`；页面级报错用注入的 error/unhandledrejection/console.error 监听和 Chrome 控制台日志收集。新增 GPT 6.1 记录：Windows，本机 Chrome 无头模式、独立 Playwright 浏览器实例，file:// 打开原始 HTML；真实时钟完整运行使用桌面 1440×900、手机 390×844、deviceScaleFactor=1，减弱动态完整运行使用桌面 DPR1；DPR2 抽查待命、倒计时及窗口缩放，虚拟手机序列使用 DPR3。脚本、截图及记录均在仓库外临时目录，HTML 未改动，SHA-256 为 `a7d94a526261dd09f0449f7ddd4c37f74e5d1e7db67df10fb03af6c75c3b00af`；未验证其他浏览器、完整高分屏实时发射、实体 60/120Hz 屏幕、实际设备帧率及音效听感。新增 Claude Opus 5.5 Extra High 记录：Windows 本机 Chrome 无头模式（`--disable-gpu`），file:// 打开注入脚本的临时副本，原文件未改动（SHA-256 `b9f1e2b1eb837f25d56e86adc96dd965e8b38c5c335a97ed72269c549a8a0092`）；桌面 1440×900（画布 1424×805）及 2 倍像素密度，手机 390×844 放在 iframe 里，120 fps 一遍用 500×900 窗口，另用 `--force-prefers-reduced-motion` 跑一遍；脚本和截图都在仓库外临时目录；没有用真实时钟完整观看，未验证实体设备帧率和音效听感。新增 GPT 5.6 记录：Windows、本地 HTTP 服务、Playwright 控制的 Chrome 154；桌面 1440×900、手机 390×844，并检查 DPR 2，原 HTML 未改动（SHA-256 `94bb21d78dd81c48b0b94e39f65f8c7dd18ec057a4e3be67afde5ed1f940e941`）；未验证其他浏览器、实体 60/120Hz 屏幕、真实高分屏设备或音效质量

## 历史评分维度

评分标准在运行模型之前写好。开始评分后不改维度、权重和档位；确实要改，先改这份标准，再把已评的产物全部重评。

- 需求覆盖按下方“需求清单”逐条记分：做到 1，部分做到 0.5，没做到 0，相加就是这一维的得分。
- 其余维度按 0–5 分打，每一档的标准见“评分档位”。0 分表示完全没有，或页面无法运行。
- 硬性检查不通过不直接判零分，但“稳定与适配”最多 1 分，其余维度按实际看到的效果打。
- 每份产物至少完整看两遍：第一遍只看不打分，第二遍对照清单打分。点评要写清发生在什么时候（例如 T+50）。
- 同一批产物全部评完后再写结论，没评完时页面不显示名次。总分相差 5 分以内算同一档。
- 已知局限：打分时知道是哪个模型；每个模型目前只跑一次。

总分 = Σ(维度得分 ÷ 满分 × 权重)，满分 100。

| 维度 | 关注点 | 满分 | 权重 |
|---|---|---:|---:|
| 需求覆盖 | 按需求清单逐条记分：做到 1，部分做到 0.5，没做到 0 | 34 | 40 |
| 写实感 | 火箭和发射场看起来像不像真的：结构、比例、材质和光照 | 5 | 20 |
| 火焰与烟雾 | 点火、尾焰、烟云、水汽和尾迹的质感，以及随时间和高度的变化 | 5 | 15 |
| 镜头与连贯 | 阶段衔接是否连续，镜头跟随是否稳定，运动有没有重量感和加速感 | 5 | 15 |
| 稳定与适配 | 能否稳定跑完，桌面和手机尺寸是否正常，能否反复发射 | 5 | 10 |

### 评分档位

**写实感**

- 1：简笔画或卡通，结构明显不对
- 2：看得出是火箭，但大面积平涂、比例不对，像插画
- 3：结构和比例基本对，有明暗，但材质和细节明显不足
- 4：结构、材质和光照都到位，静止时接近写实，只有少量破绽
- 5：第一眼像真实发射直播的画面，放大看细节也经得起推敲

**火焰与烟雾**

- 1：火焰和烟是静态色块，或者干脆没有
- 2：有粒子效果，但形状规整、颜色单一，看着像贴图
- 3：火焰分层和烟云都有，但变化生硬，或者遮住了火箭主体
- 4：火焰分层自然，烟云有体积感，并随高度明显变化
- 5：接近真实影像，火焰强弱闪动和环境光照联动

**镜头与连贯**

- 1：有跳变、黑屏或切镜头，阶段之间断开
- 2：能连起来，但有卡顿，运动很机械
- 3：全程连贯没有跳变，但重量感和加速感一般
- 4：一个镜头拍到底，起飞的重量感、加速和转弯都自然
- 5：像真实转播，节奏、重量感和镜头运动都很讲究

**稳定与适配**

- 1：硬性检查有没通过的项
- 2：能跑完，但明显掉帧，或手机尺寸下布局坏掉
- 3：能跑完，有少量小问题
- 4：稳定，桌面和手机尺寸都正常
- 5：稳定流畅，连续重新发射多次没有问题，减少动态效果模式下也正常

## 历史硬性检查

| 检查项 | 怎么查 | [Claude Opus 5.5 High](outputs/claude-opus-5-5-high/claude-opus-5-5-high.html) | [GPT 6.1 Sol Extra High](outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.html) | [Claude Opus 5.5 Extra High](outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.html) | [GPT 5.6 Sol Extra High](outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.html) |
|---|---|---|---|---|---|
| 单个文件 | 只有一个 HTML 文件，没有引用任何外部资源（图片、字体、脚本、音视频、CDN） | 通过 | 通过 | 通过 | 通过 |
| 跑完全程 | 点击“点火”后能一路运行到显示“入轨成功”，中途不卡住、不中断 | 通过 | 通过 | 通过 | 通过 |
| 重新发射 | 入轨后有“重新发射”，点击能回到初始画面 | 通过 | 通过 | 通过 | 通过 |
| 控制台无报错 | 整个过程浏览器控制台没有报错（本地服务器自己的 favicon 404 不算） | 通过 | 通过 | 通过 | 通过 |
| 没有滚动条 | 1440×900 和 390×844 两种尺寸下都没有滚动条 | 通过 | 通过 | 通过 | 通过 |

## 历史需求清单

| # | 章节 | 要求 | [Claude Opus 5.5 High](outputs/claude-opus-5-5-high/claude-opus-5-5-high.html) | [GPT 6.1 Sol Extra High](outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.html) | [Claude Opus 5.5 Extra High](outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.html) | [GPT 5.6 Sol Extra High](outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.html) |
|---:|---|---|---:|---:|---:|---:|
| 1 | 火箭 | 写实的两级液体运载火箭，不是卡通、扁平或简笔画 | 1 | 0.5 | 1 | 0.5 |
| 2 | 火箭 | 箭体细长（总高约为直径的 12 倍），占画面高度一半以上 | 1 | 1 | 1 | 1 |
| 3 | 火箭 | 分段完整：尖拱形整流罩、二级、颜色略深带加强筋的级间段、一级、发动机舱 | 1 | 1 | 1 | 1 |
| 4 | 火箭 | 一级细节：四片收拢的栅格舵、四条收起的着陆支腿、至少三个钟形喷管和管线 | 1 | 1 | 1 | 0.5 |
| 5 | 火箭 | 材质：圆柱面有明暗渐变，有焊缝、面板接缝、铆钉和高光带，发动机舱周围有烟熏痕迹 | 1 | 1 | 1 | 1 |
| 6 | 火箭 | 低温细节：液氧贮箱处有白霜，侧面持续冒出并散开的白色蒸汽 | 1 | 1 | 1 | 1 |
| 7 | 火箭 | 有虚构的任务名称、编号和徽标，没有真实机构或公司的标志 | 1 | 1 | 1 | 1 |
| 8 | 火箭 | 光照：有明确光源方向对应的受光面和背光面，泛光灯在箭体上落下暖色光斑 | 0.5 | 0.5 | 0.5 | 0.5 |
| 9 | 发射场 | 黎明天空：从深蓝渐变到地平线的橘粉色，有带边缘光的云，还留着几颗星星 | 1 | 0.5 | 1 | 1 |
| 10 | 发射场 | 混凝土发射台和导流槽，台面有焦痕和油渍；远处有平原或海岸线、储罐，以及越远越淡的薄雾 | 1 | 0.5 | 1 | 0.5 |
| 11 | 发射场 | 钢桁架勤务塔（平台、爬梯、顶部闪烁的红色障碍灯）、连着箭体的脐带臂、避雷塔和泛光灯 | 1 | 1 | 1 | 1 |
| 12 | 发射场 | 待发画面是“活”的：灯在闪、水汽在飘、云在缓慢移动 | 1 | 1 | 1 | 1 |
| 13 | 点火与起飞 | 从 T-10 开始倒数，T-7 时发射台两侧涌出白色水汽 | 1 | 1 | 1 | 1 |
| 14 | 点火与起飞 | 临近点火时脐带臂依次摆开、脱离箭体 | 1 | 1 | 1 | 0.5 |
| 15 | 点火与起飞 | 点火：先冒小火苗再汇成稳定火柱，白、黄、橙、红分层；火焰被导流槽劈向两侧，烟云贴地扩散并遮住箭体底部 | 1 | 0.5 | 0.5 | 0.5 |
| 16 | 点火与起飞 | 火光把发射台、塔架、云底和箭体下半截映成暖橙色，并随火焰强弱闪动 | 1 | 0.5 | 1 | 0.5 |
| 17 | 点火与起飞 | 离台有“很重”的感觉：前 2–3 秒缓慢抬起再不断加速；画面震动随推力变化，离地后逐渐减弱 | 1 | 1 | 1 | 0.5 |
| 18 | 点火与起飞 | 离开塔架后平滑地向画面一侧倾斜（重力转弯） | 1 | 1 | 1 | 1 |
| 19 | 升空 | 镜头从固定变为跟随，火箭保持在画面偏下，地面和塔架移出画面；没有切镜头、黑屏或闪帧 | 0.5 | 0.5 | 0.5 | 1 |
| 20 | 升空 | 尾焰随高度变化：低空短、亮、粗并带菱形马赫盘，高空变长变宽变淡，接近真空时成为淡蓝白色锥形羽流 | 1 | 1 | 0.5 | 1 |
| 21 | 升空 | 尾迹：低空留下浓密白色烟迹，被风吹弯、扩散，越高越细越淡，最后消失 | 0.5 | 0.5 | 0.5 | 1 |
| 22 | 升空 | 天空由浅蓝到深蓝再到近黑；云层依次向下掠过，穿云时画面略朦胧；星星逐渐出现，地平线浮现大气层亮线 | 1 | 1 | 1 | 1 |
| 23 | 升空 | Max-Q：火箭短暂抖动，周围出现一圈白色凝结云环，随后恢复平稳 | 0.5 | 1 | 1 | 1 |
| 24 | 升空 | 一二级分离：一级关机、尾焰熄灭、短暂滑行，级间分离，一级翻转着变小下落，二级点火换成淡蓝白色、几乎无烟的羽流 | 1 | 1 | 1 | 1 |
| 25 | 升空 | 整流罩两瓣向两侧张开脱落，露出里面的卫星 | 1 | 1 | 1 | 1 |
| 26 | 入轨 | 弧形地球：海洋、云层、陆地和发光的大气边缘；一侧日出带镜头光晕，另一侧夜半球有城市灯光；上方是繁星 | 1 | 0.5 | 1 | 1 |
| 27 | 入轨 | 卫星脱离二级，展开两块太阳能电池板并飘远；二级关机，镜头拉远，画面安静下来 | 1 | 1 | 1 | 0.5 |
| 28 | 入轨 | 显示“入轨成功”和最终遥测（高度约 400 km、速度约 7.7 km/s、任务时间） | 1 | 1 | 1 | 1 |
| 29 | 入轨 | “重新发射”回到发射前的初始画面，可以反复发射 | 1 | 1 | 1 | 1 |
| 30 | 界面与技术 | 初始只有醒目的“点火”按钮和“待命”状态，点击后按钮不可再点 | 1 | 1 | 1 | 1 |
| 31 | 界面与技术 | 遥测面板显示任务时间、高度、速度和当前阶段，数值和画面一致，连续变化不跳变 | 1 | 1 | 1 | 1 |
| 32 | 界面与技术 | 页面没有滚动条，窗口大小变化时自动适配，手机竖屏下构图和按钮完整可用 | 1 | 1 | 1 | 1 |
| 33 | 界面与技术 | 按真实经过的时间推进（60Hz 和 120Hz 屏幕速度一致），高分屏清晰；减少动态效果模式下减弱震动和闪烁，仍能完整发射 | 1 | 0.5 | 1 | 1 |
| 34 | 界面与技术 | 时长：点火到离台约 12–15 秒，离台到入轨约 40–50 秒，入轨收尾约 10–20 秒，总长约 60–90 秒 | 1 | 0.5 | 1 | 0.5 |

## 历史评分结果

| 模型 | 需求覆盖 | 写实感 | 火焰与烟雾 | 镜头与连贯 | 稳定与适配 | 总分 |
|---|---:|---:|---:|---:|---:|---:|
| [Claude Opus 5.5 High](outputs/claude-opus-5-5-high/claude-opus-5-5-high.html) | 32 | 4 | 4 | 4 | 4 | 85.6 |
| [GPT 6.1 Sol Extra High](outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.html) | 28.5 | 3 | 3 | 3 | 3 | 69.5 |
| [Claude Opus 5.5 Extra High](outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.html) | 31.5 | 4 | 4 | 4 | 4 | 85.1 |
| [GPT 5.6 Sol Extra High](outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.html) | 29 | 3 | 3 | 3 | 5 | 74.1 |

## 历史模型点评

### [Claude Opus 5.5 High](outputs/claude-opus-5-5-high/claude-opus-5-5-high.html)

**优点**

- 时间线完全按要求：点击即进入 T-10，T-7 水幕，T-5.6/-4.7/-3.8 三根脐带臂依次摆开，T-3 先冒小火苗、T-1.2 汇成火柱；T+50 二级关机，T+53 星箭分离，T+66 显示“入轨成功”。点击到离台约 12–13 秒，离台到入轨约 50 秒，收尾 13 秒，总长 76 秒，全部落在 Prompt 的区间内。
- 火箭本体细节扎实：70 m 高、5.8 m 宽（约 12:1），待命时占画面高度约 56%；整流罩、二级、深色带加强筋的级间段、一级、发动机舱分段清楚，有焊缝环、竖向面板缝、铆钉、高光带、发动机舱烟熏、液氧段白霜、侧面持续冒出的蒸汽，以及虚构的 DAWNLINE / DL-07 / B1107 和任务徽标。
- 离台有重量感：T+1 只抬升约 1 m，T+2 约 4 m，T+3 约 11 m，之后不断加速；T+7 离开塔架才开始重力转弯，角度平滑增加。低空尾焰短而亮，能看到菱形马赫盘（T+7.5 放大帧），二级换成淡蓝白、几乎无烟的真空羽流。
- 分离段完整：T+33.5 一级关机、尾焰熄灭、滑行，T+35 级间分离，一级翻滚着变小下落；T+41.5 整流罩两瓣张开飘走露出卫星，T+55.5 起太阳能板分三段展开，镜头最后拉远。入轨画面有弧形地球、发光大气边缘、右侧日出星芒和镜头光晕、左侧夜半球城市灯光。
- 一个镜头拍到底，没有切镜头和黑屏；遥测用单调插值，数值连续；页面无报错、无滚动条，手机竖屏下遥测改成两列、按钮完整；“重新发射”回到待命画面后能再完整发射一次；减少动态效果模式下震动降到 12%、闪烁减弱，仍能跑到“入轨成功”。

**不足**

- 入轨后的地球纹理放大后有明显的阶梯状色块（T+62 起，2 倍像素密度截图里云带和陆地边缘一格一格的），这是贴图分辨率低、又按竖条贴在弧面上造成的，是写实感里最显眼的破绽。
- 低空尾迹太弱：T+7 到 T+23 只有一条细而淡、基本笔直的半透明带子，看不出“浓密白烟被风吹弯、扩散”。尾焰在 5–10 km（T+18、T+21）就已经偏蓝白、变得很宽，变色来得过早。
- Max-Q（T+19–25）的凝结云只是级间段和整流罩根部两侧的几团白雾，读不出“一圈”云环；抖动只能从源码确认（振幅加 5 像素）。
- 镜头跟随时火箭基本在画面正中，二级段（T+36 以后）甚至停在偏上 40% 的位置，没有做到“保持在画面偏下”。泛光灯在箭体上的暖色光斑很淡，待命时整枚火箭偏淡紫灰，受光面和背光面的对比也偏弱。
- 烟云由同一种圆形软边贴图叠出来，点火后 T+1–T+3 的地面烟团是一大片均匀的橙色亮团，层次感一般；卫星、二级箭体和飞行中的云偏简单。
- 截图证明不了的部分：音效（Web Audio 合成倒计时音、轰鸣、分离声，点击后才创建，有静音开关）只看了代码；真实屏幕上的帧率没法在无头模式里测，代码按 rAF 时间戳推进、像素密度上限 2；窗口缩放只看了代码，飞行中途缩放会重新摆放远景云（`buildClouds`），可能出现一次跳动。

### [GPT 6.1 Sol Extra High](outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.html)

**优点**

- 五项硬性检查在已测范围内全部通过：单个 HTML 且无外部资源，能完整入轨、重新发射，控制台未收集到报错，1440×900 和 390×844 没有滚动条。真实时钟下完成桌面一次、手机连续两次完整发射及复位，不仅依据源码或虚拟时间判断能否跑完。
- 箭体分段、圆柱面明暗和结构细节可辨；固定需求清单中 23 项做到、11 项部分做到，无 0 分项，需求覆盖为 28.5/34。点火、离台、Max-Q、级间分离、二级点火、整流罩分离、卫星释放和入轨等阶段均已核对。
- 尾焰有颜色分层和马赫盘，并随高度及二级点火变化；火箭能连续完成转弯、分离和入轨，真实运行抽查未见切镜头或中断。最终遥测达到 400 km、7.7 km/s，可回到待命再次发射。
- 减弱动态模式在桌面 DPR1 下完成约 80 秒真实时间发射并复位；真实窗口缩放以及 DPR2 待命、倒计时和尺寸切换抽查均完成。完整高分屏实时发射和实体刷新率测试不在已验证范围内。

**不足**

- 写实感 3 分：待命 T−10 时虽有圆柱明暗和结构细节，整体仍偏精细矢量示意图；暖色泛光灯、云边缘光、场地焦痕和远景雾层较弱。T+55 以后地球陆地呈大块直边多边形，实际构图未辨认到夜半球城市灯，因此需求 1、8、9、10、26 均只记 0.5。
- 火焰与烟雾 3 分：T−3 至低空段尾焰形状规整，红色外层、翻卷湍流，以及塔架、云底和箭体的火光联动不足；浓密、弯曲的低空尾迹不突出。需求 15、16、21 均只记 0.5。
- 镜头与连贯 3 分：跟随段主体多居中或偏上，没有保持在画面偏下；整体重量感和连续转播感一般。T+30 至 T+39，脱落一级与二级羽流存在画面重叠。需求 19 只记 0.5；真实复核未复现虚拟同步长跳步的黑底，不把该现象作为原产物黑屏扣分。
- 稳定与适配 3 分：T+8 至 T+15，尤其 T+8 至 T+12，白雾明显削弱底部遥测和按钮的对比度，桌面和手机均出现；普通模式复位后旧成功标题约 2 秒才淡出；短横屏入轨画面中卫星略压住成功副标题。这些属于能跑完但有小问题，不改写为硬性检查失败。
- 分段时长未完全符合要求：真实点击后约 13 秒基本离台、约 65 秒遥测到 400 km、约 77 秒进入成功状态、约 79.5 秒成功标题完全显示。总时长符合 60–90 秒，但离台至入轨分段超出 40–50 秒，需求 34 只记 0.5。
- 验证边界：需求 33 只记 0.5，减弱动态完整发射及高分屏抽查已有实际证据，但完整高分屏实时发射、实体 60/120Hz 一致性、未完成的 60/120 虚拟比较、实际设备帧率及音效听感均未验证。虚拟时钟只用于桌面第二遍逐阶段核对及手机 DPR3 序列与一次重复，不作为真实耗时、音效或设备帧率证据；截图序列不等于逐帧排除所有闪帧。

### [Claude Opus 5.5 Extra High](outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.html)

**优点**

- 时间线全部落在 Prompt 的区间内：点击即进入 T-10，T-7 水幕，T-5.4/-4.6/-3.8/-3.2 四根脐带臂依次摆开，T-3 先冒三簇小火苗、T-0.7 推力拉满；T+0 夹持臂张开，T+1 只抬升约 1 m、T+2 约 5 m、T+3 约 13 m，T+2.6 离台（点击后约 12.6 秒），之后不断加速；T+8 开始重力转弯；T+24 一级关机、T+26 级间分离、T+28.2 二级点火、T+33 整流罩分离、T+44.5 二级关机入轨、T+46.5 星箭分离、T+49–T+54.5 太阳翼展开、T+58 显示“入轨成功”（点击后 68 秒）。离台到入轨 44.5 秒，星箭分离到成功 11.5 秒。60 fps 和 120 fps 两遍逐帧运行，同一时刻的遥测完全一致。
- 火箭和发射场细节扎实：箭长 70.5 m、半径 2.9 m（约 12:1），待命时占画面高度约 56%；整流罩有 DAWNLINK-7 / 晨曦-7 字样和虚构徽标，黑色带竖肋的级间段上有 HALCYON 标识和收拢的栅格舵，一级有 HALCYON / 赫利昂-2 / B1027 标识、正面和两侧收起的着陆支腿、电缆整流罩，发动机舱露出三只黑色钟形喷管和管线；焊缝环、面板缝、铆钉、右侧受光的高光带和尾段烟熏在 2 倍像素密度下仍然清楚。发射场有带平台、之字形楼梯和闪烁红色障碍灯的桁架塔、四根脐带臂、两座避雷塔和悬链线、三根带光束的泛光灯、有导流槽和焦痕油渍的混凝土台、左侧平原储罐、右侧海面和地平线薄雾；待命时云在漂、灯在闪、液氧蒸汽持续从箭体两侧冒出又散开。
- 火光和环境联动明显：T-1 到 T+3 火光把发射台、塔架、云底和箭体下半截映成暖橙色，并随火焰强弱闪动；T+5–T+9 低空拖出浓密的白色尾迹；T+11、T+14.5、T+19 依次穿过三层云，穿云时画面变朦胧；T+14.3–T+16.6 跨音速时，整流罩根部和级间段两侧出现对称的白色凝结锥，侧视下能读出“一圈”云环；二级点火后是大而淡、向外张开的蓝白真空羽流，几乎没有烟。天空由浅蓝、深蓝过渡到近黑，T+24 前后下方出现带发光大气边缘的弧形地球。
- 一个镜头拍到底，构图比较讲究：T+2.2 起由固定镜头平滑转为跟随，一级和二级飞行时箭体中心大多在画面高度约 60% 处（偏下），塔架和地面向下移出画面；分离后镜头推近二级，入轨后缓缓拉远。入轨画面有右侧日出、星芒和六边形镜头光晕、左侧夜半球城市灯光和满天星，卫星分三段展开两侧太阳翼后慢慢飘离。
- 运行稳定：60 fps 逐帧运行中，完整发射、两次“重新发射”和再次发射都正常，未收集到报错，也没有整帧空白；1440×900 无滚动条，390×844 竖屏下遥测改成两列，按钮和静音键完整；减少动态效果模式下震动降到 12%、闪烁减弱，仍能完整发射并复位。Web Audio 在点击点火后才创建（倒计时提示音、轰鸣、分离声、入轨后的安静和声），有静音开关；动画按 rAF 时间戳推进，像素密度上限 2。

**不足**

- 导流槽排焰只往右边喷（需求 15 记 0.5）：代码本意是左右交替，但交替依据是“本帧生成的第几个粒子”，60 Hz 及以上每帧最多生成 1 个，结果导流槽烟团和火舌全部喷向右侧，只有帧率低于约 30 时才偶尔出现在左侧。T-1 到 T+6 右侧翻涌大团烟云和火舌，左侧只有台面附近的烟，不是“劈向两侧”。火焰核心以白、黄、橙为主，红色外缘不明显。
- 起飞瞬间有穿帮：尾迹粒子在喷口下方约 13–24 m 处生成，起飞头几秒这个位置还在地面以下，于是 T+0.5 到约 T+5 有一条白烟柱从发射台正下方穿过台体正面，一直拖到屏幕底部，桌面和手机竖屏都看得到。
- 看不出马赫盘（需求 20 记 0.5）：代码画了菱形，但叠在已经发白饱和的火焰核心上，T+3、T+7、T+11 的 2 倍放大帧里都看不出一串明暗相间的菱形；关掉菱形绘制做差分，也只差出尾部一个很淡的菱形。尾迹（需求 21 记 0.5）只在 T+5–T+9 浓密，T+19–T+23 变成一串间隔的小圆点，看不出被风吹弯、扩散。
- 低帧率时整帧闪黑（需求 19 记 0.5，稳定与适配记 4）：页面掉帧时会自动降低画质，但这一步放在本帧绘制之后，重设画布尺寸等于把刚画好的一帧清空。按 25 fps 模拟，加载后约 1.6、3.1、4.6 秒各出现一帧整屏空白（露出深色底色），远景云也被重置位置；帧率回升到 50 以上并持续 8 秒又会升画质，再闪一次。60/120 fps 下没有出现，但性能一般的手机上很可能遇到。
- 写实感的破绽：液氧段白霜和白色箭体几乎同色，正常观看看不出，拉高对比度才见斑纹；泛光灯落在箭体上的暖色光斑很淡（需求 8 记 0.5）；烟团都由同一种圆形软边贴图叠成；入轨后的地球贴图偏糊，城市灯光是一团团拉长的黄色色块；Max-Q 抖动按源码只有约 2 像素，画面上基本看不出。
- 收尾构图被挡：T+58 起“入轨成功”卡片正好压在画面中上部，展开了太阳翼的卫星和二级都在卡片后面被模糊（1440×900 和 390×844 都是），收尾最好看的画面反而看不到；倒计时大数字压在箭体头部；T+3–T+6 镜头追赶时箭体头部贴近画面上缘。
- 证据边界：本列全部用虚拟时钟逐帧推进，没有用真实时钟完整观看；音效只看了代码；真实 60/120 Hz 屏幕的流畅度、实体手机帧率和窗口实时拖拽缩放没有实测（缩放会重建远景云，可能跳动一次）。

### [GPT 5.6 Sol Extra High](outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.html)

**优点**

- 从 T-10 倒计时到 T+64.0 入轨成功形成完整单镜头流程；Max-Q、关机与分离、二级点火、整流罩分离和卫星部署都有清楚的画面与遥测反馈。
- 火箭分段、材质渐变、焊缝、铆钉、烟熏、发射塔、储罐、脐带臂和待命蒸汽等信息密度较高。
- 基于 `performance.now()` 和 `requestAnimationFrame` 按真实时间推进，DPR 适配、桌面与手机布局、重复发射和减少动态效果模式均稳定完成。

**不足**

- 整体仍是明显的几何化 Canvas 插画，云、地球、烟团和尾焰缺少真实影像的材质、体积与光照复杂度。
- 起飞初段加速过快，重量感不足；脐带臂不是依次摆开，火焰没有明确被导流槽劈向两侧，环境橙光也没有随尾焰明显闪动。
- 只清楚画出两侧栅格舵和两组支腿；发射台污渍、远景层次和部署阶段镜头拉远等细节未完全满足要求。

## 历史评测结论

四份结果均已评测：原 Claude 评测者给出的 Claude Opus 5.5 High 为 85.6 分（保留），Claude Opus 5.5 Extra High 为 85.1 分，GPT 5.6 Sol Extra High 为 74.1 分，GPT 6.1 Sol Extra High 为 69.5 分。GPT 5.6 总分按固定权重计算为 29÷34×40 + 3÷5×20 + 3÷5×15 + 3÷5×15 + 5÷5×10 = 74.1；GPT 6.1 为 28.5÷34×40 + 3÷5×20 + 3÷5×15 + 3÷5×15 + 3÷5×10 = 69.5；Claude Extra High 为 31.5÷34×40 + 4÷5×20 + 4÷5×15 + 4÷5×15 + 4÷5×10 = 85.1（均保留一位小数）。两份 Claude 结果只差 0.5 分，属于同档；两份 GPT 结果相差 4.6 分，也属于同档。GPT 5.6 与两份 Claude 分别相差 11.5 和 11.0 分，均超过同档阈值。以上只描述四份已评分样本，不据此推出模型的普遍能力差异。

原 Claude High 记录的需求覆盖为 32/34，主要扣分是地球阶梯色块、低空尾迹、尾焰变化、Max-Q 云环和构图位置；原分数、勾选值和点评保留，本轮未重新检查。GPT 6.1 的五项硬性检查全部通过，扣分主要集中在写实与火焰质感、跟随构图、低空界面可读性和分段时长。Claude Extra High 的五项硬性检查也全部通过，需求覆盖 31.5/34，扣分来自导流槽单向排焰、起飞时白烟柱穿过台体、马赫盘与高空尾迹、泛光灯光斑，以及低帧率下整帧闪黑和成功卡片遮挡。GPT 5.6 的五项硬性检查全部通过，需求覆盖 29/34，完整性和稳定适配突出；主要扣分在几何化材质、火烟光照、起飞重量感、脐带臂时序、一级外部结构细节和部署阶段镜头拉远。

这是不同评测者对各一个原始样本的比较，不是同一评测者的盲评或重复试验。各列评测者分别与对应生成者同属 Claude / GPT 模型系列；两份 GPT 评测者虽未参与生成并使用独立上下文，仍可能存在同源偏差，GPT 5.6 评测者与生成者还是同一型号。Claude Extra High 一列的评测者与生成者是同一个模型，且评分前看过另两列分数和点评，同源偏差和锚定风险最高。各列检查范围并不完全一致，评测方法和尺度差异也可能影响分差；完整实体设备、真实刷新率及音效等未验证项仍需人工复核。
