const { body, query,  } = require("express-validator");
const defaults = require("../config/defaults");



const vaccineAddRequestValidator = [
  body('name')
    .isIn(defaults.vaccines)
    .withMessage('Invalid parameters'),
];

const allvaccineValidator = [
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
    .isIn(['used', 'available'])
    .withMessage('Invalid query parameter'),

  query("name")
    .optional()
    .isIn(['Viral', 'Covid', 'Pneumonia'])
    .withMessage('Invalid query parameter')
];


module.exports = {
  vaccineAddRequestValidator, allvaccineValidator
}
