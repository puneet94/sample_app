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
  .config(function ($routeProvider,$httpProvider,$authProvider) {
    $routeProvider
      
      .when('/jobs', {
        templateUrl: 'views/jobs.html',
        controller: 'JobsCtrl',
        controllerAs: 'jobs'
      })
      .when('/register',{
        templateUrl:'/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rcl'
      })
      .when('/logout',{
        controller: 'LogoutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/reviews', {
        templateUrl: 'views/reviews.html',
        controller: 'ReviewsCtrl',
        controllerAs: 'reviews'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'products'
      })
      .otherwise({
        redirectTo: '/'
      });
      $authProvider.loginUrl = "http://localhost:3000/authenticate/login";
      $authProvider.signupUrl = "http://localhost:3000/authenticate/signup";

      $authProvider.facebook({
        clientId: '1068203956594250',
        url:'http://localhost:3000/authenticate/auth/facebook'
      });
      //$httpProvider.interceptors.push('authInterceptor');
  });
