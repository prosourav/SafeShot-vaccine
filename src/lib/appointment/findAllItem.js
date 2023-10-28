const Appointment = require("../../model/Appointment");
const defaults = require("../../config/defaults");

const findAllItem = async ({
  filter,
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  status = defaults.status
}) => {

  let filterSearch = {};
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;

  (!Object.keys(filter).length) ?
    filterSearch = { $and: [{ name: { $regex: search, $options: 'i' } }, { status }] } :
    filterSearch = { $and: [filter, { name: { $regex: search, $options: 'i' } }] }
  
  const appoinments = await Appointment.find(filterSearch)
    .populate({ path: 'user', select: 'name email', })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
 
  return appoinments.map((appointment) => ({
    ...appointment._doc,
    id: appointment._id,
  }));
};

module.exports = findAllItem;