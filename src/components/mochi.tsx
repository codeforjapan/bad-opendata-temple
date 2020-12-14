import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import './stylie.module.scss';

interface MochiPropertyType {
  itemid: number;
}
interface MochiImgProps {
  delay: number;
  isMobile: boolean;
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

const MochiImg = styled.img.attrs((p: MochiImgProps) => ({
  delay: p.delay,
  isMobile: p.isMobile,
}))`
  opacity: 0;
  transform: translate(0px, -1000000px);
  position: absolute;
  animation-name: ${(p) =>
    p.isMobile
      ? 'stylie-keyframes-responsive'
      : 'stylie-keyframes-fix'};
  animation-duration: 1200ms;
  animation-delay: ${(p) => p.delay}s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transform-origin: 0 0;
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
  const breakpoints = useBreakpoint();
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
              isMobile={breakpoints.md}
            />
          </MochiInner>
        </MochiStage>
      )}
    </Transition>
  );
};

export default Mochi;
