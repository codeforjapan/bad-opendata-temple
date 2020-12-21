import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

const SecondPage = () => (
  <Layout>
    <div>
      <Link to="/list-of-contents">一覧へ戻る</Link>
    </div>
    <h1>BADオープンデータ供養事例のご奉納</h1>
    <p>
      当寺にお越しいただきありがとうございます。BADなオープンデータのクレンジングの事例をご紹介いただける方は、
      <Link
        to="https://www.code4japan.org/privacy-policy"
        target="_blank"
      >
        Code for Japan のプライバシーポリシー
      </Link>
      をご一読いただき、ご了承いただいた上で、下記フォームにご記入ください。
      <br />
      社務所にて確認の上、公開させていただきます。基本的に、入力いただいた内容をそのままに掲載いたしますので、公開できる内容でご入力ください。
    </p>
    <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
    <iframe
      className="airtable-embed airtable-dynamic-height"
      src="https://airtable.com/embed/shr61aoXeA1JsF3aE?backgroundColor=purple"
      frameBorder="0"
      width="100%"
      height="2453"
      style={{
        background: 'transparent',
        border: '1px solid #ccc',
      }}
    ></iframe>{' '}
  </Layout>
);

export default SecondPage;
