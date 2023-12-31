import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

interface InformationData {
  allInformationCsv: {
    nodes: [
      {
        date: string;
        text: string;
        url: string;
      },
    ];
  };
}

const Title = styled.h2`
  color: #ebff00;
  border-bottom: 5px ridge #ccc;
  padding: 12px 0;
`;

const List = styled.ul`
  border: 2px solid #00d645;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  background-color: #4ca6a6;
  border-bottom: 2px solid #00d645;
  &:last-child {
    border-bottom: none;
  }
  &:nth-child(even) {
    color: #fff;
    background-color: #000;
    a {
      color: #fff;
    }
  }
`;

const ItemChild = styled.div`
  padding: 12px;
`;

const ItemChildDate = styled(ItemChild)`
  flex: 0 0 6em;
`;

const ItemChildText = styled(ItemChild)`
  flex: 1 1 auto;
  border-left: 2px solid #00d645;
  p {
    margin: 0;
  }
`;

const Information = () => {
  const data: InformationData = useStaticQuery(graphql`
    query InformationQuery {
      allInformationCsv(limit: 5, sort: { date: DESC }) {
        nodes {
          date
          text
          url
        }
      }
    }
  `);

  const informationItems = data.allInformationCsv.nodes.map(
    (node, index) => {
      const text = `${node.text} 🙏`;
      return (
        <Item key={index}>
          <ItemChildDate>
            <time>{node.date}</time>
          </ItemChildDate>
          <ItemChildText>
            {!node.url ? (
              <p>{text}</p>
            ) : /^https?:\/\//.test(node.url) ? (
              <a href={node.url}>{text}</a>
            ) : (
              <Link to={node.url}>{text}</Link>
            )}
          </ItemChildText>
        </Item>
      );
    },
  );

  return (
    <div>
      <Title>お知らせ</Title>
      <List>{informationItems}</List>
    </div>
  );
};

export default Information;
