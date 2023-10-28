const userService = require('../../../../lib/user');

const create = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await userService.create({ name, email, password });

    const response = {
      code: 200,
      messege: "User updated successfully",
      data: user,
      links: {
        self: `/user/${user._id}`,
        appointments: `/appointments`
      },
    }


    res.status(200).json(response);
  } catch (error) {
    console.log('here i suppose to be',);
    next(error);
  }
};



module.exports = create;