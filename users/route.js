'use strict';

const express = require('express');
const router = express.Router();
const Users = require('./model');
const passport = require('passport');
const Question = require('../questions/model');

let helperFunction = () => {
  
}

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));



router.get('/', (req, res, next) => {
  const userId = req.user.id;
  Users
    .findById({_id:userId})
    .then(results => {
      return res.json(results.questions[results.head].question);
    });
});


router.post('/', (req, res, next) => {
  const { response  } = req.body;
  const userId = req.user.id;
  if(response==='true'){
    res.json('true')
      .catch(err => {
        next(err);
      });
  }
  else next();
  //reposition question / update link-list
  //update score if correct
});


router .post('/answer', (req, res, next) => {
  const { response  } = req.body;
  const userId = req.user.id;
  Users
  .findById({userId})
    .then(user => {
      const answeredQuestionIndex = user.head;
      const answeredQuestion = user.questions[answeredQuestionIndex];
      if (response === 'correct'){
        answeredQuestion.memoryValue *= 2;
        //set the mValue for answeredQuestion.mValue;

      } else {
        //set the mValue for answeredQuestion.mValue;
      }
    });
  //change the current head to the index of the answered node
  user.head =answeredQuestion.next;
});






module.exports = { router };

