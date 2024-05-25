const userService = require('../../../../lib/user');

const changeAdmin = async (req, res, next) => {
  const { id } = req.params;

  try {
    let newAdmin = await userService.changeAdmin({ id, currentAdminId: req.user.id });
    newAdmin = newAdmin._doc;
    newAdmin.id = newAdmin._id;
    delete newAdmin._id;
    delete newAdmin.password;
    delete newAdmin.__v;
    delete newAdmin.status;
    delete newAdmin.vaccines;
    delete newAdmin.token;

    const response = {
      message: 'Admin updated successfully',
      data: { ...newAdmin },
      link: {
        self: `/api/v1/change_admin/${id}`,
        logout: '/api/v1/logout'
      }
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }

};
module.exports = changeAdmin;