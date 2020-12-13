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
  recordId?: string;
  fields?: {
    slug?: string;
  };
  data?: {
    Title?: string;
    Date?: string;
    Name?: string;
  };
}

interface IProp {
  contents: INode[];
}

export default function ListOfContents(props: IProp) {
  console.log(props);
  const listItems = props.contents.map((item, index) => (
    <ContentsListItem key={index}>
      <a href={item.fields.slug}>
        {item.data!.Title} - {item.data!.Date}
      </a>{' '}
      by {item.data!.Name}
    </ContentsListItem>
  ));
  return <ContentsList>{listItems}</ContentsList>;
}
