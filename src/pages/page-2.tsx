import * as React from 'react'
import Link from 'gatsby-link'
import Layout from '../components/layout'
import WordCalendar from '../components/word-calendar'
import Marquee from '../components/marquee';
import Button from '../components/button'
import BellSoundButton from '../components/bellSoundButton'

const SecondPage = () => (
  <Layout>
    <div>
      <h1>Hi from the second page</h1>
      <Button text="marquee" />
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
      <WordCalendar />
      <input type="text"></input>
      <input type="button"></input>
      <input type="radio"></input>
      <input type="checkbox"></input>
      <Marquee text="BADデータを作ってしまうとその除霊や供養にはその何倍ものコストがかかります。お金は大切に。" />
      <Marquee text="何でもかんでも紙に印刷する時代はもう終わりです。紙前提のフォーマットから抜け出しましょう。" delay="1s" duration="15s" />
      <BellSoundButton />
    </div>
  </Layout>
)

export default SecondPage
