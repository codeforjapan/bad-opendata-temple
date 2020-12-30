import React, { useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import UseWindowDimensions from './useWindowDimensions';

const BigBellContainer = styled.div`
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
const BigBellImg = styled((props) => <Img {...props} />)`
  flex: 1 1 auto;
  align-items: flex-end;
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
  const windowWidth = UseWindowDimensions().width;
  const [count, setCount] = useState(108);
  const [isSeparated, separate] = useState(true);

  return (
    <>
      <BigBellContainer>
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
                  if (!el.current.paused) {
                    el.current.pause();
                    el.current.currentTime = 0;
                  }
                  el.current.play();
                  setCount(count - 1);
                  console.log('PLAY');
                  separate(false);
                }
              } else {
                separate(true);
              }
            }}
          >
            <Img
              ref={stickImg}
              fluid={data.stick1.childImageSharp.fluid}
              alt="鐘付き棒"
            ></Img>
          </Rnd>
          <audio ref={el}>
            <source
              src="/mp3/bell03.mp3"
              type="audio/mp3"
            />
          </audio>
        </StickContainer>
      </BigBellContainer>
      <BigBellContainer>
        <div>
          <BigBellImg
            fluid={data.bigBell.childImageSharp.fluid}
            alt="除夜の鐘"
          />
        </div>
      </BigBellContainer>
      <BigBellContainer>
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
    </>
  );
};

export default BigBell;
