import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const OldFashionedLinkButton = styled(props => <Link {...props} />)`
  display: block;
  padding: 12px;
  background-color: #BFBFBF;
  border-style: solid;
  border-width: 3px;
  border-color: #FAFAFA #757575 #757575 #FAFAFA;
  text-decoration: none;
  &:hover {
    background-color: #CFCFCF;
    border-color: #FFFFFF #858585 #858585 #FFFFFF;
    text-decoration: underline;
  }
  &:active {
    border-color: #757575 #EAEAEA #EAEAE9A #757575;
  }
  &.current {
    color: #000;
    border-color: #757575 #FAFAFA #FAFAFA #757575;
    &:hover {
      background-color: inherit;
      border-color: #757575 #FAFAFA #FAFAFA #757575;
      text-decoration: none;
    }
  }
`

const ButtonContainer = styled.div`
  display: inline-block;
  border: solid #000000 2px;
  text-align: center;
`

interface ButtonPropertyType {
  path: String
  text: String
}

function Button(props: ButtonPropertyType) {
  return (
    <ButtonContainer>
      <OldFashionedLinkButton to={props.path} activeClassName="current">
        {props.text}
      </OldFashionedLinkButton>
    </ButtonContainer>
  )
}

export default Button;
