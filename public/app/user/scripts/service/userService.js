(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.user')
  .service('userService',["$http","baseUrlService",UserService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function UserService($http,baseUrlService){
  this.getSingleUser = getSingleUser;
  this.getStoreRating = getStoreRating;
  this.submitUserFollow = submitUserFollow;
  this.deleteUserFollow = deleteUserFollow;
  this.checkUserFollow = checkUserFollow;
  function getSingleUser(id){
    return $http.get(baseUrlService.baseUrl+"user/singleUser/"+id);
    
  }
  function getStoreRating(id){
  	return $http.get(baseUrlService.baseUrl+"review/ratings/store/"+id);
  }

  function submitUserFollow(userId,followedId){
    console.log("submit follow");
    return $http.post(baseUrlService.baseUrl+"user/submitFollow/"+userId+'/'+followedId);
  }
  function deleteUserFollow(userId,followedId){
    console.log("delete follow");
    return $http.post(baseUrlService.baseUrl+"user/deleteFollow/"+userId+'/'+followedId);
  }
  function checkUserFollow(userId,followedId){
    console.log("check follow");
    return $http.get(baseUrlService.baseUrl+"user/checkFollow/"+userId+'/'+followedId);
  }

  

}
})(window.angular);
