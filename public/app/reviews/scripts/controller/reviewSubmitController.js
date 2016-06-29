(function(angular){
  'use strict';
  angular.module('app.review')
      .controller('ReviewSubmitController',['$auth','$routeParams','userData','reviewService',reviewSubmitController]);
      function reviewSubmitController($auth,$routeParams,userData,reviewService){
        var rsv  = this;
        rsv.review = {};
        rsv.user = {};
        rsv.review.storeId = $routeParams.storeId;
        rsv.ratingClick = ratingClick;
        
        console.log('*****review submit******');
        console.log(userData.getUser());
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
          console.log("user rating");
          var rating = 6-obj.currentTarget.attributes.value.nodeValue;
          console.log(6-obj.currentTarget.attributes.value.nodeValue);
          rsv.review.rating = rating;
        }
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
