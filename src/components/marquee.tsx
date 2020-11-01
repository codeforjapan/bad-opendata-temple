import * as React from 'react'
import styled, { keyframes } from 'styled-components'

type Props = {
  text: string;
  duration?: string;
  delay?: string;
}

const MarqueeWrap = styled.div`
  padding: 0.5em 0;
  overflow: hidden;
  background-color: #000;
  margin-bottom: 10px;
  position: relative;
`
const marqueeAnimation = keyframes`
  from   { transform: translate(0%);}
  99%,to { transform: translate(-100%);}
`
const Paragraph = styled.p`
  color: #00ff22;
  margin: 0;
  padding-left: 100%;
  display: inline-block;
  white-space: nowrap;
  animation-name: ${marqueeAnimation};
  animation-timing-function: linear;
  animation-duration: ${(props: Props) => props.duration ? props.duration : '18s'};
  animation-iteration-count: infinite;
  animation-delay: ${(props: Props) => props.delay ? props.delay : '0s'};
  &::after {
    content: "";
    white-space: nowrap;
    padding-right: 50px;
  }
`

const Marquee = (props: Props) => {
  return (
    <MarqueeWrap>
      <Paragraph {...props}>{ props.text }</Paragraph>
    </MarqueeWrap>
  )
}

export default Marquee;
