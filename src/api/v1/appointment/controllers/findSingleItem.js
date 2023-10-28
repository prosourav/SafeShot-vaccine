const appointmentService = require('../../../../lib/appointment');

const findSingleItem = async (req, res, next) => {
  const id = req.params.id;
  const expand = req.query.expand || '';

  try {

    const appointemnt = await appointmentService.findSingleItem({ id, expand });
    delete appointemnt._id;
    const response = {
      data: appointemnt,
      links: {
        self: `/appointments/${appointemnt.id}`,
        appointemnts: '/appointmtments'
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = findSingleItem;