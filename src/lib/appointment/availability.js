// const { isFuture } = require("date-fns");
const { format, addDays, isWeekend } = require("date-fns");
const Appointment = require("../../model/Appointment");

const availability = async () => {
  //this week's all dates
  let dates = [];
  for (let i = 0; dates.length < 7; i++) {
    const date = addDays(new Date(), i);
    if (!isWeekend(date)) {
      dates.push(format(date, "yyyy-MM-dd"));
    }
  }

  // console.log(dates);

  // getting all appointments of this week
  const data = await Appointment.find({
    date: {
      $gte: dates[0],
      $lte: dates[dates.length - 1],
    },
    status: "pending",
  });

  // console.log(data);

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

  // console.log(dateObj);

  //creating final available dates
  Object.keys(dateObj).forEach((item) => {
    if (dateObj[item].length > 3) {
      dates = dates.filter((date) => date !== item);
    }
  });

  return dates;
};

module.exports = availability;
