require('dotenv').config();
const createHttpError = require("http-errors");
const mailTransporter = require('../../utils/transporter');


// setup smtp for mail sender
// const mailTransporter = (_req, _res, next) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       // host: 'makalamengineeringconstruction.com',
//       service: 'gmail',
//       auth: {
//         user: process.env.TRANSPORT_OWNER,
//         pass: process.env.TRANSPORT_OWNER_SECRET
//       }
//     });
//     return transporter;
//   } catch (err) {
//     console.log('error created in mailTransporter', err)

//     let error = new Error(err)
//     error.status = 400,
//       next(err)
//   }
// }


// Send Email with OTP for verify email
const sendEmailForCompleteVaccination = async ({ email, username, vaccine }) => {
  try {
    if (!email || !username || !vaccine) throw createHttpError.BadRequest('Bad Request!')
    const transporter = mailTransporter();
    const mailOptions = {
      from: 'safeshot@safeshot.com',
      to: email,
      subject: 'Vaccination Complete',
      html: `<strong>Dear ${username},</strong><br><p>
            <p>Your Vaccine Shot of ${vaccine} is Successfully completed on ${new Date()}.</p>
            <p>Thank you,</p>
            <p>The SafeShot Vaccination Team</p>`
    };
    await transporter.sendMail(mailOptions)
    return true;
  } catch (error) {
    console.log('Bad luck !', error);
    throw createHttpError.InternalServerError(error.message)
  }
}

module.exports = sendEmailForCompleteVaccination;
