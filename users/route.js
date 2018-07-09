'use strict';

const express = require('express');
const router = express.Router();
const Users = require('./model');
const passport = require('passport');


router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  Users
    .find()
    .where({userId})
    .then(results => {
      console.log(results);
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = { router };

