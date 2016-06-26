(function(angular){
  'use strict';
  angular.module('app.review')
      .service('reviewService',['$http','$routeParams',reviewService]);
      function reviewService($http,$routeParams){
        var rs  = this;
        rs.submitStoreReview = submitStoreReview;
        rs.getStoreReviews = getStoreReviews;
        function submitStoreReview(review){
          return $http.post('http://localhost:3000/review/reviews/store/'+review.storeId,review);
        }
        function getStoreReviews(){
          var storeId = $routeParams.storeId;
          return $http.get('http://localhost:3000/review/reviews/store/'+storeId);
        }

      }
})(window.angular);
