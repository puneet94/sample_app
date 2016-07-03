(function(angular){
  angular.module('app.store')

    .controller('UserStoreVisitController',["$scope","$window","$auth","$routeParams","userData","storeData","userVisitService",UserStoreVisitController]);

    function UserStoreVisitController($scope,$window,$auth,$routeParams,userData,storeData,userVisitService){
      var usv = this;
      usv.visit = {};
      usv.visitCheck = false;
      console.log('checking store data inside controller');
      console.log(userData.getUser());
      usv.toggleVisitCheck = toggleVisitCheck;
      usv.visit.storeId = $routeParams.storeId;
      usv.userStoreVisited = userStoreVisited;
      activate();

      function userStoreVisited(storeData){
        //userData.setUser();
        console.log('**********visit function called****************');
        for (var storeId in storeData.visits) {
          var storeIdSingle = storeData.visits[storeId];
          console.log(storeData.visits[storeId]);
          if (userData.getUser().visits.indexOf(storeIdSingle)!=-1) {
            usv.userStoreVisitId = storeIdSingle;
            usv.visitCheck = true;

          }
        }
      }
      function toggleVisitCheck(){
        console.log('inside togle');
        console.log(usv.visitCheck);
      if(usv.visitCheck){
          if(userData.getUser()){
            usv.visit.userId = userData.getUser()._id;
          }
          else{
            usv.visit.userId = $auth.getPayload().sub;
          }
          userVisitService.submitVisit(usv.visit)
            .then(function(res){
                    console.log(res);
                    userData.setUser();
                  },
                  function(res){
                    console.log(res);
                  });
        }
        else {
          console.log('inside delte visit');
          userVisitService.deleteVisit(usv.userStoreVisitId)
            .then(function(res){
              console.log(res);
              userData.setUser();
              //$window.location.reload();
            },
              function(res)
              {
                console.log(res);
              });
        }
      }
      function activate(){
        userData.setUser();
        userStoreVisited(storeData.getStore());
      }

    }

})(window.angular);
