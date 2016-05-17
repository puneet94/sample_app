angular.module('myApp',['ngRoute','app.home','app.store','ngMaterial']).config(['$routeProvider',
  function($routeProvider) {
      $routeProvider.
      otherwise({
        redirectTo: '/home'
      });
  }]);