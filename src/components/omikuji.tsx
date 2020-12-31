import React from 'react';
import styled from 'styled-components';

const OmikujiStyle = styled.div`
  display: inline-block !important;
  margin: auto;
  font-size: 40px;
  background-color: black;
  color: #ecff00;
  border: double 10px #ecff00;
`;

const omikujiList = ['大吉', '中吉', '吉', '凶', '大凶'];
const selectList = () => {
  return Math.floor(Math.random() * omikujiList.length);
};
const Omikuji = () => {
  return (
    <OmikujiStyle>{omikujiList[selectList()]}</OmikujiStyle>
  );
};

export default Omikuji;
