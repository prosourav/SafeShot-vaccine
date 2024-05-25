const Appointment = require("../../model/Appointment");

const itemExist = async ({ id }) => {
  if (!id) throw new Error('Id is required');

  const appointment = await Appointment.findById(id);
  return appointment ? true : false;
};

module.exports = itemExist;