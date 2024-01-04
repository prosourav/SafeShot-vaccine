const { itemExist, createUser } = require('../user');
const { generateHash } = require('../../utils/hashing');
const createHttpError = require('http-errors');
const { sendEmailForRegistrationTokenVerify } = require('../email');

const register = async ({ name, email, password, token }) => {
  const hasUser = await itemExist(email);
  if (hasUser) {
    throw createHttpError[409]('User already exists');
  }

  password = await generateHash(password);
  const user = await createUser({ name, email, password, token });

  if (!user) {
    throw createHttpError.InternalServerError();
  }
 sendEmailForRegistrationTokenVerify(user.email, user.name, user.id, token);
 return true

};

module.exports = register;