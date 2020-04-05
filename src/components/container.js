import React from "react"
import { css } from "@emotion/core"

export default ({ children }) => (
  <div
    css={css`
      margin: 3rem auto;
      max-width: 700px;
      @media (max-width: 700px) {
        width: 80%;
      }
    `}
  >
    {children}
  </div>
)
