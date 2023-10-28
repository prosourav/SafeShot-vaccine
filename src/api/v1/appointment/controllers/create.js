const appointmentService = require('../../../../lib/appointment');

const create = async (req, res, next) => {
  const { vaccine, date } = req.body;

  try {

    let appointment = await appointmentService.create({
      vaccine,
      date,
      user: req.user,
    });

    delete appointment._id;
    delete appointment.user;
    delete appointment.updatedAt;
    delete appointment.updatedAt;
    delete appointment.__v;

    const response = {
      message: 'Appointment Created Successfully',
      data: { ...appointment },
      links: {
        self: `/api/v1/appointments`,
        reviews: `/api/v1/reviews/${appointment.vaccine}`
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;