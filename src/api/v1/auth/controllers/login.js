require('dotenv').config();
const { addDays } = require('date-fns');
const authService = require('../../../../lib/auth/index');
const RefreshToken = require('../../../../model/RefreshToken');
const { generateToken } = require('../../../../lib/token');
const createHttpError = require('http-errors');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log({ name, email, password });

  try {
    const user = await authService.login({ email, password, issuedIp: req.clientIp });

    // response
    const response = {
      message: 'Signin successful',
      data: user,
      links: {
        self: req.url,
        appointments: '/api/v1/appointments',
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = login;