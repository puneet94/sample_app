(function(angular){
  'use strict';
  angular.module('app.review')
      .controller('ReviewSubmitController',['$auth','$routeParams','userData',reviewSubmitController]);
      function reviewSubmitController($auth,$window,$routeParams,userData){
        var rsv  = this;
        rsv.review = {};
        rsv.review.storeId = $routeParams.storeId;
        rsv.review.userId = $auth.getPayload().sub;
        rsv.submitReview = submitReview;

        function submitReview(){
          
        }

      }
})(window.angular);
