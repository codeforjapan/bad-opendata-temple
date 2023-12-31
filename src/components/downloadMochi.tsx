import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Marquee from '../components/marquee';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.div`
  flex: 0 1 auto;
  padding-right: 12px;
  overflow: hidden;
`;

const ImgContainer = styled.div`
  flex: 1 0 auto;
  color: #fff;
  font-size: 12px;
  text-align: center;
`;

const DownloadMochi = () => {
  const data = useStaticQuery(graphql`
    query DownloadMochiQuery {
      red: file(
        relativePath: { eq: "mochi_red_kotobuki.gif" }
      ) {
        publicURL
      }
      white: file(
        relativePath: { eq: "mochi_white_iwai.gif" }
      ) {
        publicURL
      }
    }
  `);

  return (
    <Container>
      <TextContainer>
        <Marquee
          text="上棟式にお越しいただき、ありがとうございます。引き出物はこちらです。ぜひお持ち帰りください。→→→→→"
          $delay="1s"
          $duration="20s"
        />
      </TextContainer>
      <ImgContainer>
        <span>右クリックでダウンロード</span>
        <br />
        <img src={data.red.publicURL} alt="餅（赤）" />
        <img src={data.white.publicURL} alt="餅（白）" />
        <img src={data.red.publicURL} alt="餅（赤）" />
        <img src={data.white.publicURL} alt="餅（白）" />
        <img src={data.red.publicURL} alt="餅（赤）" />
        <img src={data.white.publicURL} alt="餅（白）" />
      </ImgContainer>
    </Container>
  );
};

export default DownloadMochi;
