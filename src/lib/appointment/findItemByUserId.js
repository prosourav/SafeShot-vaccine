const Appointment = require("../../model/Appointment");


const findItemByUserId = async (user) => {
  const appointment = await Appointment.find(user);
  return appointment ? appointment : false;
};

module.exports = findItemByUserId;