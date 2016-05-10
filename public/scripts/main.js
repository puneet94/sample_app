var app = angular.module("myApp",[]);

app.controller("MainController",["$scope","$http",function($scope,$http){
	$scope.entitySelected  = function(searchEntity){
		console.log(searchEntity);
	}
	$scope.locationSelected = function(data){
		console.log(data.location);
		var url = "http://localhost:3000/search/searches/"+data.location;
		$http.get(url).then(function(resource){
			console.log("-------hyderabad---------");
			console.log(data);
			$scope.locationSearchList = resource.data; 
		}).then(function(data){
			console.log(data);
		});	
	};
	$http.get("http://localhost:3000/store/stores").then(function(data){
		console.log("stores");
		console.log(data);
	}).then(function(data){
		console.log(data);
	});
	$http.get("http://localhost:3000/store/cities").then(function(obj){
		console.log("cities");
		$scope.locationList = obj.data;
		console.log(obj.data);
	}).then(function(data){
		console.log(data);
	});

	
	$scope.address = {};
	$scope.SendData = function () {
           data = {};
           data.name = $scope.name;
           data.city = $scope.city;
           data.address = $scope.address;
        	console.log(data);
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
}]);