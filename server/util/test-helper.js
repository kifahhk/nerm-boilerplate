import mongoose from 'mongoose';
import { mongoURI } from '../../config/db';
import dotenv from 'dotenv';
dotenv.config();

const connect = ((done) => {
  mongoose.createConnection(mongoURI);
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
