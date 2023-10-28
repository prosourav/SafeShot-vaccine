require('dotenv').config();
const createHttpError = require('http-errors');
// const { addDays } = require('date-fns');
const authService = require('../../../../lib/auth/index');
// const RefreshToken = require('../../../../model/RefreshToken');
const { generateToken } = require('../../../../lib/token');
// const { sendEmailForEmailVerify } = require('../../../../lib/email/verify');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log({ name, email, password });

  try {

    // generate access token
    const payloadAccess = { name, email };

    const accessTokenGen = generateToken({ payload: payloadAccess, secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '10m' });

    await authService.register({ name, email, password, token: accessTokenGen });
  
    // response
    const response = {
      message: 'Please check your inbox to complete the verification',
      links: {
        self: req.url,
        login: 'api/v1/auth/login',
      },
    };
    res.status(201).json(response);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

module.exports = register;