"use strict";
var express = require('express');
var router = express.Router();
var SchoolController = require('../controllers/school.controller');
var UserController = require('../controllers/user.controller');
var school = new SchoolController();
var user = new UserController();

module.exports = function(app) {
  //define routes with functions
  router.route('/schools')
    .post(school.createSchool)
    .get(school.getSchools);

  router.route('/school/:schoolId')
    .get(school.getSchool)
    .delete(school.deleteSchool)
    .put(school.updateSchool);

  app.use('/api', router);
  // frontend routes =========================================================
};