angular.module('app.home')
	.controller('HomeController',homeController);
	function homeController(citiesService,searchService){
		var hm= this;
		activate();
		console.log("home controller");
		hm.searchTextChange = searchTextChange;
		hm.selectedItemChange = selectedItemChange;
		function searchTextChange(searchText){
			console.log(searchText);
		}
		function selectedItemChange(item){
			console.log(item);
			searchService.getSearches(item.location).then(function(resource){
				console.log(resource);
				hm.userSearches = resource.data;
			},function(data){
				console.log(data);
			});
		}
		

	    function activate() {
	    	citiesService.getCities()
				.then(function(obj){			
					console.log(obj);
					hm.cities =  obj.data;
					console.log("then");
					console.log(hm.cities);
				},function(obj){
					console.log(obj);
					hm.cities =  obj;
				});
	        /*return dataservice.getAvengers().then(function(data) {
	            vm.avengers = data;
	            return vm.avengers;
	        });*/
	    }
		
	}

/*git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo*/