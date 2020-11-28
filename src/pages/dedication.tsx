import * as React from 'react';
import styled from 'styled-components';
import Sakadaru from '../components/sakadaru';

const Background = styled.div`
  background-color: #fff;
  padding: 30px;
`;

const Dedication = () => (
  <Background>
    <Sakadaru name="BOD" />
  </Background>
);

export default Dedication;
