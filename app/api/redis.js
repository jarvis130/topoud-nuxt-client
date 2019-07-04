const config =
    process.env.NODE_ENV === 'produnction'
        ? require('../../api.config.prod.js').redis
        : require('../../api.config.test.js').redis
const redis = require('redis'),
    client = redis.createClient(config)
require('bluebird').promisifyAll(redis.RedisClient.prototype)
module.exports = client
