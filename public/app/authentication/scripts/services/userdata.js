(function(angular){
'use strict';

/**
 * @ngdoc service
 * @name authModApp.userData
 * @description
 * # userData
 * Factory in the authModApp.
 */
angular.module('authModApp')
  .factory('userData',['$window','$auth','$http',userData]);

  function userData($window,$auth,$http) {
    var storage = $window.localStorage;
    var cachedUser={};
    var obj1 =  {
      setUser: function (user) {
        if(user){
          storage.setItem('user',JSON.stringify(user));
          //console.log(storage.getItem('user'));
        }
        else{
          //console.log('Inside for facebook auth')
          var userId = $auth.getPayload().sub;
          if(userId){
            $http.get('http://localhost:3000/authenticate/user/'+userId).then(function(res){
              storage.setItem('user',JSON.stringify(res.data.user));
              //console.log('from storage ..............');
              //console.log(storage.getItem('user'));
            },function(res){
              console.log(res);
            });
          }
        }
      },
      getUser: function(){

        return JSON.parse(storage.getItem('user'));
      //   if(!cachedUser){
      //     cachedUser = storage.getItem('user');
      //   }
      // return cachedUser;
      },
      removeUser: function(){
        cachedUser = null;
        //console.log('***********logged out*************');
        storage.removeItem('user');
      },
      isUserExists: function(){
        if(obj1.getUser()){
          return true;
        }
        return false;
      }
    };
    return obj1;
  }
})(window.angular);
