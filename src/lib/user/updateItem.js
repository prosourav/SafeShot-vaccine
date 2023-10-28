const createHttpError = require("http-errors");
const User = require("../../model/User");

const updateItem = async ({ name, photo, vaccines, passsword, id, token = null, status }) => {
  if (!id) { throw createHttpError.BadRequest('id is required'); }
  const user = await User.findById(id);
  console.log(`User: ${user}`);

  if (passsword) {
    password = await generateHash(passsword);
  };

  user.name = name ?? user.name;
  user.photo = photo ?? user.photo;
  user.status = status ?? user.status;
  user.token = token || null;
  vaccines && user.vaccines.push(vaccines);
  user.passsword = passsword ?? user.passsword;


  await user.save();

  return { ...user._doc, id: user.id }

};

module.exports = updateItem;