(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('getSingleStore',["$http","storeData",GetSingleStoreWithId]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function GetSingleStoreWithId($http,storeData){
  this.getStore = getStore;

  function getStore(id){
    return $http.get("http://localhost:3000/store/singleStore/"+id);
    // return $http.get("http://localhost:3000/store/singleStore/"+id).then(function(res){
    //   storeData.setStore(res.data);
    // });
  }
}
})(window.angular);
