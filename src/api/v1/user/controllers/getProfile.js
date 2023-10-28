const userService = require('../../../../lib/user');

const getProfile = async (req, res, next) => {
  const id = req.user.id;
  try {
    const profile = await userService.getProfile({ id });
    delete profile._id;
    delete profile.password;

    const response = {
      code: 200,
      message: "Profile data fetched successfully",
      data: profile,
      links: {
        self: `/user/profile`,
        appointments: `/appointments/${id}`
      },
    };

    res.status(200).json(response);
  } catch (e) {
    console.log('something wrong', e);
    next(e);
  }
};
module.exports = getProfile;