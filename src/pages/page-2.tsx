import * as React from 'react'
import Link from 'gatsby-link'
import Layout from '../components/layout'
import WordCalendar from '../components/word-calendar'
import Marquee from '../components/marquee';
import Button from '../components/button'

const SecondPage = () => (
  <Layout>
    <div>
      <h1>Hi from the second page</h1>
      <Button text="marquee" />
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
      <WordCalendar />
      <Marquee />
    </div>
  </Layout>
)

export default SecondPage
