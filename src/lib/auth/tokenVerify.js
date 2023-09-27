const createHttpError = require("http-errors");
const { findUserByProperty, updateItem } = require("../user");

const verifyUserToken = async (property) => {
  const user = await findUserByProperty(property);
  if (user) {
    user && await updateItem({ id: user._id, status: 'approved' })
    return true;
  } else {
    throw createHttpError.BadRequest("Email verification failed, possibly the link is invalid or expired");
  }
};

module.exports = verifyUserToken;