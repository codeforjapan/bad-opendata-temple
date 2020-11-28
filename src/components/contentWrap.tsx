import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

type Props = {
  bgImg: string;
};

const BackGroundWrap = styled.div`
  background-color: #078282;
  background-image: url(${(props: Props) => props.bgImg});
  background-repeat: repeat;
`;

const ContentWrap: React.FC<Props> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      bgImg: file(relativePath: { eq: "background.svg" }) {
        publicURL
      }
    }
  `);

  return (
    <BackGroundWrap bgImg={data.bgImg.publicURL}>
      {children}
    </BackGroundWrap>
  );
};

ContentWrap.propTypes = {
  children: PropTypes.node,
} as React.WeakValidationMap<Props>;

export default ContentWrap;
