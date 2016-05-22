angular.module('app.home')
	.controller('HomeController',["$scope","citiesService","searchService","changeBrowserURL",homeController])
	.controller('HeaderController',["$scope","changeBrowserURL",headerController])
	.controller('SearchBoxController',["$scope","citiesService","searchService","changeBrowserURL",searchBoxController])
	.controller('CategoryListController',["$scope","$http","getCategoryService",categoryListController]);
	function searchBoxController($scope,citiesService,searchService,changeBrowserURL){
		var hm= this;
		activate();
		hm.searchTextChange = searchTextChange;
		hm.selectedItemChange = selectedItemChange;
		hm.userSearchItemChange = userSearchItemChange;

		function userSearchItemChange(item){
			var url = item.userSearchString.split("#&#")[1]+"sCollection/"+item.userSearchString.split("#&#")[0]+"/"+item.userSearchString.split("#&#")[2];
			console.log(url);
			changeBrowserURL.changeBrowserURLMethod(url);
		}
		function searchTextChange(searchText){
			console.log(searchText);
		}
		function selectedItemChange(item){
			//hm.userSearchText = "";
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
	function headerController($scope,changeBrowserURL){
		var phc = this;
		phc.toHomePage = toHomePage;
		function toHomePage(){
			changeBrowserURL.changeBrowserURLMethod('/');
		}
		console.log("header controller");
	}
	function categoryListController($scope,$http,getCategoryService){
		console.log("category list controller");
		var clc = this;
		clc.cateList = [];
		clc.categLoadMore = false;
		clc.pageNo = 1; //for fetching categories 
		clc.fetchMoreCats = fetchMoreCats;
		activate();
		function activate(){
			getCategories();
		}
		function getCategories(){
			//getCategoryService.getCategoryList
			var url = "http://localhost:3000/store/categories/"+""+clc.pageNo;
			$http.get(url)
				.then(
					function(response){
						console.log(response);
						angular.forEach(response.data.docs, function(item){
							angular.forEach(item.category, function(cat1){
								if(clc.cateList.indexOf(cat1)==-1){
									clc.cateList.push(cat1);	
								}
								
						});
						});
						
					},
					function(response){
						console.log(response);
					}
				);
		}
		function fetchMoreCats(){
			clc.pageNo = clc.pageNo + 1;
			var url = "http://localhost:3000/store/categories/"+""+clc.pageNo;
			$http.get(url)
				.then(
					function(response){
						console.log(response);
						if(response.data.docs.length==0){
							clc.categLoadMore = true;
						}
						angular.forEach(response.data.docs, function(item){
							angular.forEach(item.category, function(cat1){
								if(clc.cateList.indexOf(cat1)==-1){
									clc.cateList.push(cat1);	
								}
								
						});
					});
						
					},
					function(response){
						console.log(response);
					}
				);	
		}
	}
	function homeController($scope,citiesService,searchService,changeBrowserURL){
		/*var hm= this;
		activate();
		console.log("home controller");
		hm.searchTextChange = searchTextChange;
		hm.selectedItemChange = selectedItemChange;
		hm.userSearchItemChange = userSearchItemChange;

		function userSearchItemChange(item){
			var url = item.userSearchString.split("#&#")[1]+"/"+item.userSearchString.split("#&#")[0]+"/"+item.userSearchString.split("#&#")[2];
			changeBrowserURL.changeBrowserURLMethod(url);
		}
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
	        
	    }*/
		
	}

/*git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo*/