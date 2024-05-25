const register = require('./register');
const login = require('./login');
const verifyUserToken = require('./tokenVerify');
const refresh = require('./refresh');
const logout = require('./logout');

module.exports = {
  register,
  login,
  verifyUserToken,
  refresh,
  logout
};