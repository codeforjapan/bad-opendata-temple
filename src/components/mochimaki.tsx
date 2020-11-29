import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const Jushoku = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  z-index: 2;
  img {
    align-self: flex-end;
  }
`;

const Mochimaki = () => {
  const mochimaki = () => {
    console.log('mochi!');
  };
  const data = useStaticQuery(
    graphql`
      query {
        jushoku: file(relativePath: { eq: "jushoku.svg" }) {
          publicURL
        }
      }
    `,
  );
  return (
    <Jushoku>
      <img
        src={data.jushoku.publicURL}
        onClick={mochimaki}
      />
    </Jushoku>
  );
};

export default Mochimaki;
