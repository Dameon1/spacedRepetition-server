'use strict';

const express = require('express');
const router = express.Router();
const Users = require('./model');
const passport = require('passport');
const Question = require('../questions/model');


router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  
  Users
    .findById({_id:userId})
    .then(results => {
      let id = results.head;
      return Question
        .find({_id:id})
        .then(results => res.json(results) );
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { response  } = req.body;
  const userId = req.user.id;
  if(response==='true'){
    Users
      .findByIdAndUpdate({ _id:userId },{ head:next })
      .then(results => res.status(201).json(results)) 
      .catch(err => {
        next(err);
      });
  }
  //reposition question / update link-list
  //update score if correct
});








module.exports = { router };

