'use strict';
const models = require('../models');
const Issue = models.Issue;
const selectIssueFileds = 'title content status user updateTime git';
// let getIssuesCount = exports.getIssuesCount = function() {
//   return Issues.find({})
// };

/**
 *  getIssues 根据更新时间排序，
 *  然后从第 skip 开始取 limit 个 commodity
 *  @param { Number }  page 第几页
 *  @param { Number }  limit 每页的数量
 *  @param { Object }  查询条件，如 status, categoryId ...
 *  @param { Function } 回调函数
 *  - err
 *  - commodities { Array }
 */
let getIssues = exports.getIssues = function getIssues(page, per_page, query={}) {
  let skip = per_page * page;
  return Issue.find(query)
    .sort({
      updateTime: -1
    })
    .skip(skip)
    .limit(per_page)
    .select(selectIssueFileds)
    .exec();
};
