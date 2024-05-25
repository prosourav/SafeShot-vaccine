const authValidator = require("./auth.js");
const appointmentValidator = require("./appointment.js");
const vaccinevalidator = require("./vaccine"); 
const userValidator = require("./user.js");
const reviewValidator = require("./review.js");

module.exports = {
  authValidator,
  appointmentValidator,
  vaccinevalidator,
  userValidator,
  reviewValidator
};