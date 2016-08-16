(function(angular){
  'use strict';

angular.module('app.product')
  .service('getProductsService',["$http","storeData","baseUrlService",GetProductsService]);

/*
  * This servic has a function to get collection of stores`
*/
function GetProductsService($http,storeData,baseUrlService){
  this.getStoreProductsList = getStoreProductsList;

  function getStoreProductsList(storeId){
  	var pageNo = 1;
  	return $http.get(baseUrlService.baseUrl+'product/products/store/'+storeId+"/"+pageNo);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
}
})(window.angular);
