"use strict";
angular.module("dormcolet")
  .factory("HostelService", ["$http", "$rootScope", function($http, $rootScope) {

    return {

      getAllHostels: function() {
        return $http.get("/api/hostels");
      },
      createHostelForSchool: function(schoolID, newHostel) {
        return $http.post("/api/hostel/school/" + schoolID, newHostel);
      },
      getHostelsForSchool: function(schoolID) {
        return $http.get("/api/hostel/school/" + schoolID);
      },
      getHostel: function(hostelID) {
        var token = localStorage.getItem("userToken");
        return $http.get("/api/hostel/" + hostelID);
      },
      updateHostel: function(hostelID, hostelObj) {
        var token = localStorage.getItem("userToken");
        return $http.put("/api/hostel/" + hostelID + "?token=" + token, hostelObj);
      },
      deleteHostel: function(hostelID) {
        var token = localStorage.getItem("userToken");
        return $http.delete("/api/hostel/" + hostelID + "?token=" + token);
      }
    };

  }]);
