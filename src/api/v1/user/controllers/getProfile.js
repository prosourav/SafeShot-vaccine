const userService = require('../../../../lib/user');

const getProfile = async (req, res, next) => {
  const id = req.user.id;
  try {
    const profile = await userService.getProfile({ id });
    delete profile._id;
    delete profile.password;
    delete profile.token;
    delete profile.__v;


    const response = {
      message: "Profile data fetched successfully",
      data: profile,
      links: {
        self: `/api/v1/user/profile`,
        appointments: `/api/v1/appointments/`
      },
    };

    res.status(200).json(response);
  } catch (e) {
    console.log('something wrong', e);
    next(e);
  }
};
module.exports = getProfile;