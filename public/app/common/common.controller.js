angular.module('app.home')
	.controller('HomeController',homeController);
	function homeController($http){
		console.log("home controller");
		$http.get("http://localhost:3000/store/cities").then(function(obj){
			console.log("cities");
			console.log(obj);
		}).then(function(data){
			console.log(data);
		});
	}

/*git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo*/