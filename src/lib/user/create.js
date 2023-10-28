const createHttpError = require('http-errors');
const { generateHash } = require('../../utils/hashing');
const  createUser  = require('./createUser');
const  itemExist  = require('./itemExist');

// create by admin
const create = async ({ name, email, password }) => {

  email = email.toLowerCase();

  const hasUser = await itemExist(email);

  if (hasUser) {
    throw createHttpError.Conflict('User already exist');
  }

  password = await generateHash(password);
  const user = await createUser({ name, email, password });
  delete user.password;
  delete user.token;
  delete user._id;
  return user;
};

module.exports = create;