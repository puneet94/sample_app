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
  this.getStoreCollection = getStoreCollection;

  function getStoreCollection(url,paramData){
    return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
}
})(window.angular);
