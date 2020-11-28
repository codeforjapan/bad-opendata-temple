import React, { useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

type Props = {
  stick: string;
  stickTaped: string;
};

const Stick = styled.div`
  width: 43px;
  cursor: url('${(props: Props) => props.stick}') 10 30,
    auto;
  &:active {
    cursor: url('${(props: Props) => props.stickTaped}') 10
        20,
      auto;
  }
`;

const BellSoundButton = () => {
  const el = useRef(null);
  const handleClick = () => el.current.play();
  const data = useStaticQuery(graphql`
    query {
      orin: file(relativePath: { eq: "orin.png" }) {
        childImageSharp {
          fixed(width: 43) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      stick: file(relativePath: { eq: "orinbou_1.gif" }) {
        publicURL
      }
      stickTaped: file(
        relativePath: { eq: "orinbou_2.gif" }
      ) {
        publicURL
      }
    }
  `);

  return (
    <Stick
      stick={data.stick.publicURL}
      stickTaped={data.stickTaped.publicURL}
    >
      <span onMouseDown={handleClick}>
        <Img fixed={data.orin.childImageSharp.fixed} />
      </span>
      <audio ref={el}>
        <source src="/mp3/ding.mp3" type="audio/mp3" />
      </audio>
    </Stick>
  );
};

export default BellSoundButton;
