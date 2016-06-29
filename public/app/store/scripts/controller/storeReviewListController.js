(function(angular){
  'use strict';
angular.module('app.store')

  .controller('StoreReviewListController',["$scope","$routeParams",'reviewService',storeReviewListController]);
  function storeReviewListController($scope,$routeParams,reviewService){
    var slc = this;
    slc.activate = activate;
    slc.getStoreReviews = getStoreReviews;
    slc.getRating = getRating;
    slc.activate();
    function activate(){
      slc.getStoreReviews();
    }
    function getStoreReviews(){
      reviewService.getStoreReviews().then(function(res){
        console.log('****review list****');
        console.log(res);
        slc.reviewList = res.data;
      },function(res){
        console.log(res);
      });
    }
    function getRating(review){

      var rating2 = parseInt(review.rating);
      var x = [];
      for(var i=0;i<rating2;i++){
        x.push(i);
      }
      console.log(x);
      return x;
    }


  }
})(window.angular);
