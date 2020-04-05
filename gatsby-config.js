/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Yifen's notes",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: "Dark (Visual Studio)",
              wrapperClassName: "",
              getLineClassName: ({ content, index, language, meta }) => "",
              logLevel: "warn",
            },
          },
        ],
      },
      // options: {
      //   plugins: [
      //     {
      //       resolve: `gatsby-remark-prismjs`,
      //       options: {
      //         classPrefix: "language-",
      //         inlineCodeMarker: null,
      //         showLineNumbers: false,
      //         noInlineHighlight: false,
      //       },
      //     },
      //   ],
      // },
    },
  ],
}
