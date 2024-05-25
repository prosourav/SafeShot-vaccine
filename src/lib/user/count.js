const User = require("../../model/User");
const defaults = require("../../config/defaults");

const count = async ({
  search = defaults.search,
  status = defaults.status,
}) => {

  // let filterSearch = { $and: [search, { status: { $regex: status, $options: 'i' } }] };
  let filterSearch = { name: { $regex: search, $options: 'i' } };
  if(status){
    filterSearch.status = status;
  }
  return await User.count(filterSearch)
};

module.exports = count;