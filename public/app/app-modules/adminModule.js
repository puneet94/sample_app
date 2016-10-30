angular.module('app.admin',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/admin/createStore', {
        templateUrl: 'app/admin/views/adminCreateStore.html',
        controller: 'CreateStoreController',
        controllerAs: 'csc',
        resolve:{
          redirectIfNotAuthenticated: redirectIfNotAuthenticated
        }
      })/*.when('/store/storesCollection/storeName/:storeName/:location/:slug?', {
        templateUrl: 'app/store/views/storesNameCollection.html',
        controller: 'StoreNameCollectionController',
        controllerAs: 'sncc'
      }).when('/store/storesCollection/category/:category/:location/:slug?', {
        templateUrl: 'app/store/views/storesCategoryCollection.html',
        controller: 'StoreCategoryCollectionController',
        controllerAs: 'sccc'
      }).when('/store/storesCollection/location/:location/:slug?', {
        templateUrl: 'app/store/views/storesLocationCollection.html',
        controller: 'StoreLocationCollectionController',
        controllerAs: 'slcc'
      }).when('/store/singleStore/:storeId/:myslug?', {
        templateUrl: 'app/store/views/singleStore.html',
        controller: 'SingleStoreController',
        controllerAs: 'ssc'
      })*/;
  }]);


function redirectIfNotAuthenticated($q, $timeout,$auth,changeBrowserURL) {
            var defer = $q.defer();
            if($auth.isAuthenticated()) {
              defer.resolve(); /* (3) */
            } else {
              $timeout(function () {
                changeBrowserURL.changeBrowserURLMethod('/login');//$state.go(‘login’); /* (4) */
              });
              defer.reject();
            }
            return defer.promise;
}
          

