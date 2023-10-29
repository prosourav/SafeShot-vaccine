const createHttpError = require("http-errors");
const Review = require("../../model/Review");
const appointmentService = require("../appointment");
const itemExist = require("./itemExist");


const create = async ({ appointmentId, body, user, status }) => {

  if (!appointmentId || !body || !user) {
    const error = new Error('Invalid parameters');
    error.status = 400;
    throw error;
  }
  const appointment = await appointmentService.findSingleItem({ id: appointmentId });

  if (!appointment) {
    const error = new Error('Invalid record');
    error.status = 404;
    throw error;
  };
  if (appointment.user.toString() !== user._id.toString()) {
    const error = new Error('Invalid record');
    error.status = 404;
    throw error;
  };

  if (appointment.status !== 'complete') {  throw  createHttpError('Vaccine is not completed!')};
  const isReviewed = await itemExist({apptId: appointmentId,uId: user.id});
  if(isReviewed) { throw createHttpError.BadRequest('Review Exist!'); };

  const review = await new Review({
    appointmentId, body, user: user._id, status
  });

  await review.save();
  return {
    id: review.id,
    ...review._doc,
  };
};

module.exports = create;