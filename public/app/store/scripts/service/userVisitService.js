(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('userVisitService',["$http",UserVisitService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function UserVisitService($http){
  this.submitVisit = submitVisit;
  this.deleteVisit = deleteVisit;
  function submitVisit(visitData){
    return $http.post("http://localhost:3000/visit/visits/store",visitData);
  }
  function deleteVisit(visitId){
    return $http.delete("http://localhost:3000/visit/visits/"+visitId);
  }
}
})(window.angular);
