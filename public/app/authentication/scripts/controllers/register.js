'use strict';

/**
 * @ngdoc function
 * @name authModApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the authModApp
 */
angular.module('authModApp')
	.controller('RegisterCtrl', ["$scope","userData","$auth","$location",registerCtrl]);

	function registerCtrl($scope,userData,$auth,$location) {
		var rc = this;
		rc.user = {};
	    rc.formSubmit = formSubmit;
	    //var url = 'http://localhost:8000/register';

	    function formSubmit(){
	    	
		    $auth.signup(rc.user)
				.then(function(response){
					console.log(response);
			    		$location.path("/");
			    		$auth.setToken(response.data.token);
			    		userData.setUser(response.data.user);
			    		console.log(userData.getUser());
					},function(response){
						console.log(response);
				});
		}
	}

// $http.post(url,rc.user).then(function(res){
			    	// 	authToken.setToken(res.data.token);
			    	// 	console.log(res);
			    	// 	$location.path("/");
			    	// },function(data){
			    	// 	console.log(data);
			    	// });
