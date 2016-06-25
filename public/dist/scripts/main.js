(function(angular){

  'use strict';

  /**
   * @ngdoc overview
   * @name app.review
   * @description
   * # app.review
   *
   * Review module of the application.
   */
  angular.module('app.review',['authModApp']);
})(window.angular);

(function(angular){
  'use strict';
  angular.module('app.review')
      .controller('ReviewSubmitController',['$auth','$routeParams','userData','reviewService',reviewSubmitController]);
      function reviewSubmitController($auth,$routeParams,userData,reviewService){
        var rsv  = this;
        rsv.review = {};
        rsv.review.storeId = $routeParams.storeId;
        if(userData.getUser()){
          rsv.review.userId = userData.getUser()._id;
        }
        else{
          rsv.review.userId = $auth.getPayload().sub;
        }

        rsv.submitReview = submitReview;

        function submitReview(){
          reviewService.submitStoreReview(rsv.review)
            .then(function(res){
              console.log(res);
            },function(res){
              console.log(res);
            });
        }

      }
})(window.angular);

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
          var storeId = $routeParams['storeId'];
          return $http.get('http://localhost:3000/review/reviews/store/'+storeId);
        }

      }
})(window.angular);
