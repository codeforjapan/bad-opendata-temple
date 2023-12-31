import * as React from 'react';
import { graphql } from 'gatsby';
import { unified } from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';
import { Airtable } from '../../types/graphql-types';
import Layout from '../components/layout';
import Head from '../components/head';

interface IProps {
  data: { airtable: Airtable };
}

export default function Template({ data }: IProps) {
  const { airtable } = data;
  return (
    <>
      <Head
        pageTitle={airtable.data.Title}
        ogDescription={airtable.data.Description}
        ogType="article"
      />
      <Layout>
        <div className="blog-post-container">
          <div className="blog-post">
            <div>
              <a href="/list-of-contents">一覧に戻る</a>|{' '}
              [供養塔]
            </div>
            <h1>{airtable.data.Title}</h1>
            <p>
              提供者：<span>{airtable.data.Name}</span>
            </p>
            <p>
              <a href={airtable.data.URL}>詳細ページへ</a>
            </p>
            <h2>{airtable.data.Date}</h2>
            <p>{airtable.data.Description}</p>
            {airtable.data.Image ? (
              <img
                src={
                  airtable.data.Image[0].thumbnails.large
                    .url
                }
              />
            ) : null}
            <h2>一言で言うと</h2>
            <p>{airtable.data.Short_Description}</p>
            <h2>入力データ</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: unified()
                  .use(markdown)
                  .use(html)
                  .processSync(airtable.data.Input_Data),
              }}
            />
            <h2>出力データ</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: unified()
                  .use(markdown)
                  .use(html)
                  .processSync(airtable.data.Output_Data),
              }}
            />
            <h2>もっと詳しく</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: unified()
                  .use(markdown)
                  .use(html)
                  .processSync(airtable.data.More_Info),
              }}
            />
          </div>
        </div>
      </Layout>
    </>
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
