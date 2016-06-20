angular.module('app.home')
	.controller('HomeController',["$scope","citiesService","searchService","changeBrowserURL",homeController])
	
	.controller('CategoryListController',["$scope","$http","getCategoryService","arrayUniqueCopy","arrayObjectMapper","userLocationService","changeBrowserURL",categoryListController])
	.controller('ModalFormLoginController',["$scope","$mdDialog",modalFormLoginController]);
	
	
	function modalFormLoginController($scope,$mdDialog){
		$scope.hide = function() {
    		$mdDialog.hide();
  		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}
	
	function categoryListController($scope,$http,getCategoryService,arrayUniqueCopy,arrayObjectMapper,userLocationService,changeBrowserURL){
		var clc = this;
		clc.cateList = [];
		clc.categLoadMore = false;
		clc.pageNo = 0; //for fetching categories 
		clc.getCategories = getCategories;
		clc.categoryLinkClicked = categoryLinkClicked;
		activate();

		function activate(){
			clc.getCategories();
		}
		function categoryLinkClicked(category){
			var location = userLocationService.getUserLocation();
			var slug = category + "-stores-in-" + location;
			var url = "/store/storesCollection/category/"+category+"/"+location+"/"+slug;
			console.log(url);
			changeBrowserURL.changeBrowserURLMethod(url);	
			

		}
		function getCategories(){
			//getCategoryService.getCategoryList
			
			clc.pageNo = clc.pageNo + 1;
			var url = "http://localhost:3000/store/categories/"+""+clc.pageNo;
			$http.get(url)
				.then(
					function(response){
						angular.forEach(response.data.docs, function(item){
							clc.cateList = arrayUniqueCopy.getUniqueCopyFunction(item.category,clc.cateList);	
						});
						console.log(clc.cateList);
						
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