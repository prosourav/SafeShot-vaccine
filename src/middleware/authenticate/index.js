const createHttpError = require('http-errors');
const { verifyToken } = require('../../lib/token');
const userService = require('../../lib/user');

const authenticate = async (req, _res, next) => {

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = verifyToken({ token });
    const user = await userService.findUserByEmail(decoded.email);

    if (!user) {
      next(createHttpError(401, "Authentication Failed"));
    }

    if (user.status !== 'approved') {
      next(createHttpError(401,`Your account is ${user.status}`));
    }

    req.user = { ...user._doc, id: user.id };
    next();
  } catch (error) {
    // we should not show default error to client
    next(createHttpError(401, "Authentication Failed"));
  }
};

module.exports = authenticate;