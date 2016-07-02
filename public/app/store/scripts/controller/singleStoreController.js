(function(angular){
  'use strict';
angular.module('app.store')

  .controller('SingleStoreController',["$scope",'$location','$anchorScroll',"$routeParams","anchorSmoothScroll","getSingleStore",SingleStoreController]);
  function SingleStoreController($scope,$location,$anchorScroll,$routeParams,anchorSmoothScroll,getSingleStore){
    var ssc = this;
    ssc.storeData = {};
    ssc.flowToId = flowToId;

    getSingleStore.getStore($routeParams.storeId)
    .then(function(res){
        ssc.storeData = res.data;
        console.log('*******stores*****');
        console.log(ssc.storeData);
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
