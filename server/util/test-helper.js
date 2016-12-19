import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
import dbConfig from '../../config/db';

export const connect = ((t, done) => {
  mockgoose(mongoose).then(() => {
    mongoose.createConnection(dbConfig.mongoURL, err => {
      if (err) t.fail('Unable to connect to test database');
      done();
    });
  });
});

export const drop = ((t) => {
  mockgoose.reset(err => {
    if (err) t.fail('Unable to reset test database');
  });
});
