'use strict';

const express = require('express');
const router = express.Router();
const Users = require('./model');


router.get('/', (req, res, next) => {
  Users
    .find()
    .then(results => {
      console.log(results);
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = { router };

