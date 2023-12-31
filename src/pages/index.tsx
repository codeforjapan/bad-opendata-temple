import * as React from 'react';
import { Link } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import styled from 'styled-components';
import '../components/layout.css';
import ContentWrap from '../components/contentWrap';
import GlobalNavigation from '../components/globalNavigation';
import Header from '../components/header';
import Hero from '../components/hero';
import DownloadMochi from '../components/downloadMochi';
import Marquee from '../components/marquee';
import AccessCounter from '../components/accessCounter';
import DaysFromFoundation from '../components/daysFromFoundation';
import RandomWord from '../components/randomWord';
import Information from '../components/information';
import Footer from '../components/footer';
import Head from '../components/head';
import Tamagaki from '../components/tamagaki';

const Container = styled.div`
  margin: 0 auto;
  max-width: 1080px;
`;

const MainContents = styled.div`
  padding: 30px 30px 60px;
`;

const CatchTextWrap = styled.div`
  background-color: #ffa927;
  box-shadow: 6px 6px rgb(0, 0, 0, 0.75);
  padding: 20px;
  p {
    margin: 0;
    text-align: center;
    font-size: 22px;
    line-height: 1.8;
  }
`;

const ComponentWrap = styled.div`
  margin: 30px 0;
`;

type FlexWrapProps = {
  ismobile: boolean;
};
const FlexWrap = styled.div.attrs<FlexWrapProps>(
  ({ ismobile }) => ({
    ismobile: ismobile,
  }),
)`
  display: flex;
  justify-content: space-around;
  flex-direction: ${({ ismobile }: FlexWrapProps) =>
    ismobile ? 'column' : 'row'};
  > * {
    margin: 16px;
  }
`;

const IndexPage: React.FC = () => {
  const breakpoints = useBreakpoint();

  return (
    <>
      <Head />
      <Container>
        <Header />
        <Hero />
        <DownloadMochi />
        <GlobalNavigation />
        <ContentWrap>
          <main>
            <Marquee text="BADデータを作ってしまうとその除霊や供養にはその何倍ものコストがかかります。お金は大切に。" />
            <MainContents>
              <CatchTextWrap>
                <p>
                  BADオープンデータ供養寺は、
                  <br />
                  世の中に災厄をもたらすBADなオープンデータが二度とこの世を彷徨わないように
                  <br />
                  「供養（データクレンジング）」するために建立されました。
                </p>
              </CatchTextWrap>
              <ComponentWrap>
                <FlexWrap ismobile={breakpoints.sm}>
                  <AccessCounter />
                  <DaysFromFoundation />
                </FlexWrap>
              </ComponentWrap>
              <ComponentWrap>
                <RandomWord />
              </ComponentWrap>
              <ComponentWrap>
                <Information />
              </ComponentWrap>
              <Link to="/page-2/">Go to page 2</Link>
            </MainContents>
          </main>
          <Tamagaki />
        </ContentWrap>
        <Footer />
      </Container>
    </>
  );
};

export default IndexPage;
