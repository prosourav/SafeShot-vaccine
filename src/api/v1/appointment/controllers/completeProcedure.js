const appointmentService = require('../../../../lib/appointment');

const completeProcedure = async (req, res, next) => {
  const { appointmentId } = req.params;

  try {

    const result = await appointmentService.completeProcedure({ appointmentId });
    delete result._id;
    delete result.__v;

    const response = {
      message: 'Appointment completed successfully',
      data: { ...result },
    };


    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = completeProcedure;