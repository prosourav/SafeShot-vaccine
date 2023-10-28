const defaults = require("../../config/defaults");
const Vaccine = require("../../model/Vaccine");

const findAllItem = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {

  let filterSearch = { name: { $regex: search, $options: 'i' } };
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;

  const vaccines = await Vaccine.find(filterSearch)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit)


  return vaccines.map((Vaccine) => ({
    ...Vaccine._doc
  }));
};

module.exports = findAllItem;