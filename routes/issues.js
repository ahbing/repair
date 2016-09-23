'use strict';
const express = require('express');
const router = express.Router();
const issues = require('../controllers/issues');

router.get('/', issues.showIssues);

module.exports = router;

