import React, { useRef } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from 'styled-components'
import stick from "../contents/images/orinbou_1.gif"
import stickTaped from "../contents/images/orinbou_2.gif"

const Stick = styled.div`
  width: 43px;
  cursor: url('${stick}') 10 30, auto;
  &:active {
    cursor: url('${stickTaped}') 10 20, auto;
  }
`

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
    <Stick>
      <span onMouseDown={handleClick}>
        <Img fixed={data.file.childImageSharp.fixed} />
      </span>
      <audio ref={el}>
        <source src="/mp3/ding.mp3" type="audio/mp3" />
      </audio>
    </Stick>
  )
}

export default BellSoundButton;
