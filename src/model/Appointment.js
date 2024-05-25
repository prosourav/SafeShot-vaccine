const { Schema, model } = require('mongoose');
const defaults = require('../config/defaults');

const appointmentSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    name: String,
    status: {
      type: String,
      enum: ['pending', 'complete'],
      default: 'pending',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    vaccine: {
      type: String,
      enum: defaults["vaccines"],
      required: true
    },
  },
  { timestamps: true }
);

const Appointment = model('Appointment', appointmentSchema);
module.exports = Appointment;