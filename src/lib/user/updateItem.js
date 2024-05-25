const createHttpError = require("http-errors");
const User = require("../../model/User");
const { generateHash } = require("../../utils/hashing");

const updateItem = async ({ name, photo, email, vaccines, password, id, token = null, status }) => {
  if (!id) { throw createHttpError.BadRequest('id is required'); }
  const user = await User.findById(id);

  console.log("passsword", password);

  if (password) {
    password = await generateHash(password);
  };

  user.name = name ?? user.name;
  user.photo = photo ?? user.photo;
  user.status = status ?? user.status;
  user.email = email ?? user.email;
  user.token = token || null;
  vaccines && user.vaccines.push(vaccines);
  user.password = password ?? user.password;


  await user.save();

  return { ...user._doc, id: user.id }

};

module.exports = updateItem;