(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('getStoreCollectionService',["$http","storeData","baseUrlService",GetStoreCollectionService]);

/*
  * This servic has a function to get collection of stores`
*/
function GetStoreCollectionService($http,storeData,baseUrlService){
  this.getStore = getStore;

  function getStore(id){
    return $http.get(baseUrlService.baseUrl+"store/singleStore/"+id);

  }
}
})(window.angular);
