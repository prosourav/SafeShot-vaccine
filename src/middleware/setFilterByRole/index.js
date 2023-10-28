const { authorizationError } = require("../../utils/error");

const setFilterByRole = (req, _res, next) => {
  const { user } = req;
  if (user.role === 'admin' || user.role === 'doctor') {
    req.filter = {};
    next();
  } else if (user.role === 'user') {
    req.filter = { user: user.id };
    next();
  } else {
    next(authorizationError());
  }
};

module.exports = setFilterByRole;