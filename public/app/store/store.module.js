angular.module('app.store',['app.home']).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/store', {
        templateUrl: 'app/store/storePost.html',
        controller: 'StoreController',
        controllerAs: 'sm'
      }).when('/store/storesCollectionName/:storeName/:location/:slug?', {
        templateUrl: 'app/store/storesList.html',
        controller: 'StoreListController',
        controllerAs: 'slc'
      }).when('/singleStore/:storeId/:myslug?/', {
        templateUrl: 'app/store/singleStore.html',
        controller: 'SingleStoreController',
        controllerAs: 'ssc'
      });
  }]);