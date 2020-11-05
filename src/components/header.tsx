import * as React from 'react'
import { Link } from 'gatsby'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import BellSoundButton from './bellSoundButton'

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rebeccapurple;
`

const Heading = styled.h1`
  font-size: 24px;
  color: #fff;
  margin: 0;
`

const HeadingLink = styled(props => <Link {...props} />)`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
`

interface HeaderPageProps {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const Header = () => {
  const data: HeaderPageProps = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  const Title = () => {
    return location.pathname === '/' ?
      <Heading>{data.site.siteMetadata.title}</Heading> :
      <HeadingLink to="/">
        {data.site.siteMetadata.title}
      </HeadingLink>
  }

  return (
    <HeaderContainer>
      <Title />
      <BellSoundButton />
    </HeaderContainer>
  )
}
export default Header
