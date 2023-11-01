const createHttpError = require("http-errors");
const Vaccine = require("../../model/Vaccine");

const create = async ({ name }) => {
  if(!name) throw createHttpError.BadRequest('Name is required');
  const vaccine = new Vaccine({name});
   await vaccine.save();
   return vaccine._doc;
};

module.exports = create;