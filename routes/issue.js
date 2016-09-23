'use strict';
const express = require('express');
const router = express.Router();
const issue = require('../controllers/issue');

router.get('/:id', issue.showIssue);
router.post('/', issue.publish);
router.post('/join', issue.join); // add git link
// router.post('/up', issue.up);
// router.post('/down', issue.down);
// 编辑 issue
router.get('/:id/edit', issue.showEditIssue);
// 更新 issue
router.put('/', issue.update);

module.exports = router;
