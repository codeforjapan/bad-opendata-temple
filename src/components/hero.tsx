import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
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
`;

const TempleContent = styled.div`
  text-align: center;
  width: 50%;
  display: flex;
`;

const TempleImg = styled((props) => (
  <GatsbyImage {...props} />
))`
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

const isLastDay = currentTime.isSame(
  moment().endOf('year'),
  'day',
);

const isSanganichi = currentTime.isBetween(
  moment().startOf('year').dayOfYear(0),
  moment().startOf('year').dayOfYear(4),
);

const isActiveJyoyaMode = isLastDay || isSanganichi;

const Hero = () => {
  const data = useStaticQuery(
    graphql`
      {
        logo: file(relativePath: { eq: "logo.svg" }) {
          publicURL
        }
        scaffold: file(
          relativePath: { eq: "scaffold.png" }
        ) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        backgroundNight: file(
          relativePath: { eq: "night_background.png" }
        ) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        backgroundDay: file(
          relativePath: { eq: "day_background.png" }
        ) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        templedDay: file(
          relativePath: { eq: "day_temple.png" }
        ) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        templedNight: file(
          relativePath: { eq: "night_temple.png" }
        ) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
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
      <>
        {!isActiveJyoyaMode && <Mochimaki />}
        <TempleContainer>
          {isActiveJyoyaMode ? (
            <BigBell />
          ) : (
            <TempleContent>
              <TempleImg
                image={
                  isDayTime
                    ? data.templedDay.childImageSharp
                        .gatsbyImageData
                    : data.templedNight.childImageSharp
                        .gatsbyImageData
                }
                alt="本堂"
              />
            </TempleContent>
          )}
        </TempleContainer>
      </>
      <ScaffoldContainer>
        <div>
          {isUnderConstruction && (
            <GatsbyImage
              image={
                data.scaffold.childImageSharp
                  .gatsbyImageData
              }
              alt="足場"
            />
          )}
        </div>
      </ScaffoldContainer>
      <GatsbyImage
        image={
          isDayTime
            ? data.backgroundDay.childImageSharp
                .gatsbyImageData
            : data.backgroundNight.childImageSharp
                .gatsbyImageData
        }
        alt="景色"
      />
    </HeroContainer>
  );
};

export default Hero;
