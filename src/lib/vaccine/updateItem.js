const createHttpError = require("http-errors");
const getSingleItemByProperty = require("./getSingleItem");

const updateItem = async ({ name, status, appointmentId }) => {
  const vaccine = await getSingleItemByProperty({ name, status });
  if(!vaccine) {
    throw createHttpError.NotFound('Vaccine is not available in stock');
  }
  vaccine.appointment = appointmentId;
  vaccine.status = 'used';
  return await vaccine.save();
};

module.exports = updateItem;