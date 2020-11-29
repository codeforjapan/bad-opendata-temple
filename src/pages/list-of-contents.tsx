import * as React from 'react';
import { graphql } from 'gatsby';
import ListOfContents from '../components/listOfContents.tsx';
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
      <ListOfContents
        contents={data.allMarkdownRemark.edges.map(
          (item) => item.node,
        )}
      />
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
    }
  }
`;
