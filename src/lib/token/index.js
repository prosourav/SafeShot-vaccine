require('dotenv').config();
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

const generateToken = ({
  payload,
  algorithm = 'HS256',
  secret = process.env.ACCESS_TOKEN_SECRET,
  expiresIn = '30m',
}) => {
  try {
    return jwt.sign(payload, secret, {
      algorithm,
      expiresIn,
    });
  } catch (e) {
    console.log('[JWT]', e);
    throw createHttpError.InternalServerError();
  }
};

const decodeToken = ({ token, algorithm = 'HS256' }) => {
  try {
    return jwt.decode(token, { algorithms: [algorithm] });
  } catch (e) {
    console.log('[JWT]', e);
    throw createHttpError.InternalServerError();
  }
};

const verifyToken = ({
  token,
  algorithm = 'HS256',
  secret = process.env.ACCESS_TOKEN_SECRET,
}) => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (e) {
    console.log('[JWT]', e);
    throw createHttpError.InternalServerError();
  }
};

module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
};