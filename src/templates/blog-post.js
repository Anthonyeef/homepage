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
      <h2
        css={css`
          margin-bottom: ${rhythm(2)};
          margin-left: -2em;
        `}
      >
        {post.frontmatter.title}
      </h2>
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
