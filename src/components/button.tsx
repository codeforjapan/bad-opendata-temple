import * as React from 'react'
import styled from 'styled-components'

const OldFashionedButton = styled.button`
  padding: 3px;
  background-color: #BFBFBF;
  border-style: solid;
  border-width: 3px;
  border-color: #FAFAFA #757575 #757575 #FAFAFA;
  &:hover {
    background-color: #CFCFCF;
    border-color: #FFFFFF #858585 #858585 #FFFFFF;
  }
  &:active {
    border-color: #757575 #EAEAEA #EAEAE9A #757575;
  }
`

const ButtonContainer = styled.div`
  display: inline-block;
  border: solid #000000 2px;
`

interface ButtonPropertyType {
  text: String
}

function Button(props: ButtonPropertyType) {
  return (
    <ButtonContainer>
      <OldFashionedButton>
        {props.text}
      </OldFashionedButton>
    </ButtonContainer>
  )
}

export default Button;
