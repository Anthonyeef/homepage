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

wip

#### Tag 索引

参考了 Gatsby 的这个[文档]()

> \*more content still WIP
