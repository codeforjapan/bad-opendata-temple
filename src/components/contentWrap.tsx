import * as React from 'react'
import styled from 'styled-components'
import bgImg from '../contents/images/background.svg'

const BackGroundWrap = styled.div`
  background-color: #078282;
  background-image: url(${bgImg});
  background-repeat: repeat;
`


const ContentWrap: React.FC = ({ children }) => {
  return (
    <BackGroundWrap>
      { children }
    </BackGroundWrap>
  )
}

export default ContentWrap;
