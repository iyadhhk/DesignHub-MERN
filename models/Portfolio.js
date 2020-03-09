const mongoose = require('mongoose');
const PortfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  work: [
    {
      type: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      preview: {
        type: String,
        required: true,
      },
      skills: {
        type: [String],
        required: true,
      },
    },
  ],
});
module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema);
