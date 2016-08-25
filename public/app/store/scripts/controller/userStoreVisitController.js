(function(angular){
  angular.module('app.store')

    .controller('UserStoreVisitController',["$scope","$auth","$routeParams","userData","userVisitService",UserStoreVisitController]);

    function UserStoreVisitController($scope,$auth,$routeParams,userData,userVisitService){
      var usv = this;
      usv.visit = {};
      usv.visitCheck = false;
      usv.getVisitParamObj = {};
      
      usv.getVisitParamObj.userId = userData.getUser()._id;
      
      activate();

      usv.toggleVisitCheck = toggleVisitCheck;
      usv.userStoreVisited = userStoreVisited;
      if($routeParams.storeId){
        usv.visit.storeId = $routeParams.storeId;
        usv.getVisitParamObj.storeId = $routeParams.storeId;
        
      }
      else if($routeParams.productId){
        usv.visit.productId = $routeParams.productId;
        usv.getVisitParamObj.productId = $routeParams.productId;
      }

      
      

      function userStoreVisited(){
        //userData.setUser();
        userVisitService.getVisit(usv.getVisitParamObj)
          .then(function(res){
            if(res.data.length){
                usv.visitCheck = true;
                usv.userVisitId  = res.data[0]._id;
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
          console.log('************************************');
          console.log(usv.visit);
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
          userVisitService.deleteVisit(usv.userVisitId)
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
