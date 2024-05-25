const userService = require('../../../../lib/user');

const updateItem = async (req, res, next) => {
  // const { name, photo, passsword, email } = req.body;

  const { password, email, status } = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await userService.updateItem({ password, id, email, status });
    const responseData = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    }
    const response = {

      messege: "User updated successfully",
      data: responseData,
      links: {
        self: `/api/v1/user/${id}`,
        appointments: `/api/v1/appointments`
      },
    }


    res.status(200).json(response);
  } catch (error) {
    console.log("got error",error);
    next(error);
  }
};



module.exports = updateItem;