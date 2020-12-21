import * as React from 'react';
import styled from 'styled-components';
import GlobalNavigation from './globalNavigation';
import Header from './header';
import Footer from './footer';
import './layout.css';

const Container = styled.div`
  margin: 0 auto;
  max-width: 1080px;
  background-color: #fff;
`;

const MainContents = styled.div`
  padding: 30px 30px 60px;
`;

interface Prop {
  children: React.ReactNode;
}

const Layout: React.FC<Prop> = ({ children }) => {
  return (
    <>
      <Container>
        <Header />
        <GlobalNavigation />
        <main>
          <MainContents>{children}</MainContents>
        </main>
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
