# 02 · 一比一复刻 vinylformac.com 落地页

**版本**：v1

**测试能力**：像素级网页复刻能力——依据完整设计规格重建真实产品落地页，考察布局还原、文案准确性、拟真视觉绘制（纯代码黑胶唱机场景）、动态微效果与响应式细节。

**来源**：https://x.com/sxhivs/status/2084013870004449326 （目标站 https://vinylformac.com ）

## 原始 Prompt

以下代码块是发送给模型的完整内容，保留原始措辞：

```text
请 1:1 复刻网站 vinylformac.com —— macOS 拟真黑胶唱机应用「Vinyl」的产品落地页。下面给出从原站完整提取的设计规格，你的任务是按规格逐值还原整个页面。

# 硬性要求

1. 只产出一个 HTML 文件，所有 CSS、JavaScript 内联；除 Google Fonts（Fraunces）外，禁止引用任何外部资源（图片、视频、图标库、CDN 脚本一律禁用）。所有视觉元素必须用 CSS / SVG / Canvas 绘制。
2. 页面所有文案必须与下方规格逐字一致（英文原文，注意大小写与标点），不得增删改。
3. 原站 Hero 区的演示内容是一段视频（demo.mp4）；禁止直接使用该视频或任何外部素材，你必须用代码实时渲染一个拟真黑胶唱机场景作为 Hero 视觉：暖色木纹底座、匀速旋转的黑胶唱片（同心纹沟槽、随旋转流动的光泽反射、黄铜色中心标签）、搭在唱片上的唱臂，并带有细腻动效（例如页面加载后唱臂落下、唱片由静止加速到匀速、唱臂播放中极缓慢向圆心内移、盘面高光流动等）。
4. 必须实现规格中列出的所有微交互与动效：入场阶梯式上浮淡入、按钮与链接 hover、focus-visible 黄铜描边、响应式断点适配、prefers-reduced-motion 降级。
5. 整体风格：暗黑极简 + 黑胶复古拟物细节（黄铜点缀、曲目编号、衬线斜体标题）。

# 页面结构（自上而下）

1. Hero（header，min-height 100svh，flex 纵向布局，文字区靠下，演示场景在文字下方）
2. 社交证明（As seen on Reddit & Twitter）
3. Liner notes 功能列表
4. "No login required" 说明区
5. 页脚

# 完整文案（逐字）

## Hero
- H1 wordmark：Vinyl
- 副标题两行：
  - 第一行（纯白高亮）：A photorealistic turntable on your Mac desktop.
  - 第二行（暗色）：Connects to Spotify and Apple Music. Stays out of your way.
- CTA 按钮（左侧带 Apple logo SVG，文字 Download，链接 https://shhiv.gumroad.com/l/vinyl ）
- 按钮下方小字：Requires macOS Sonoma or later

## 社交证明
- 文案：As seen on [Reddit] & [Twitter]
- Reddit 带 Reddit 图标，Twitter 带 X 图标（均用 SVG 内联绘制）
- 链接分别为 https://www.reddit.com/r/SideProject/comments/1v8a8q7/i_built_an_app_that_shows_the_track_youre_playing/ 与 https://x.com/sxhivs/status/2084013870004449326

## Liner notes
- Eyebrow 小标题：LINER NOTES
- H2：What's on the record
- Lede：Everything Vinyl does.
- 三个功能条目（黑胶曲目编号风格）：
  - A1 ｜ A photorealistic scene ｜ Spinning platter, tonearm, and original artwork on real wood. The whole scene is rendered live on your desktop.
  - A2 ｜ Spotify & Apple Music ｜ Vinyl works on its own. Play a track in Spotify or Apple Music and the sleeve and now-playing details update automatically. No login needed.
  - B1 ｜ Lives in the menu bar ｜ Close the window and Vinyl keeps playing behind a quiet menu bar icon. Launches at login if you want it to.

## 说明区
- 绿色胶囊徽章（左侧 6px 绿点）：No login required
- 正文：Vinyl starts with its own artwork. For live album covers, just play or change a track in Spotify or Apple Music while Vinyl is running.

## 页脚
- 左侧：Built by Shiv（Shiv 链接 https://shivs.me/ ）
- 右侧：Support · Privacy（原站链接为 /support.html 与 /privacy.html，可用 # 占位）

# 设计规格

## 配色
- 页面背景：#121212
- 主文字：#fafafa
- 次级文字：rgba(255,255,255,0.45)
- 最弱文字（要求小字/页脚）：rgba(255,255,255,0.28)
- 黄铜强调色：#C9AD8A（eyebrow、focus 描边、favicon 中心）
- 绿色状态点：#36D47C
- CTA 按钮渐变：linear-gradient(180deg, #343434, #222222)，hover 变亮为 #3b3b3b → #272727
- 绿色胶囊渐变：#1f5233 → #143823
- 分隔线：rgba(255,255,255,0.07)（功能条目）、rgba(255,255,255,0.06)（页脚）
- 社交链接 hover：Reddit → #FF6A33，Twitter → #ffffff

## 字体
- 标题：Fraunces（Google Fonts，italic 400，引入 ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400;1,9..144,500），fallback Georgia 等衬线
- 正文/UI：system-ui, -apple-system, "SF Pro Text", sans-serif
- 曲目编号：ui-monospace, "SF Mono", Menlo, monospace

## 字号层级
- H1：clamp(72px, 11vw, 124px)，Fraunces italic，字距 -0.015em，行高 1.05，下间距 40px
- 副标题：clamp(18px, 2.2vw, 22px)，行高 1.55，最大宽 560px 居中
- CTA：17px / 600，padding 19px 36px，圆角 50px（全圆角胶囊）
- 要求小字：13px
- Eyebrow：11px，字距 0.28em，全大写，黄铜色
- H2：clamp(30px, 4.6vw, 42px)，Fraunces italic，字距 -0.01em
- Lede：16px，行高 1.6，下间距 48px
- 曲目编号：13px 等宽字体，字距 0.06em
- H3：17px / 590 字重，字距 -0.01em
- 功能正文：15px，行高 1.65
- 徽章：13px / 600；说明正文：14px，行高 1.7；页脚：13px

## 布局
- 全站单列居中；Liner notes 与页脚最大宽 700px；Hero 演示容器宽 min(1280px, 100%)
- Hero：padding 148px 24px 0，文字区 margin-top auto
- 功能条目：CSS Grid 52px 1fr 两列（编号列 + 内容列），gap 4px 20px，padding 26px 0，每项顶部 1px 细线，最后一项加底线
- 页脚：flex 两端分布，顶部 1px 细线

## 阴影（拟物关键）
- CTA 按钮：inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.4)
- 演示容器：圆角 26px，三层柔和投影（0 2px 7px / 0 6px 19px / 0 20px 60px，黑色不同透明度）
- 绿色胶囊：同样的 inset 高光拟物风格

## 动效与交互
- 入场动画（仅页面加载时一次，无滚动驱动动画）：opacity 0→1 且 translateY(16px)→0，0.9s cubic-bezier(0.2,0.6,0.2,1)；延迟阶梯：副标题 0.08s、CTA 与要求小字 0.18s、演示容器 0.28s
- Hover：CTA 渐变微变亮；社交链接颜色 0.2s 过渡；页脚链接由暗变白
- :focus-visible：2px 黄铜色描边 + 3px offset
- scroll-behavior: smooth；body overflow-x: hidden；-webkit-font-smoothing: antialiased
- 尊重 prefers-reduced-motion（关闭动画，直接呈现最终状态）

## 响应式断点
- max-height 820px：hero padding-top 收紧为 100px，H1 缩为 clamp(56px, 8vw, 96px)
- max-width 640px：CTA 15px / padding 15px 28px；演示容器圆角 18px；页脚改纵向排列

## 其他
- document.title：Vinyl - A photorealistic turntable for your Mac desktop
- favicon：内联 SVG data URI（黑胶唱片图标：#141210 底、#332e29 纹路、#C9AD8A 中心）
- 演示容器宽高比 1280/832，aria-label "Vinyl running on a Mac desktop"

完成后请逐字校对全部文案，并逐项检查动效是否齐备。
```
