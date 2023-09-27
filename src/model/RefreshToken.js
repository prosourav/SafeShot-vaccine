const { Schema, model } = require('mongoose');
const { isAfter } = require('date-fns');

const refreshTokenSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  issuedIp: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  replaceByToken: String,
  expiredAt: {
    type: Date,
    required: true
  },
  revokedAt: {
    type: Date,
  },
  revokedIp: String,
}, { timestamps: true });

refreshTokenSchema.virtual('isExpired').get(function () {
  return isAfter(new Date(), new Date(this.expiredAt));
});

refreshTokenSchema.virtual('isActive').get(function () {
  return !this.isExpired && !this.revokedAt;
});

refreshTokenSchema.set('toJSON', { virtuals: true, versionKey: false });

const RefreshToken = model('RefreshToken', refreshTokenSchema);
module.exports = RefreshToken;