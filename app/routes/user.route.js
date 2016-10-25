"use strict";
var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user.controller');
var user = new UserController();

module.exports = function(app) {
  //define routes with functions
  router.route('/users')
    .post(user.createUser)
    .get(user.getUsers);

  router.route('/authenticate')
    .post(user.authenticate);
  
  router.route('/sendMail')
    .post(user.verifyToken, user.sendTourMail);

  router.route('/user/:userId')
    .get(user.verifyToken, user.getUser)
    .delete(user.verifyToken, user.deleteUser)
    .put(user.verifyToken, user.updateUser);

  router.route('/user')
    .get(user.verifyToken, user.getCurrentUser)
    .delete(user.verifyToken, user.deleteCurrentUser)
    .put(user.verifyToken, user.updateCurrentUser);

  app.use('/api', router);
  // frontend routes =========================================================
};
