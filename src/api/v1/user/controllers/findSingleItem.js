const userService = require('../../../../lib/user');

const findSingleItem = async (req, res, next) => {
  const id = req.params.id;
  try {
    const profile = await userService.findSingleItem({ id });
    delete profile._id;
    delete profile.password;
    delete profile.token
    delete profile.__v

    const response = {
      message: "User data fetched successfully",
      data: profile,
      links: {
        self: `api/v1/users/${id}`,
        appointments: `/api/v1/appointments/${id}`
      },
    };

    res.status(200).json(response);
  } catch (e) {
    console.log('something wrong', e);
    next(e);
  }
};
module.exports = findSingleItem;