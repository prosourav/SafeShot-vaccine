const defaults = require("../../config/defaults");
const Review = require("../../model/Review");

const findAllItem = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  status = defaults.reviewFilter,
  expands = defaults.expands,
}) => {

  const expandsValues = expands.split(",");

  let filterSearch = {};
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
  
  // (!Object.keys(perMissionFilter).length) ?
  //   filterSearch = { name: { $regex: filter, $options: 'i' } } :
  //   filterSearch = { $and: [perMissionFilter, { status: { $regex: status, $options: 'i' } }] };
  // console.log('hello ..!', filterSearch);

  const reviews = await Review.find({ status })
    .populate(expandsValues.includes('user') && { path: 'user', select: 'name email', })
    .populate(expandsValues.includes('appointment') && { path: 'appointmentId', select: 'vaccine' })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return reviews.map((review) => ({
    ...review._doc,
    id: review.id,
  }));
};

module.exports = findAllItem;