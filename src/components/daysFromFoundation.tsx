const START_TIME = new Date('2020-10-24').getTime();
const CURRENT_TIME = Date.now();
const TIME_DIFF = CURRENT_TIME - START_TIME;
const DAYS_FROM_FOUNDATION = Math.floor(TIME_DIFF / (1000 * 60 * 60 * 24));

export default DAYS_FROM_FOUNDATION;
