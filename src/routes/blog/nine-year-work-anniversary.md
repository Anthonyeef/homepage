---
title: "工作九周年的感想"
date: "2025-07-27"
excerpt: "上班的第九年"
tags: 
- "Lifelog"
- "Work"
- "Career"
---

16 年开始实习， 17 年毕业后入职，算起来今年是工作的第九年，明年就是第十年了。数字其实不能代表什么，我有感觉自己在工作的某几年里是在连续地重复。加上被疫情耽误的两三年，那段时间里对时间的感受都变得缓慢了……

今年上班的最大感受是直面 AI 冲击。本来以为写客户端的人群可能会迟缓一些面对这种冲击，但没想到时代的列车滚滚而来的时候，没有任何人是可以躲过的。AI 代码工具已经从去年 GitHub copilot 不断按 tab 补全，进化到了今年 Claude Code 和 Amp 这样的终端 agent 的形态。过去几天里我一直在工作中高强度使用 Amp，从最开始的让 Amp 写 UT，到后面跟 Amp 分享我的思路，要求 Amp 帮我写完。我还尝试了让 Amp 从已经有的代码里学习 pattern，再新增新的代码 —— 这也是官方指引里推荐的方式，直接告诉它应该如何执行，给出具体的指引，不要让 AI 尝试读心。

周末的上午突发奇想，跟 Amp 说搜索我过去一个月的 git commit 记录，找到 feature name 后读里面的 diff，再根据具体的代码改动，最终生成我做的这个 project 的一个 wrap up。果不其然生成了很好的 engineering doc，还有很直观的 diagram。我觉得很好很好，并且准备把这个 wrap up 贴到公司 wiki 的 personal space 里。

才一年的时间。去年公司的 AI sprint 我们都在做虚无缥缈的 chatbot，今年的 AI sprint 我们都在真正地用 AI boost 我们的效率。才一年的时间。很期待接下来的一年，两年，三年，十年。

如果十年后的结果是我被淘汰，我会觉得挺好的。 I believe that's a new era of this industry and I am happy with that.


最后分享我让 Cursor 创建这个 markdown file 的 prompt:

> could you create a new draft markdown for me, the title is `工作九周年的感想`. the file name can be `happy-nine-year-anniversary-of-work.md`. does this make sense to you? can suggest a better name if you feel that might be better. and inside the file, please refer to the other existing markdown and learn how to init the content. I will share with you more content of it later