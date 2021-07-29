const http = require('http');
require('./src/database/mongo.db');
const redisClient = require('./src/helpers/redis');
const logger = require('./src/utils/logger');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
require('dotenv').config();

server.listen(PORT, () => {
  redisClient.startRedis();
  logger.info(`🚀 Application running on port: ${PORT}!`);
});
