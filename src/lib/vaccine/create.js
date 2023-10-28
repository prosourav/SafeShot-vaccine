const createHttpError = require("http-errors");
const Vaccine = require("../../model/Vaccine");

const create = async ({ name }) => {
  if(!name) throw createHttpError.BadRequest('Name is required');
  const vaccine = new Vaccine({name});
  return  await vaccine.save();
};

module.exports = create;