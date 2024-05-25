const vaccineService = require('../../../../lib/vaccine');
const defaults = require('../../../../config/defaults');
const query = require('../../../../utils/query');

const findAllItems = async (req, res, next) => {

  const page = +req.query.page || defaults.page;
  const limit = +req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const filter = req.query.name || defaults.fiilter;
  const status = req.query.status || defaults.status;
  try {

    const vaccines = await vaccineService.findAllItem({
      filter,
      page,
      limit,
      sortType,
      sortBy,
      status
    });


    const data = query.getTransformedItems({
      items: vaccines,
      path: '/vaccines',
      selection: ['_id', 'name', 'link', 'createdAt', 'status'],
    });


    // pagination
    const totalItems = await vaccineService.count({ filter, status });
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

    // delete data.__v;

    res.status(200).json({
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