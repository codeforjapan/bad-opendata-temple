import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

interface MochiPropertyType {
  itemid: number;
}
interface MochiImgProps {
  negative: 1 | -1;
  delay: number;
}

const offset = 20;

const MochiImg = styled.img`
  opacity: 1;
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
      transform: translate(15px, -250px) scale(1)
        rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    8.33% {
      transform: translate(
          ${5.3125 + offset}px,
          -256.4063px
        )
        scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    16.67% {
      transform: translate(${13.25 + offset}px, -318.125px)
        scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    25% {
      transform: translate(
          ${45.8125 + offset}px,
          -355.1563px
        )
        scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    33.33% {
      transform: translate(${97 + offset}px, -367.5px)
        scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    41.67% {
      transform: translate(
          ${186.375 + offset}px,
          -307.8271px
        )
        scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    50% {
      transform: translate(${226.5 + offset}px, -131.1914px)
        scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    58.33% {
      transform: translate(${277.375 + offset}px, 20px)
        scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    66.67% {
      transform: translate(${309 + offset}px, -30.1406px)
        scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    75% {
      transform: translate(${341.375 + offset}px, -40.415px)
        scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    83.33% {
      transform: translate(${350.5 + offset}px, -20.6914px)
        scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    91.67% {
      transform: translate(${360.375 + offset}px, -0.2666px)
        scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
    100% {
      transform: translate(${370 + offset}px, 20px) scale(1)
        rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(-50%, -50%);
    }
  }
`;
const Mochi = (props: MochiPropertyType) => {
  console.log(props.itemid);
  console.log(props.itemid % 2 !== 1 ? 1 : -1);

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
      opacity: 1.0,
    },
    entered: {
      transition: 'all 10s ease',
      opacity: 1.0,
    },
    exiting: {
      transition: 'all 1s ease',
      transform: 'translateY(0)',
      opacity: 1.0,
    },
    exited: {
      transition: 'all 1s ease',
      transform: 'translateY(0)',
      opacity: 1.0,
    },
  };

  const catchMochi = () => {
    console.log('catch!');
    setFlip(!flip);
  };
  const [flip, setFlip] = useState(true);
  return (
    <Transition in={flip} timeout={500}>
      {(state) => (
        <div className="mochistages">
          <div className="mochimove">
            <MochiImg
              negative={props.itemid % 2 !== 1 ? 1 : -1}
              delay={props.itemid}
              src={
                Math.floor(Math.random() * 2)
                  ? data.mochi_red.publicURL
                  : data.mochi_white.publicURL
              }
              style={transitionStyle[state]}
              className="mochi"
              alt={'hoge' + props.itemid}
              onClick={catchMochi}
            />
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Mochi;
