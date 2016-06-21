angular.module('app.home')
	.controller("AuthController",["$scope","changeBrowserURL","$auth",authController]);
function authController($scope,changeBrowserURL,$auth){
		var phc = this;
		phc.toHomePage = toHomePage;
		phc.authenticate = authenticate;
		phc.authLogout = authLogout;
		phc.isAuth = $auth.isAuthenticated();
		console.log("header is"+$auth.isAuthenticated());
		function toHomePage(){
			changeBrowserURL.changeBrowserURLMethod('/');
		}
		function authenticate(provider) {
	    	$auth.authenticate(provider);
	    	toHomePage();
    	}
    	function authLogout(){
    		$auth.logout();toHomePage();
    	}
}