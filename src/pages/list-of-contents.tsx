import * as React from 'react';
import { graphql } from 'gatsby';
import ListOfContents from '../components/listOfContents';
import ListOfKuyouCases from '../components/listOfKuyouCases';
import Layout from '../components/layout';
import { ListOfContentsQueryQuery } from '../../types/graphql-types';

interface IProps {
  data: ListOfContentsQueryQuery;
}

export default function ListOfContentsPage({
  data,
}: IProps) {
  return (
    <Layout>
      <div className="blog-post-content">
        <h2>お納めいただいた供養事例</h2>
        <ListOfKuyouCases
          contents={data.allAirtable.edges.map(
            (item) => item.node,
          )}
        />
      </div>
      <div className="blog-post-content">
        <h2>当社務所による活動等</h2>
        <ListOfContents
          contents={data.allMarkdownRemark.edges.map(
            (item) => item.node,
          )}
        />
      </div>
    </Layout>
  );
}
export const pageQuery = graphql`
  query ListOfContentsQuery {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "s/.+\\/markdown\\/articles\\/[^\\/]+\\.md/"}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          id
          frontmatter {
            title
            slug
            date
          }
        }
      }
    },
    allAirtable(limit: 100
      filter: {
        table:{eq: "cleansing-cases"}
      }) {
        edges{
          node{
            recordId
            data{
              Title
              Date
              Name
            }
          }
        }
      }
  }
`;
