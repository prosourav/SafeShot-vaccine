const defaults = require('../../../../config/defaults');
const reviewService = require('../../../../lib/review');

const create = async (req, res, next) => {
  const { body, appointmentId, status = defaults.status } = req.body;

  try {

    let review = await reviewService.create({
      appointmentId,
      comment: body,
      status,
      user: req.user,
    });

    delete review._id;
    delete review.__v;

    const response = {
      message: 'Review Created Successfully',
      data: { ...review },
      links: {
        self: `/api/v1/reviews`,
        appointments: `/api/v1/appointments`
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;