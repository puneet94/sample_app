(function(angular){
  'use strict';
  angular.module('app.review')
      .service('reviewService',['$http','$routeParams','baseUrlService',ReviewService]);
      function ReviewService($http,$routeParams,baseUrlService){
        var rs  = this;
        rs.submitStoreReview = submitStoreReview;
        rs.getStoreReviews = getStoreReviews;
        rs.submitUserReviewUpvote = submitUserReviewUpvote;
        rs.deleteUserReviewUpvote  = deleteUserReviewUpvote;
        rs.getProductReviews = getProductReviews;
        rs.submitProductReview = submitProductReview;
        function submitStoreReview(review){
          return $http.post(baseUrlService.baseUrl+'review/reviews/store/'+review.storeId,review);
        }
        function getStoreReviews(){
          var storeId = $routeParams.storeId;
          return $http.get(baseUrlService.baseUrl+'review/reviews/store/'+storeId);
        }
        function submitProductReview(review){
          return $http.post(baseUrlService.baseUrl+'review/reviews/product/'+review.productId,review);
        }
        function getProductReviews(){
          var productId = $routeParams.productId;
          return $http.get(baseUrlService.baseUrl+'review/reviews/product/'+productId);
        }

        function submitUserReviewUpvote(obj){
          console.log(obj);
          return $http.post(baseUrlService.baseUrl+'upvote/upvotes/review/',obj);
        }
        function deleteUserReviewUpvote(obj){
          
          return $http.delete(baseUrlService.baseUrl+'upvote/upvotes/review/',{"params":obj});
        }
        

      }
})(window.angular);
