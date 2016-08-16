angular.module('app.product',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/product/productsCollection/productName/:productName/:location/:slug?', {
        templateUrl: 'app/product/views/productsNameCollection.html',
        controller: 'ProductNameCollectionController',
        controllerAs: 'pncc'
      }).when('/product/productsCollection/category/:category/:location/:slug?', {
        templateUrl: 'app/product/views/productsCategoryCollection.html',
        controller: 'ProductCategoryCollectionController',
        controllerAs: 'pccc'
      }).when('/product/productsCollection/subCategory/:subCategory/:location/:slug?', {
        templateUrl: 'app/product/views/productsSubCategoryCollection.html',
        controller: 'ProductSubCategoryCollectionController',
        controllerAs: 'pscc'
      }).when('/product/singleProduct/:productId/:myslug?', {
        templateUrl: 'app/product/views/singleProduct.html',
        controller: 'SingleProductController',
        controllerAs: 'spc'
      });
  }]);
