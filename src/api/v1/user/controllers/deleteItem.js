const userService = require('../../../../lib/user');

const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await userService.deleteItem(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = deleteItem;