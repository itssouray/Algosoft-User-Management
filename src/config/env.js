const dotenv = require('dotenv');
dotenv.config();

// List of required environment variables
const requiredEnvVars = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
//   'ADMIN_EMAIL'
];


for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}


const env = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  adminEmail:process.env.ADMIN_EMAIL,
  redis: {  
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: String(process.env.REDIS_PASSWORD),
  },
};

module.exports = env;
