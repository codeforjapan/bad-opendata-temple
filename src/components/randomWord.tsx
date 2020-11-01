import * as React from 'react'
import { useStaticQuery, graphql } from "gatsby"

const RandomWord = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allIndexCsv {
          nodes {
            word
          }
        }
      }
    `
  )

  const node = data.allIndexCsv.nodes;
  const number = Math.floor( Math.random()*node.length );

  return (
    <div>
      <h2>今日の住職のありがたいお言葉</h2>
      <div>{ node[number].word }</div>
    </div>
  )
}

export default RandomWord;
