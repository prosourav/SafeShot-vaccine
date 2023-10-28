const defaults = require('../../../../config/defaults');
const reviewService = require('../../../../lib/review');

const create = async (req, res, next) => {
  const { body, appointmentId, status = defaults.status } = req.body;

  try {

    let review = await reviewService.create({
      appointmentId,
      body,
      status,
      user: req.user,
    });

    delete review._id;

    const response = {
      code: 201,
      message: 'Review Created Successfully',
      data: { ...review },
      links: {
        self: `/reviews`,
        appointments: `/appointments`
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;