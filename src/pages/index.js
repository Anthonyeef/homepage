import React from "react"
import Container from "../components/container"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

export default ({ data }) => (
  <Container>
    <h1
      css={css`
        display: inline-block;
        border-bottom: 1px solid;
      `}
    >
      {data.site.siteMetadata.title}
    </h1>
    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link
          to={node.fields.slug}
          css={css`
            text-decoration: none;
            color: inherit;
          `}
        >
          <h3
            css={css`
              margin-bottom: ${rhythm(1 / 4)};
            `}
          >
            {node.frontmatter.title}
          </h3>
        </Link>
        <p>{node.frontmatter.excerpt}</p>
      </div>
    ))}
  </Container>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            excerpt
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
