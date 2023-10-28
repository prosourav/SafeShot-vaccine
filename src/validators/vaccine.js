const { body } = require("express-validator");
const defaults = require("../config/defaults");


const vaccineAddRequestValidator = [
  body('name')
    .isIn(defaults.vaccines)
    .withMessage('Invalid parameters'),
];


module.exports = {
  vaccineAddRequestValidator
}
