const defaults = require("../../config/defaults");
const Review = require("../../model/Review");

const findAllItem = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  status = defaults.status,
  expands = defaults.expands,
}) => {
  const expandsValues = expands.length && expands.split(",");
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;

  const populateOptions = [{ path: 'appointmentId', select: 'vaccine date status' }, { path: 'user', select: 'name email' }];

  const reviews = await Review.find({ status })
    .populate(populateOptions)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

    console.log('Review: ',reviews);

// TODO: Refactor this using a function
  if (!expandsValues) {
    return reviews.map((review) => ({
      id: review._doc._id,
      userName: review._doc.user.name,
      vaccine: review._doc.appointmentId.vaccine,
      status: review._doc.status,
      comment: review._doc.body,
      createdAt: review._doc.createdAt,
      updatedAt: review._doc.updatedAt,
      link: '/reviews/_doc._id'
    }));

  } else if (expandsValues.length == 1 && expandsValues.includes('appointment')) {
    return reviews.map((review) => ({
      id: review._doc._id,
      userName: review._doc.user.name,
      vaccine: review._doc.appointmentId.vaccine,
      status: review._doc.status,
      comment: review._doc.body,
      createdAt: review._doc.createdAt,
      updatedAt: review._doc.updatedAt,
      link: '/reviews/_doc._id',
      appointment: review._doc.appointmentId
    }));
  } else if (expandsValues.length == 1 && expandsValues.includes('user')) {
    return reviews.map((review) => ({
      id: review._doc._id,
      userName: review._doc.user.name,
      vaccine: review._doc.appointmentId.vaccine,
      status: review._doc.status,
      comment: review._doc.body,
      createdAt: review._doc.createdAt,
      updatedAt: review._doc.updatedAt,
      link: '/reviews/_doc._id',
      user: review._doc.user
    }));
  } else {
    return reviews.map((review) => ({
      id: review._doc._id,
      userName: review._doc.user.name,
      vaccine: review._doc.appointmentId.vaccine,
      status: review._doc.status,
      comment: review._doc.body,
      createdAt: review._doc.createdAt,
      updatedAt: review._doc.updatedAt,
      link: '/reviews/_doc._id',
      user: review._doc.user,
      appointment: review._doc.appointmentId
    }))
  }
};
module.exports = findAllItem;