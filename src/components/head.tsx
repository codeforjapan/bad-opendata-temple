import * as React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';
import { HeadQuery } from '../../types/graphql-types';

const query = graphql`
  query Head {
    site {
      siteMetadata {
        title
        siteName
        siteUrl
        description
        keywords
        type
      }
    }
    file(relativePath: { eq: "ogp.png" }) {
      childImageSharp {
        resize(width: 1200) {
          src
        }
      }
    }
  }
`;

type Props = {
  pageTitle?: string;
  ogDescription?: string;
  ogType?: 'website' | 'article';
};

const Head: React.VFC<Props> = (props) => {
  const {
    site: { siteMetadata },
    file,
  } = useStaticQuery<HeadQuery>(query);
  const { pathname } = useLocation();
  const ogTitle = React.useMemo(
    () =>
      props?.pageTitle
        ? `${props.pageTitle} - ${siteMetadata.title}`
        : siteMetadata.title,
    [props, siteMetadata],
  );
  return (
    <Helmet
      title={ogTitle}
      meta={[
        {
          name: 'description',
          content: siteMetadata.description,
        },
        {
          name: 'keywords',
          content: siteMetadata.keywords,
        },
        { property: 'og:title', content: ogTitle },
        {
          property: 'og:description',
          content:
            props?.ogDescription ??
            siteMetadata.description,
        },
        {
          property: 'og:url',
          content: siteMetadata.siteUrl + pathname,
        },
        {
          property: 'og:type',
          content: props?.ogType ?? siteMetadata.type,
        },
        {
          property: 'og:site_name',
          content: siteMetadata.siteName,
        },
        {
          property: 'og:image',
          content:
            siteMetadata.siteUrl +
            file.childImageSharp.resize.src,
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '896' },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ]}
    />
  );
};

export default Head;
