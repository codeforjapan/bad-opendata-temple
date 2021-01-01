import React, { useRef } from 'react';
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
  margin: 11% 50%;
`;
const style = {
  'pointer-events': 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#433100',
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
      }
    `,
  );
  const stick = useRef(null);
  const el = useRef(null);
  const windowWidth = UseWindowDimensions().width;

  return (
    <>
      <BigBellContainer>
        <StickContainer>
          <Rnd
            ref={stick}
            style={style}
            size={{ width: 100, height: 25 }}
            position={{ x: windowWidth / 10, y: 0 }}
            dragAxis="x"
            enableResizing={false}
            onDrag={(_e, d) => {
              if (d.x <= windowWidth / 26) {
                el.current.play();
              }
            }}
          >
            鐘付き棒
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
    </>
  );
};

export default BigBell;
