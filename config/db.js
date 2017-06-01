import { isDev, isTest } from './server';

const devDB = 'mongodb://localhost:27017/pb-db-dev';
const testDB = 'mongodb://localhost:27017/pb-db-test';
const prodDB = 'mongodb://localhost:27017/pb-db-prod';

export const mongoURI = process.env.MONGODB_URI || (isDev ? devDB : isTest ? testDB : prodDB);
