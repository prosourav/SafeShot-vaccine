const User = require("../../model/User");
const { notFound, badRequest } = require("../../utils/error");

const getAdmin = async () => {
  const user = await User.findOne({role:'admin'});
  if (!user) { throw notFound() };
  return user;
};
module.exports = getAdmin;