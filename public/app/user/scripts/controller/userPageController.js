(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserPageController',["$scope","$auth",'$location','$routeParams',"userData","userService",UserPageController]);
  function UserPageController($scope,$auth,$location,$routeParams,userData,userService){
    var upc = this;
    activate();
    upc.userData = {};
    upc.loading = true;
    upc.authCheck = $auth.isAuthenticated();
    upc.submitUserFollow = submitUserFollow;
    upc.deleteUserFollow = deleteUserFollow;
    upc.userFollowed = userFollowed;

    function submitUserFollow(userId){
      userService.submitUserFollow(userData.getUser()._id,userId).then(function(res){
        console.log(res);
      },function(res){
        console.log(res);
      });  
    }

    function deleteUserFollow(userId){
      userService.deleteUserFollow(userData.getUser()._id,userId).then(function(res){
        console.log(res);
      },function(res){
        console.log(res);
      });  
    }

    function userFollowed(userId){

       userService.checkUserFollow(userData.getUser()._id,userId).then(function(res){
        
         console.log(res);
       },function(res){
         console.log(res);
       });

      return false;  
    }
    function activate(){
      userService.getSingleUser($routeParams.userId)
    .then(function(res){
        upc.userData = res.data;
        upc.loading = false;
        console.log(upc.userData);
      });  
    }
    
    
    }

})(window.angular);
