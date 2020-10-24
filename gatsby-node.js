exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const mdTemplate = require.resolve(`./src/templates/mdTemplate.tsx`)
    const result = await graphql(`
      {
        allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "/(markdown)/"  }}
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
    `)
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: mdTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      })
    })
  }
