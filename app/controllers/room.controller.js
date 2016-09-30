'use strict';
require('../models/room.model');
var mongoose = require('mongoose');
var Room = mongoose.model('Room');
var jwt = require('jsonwebtoken');
var config = require('../../config/db');
var session = ('express-session');

var RoomController = function() {}

RoomController.prototype.getRooms = function(req, res) {
  Room.find(function(err, rooms) {
    if (err) {
      return res.json(err);
    }
    if (!rooms) {
      return res.json({
        success: false,
        message: 'No rooms found'
      });
    }
  })
  .populate('hostelRef')
  .exec(function(err, rooms) {
    if(err) {
      return res.status(500).send(err);
    }
    res.json(rooms);
  });
};

RoomController.prototype.createRoom = function(req, res) {
  if (!req.body.number || !req.body.numOfOccupants || !req.body.price) {
    return res.status(422).send({
      success: false,
      message: 'Check parameters!'
    });
  }
  var hostelRef = req.params.hostelId;
  req.body.hostelRef = hostelRef;
  Room.create(req.body, function(err, room) {
    if (err) {
      return res.json(err);
    }
    return res.json(room);
  });
};

RoomController.prototype.getRoomsForHostel = function(req, res) {
  var hostelRef = req.params.hostelId;
  Room.find({
    hostelRef: hostelRef
  })
  .populate('hostelRef')
  .exec(function(err, rooms) {
    if(err) {
      return res.status(500).send(err);
    }
    res.json(rooms);
  });
};

RoomController.prototype.getRoom = function(req, res) {
  var roomId = req.params.roomId;
  Room.find({
    _id: roomId
  })
  .populate('hostelRef')
  .exec(function(err, room) {
    if (err) {
      return res.json(err);
    }
    return res.json(room);
  });
};

RoomController.prototype.updateRoom = function(req, res) {
  var roomId = req.params.roomId;
  Room.findByIdAndUpdate({
    _id: roomId
  }, req.body, {
    new: true
  })
  .populate('hostelRef') 
  .exec(function(err, room) {
    if (err) {
      return res.json(err);
    }
    var token = jwt.sign(room, config.secret, {
      expiresIn: 34560 //24hr expiration
    });

    return res.json({
      room: room,
      token: token
    });
  });
};

RoomController.prototype.deleteRoom = function(req, res) {
  var roomId = req.params.roomId;
  Room.remove({
    _id: roomId
  }, function(err, room) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      success: true,
      message: "room has been deleted"
    });
  });
};

module.exports = RoomController;