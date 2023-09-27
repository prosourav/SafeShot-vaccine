const findUserByEmail = require("./findUserByEmail");

const itemExist = async (email) => {
  console.log('called');
  const user = await findUserByEmail(email);
  return user ? true : false;
};

module.exports = itemExist;