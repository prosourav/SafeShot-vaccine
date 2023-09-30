const register = require('./register');
const verifyUserToken = require('./tokenVerify');
const login = require('./login');
const refresh = require('./refresh');
const logout = require('./logout');

module.exports = {
  register,
  verifyUserToken,
  login,
  refresh,
  logout
};