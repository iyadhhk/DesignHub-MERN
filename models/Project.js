const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  projects: [
    {
      brief: {
        type: String,
        required: true,
      },
      badget: {
        type: String,
        required: true,
      },
      maxteam: {
        type: String,
        required: true,
      },
      members: {
        type: [{ id: String, name: String, confirm: Boolean }],
        default: [],
      },
      conclusive: {
        type: Boolean,
        default: false,
      },
    },
  ],
});
module.exports = Project = mongoose.model('project', ProjectSchema);
