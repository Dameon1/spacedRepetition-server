'use strict';

const express = require('express');
const router = express.Router();
const User = require('./model');


router.get('/', (req, res, next) => {
  User
    .find()
    .then(results => {
      res.json('working');
    })
    .catch(err => {
      next(err);
    });
});


module.exports = { router };

