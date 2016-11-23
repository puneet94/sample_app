(function(angular){
'use strict';

/**
 * @ngdoc overview
 * @name authModApp
 * @description
 * # authModApp
 *
 * Main module of the application.
 */
angular
  .module('authModApp', [
    'ngCookies',
    'ngRoute',
    'satellizer'
  ])
  .config(["$routeProvider","$httpProvider","$authProvider",authConfig]);
  function authConfig($routeProvider,$httpProvider,$authProvider) {
    //shopuae
    var fbClientId = '991629147629579';
    //shoppinss
    //var fbclientId = '1068203956594250';
    var authenticateUrl = 'http://localhost:3000/authenticate';
    $routeProvider
      .when('/signup',{
        templateUrl:'app/authentication/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rcl'
      })
      .when('/logout',{
        controller: 'LogoutCtrl'
      })
      .when('/login', {
        templateUrl: 'app/authentication/views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });
      $authProvider.loginUrl =authenticateUrl + "/login";
      $authProvider.signupUrl = authenticateUrl+"/signup";

      $authProvider.facebook({
        clientId: fbClientId,
        url:authenticateUrl+'/auth/facebook'
      });
      //$httpProvider.interceptors.push('authInterceptor');
  }
})(window.angular);
