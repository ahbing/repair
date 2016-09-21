'use strict';
const models = require('../models');
const Issue = models.Issue;

exports.publish = function(req, res) {
  let body = req.body;
  let issue = new Issue();
  issue.title = body.title;
  issue.content = body.content;
  issue.user = body.user;
  issue.save(function(err, issue) {
    if (err) {
      console.error(err);
    }
    console.log('new Issue', issue);
    return res.redirect('/issue/' + issue._id);
  })
};

exports.showIssue = function(req, res) {
  let page = req.query.page || 1;
  let per_page = req.query.per_page || 2;
  
};
exports.join = function(req, res) {

};
exports.up = function(req, res) {};
exports.down = function(req, res) {};
exports.showEditIssue = function(req, res) {};
exports.update = function(req, res) {};
