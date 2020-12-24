import * as React from 'react';
import { graphql } from 'gatsby';
import ListOfContents from '../components/listOfContents';
import ListOfKuyouCases from '../components/listOfKuyouCases';
import Layout from '../components/layout';
import { ListOfContentsQueryQuery } from '../../types/graphql-types';
import Head from '../components/head';

interface IProps {
  data: ListOfContentsQueryQuery;
}

export default function ListOfContentsPage({
  data,
}: IProps) {
  return (
    <>
      <Head pageTitle="供養塔" />
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
        <div className="blog-post-content">
          <h2>供養事例をお供え下さい！</h2>
          <div>
            供養事例をご紹介いただける方は、
            <a href="/kuyouform">供養事例のご奉納</a>
            よりご連絡ください。
          </div>
        </div>
      </Layout>
    </>
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
      },
      sort: {fields: data___Date, order: DESC}) {
        edges{
          node{
            fields {
              slug
            }
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
