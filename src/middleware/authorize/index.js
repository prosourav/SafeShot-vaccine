
const createHttpError = require('http-errors');

const authorize =
  (roles = ['admin']) =>
    (req, _res, next) => {
      if (roles.includes(req.user.role)) {
        return next();
      }
      return next(createHttpError.Forbidden());
    };

module.exports = authorize;
