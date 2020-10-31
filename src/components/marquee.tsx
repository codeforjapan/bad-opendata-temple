import * as React from 'react'
import styled, { keyframes } from 'styled-components'

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
  animation-duration: 18s;
  animation-iteration-count: infinite;
  &::after {
    content: "";
    white-space: nowrap;
    padding-right: 50px;
  }
`

const Marquee = () => {
  return (
    <MarqueeWrap>
      <Paragraph>BADデータを作ってしまうとその除霊や供養にはその何倍ものコストがかかります。お金は大切に。</Paragraph>
    </MarqueeWrap>
  )
}

export default Marquee;
