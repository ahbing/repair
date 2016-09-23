'use strict';
const co = require('co');
const querystring = require('querystring');
const issueProxy = require('../proxy/issue');
const onerror = require('../common').onerror; 

exports.publish = function(req, res) {
  let body = req.body;
  let title = body.title;
  let content = body.content;
  let user = body.user;
  let newIssue = issue.newAndSave(title, content, user);
  newIssue.then(function(issue) {
    return res.redirect('/issue/' + issue._id);
  }).catch(function(err) {
    console.log(err);
  });

};

exports.showIssue = function(req, res) {
  let issueId = req.params.id;
  co(function*() {
    let issue = yield issueProxy.getIssueById(issueId);
    // let user = yield user.getUserById(issue.user);
    // let gits = yield git 仓库信息
    return issue;
  }).then(function(issue) {
    res.repair.send(null, {
      message: 200,
      issue: issue
    })
  }).catch(onerror);
};

// 添加仓库字段
exports.join = function(req, res) {
  let body = req.body;
  let gitUrl = querystring.unescape(body.gitUrl);  // parse url
  let issueId = body.id;
  co(function*() {
    // 验证 git 仓库的正确性
    let issue = yield issueProxy.updateIssueGitById(issueId, gitUrl);
    return issue;
  }).then(function(value) {
    res.repair.send('', {
      message: 200,
      value: value
    })
  }).catch(onerror)
};

// exports.up = function(req, res) {};
// exports.down = function(req, res) {};

exports.showEditIssue = function(req, res) {
  co(function*() {
    let issue = yield issueProxy.getIssueById(issueId);
    return issue;
  }).then(function(issue) {
    res.repair.send(null, {
      message: 200,
      issue: issue
    })
  }).catch(onerror);
};

exports.update = function(req, res) {
  let body = req.body;
  let issueId = body.id;
  let newBody = {
    title: body.title,
    content: body.content
  };
  co(function* () {
    let newIssue = yield issueProxy.updateIssueBodyById(issueId, newBody);
    return newIssue;
  }).then(
    function(newIssue) {
      res.repair.send('', {
        message: 200,
        issue: newIssue
      })
    }
  )
  .catch(onerror);
};
