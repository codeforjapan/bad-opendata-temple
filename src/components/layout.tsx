import * as React from 'react'
import Header from './header'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import "./layout.css"
import GlobalNavigation from './globalNavigation'

const Container = styled.div`
  margin: 0 auto;
  max-width: 1080px;
`

const MainContents = styled.div`
  padding: 30px 30px 60px;
`

interface Prop {
  children: React.ReactNode;
}

const Layout: React.FC<Prop> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitle {
      site {
        siteMetadata {
          title,
          description
        }
      }
    }
  `)
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
        <GlobalNavigation />
        <main>
          <MainContents>
            {children}
          </MainContents>
        </main>
      </Container>
    </div>
  )
}

export default Layout
