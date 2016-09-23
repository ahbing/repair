'use strict';
const express = require('express');
const router = express.Router();
const issue = require('../controllers/issue');

router.get('/new', issue.showNewIssue);
router.get('/:id', issue.showIssue);
router.get('/:id/edit', issue.showEditIssue);


router.post('/', issue.publish);
router.post('/join', issue.join); // add git link

router.put('/', issue.update);

module.exports = router;
