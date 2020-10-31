import * as React from 'react'
import Link from 'gatsby-link'
import Layout from '../components/layout'
import WordCalendar from '../components/word-calendar'
import Marquee from '../components/marquee';

const SecondPage = () => (
  <Layout>
    <div>
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
      <WordCalendar />
      <Marquee text="BADデータを作ってしまうとその除霊や供養にはその何倍ものコストがかかります。お金は大切に。" />
      <Marquee text="何でもかんでも紙に印刷する時代はもう終わりです。紙前提のフォーマットから抜け出しましょう。" delay="1s" duration="15s" />
    </div>
  </Layout>
)

export default SecondPage
