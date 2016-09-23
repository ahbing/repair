'use strict';
const co = require('co');
const issues = require('../proxy/issues');
const onerror = require('../common').onerror;

exports.showIssues = function(req, res) {
  let page = req.query.page || 0;
  let per_page = req.query.per_page || 2;
  let query = {};
  co(function* () {
    // 返回的字段需要添加控制
    let issue = yield issues.getIssues(page, per_page, query);
    // let user = yield 用户信息查询
    // let git = yield git 仓库查询
    return issue;
  }).then(function(value) {
    res.repair.send('index', {
      mesage: true,
      value: value,
      user: req.session.user
    }) 
  }).catch(onerror);
};
