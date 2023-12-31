import * as React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { File } from '../../types/graphql-types';

type ContentWrapData = {
  bgImg: File;
};

const BackGroundWrap = styled.div<ContentWrapData>`
  background-color: #078282;
  background-image: url(${({ bgImg }) => bgImg.publicURL});
  background-repeat: repeat;
`;

const ContentWrap: React.FC = ({ children }) => {
  const data = useStaticQuery<ContentWrapData>(graphql`
    query ContentWrapQuery {
      bgImg: file(relativePath: { eq: "background.svg" }) {
        publicURL
      }
    }
  `);

  return (
    <BackGroundWrap bgImg={data.bgImg}>
      {children}
    </BackGroundWrap>
  );
};

export default ContentWrap;
