'use strict';
//save for testing
const { app } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { TEST_DATABASE_URL , JWT_SECRET, JWT_EXPIRY } = require('../config');
const User = require('../users/model');
const questions = require('./questions');
const expect = chai.expect;

chai.use(chaiHttp);

describe.only('Spanish Flash - Endpoints', function () {
  const username = 'testUser';
  const password = 'password';
  let token;
  
  before(function () {
    return mongoose.connect(TEST_DATABASE_URL,
      { useCreateIndex: true,
        useNewUrlParser: true });
  });
  
  beforeEach(function () {
    return User.hashPassword(password)
      .then(digest => User.create({  
        username,
        password: digest,
        userScore: 0,
        userWrong: 0,
        questions:  questions.map((question,index)=>({
          question: question.question,
          answer: question.answer,
          memoryValue: 1,
          next: index === questions.length-1 ? null : index+1})),}))
      .then(user => {
        console.log(user);
        token = jwt.sign({user}, JWT_SECRET, {
          subject: user.username,
          expiresIn: '7d',
          algorithm: 'HS256'
        });
      });
  });  
  
  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });
  
  after(function () {
    return mongoose.disconnect();
  });

  //testing that the server is running by sending a GET request
  describe('Server running', function() {
    it('Should return an 200', function () {
      return chai.request(app)
        .get('/api/question')        
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });
  });

  //testing that the GET endpoint works
  describe('GET endpoint validation', function() {
    it('Should return question', function () {
      return chai.request(app)
        .get('/api/question')
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
        });
    });
  });

  //testing that the POST endpoint works with a correct answer
  describe('POST endpoint validation', function() {
    it('Should return a status of 204', function () {
      return chai.request(app)
        .get('/api/question')        
        .set('Authorization', `Bearer ${token}`)
        .then(()=>{
          return chai.request(app)
            .post('/api/question')
            .set('Authorization', `Bearer ${token}`)
            .send({userResponse:'hello'});
        })
        .then(res => {
          expect(res).to.have.status(204);
        });
    });
  });

  //testing that the POST endpoint works with a incorrect answer
  describe('POST endpoint validation', function() {
    it('Should return an 200', function () {
      return chai.request(app)
        .get('/api/question')        
        .set('Authorization', `Bearer ${token}`)
        .then(()=>{
          return chai.request(app)
            .post('/api/question')
            .set('Authorization', `Bearer ${token}`)
            .send({userResponse:'helo'});
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('string');
        });
    });
  });

});