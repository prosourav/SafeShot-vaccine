const appointmentService = require('../../../../lib/appointment');

const availability = async (_req, res, next) => {

  try {

    let appointments = await appointmentService.availability();

    // console.log(appointments);

    // const response = {
    //   code: 201,
    //   message: 'Appointment Created Successfully',
    // data: { ...appointment },
    //   links: {
    //     self: `/appointments`,
    //     reviews: `/reviews/${appointment.vaccine}`
    //   },
    // };

    res.status(200).json(appointments);
  } catch (e) {
    next(e);
  }
};

module.exports = availability;