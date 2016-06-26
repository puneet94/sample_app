(function(angular){
  angular.module('app.store')
    .controller('StoreController',storeController)
    .controller('StoreListController',["httpService","$routeParams","changeBrowserURL","$location",storeListController])
    .controller('StoreNameCollectionController',[storeNameCollectionController])
    .controller('StoreCategoryCollectionController',["$location",storeCategoryCollectionController]);
    function storeNameCollectionController(){

    }
})(window.angular);
