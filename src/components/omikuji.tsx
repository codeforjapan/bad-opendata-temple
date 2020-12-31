import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const OmikujiStyle = styled.div`
  display: inline-block !important;
  margin: auto;
`;

const Omikuji = () => {
  const data = useStaticQuery(
    graphql`
      query {
        nenga1: file(relativePath: { eq: "nenga1.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        nenga2: file(relativePath: { eq: "nenga2.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        nenga3: file(relativePath: { eq: "nenga3.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        nenga4: file(relativePath: { eq: "nenga4.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        nenga5: file(relativePath: { eq: "nenga5.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `,
  );
  const omikujiList = [
    data.nenga1.childImageSharp.fluid,
    data.nenga2.childImageSharp.fluid,
    data.nenga3.childImageSharp.fluid,
    data.nenga4.childImageSharp.fluid,
    data.nenga5.childImageSharp.fluid,
  ];
  const selectList = () => {
    return Math.floor(Math.random() * omikujiList.length);
  };
  return (
    <OmikujiStyle>
      <Img fluid={omikujiList[selectList()]} />
    </OmikujiStyle>
  );
};

export default Omikuji;
