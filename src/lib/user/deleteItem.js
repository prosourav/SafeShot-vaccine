const User = require("../../model/User");

const deleteItem = async (id) => {
  const appointemnt = await User.findById(id);
  if (!appointemnt) {
    throw notFound();
  }
  return User.findByIdAndDelete(id);
};

module.exports = deleteItem;