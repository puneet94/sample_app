angular.module('app.home')
	.controller("AuthController",["$scope","changeBrowserURL","$auth","$window",authController]);
function authController($scope,changeBrowserURL,$auth,$window){
		var phc = this;
		phc.toHomePage = toHomePage;
		phc.authenticate = authenticate;
		phc.authLogout = authLogout;
		phc.loginPage = loginPage;
		phc.isAuth = $auth.isAuthenticated();
		console.log("header is"+$auth.isAuthenticated());
		function toHomePage(){
			changeBrowserURL.changeBrowserURLMethod('/');
		}
		function loginPage(){
			changeBrowserURL.changeBrowserURLMethod('/login');
		}
		function authenticate(provider) {
	    	$auth.authenticate(provider);
	    	console.log("jdvkv");
	    	//$window.location.reload();
	    	
    	}
    	function authLogout(){
    		$auth.logout();toHomePage();
    	}
}