const createHttpError = require('http-errors');
const { verifyToken } = require('../../lib/token');
const userService = require('../../lib/user');

const authenticate = async (req, _res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken({ token });


    console.log('decoded token: ' + JSON.stringify(decoded, null, 2));

    const user = await userService.findUserByEmail(decoded.email);
   
    if (!user) {
 
      next(createHttpError.Unauthorized("Authentication Failed"));
    }

    if (user.status !== 'approved') {
      next(createHttpError.Unauthorized(`Your account is ${user.status}`));
    }

    req.user = { ...user._doc, id: user.id };
    next();
  } catch (error) {
    // we should not show default error to client
    next(createHttpError.Unauthorized("Authentication Failed"));
  }
};

module.exports = authenticate;