"use strict";
// public/js/app.js
angular.module('dormcolet', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'timer'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('landingpage', {
        url: '/home',
        templateUrl: '../home.html',
        controller: 'homeCtrl'
      })
      .state('authenticate', {
        url: '/authentication',
        templateUrl: '../authentication.html',
        controller: 'homeCtrl'
      })
      .state('search', {
        url: '/school/:school_id',
        templateUrl: '../search.html',
        controller: 'homeCtrl'
      })
      .state('hostelDetails', {
        url: '/hostel/:hostel_id',
        templateUrl: '../hostel.html',
        controller: 'homeCtrl'
      });

    $urlRouterProvider.otherwise('/home');
  });
