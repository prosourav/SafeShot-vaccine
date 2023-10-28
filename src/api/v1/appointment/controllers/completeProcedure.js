const appointmentService = require('../../../../lib/appointment');

const completeProcedure = async (req, res, next) => {
  const { appointmentId } = req.params;
  // const {userId} = req.query;
  // console.log(`Appointment ${appointmentId} and user ${userId}`);
  try {

    const result = await appointmentService.completeProcedure({ appointmentId });
    const response = {
      code: 200,
      data: { ...result },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = completeProcedure;