angular.module('app.home',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'app/home/homePage.html',
        controller: 'HomeController'
      });
  }]);

//mongod --config C:\Program Files\MongoDB\mongo.config

//mongod.exe --storageEngine=mmapv1 