import React from "react"
import { rhythm } from "../utils/typography"
import { Link } from "gatsby"
import { css } from "@emotion/core"

export default props => {
  return (
    <Link
      to={props.to}
      css={css`
        text-decoration: none;
        color: inherit;
      `}
    >
      <h3
        css={css`
          margin-bottom: ${rhythm(1)};
        `}
      >
        {props.title}
      </h3>
      <p
        css={css`
          border-left: 2px solid #eee;
          display: block;
          padding-left: 1em;
        `}
      >
        {props.excerpt}
      </p>
      <p
        css={css`
          text-align: right;
          font-size: ${rhythm(0.6)};
          color: #888888;
        `}
      >
        {props.date}
      </p>
    </Link>
  )
}
