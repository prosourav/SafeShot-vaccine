const User = require("../../model/User");

const updateItem = async ({ name, photo, vaccines, passsword, id, token = null, status }) => {
  if (!id) { throw new Error('id is required'); }
  const user = await User.findById(id);

  if (passsword) {
    password = await generateHash(passsword);
  };

  user.name = name ?? user.name;
  user.photo = photo ?? user.photo;
  user.status = status ?? user.status;
  user.token = token || null;
  user.vaccines.push(vaccines);
  user.passsword = passsword ?? user.passsword;

  await user.save();

  return { ...user._doc, id: user.id }

};

module.exports = updateItem;