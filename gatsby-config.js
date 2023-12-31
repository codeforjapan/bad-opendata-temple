const path = require('path');

const SITE_NAME = 'BADオープンデータ供養寺';
const SITE_URL = 'https://bad-data.rip';

const customQueries = {
  xs: '(max-width: 320px)',
  sm: '(max-width: 600px)',
  md: '(max-width: 1024px)',
  l: '(max-width: 1536px)',
};

module.exports = {
  siteMetadata: {
    title: SITE_NAME,
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    description: `「${SITE_NAME}」は世の中に災厄をもたらすBADなデータが二度とこの世を彷徨わないように「供養（データクレンジング）」するために建立されました。`,
    keywords:
      'オープンデータ, データ活用, データクレンジング, データエンジニアリング, データマネジメント, シビックテック, Code for Japan',
    type: 'website',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: 'src/contents/images/favicon.png',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-contents`,
        path: path.join(__dirname, 'src/contents/markdown'),
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `csv-contents`,
        path: path.join(__dirname, 'src/contents/csv'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, 'src/contents/images'),
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `static`,
              ignoreFileExtensions: [
                `png`,
                `jpg`,
                `jpeg`,
                `bmp`,
                `tiff`,
              ],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1080,
            },
          },
        ],
      },
    },
    `gatsby-transformer-csv`,
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: `types/graphql-types.d.ts`,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: ['PixelMplus10'],
          urls: ['/fonts/fonts.css'],
        },
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: 'G-QBEEGLVETR',
      },
    },
    {
      resolve: `gatsby-plugin-breakpoints`,
      options: {
        queries: customQueries,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `keyXEJZJavw9RKqwp`, // may instead specify via env, see below
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: `appFtv1tgnxPshP5P`,
            tableName: `cleansing-cases`,
            tableView: 'published',
            separateNodeType: false, // boolean, default is false, see the documentation on naming conflicts for more information
            separateMapType: false, // boolean, default is false, see the documentation on using markdown and attachments for more information
          },
        ],
      },
    },
    `gatsby-plugin-sass`,
  ],
};
