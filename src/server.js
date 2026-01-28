const app = require('./app');
const { env, connectDB } = require('./config');

const startServer = async () => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });
};

startServer();
