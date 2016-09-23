'use strict';
// github auth
const express = require('express');
const router = express.Router();
const passport = require('passport');
const co = require('co');
const userProxy = require('../proxy/user');
const onerrror = require('../common/').onerror;

router.get('/github', passport.authenticate('github'))
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/error' }),
  function(req, res) {
    let user = req.user;
    let newUser = {
      githubId: user.id,
      accessToken: user.accessToken,
      profileUrl: user.profileUrl,
      displayName: user.displayName, // nickname
      username: user.username, // github unique
    };
    let _json = user._json;
    let _jsonKeys = ['avatar_url', 'company', 'blog', 'location', 'email', 'bio']; // github 返回 object 的部分字段
    for (let key in _jsonKeys) {
      newUser[key] = _json[key]
    }
    co(function*() {
      let user = yield userProxy.getUserByGithubId(newUser.githubId);
      if (!user || !user._id) {
        user = yield userProxy.newAndSave(newUser);
      }
      // @todo update database user info from github
      return  user;
    }).then(function(user) {
      req.session.user = user;
      res.repair.send(302, {
        message: 200,
        user: user
      }, '/');
    }).catch(onerrror)
  });

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) onerrror(err);
    return res.redirect('/');
  })
});

module.exports = router;
