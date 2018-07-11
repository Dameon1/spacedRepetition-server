'use strict';

const express = require('express');
const router = express.Router();
const Question = require('./model');
const Users = require('../users/model');
const passport = require('passport');

let helperFunction = (user,answeredQuestion) => {
  let currentQuestion = answeredQuestion;
  for (let i = 0; i < answeredQuestion.memoryValue && currentQuestion; i++) {
    const nextIndex = currentQuestion.next;
    currentQuestion = user.questions[nextIndex];
  }
  answeredQuestion.next = currentQuestion.next;
  currentQuestion.next = user.head;
};


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
  Users
    .findById({_id:userId})
    .then(user => {
      const answeredQuestionIndex = user.head;
      const answeredQuestion = user.questions[answeredQuestionIndex];
      if (response.toLowerCase() === answeredQuestion.answer.toLowerCase()){
        answeredQuestion.memoryValue *= 2;
        res.status(204).end();
      } 
      else {       
        res.json(answeredQuestion.answer);
      }
      helperFunction(user, answeredQuestion);
      user.head = answeredQuestion.next;
      user.save();
    });
});

module.exports = { router };