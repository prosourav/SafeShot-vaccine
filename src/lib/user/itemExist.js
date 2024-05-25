const findUserByEmail = require("./findUserByEmail");

const itemExist = async (email) => {
  const user = await findUserByEmail(email);
  return user ? true : false;
};

module.exports = itemExist;