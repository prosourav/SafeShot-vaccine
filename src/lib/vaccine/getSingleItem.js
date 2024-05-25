const createHttpError = require("http-errors");
const Vaccine = require("../../model/Vaccine");


const getSingleItemByProperty = async (data) => {
  const vaccine = await Vaccine.findOne(data);
  if (!vaccine) { throw createHttpError.NotFound('Please check availability') }
  return vaccine;
};

module.exports = getSingleItemByProperty;