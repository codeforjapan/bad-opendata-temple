import React, { useState, useEffect } from 'react';
import fetch, { Headers, RequestInfo } from 'node-fetch';
import styled from 'styled-components';

const TamagakiImage = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
`;

const TamagakiWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  border-style: solid;
  border-width: 0px 0px 9px 0px;
  border-color: #bfbfbf;
`;

const TamagakiContainer = styled.div`
  writing-mode: vertical-rl;
  text-orientation: upright;
  flex: 0 1 auto;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  padding: 12px;
  background-color: #bfbfbf;
  border-style: solid;
  border-width: 3px 3px 0px 3px;
  border-color: #fafafa #757575 #757575 #fafafa;
  text-decoration: none;
`;

interface GitHubUserPropertyType {
  login: String;
  // eslint-disable-next-line camelcase
  avatar_url: String;
  url: String;
}

interface TamagakiPropertyType {
  name: String;
  path: String;
  image: String;
}

const GitHubAPIGetContributors: RequestInfo =
  'https://api.github.com/repos/codeforjapan/bad-opendata-temple/contributors';
const requestHeaders: Headers = new Headers();
requestHeaders.set(
  'Accept',
  'application/vnd.github.v3+json',
);

const Tamagaki = () => {
  const [items, addItem] = useState<TamagakiPropertyType[]>(
    [],
  );

  useEffect(() => {
    if (items.length !== 0) return;
    fetch(GitHubAPIGetContributors, {
      method: 'GET',
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((result: any[]) => {
        const list: TamagakiPropertyType[] = [];
        result.forEach(
          (element: GitHubUserPropertyType) => {
            list.push({
              path: element.url,
              image: element.avatar_url,
              name: element.login,
            });
          },
        );
        addItem(list);
      });
  });

  return (
    <TamagakiWrapper>
      {items.map((item: TamagakiPropertyType, index) => (
        // eslint-disable-next-line react/jsx-key
        <TamagakiContainer key={index}>
          <TamagakiImage src={item.image} />
          <span>{item.name}</span>
        </TamagakiContainer>
      ))}
    </TamagakiWrapper>
  );
};

export default Tamagaki;
