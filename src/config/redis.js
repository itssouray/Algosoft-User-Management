const { createClient } = require('redis');
const env = require('./env');

// console.log(typeof env.redis.password);

const redisClient = createClient({
     socket: {
          host: env.redis.host,
          port: env.redis.port,
          tls: false,
     },
     username: 'default',
     password: env.redis.password,
});

redisClient.on('connect', () => {
     console.log('Redis connected');
});

redisClient.on('error', (err) => {
     console.error('Redis error:', err);
});

const connectRedis = async () => {
     try {
          if (!redisClient.isOpen) {
               await redisClient.connect();
          }
     } catch (err) {
          console.warn('Redis not connected. Rate limiting disabled.');
     }
};

module.exports = {
     redisClient,
     connectRedis,
};
