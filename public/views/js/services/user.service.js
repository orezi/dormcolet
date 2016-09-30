"use strict";
angular.module("dormcolet")
  .factory("UserService", ["$http", "$rootScope", function($http, $rootScope) {
    function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }

    return {

      getAllUsers: function() {
        return $http.get("/api/users");
      },
      getCurrentUser: function() {
        var token = localStorage.getItem('userToken');
        return $http.get("/api/user?token=" + token);
      },
      login: function(param) {
        return $http.post("/api/authenticate", param);
      },
      createUser: function(newUser) {
        return $http.post("/api/users", newUser);
      },
      decodeUser: function() {
        if (localStorage.getItem("userToken")) {
          var token = localStorage.getItem("userToken");
          var user = {};
          if (token) {
            var encoded = token.split(".")[1];
            user = JSON.parse(urlBase64Decode(encoded));
            $rootScope.firstname = user._doc.firstname;
          }
        }
      },    
      getUser: function(userID) {
        var token = localStorage.getItem("userToken");
        return $http.get("/api/user/" + userID + "?token=" + token);
      },
      updateUser: function(userID, userObj) {
        var token = localStorage.getItem("userToken");
        return $http.put("/api/user/" + userID + "?token=" + token, userObj);
      },
      deleteUser: function(userID) {
        var token = localStorage.getItem("userToken");
        return $http.delete("/api/user/" + userID + "?token=" + token);
      }
    };

  }]);
