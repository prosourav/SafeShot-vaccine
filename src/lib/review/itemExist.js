const createHttpError = require("http-errors");
const Review = require("../../model/Review");

const itemExist = async ({ uId, apptId }) => {
  if (!uId || !apptId) { throw createHttpError.BadRequest('Invalid uId or appId') };
  const isExist = await Review.findOne({ user: uId, appointmentId: apptId });
  return isExist ? true : false;
};

module.exports = itemExist;