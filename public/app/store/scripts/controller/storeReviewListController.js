(function(angular){
  'use strict';
angular.module('app.store')

  .controller('StoreReviewListController',["$scope","$routeParams",'reviewService',storeReviewListController]);
  function storeReviewListController($scope,$routeParams,reviewService){
    var slc = this;
    slc.activate = activate;
    slc.getStoreReviews = getStoreReviews;
    slc.activate();
    function activate(){
      slc.getStoreReviews();
    }
    function getStoreReviews(){
      reviewService.getStoreReviews().then(function(res){
        console.log(res);
        slc.reviewList = res.data;
      },function(res){
        console.log(res);
      })
    }
    console.log($routeParams['storeId']);
    console.log("review controller ");

  }
})(window.angular);
