const createHttpError = require('http-errors');
const User = require('../../model/User');

const changeAdmin = async ({ id, currentAdminId }) => {
  const newAdmin = await User.findById(id);
  const prevAdmin = await User.findById(currentAdminId);
  if (!newAdmin) { throw createHttpError.NotFound() };
  newAdmin.role = 'admin';
  prevAdmin.role = 'user';

  await newAdmin.save();
  await prevAdmin.save();
  return { ...newAdmin };
};

module.exports = changeAdmin;