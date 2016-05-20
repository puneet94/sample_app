angular.module('app.store',['app.home']).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/store', {
        templateUrl: 'app/store/storePost.html',
        controller: 'StoreController',
        controllerAs: 'sm'
      }).when('/store/:storeName/:location', {
        templateUrl: 'app/store/storesList.html',
        controller: 'StoreListController',
        controllerAs: 'slc'
      });
  }]);