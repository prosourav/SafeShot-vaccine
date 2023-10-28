const appointmentService = require('../../../../lib/appointment');

const availability = async (_req, res, next) => {

  try {

    const availableDates = await appointmentService.availability();

    const response = {
      message: 'Available dates fetched successfully',
      data: availableDates,
      links: {
        self: `api/v1/availability`,
        login: `api/v1/auth/login`
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = availability;