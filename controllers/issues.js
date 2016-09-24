'use strict';
const co = require('co');
const issuesProxy = require('../proxy/issues');

exports.showIssues = function(req, res) {
  let page = req.query.page || 0;
  let per_page = req.query.per_page || 10;
  let query = {};
  co(function* () {
    // 返回的字段需要添加控制
    let issues = yield issuesProxy.getIssues(page, per_page, query);
    // let user = yield 用户信息查询
    // let git = yield git 仓库查询
    return issues;
  }).then(function(issues) {
    res.repair.send('index', {
      mesage: true,
      issues: issues,
      user: req.session.user
    })
  }).catch(function(err) {
    res.repair.send('error', {
      error: err
    })
  });
};
