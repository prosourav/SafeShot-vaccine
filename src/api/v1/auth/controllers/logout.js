require('dotenv').config();
const authService = require('../../../../lib/auth/index');


const logout = async (req, res, next) => {
  const { id } = req.query;
  try {
    await authService.logout({ id });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

module.exports = logout;