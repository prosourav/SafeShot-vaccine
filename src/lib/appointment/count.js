const Appointment = require("../../model/Appointment");
const defaults = require("../../config/defaults");

const count = async ({
  filter,
  search = defaults.search,
  status = defaults.status
}) => {
  let filterSearch = {};


  (!Object.keys(filter).length) ?
    filterSearch = { name: { $regex: search, $options: 'i' } } :
    filterSearch = { $and: [filter, { name: { $regex: search, $options: 'i' } }] }

  if (status) {
    if (!filterSearch.$and) {
      filterSearch.$and = [];
    }
    filterSearch.$and.push({ status: status });
  };

  return Appointment.count(filterSearch)
};

module.exports = count;