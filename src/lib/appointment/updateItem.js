const createHttpError = require("http-errors");
const Appointment = require("../../model/Appointment");

const updateItem = async (id, { vaccine, date, status }) => {

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw createHttpError.NotFound();
  }

  const payload = { vaccine, date };

  if (status) {
    payload.status = status;
  }

  Object.keys(payload).forEach((key) => {
    appointment[key] = payload[key] ?? appointment[key];
  });

  await appointment.save();
  return { id: appointment.id, ...appointment._doc };
};

module.exports = updateItem;