"use strict";
var express = require('express');
var router = express.Router();
var RoomController = require('../controllers/room.controller');
var room = new RoomController();

module.exports = function(app) {
  //define routes with functions
  router.route('/room/hostel/:hostelId')
    .get(room.getRoomsForHostel)
    .post(room.createRoom);
  
  router.route('/rooms')
    .get(room.getRooms);
    
  router.route('/room/:roomId')
    .get(room.getRoom)
    .put(room.updateRoom)
    .delete(room.deleteRoom);

  app.use('/api', router);
  // frontend routes =========================================================
};