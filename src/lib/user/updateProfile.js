const createHttpError = require("http-errors");
const User = require("../../model/User");

const updateProfile = async (id, { name, photo, email }) => {


  if (!id) { throw createHttpError.BadRequest() };
  if (!name && !photo && !email) {
     throw createHttpError.BadRequest() 
    };
  const user = await User.findById(id);

  if (!user) { throw createHttpError.NotFound("Request resource not found") };

  const payload = { name, photo, email };

  Object.keys(payload).forEach((key) => {
    user[key] = payload[key] ?? user[key];
  });

  await user.save();
  return { id: user.id, ...user._doc };
};
module.exports = updateProfile;