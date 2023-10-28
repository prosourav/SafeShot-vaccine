
const { body, param } = require("express-validator");

const createValidator = [
  body('body')
    .notEmpty()
    .isString().withMessage('Invalid appointment id'),

  body('appointmentId')
    .notEmpty()
    .isString().withMessage('Invalid appointment id')

];

const findSingleItemValidator = [
  param('id')
    .notEmpty()
    .isString().withMessage('Invalid user, Id should be int')
    .escape(),
];

module.exports = {
  createValidator,
  findSingleItemValidator
}
