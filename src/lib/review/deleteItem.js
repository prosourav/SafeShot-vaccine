const Review = require("../../model/Review");

const deleteItem = async (id) => {
  const review = await Review.findById(id);
  if (!review) {
    throw notFound();
  }

  // TODO:
  // Asynchronously Delete all associated comments

  return Review.findByIdAndDelete(id);
};

module.exports = deleteItem;