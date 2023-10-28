const { body, query, param } = require("express-validator");
const defaults = require("../config/defaults");


// create appointment Request Body Validator
const appointmentCreateValidator = [
  body('vaccine')
    .isIn(defaults.vaccines)
    .withMessage('Invalid parameters'),

  body('date')
    .isString().withMessage('Invalid date')
];

// get/patch/delete specific appointment
  const appointmentSpecificValidator = [
    param('id')
      .notEmpty()
      .isString().withMessage('Invalid appointment id')
      .escape(),
];

const completeAppointmentValidator = [
  param('appointmentId')
    .notEmpty()
    .isString().withMessage('Invalid appointment id')
    .escape(),
];

module.exports = {
  appointmentCreateValidator,
  appointmentSpecificValidator,
  completeAppointmentValidator
}
