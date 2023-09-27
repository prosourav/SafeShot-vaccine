require('dotenv').config();
const { addDays } = require('date-fns');
const authService = require('../../../../lib/auth/index');
const RefreshToken = require('../../../../model/RefreshToken');
const { generateToken } = require('../../../../lib/token');
const { sendEmailForEmailVerify } = require('../../../../lib/email/verify');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log({ name, email, password });

  try {

    // generate access token
    const payloadAccess = {
      name: name,
      email: email,
    };

    const accessTokenGen = generateToken({
      payload: payloadAccess, secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '10m'
    });

    const user = await authService.register({ name, email, password, token: accessTokenGen });
    const resp = await sendEmailForEmailVerify(user.email, user.name, user.id, accessTokenGen);

    // response
    const response = {
      message: 'Please check your mail inbox to complete the verification',
      data: `Email sent: ${resp}`,
      links: {
        self: req.url,
        login: '/auth/login',
      },
    };
    res.status(201).json(response);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

module.exports = register;