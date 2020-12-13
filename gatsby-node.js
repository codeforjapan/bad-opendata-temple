const slash = require('slash');
const KUYOU_BASE = 'kuyou/';
exports.onCreateNode = ({
  node,
  getNode,
  actions
}) => {
  const {
    createNodeField
  } = actions;
  if (node.internal.type === `Airtable`) {
    createNodeField({
      node,
      name: `slug`,
      value: `${KUYOU_BASE}${node.recordId}`,
    });
  }
};
exports.createPages = async ({
  actions,
  graphql,
  reporter,
}) => {
  const {
    createPage
  } = actions;
  const mdTemplate = require.resolve(
    `./src/templates/mdTemplate.tsx`,
  );
  const atTemplate = require.resolve(
    `./src/templates/atTemplate.tsx`,
  );
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/(markdown)/" }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query.`,
    );
    return;
  }
  result.data.allMarkdownRemark.edges.forEach(
    ({
      node
    }) => {
      createPage({
        path: node.frontmatter.slug,
        component: mdTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      });
    },
  );

  // airtable records
  const result_airtable = await graphql(`
    {
      allAirtable(
        limit: 10
        filter: { table: { eq: "cleansing-cases" } }
      ) {
        edges {
          node {
            recordId
          }
        }
      }
    }
  `);
  result_airtable.data.allAirtable.edges.forEach((edge) => {
    createPage({
      path: `${KUYOU_BASE}${edge.node.recordId}`,
      component: slash(atTemplate),
      context: {
        recordId: edge.node.recordId,
      },
    });
  });
};
