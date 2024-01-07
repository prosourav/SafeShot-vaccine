const { body, query, param } = require("express-validator");


// Sign Request Body Validator
const registerRequestValidator = [
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
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .toLowerCase()
    .isEmail().withMessage('Invalid email'),


  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
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
    .withMessage('Token is required')
    .bail()
    .trim()
    .escape()
    .isString().withMessage('Invalid token')
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

  body('refreshToken')
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
