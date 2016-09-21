'use strict';
const express = require('express');
const router = express.Router();
const issue = require('../controllers/issue');

router.get('/:id', issue.showIssue);
router.post('/', issue.publish);
router.post('/:id/join', issue.join);
router.post('/:id/up', issue.up);
router.post('/:id/down', issue.down);
// 编辑 issue
router.get('/:id/edit', issue.showEditIssue);
// 更新 issue
router.put('/:id', issue.update);

module.exports = router;