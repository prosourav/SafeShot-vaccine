const createHttpError = require("http-errors");
const appointmentService = require('../../lib/appointment');
const reviewService = require('../../lib/review');

const ownership =
  (model = '') =>
    async (req, _res, next) => {
      let isOwner = false;
      switch (model) {
        case 'Appointment':
          isOwner = await appointmentService.checkOwnership({
            resourceId: req.params.id,
            userId: req.user.id,
          });
          if (isOwner || req.user.role === 'admin') {
            return next();
          }
          return next(createHttpError.Forbidden());
        case 'Review':
          isOwner = await reviewService.checkOwnership({
            resourceId: req.params.id,
            userId: req.user.id,
          });
          if (isOwner) {
            return next();
          }
          return next(createHttpError.Forbidden());
        default:
          return next(createHttpError.Forbidden())
        // handle other cases or throw an error
      }
    };

module.exports = ownership;