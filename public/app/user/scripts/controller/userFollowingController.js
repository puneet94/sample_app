/*
  * Controller for the list of users which a single user follows
*/
(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserFollowingController',["$scope","$auth",'$location','$routeParams',"userData","userService",UserFollowingController]);
  function UserFollowingController($scope,$auth,$location,$routeParams,userData,userService){
    var ufc = this;
    activate();

    ufc.loading = true;
    ufc.authCheck = $auth.isAuthenticated();
    ufc.followingList = [];
    ufc.getUserPage = userData.getUserPage;
    function activate(){
      ufc.loading = true;
      userService.getUserFollowing($routeParams.userId)
    .then(function(res){
        ufc.followingList = res.data;
        ufc.loading = false;
      });
    }


    }

})(window.angular);
