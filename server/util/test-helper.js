import mongoose from 'mongoose';
import dbConfig from '../../config/db';

export const connect = ((done) => {
  mongoose.createConnection(dbConfig.mongoURL);
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err);
    });
});

export const drop = ((done) => {
  mongoose.connection.db.dropDatabase()
    .then(() => {
      done();
    })
});
