const appointmentService = require('../../../../lib/appointment');

const updateItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const payload = req.body;
    if (req.user.role === 'user') {
      delete payload.status;
    }
    const appointment = await appointmentService.updateItem(id, payload);
    delete appointment._id;
    delete appointment.__v;
    const response = {
      code: 200,
      message: 'Appointment updated successfully',
      data: appointment,
      links: {
        self: `/appointments/${appointment.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;