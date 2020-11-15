import * as React from 'react'
import styled from 'styled-components'
import moment from 'moment'

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
  const foundationDay = '2020-11-14'
  const startTime = moment(foundationDay)
  const currentTime = moment().add(1, 'day')
  const timeDiff = currentTime.diff(startTime)
  const daysFromStr = String(Math.floor(timeDiff / (1000 * 60 * 60 * 24)))

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
