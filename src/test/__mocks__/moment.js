// // We give the arg a default of 0 so that if requesting the current date/time moment(), it uses a fixed value (which happens to be 0)
// // If a value is passed in, the real moment() is called with that value
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
};