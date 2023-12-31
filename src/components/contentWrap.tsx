import * as React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { File } from '../../types/graphql-types';

type ContentWrapData = {
  $bgimg: File;
};

const BackGroundWrap = styled.div<ContentWrapData>`
  background-color: #078282;
  background-image: url(${({ $bgimg }) =>
    $bgimg.publicURL});
  background-repeat: repeat;
`;

const ContentWrap: React.FC = ({ children }) => {
  const data = useStaticQuery<ContentWrapData>(graphql`
    query ContentWrapQuery {
      bgimg: file(relativePath: { eq: "background.svg" }) {
        publicURL
      }
    }
  `);

  return (
    <BackGroundWrap $bgimg={data.bgimg}>
      {children}
    </BackGroundWrap>
  );
};

export default ContentWrap;
