const { body, param } = require("express-validator");


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

const findSingleItemValidator =[
  param('id')
    .notEmpty()
    .isString().withMessage('Invalid appointment id')
    .escape(),
];

module.exports = { adminChangeValidator, createValidator, findSingleItemValidator };