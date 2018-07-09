'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {JWT_SECRET,JWT_EXPIRY} = require('../config');
const passport = require('passport');
const options = {session: false, failWithError: true};
const localAuth = passport.authenticate('local', options);
const jwtAuth = passport.authenticate('jwt',options);

const createAuthToken = (user) => {
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'
  });
};
      
router.post('/', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  return res.json({ authToken, user:req.user });
});

router.post('/refresh', jwtAuth, (req,res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken,  user:req.user });
});

module.exports = {router};

