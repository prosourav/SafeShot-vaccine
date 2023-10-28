const createHttpError = require("http-errors");
const Review = require("../../model/Review");


const checkOwnership = async ({ resourceId, userId }) => {
  const review = await Review.findById(resourceId);
  if (!review) { throw createHttpError.NotFound() }

  if (review._doc.user.toString() === userId.toString()) {
    return true;
  }
  return false;
};

module.exports = checkOwnership;