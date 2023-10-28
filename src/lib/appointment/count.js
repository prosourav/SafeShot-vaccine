const Appointment = require("../../model/Appointment");
const defaults = require("../../config/defaults");

const count = async ({
  filter,
  search = defaults.search,
}) => {
  let filterSearch = {};

  (!Object.keys(filter).length) ?
    filterSearch = { name: { $regex: search, $options: 'i' } } :
    filterSearch = { $and: [filter, { name: { $regex: search, $options: 'i' } }] }

  return Appointment.count(filterSearch)
};

module.exports = count;