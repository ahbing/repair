'use strict';
const express = require('express');
const router = express.Router();

module.exports = function(app) {
  const auth = require('./auth');
  const issue = require('./issue');
  const issues = require('./issues');

  const routes = [
    { path: '', router: issues, api: true },
    { path: 'issues', router: issues, api: true },
    { path: 'issue', router: issue, api: true },
    { path: 'auth', router: auth, api: true }
  ];

  routes.forEach(function(route) {
    app.use('/' + route.path, route.router);
    if (route.api) {
      app.use('/api/' + route.path, route.router);
    }
  });
};