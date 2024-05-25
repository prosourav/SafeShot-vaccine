
const findSingleItem = require("./findSingleItem");
const createHttpError = require("http-errors");
const updateItem = require("./updateItem");
const vaccineService = require('../vaccine');
const userService = require('../user');
const { sendEmailForCompleteVaccination } = require("../email");

const completeProcedure = async ({ appointmentId }) => {
  if (!appointmentId) { throw createHttpError.BadRequest('Invalid appointment') };

  const appointment = await findSingleItem({ id: appointmentId });
  if (!appointment) { throw createHttpError.NotFound('Not found') };
  if (appointment.status === 'complete') { throw createHttpError.Conflict('Appointment already complete') }

  const updatedVaccine = await vaccineService.updateItem({ name: appointment.vaccine, status: 'available', appointmentId: appointment._id });
  if (!updatedVaccine) { throw createHttpError.InternalServerError() };
  
  // update appointment status
  await updateItem(appointmentId, { status: 'complete' });

  const user = await userService.updateItem({ id: appointment.user, vaccines: updatedVaccine._id });

  await sendEmailForCompleteVaccination({ email: user.email, username: user.name, vaccine: appointment.vaccine });

  return appointment;

};

module.exports = completeProcedure;