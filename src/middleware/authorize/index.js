
const createHttpError = require('http-errors');
const permissions = require('../../config/permissions');
module.exports = function (req, _res, next) {
  const { method, url: route, user } = req;
  if (permissions[user.role].includes({ method, route })) {
    next();
  } else {
    return next(createHttpError.Unauthorized('Access Denied: You dont have correct privilege to perform this operation'));
  }
}
