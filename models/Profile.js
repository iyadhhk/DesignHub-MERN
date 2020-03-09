const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  profilephoto: {
    type: String,
    default: 'default.jpg',
  },
  hourlyrate: {
    type: String,
    default: '15',
  },
  service: [
    {
      title: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      cost: {
        type: String,
        required: true,
      },
    },
  ],
  qualification: [
    {
      certificate: {
        type: String,
        required: true,
      },
      organization: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      startyear: {
        type: String,
        required: true,
      },
    },
  ],
  experience: [
    {
      position: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },

      startyear: {
        type: String,
        required: true,
      },
      endyear: {
        type: String,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      country: {
        type: String,
        required: true,
      },
      college: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      startyear: {
        type: String,
        required: true,
      },
      endyear: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);
