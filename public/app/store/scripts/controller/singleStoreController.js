(function(angular){
  'use strict';
angular.module('app.store')

  .controller('SingleStoreController',["$scope","$location","$anchorScroll","$routeParams","getSingleStore",singleStoreController]);
  function singleStoreController($scope,$location,$anchorScroll,$routeParams,getSingleStore){
    console.log($routeParams['storeId']);
    console.log("single store controller yooyyooy");
  getSingleStore.getStore($routeParams['storeId'])
  .then(function(res){
      console.log(res);
    });
    if($location.search()["flowto"]!==undefined){
      var flowId = $location.search()["flowto"];
      $location.hash(flowId);
      $anchorScroll();
    }
  }
})(window.angular);
