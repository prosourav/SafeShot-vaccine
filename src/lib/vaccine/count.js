const defaults = require("../../config/defaults");
const Vaccine = require("../../model/Vaccine");

const count = async ({
  filter = defaults.filter,
  status = defaults.status
}) => {

  let filterSearch = {};
  if (filter) {
    filterSearch.name = { $regex: filter, $options: 'i' };
  }
  if (status) {
    filterSearch.status = { $regex: status, $options: 'i' };
  }
  return await Vaccine.count(filterSearch)
};

module.exports = count;