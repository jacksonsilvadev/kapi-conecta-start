const redis = require('redis');
const logger = require('../utils/logger');
const { promisifyAll } = require('bluebird');

promisifyAll(redis.RedisClient.prototype);

class RedisClient {
  startRedis() {
    return new Promise((resolve, reject) => {
      this.client = redis.createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      });

      this.client.on('error', (err) => reject(err));

      this.client.on('ready', async () => {
        logger.info('Connected on Redis');
        return resolve(this.client);
      });
    });
  }

  set(key, value) {
    return this.client.setAsync(key, Buffer.from(JSON.stringify(value)));
  }

  get(key) {
    return this.client.getAsync(key);
  }

  del(key) {
    return this.client.delAsync(key);
  }

}

module.exports = new RedisClient();
