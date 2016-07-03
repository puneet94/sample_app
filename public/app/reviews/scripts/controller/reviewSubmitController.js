(function(angular){
  'use strict';
  angular.module('app.review')
      .controller('ReviewSubmitController',['$auth','$routeParams','$route','userData','reviewService',ReviewSubmitController]);
      function ReviewSubmitController($auth,$routeParams,$route,userData,reviewService){
        var rsv  = this;
        rsv.review = {};
        rsv.user = {};
        rsv.review.storeId = $routeParams.storeId;
        rsv.ratingClick = ratingClick;

        if(userData.getUser()){
          rsv.review.userId = userData.getUser()._id;
          rsv.user.picture = userData.getUser().picture;
          rsv.user.displayName = userData.getUser().displayName;
        }
        else{
          rsv.review.userId = $auth.getPayload().sub;
        }

        rsv.submitReview = submitReview;
        function ratingClick(obj){

          var rating = 6-obj.currentTarget.attributes.value.nodeValue;

          rsv.review.rating = rating;
        }
        function submitReview(){
          reviewService.submitStoreReview(rsv.review)
            .then(function(res){
              userData.setUser();
              $route.reload();
            },function(res){

            });
        }

      }
})(window.angular);
