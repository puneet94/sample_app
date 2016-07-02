(function(angular){
	angular.module('app.home',[])
		.config(['$routeProvider',config]);
		 function config($routeProvider) {
		    $routeProvider.
		      when('/home', {
		        templateUrl: 'app/home/homePage.html',
		        controller: 'HomeController',
		        controllerAs: 'hm'
		      });
		 }

})(window.angular);


angular.module('app.home')
	.controller("AuthController",["$scope","changeBrowserURL","$auth","$window","userData",AuthController]);
function AuthController($scope,changeBrowserURL,$auth,$window,userData){
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
	    	$auth.authenticate(provider).then(function(response) {
					userData.setUser();
					//$window.location.reload();
					//console.log(response);
          // $window.localStorage.currentUser = JSON.stringify(response.data.user);
          // $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
					//console.log('********logoin*******');
		    	//console.log($auth.getPayload());
        });
    	}
    	function authLogout(){
				$auth.logout();
        userData.removeUser();
				toHomePage();
    	}
}
