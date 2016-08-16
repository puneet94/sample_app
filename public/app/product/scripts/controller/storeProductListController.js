(function(angular){
  'use strict';
angular.module('app.product')
  .controller('StoreProductListController',["$scope","$auth",'$location','scrollToIdService',"$routeParams","getProductsService",StoreProductListController]);
  function StoreProductListController($scope,$auth,$location,scrollToIdService,$routeParams,getProductsService){
    var splc = this;
    splc.storeProductsList = [];
    splc.pageNo = 0;
    splc.getSingleProduct = getSingleProduct;
    activate();

    function getSingleProduct(){
      //Implement click for single product
    }
    function activate(){
    	getProductsService.getStoreProductsList($routeParams.storeId).then(function(response){
        console.log("***hit products*****");
        console.log(response);
        splc.storeProductsList = response.data.docs;
      });
    }

  }

})(window.angular);
