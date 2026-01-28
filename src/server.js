const app = require('./app');
const { connectRedis } = require('./config/redis');
const { env, connectDB } = require('./config');

const startServer = async () => {
  await connectDB();
 await connectRedis();
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();
