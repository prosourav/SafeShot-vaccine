const User = require('../../model/User');

// dont want to expose this function
const findUserByProperty = async (property) => {
  const user = await User.findOne(property);
  return user ? user : false;
};

module.exports = findUserByProperty;