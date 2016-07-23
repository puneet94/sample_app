(function(angular){
	'use strict';

	angular.module('app.home')
		.controller("AuthController",["$scope","changeBrowserURL","$auth","$window","$route","userData",AuthController]);
	function AuthController($scope,changeBrowserURL,$auth,$window,$route,userData){
			var phc = this;
			phc.toHomePage = toHomePage;
			phc.authenticate = authenticate;
			phc.authLogout = authLogout;
			phc.loginPage = loginPage;
			phc.isAuth = $auth.isAuthenticated();

			function toHomePage(){
				changeBrowserURL.changeBrowserURLMethod('/');
			}
			function loginPage(){
				changeBrowserURL.changeBrowserURLMethod('/login');
			}
			function authenticate(provider) {
		    	$auth.authenticate(provider).then(function(response) {
						userData.setUser();
						alert('login with facebook successfull');
						$route.reload();

						//$window.location.reload();
						//console.log(response);
	          // $window.localStorage.currentUser = JSON.stringify(response.data.user);
	          // $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
						//console.log('****logoin*******');
			    	//console.log($auth.getPayload());
	        });
	    	}
	    	function authLogout(){
					$auth.logout();
	        userData.removeUser();
					toHomePage();
	    	}
	}


})(window.angular);
