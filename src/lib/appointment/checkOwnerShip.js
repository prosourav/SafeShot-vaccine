const createHttpError = require("http-errors");
const Appointment = require("../../model/Appointment");

const checkOwnership = async ({ resourceId, userId }) => {
  const appointment = await Appointment.findById(resourceId);
  if (!appointment) { return false;}

  if (appointment._doc.user.toString() === userId.toString()) {
    return true;
  }
  return false;
};

module.exports = checkOwnership;