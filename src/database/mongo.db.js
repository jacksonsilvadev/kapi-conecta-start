require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../utils/logger');

const uri = process.env.MONGO_URL;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    logger.info('Connected on MongoDB.');
  })
  .catch((err) => logger.error(err));

module.exports = mongoose.connection;
