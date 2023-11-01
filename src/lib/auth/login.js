const createHttpError = require('http-errors');
const { badRequest } = require('../../utils/error');
const { hashMatched } = require('../../utils/hashing');
const { generateToken } = require('../token');
const { findUserByEmail } = require('../user');
const RefreshToken = require('../../model/RefreshToken');
const { addDays } = require('date-fns');

const login = async ({ email, password, issuedIp }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw createHttpError.NotFound('Requested resource not found')
  }

  const matched = await hashMatched(password, user.password);
  if (!matched) {
    throw createHttpError.Unauthorized('Invalid credentials')
  }

  const refreshToken = new RefreshToken({
    user: user._id,
    issuedIp: issuedIp ?? 'N/A',
    token: '',
    expiredAt: addDays(new Date(), 30),
  })
  // generate access token
  const payloadAccess = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const payloadRefresh = {
    id: refreshToken._id,
    user: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessTokenGen = generateToken({
    payload: payloadAccess, secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: '60m'
  });
  const refreshTokenGen = generateToken({
    payload: payloadRefresh, secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: '30d'
  });

  refreshToken.token = refreshTokenGen;
  const savedRefreshToken = await refreshToken.save();

  if (!accessTokenGen || !savedRefreshToken) {
    throw createHttpError.InternalServerError();
  }

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
    token: { accessToken: accessTokenGen, refresToken: refreshTokenGen }
  };

};

module.exports = login;