"use strict";
var express = require('express');
var router = express.Router();
var HostelController = require('../controllers/hostel.controller');
var hostel = new HostelController();

module.exports = function(app) {
  //define routes with functions
  router.route('/hostel/school/:schoolId')
    .get(hostel.getHostelsForSchool)
    .post(hostel.createHostel);

  router.route('/hostels')
    .get(hostel.getHostels);

  router.route('/hostel/:hostelId')
    .get(hostel.getHostel)
    .put(hostel.updateHostel)
    .delete(hostel.deleteHostel);

  app.use('/api', router);
  // frontend routes =========================================================
};