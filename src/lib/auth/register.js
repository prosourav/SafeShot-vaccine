require('dotenv').config();
const { itemExist, createUser } = require('../user');
const { generateHash } = require('../../utils/hashing');
const createHttpError = require('http-errors');
const { sendEmailForRegistrationTokenVerify } = require('../email');
const { generateToken } = require('../token');

const register = async ({ name, email, password }) => {
  const hasUser = await itemExist(email);
  if (hasUser) {
    throw createHttpError[409]('User already exists');
  }

  // generate access token
  const payloadAccess = { name, email };

  const token = generateToken({ payload: payloadAccess, secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '10m' });

  password = await generateHash(password);

  const user = await createUser({ name, email, password, token });

  if (!user) {
    throw createHttpError.InternalServerError();
  }
  sendEmailForRegistrationTokenVerify(user.email, user.name, user.id, token);
  return true

};

module.exports = register;