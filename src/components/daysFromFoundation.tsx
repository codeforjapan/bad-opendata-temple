import * as React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  font-size: 30px;
`;

const NumberText = styled.span`
  color: #ebff00;
  background-color: #000000;
  padding: 2px 4px;
  margin: 0 2px;
  box-sizing: border-box;
`;

const DaysFromFoundation = () => {
  const START_TIME = new Date('2020-10-24').getTime()
  const CURRENT_TIME = Date.now()
  const TIME_DIFF = CURRENT_TIME - START_TIME
  const daysFromStr = String(Math.floor(TIME_DIFF / (1000 * 60 * 60 * 24)))

  return (
    <Content>
      建立から
      {[...daysFromStr].map((str, index) => {
        return <NumberText key={str + String(index)}>{str}</NumberText>;
      })}
      日目です
    </Content>
  )
}

export default DaysFromFoundation
