'use strict';

const express = require('express');
const router = express.Router();
const Question = require('./model');
const Users = require('../users/model');
const passport = require('passport');

let cl = (x,y) => {console.log(x,y);};

let helperFunction = (user,answeredQuestion) => {
  let currentQuestion = answeredQuestion;
 
  let nextIndex= currentQuestion.next;
  for (let i = 1; i < answeredQuestion.memoryValue && currentQuestion; i++) {
    currentQuestion = user.questions[nextIndex];
    nextIndex = currentQuestion.next;
  }
  answeredQuestion.next = nextIndex;
  currentQuestion.next = user.head;
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
  const { response  } = req.body;
  const userId = req.user.id;
  
  Users
    .findById({_id:userId})
    .then(user => {
      
      const answeredQuestionIndex = user.head;
      const answeredQuestion = user.questions[answeredQuestionIndex];
      if (response.toLowerCase() === answeredQuestion.answer.toLowerCase()){
        user.questions[answeredQuestionIndex].memoryValue *= 2;
        user.markModified('questions');
        res.status(204).end();
      } 
      else {       
        res.json(answeredQuestion.answer);
      }
      user.save()
        .then((updatedUser) =>  {
          console.log(updatedUser);
          return helperFunction(updatedUser, answeredQuestion);
        })
        .then((updatedUser) => {
          updatedUser.head = answeredQuestion.next; 
          return updatedUser.save();
        })
        .catch(next);
      });
    });
    
module.exports = { router };