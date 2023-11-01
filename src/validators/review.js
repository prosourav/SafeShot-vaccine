
const { body, param, query } = require("express-validator");

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

const allreviewValidator = [
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
    .isIn(['createdAt', 'updatedAt', 'date', 'name', 'vaccine'])
    .withMessage('Invalid query parameter'),

  query("status")
    .optional()
    .isIn(['pending', 'approved', 'rejected'])
    .withMessage('Invalid query parameter'),

];


module.exports = {
  createValidator,
  findSingleItemValidator,
  allreviewValidator
}
