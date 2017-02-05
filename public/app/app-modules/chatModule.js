angular.module('app.chat',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/chatBox/:creator1/:creator2', {
        templateUrl: 'app/chat/views/chatBox.html',
        controller: 'ChatBoxController',
        controllerAs: 'cbc',
        resolve:{
          redirectIfNotAuthenticated: redirectIfNotAuthenticated
        }
        
      });
  }]);

function redirectIfNotAuthenticated($q,$auth,$route,userData,changeBrowserURL) {
            var defer = $q.defer();
            var creator1 = $route.current.params.creator1;
            var creator2 = $route.current.params.creator2;
            if($auth.isAuthenticated()){
            	if(userData.getUser()._id==creator1 || userData.getUser()._id==creator2){
            		defer.resolve();  
            	}
            	else{
            		defer.reject();
                	changeBrowserURL.changeBrowserURLMethod('/home');
            	}
            }
            else{
            	defer.reject();
                changeBrowserURL.changeBrowserURLMethod('/home');
            } 
            return defer.promise;
}
          

