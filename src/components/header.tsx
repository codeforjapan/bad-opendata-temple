import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { globalHistory } from '@reach/router';
import styled from 'styled-components';
import BellSoundButton from './bellSoundButton';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rebeccapurple;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #fff;
  margin: 0;
`;

const HeadingLink = styled((props) => <Link {...props} />)`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin: 0 16px;
`;
const GitHubContainer = styled.div`
  margin: 0;
`;

interface HeaderPageProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  github: {
    publicURL: string;
  };
}

const Header = () => {
  const data: HeaderPageProps = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        github: file(relativePath: { eq: "github.png" }) {
          publicURL
        }
      }
    `,
  );
  const Title = () => {
    return globalHistory.location.pathname === '/' ? (
      <Heading>{data.site.siteMetadata.title}</Heading>
    ) : (
      <HeadingLink to="/">
        {data.site.siteMetadata.title}
      </HeadingLink>
    );
  };
  const params = 'width=350,height=300';

  return (
    <HeaderContainer>
      <Title />
      <FlexWrap>
        <GitHubContainer>
          <div>
            <a href="https://github.com/codeforjapan/bad-opendata-temple/">
              <img
                src={data.github.publicURL}
                alt="GitHub"
              />
            </a>
          </div>
        </GitHubContainer>
        <ButtonContainer>
          <button
            onClick={() =>
              window.open(
                '/dedication',
                'dedication',
                params,
              )
            }
          >
            奉納
          </button>
        </ButtonContainer>
        <BellSoundButton />
      </FlexWrap>
    </HeaderContainer>
  );
};
export default Header;
