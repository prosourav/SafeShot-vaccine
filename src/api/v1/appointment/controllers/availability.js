const appointmentService = require('../../../../lib/appointment');

const availability = async (_req, res, next) => {

  try {

    let availableDates = await appointmentService.availability();

    const response = {
      code: 200,
      message: 'Available Dates Fetched Successfully',
      data: availableDates,
      links: {
        self: `/availability`,
        login: `/login`
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = availability;