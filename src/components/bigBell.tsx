import React, { useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import UseWindowDimensions from './useWindowDimensions';
import Omikuji from './omikuji';

const BigBellContainer = styled.div`
  position: absolute;
  pointer-events: none;
  display: ${(props) => (props.display ? 'flex' : 'none')};
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
`;

const StickContainer = styled.div`
  position: relative;
  height: 50%;
`;

const Counter = styled.p`
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
  const stick = useRef(null);
  const el = useRef(null);
  const stickImg = useRef(null);
  const windowWidth =
    UseWindowDimensions().width > 1080
      ? 1080
      : UseWindowDimensions().width;
  const BONNOU_COUNT = 108;
  const [count, setCount] = useState(BONNOU_COUNT);
  const [isSeparated, separate] = useState(true);
  const [isOmikujiOpened, openOmikuji] = useState(false);

  return (
    <>
      <BigBellContainer display="true">
        <StickContainer>
          <Rnd
            ref={stick}
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
                    el.current.play();
                  } catch (e) {}
                  setCount(count - 1);
                  if (count <= 1) {
                    openOmikuji(true);
                    setCount(BONNOU_COUNT);
                  }
                  console.log('PLAY');
                  separate(false);
                }
              } else {
                separate(true);
                openOmikuji(false);
              }
            }}
          >
            <StickImg
              ref={stickImg}
              fluid={data.stick1.childImageSharp.fluid}
              alt="鐘付き棒"
            />
          </Rnd>
          <audio ref={el}>
            <source
              src="/mp3/bell03.mp3"
              type="audio/mp3"
            />
          </audio>
        </StickContainer>
      </BigBellContainer>
      <BigBellContainer display="true">
        <div>
          <BigBellImg
            fluid={data.bigBell.childImageSharp.fluid}
            alt="除夜の鐘"
          />
        </div>
      </BigBellContainer>
      <BigBellContainer display="true">
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
      <BigBellContainer display={isOmikujiOpened}>
        <Omikuji />
      </BigBellContainer>
    </>
  );
};

export default BigBell;
