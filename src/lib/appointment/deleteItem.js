const createHttpError = require("http-errors");
const Appointment = require("../../model/Appointment");

const deleteItem = async (id) => {
  const appointemnt = await Appointment.findById(id);
  console.log("Appointment:",id,appointemnt);
  if (!appointemnt) {throw createHttpError.NotFound()}
  if(appointemnt.status==='complete') {throw createHttpError.Conflict('Completed appointment can`t be deleted')}

  // TODO:
  // Asynchronously Delete all associated comments

  return Appointment.findByIdAndDelete(id);
};

module.exports = deleteItem;