import mongoose from 'mongoose';
import dbConfig from '../../config/db';

const connect = ((done) => {
  mongoose.createConnection(dbConfig.mongoURL);
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err);
    });
});

const drop = ((done) => {
  mongoose.connection.db.dropDatabase()
    .then(() => {
      done();
    });
});

before('should connect to the database successfully', done => {
  connect(done);
});

after('', done => {
  drop(done);
});
