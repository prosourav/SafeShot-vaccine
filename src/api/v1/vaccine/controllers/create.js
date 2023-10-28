const vaccineService = require('../../../../lib/vaccine');

const create = async (req, res, next) => {
  const { name } = req.body;

  try {

    let newVaccine = await vaccineService.create({
      name,
    });

    delete newVaccine._id;

    const response = {
      code: 201,
      message: 'Vaccine added successfully',
      data: { ...newVaccine },
      links: {
        self: `/vaccines`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;