const createHttpError = require("http-errors");
const User = require("../../model/User");

const updateProfile = async (id, { name, photo }) => {
  if (!id) { throw createHttpError.BadRequest() };
  if (!name && !photo) { throw createHttpError.BadRequest() };
  const user = await User.findById(id);
  if (!user) { throw createHttpError.NotFound("Request resource not found") };

  const payload = { name, photo };

  Object.keys(payload).forEach((key) => {
    user[key] = payload[key] ?? article[key];
  });

  await user.save();
  return { id: user.id, ...user._doc };
};
module.exports = updateProfile;