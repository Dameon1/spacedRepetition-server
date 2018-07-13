'use strict';

const express = require('express');
const router = express.Router();
const Users = require('../users/model');
const passport = require('passport');

let helperFunction = (user,answeredQuestion) => {
  let currentQuestion = answeredQuestion;
  let nextIndex= currentQuestion.next;
  const answeredQuestionPosition = user.head;
  user.head = answeredQuestion.next;
  
  for(let i = 0; i < answeredQuestion.memoryValue; i++){
    if(currentQuestion.next === null) break;
    currentQuestion = user.questions[nextIndex];
    nextIndex = currentQuestion.next;
  }
  answeredQuestion.next = currentQuestion.next;
  currentQuestion.next = answeredQuestionPosition;
  return user; 
};

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  Users
    .findById({_id:userId})
    .then(results => {
      return res.location('/api/question').status(200).json(results.questions[results.head].question);
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
        currentQuestion.memoryValue = (currentQuestion.memoryValue*2);
        helperFunction(user, currentQuestion);
        user.markModified('questions');
        res.status(204).end();
      }
      else {
        currentQuestion.memoryValue = 1;
        helperFunction(user,currentQuestion);
        user.markModified('questions');
        res.status(200).json(currentQuestion.answer);
      }
      user.save()
        .then((updatedUser) => {
          return updatedUser.save();
        });        
    })
    .catch(next);
});

module.exports = { router };