const { body, query, param } = require("express-validator");
const defaults = require("../config/defaults");

const allappointmentsValidator = [
  query("page")
    .optional()
    .isInt({ gt: 0, lt: 12000 })
    .withMessage('Invalid query parameter'),

    query("limit")
    .optional()
    .isInt({ gt: 0, lt: 12000 })
    .withMessage('Invalid query parameter'),

  query("sort_type")
    .optional()
    .isIn(['asc', 'dsc'])
    .withMessage('Invalid query parameter'),

   query("sort_by")
     .optional()
     .isIn(['createdAt', 'updatedAt','date','name', 'vaccine'])
    .withMessage('Invalid query parameter'),
  
  query("status")
    .optional()
    .isIn(['pending','complete'])
    .withMessage('Invalid query parameter')
];

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
    body('vaccine')
      .optional()
      .isIn(defaults.vaccines)
      .withMessage('Invalid parameters'),
    body('status')
      .optional()
      .isIn(['pending', 'complete'])
      .withMessage('Invalid query parameter'),  
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
  completeAppointmentValidator,
  allappointmentsValidator
}
