'use strict';

const express = require('express');
const router = express.Router();
const Users = require('../users/model');
const passport = require('passport');

let helperFunction = (user,answeredQuestion) => {
  let currentQuestion = answeredQuestion;
  let nextIndex= currentQuestion.next;
  user.head = answeredQuestion.next;
  
  for(let i = 0; i < answeredQuestion.memoryValue; i++){
    if(currentQuestion.next === null) break;
    currentQuestion = user.questions[nextIndex];
    nextIndex = currentQuestion.next;
  }
  answeredQuestion.next =currentQuestion.next;
  currentQuestion.next = user.questions.indexOf(answeredQuestion);
  return user; 
};

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  Users
    .findById({_id:userId})
    .then(results => {
      return res.json(results.questions[results.head].question);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { userResponse } = req.body;
  const userId = req.user.id;
  Users
    .findById({_id:userId})
    .then(user => {
      const currentQuestionIndex = user.head;
      const currentQuestion = user.questions[currentQuestionIndex];
      if (userResponse.toLowerCase() === currentQuestion.answer.toLowerCase()){
        currentQuestion.memoryValue = (currentQuestion.memoryValue*2)+1;
        helperFunction(user, currentQuestion);
        user.markModified('questions');
        res.status(204).end();
      }
      else {
        helperFunction(user,currentQuestion);
        user.markModified('questions');
        res.json(currentQuestion.answer);
      }
      user.save()
        .then((updatedUser) => {
          return updatedUser.save();
        });        
    })
    .catch(next);
});

module.exports = { router };