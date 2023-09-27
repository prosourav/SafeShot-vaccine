require('dotenv').config();
const { addDays } = require('date-fns');
const authService = require('../../../../lib/auth/index');
const RefreshToken = require('../../../../model/RefreshToken');
const { generateToken } = require('../../../../lib/token');

const login = async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log({ name, email, password });

  try {
    const user = await authService.login({ name, email, password });

    const refreshToken = new RefreshToken({
      user: user._id,
      issuedIp: req.clientIp ?? 'N/A',
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
      expiresIn: '10m'
    });
    const refreshTokenGen = generateToken({
      payload: payloadRefresh, secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '30d'
    });

    refreshToken.token = refreshTokenGen;
    // console.log('*', refreshToken);
    // console.log('**', accessTokenGen);
    await refreshToken.save();

    // response
    const response = {
      message: 'Signup successful',
      data: {
        token: { accessToken: accessTokenGen, refreshToken: refreshTokenGen },
      },
      links: {
        self: req.url,
        login: '/auth/login',
      },
    };

    // res.status(201).json(response);
    res.status(201).json(response);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

module.exports = login;