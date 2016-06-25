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
  .factory('userData', ['$window',userData]);

  function userData($window) {
    var storage = $window.localStorage;
    var cachedUser={};
    var obj1 =  {
      setUser: function (user) {
        cachedUser = user;
          console.log('**************from factory');
        storage.setItem('user',JSON.stringify(user));
        console.log(JSON.parse(storage.getItem('user')));
      },
      getUser: function(){
        return JSON.parse(storage.getItem('user'));
        if(!cachedUser){
          cachedUser = storage.getItem('user');
        }
      return cachedUser;
      },
      removeUser: function(){
        cachedUser = null;
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
