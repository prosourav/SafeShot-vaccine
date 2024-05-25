const { Schema, model } = require('mongoose');
const defaults = require('../config/defaults');

const vaccineSchema = new Schema(
  {
    name: {
      type: String,
      enum: defaults["vaccines"],
      required: [true, 'Name is required']
    },
    appointment: {
      type: Schema.ObjectId,
      ref: 'Appointment',
    },
    status: {
      type: String,
      enum: ['available', 'used'],
      default: 'available',
      required: true
    }
  },
  { timestamps: true }
);

const Vaccine = model('Vaccine', vaccineSchema);
module.exports = Vaccine;