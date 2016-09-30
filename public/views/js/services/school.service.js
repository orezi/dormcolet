"use strict";
angular.module("dormcolet")
  .factory("SchoolService", ["$http", "$rootScope", function($http, $rootScope) {

    return {

      getAllSchools: function() {
        return $http.get("/api/schools");
      },
      createSchool: function(newSchool) {
        return $http.post("/api/schools", newSchool);
      },
      getSchool: function(schoolID) {
        return $http.get("/api/school/" + schoolID);
      },
      updateSchool: function(schoolID, schoolObj) {
        return $http.put("/api/school/" + schoolID, schoolObj);
      },
      deleteSchool: function(schoolID) {
        return $http.delete("/api/school/" + schoolID);
      }
    };

  }]);
