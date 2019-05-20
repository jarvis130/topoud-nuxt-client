const config = require('../../api.config.js').redis
const redis = require('redis'),
    client = redis.createClient(config)
require('bluebird').promisifyAll(redis.RedisClient.prototype)
module.exports = client
