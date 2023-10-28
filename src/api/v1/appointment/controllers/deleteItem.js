const appointmentService = require('../../../../lib/appointment');

const deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    await appointmentService.deleteItem(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = deleteItem;