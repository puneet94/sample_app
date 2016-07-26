(function(angular){
  'use strict';
angular.module('app.store')

  .controller('SingleStoreController',["$scope","$auth",'$location','scrollToIdService',"$routeParams","anchorSmoothScroll","storeData","getSingleStore",SingleStoreController]);
  function SingleStoreController($scope,$auth,$location,scrollToIdService,$routeParams,anchorSmoothScroll,storeData,getSingleStore){
    var ssc = this;
    ssc.storeData = {};
    ssc.loading = true;
    ssc.authCheck = $auth.isAuthenticated();
    ssc.getAddressString = getAddressString;


    function getAddressString(){
      return Object.keys(ssc.storeData.address).map(function(key){return ssc.storeData.address[key];}).join(' ');
    }
    getSingleStore.getStore($routeParams.storeId)
    .then(function(res){
      storeData.setStore(res.data);
        ssc.storeData = res.data;
        ssc.loading = false;
        if($location.search().param){
            scrollToIdService.scrollToId($location.search().param);
        }
      });

    }

})(window.angular);
