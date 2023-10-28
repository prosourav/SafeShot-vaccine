require('dotenv').config();
const nodemailer = require("nodemailer");
const createHttpError = require("http-errors");

const mailTransporter = (_req, _res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: 'makalamengineeringconstruction.com',
      service: 'gmail',
      auth: {
        user: process.env.TRANSPORT_OWNER,
        pass: process.env.TRANSPORT_OWNER_SECRET
      }
    });
    return transporter;
  } catch (err) {
    console.log('error created in mailTransporter', err)
    next(createHttpError.BadRequest());
  }
};

module.exports = mailTransporter;