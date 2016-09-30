'use strict';
require('../models/hostel.model');
var mongoose = require('mongoose');
var Hostel = mongoose.model('Hostel');
var jwt = require('jsonwebtoken');
var config = require('../../config/db');
var session = ('express-session');

var HostelController = function() {}

HostelController.prototype.getHostels = function(req, res) {
  Hostel.find(function(err, hostels) {
    if (err) {
      return res.json(err);
    }
    if (!hostels) {
      return res.json({
        success: false,
        message: 'No hostels found'
      });
    }
  })
  .populate('schoolRef')
  .exec(function(err, hostels) {
    if(err) {
      return res.status(500).send(err);
    }
    res.json(hostels);
  });
};

HostelController.prototype.createHostel = function(req, res) {
  if (!req.body.name) {
    return res.status(422).send({
      success: false,
      message: 'Check parameters!'
    });
  }
  var schoolRef = req.params.schoolId;
  req.body.schoolRef = schoolRef;
  Hostel.create(req.body, function(err, hostel) {
    if (err) {
      return res.json(err);
    }
    return res.json(hostel);
  });
};

HostelController.prototype.getHostelsForSchool = function(req, res) {
  var schoolId = req.params.schoolId;
  Hostel.find({
    schoolRef: schoolId
  })
  .populate('schoolRef')
  .exec(function(err, hostels) {
    if(err) {
      return res.status(500).send(err);
    }
    res.json(hostels);
  });
};

HostelController.prototype.getHostel = function(req, res) {
  var hostelId = req.params.hostelId;
  Hostel.find({
    _id: hostelId
  })
  .populate('schoolRef')
  .exec(function(err, hostel) {
    if (err) {
      return res.json(err);
    }
    return res.json(hostel);
  });
};

HostelController.prototype.updateHostel = function(req, res) {
  var hostelId = req.params.hostelId;
  Hostel.findByIdAndUpdate({
    _id: hostelId
  }, req.body, {
    new: true
  })
  .populate('schoolRef') 
  .exec(function(err, hostel) {
    if (err) {
      return res.json(err);
    }
    var token = jwt.sign(hostel, config.secret, {
      expiresIn: 34560 //24hr expiration
    });

    return res.json({
      hostel: hostel,
      token: token
    });
  });
};

HostelController.prototype.deleteHostel = function(req, res) {
  var hostelId = req.params.hostelId;
  Hostel.remove({
    _id: hostelId
  }, function(err, hostel) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      success: true,
      message: "hostel has been deleted"
    });
  });
};

module.exports = HostelController;