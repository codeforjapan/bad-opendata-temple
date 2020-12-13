import * as React from 'react';
import styled from 'styled-components';

const ContentsList = styled.ul`
  list-style: none;
  margin: 10px 0;
  padding: 10px;
`;

const ContentsListItem = styled.li`
  display: block;
`;

interface INode {
  id: string;
  frontmatter?: {
    title?: string;
    slug?: string;
    date?: string;
  };
}

interface IProp {
  contents: INode[];
}

export default function ListOfContents(props: IProp) {
  const listItems = props.contents.map((item, index) => (
    <ContentsListItem key={index}>
      <a href={item.frontmatter!.slug}>
        {item.frontmatter!.title} - {item.frontmatter!.date}
      </a>
    </ContentsListItem>
  ));
  return <ContentsList>{listItems}</ContentsList>;
}
