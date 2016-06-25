angular.module('app.home')
	.controller("AuthController",["$scope","changeBrowserURL","$auth","$window","userData",authController]);
function authController($scope,changeBrowserURL,$auth,$window,userData){
		var phc = this;
		phc.toHomePage = toHomePage;
		phc.authenticate = authenticate;
		phc.authLogout = authLogout;
		phc.loginPage = loginPage;
		phc.isAuth = $auth.isAuthenticated();
		console.log('*****payload*****');
		console.log($auth.getPayload());
		console.log('*****payload*****');
		console.log("header is"+$auth.isAuthenticated());
		function toHomePage(){
			changeBrowserURL.changeBrowserURLMethod('/');
		}
		function loginPage(){
			changeBrowserURL.changeBrowserURLMethod('/login');
		}
		function authenticate(provider) {
	    	$auth.authenticate(provider);
				console.log('********logoin*******');
	    	console.log($auth.getPayload());
	    	//$window.location.reload();

    	}
    	function authLogout(){
    		$auth.logout();
				console.log('********logout*******');
        console.log(userData.getUser());
        userData.removeUser();
        console.log(userData.getUser());
				toHomePage();
    	}
}
