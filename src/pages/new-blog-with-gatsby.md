---
title: "搭了一个新的个人网站"
date: "2020-04-04"
excerpt: "最近一段时间都在学 React。作为作业，用 Gatsby 搭建了一个新的个人主页。打算陆续从 Typlog 上搬运过来旧的日记，还有实践一些简单的前端页面。"
---

最近一段时间都在学 React。作为作业，用 Gatsby 搭建了一个新的个人主页。打算陆续从 Typlog 上搬运过来旧的日记，还有实践一些简单的前端页面。

### 为什么不继续使用 Typlog 呢？

我觉得 Typlog 很好，后台功能也很完善。但我觉得 Typlog 渲染 Markdown 出来的样式不够好看。可能就是自己觉得不够好看吧。

除此之外就是一些小细节了，例如：想在文章中间插入一张图片的时候，图片的宽度想等于文字的宽度，得选择某一个固定的模板才可以；文章的头图的宽度也不能设置成和段落等宽，被拉伸后的头图感觉很不好看。

还有一个原因是今年 Typlog 的几个小改动：

1. 老用户的套餐变更，不能随意增加自己的站点了；
2. 原本的 `.com` 域名变动，变成了 `.io` 域名。

虽然小明也提前在 Telegram group 里做了预告，但我还是感觉到，自己的个人主页这样被不稳定因素影响，还是挺被动的。

我想自己做一个主页来 host 一些 Markdown 文件，把控制权掌握在自己手里。

### 细节

要自己从零开始搭一个个人主页，感觉还有很多的细节需要考虑。Gatsby 不是类似 Hexo 那样的博客框架，虽然也有提供一些成熟的 blog starter，但如果打算 build from scratch、把它当成我自己的一个网站项目来做，还是有很多事情要做。比如现在我就在想，怎么做 paging；怎么做 tag 索引；怎么加上 GA……一些 Hexo 里头开箱即用的功能，得搜索一下再手动加上。

但我觉得应该不会是太大的问题。最近经常有一种迷之自信，总感觉一般只要不是太难的问题，Google 一下都可以搜到答案。如果不自己动手做这个项目，反而失去了 `去了解自己未知的东西` 的机会。

下面记录自己遇到的问题，以及解决的方案：

#### 客制化代码高亮

我预感自己发布的内容里会出现不少的代码片段。Gatsby 提供了 `dangerouslySetInnerHTML` 的内容来放置 Markdown 转换出来的 html，但里面的一些内容没有经过样式调整，显得非常朴素。

要实现代码高亮很简单，搜了一下一般都是通过插件来做的。Gatsby 的插件市场里搜索 `code hight` 就可以找到非常多的插件。我挑了[这个](https://www.gatsbyjs.org/packages/gatsby-remark-vscode/?=highlight)，高亮的样式跟 VS Code 是一样的。

#### 区分开 inline code

上面这一步可以让 Markdown 中 block 样式的代码块有高亮的效果。但在文本中的 `inline code` 的效果不是很好，我想自己写 CSS 装饰一下。看了一下渲染之后的 dom 内容，发现其实都是 `<code>` 标签包裹起来的内容。
如果直接对 `<code>` 进行装饰，可能就会同时影响到 inline 和 code block 的样式了。

再观察了一下，发现 block 样式的 `<code>` 还有一个 class 是 `grvsc-code`。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdqwuibnabj32540rgdpl.jpg)

所以只要保证 `选中 grvsc-code 之外的其他 code 标签` 就可以了。css 里的选择器可以这么写：

```css
code:not(.grvsc-code) {
  padding: 0.2em 0.4em;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}
```

#### 分页

参考了 Gatsby 的这个[文档](https://www.gatsbyjs.org/docs/adding-pagination/)，做了一些小改动。文档里主要有两件事：

1. 新增一个 `blog-list-template` 的模板，用来放置分页后每一页的视图；
2. 在 `gatsby-node` 里新增 `createPage` 方法，根据 `blog-list-template` 提供的模板，还有本地的 Markdown 文件数量，渲染出来分页的页面。

我稍微修改了一下文档里 `blog-list-template` 的代码，变成了下面这样：

```javascript
import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Container>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return <div key={node.fields.slug}>{title}</div>
      })}
    </Container>
  )
}

// graphql 的部分省略
```

#### 移动端适配(响应式)

不熟悉前端怎么实现响应式，搜索了一下，关键字是 mediaquery 确定下来几个尺寸的 breakpoint，再根据不同的尺寸写对应的 CSS。也有主打响应式的 CSS 框架，比如 [Bulma](https://bulma.io/)。

我思考了一下，觉得自己目前并不需要为了这件事专门引入一个 CSS 的模块。再搜了一下 emotion 的文档，简单地在我的容器 container 里头写了尺寸小于 700px 时，宽度为 80%。后面再看情况调整其他的地方吧。

#### Google Analytics

搜索了一下有做好的 Gatsby plugin。直接加上了。另外搜到了有人做的 Google Analytics 的 Telegram bot，所以也在 Telegram 上添加了一下这个 bot 的授权。

#### Telegram Instant View

要让自己的 link 在 Telegram 里头实现 Instant View，需要在 Telegram 里提交适配了自己页面的 template，告诉 Telegram 应该如何处理我的链接。
我提交了自己的模板。内容比较少，只要能拿到 body 和 title 告诉 Telegram 即可；但没办法立刻能生效，需要提交至少 10 个 link 可以应用这个模板的才行。

后面继续搬运旧 blog 过来，再逐步添加吧。

#### RSS

已经支持了。装了 `gatsby-plugin-feed` 这个插件，再在 config 里配置了一下就好了。地址在[这里](https://yifen.me/rss.xml)。

---

Todo:

- 苹方字体
- Tag 索引
- 旧 Markdown 文件图片迁移
- 加一个 blog.yifen.me 的二级域名

> \*more content still WIP
