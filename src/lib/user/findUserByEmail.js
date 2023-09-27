const User = require('../../model/User');

// dont want to expose this function
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? user : false;
};

module.exports = findUserByEmail;