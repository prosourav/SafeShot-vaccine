const vaccineService = require('../../../../lib/vaccine');

const create = async (req, res, next) => {
  const { name } = req.body;

  try {

    let newVaccine = await vaccineService.create({
      name,
    });
    newVaccine.id = newVaccine._id;
    delete newVaccine._id;
    delete newVaccine.__v;
    delete newVaccine.status;


    const response = {
      message: 'Vaccine added successfully',
      data: { ...newVaccine },
      links: {
        self: `/api/v1/vaccines`,
        users:'/api/v1/users',
        reviews: '/api/v1/reviews'
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;