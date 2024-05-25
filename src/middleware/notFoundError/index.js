const createHttpError = require("http-errors");

const notFoundError = (_req, _res, next) => {
  next(createHttpError(404, "Resourse Doesn't Exist!"));
};

module.exports = notFoundError;