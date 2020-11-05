import * as React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'

const RandomWordWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin: 0 16px;
  }
`

const ImgWrap = styled.div`
  padding: 16px;
`

const Title = styled.h2`
  font-size: 30px;
  font-weight: normal;
`

const ParagraphWrap = styled.div`
  flex: 0 0 50%;
  display: flex;
  align-content: center;
  padding: 16px;
  background-color: #30F3FF;
  box-shadow: 4px 4px rgb(0,0,0,0.75);
`

const RandomWord = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allIndexCsv {
          nodes {
            word
          }
        },
        file(relativePath: {eq: "jushoku.svg"}) {
          publicURL
        }
      }
    `
  )

  const node = data.allIndexCsv.nodes;
  const number = Math.floor( Math.random()*node.length );

  return (
    <RandomWordWrap>
      <ImgWrap>
        <img src={data.file.publicURL} alt="住職" />
      </ImgWrap>
      <Title>今日の住職のひとこと</Title>
      <ParagraphWrap>
        <p>{ node[number].word }</p>
      </ParagraphWrap>
    </RandomWordWrap>
  )
}

export default RandomWord;
