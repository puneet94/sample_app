(function(angular){
  'use strict';
angular.module('app.review')

  .controller('StoreReviewListController',["$scope","$auth","$routeParams",'$route','reviewService','userData',StoreReviewListController]);
  function StoreReviewListController($scope,$auth,$routeParams,$route,reviewService,userData){
    var slc = this;
    slc.activate = activate;
    slc.getStoreReviews = getStoreReviews;
    slc.getRating = getRating;
    slc.userReviewUpvoted = userReviewUpvoted;
    slc.authCheck = $auth.isAuthenticated();
    slc.submitUserReviewUpvote = submitUserReviewUpvote;
    slc.deleteUserReviewUpvote = deleteUserReviewUpvote;
    
    if(slc.authCheck){
      slc.userUpvotes  = userData.getUser().upvotes;
    }
    slc.submitUserReviewUpvote = submitUserReviewUpvote;
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

    function userReviewUpvoted(locReview){
      console.log(locReview.upvotes);
      var upArr = locReview.upvotes;
      for(var i=0;i<upArr.length;i++){
        if(slc.userUpvotes.indexOf(upArr[i])!=-1){
          console.log("bang");
          slc.currentUpvoteId = upArr[i];
          console.log(upArr[i]); 
          return true;
        }
      }
      
      console.log("no bang");
      //return false;
    }

    function submitUserReviewUpvote(review){
      reviewService.submitUserReviewUpvote({"reviewId":review._id,"storeId":$routeParams.storeId,"userId":userData.getUser()._id})
      .then(function(res){
        console.log("from user review submit");
        console.log(res);
        review.upvotes.push(res.data.id);
        slc.userUpvotes.push(res.data.id);
        //$route.reload();
        
      });
    }
    function deleteUserReviewUpvote(review){
      reviewService.deleteUserReviewUpvote({"reviewId":review._id,"storeId":$routeParams.storeId,"userId":userData.getUser()._id})
      .then(function(res){
        console.log(res);
        review.upvotes.splice(review.upvotes.indexOf(res.data.id), 1);
        slc.userUpvotes.splice(review.upvotes.indexOf(res.data.id), 1);
        
      });

    }

  }
})(window.angular);
