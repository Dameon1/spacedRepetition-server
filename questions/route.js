'use strict';

const express = require('express');
const router = express.Router();
const Question = require('./model');

router.get('/', (req, res, next) => {
  
  Question
    .find()
    .then(results => {      
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = { router };