(function(angular){
  angular.module('app.store')

    .controller('UserStoreVisitController',["$scope","$auth","$routeParams","userData","userVisitService",UserStoreVisitController]);

    function UserStoreVisitController($scope,$auth,$routeParams,userData,userVisitService){
      var usv = this;
      usv.visit = {};
      usv.toggleVisitCheck = toggleVisitCheck;
      usv.visit.storeId = $routeParams.storeId;
      usv.userStoreVisited = userStoreVisited;
      console.log('*****user from visit*****');
      console.log(userData.getUser());
      function userStoreVisited(storeData){
        console.log('inside visit check');
        for (var storeId in storeData.visits) {
          var storeIdSingle = storeData.visits[storeId];
          if (userData.getUser().visits.indexOf(storeIdSingle)!=-1) {
            console.log('yes');
            return true;
          }
        }
        return false;
      }
      function toggleVisitCheck(){
        if(usv.visitCheck === 'visited'){
          if(userData.getUser()){
            usv.visit.userId = userData.getUser()._id;
          }
          else{
            usv.visit.userId = $auth.getPayload().sub;
          }
          userVisitService.submitVisit(usv.visit).then(function(res){console.log(res);},function(res){console.log(res);});
        }
      }


    }

})(window.angular);
