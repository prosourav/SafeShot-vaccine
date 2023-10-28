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
const sendEmailForRegistrationTokenVerify = async (email, username, userId, token) => {
  try {
    if (!email || !username || !userId || !token) throw createHttpError.BadRequest('Bad Request!')
    const transporter = mailTransporter();
    const mailOptions = {
      from: 'safeshot@safeshot.com',
      to: email,
      subject: 'Complete Registration',
      html: `<strong>Dear ${username},</strong><br><p>
      You registered an account on safeshot.com. Before being able to use your account, you need to verify that this is your email address by clicking here</br> </br>
            <a href='${process.env.CLIENT_APPLICATION_URL}/${token}' style="color: #008CBA;">
                Click Me to Verify Your Self
            </a>    
            </p>
            <p>This Link is valid for the next 5 minutes. If you didn't request this password reset, please ignore this email.</p>
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

module.exports = sendEmailForRegistrationTokenVerify;
