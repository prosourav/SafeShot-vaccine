const userService = require('../../../../lib/user');

const changeAdmin = async (req, res, next) => {
  const { id } = req.params;

  try {
    let newAdmin = await userService.changeAdmin({ id, currentAdminId: req.user.id });
    newAdmin = newAdmin._doc;
    newAdmin.id = newAdmin._id;
    delete newAdmin._id;
    delete newAdmin.password;

    const response = {
      code: 200,
      message: 'Successfuly updated admin',
      data: { ...newAdmin },
      link: {
        self: `./change_admin/${id}`,
        appointments: '/appointments',
        users: '/users'
      }
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }

};
module.exports = changeAdmin;