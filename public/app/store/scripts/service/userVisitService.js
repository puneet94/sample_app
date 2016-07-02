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

  function submitVisit(visitData){
    return $http.post("http://localhost:3000/visit/visits/store",visitData);
  }
  function deleteVisit(visitData){
    return $http.delete("http://localhost:3000/visit/visits",{data:visitData});
  }
}
})(window.angular);
