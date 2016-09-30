'use strict';
require('../models/school.model');
var mongoose = require('mongoose');
var School = mongoose.model('School');
var jwt = require('jsonwebtoken');
var config = require('../../config/db');
var session = ('express-session');

var SchoolController = function() {}

SchoolController.prototype.createSchool = function(req, res) {
  if (!req.body.name) {
    return res.status(422).send({
      success: false,
      message: 'Check parameters!'
    });
  }
  School.findOne({
    name: req.body.name
  }, function(err, school) {
    if (err) {
      return res.json(err);
    } else if (school) {
      res.json({
        success: false,
        message: 'school name taken'
      });
    } else {
      School.create(req.body, function(err, school) {
        if (err) {
          return res.json(err);
        }
        return res.json(school);
      });
    }
  });
};

SchoolController.prototype.getSchools = function(req, res) {
  School.find(function(err, schools) {
    if (err) {
      return res.json(err);
    }
    if (!schools) {
      return res.json({
        success: false,
        message: 'No schools found'
      });
    }
    return res.json(schools);
  });
};

SchoolController.prototype.getSchool = function(req, res) {
  var schoolId = req.params.schoolId;
  School.find({
    _id: schoolId
  }, function(err, school) {
    if (err) {
      return res.json(err);
    }
    return res.json(school);
  });
};

SchoolController.prototype.updateSchool = function(req, res) {
	var schoolId = req.params.schoolId;
  School.findByIdAndUpdate({
    _id: schoolId
  }, req.body, {
    new: true
  }, function(err, school) {
    if (err) {
      return res.json(err);
    }
    var token = jwt.sign(school, config.secret, {
      expiresIn: 34560 //24hr expiration
    });

    return res.json({
      school: school,
      token: token
    });
  });
}

SchoolController.prototype.deleteSchool = function(req, res) {
	var schoolId = req.params.schoolId;
  School.remove({
    _id: schoolId
  }, function(err, school) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      success: true,
      message: "school has been deleted"
    });
  });
}

module.exports = SchoolController;