angular.module('app.home')
.controller('HeaderController',["$scope","changeBrowserURL","$auth","$mdDialog", "$mdMedia",headerController]);

function headerController($scope,changeBrowserURL,$auth,$mdDialog, $mdMedia){
		var phc = this;
		phc.toHomePage = toHomePage;
		phc.authenticate = authenticate;
		phc.authLogout = authLogout;
		phc.showAdvanced = showAdvanced;
		phc.customFullscreen = undefined;
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
    	function showAdvanced(ev) {
		    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		    $mdDialog.show({
		      controller: 'ModalFormLoginController',
		      templateUrl: 'app/home/views/modalFormLogin.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: phc.customFullscreen
		    })
		    .then(function(answer) {
		      $scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.status = 'You cancelled the dialog.';
		    });
		    $scope.$watch(function() {
		    	console.log("From watch",$mdMedia('xl') || $mdMedia('md'));
      			return $mdMedia('md') || $mdMedia('xl');
    		}, function(wantsFullScreen) {
	      		phc.customFullscreen = (wantsFullScreen === true);
	      		console.log(phc.customFullscreen);
    		});
		    
  		}
}