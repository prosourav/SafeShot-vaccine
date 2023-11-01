const reviewService = require('../../../../lib/review');
const defaults = require('../../../../config/defaults');
const { getTransformedItems, getPagination, getHATEOASForAllItems } = require('../../../../utils/query');



const findAllItems = async (req, res, next) => {
  const page = +req.query.page || defaults.page;
  const limit = +req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const status = req.query.status || defaults.reviewFilter;
  const expands = req.query.expand ?? defaults.expand;
  try {
    // data
    const reviews = await reviewService.findAllItem({
      page,
      limit,
      sortType,
      sortBy,
      status,
      expands,
    });
    
    // const data = getTransformedItems({
    //   items: reviews,
    //   path: '/reviews',
    //   selection: ['_id', 'body','status', 'link', 'user', 'appointmentId', 'createdAt', 'updatedAt'],
    // });
    // console.log(data);
    const totalItems = await reviewService.count({ status });
    const pagination = getPagination({ totalItems, limit, page });

    // HATEOAS Links
    const links = getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    // for (let item of data) {
    //   item.vaccine = item.appointmentId.vaccine;
    //   item.username = item.user.name;
    //   item.comment = item.body;
    //   delete item.body;
    // };


    res.status(200).json({
      message: 'Reviews fetched successfully',
      reviews,
      pagination,
      links,
    });
  } catch (e) {
    next(e);
  }
};


module.exports = findAllItems;