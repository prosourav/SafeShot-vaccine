const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      minLength: 5,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    photo: String,
    status: {
      type: String,
      enum: ['approved', 'blocked', 'pending'],
      default: 'pending',
    },
    vaccines: [{ type: Schema.ObjectId, ref: 'Vaccine' }],
    token: {
      type: String,
      default: null,
    }
  },
  { timestamps: true },

);

const User = model('User', userSchema);
module.exports = User;