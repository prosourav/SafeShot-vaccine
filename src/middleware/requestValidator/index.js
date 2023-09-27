const { validationResult } = require("express-validator");


// Express validation error formatter for 400 error
const requestValidator = (req, res, next) => {
  try {
    const errors = validationResult(req).formatWith((error) => {
      return {
        field: error.path,
        message: error.msg
      }
    })
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Bad Request!',
        errors: errors.array(),
      })
    }
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = { requestValidator };