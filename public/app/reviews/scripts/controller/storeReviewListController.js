(function(angular){
  'use strict';
angular.module('app.review')

  .controller('StoreReviewListController',["$scope","$routeParams",'reviewService',StoreReviewListController]);
  function StoreReviewListController($scope,$routeParams,reviewService){
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
        slc.reviewList = res.data;
        console.log("**************from store list**********");
        console.log(slc.reviewList);
      },function(res){

      });
    }
    function getRating(review){

      var rating2 = parseInt(review.rating);
      var x = [];
      for(var i=0;i<rating2;i++){
        x.push(i);
      }

      return x;
    }


  }
})(window.angular);
