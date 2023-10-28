const Appointment = require("../../model/Appointment");


const findItemByUserId = async (user) => {
  // console.log('...', user)
  const appointment = await Appointment.find(user);
  // console.log('...', appointment.length);
  return appointment ? appointment : false;
};

module.exports = findItemByUserId;