(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserFollowersController',["$scope","$auth",'$location','$routeParams',"userData","userService",UserFollowersController]);
  function UserFollowersController($scope,$auth,$location,$routeParams,userData,userService){
    var ufc = this;
    activate();

    ufc.loading = true;
    ufc.authCheck = $auth.isAuthenticated();
    ufc.followersList = [];
        ufc.getUserPage = userData.getUserPage;

    function activate(){
      ufc.loading = true;
      console.log($routeParams);
      userService.getUserFollowers($routeParams.userId)
    .then(function(res){
        ufc.followersList = res.data;
        console.log('*********************');
        console.log(ufc.followersList);
        ufc.loading = false;
      });
    }


    }

})(window.angular);
