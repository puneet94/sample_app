angular.module('app.store')
	.controller('StoreController',storeController)
  .controller('SingleStoreController',singleStoreController)
  .controller('StoreListController',["httpService","$routeParams","changeBrowserURL",storeListController]);
	function storeController($http){
		var sm = this;
		console.log("store controller");
		sm.address = {};
		sm.SendData = function () {
           data = {};
           
           data.name = sm.name;
           data.city = sm.address.city;
           data.address = sm.address;
        	console.log('******data*****');
        	console.log(data);
        	console.log('******sm.address*****');
        	console.log(sm.address);
            var config = {
                headers : {
                    'Content-Type': 'application/json'
                    
                }
            }
            $http.post("http://localhost:3000/store/stores", data, config)
   				.then(
			       function(response){
			         // success callback
			         console.log(response);
			       }, 
			       function(response){
			         // failure callback
			         console.log(response);
			       }
    		);
            
        };
	}
  function singleStoreController(){
    console.log("single store controller");
  }
  function storeListController(httpService,$routeParams,changeBrowserURL){
    var slc = this;
    activate();
    slc.getSingleStore = getSingleStore;
    function getSingleStore(store){
      console.log("getSingleStore function");
      var url = "singleStore/"+store._id+"/"+store.myslug;
      changeBrowserURL.changeBrowserURLMethod(url);
    }
    function activate(){
      var location = $routeParams['location'];
      var storeName = $routeParams['storeName'];
      var url = 'http://localhost:3000/store/storesCollection/'+storeName+'/'+location;
      httpService.getService(url)
        .then(function(response){
          console.log("stores collection");
          console.log(response.data);
          slc.storesList = response.data;
        },function(response){
          console.log(response)
        });
    }
    
  }



