import React from "react"
import { css } from "@emotion/core"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "avatar.webp" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Img
      css={css`
        display: block;
        width: 100px;
        height: 100px;
        margin: 3rem auto;
        border-radius: 50%;
      `}
      fluid={data.file.childImageSharp.fluid}
    />
  )
}
