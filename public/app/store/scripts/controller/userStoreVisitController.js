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

      function userStoreVisited(){
        //userData.setUser();
        userVisitService.getVisit({"storeId":$routeParams.storeId,"userId":userData.getUser()._id})
          .then(function(res){
            if(res.data.length){
                usv.visitCheck = true;
                usv.userStoreVisitId  = res.data[0]._id;
            }

          });
      }
      function toggleVisitCheck(){


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
        userStoreVisited();
      }

    }

})(window.angular);
