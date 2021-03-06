"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  questions: mongoose.Schema.Types.Mixed,
  head: {
    type: Number,
    default: 0
  },
  userScore: {
    type: Number,
    default: 0
  },
  userWrong: {
    type: Number,
    default: 0
  }
});

UserSchema.set("toObject", {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
