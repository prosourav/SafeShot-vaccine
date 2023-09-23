// const { isFuture } = require("date-fns");
const { format, addDays, isEqual } = require('date-fns');
const Appointment = require('../../model/Appointment');

const availability = async () => {
  // //this week all dates 
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(new Date(), i);
    dates.push(format(date, "yyyy-MM-dd"));
  };

  // let today = new Date();
  // today = format(today, "yyyy-MM-dd");

  // let sevenDaysLater = addDays(new Date(), 6);
  // sevenDaysLater = format(sevenDaysLater, "yyyy-MM-dd");

  const data = await Appointment.find({
    date: {
      $gte: dates[0],
      $lte: dates[dates.length - 1]
    },
    status: 'pending'
  });

  const dateObj = data.reduce((acc, cur) => {
    // const key = cur.date.toISOString().split("T")[0];
    const key = format(cur.date, "yyyy-MM-dd");

    // Check if the key exists in the accumulator object
    if (!(key in acc)) {
      acc[key] = [cur];
    } else {
      acc[key].push(cur);
    }
    return acc;
  }, {});

  console.log(dateObj)

  // Object.keys(dateObj).forEach(item => {
  //   // console.log('len: ' + dateObj[item].length);
  //   if (dateObj[item].length > 2) {

  //   }
  // });

  return {
    ...appointments
  };
};

module.exports = availability;