(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('getSingleStore',["$http",GetSingleStoreWithId]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function GetSingleStoreWithId($http){
  this.getStore = getStore;

  function getStore(id){
    return $http.get("http://localhost:3000/store/singleStore/"+id);
  }
}
})(window.angular);
