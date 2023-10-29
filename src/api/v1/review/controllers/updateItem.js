const reviewService = require('../../../../lib/review');

const updateItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const payload = req.body;
    if (req.user.role === 'user') {
      delete payload.status;
    }
    const review = await reviewService.updateItem(id, payload);
    review.comment = review.body;
    delete review._id;
    delete review.__v;
    delete review.body;
    const response = {
      message: 'Reviews updated successfully',
      data: review,
      links: {
        self: `/api/v1/reviewss/${id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;