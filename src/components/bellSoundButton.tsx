import React, { useRef } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const BellSoundButton = () => {
  const el = useRef(null)
  const handleClick = () => el.current.play()
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "orin.png" }) {
        childImageSharp {
          fixed(width: 43) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div>
      <span onClick={handleClick}>
        <Img fixed={data.file.childImageSharp.fixed} />
      </span>
      <audio ref={el}>
        <source src="/mp3/ding.mp3" type="audio/mp3" />
      </audio>
    </div>
  )
}

export default BellSoundButton;
