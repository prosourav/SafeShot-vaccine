const userService = require('../../../../lib/user');

const findSingleItem = async (req, res, next) => {
  const id = req.params.id;
  try {
    const profile = await userService.findSingleItem({ id });
    delete profile._id;
    delete profile.password;

    const response = {
      code: 200,
      message: "User data fetched successfully",
      data: profile,
      links: {
        self: `/users/${id}`,
        appointments: `/appointments/${id}`
      },
    };

    res.status(200).json(response);
  } catch (e) {
    console.log('something wrong', e);
    next(e);
  }
};
module.exports = findSingleItem;