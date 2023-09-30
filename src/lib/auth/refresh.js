const {  findUserByProperty } = require('../user');
const { generateHash } = require('../../utils/hashing');
const createHttpError = require('http-errors');
const { sendEmailForRegistrationTokenVerify } = require('../email/verify');
const RefreshToken = require('../../model/RefreshToken');
const { generateToken } = require('../token');
const { addDays } = require('date-fns');

const refresh = async ({ id, token, issuedIp }) => {

  const user = await findUserByProperty({_id: id});

  if (!user) {
    throw createHttpError.NotFound();
  };

  const userToken = await RefreshToken.findOne({token});
  if(!userToken) throw createHttpError.NotFound('User does not exist!');
  if (userToken.user.toString() === id && userToken.isActive){
    // generate access token
    const payloadAccess = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const payloadRefresh = {
      id: userToken.id,
      user: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessTokenGen = generateToken({
      payload: payloadAccess, secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '10m'
    });
    const refreshTokenGen = generateToken({
      payload: payloadRefresh, secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '30d'
    });

    userToken.token = refreshTokenGen;
    userToken.expiredAt= addDays(new Date(), 30);
    userToken.issuedIp = issuedIp ?? 'N/A'
    await userToken.save();

    return {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      token: { accessToken: accessTokenGen, refresToken: refreshTokenGen }
    };

  }

  throw createHttpError.BadRequest();

};

module.exports = refresh;