require('dotenv').config();
const { addDays } = require('date-fns');
const authService = require('../../../../lib/auth/index');
const RefreshToken = require('../../../../model/RefreshToken');
const { generateToken } = require('../../../../lib/token');
const createHttpError = require('http-errors');

const refresh = async (req, res, next) => {
  const { id, token } = req.body;
  // console.log({ name, email, password });

  try {
    const data = await authService.refresh({ id, token, issuedIp: req.clientIp });

    // response
    const response = {
      message: 'Signup successful',
      data: data,
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

module.exports = refresh;