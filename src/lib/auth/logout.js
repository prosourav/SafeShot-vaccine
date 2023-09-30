const createHttpError = require("http-errors");
const { findUserByProperty } = require("../user");
const RefreshToken = require("../../model/RefreshToken");

const logout = async ({ id }) => {

  const user = await findUserByProperty({ _id: id });
  if (!user) {
    throw createHttpError.BadRequest();
  }
  return await RefreshToken.deleteOne({ user: id });
};

module.exports = logout;
