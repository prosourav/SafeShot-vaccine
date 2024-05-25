const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    appointmentId: {
      type: Schema.ObjectId,
      ref: 'Appointment',
      required: true
    },
    body: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },

  },
  { timestamps: true }
);

const Review = model('Review', reviewSchema);
module.exports = Review;