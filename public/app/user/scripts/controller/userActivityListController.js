(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserActivityListController',["$scope","$auth",'$http','$location','$routeParams',"userData","userService",UserActivityListController]);
  function UserActivityListController($scope,$auth,$http,$location,$routeParams,userData,userService){
    var ual = this;
    activate();

    ual.loading = true;
    ual.authCheck = $auth.isAuthenticated();
    ual.followersList = [];
    ual.getUserPage = userData.getUserPage;

    function activate(){
      ual.loading = true;
      $http.get('http://localhost:3000/activity/userActivity/'+$auth.getPayload().sub).then(function(result){
        console.log(result.data);
        
        ual.activityData= result.data;
        $scope.activityData = ual.activityData;
        ual.loading = false;
      });
      
    }


    }

})(window.angular);
