const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
