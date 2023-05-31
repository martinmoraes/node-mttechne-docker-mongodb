require('dotenv').config();
const { connectMongo } = require('./connect_mongodb');
const { init } = require('./express');
const { logger } = require('./logger');

(async () => {
  try {
    // wait for the db connection to start the server
    await connectMongo();
    // start the server
    init();
  } catch (error) {
    logger.error(error);
  }
})();
