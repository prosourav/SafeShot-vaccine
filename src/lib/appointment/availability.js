// const { isFuture } = require("date-fns");
const { format, addDays } = require('date-fns');
const Appointment = require('../../model/Appointment');

const availability = async () => {

  //this week's all dates 
  let dates = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(new Date(), i);
    dates.push(format(date, "yyyy-MM-dd"));
  };

  // getting all appointments of this week
  const data = await Appointment.find({
    date: {
      $gte: dates[0],
      $lte: dates[dates.length - 1]
    },
    status: 'pending'
  });

//convertting array to obj for convenience 
  const dateObj = data.reduce((acc, cur) => {
    const key = cur.date.toISOString().split("T")[0];
    if (!(key in acc)) {
      acc[key] = [cur];
    } else {
      acc[key].push(cur);
    }
    return acc;
  }, {});

  //creating final available dates  
  Object.keys(dateObj).forEach(item => {
    if (dateObj[item].length > 3) {
      dates = dates.filter(date => date !== item);
    }
  });

  return dates;
};

module.exports = availability;