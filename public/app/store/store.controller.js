angular.module('app.store')
	.controller('StoreController',storeController)
  .controller('StoreListController',["$http","$routeParams",storeListController]);
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
  function storeListController($http,$routeParams){
    console.log($routeParams);
    var location = $routeParams['location'];
    var storeName = $routeParams['storeName'];
    var url = 'http://localhost:3000/store/'+storeName+'/'+location;
    $http.get(url).then(function(response){
      console.log("storeList");
      
      console.log(response)
    },function(response){
      console.log(response)
    });
  }



