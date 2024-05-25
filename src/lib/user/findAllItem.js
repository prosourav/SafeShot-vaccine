const User = require("../../model/User");
const defaults = require("../../config/defaults");

const findAllItem = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  filter = defaults.status,
}) => {

  let filterSearch = { name: { $regex: search, $options: 'i' } };
  filterSearch = { email: { $regex: search, $options: 'i' } };

  if (filter) {
    filterSearch['status'] = filter;
  }
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;

  const users = await User.find(filterSearch)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit)

  return users.map((User) => ({
    ...User._doc,
    id: User._doc._id,
  }));
};

module.exports = findAllItem;