import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import moment from 'moment';
import SunCalc from 'suncalc';

const HeroContainer = styled.div`
  position: relative;
  background-color: #343434;
`;

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
`;

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
`;

const ButtonContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
`;

const Hero = () => {
  const data = useStaticQuery(
    graphql`
      query {
        logo: file(relativePath: { eq: "logo.svg" }) {
          publicURL
        }
        scaffold: file(
          relativePath: { eq: "scaffold.png" }
        ) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        templeNight: file(
          relativePath: { eq: "temple_night.png" }
        ) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        templeDay: file(
          relativePath: { eq: "temple_day.png" }
        ) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `,
  );

  const [
    isUnderConstruction,
    setIsUnderConstruction,
  ] = useState(true);

  const currentTime = moment();
  const times = SunCalc.getTimes(
    new Date(),
    35.6275256,
    139.7714723,
  );
  const isDayTime = currentTime.isBetween(
    times.sunriseEnd,
    times.night,
  );

  return (
    <HeroContainer>
      <ButtonContainer>
        <button
          onClick={() =>
            setIsUnderConstruction(!isUnderConstruction)
          }
        >
          {isUnderConstruction ? '竣工' : '建設中'}
        </button>
      </ButtonContainer>
      <LogoContainer>
        <div>
          <img
            src={data.logo.publicURL}
            alt="BADオープンデータ供養寺ロゴ"
          />
        </div>
      </LogoContainer>
      <ScaffoldContainer>
        <div>
          {isUnderConstruction && (
            <Img
              fluid={data.scaffold.childImageSharp.fluid}
            />
          )}
        </div>
      </ScaffoldContainer>
      <Img
        fluid={
          isDayTime
            ? data.templeDay.childImageSharp.fluid
            : data.templeNight.childImageSharp.fluid
        }
      />
    </HeroContainer>
  );
};

export default Hero;
