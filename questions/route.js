'use strict';

const express = require('express');
const router = express.Router();
const Question = require('./model');

router.get('/', (req, res, next) => {
  
  Question
    .findOne()
    .then(results => {      
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  let { grade } = req.body;
  res.status(204).end(); 
});

module.exports = { router };