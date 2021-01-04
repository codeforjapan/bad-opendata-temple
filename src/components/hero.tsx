import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import moment from 'moment';
import SunCalc from 'suncalc';
import Mochimaki from './mochimaki';
import BigBell from './bigBell';

const HeroContainer = styled.div`
  position: relative;
  background-color: #343434;
`;

const ScaffoldContainer = styled.div`
  pointer-events: none;
  position: absolute;
  z-index: 3;
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
  pointer-events: none;
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
  pointer-events: none;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: flex-end;
  height: 100%;
  z-index: 2;
  > div {
    text-align: center;
    width: 50%;
    display: flex;
  }
`;
const TempleImg = styled((props) => <Img {...props} />)`
  flex: 1 1 auto;
  align-items: flex-end;
`;

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

// const isLastDay = currentTime.isSame(
//   moment().endOf('year'),
//   'day',
// );

// const isSanganichi = currentTime.isBetween(
//   moment().startOf('year').dayOfYear(0),
//   moment().startOf('year').dayOfYear(4),
// );

// TODO: 可変でもレイアウト崩れが起きないようにする
const isActiveJyoyaMode = false; // isLastDay || isSanganichi;

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
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        templedNight: file(
          relativePath: { eq: "night_temple.png" }
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
  ] = useState(false);

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
      {isActiveJyoyaMode ? (
        <BigBell />
      ) : (
        <>
          <Mochimaki />
          <TempleContainer>
            <div>
              <TempleImg
                fluid={
                  isDayTime
                    ? data.templedDay.childImageSharp.fluid
                    : data.templedNight.childImageSharp
                        .fluid
                }
                alt="本堂"
              />
            </div>
          </TempleContainer>
        </>
      )}
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
