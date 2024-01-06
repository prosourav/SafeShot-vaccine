const authService = require('../../../../lib/auth/index');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {

    await authService.register({ name, email, password });

    // response
    const response = {
      message: 'Please check your inbox to complete the verification',
      links: {
        self: req.url,
        login: 'api/v1/auth/login',
      },
    };
    res.status(201).json(response);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

module.exports = register;