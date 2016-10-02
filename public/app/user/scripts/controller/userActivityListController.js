(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserActivityListController',["$scope",'$http','$location','$routeParams',"activityService",UserActivityListController]);
  function UserActivityListController($scope,$http,$location,$routeParams,activityService){
    var ual = this;
    ual.loading = true;
    activate();
    function activate(){

      ual.loading = true;
        activityService.getSingleUserActivity($routeParams.userId).then(function(result){        
        ual.activityData= result.data;
        ual.loading = false;
      });  
      
      
      
    }


    }

})(window.angular);
