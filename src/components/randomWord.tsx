import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import styled from 'styled-components';

type Props = {
  isMobile: boolean;
};

const RandomWordWrap = styled.div.attrs((props: Props) => ({
  isMobile: props.isMobile,
}))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${(props) =>
    props.isMobile ? 'column' : 'row'};
`;

const FlexWrap = styled.div.attrs((props: Props) => ({
  isMobile: props.isMobile,
}))`
  flex: 0 0 ${(props) => (props.isMobile ? '100%' : '50%')};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ImgWrap = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: normal;
  margin: 0 16px;
`;

const ParagraphWrap = styled.div.attrs((props: Props) => ({
  isMobile: props.isMobile,
}))`
  flex: 0 0 ${(props) => (props.isMobile ? '100%' : '50%')};
  display: flex;
  align-content: center;
  background-color: #30f3ff;
  box-shadow: 4px 4px rgb(0, 0, 0, 0.75);
  p {
    padding: 16px;
  }
`;

const RandomWord = () => {
  const data = useStaticQuery(
    graphql`
      query RandomWordQuery {
        allHitokotoCsv {
          nodes {
            word
          }
        }
        file(relativePath: { eq: "jushoku.gif" }) {
          publicURL
        }
      }
    `,
  );
  const breakpoints = useBreakpoint();
  const node = data.allHitokotoCsv.nodes;
  const number = Math.floor(Math.random() * node.length);

  return (
    <RandomWordWrap isMobile={breakpoints.sm}>
      <FlexWrap>
        <ImgWrap>
          <img src={data.file.publicURL} alt="住職" />
        </ImgWrap>
        <Title>今日の住職のひとこと</Title>
      </FlexWrap>
      <ParagraphWrap isMobile={breakpoints.sm}>
        <p>{node[number].word}</p>
      </ParagraphWrap>
    </RandomWordWrap>
  );
};

export default RandomWord;
