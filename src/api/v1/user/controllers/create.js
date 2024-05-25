const userService = require('../../../../lib/user');

const create = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await userService.create({ name, email, password, status: 'approved' });
    const data = {id:user.id, name:user.name, email:user.email};

    const response = {
      messege: "User created successfully",
      data: data,
      links: {
        self: `/api/v1/users`,
        appointments: `/api/v1/vaccines`
      },
    }


    res.status(200).json(response);
  } catch (error) {
    console.log('error',);
    next(error);
  }
};



module.exports = create;