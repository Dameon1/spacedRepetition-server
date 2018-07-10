'use strict';

const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  question: {
    type: String
  },
  answer:{
    type: String
  },
  memeoryValue:{
    type: Number
  },
  position:{
    type: String
  }
});

const Question = mongoose.model('Questions', QuestionSchema);
module.exports = Question ;