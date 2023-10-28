const userService = require('../../../../lib/user');

const updateItem = async (req, res, next) => {
  const { name, photo, passsword } = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await userService.updateItem({ name, photo, passsword, id });

    const response = {
      code: 200,
      messege: "User updated successfully",
      data: updatedUser,
      links: {
        self: `/user/${id}`,
        appointments: `/appointments`
      },
    }


    res.status(200).json(response);
  } catch (error) {
    console.log('here i suppose to be',);
    next(error);
  }
};



module.exports = updateItem;