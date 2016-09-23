'use strict';
const User = require('../models').User;

exports.getUserByGithubId = function(githubId) {
  return User.findOne({ githubId }).exec();
};

exports.newAndSave = function(newUser) {
  let user = new User();  
  for (let key in newUser) {
    user[key] = newUser[key];
  }
  return user.save();
};
