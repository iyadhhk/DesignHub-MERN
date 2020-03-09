const mongoose = require('mongoose');
const StoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  product: [
    {
      preview: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      tags: {
        type: [String],
        required: true,
      },
    },
  ],
});
module.exports = Store = mongoose.model('store', StoreSchema);
