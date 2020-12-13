import * as React from 'react';
import { graphql } from 'gatsby';
import { Airtable } from '../../types/graphql-types';
import Layout from '../components/layout';

interface IProps {
  data: { airtable: Airtable };
}

export default function Template({ data }: IProps) {
  const { airtable } = data;
  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{airtable.recordId}</h1>
        </div>
      </div>
    </Layout>
  );
}
export const pageQuery = graphql`
  query ATTemplate($recordId: String!) {
    airtable(recordId: { eq: $recordId }) {
      recordId
    }
  }
`;
