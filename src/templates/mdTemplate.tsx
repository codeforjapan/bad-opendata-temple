import * as React from 'react';
import { graphql } from 'gatsby';
import { BlogTemplateQuery } from '../../types/graphql-types';
import Layout from '../components/layout';
import Head from '../components/head';

interface IProps {
  data: BlogTemplateQuery;
}

export default function Template({ data }: IProps) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <Head
        pageTitle={frontmatter.title}
        ogType="article"
      />
      <Layout>
        <div className="blog-post-container">
          <div className="blog-post">
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
export const pageQuery = graphql`
  query BlogTemplate($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
