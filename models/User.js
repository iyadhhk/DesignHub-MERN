const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    region: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isonline: {
    type: Boolean,
    default: false,
  },
  workrequests: {
    type: [{ name: String, brief: String, id: String, projectId: String }],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = User = mongoose.model('user', UserSchema);
