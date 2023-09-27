const User = require('../../model/User');

// normal user register
const createUser = async ({ name, email, password, token }) => {

  const user = new User({ name, email, password, token });
  await user.save();

  return { ...user._doc, id: user.id };
};

module.exports = createUser;
