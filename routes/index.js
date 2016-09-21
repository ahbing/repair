var express = require('express');
var router = express.Router();

module.exports = function(app) {
  var auth = require('./auth');
  var issue = require('./issue');
  var issues = require('./issues');

  var routes = [
    { path: '', router: issues, api: true },
    { path: 'issues', router: issues, api: true },
    { path: 'issue', router: issue, api: true },
    // { path: 'auth', router: auth, api: true }
  ];

  routes.forEach(function(route) {
    app.use('/' + route.path, route.router);
    if (route.api) {
      app.use('/api/' + route.path, route.router);
    }
  });
};