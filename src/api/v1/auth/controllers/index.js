const register = require('./register');
const login = require('./login');
const verifyUserToken = require('./tokenVerify');

module.exports = {
  register,
  login,
  verifyUserToken
};