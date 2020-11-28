import * as React from 'react';
import styled from 'styled-components';
import Button from './button';

const contents = [
  {
    text: '当寺について',
    path: '/about',
  },
  {
    text: '供養塔',
    path: '/case-study',
  },
  {
    text: '宝蔵',
    path: '/tools',
  },
  {
    text: '檀家募集',
    path: '/contribution',
  },
  {
    text: '供養依頼',
    path: '/data-cleansing-request',
  },
];

const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 10px;
  background-color: #bfbfbf;
`;

const MenuItem = styled.li`
  flex: 0 0 calc(${100 / contents.length}% - 20px);
  display: flex;
  div {
    flex: 1 0 auto;
  }
`;

const GlobalNavigation = () => {
  const menuItems = contents.map((item, index) => (
    <MenuItem key={index}>
      <Button text={item.text} path={item.path} />
    </MenuItem>
  ));
  return (
    <nav>
      <MenuList>{menuItems}</MenuList>
    </nav>
  );
};

export default GlobalNavigation;
