const { body, query, param } = require("express-validator");


// Sign Request Body Validator
const registerRequestValidator = [
  body('name')
    .trim()
    .isAlphanumeric()
    .withMessage('Username must be a valid text format')
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
    .isStrongPassword()
    .withMessage('Password must be strong')
];

const verifyTokenRequestValidator = [
  param('token')
    .notEmpty()
    .isString().withMessage('Invalid token')
    .escape(),
];

const loginRequestValidator = [

  body('email')
    .toLowerCase()
    .isEmail().withMessage('Email must be an valid'),


  body('password')
    .trim()
    .isLength({ min: 6, max: 12 })
    .withMessage('Password must be between 5-12 charecters')
    .bail()
    .isStrongPassword()
    .withMessage('Password must be strong')
];

const refreshRequestValidator = [
  body('id')
    .notEmpty()
    .isString().withMessage('Invalid user'),

  body('token')
    .notEmpty()
    .isString().withMessage('Invalid token'),
];

const logoutRequestValidator = [
  query('id')
    .notEmpty()
    .isString().withMessage('Invalid user, Id should be int')
    .escape(),
];

module.exports = {
  registerRequestValidator,
  loginRequestValidator,
  refreshRequestValidator,
  logoutRequestValidator,
  verifyTokenRequestValidator
}
