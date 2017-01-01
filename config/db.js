import { isDev, isTest, isProd } from './server';

const devDB = 'mongodb://localhost:27017/nerm-db-dev';
const testDB = 'mongodb://localhost:27017/nerm-db-test';
const prodDB = 'mongodb://localhost:27017/nerm-db-prod';
const config = {
  mongoURL: isDev ? devDB : isTest ? testDB : isProd ? prodDB : process.env.MONGO_URL,
  port: isDev ? 8000 : isTest ? 8080 : isProd ? 8000 : process.env.PORT,
};

export default config;
