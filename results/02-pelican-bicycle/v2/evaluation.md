# 02 · 鹈鹕骑自行车：评测（Prompt v2）

- **Prompt**：[prompt-v2.md](../../../prompts/02-pelican-bicycle/prompt-v2.md)
- **评测协议**：2
- **标准冻结日期**：2026-10-10
- **评测日期**：未完成人工复核
- **评测者**：统一脚本检查；人工复核者尚未登记
- **评测方式**：核心验收与细节覆盖分离；图片模式视觉质量采用匿名成对比较，不再输出加权总分。历史 AI 分数只作历史记录。
- **评测环境**：本机 Chrome，以 img 加载原始 SVG；桌面 1440×900 / 手机 390×844、DPR 1 / 2、减少动态模式。自动实测边界及浏览器版本写在记录中。

## 协议说明

先冻结新标准，再统一复核全部四份原始产物。旧分数、方法和点评原文保留；不将旧“通过”直接继承到新协议。

- pass / partial / fail / pending 分别表示通过、部分做到、未通过、待确认。证据不足及未测为 pending，不折算为半分。
- core 中任一 fail 即核心未通过；没有 fail 但有 pending 则待确认；全部已确认但含 partial 则部分做到；全部 pass 才核心通过。漂亮的构图不能抵消脚离踏板、无动画等核心失败。
- 图片模式是正式验收环境；内联定格和源码只能辅助。自动画面差异证明有像素变化，不证明车轮方向、脚踏同步或无缝循环。
- 每条非 pending 记录须有观察依据、检查者、时间、产物 SHA-256 和标准指纹。未观测到问题不等于所有连续时刻均正确。
- 人工至少观察三个完整循环，再检查双脚、曲柄及接缝；发现明显脱脚即 foot-contact fail，不用其他优点补偿。无法判断应记 pending。
- 随机产物顺序、比较顺序和左右位置，封存前不展示身份和旧分数。匿名是标签隐藏加评测者自述，不保证画面本身无法识别来源。
- 人工意见冲突回到 pending，保留各方证据。同一评测者、同一视口的新记录更新其旧结论；不同视口不相互覆盖。AI 可以找证据，但不能标为人工。
- 各维度允许左优、右优、持平、无法判断。只有双方均核心通过的比较计入正式胜 / 负 / 平 / 无法判断次数，其余记录保留。同一评测者、同一视口只汇总最新完整会话，不重复计票。不做加权总分或跨实验总榜。
- 未来多 AI 辅助评测须各自独立评完整批样本、不得读旧分数，由人工裁决分歧。不同生成工具和联网权限必须同时展示；单次生成不代表模型普遍能力。

## 验收标准

| ID | 级别 | 方法 | 要求 | 验证方式 |
|---|---|---|---|---|
| svg-valid | core | auto | 合法 SVG 且具有有效 viewBox | 浏览器 XML 解析无错误、根元素与 viewBox 核对、img 解码成功 |
| no-script | core | auto | 无脚本和事件属性 | XML DOM 扫描 script 与 on 开头属性，禁 javascript URL |
| standalone | core | auto | 无外部文件引用 | XML DOM、CSS URL 与 import 检查，只允许内部片段或内嵌 data；img 模式网络请求另核对 |
| animation | core | auto | img 模式动画确实在运行 | 每种固定环境真实采样 12 秒以上，至少两个采样帧不同；不据此证明正确蹬踏或无缝 |
| pelican | core | human | 可辨认的加州褐鹈鹕 | 正常 img 画面辨认形象，不能仅靠标题 |
| pouch | core | human | 大喉囊可见 | 正常画面定位喉囊 |
| plumage | core | human | 繁殖羽色齐全 | 分别定位黄白头顶、栗色后颈、红喉囊，缺失注明 |
| frame | core | human | 自行车菱形车架连接正确 | 核对主车架、后叉及前叉，不只看零件数量 |
| spokes | core | human | 两轮具有辐条 | 正常画面定位两轮辐条 |
| wheel-spin | core | human | 两个车轮确实旋转 | 连续观察轮上标记与辐条 |
| foot-contact | core | human | 双脚始终踩在踏板上 | 至少三完整循环，记录脱离相位；明显脱脚即 fail |
| crank-sync | core | human | 腿随曲柄同步蹬踏 | 连续观察相位，独立摆动或漂移不能通过 |
| seamless | core | human | 循环接缝无明显跳变 | 至少三完整循环及接缝附近观察 |
| feathers | detail | human | 羽毛示意和层次清楚 | 正常画面与局部放大核对 |
| bicycle-parts | detail | human | 车把、座椅、曲柄和踏板可辨 | 每个部件分别定位，遮挡不等于没画 |
| anatomy | detail | human | 骑姿与关节运动可信 | 核对腿长、关节弯曲及遮挡层次 |
| composition | detail | human | 主体完整未被 viewBox 裁切 | 两种展示尺寸核对喙、尾、车轮及构图 |

## 比较维度

| ID | 维度 | 观察重点 |
|---|---|---|
| identity | 形象与羽毛 | 鹈鹕辨识度、繁殖羽色和羽毛层次 |
| craft | 构图与细节 | 结构可信度、层次、配色及完成度 |
| motion | 动作与节奏 | 骑姿自然度、循环节奏和额外动态细节 |

## 验收记录

无记录的项目保持 pending；脚本不自动确认脚踏同步等视觉语义。

```json
[
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:50:20.751Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":43.04},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":37.25},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":48.1},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":40.55}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:50:20.751Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":43.04},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":37.25},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":48.1},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":40.55}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:50:20.751Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":43.04},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":37.25},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":48.1},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":40.55}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:50:20.751Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":43.04},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":37.25},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":48.1},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":40.55}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:50:54.782Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":30.75},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.17},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.37},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.69}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:50:54.782Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":30.75},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.17},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.37},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.69}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:50:54.782Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":30.75},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.17},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.37},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.69}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:50:54.782Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":30.75},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.17},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.37},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.69}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:51:28.670Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.25},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":29.97},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.1},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.85}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:51:28.670Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.25},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":29.97},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.1},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.85}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:51:28.670Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.25},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":29.97},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.1},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.85}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:51:28.670Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.25},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":29.97},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.1},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.85}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:51:53.165Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.28},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.95},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.88},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.48}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:51:53.165Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.28},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.95},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.88},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.48}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:51:53.165Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.28},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.95},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.88},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.48}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T14:51:53.165Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.28},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.95},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.88},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.48}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:18:23.636Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":57},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":54.6},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":64.68},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":51.89}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:18:23.637Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":57},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":54.6},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":64.68},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":51.89}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:18:23.637Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":57},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":54.6},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":64.68},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":51.89}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-xhigh",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:18:23.637Z",
    "sha256": "3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":57},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":54.6},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":64.68},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":51.89}],\"files\":[\"claude-opus-5-5-xhigh.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:03.178Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.94},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.01},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":38.33},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.23}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:03.179Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.94},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.01},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":38.33},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.23}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:03.179Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.94},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.01},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":38.33},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.23}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "claude-opus-5-5-high",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:03.179Z",
    "sha256": "17012f4617610958c65cb937d5465715bd2a53571549b8712d0de5389665e9ef",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.94},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":33.01},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":38.33},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":32.23}],\"files\":[\"claude-opus-5-5-high.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:35.177Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":30.53},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.31},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.36},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":29.36}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:35.178Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":30.53},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.31},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.36},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":29.36}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:35.178Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":30.53},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.31},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.36},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":29.36}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-5-6-sol-xhigh",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:35.178Z",
    "sha256": "c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":30.53},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":28.31},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":31.36},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":29.36}],\"files\":[\"gpt-5-6-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "svg-valid",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:59.473Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":22.88},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":21.68},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.63},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.74}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "no-script",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:59.474Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":22.88},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":21.68},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.63},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.74}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "standalone",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:59.474Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":22.88},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":21.68},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.63},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.74}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  },
  {
    "key": "gpt-6-1-sol-xhigh",
    "id": "animation",
    "status": "pass",
    "source": "auto",
    "reviewer": "artifact-checker-v2",
    "at": "2026-10-10T15:19:59.474Z",
    "sha256": "3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5",
    "fingerprint": "2b5ffdbe00cd5ab32992f116c3aa8bc2aa6564639acbbc5e8b304537a35daedc",
    "evidence": "{\"browser\":\"154.0.8037.98\",\"platform\":\"win32\",\"node\":\"v22.17.0\",\"profiles\":[{\"name\":\"desktop\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"mobile\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"no-preference\"},{\"name\":\"dpr2\",\"viewport\":{\"width\":1440,\"height\":900},\"deviceScaleFactor\":2,\"reducedMotion\":\"no-preference\"},{\"name\":\"reduced\",\"viewport\":{\"width\":390,\"height\":844},\"deviceScaleFactor\":1,\"reducedMotion\":\"reduce\"}],\"clock\":\"real\",\"concurrency\":4,\"checkerSha256\":\"ce87ae646ff3963388e57750bbfcca8029d94ba205a8be679fb0d71b678166e8\",\"limit\":\"功能检查；不测实体帧率、视觉语义或音效\",\"observations\":[{\"profile\":\"desktop\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":22.88},{\"profile\":\"mobile\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":21.68},{\"profile\":\"dpr2\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":23.63},{\"profile\":\"reduced\",\"valid\":true,\"scripts\":false,\"refs\":[],\"resources\":[],\"uniqueFrames\":25,\"samples\":25,\"seconds\":20.74}],\"files\":[\"gpt-6-1-sol-xhigh.svg\"]}"
  }
]
```

## 人工比较

只导入网站已封存的人工会话，浏览器草稿不直接成为网站公开数据。

```json
[]
```

## 评测结论

协议 2 已冻结，全部产物等待统一验收及人工匿名比较。旧点评中有关脱脚的判断只能作为历史线索，不能直接冒充本次人工结论。完成核心人工复核之前，不发布当前总分或胜者。

## 历史评测信息

- **Prompt**：[prompt-v2.md](../../../prompts/02-pelican-bicycle/prompt-v2.md)
- **评测日期**：2026-10-09（Claude Opus 5.5 Extra High、GPT 5.6 Sol Extra High 两列同日补评）
- **评测者**：旧 Claude 记录来自原评测者：Claude 子代理（与被测模型同为 Claude 系列，可能存在同源偏差）；原分数、硬性检查值和点评保留，本轮不重评。新增 GPT 6.1 记录由 GPT 6.1 Sol Extra High 独立子代理给出（未参与生成，与生成者不同上下文，但同模型系列，仍可能存在同源偏差）。Claude Opus 5.5 Extra High 一列由 Claude Opus 5.5 子代理评分（未参与生成、与生成者不同上下文，但与被测模型同一家族同一型号，同源偏差风险最高，建议人工复核）。GPT 5.6 Sol Extra High 一列由 GPT 5.6 Sol Extra High 独立子代理评分（未参与生成且使用独立上下文，但与被测产物是同一个模型，仍存在同源偏差）；主代理仅按其封存报告整合，不改变分数
- **评测方式**：旧 Claude 记录（保留原评测者的方法说明，未重新验证）：通读 SVG 源码并检查脚本、事件属性和外部引用；用无头 Chrome 以 `<img>` 方式渲染，确认图片模式下动画在跑；再把 SVG 内联进临时页面，用 `pauseAnimations()` + `setCurrentTime()` 定格 t=0、0.4、0.8、1.2、1.6、64 秒等时刻截图，并放大头部、身体、传动系统和前轮检查；另用脚本逐帧核对 48 个关键帧里双脚与踏板的位置、腿长是否恒定、首尾帧是否一致。被测产物由 Claude Opus 5.5（high）在本仓库的 Claude Code 中生成，评测者是同系列模型的子代理，打分可能偏宽，建议人工复核。新增 GPT 6.1 记录：先用脚本只提取“评分维度”整节及硬性检查表前两列，独立确定分数后才读取完整评测文件；未查看生成会话、生成者自检、其他实验或旧模型源码。解析新 SVG 检查合法性、viewBox、脚本、事件属性、外部引用和无限循环；用独立 Playwright 启动自有无头 Chrome，以 `<img>` 加载原文件字节，连续采样约 8.79 秒、81 帧，并阅览覆盖至少三个 2.4 秒循环的连续帧和局部放大图；再在仓库外临时内联页面用 `pauseAnimations()` / `setCurrentTime()` 检查 8 个循环内姿态及 2.399、2.400、2.401 秒接缝，按 0.005 秒间隔核对一个周期的 481 个姿态中双脚、踏板、曲柄端点及腿段长度。分数以 img 模式实际可见效果为准，内联定格和源码只作辅助。Claude Opus 5.5 Extra High 记录：按本文件已有的维度、档位和硬性检查评分，没有改动标准；评分前已读过另两列的分数和点评，并为校准尺度看过两者各一帧定格图，存在锚定可能；未查看生成会话、生成脚本或生成者自检。通读 SVG 源码，核对 viewBox、脚本、事件属性、外部引用，以及 31 个 SMIL 动画的循环设置和首尾值；用 Python minidom 解析确认是合法 XML；在仓库外临时页面内联 SVG，用 `pauseAnimations()` / `setCurrentTime()` 定格 t=0、0.2、0.4…1.6、3.2、64 秒，并放大头部、身体、尾基、座椅、车把、腿部和后轮；另起无头 Chrome 以 `<img>` 加载原文件，经 DevTools 协议实时连续截取约 13.4 秒、70 帧（8 个以上蹬踏周期）逐帧阅览；再用脚本按关键帧线性插值核对一个周期内 961 个姿态中踏板中心在脚掌坐标系里的位置及两者夹角。分数以 img 模式实际可见效果为准，定格和脚本只作辅助。新增 GPT 5.6 记录：封存前只读取固定标准，未查看其他模型产物、旧分数、生成过程或生成者自检；在 Chrome 图片文档中连续运行超过 60 秒，再解析 XML、检查 viewBox、脚本、事件属性、外部引用和 SMIL，并定格多个时间点核对车轮、曲柄、踏板和腿部矩阵及循环接缝；全部新分数封存后才读取旧分数用于比较
- **评测环境**：旧 Claude 记录：本地 Chrome 无头模式（file:// 打开，原文件未改动），800×600 及局部放大视图。新增 GPT 6.1 记录：Windows，本机 Chrome 154.0.8037.98 无头模式，Node.js 22.17.0、Playwright 1.62.1，独立浏览器进程及上下文，未使用共享 Playwright MCP 页面；本机临时 HTTP 服务原样提供 SVG，img 视口 1120×860、deviceScaleFactor=1，另检查局部放大和内联定格。验证脚本、页面和截图均在仓库外临时目录，SVG 未改动，SHA-256 为 `3998adef2a8c45e1668dd3cf0c7a7cecb29e57c79cc58ebe2d624b717db61cf5`；未验证其他浏览器、设备或长期运行。Claude Opus 5.5 Extra High 记录：Windows，本机 Chrome 154.0.8037.98 无头模式（`--headless=new`），Node.js 22.17.0、Python 3.12.2，未用 Playwright；img 页面 800×600、deviceScaleFactor=1，file:// 直接加载原文件；验证脚本、页面和截图均在仓库外临时目录，SVG 未改动，SHA-256 为 `3317e843e5ae913bbc1418f9e61d021929694fedb2f6ed43cba1d5d9d8deef5f`；未验证其他浏览器、设备或长期运行。新增 GPT 5.6 记录：Windows、本地 HTTP 服务、Playwright 控制的 Chrome 154，原 SVG 未改动（SHA-256 `c884bdf6ec95d3911e1131bee2d2f315ab01770edc6c4b84d24c011e985a8492`）；未验证其他浏览器、实体刷新率、设备或长期运行

## 历史评分维度

评分标准在运行模型之前写好。开始评分后不改维度、权重和档位；确实要改，先改这份标准，再把已评的产物全部重评。

- 每个维度按 0–5 分打，每一档的标准见“评分档位”。0 分表示完全没有，或文件无法打开。
- 硬性检查不通过不直接判零分。一律按“以图片方式显示时”实际看到的效果打分：脚本不会执行，外部文件不会加载，所以用脚本做出来的动画，在“循环与流畅”里按“不动”处理。
- 每份产物至少看满三个动画循环再打分。点评要写清看到了什么。
- 同一批产物全部评完后再写结论，没评完时页面不显示名次。总分相差 5 分以内算同一档。
- 已知局限：打分时知道是哪个模型；每个模型目前只跑一次。

总分 = Σ(维度得分 ÷ 满分 × 权重)，满分 100。

| 维度 | 关注点 | 满分 | 权重 |
|---|---|---:|---:|
| 鹈鹕特征与繁殖羽 | 长喙、大喉囊、羽毛示意，以及繁殖期羽色：黄白色头顶、深栗色后颈、红色喉囊 | 5 | 25 |
| 自行车结构 | 菱形车架、两个带辐条的车轮、车把、座椅、曲柄和踏板，连接关系正确 | 5 | 20 |
| 蹬踏联动 | 鹈鹕坐在车上，脚踩在踏板上，双腿随曲柄同步转动 | 5 | 25 |
| 循环与流畅 | 车轮在转，动画无缝循环，节奏自然 | 5 | 15 |
| 构图与完成度 | 画面完整、主体清楚、配色和层次协调 | 5 | 15 |

### 评分档位

**鹈鹕特征与繁殖羽**

- 1：看不出是鹈鹕
- 2：是一只鸟，有喙和喉囊，但比例或特征不对
- 3：能认出是鹈鹕，有羽毛示意，但繁殖期羽色缺两项以上
- 4：特征明确，繁殖期羽色基本到位（最多缺一项）
- 5：一眼就是繁殖期的加州褐鹈鹕，羽毛层次清楚

**自行车结构**

- 1：不像自行车
- 2：有两个轮子，但车架形状不对，或缺了很多部件
- 3：结构基本对、有辐条，少数部件缺失或连接不对
- 4：车架形状正确、部件齐全，只有小瑕疵
- 5：结构完全正确，比例合理，细节到位

**蹬踏联动**

- 1：没有骑车的姿态
- 2：坐在车上，但腿不动，或者脚不碰踏板
- 3：腿在动，但和曲柄不同步，或者脚明显脱离踏板
- 4：腿和曲柄基本同步，偶尔穿帮
- 5：全程同步，脚始终踩在踏板上，膝盖和脚踝的运动合理

**循环与流畅**

- 1：只有很小的局部在动，车轮不转
- 2：能动，但循环接缝处明显跳一下
- 3：车轮和腿都在动，循环接缝轻微可见
- 4：无缝循环，动作顺畅
- 5：无缝循环，还有额外的生动细节（羽毛飘动、身体起伏、背景移动等）

**构图与完成度**

- 1：元素重叠错乱，看不清画的是什么
- 2：主体太小、被裁掉，或画面明显没画完
- 3：画面完整，但比较平淡
- 4：构图清楚，配色协调
- 5：完成度高，可以直接当插图用

## 历史硬性检查

| 检查项 | 怎么查 | [Claude Opus 5.5 High](outputs/claude-opus-5-5-high/claude-opus-5-5-high.svg) | [GPT 6.1 Sol Extra High](outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.svg) | [Claude Opus 5.5 Extra High](outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.svg) | [GPT 5.6 Sol Extra High](outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.svg) |
|---|---|---|---|---|---|
| 合法 SVG | 能直接用浏览器打开，根元素带 viewBox | 通过 | 通过 | 通过 | 通过 |
| 没有脚本 | 没有 `<script>`，也没有 onload、onclick 之类的事件属性 | 通过 | 通过 | 通过 | 通过 |
| 没有外部文件 | 没有引用外部图片、字体或样式表 | 通过 | 通过 | 通过 | 通过 |
| 内置循环动画 | 动画写在 SVG 里（SMIL 或 CSS），并且一直循环 | 通过 | 通过 | 通过 | 通过 |

## 历史评分结果

| 模型 | 鹈鹕特征与繁殖羽 | 自行车结构 | 蹬踏联动 | 循环与流畅 | 构图与完成度 | 总分 |
|---|---:|---:|---:|---:|---:|---:|
| [Claude Opus 5.5 High](outputs/claude-opus-5-5-high/claude-opus-5-5-high.svg) | 4 | 4 | 5 | 5 | 5 | 91 |
| [GPT 6.1 Sol Extra High](outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.svg) | 5 | 4 | 5 | 5 | 5 | 96 |
| [Claude Opus 5.5 Extra High](outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.svg) | 4 | 4 | 5 | 5 | 5 | 91 |
| [GPT 5.6 Sol Extra High](outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.svg) | 5 | 5 | 3 | 5 | 5 | 90 |

## 历史模型点评

### [Claude Opus 5.5 High](outputs/claude-opus-5-5-high/claude-opus-5-5-high.svg)

**优点**

- 繁殖羽四项都画到了：黄色头顶、白色脸和颈侧白纹、深栗色后颈、红色喉囊；灰色长喙末端带红色钩尖，眼周粉红，背部灰褐、腹部深褐，翅膀覆羽有白色羽缘，初级飞羽黑褐色，一眼能认出是鹈鹕。
- 自行车是标准菱形车架（上管、下管、立管、后上叉、后下叉、前叉都接对了位置），两个车轮各约 36 根切向交叉辐条，还有气门嘴、反光片、带齿牙盘、飞轮、链条、两侧曲柄和踏板、座杆和车把。牙盘和飞轮半径比 2:1，正好对应曲柄 1.6 秒一圈、车轮 0.8 秒一圈，上下两段链条的移动方向也对。
- 蹬踏是真正联动的：两只脚的位置在全部 48 个关键帧里都和踏板位置完全重合（作者还算进了自行车整体 0.86 倍缩放），大腿和小腿长度全程不变（约 48.6 和 93.0），脚掌跟着踏板角度转，近侧腿在车架前、远侧腿在车架后，层次正确。
- 循环无缝：所有动画都是无限循环，带关键帧的动画首尾值相同，远景草坡、海浪、云按 800 宽度平铺后平移，接缝看不出来。另有身体随蹬踏轻微起伏、头和喉囊轻轻点动、近快远慢的背景视差、路面虚线和速度线，画面很生动。
- 以 `<img>` 方式显示时动画正常运行；海岸公路背景、配色和构图都很完整，可以直接当插图用。

**不足**

- 羽毛是同一种叶片形状的平铺图案，身体和翅膀看起来像鱼鳞，层次感不如真实羽毛；头部是一个简单椭圆，略卡通。
- 大腿画成一块带虚线缝线的深褐色梯形，像裤腿；关节向后弯（按鸟类的“反关节”处理，说得通），但在 t=0.8 秒附近膝部向后甩到后轮上方，看起来有点别扭。
- 车把只是一小段弯管加握把，大半被翅尖挡住；座椅被身体遮住；链条只是两条直的虚线，没有绕过牙盘和飞轮；没有刹车。
- 小细节：车轮每秒转 450°、辐条间距约 10°，在 60Hz 屏幕上可能出现车轮倒转的错觉；路边灰色细虚线 0.025 秒一个周期，比一帧还短，会出现闪烁或倒退的错觉。这两点是按代码推算的，截图看不出来。

### [GPT 6.1 Sol Extra High](outputs/gpt-6-1-sol-xhigh/gpt-6-1-sol-xhigh.svg)

**优点**

- 鹈鹕特征与繁殖羽 5 分：img 画面中长喙末端带钩、大红色喉囊和弯曲长颈都清楚；黄色头顶、白色脸及颈侧、深栗色后颈、红色喉囊四项可见。翅膀有分层覆羽、浅色羽缘、长飞羽和展开的尾羽，层次清楚，达到既定 5 分档。
- 自行车结构 4 分：菱形主车架和后轮三角明确，前叉接到前轮轴，两个车轮均有辐条，车把、牙盘、链条、两侧曲柄和踏板可辨，车轮与车架比例合理；座椅遮挡的问题见不足。
- 蹬踏联动 5 分：至少三个 img 循环中，两腿交替弯伸，两脚保持踩在水平踏板上，未见可见脱离或曲柄相位漂移；远侧部件被车架、牙盘或近侧腿局部遮挡时，运动仍连续。辅助核对的 481 个姿态中，两踏板与各自曲柄端点最大偏差约 0.021 SVG 单位，双脚始终与各自踏板一起移动，足底与踏板上沿的接触间隙为 0，脚踝与小腿末端偏差为 0；两踏板保持相反相位，大腿长度约 118、小腿约 116，采样中长度变化均小于 0.01 SVG 单位，膝部和脚踝运动连贯。
- 循环与流畅 5 分：img 连续帧中两轮辐条及气门标记确实转动，曲柄与腿持续蹬踏，道路标线持续向后移动；三个循环未见明显接缝或突跳。辅助定格的首尾姿态及 2.399、2.400、2.401 秒画面连续。鸟体本身没有额外起伏，但道路移动已满足既定 5 分档的背景移动条件，不因缺少其他加分细节扣分。
- 构图与完成度 5 分：长喙、喉囊、尾羽和两个车轮均完整落在 viewBox 内，主体醒目，羽毛、车架、传动系统和海岸背景层次可辨；浅色海岸配青绿车架，红喉囊形成清楚的视觉重点，可直接作为完整插图使用。

**不足**

- 座椅及座杆上端被躯干遮住，img 画面不能清楚辨认座面和骑乘支撑位置。源码有座椅不等于图片中展示清楚，因此自行车结构不取 5 分；其余主要部件及连接完整合理，按既定“车架形状正确、部件齐全，只有小瑕疵”的 4 分档处理，不把遮挡误写成未绘制。
- 本轮只验证本机 Chrome 的实际图片显示、三个以上短循环和辅助定格采样；其他浏览器、设备、帧率下的观感及长期运行未验证。有限采样不是对所有连续时刻的数学证明；未见可见脱脚或接缝，不据此宣称跨环境完全无误。

### [Claude Opus 5.5 Extra High](outputs/claude-opus-5-5-xhigh/claude-opus-5-5-xhigh.svg)

**优点**

- 繁殖期羽色画得最全：白色头部带黄色头顶、深栗色后颈、前颈一道白色纵纹、颈基部一小块黄斑、眼周粉红裸皮；长喙浅粉褐色，末端是红橙色钩尖；喉囊又大又红，近喙基处鲜红、往喙尖方向渐变为暗褐色；背和翼覆羽银灰、腹部深褐，整体配色符合繁殖期加州褐鹈鹕。头部有轮廓和枕部羽簇，不是简单椭圆。
- 自行车结构完整：菱形车架的上管、下管、立管、后上叉、后下叉、头管和带前倾的前叉都接在正确位置，五通略低于两轴；两个车轮各 32 根切向交叉辐条，另有轮胎花纹、气门嘴、辐条反光片、轮圈反光条和快拆杆；牙盘 36 齿、飞轮 18 齿正好 2:1，对应曲柄 1.6 秒一圈、车轮 0.8 秒一圈；链条绕过牙盘和飞轮形成闭合环，链节随曲柄移动；还有弯把、把立、刹车手柄、前后卡钳刹车和沿上管的刹车线，两侧曲柄和踏板齐全。
- 蹬踏严格联动：每条腿是“上段—下段—脚掌”三段链，段长固定 116.11。按 SMIL 线性插值把一个周期分成 960 份核对（961 个姿态，包括关键帧之间的时刻），踏板中心在脚掌坐标系里始终位于约 (15.0, 17.0)，偏差不超过 0.12 个 SVG 单位，踏板与脚掌夹角偏差不超过 0.01°，即脚全程锁在踏板上并跟着踏板转；两腿相位相反，膝部弯曲角在约 30°–113° 之间平滑变化。以 `<img>` 实时连续截取约 13.4 秒、70 帧（8 个以上蹬踏周期），每一帧双脚都踩在踏板上；近侧腿画在车架前，远侧腿压暗放在车架后，层次正确。
- 循环无缝而且生动：31 个 SMIL 动画全部 `repeatCount="indefinite"`；8 组腿和踏板关键帧首尾一致（踏板相对角从 6° 到 -354°，叠加曲柄一整圈后绝对角首尾相同）；云层按 800、棕榈和护栏按 1000、路面碎石按 1020、路面黄线按 120 的周期平铺平移，接缝看不出；路面碎石移动速度约 785 px/s，正好等于车轮滚动线速度（半径 100、0.8 秒一圈），车轮不打滑。附加细节有头颈随蹬踏点动、喉囊轻晃、枕部羽簇和尾羽抖动、远处一队鹈鹕扇着翅膀飞过、近快远慢的视差、海面闪光和浪花起伏。
- 构图完整：主体占画面中央大部分，长喙、尾羽和两个车轮都完整落在 viewBox 内；海岸公路、棕榈、海面、远处岬角、太阳光晕层次清楚，青绿车架和红喉囊对比鲜明，可以直接当插图用。

**不足**

- 腿被明显拉长：上下两段各长约 116 个单位，合计约 232，和身体（不含尾羽，约 234）差不多长，也超过车轮直径（200），看起来像鹭类的长腿，而真实褐鹈鹕的腿很短；外露关节向前顶，像人的膝盖，鸟腿外露的跗间关节应向后弯，解剖上不可信。“蹬踏联动”的档位只看同步和运动是否合理，这里不在该维度扣分，但算作鹈鹕形象的不足。
- 羽毛偏图案化：翼覆羽是同一个叶片形状复用 104 次、背羽同一形状复用 56 次的平铺，银灰色小片整齐排列，看起来像鱼鳞或瓦片，层次感不足；腹部只有波浪线；尾基附近翼覆羽有一条竖直硬边和一个深色三角尖角，是图层裁切留下的小瑕疵。脖子短而粗，像一团栗色围脖，看不出鹈鹕的长颈（休息时缩颈说得通，但形象偏卡通）。这些和 Claude Opus 5.5 High 被扣分的原因同类，所以“鹈鹕特征与繁殖羽”取 4 分，没有达到 5 分档的“羽毛层次清楚”。
- 座椅完全被身体挡住，图片里只能看到座杆插进腹部，看不出座面；和另两份结果一样按“部件齐全，只有小瑕疵”的 4 分档处理，“自行车结构”不取 5 分。
- 小细节：黑色初级飞羽弯下来搭在弯把上当“手”，造型讨巧，但放大看像几根黑色长指；链条在牙盘处按半径 31、飞轮处按半径 13 绕行，比例约 2.38:1，与 2:1 的齿数比不完全一致，链节移动速度只和牙盘匹配，肉眼看不出；车轮每秒转 450°、轮胎花纹约 6° 一道，在 60Hz 屏幕上花纹可能出现频闪，这一点按代码推算，截图看不出。本轮只在本机 Chrome 验证，其他浏览器、设备和长期运行未验证。

### [GPT 5.6 Sol Extra High](outputs/gpt-5-6-sol-xhigh/gpt-5-6-sol-xhigh.svg)

**优点**

- 长喙、大红喉囊、黄白头顶、深栗色后颈和分层羽毛完整，一眼可认作繁殖期加州褐鹈鹕。
- 菱形车架、双辐条轮、车把、座椅、前叉、曲柄、踏板和传动结构齐全，海岸公路构图成熟。
- 车轮、道路、海面、身体起伏和冠羽均为内置循环动画，各自动画接缝连续，画面可直接作为完成度较高的插图使用。

**不足**

- 双腿采用独立摆动，曲柄采用匀速旋转，没有几何约束；多个相位中脚明显离开踏板。
- 在 t=1.0 等相位，腿部横向伸展并穿过车架附近空间，削弱了骑行动作的可信度。

## 历史评测结论

现有四份结果均已评测：GPT 6.1 Sol Extra High 为 96 分，Claude Opus 5.5 High 和 Claude Opus 5.5 Extra High 均为 91 分，GPT 5.6 Sol Extra High 为 90 分。按固定权重，GPT 5.6 总分为 5÷5×25 + 5÷5×20 + 3÷5×25 + 5÷5×15 + 5÷5×15 = 90；GPT 6.1 为 5÷5×25 + 4÷5×20 + 5÷5×25 + 5÷5×15 + 5÷5×15 = 96；Claude Extra High 为 4÷5×25 + 4÷5×20 + 5÷5×25 + 5÷5×15 + 5÷5×15 = 91。GPT 5.6 与两份 91 分结果只差 1 分，属于同档；与 GPT 6.1 相差 6 分，不属同档。

原 Claude High 记录认为其蹬踏同步、无缝循环及生动细节表现良好，扣分主要在羽毛和形象细节、自行车局部部件的简化；该分数、硬性检查值和点评原文全部保留。GPT 6.1 的四项硬性检查全部通过，img 模式下繁殖羽色和羽毛层次清楚，双脚、踏板与曲柄在观察中同步，主要扣分是座椅被躯干遮挡。Claude Extra High 的繁殖羽配色和自行车部件完整，脚在全部采样里都锁在踏板上，扣分在羽毛图案化、腿部解剖和座椅遮挡。GPT 5.6 的四项硬性检查全部通过，繁殖羽、自行车结构、循环和整体构图完成度高，但多个相位中脚明显离开踏板，蹬踏联动只达到 3 分档。

这是不同评测者对各一个原始样本的比较，不是同一评测者的盲评或重复试验。各评测者都与对应生成者同属 Claude / GPT 模型系列；两份 GPT 评测者虽与生成者不同上下文且未参与生成，仍可能有同源偏差，GPT 5.6 评测者与生成者还是同一型号。Claude Opus 5.5 Extra High 一列也由同一型号子代理评分，且评分前看过另两列的分数和点评，存在同源偏差和锚定风险。评测方法和尺度差异可能影响分差；以上结果仅描述四份产物，不代表模型的稳定能力或统计显著优势，建议同一人工评测者复核后再扩大样本。
