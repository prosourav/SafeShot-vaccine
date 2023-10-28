const User = require("../../model/User");
const { notFound, badRequest } = require("../../utils/error");
// getProfile and get single Item is same but for future changes it is different service
const getSingleItem = async ({ id }) => {
  if (!id) { throw badRequest() };
  const user = await User.findById(id);
  if (!user) { throw notFound() };
  return { id: user._id, ...user._doc, };
};
module.exports = getSingleItem;