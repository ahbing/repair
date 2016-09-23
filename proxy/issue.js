'use strict';
const models = require('../models');
const Issue = models.Issue;


exports.newAndSave = function(title, content, user) {
  let issue = new Issue();
  issue.title = title;
  issue.content = content;
  issue.user = user;
  return issue.save();
};

exports.getIssueById = function(id) {
  return Issue.findById(id).exec();
};

exports.updateIssueGitById = function(id, gitUrl) {
  return Issue.findByIdAndUpdate(id, 
    {
      $addToSet: {
        git:gitUrl },
      $set: { 
        status: 1 },
    }, {
      new: true
    })
    .exec()
}

exports.updateIssueBodyById = function(id, body) {
  return Issue.findByIdAndUpdate(id, 
    {
      $set: {
        title: body.title,
        content: body.content,
        updateTime: Date.now() }
    }, {
      new: true
    })
    .exec()
}