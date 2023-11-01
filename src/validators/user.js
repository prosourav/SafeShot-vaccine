const { body, param, query } = require("express-validator");


const adminChangeValidator = [
  param('id')
    .notEmpty()
    .isString().withMessage('Invalid appointment id')
    .escape(),
];

const createValidator = [
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('User name is required')
    .bail()
    .matches(/^[A-Za-z]+ [A-Za-z]+$/)
    .withMessage('Username must be a valid text format')
    .bail()
    .matches(/\s+/)
    .withMessage('User name must have one space between first and last name')
    .bail()
    .isLength({ min: 4, max: 18 })
    .withMessage('Username must be between 4-10 charecters'),

  body('email')
    .toLowerCase()
    .isEmail().withMessage('Email must be an valid'),


  body('password')
    .trim()
    .isLength({ min: 6, max: 12 })
    .withMessage('Password must be between 5-12 charecters')
    .bail()
    // .isStrongPassword()
    // .withMessage('Password must be strong')
];

const alluserValidator = [
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
    .isIn(['pending', 'approved', 'blocked'])
    .withMessage('Invalid query parameter'),

  query("search")
    .optional()
    .notEmpty()
    .isString().withMessage('Invalid search parameter'),
];

const findSingleItemValidator =[
  param('id')
    .notEmpty()
    .isString().withMessage('Invalid appointment id')
    .escape(),
];



module.exports = { adminChangeValidator, createValidator, findSingleItemValidator, alluserValidator };