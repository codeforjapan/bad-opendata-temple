module.exports = {
  siteMetadata: {
    title: `BADオープンデータ供養寺`,
    description: '「BADオープンデータ供養寺」は世の中に災厄をもたらすBADなデータが二度とこの世を彷徨わないように「供養（データクレンジング）」するために建立されました。',
    keywords: 'オープンデータ, データ活用, データクレンジング, データエンジニアリング, データマネジメント, シビックテック, Code for Japan'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-contents`,
        path: `${__dirname}/src/contents/markdown`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `hitokoto`,
        path: `${__dirname}/src/contents/hitokoto`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-csv`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: `types/graphql-types.d.ts`,
      },
    }
  ],
}
