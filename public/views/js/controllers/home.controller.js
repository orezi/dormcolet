"use strict";
angular.module("dormcolet")
  .controller("homeCtrl", ["$scope", "$mdDialog", "$rootScope", "$location", "$state", "$mdToast", "$stateParams", "SchoolService", "UserService", "HostelService", "RoomService", function($scope, $mdDialog, $rootScope, $location, $state, $mdToast, $stateParams, SchoolService, UserService, HostelService, RoomService) {
    $scope.getAllHostels = function() {
      HostelService.getAllHostels().then(function(res) {
        $scope.hostels = res.data;
      });
    };

    $scope.loadSlideshow = function() {
      $("#slides").slidesjs({
        width: 1024,
        height: 250,
        play: {
          active: false,
          effect: "slide",
          interval: 3000,
          auto: true,
          swap: true,
          pauseOnHover: true,
          restartDelay: 2500
        },
        pagination: {
          active: false,
          effect: "slide"
        },
        navigation: {
          active: false,
          effect: "slide"
        }
      });
    }

    $scope.showAlert = function(ev) {
      $scope.sendMail();
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Request Tour')
        .textContent('Thank you for requesting tour, please check email for tour details')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
      );
    };

    $scope.getHostel = function() {
      HostelService.getHostel($stateParams.hostel_id).then(function(res) {
        $scope.hostel = res.data[0];
      });
    };

    $scope.sendMail = function() {
      UserService.sendMail().then(function(res) {
        $scope.mail = res;
      });
    };

    $scope.getHostelsForSchool = function() {
      HostelService.getHostelsForSchool($stateParams.school_id).then(function(res) {
        $scope.schoolHostels = res.data;
        console.log("shoo", res.data);
      });
    };

    $scope.openHostelDetailView = function(hostelId) {
      $state.go('hostelDetails', {
        hostel_id: hostelId
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.openHostelsForSchoolView = function(schools) {
      if (document.getElementById("u246").selectedIndex == "1") {
        $state.go('search', {
          school_id: schools[0]._id
        });
      }
      if (document.getElementById("u246").selectedIndex == "2") {
        $state.go('search', {
          school_id: schools[1]._id
        });
      }
      if (document.getElementById("u246").selectedIndex == "3") {
        $state.go('search', {
          school_id: schools[2]._id
        });
      }
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    $scope.searchHostelsForSchoolView = function(schools) {
      if (document.getElementById("u1301").selectedIndex == "1") {
        $state.go('search', {
          school_id: schools[0]._id
        });
      }
      if (document.getElementById("u1301").selectedIndex == "2") {
        $state.go('search', {
          school_id: schools[1]._id
        });
      }
      if (document.getElementById("u1301").selectedIndex == "3") {
        $state.go('search', {
          school_id: schools[2]._id
        });
      }
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    $scope.getRoomsForHostel = function() {
      RoomService.getRoomsForHostel($stateParams.hostel_id).then(function(res) {
        $scope.rooms = res.data;
      });
    };

    $scope.getUserDetails = function() {
      UserService.getCurrentUser().success(function(data) {
        $scope.user = data;
      });
    };

    $rootScope.signupCheck = function() {
      if (localStorage.getItem('userToken')) {
        UserService.decodeUser();
        $rootScope.signedIn = true;
      }
      $rootScope.signedIn = false;
    };

    $scope.loginUser = function(userData) {
      UserService.login(userData).then(function(res) {
        if (res.data.message === "Authentication failed. User not found.") {
          $mdToast.show(
            $mdToast.simple()
            .content("Email or password mismatch")
            .hideDelay(3000)
          );
        } else if (res.data.message === "Authentication failed.") {
          $mdToast.show(
            $mdToast.simple()
            .content("Email or password mismatch")
            .hideDelay(3000)
          );
        } else {
          $mdToast.show(
            $mdToast.simple()
            .content("Login successful!")
            .hideDelay(3000)
          );
          //set token in localstorage
          localStorage.setItem("userToken", res.data.token);
          if (localStorage.getItem("userToken")) {
            $location.url('/home');
          }
        }
      });
    };

    $scope.getAllSchools = function() {
      SchoolService.getAllSchools().then(function(res) {
        $scope.schools = res.data;
      });
    };

    $scope.logout = function() {
      $mdToast.show(
        $mdToast.simple()
        .content("You've been logged out!")
        .hideDelay(3000)
      );
      $scope.isLoggedIn = true;
      localStorage.removeItem("userToken");
      if (localStorage.getItem("userToken")) {
        $scope.isLoggedIn = true;
      } else {
        $scope.isLoggedIn = false;
        window.location.reload();
      }
    };

    //create a new user
    $scope.registerUser = function(newUser) {
      $scope.progressLoad = true;
      $scope.isNewUser = false;
      UserService.createUser(newUser).then(function(res) {
        if (res.data.message === "user email taken") {
          $mdToast.show(
            $mdToast.simple()
            .content("Email already exists")
            .hideDelay(3000)
          );
        } else if (res.data.message === "Check parameters!") {
          $mdToast.show(
            $mdToast.simple()
            .content("Check for errors")
            .hideDelay(3000)
          );
        } else {
          $scope.userDetails = res;
          $scope.progressLoad = false;
          $scope.isNewUser = true;
          $mdToast.show(
            $mdToast.simple()
            .content("Registration complete!")
            .hideDelay(3000)
          ).then(function() {
            $scope.loginUser({
              email: newUser.email,
              password: newUser.password
            });
            $location.url("/home");
          });
        }
      });
    };

  }]);
