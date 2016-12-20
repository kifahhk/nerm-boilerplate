const config = {
  mongoURL: 'mongodb://localhost:27017/nerm-db' || process.env.MONGO_URL,
  port: process.env.PORT || 8000,
};

export default config;
