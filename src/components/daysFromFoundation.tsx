import * as React from 'react'

const START_TIME = new Date('2020-10-24').getTime()
const CURRENT_TIME = Date.now()
const TIME_DIFF = CURRENT_TIME - START_TIME
const DaysFromFoundation = () => (
  <div>{Math.floor(TIME_DIFF / (1000 * 60 * 60 * 24))}</div>
)

export default DaysFromFoundation
