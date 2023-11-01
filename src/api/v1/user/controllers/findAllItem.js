const userService = require('../../../../lib/user');
const defaults = require('../../../../config/defaults');
const { getTransformedItems, getPagination, getHATEOASForAllItems } = require('../../../../utils/query');



const findAllItem = async (req, res, next) => {

  const page = +req.query.page || defaults.page;
  const limit = +req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  const filter = req.query.status;
  
  try {
    // data
    const users = await userService.findAllItem({
      page,
      limit,
      sortType,
      sortBy,
      search,
      filter,
    });
    // console.log('controller',users);
    const data = getTransformedItems({
      items: users,
      path: '/users',
      selection: ['id', 'name', 'link', 'createdAt', 'updatedAt', 'status', 'photo', 'role', 'email', 'vaccines',],
    });

    // pagination
    const totalItems = await userService.count({ search, filter });
    const pagination = getPagination({ totalItems, limit, page });

    // // HATEOAS Links
    const links = getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    res.status(200).json({
      message: 'Users fetched successfully',
      data,
      pagination,
      links,
    });
  } catch (e) {
    next(e);
  }
};


module.exports = findAllItem;