const createHttpError = require("http-errors");
const Appointment = require("../../model/Appointment");
const availability = require("./availability");

const updateItem = async (id, { vaccine, date, status }) => {
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw createHttpError.NotFound();
  }

  const payload = { vaccine, date };

  if (status) {
    payload.status = status;
  }

  if (!status) {
    const availabilableDates = await availability();

    if (!availabilableDates.includes(payload.date)) {
      throw createHttpError.NotFound("No available slots on this date!");
    }
  }

  Object.keys(payload).forEach((key) => {
    appointment[key] = payload[key] ?? appointment[key];
  });

  await appointment.save();
  return { id: appointment.id, ...appointment._doc };
};

module.exports = updateItem;
