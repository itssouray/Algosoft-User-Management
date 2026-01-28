const { redisClient } = require('../../config/redis');


const rateLimiter = ({ limit, windowSeconds }) => {
     return async (req, res, next) => {
          try {
               if (!redisClient.isOpen) return next();

               const ip = req.ip;
               const key = `rate_limit:${ip}`;

               const count = await redisClient.incr(key);

               if (count === 1) {
                    await redisClient.expire(key, windowSeconds);
               }

               if (count > limit) {
                    const ttl = await redisClient.ttl(key);

                    return res.status(429).json({
                         message: 'Too many requests. Please try again later.',
                         retryAfter: ttl,
                    });
               }

               next();
          } catch (err) {
               next(err);
          }
     };
};

module.exports = rateLimiter;
