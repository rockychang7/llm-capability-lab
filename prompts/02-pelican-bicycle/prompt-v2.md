# 02 · 鹈鹕骑自行车（动画版）

**版本**：v2

**变更**：v1 只有一句 “Generate an SVG of a pelican riding a bicycle”，这是静态版，社区里已经有人说它是“被解决的基准”。v2 改用社区里更难的进阶版，并要求做成会动的 SVG。

**测试能力**：SVG 矢量动画。鹈鹕和自行车的结构是否正确，骑行动作（车轮转动、双腿蹬踏）能否随时间连贯运动，动画能否无缝循环，且不依赖脚本和外部文件。

**来源**：

- 第一段是 Simon Willison（“鹈鹕骑自行车”这个基准的发起人）自己给出的进阶版提示词，用于“模型已经能画好原版之后”。原文见 [Hacker News，2026 年 2 月](https://news.ycombinator.com/item?id=46993923)。这里只做了一处改动：把 “an SVG” 改成 “an animated SVG”。
- 动画版的需求来自社区：在 Hacker News 关于 Claude Fable 5.1 的讨论帖里，有人留言 [“Now that it's a solved benchmark, can we get the animated version?”](https://news.ycombinator.com/item?id=49526455)。Simon 随后把模型画好的原版鹈鹕交回给模型，只说了一句 “animate this”，得到了[动画版 SVG](https://simonwillison.net/2026/Sep/1/claude-fable-5-1/)。社区里没有统一的“动画版官方提示词”。
- 第二段是本实验补充的，写明动画的实现方式和最基本的骑行动作，让所有产物都能用同一种方式展示和比较。

## 原始 Prompt

以下代码块是发送给模型的完整内容，保留原始措辞：

```text
Generate an animated SVG of a California brown pelican riding a bicycle. The bicycle must have spokes and a correctly shaped bicycle frame. The pelican must have its characteristic large pouch, and there should be a clear indication of feathers. The pelican must be clearly pedaling the bicycle. The image should show the full breeding plumage of the California brown pelican.

The animation must be built into the SVG itself using SMIL or CSS animations, and it must loop seamlessly. The wheels must spin and the pelican's legs must pedal in sync with the cranks. Use a viewBox, no JavaScript and no external files.
```
