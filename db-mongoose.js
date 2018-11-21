'use strict';

const mongoose = require('mongoose');
const { DATABASE_URL } = require('./config');
mongoose.Promise = global.Promise;

function dbConnect(url = DATABASE_URL) {
  return mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndexes: true
  })
    .catch(err => {
      console.error('Mongoose failed to connect');
      console.error(err);
    });
}

function dbDisconnect() { return mongoose.disconnect(); }
function dbGet() { return mongoose; }

module.exports = {
  dbConnect,
  dbDisconnect,
  dbGet
};