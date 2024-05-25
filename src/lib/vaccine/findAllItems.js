const defaults = require("../../config/defaults");
const Vaccine = require("../../model/Vaccine");

const findAllItem = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  filter = defaults.filter,
  status = defaults.status,
}) => {

  let filterSearch = [];
  if (filter && status) {
    filterSearch = { $and: [{ name: { $regex: filter, $options: 'i' } },{ status: { $regex: status, $options: 'i' } }] };
  } else {
    filterSearch = {
      $and: [
        filter ? { name: { $regex: filter, $options: 'i' } } : {},
        status ? { status: { $regex: status, $options: 'i' } } : {},
      ],
    };
  }
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