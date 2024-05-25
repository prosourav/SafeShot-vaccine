const Review = require("../../model/Review");
const defaults = require("../../config/defaults");

const count = async ({
  status = defaults.status,
  perMissionFilter={},
}) => {
  let filterSearch = {};

  (!Object.keys(perMissionFilter).length) ?
    filterSearch = { $and: [perMissionFilter, { status: { $regex: status, $options: 'i' } }] } : '';

  return Review.count(filterSearch)
};

module.exports = count;