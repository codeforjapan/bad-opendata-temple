import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const WordArtContainer = styled.div`
  background-color: rebeccapurple;
  padding: 16px;
`;

const ContactContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background-color: #808080;
  padding: 0 30px;
`;

const AddressContainer = styled.div`
  padding: 0 20px 20px 0;
  p {
    margin: 0;
  }
`;

const TempleImg = styled((props) => <Img {...props} />)`
  flex: 0 0 auto;
`;

const CopyContainer = styled.div`
  background-color: #002198;
  color: #fff;
  text-align: center;
  padding: 12px 30px;
`;

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      temple: file(relativePath: { eq: "temple.png" }) {
        childImageSharp {
          fixed(width: 189) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      wordart: file(relativePath: { eq: "wordart.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <footer>
      <WordArtContainer>
        <Img fluid={data.wordart.childImageSharp.fluid} />
      </WordArtContainer>
      <ContactContainer>
        <AddressContainer>
          <h2>寺務所</h2>
          <p>Code for Japan内</p>
          <p>
            まずは
            <a href="https://join.slack.com/t/cfj/shared_invite/zt-473qa2x1-Fc_Uo76uPPRm2j~JBWRx1w">
              こちら
            </a>
            からCode for
            Japanの公式Slackにご参加頂き、以下のチャンネルにご参加ください。
          </p>
          <span>#proj-bod供養寺</span>
        </AddressContainer>
        <TempleImg
          fixed={data.temple.childImageSharp.fixed}
        />
      </ContactContainer>
      <CopyContainer>
        <small>
          このサイトの内容物は クリエイティブ・コモンズ 表示
          4.0 ライセンス の下に提供されています。 &copy;
          2020 BADオープンデータ供養寺
        </small>
      </CopyContainer>
    </footer>
  );
};
export default Footer;
