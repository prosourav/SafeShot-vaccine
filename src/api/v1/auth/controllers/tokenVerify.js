const { verifyToken } = require("../../../../lib/token");
const authService = require("../../../../lib/auth");


const verifyUserToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    const decoded = await verifyToken({ token, secret: process.env.ACCESS_TOKEN_SECRET });
    if (decoded) {
      const user = await authService.verifyUserToken({ token: token });
      user && res.status(200).json("Email verification successful ");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUserToken;