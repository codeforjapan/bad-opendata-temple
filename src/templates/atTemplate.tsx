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
          <div>[供養事例]</div>
          <h1>{airtable.data.Title}</h1>
          <h2>{airtable.data.Date}</h2>
          <p>{airtable.data.Description}</p>
          {airtable.data.Image ? (
            <img
              src={
                airtable.data.Image[0].thumbnails.large.url
              }
            />
          ) : null}
          <h2>一言で言うと</h2>
          <p>{airtable.data.Short_Description}</p>
          <h2>入力データ</h2>
          <p>{airtable.data.Input_Data}</p>
        </div>
      </div>
    </Layout>
  );
}
export const pageQuery = graphql`
  query ATTemplate($recordId: String!) {
    airtable(recordId: { eq: $recordId }) {
      recordId
      data {
        Title
        Date
        Name
        Input_Data
        Description
        More_Info
        Output_Data
        Short_Description
        URL
        Image {
          id
          thumbnails {
            small {
              url
              width
              height
            }
            large {
              url
              width
              height
            }
          }
        }
      }
    }
  }
`;
