const userService = require('../../../../lib/user');

const updateProfile = async (req, res, next) => {
  const id = req.user.id;
  try {
    const profile = await userService.updateProfile(id, req.body);
    delete profile._id;
    delete profile.password;

    const response = {
      code: 200,
      message: "Profile data updated successfully",
      data: profile,
      links: {
        self: `/user/profile`,
        appointments: `/appointments/${id}`
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
module.exports = updateProfile;