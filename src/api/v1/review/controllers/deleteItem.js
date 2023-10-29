const reviewService = require('../../../../lib/review');

const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await reviewService.deleteItem(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = deleteItem;