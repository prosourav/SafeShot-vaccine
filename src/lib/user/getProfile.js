const createHttpError = require("http-errors");
const User = require("../../model/User");

const getProfile = async ({ id }) => {
  if (!id) { throw createHttpError.BadRequest() };
  const user = await User.findById(id).populate({
    path: 'vaccines',
    select: 'name appointment updatedAt',
    // strictPopulate: false,
  });
  if (!user) { throw createHttpError.NotFound(); };
  return { id: user._id, ...user._doc, };
};
module.exports = getProfile;