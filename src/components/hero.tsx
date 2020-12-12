import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import moment from 'moment';
import SunCalc from 'suncalc';
import Mochimaki from './mochimaki';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';

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
const TempleContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: flex-end;
  height: 100%;
  z-index: 1;
  div {
    text-align: center;
    width: 50%;
    display: flex;
  }
`;
const TempleImg = styled.img`
  width: 100%;
  align-items: flex-end;
`;

const Hero = () => {
  const breakpoints = useBreakpoint();
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
        backgroundNight: file(
          relativePath: { eq: "night_background.png" }
        ) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        backgroundDay: file(
          relativePath: { eq: "day_background.png" }
        ) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        templedDay: file(
          relativePath: { eq: "day_temple.png" }
        ) {
          publicURL
        }
        templedNight: file(
          relativePath: { eq: "night_temple.png" }
        ) {
          publicURL
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
      {breakpoints.sm ? null : <Mochimaki />}
      <TempleContainer>
        <div>
          <TempleImg
            src={
              isDayTime
                ? data.templedNight.publicURL
                : data.templedDay.publicURL
            }
            alt="本堂"
          />
        </div>
      </TempleContainer>
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
            ? data.backgroundDay.childImageSharp.fluid
            : data.backgroundNight.childImageSharp.fluid
        }
      />
    </HeroContainer>
  );
};

export default Hero;
