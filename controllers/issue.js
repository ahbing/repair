'use strict';
const co = require('co');
const querystring = require('querystring');
const issueProxy = require('../proxy/issue');
const errors = require('../common/errors');

exports.publish = function(req, res) {
  let body = req.body;
  let title = body.title;
  let content = body.content;
  let user = body.user;
  let newIssue = issueProxy.newAndSave(title, content, user);
  newIssue.then(function(issue) {
    return res.redirect('/issue/' + issue._id);
  }).catch(function(err) {
    res.repair.send('error', {
      error: err
    })
  });
};

exports.showNewIssue = function(req, res) {
  let user = req.session.user;
  let templateOrStatusCode = user && user._id ? 'newIssue' : 302;
  res.repair.send(templateOrStatusCode, {
   message: 200,
   user: req.session.user,
  }, '/auth/github')
};

exports.showIssue = function(req, res) {
  let issueId = req.params.id;
  co(function*() {
    let issue = yield issueProxy.getIssueById(issueId);
    // @todo
    // let user = yield user.getUserById(issue.user);
    // let gits = yield git 仓库信息
    console.log(issue);
    return issue;
  }).then(function(issue) {
    res.repair.send('issue', {
      message: 200,
      issue: issue,
      user: req.session.user
    })
  }).catch(function(err) {
    res.repair.send('error', {
      error: err
    })
  });
};

// 添加仓库字段
exports.join = function(req, res) {
  let body = req.body;
  let gitUrl = querystring.unescape(body.gitUrl);  // parse url
  let issueId = body.id;
  co(function*() {
    //@todo 验证 git 仓库的正确性
    let issue = yield issueProxy.updateIssueGitById(issueId, gitUrl);
    return issue;
  }).then(function(issue) {
    res.repair.send(302, {
      message: 200,
      issue: issue,
      user: req.session.user,
    }, '/issue/' + issueId)
  }).catch(function(err) {
    res.repair.send('error', {
      error: err
    })
  })
};

exports.showEditIssue = function(req, res) {
  let issueId = req.params.id;
  let user = req.session.user;
  console.log('session user', user);
  co(function*() {
    let issue = yield issueProxy.getIssueById(issueId);
    console.log('issue', issue)
    if (!user || user.githubId !== issue.user) {
      yield Promise.reject(new errors.ForbiddenError('你没有权限进行这样的操作'))
    }
    return issue;
  }).then(function(issue) {
    res.repair.send('editIssue', {
      message: 200,
      issue: issue,
      user: req.session.user
    })
  }).catch(function(err) {
    res.repair.send('error', {
      error: err
    })
  });
};

exports.update = function(req, res) {
  let body = req.body;
  let issueId = body.id;
  let user = req.session.user;
  let newBody = {
    title: body.title,
    content: body.content
  };
  co(function* () {
    let curIssue = yield issueProxy.getIssueById(issueId);
    if (!user || user.githubId !== curIssue.user) {
      yield Promise.reject(new errors.ForbiddenError('你没有权限进行这样的操作'))
    }
    let newIssue = yield issueProxy.updateIssueBodyById(issueId, newBody);
    return newIssue;
  }).then(
    function(newIssue) {
      res.repair.send('issue', {
        message: 200,
        issue: newIssue,
        user: req.session.user,
      })
    }
  )
  .catch(function(err) {
    res.repair.send('error', {
      error: err
    });
  });
};

