'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const IssueSchema = new Schema({
  title: { type: String },
  content: { type: String },
  status: { type: Number, default: 0 }, // 0：讨论区 1: 开发区
  createTime: { type: Date, default: Date.now }, // 创建时间
  updateTime: { type: Date, default: Date.now }, // 更新时间
  user: { type: Number },
  up: { type: Number, default: 0 },
  down: { type: Number, default: 0 },
  git: [ { type: String } ]
}, { autoIndex: false });

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;
