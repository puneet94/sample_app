angular.module('app.store')
  .controller('StoreController',storeController)
  .controller('SingleStoreController',["$scope","$location","$anchorScroll",singleStoreController])
  .controller('StoreListController',["httpService","$routeParams","changeBrowserURL",storeListController]);

  function singleStoreController($scope,$location,$anchorScroll){
    console.log("single store controller yooyyooy");
    if($location.search()["flowto"]!==undefined){
      var flowId = $location.search()["flowto"];
      $location.hash(flowId);
      $anchorScroll();  
    }   
  }
  function storeListController(httpService,$routeParams,changeBrowserURL){
    var slc = this;
    activate();
    slc.getSingleStore = getSingleStore;
    function getSingleStore(store){
      var url = "singleStore/"+store._id+"/"+store.myslug;
      changeBrowserURL.changeBrowserURLMethod(url);
    }
    function activate(){
      var location = $routeParams['location'];
      var storeName = $routeParams['storeName'];
      var url = 'http://localhost:3000/store/storesCollection/'+storeName+'/'+location;
      httpService.getService(url)
      .then(function(response){
        slc.storesList = response.data;
      },function(response){
        console.log(response)
      });
    }
    
  }
  function storeController($http){
    var sm = this;
    console.log("store controller");
    sm.address = {};
    sm.SendData = function () {
      data = {};
      data.name = sm.name;
      data.city = sm.address.city;
      data.address = sm.address;
      data.category = sm.categoryString.split(",");
      console.log(data.category);
      var config = {
        headers : {
          'Content-Type': 'application/json'  
      }
    }
    $http.post("http://localhost:3000/store/stores", data, config)
      .then(
        function(response){         
          console.log(response);
        }, 
        function(response){
          console.log(response);
        }
      );
    };
  }



