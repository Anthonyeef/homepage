import React from "react"
import Container from "../components/container"
import Post from "../components/post"
import { graphql } from "gatsby"
import Header from "../components/header"

export default ({ data }) => (
  <Container>
    <Header />
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Post
          to={node.fields.slug}
          title={node.frontmatter.title}
          excerpt={node.frontmatter.excerpt}
          date={node.frontmatter.date}
        />
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
