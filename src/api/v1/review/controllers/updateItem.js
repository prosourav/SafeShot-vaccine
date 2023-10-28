const reviewService = require('../../../../lib/review');

const updateItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const payload = req.body;
    if (req.user.role === 'user') {
      delete payload.status;
    }
    const review = await reviewService.updateItem(id, payload);
    delete review._id;
    const response = {
      code: 200,
      message: 'Reviews updated successfully',
      data: review,
      links: {
        self: `/reviewss/${id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;