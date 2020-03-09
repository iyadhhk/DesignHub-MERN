const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const config = require('config');
const db = config.get('mongoURI');
// to connect to mongodb this function use promises
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit proces with failure
    process.exit(1);
  }
};
module.exports = connectDB;
