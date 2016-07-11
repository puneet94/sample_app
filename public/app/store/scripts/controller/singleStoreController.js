(function(angular){
  'use strict';
angular.module('app.store')

  .controller('SingleStoreController',["$scope","$auth",'$location','$anchorScroll',"$routeParams","anchorSmoothScroll","storeData","getSingleStore",SingleStoreController]);
  function SingleStoreController($scope,$auth,$location,$anchorScroll,$routeParams,anchorSmoothScroll,storeData,getSingleStore){
    var ssc = this;
    ssc.storeData = {};
    ssc.flowToId = flowToId;
    ssc.authCheck = $auth.isAuthenticated();
    getSingleStore.getStore($routeParams.storeId)
    .then(function(res){
      
      
      storeData.setStore(res.data);
        ssc.storeData = res.data;

        
      });
      if($location.search().flowto!==undefined){
        var flowId = $location.search().flowto;
        flowToId(flowId);
      }
      function flowToId(flowId){
        $location.hash(flowId);
        anchorSmoothScroll.scrollTo(flowId);
        //$anchorScroll();
      }
    }

})(window.angular);
