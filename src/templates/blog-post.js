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
        `}
      >
        {post.frontmatter.title}
      </h2>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
        css={css`
          padding-left: 1rem;
        `}
      />
      <p
        css={css`
          text-align: right;
          font-size: ${rhythm(0.6)};
          color: #888888;
        `}
      >
        {post.frontmatter.date}
      </p>
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
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`
