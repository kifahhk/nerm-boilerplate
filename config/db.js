import { isDev, isTest, isProd } from './server';

const devDB = 'mongodb://localhost:27017/nerm-db-dev';
const testDB = 'mongodb://localhost:27017/nerm-db-test';
const prodDB = 'mongodb://localhost:27017/nerm-db-prod';
const config = {
  mongoURL: process.env.MONGO_URL || isDev ? devDB : isTest ? testDB : prodDB,
  port: process.env.PORT || isDev ? 8000 : isTest ? 8080 : 8000,
};

export default config;
