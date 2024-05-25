const { authorizationError } = require("../../utils/error");
const appointmentService = require("../../lib/appointment");
const reviewService = require("../../lib/review");
const mongoose = require("mongoose");
const createHttpError = require("http-errors");

const hasPermission =
  (model = "") =>
  async (req, _res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(createHttpError.BadRequest("Invalid id"))
    };
  

    if (model === "Appointment") {
      // console.log("id", typeof req.params.id);
      const isOwner = await appointmentService.checkOwnership({
        resourceId: req.params.id,
        userId: req.user.id,
      });
      if (isOwner || req.user.role === "doctor" || req.user.role === "admin") {
        return next();
      }
      return next(authorizationError());
    }

    if (model === "Review") {
      const isOwner = await reviewService.checkOwnership({
        resourceId: req.params.id,
        userId: req.user.id,
      });
      if (isOwner || req.user.role === "doctor" || req.user.role === "admin") {
        return next();
      }
      return next(authorizationError());
    }
  };

module.exports = hasPermission;
