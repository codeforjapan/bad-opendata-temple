import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import '../components/layout.css'
import ContentWrap from '../components/contentWrap'
import GlobalNavigation from '../components/globalNavigation'
import Header from '../components/header'
import Hero from '../components/hero'
import Marquee from '../components/marquee'
import AccessCounter from '../components/accessCounter'
import DaysFromFoundation from '../components/daysFromFoundation'
import RandomWord from '../components/randomWord'
import Footer from '../components/footer'

const Container = styled.div`
  margin: 0 auto;
  max-width: 1080px;
`

const MainContents = styled.div`
  padding: 30px 30px 60px;
`

const CatchTextWrap = styled.div`
  background-color: #FFA927;
  box-shadow: 6px 6px rgb(0,0,0,0.75);
  padding: 20px;
  p {
    margin: 0;
    text-align: center;
    font-size: 22px;
    line-height: 1.8;
  }
`

const ComponentWrap = styled.div`
  margin: 30px 0;
`

const FlexWrap = styled.div.attrs((props: IndexPageProps) => ({
  isMobile: props.isMobile
}))`
  display: flex;
  justify-content: space-around;
  flex-direction: ${props => props.isMobile ? 'column' : 'row'};
  > * {
    margin: 0 16px;
  }
`

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      }
    }
  },
  isMobile: boolean
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const breakpoints = useBreakpoint()

  return (
    <div>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
        ]}
      />
      <Container>
        <Header />
        <Hero />
        <GlobalNavigation />
        <ContentWrap>
          <main>
            <Marquee text="BADデータを作ってしまうとその除霊や供養にはその何倍ものコストがかかります。お金は大切に。" />
            <MainContents>
              <CatchTextWrap>
                <p>
                  BADオープンデータ供養寺は、<br />
                  世の中に災厄をもたらすBADなオープンデータが二度とこの世を彷徨わないように<br />
                  「供養（データクレンジング）」するために建立されました。
                </p>
              </CatchTextWrap>
              <ComponentWrap>
                <FlexWrap isMobile={breakpoints.sm}>
                  <AccessCounter />
                  <DaysFromFoundation />
                </FlexWrap>
              </ComponentWrap>
              <ComponentWrap>
                <RandomWord />
              </ComponentWrap>
              <Link to="/page-2/">Go to page 2</Link>
            </MainContents>
          </main>
        </ContentWrap>
        <Footer />
      </Container>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title,
        description
      }
    }
  }
`
