(function(angular){
  'use strict';
angular.module('app.store')

  .controller('SingleStoreController',["$scope","$location","$anchorScroll","$routeParams","getSingleStore",singleStoreController]);
  function singleStoreController($scope,$location,$anchorScroll,$routeParams,getSingleStore){
    var ssc = this;
    ssc.storeData = {};
  getSingleStore.getStore($routeParams.storeId)
  .then(function(res){
      console.log(res);
      ssc.storeData = res.data;
      console.log('store independe');
      console.log(ssc.storeData.bannerImage);
    });
    if($location.search().flowto!==undefined){
      var flowId = $location.search().flowto;
      $location.hash(flowId);
      $anchorScroll();
    }
  }
})(window.angular);
