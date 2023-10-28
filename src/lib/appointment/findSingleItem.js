const Appointment = require("../../model/Appointment");
const { notFound } = require("../../utils/error");

const findSingleItem = async ({ id, expand = '' }) => {
  if (!id) throw new Error('Id is required');

  expand = expand.split(',').map((item) => item.trim());

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw notFound();
  }

  if (expand.includes('user')) {
    await appointment.populate({
      path: 'user',
      select: 'name email',
      strictPopulate: false,
    });
  }

  return {
    id: appointment.id,
    ...appointment._doc,
  };
};

module.exports = findSingleItem;