import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

interface MochiPropertyType {
  itemid: number;
}
interface MochiImgProps {
  delay: number;
}
interface MochiStageProps {
  negative: boolean;
}

const MochiStage = styled.div`
  pointer-events: none;
  position: absolute;
  width: 50%;
  height: 100%;
  left: ${(p: MochiStageProps) =>
    p.negative ? '0%' : '50%'};
  transform: scale(
    ${(p: MochiStageProps) => (p.negative ? -1 : 1)},
    1
  );
`;
const MochiInner = styled.div`
  pointer-events: none;
  position: relative;
  width: 100%;
  height: 100%;
`;
// const offset = 20;

const MochiImg = styled.img`
  opacity: 0;
  transform: translate(0px, -1000000px);
  position: absolute;
  animation-name: stylie-keyframes;
  animation-duration: 1200ms;
  animation-delay: ${(p: MochiImgProps) => p.delay}s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transform-origin: 0 0;
  @keyframes stylie-keyframes {
    0% {
      transform: translate(0px, 320px) scale(1)
        rotateX(0deg) rotateY(178deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    8.33% {
      transform: translate(51.625px, 201.0625px) scale(1)
        rotateX(0deg) rotateY(178deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    16.67% {
      transform: translate(59.5px, 176.75px) scale(1)
        rotateX(0deg) rotateY(177.5deg) rotateZ(0.5deg)
        translate(-50%, -50%);
    }
    25% {
      transform: translate(96.375px, 137.9375px) scale(1)
        rotateX(0deg) rotateY(177.75deg) rotateZ(0.25deg)
        translate(-50%, -50%);
    }
    33.33% {
      transform: translate(148px, 125px) scale(1)
        rotateX(0deg) rotateY(178deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    41.67% {
      transform: translate(229.7969px, 181.3643px) scale(1)
        rotateX(0deg) rotateY(177.875deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    50% {
      transform: translate(300.6875px, 350.457px) scale(1)
        rotateX(0deg) rotateY(177.75deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    58.33% {
      transform: translate(360.6719px, 587.5596px) scale(1)
        rotateX(0deg) rotateY(177.625deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    66.67% {
      transform: translate(409.75px, 490.2031px) scale(1)
        rotateX(0deg) rotateY(177.5deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    75% {
      transform: translate(447.9219px, 505.5752px) scale(1)
        rotateX(0deg) rotateY(177.375deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    83.33% {
      transform: translate(475.1875px, 588.957px) scale(1)
        rotateX(0deg) rotateY(177.25deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    91.67% {
      transform: translate(491.5469px, 583.833px) scale(1)
        rotateX(0deg) rotateY(177.125deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    100% {
      transform: translate(497px, 602px) scale(1)
        rotateX(0deg) rotateY(177deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
  }
`;
const Mochi = (props: MochiPropertyType) => {
  const data = useStaticQuery(
    graphql`
      query {
        mochi_red: file(
          relativePath: { eq: "mochi_red_kotobuki.gif" }
        ) {
          publicURL
        }
        mochi_white: file(
          relativePath: { eq: "mochi_white_iwai.gif" }
        ) {
          publicURL
        }
      }
    `,
  );
  interface StringKeyObject {
    [state: string]: any;
  }
  const transitionStyle: StringKeyObject = {
    entering: {
      transition: 'all 10s ease',
      opacity: 1,
    },
    entered: {
      transition: 'all 10s ease',
      opacity: 1,
    },
    exiting: {
      transition: 'all 1s ease',
      transform: 'translateY(0)',
    },
    exited: {
      transition: 'all 1s ease',
      transform: 'translateY(0)',
    },
  };

  const catchMochi = () => {
    setFlip(!flip);
  };
  const [flip, setFlip] = useState(true);
  return (
    <Transition in={flip} timeout={500}>
      {(state) => (
        <MochiStage negative={props.itemid % 2 === 1}>
          <MochiInner>
            <MochiImg
              delay={props.itemid}
              src={
                Math.floor(Math.random() * 2)
                  ? data.mochi_red.publicURL
                  : data.mochi_white.publicURL
              }
              style={transitionStyle[state]}
              className="mochi"
              alt={'mothi-' + props.itemid}
              onClick={catchMochi}
            />
          </MochiInner>
        </MochiStage>
      )}
    </Transition>
  );
};

export default Mochi;
