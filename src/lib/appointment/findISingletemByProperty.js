const Appointment = require("../../model/Appointment");

const findSingleItemByProperty = async ({date, user}) => {
  const appointment = await Appointment.findOne({ date, user });
  return appointment ? true : false;
};

module.exports = findSingleItemByProperty;