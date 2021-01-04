import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import Omikuji from './omikuji';

const BigBellContainer = styled.div<{ display: boolean }>`
  position: absolute;
  pointer-events: none;
  display: ${(props) =>
    props.display ? 'flex' : 'none !important'};
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
const BigBellImg = styled((props) => <Img {...props} />)`
  flex: 1 1 auto;
  align-items: flex-end;
`;

const StickImg = styled((props) => <Img {...props} />)`
  pointer-events: none;
  display: ${(props) => (props.display ? 'flex' : 'none')};
`;

const StickContainer = styled.div`
  position: relative;
  height: 50%;
`;

const Counter = styled.p<{
  margin: number;
  fontSize: number;
}>`
  margin-bottom: ${(props) => props.margin}px;
  font-size: ${(props) => props.fontSize}px;
`;

const NumberText = styled.span`
  color: #ebff00;
  background-color: #000000;
  padding: 2px 3px 2px 5px;
  margin: 0 2px;
  box-sizing: border-box;
`;

const style = {
  'pointer-events': 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 0px',
  background: 'transparent',
  cursor: 'ew-resize',
};

const BigBell = () => {
  const data = useStaticQuery(
    graphql`
      query {
        bigBell: file(
          relativePath: { eq: "big_bell.png" }
        ) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        stick1: file(
          relativePath: { eq: "kanetukibou_1.png" }
        ) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        stick2: file(
          relativePath: { eq: "kanetukibou_2.png" }
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
  const el = useRef(null);
  const special = useRef(null);
  const stick1Img = useRef(null);
  const stick2Img = useRef(null);
  const BONNOU_COUNT = 108;
  const [count, setCount] = useState(BONNOU_COUNT);
  const [isSeparated, separate] = useState(true);
  const [isWoundUp, windUp] = useState(false);
  const [
    isSpecialContentOpened,
    openSpecialContent,
  ] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1080);
  useEffect(() => {
    setWindowWidth(
      window.innerWidth > 1080 ? 1080 : window.innerWidth,
    );
  });

  return (
    <>
      <BigBellContainer display>
        <StickContainer>
          <Rnd
            style={style}
            size={{
              width: windowWidth / 12,
              height: windowWidth / 12,
            }}
            position={{
              x: windowWidth / 4 + windowWidth / 10,
              y: ((windowWidth / 2) * (180 / 328)) / 2,
            }}
            dragAxis="x"
            enableResizing={false}
            onDrag={(_e, d) => {
              if (d.x <= windowWidth / 3.5) {
                if (isSeparated) {
                  try {
                    if (!el.current.paused) {
                      el.current.pause();
                      el.current.currentTime = 0;
                    }
                    el.current.volume =
                      d.deltaX < -30 ? 1 : d.deltaX / -30;
                    console.log(el.current.volume);
                    el.current.play();
                    windUp(false);
                  } catch (e) {}
                  setCount(count - 1);
                  if (count <= 1) {
                    openSpecialContent(true);
                    setCount(BONNOU_COUNT);
                    special.current.play();
                  }
                  console.log('PLAY');
                  separate(false);
                }
              } else {
                separate(true);
                openSpecialContent(false);
                if (d.deltaX < -2) {
                  windUp(true);
                } else if (d.deltaX > 0) {
                  windUp(false);
                }
              }
            }}
          >
            <StickImg
              ref={stick1Img}
              display={!isWoundUp}
              fluid={data.stick1.childImageSharp.fluid}
              alt="鐘付き棒"
            />
            <StickImg
              ref={stick2Img}
              display={isWoundUp}
              fluid={data.stick2.childImageSharp.fluid}
              alt="振りかぶった鐘付き棒"
            />
          </Rnd>
          <audio ref={el}>
            <source
              src="/mp3/bell03.mp3"
              type="audio/mp3"
            />
          </audio>
          <audio ref={special}>
            <source
              src="/mp3/bonnou_taisan.mp3"
              type="audio/mp3"
            />
          </audio>
        </StickContainer>
      </BigBellContainer>
      <BigBellContainer display>
        <div>
          <BigBellImg
            fluid={data.bigBell.childImageSharp.fluid}
            alt="除夜の鐘"
          />
        </div>
      </BigBellContainer>
      <BigBellContainer display>
        <Counter
          margin={windowWidth / 5}
          fontSize={windowWidth / 50}
        >
          {[...count.toString()].map((str, index) => {
            return (
              <NumberText key={str + String(index)}>
                {str}
              </NumberText>
            );
          })}
        </Counter>
      </BigBellContainer>
      <BigBellContainer display={isSpecialContentOpened}>
        <Omikuji />
      </BigBellContainer>
    </>
  );
};

export default BigBell;
