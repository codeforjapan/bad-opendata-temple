import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const OldFashionedLinkButton = styled((props) => (
  <Link
    to={props.to}
    activeClassName={props.activeClassName}
  />
))`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
  padding: 12px;
  background-color: #bfbfbf;
  border-style: solid;
  border-width: 3px;
  border-color: #fafafa #757575 #757575 #fafafa;
  text-decoration: none;
  &:hover {
    background-color: #cfcfcf;
    border-color: #ffffff #858585 #858585 #ffffff;
    text-decoration: underline;
  }
  &:active {
    border-color: #757575 #eaeaea #EAEAE9A #757575;
  }
  &.current {
    color: #000;
    border-color: #757575 #fafafa #fafafa #757575;
    &:hover {
      background-color: inherit;
      border-color: #757575 #fafafa #fafafa #757575;
      text-decoration: none;
    }
  }
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  border: solid #000000 2px;
  text-align: center;
`;

interface ButtonPropertyType {
  path: String;
  text: String;
}

const Button = (props: ButtonPropertyType) => {
  return (
    <ButtonContainer>
      <OldFashionedLinkButton
        to={props.path}
        activeClassName="current"
      >
        <span>{props.text}</span>
      </OldFashionedLinkButton>
    </ButtonContainer>
  );
};

export default Button;
