import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const HeroContainer = styled.div`
  position: relative;
  background-color: #343434;
`

const ScaffoldContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  div {
    flex: 0 0 60%;
  }
`

const LogoContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    flex: 0 0 60%;
  }
`

const Hero = () => {
  const data = useStaticQuery(
    graphql`
      query {
        logo: file(relativePath: {eq: "logo.svg"}) {
          publicURL
        },
        scaffold: file(relativePath: { eq: "scaffold.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        },
        templeNight: file(relativePath: { eq: "temple_night.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )

  return (
    <HeroContainer>
      <LogoContainer>
        <div>
          <img src={data.logo.publicURL} alt="BADオープンデータ供養寺ロゴ" />
        </div>
      </LogoContainer>
      <ScaffoldContainer>
        <div>
          <Img fluid={data.scaffold.childImageSharp.fluid} />
        </div>
      </ScaffoldContainer>
      <Img fluid={data.templeNight.childImageSharp.fluid} />
    </HeroContainer>
  )
}

export default Hero;
