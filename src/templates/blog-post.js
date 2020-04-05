import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Container from "../components/container"
import Footer from "../components/footer"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Container>
      <h1
        css={css`
          margin-bottom: ${rhythm(2)};
        `}
      >
        {post.frontmatter.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <Footer />
    </Container>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
