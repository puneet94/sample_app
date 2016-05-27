angular.module('app.home')
	.controller('HomeController',["$scope","citiesService","searchService","changeBrowserURL",homeController])
	.controller('HeaderController',["$scope","changeBrowserURL",headerController])
	.controller('SearchBoxController',["$scope","citiesService","searchService","changeBrowserURL","arrayUniqueCopy","arrayObjectMapper",searchBoxController])
	.controller('CategoryListController',["$scope","$http","getCategoryService","arrayUniqueCopy","arrayObjectMapper",categoryListController]);
	function searchBoxController($scope,citiesService,searchService,changeBrowserURL,arrayUniqueCopy,arrayObjectMapper){
		var hm= this;
		activate();
		hm.searchTextChange = searchTextChange;
		hm.selectedItemChange = selectedItemChange;
		hm.userSearchItemChange = userSearchItemChange;

		function userSearchItemChange(item){
			var changeEntity = item.userSearchString.split("#&#")[1];
			var entityName = item.userSearchString.split("#&#")[0];
			var location = item.userSearchString.split("#&#")[2];
			
			if(changeEntity == "store"){
				var slug = entityName + "-stores-in-" + location;
				var url = "/store/storesCollection/storeName/"+entityName+"/"+location+"/"+slug;
				
				changeBrowserURL.changeBrowserURLMethod(url);	
			}
			else if(changeEntity == "store-category"){
				var slug = entityName + "-stores-in-" + location;
				var url = "/store/storesCollection/category/"+entityName+"/"+location+"/"+slug;
				console.log(url);
				changeBrowserURL.changeBrowserURLMethod(url);	
			}
			else if(changeEntity == "product"){
				var slug = entityName + "-in-" + location;
				var url = "/product/singleProductName/"+entityName+"/"+location+"/"+slug;
				changeBrowserURL.changeBrowserURLMethod(url);	
			}
			else if(changeEntity == "product-category"){
				var slug = entityName + "-products-in-" + location;
				var url = "/product/productsCollectionCategory/"+entityName+"/"+location+"/"+slug;
				
				changeBrowserURL.changeBrowserURLMethod(url);	
			}
			else if(changeEntity == "product-subcategory"){
				var slug = entityName + "-products-in-" + location;
				var url = "/product/productsCollectionSubCategory/"+entityName+"/"+location+"/"+slug;
				changeBrowserURL.changeBrowserURLMethod(url);	
			}
			

			
		}
		function searchTextChange(searchText){
			console.log(searchText);
		}
		function selectedItemChange(item){
			searchService.getSearches(item).then(function(resource){
				hm.userSearches = resource.data;
			},function(data){
				console.log(data);
			});
		}
		

	    function activate() {
	    	citiesService.getCities()
				.then(function(obj){	
					hm.cities = [];	
					hm.cities2 = [];
					hm.cities2 = arrayObjectMapper.getArrayFunction(obj.data,"location");
					hm.cities =  arrayUniqueCopy.getUniqueCopyFunction(hm.cities2,hm.cities);
				},function(obj){
					hm.cities =  obj;
				});
	    }
		
	}
	function headerController($scope,changeBrowserURL){
		var phc = this;
		phc.toHomePage = toHomePage;
		function toHomePage(){
			changeBrowserURL.changeBrowserURLMethod('/');
		}
	}
	function categoryListController($scope,$http,getCategoryService,arrayUniqueCopy,arrayObjectMapper){
		var clc = this;
		clc.cateList = [];
		clc.categLoadMore = false;
		clc.pageNo = 0; //for fetching categories 
		clc.getCategories = getCategories;
		activate();

		function activate(){
			clc.getCategories();
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