import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const OmikujiStyle = styled.div`
  display: inline-block !important;
  margin: auto;
`;

const Omikuji = () => {
  const data = useStaticQuery(
    graphql`
      {
        nenga1: file(relativePath: { eq: "nenga1.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        nenga2: file(relativePath: { eq: "nenga2.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        nenga3: file(relativePath: { eq: "nenga3.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        nenga4: file(relativePath: { eq: "nenga4.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        nenga5: file(relativePath: { eq: "nenga5.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    `,
  );
  const omikujiList = [
    data.nenga1.childImageSharp.gatsbyImageData,
    data.nenga2.childImageSharp.gatsbyImageData,
    data.nenga3.childImageSharp.gatsbyImageData,
    data.nenga4.childImageSharp.gatsbyImageData,
    data.nenga5.childImageSharp.gatsbyImageData,
  ];
  const selectList = () => {
    return Math.floor(Math.random() * omikujiList.length);
  };
  return (
    <OmikujiStyle>
      <GatsbyImage image={omikujiList[selectList()]} />
    </OmikujiStyle>
  );
};

export default Omikuji;
