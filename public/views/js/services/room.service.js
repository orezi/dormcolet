"use strict";
angular.module("dormcolet")
  .factory("RoomService", ["$http", "$rootScope", function($http, $rootScope) {

    return {

      getAllRooms: function() {
        return $http.get("/api/rooms");
      },
      createRoomForHostel: function(hostelID, newRoom) {
        return $http.post("/api/room/hostel/" + hostelID, newRoom);
      },
      getRoomsForHostel: function(hostelID) {
        return $http.get("/api/room/hostel/" + hostelID);
      },
      getRoom: function(roomID) {
        return $http.get("/api/room/" + roomID);
      },
      updateRoom: function(roomID, roomObj) {
        var token = localStorage.getItem("userToken");
        return $http.put("/api/room/" + roomID + "?token=" + token, roomObj);
      },
      deleteRoom: function(roomID) {
        var token = localStorage.getItem("userToken");
        return $http.delete("/api/room/" + roomID + "?token=" + token);
      }
    };

  }]);
