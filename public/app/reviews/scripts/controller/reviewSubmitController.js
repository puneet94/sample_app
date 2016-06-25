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
