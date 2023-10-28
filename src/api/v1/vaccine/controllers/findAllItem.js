const vaccineService = require('../../../../lib/vaccine');
const defaults = require('../../../../config/defaults');
const query = require('../../../../utils/query');

const findAllItems = async (req, res, next) => {

  const page = +req.query.page || defaults.page;
  const limit = +req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  const { filter } = req;

  try {

    // data
    const vaccines = await vaccineService.findAllItem({
      filter,
      page,
      limit,
      sortType,
      sortBy,
      search
    });

    const data = query.getTransformedItems({
      items: vaccines,
      path: '/appointments',
      selection: ['_id', 'name', 'vaccine', 'link', 'date', 'createdAt'],
    });

    // pagination
    const totalItems = await vaccineService.count({ filter, search });
    const pagination = query.getPagination({ totalItems, limit, page });

    // HATEOAS Links
    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    res.status(200).json({
      code: 200,
      message: 'Appointments fetched successfully',
      data,
      pagination,
      links,
    });
  } catch (e) {
    next(e);
  }
};


module.exports = findAllItems;