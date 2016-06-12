'use strict';

/**
 * @ngdoc function
 * @name authModApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the authModApp
 */
angular.module('authModApp')
  .controller('JobsCtrl', function ($http) {
  	var jobs = this;
  	jobs.unAuth = true;
    $http.get('http://localhost:8000/jobs').then(function(response){
    	jobs.unAuth = false;
    	jobs.jobsList = response.data.jobsData;
    	jobs.user = response.data.user;
    },function(response){
    	jobs.message = response.message;
    	console.log(response);
    });
  });
