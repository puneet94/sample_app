angular.module('app.home')
	.controller('SearchBoxController',["$scope","citiesService","searchService","changeBrowserURL","arrayUniqueCopy","arrayObjectMapper","userLocationService",SearchBoxController]);


function SearchBoxController($scope,citiesService,searchService,changeBrowserURL,arrayUniqueCopy,arrayObjectMapper,userLocationService){
		var hm= this;
		activate();
		hm.userSearches = [];
		hm.selectedItemChange = selectedItemChange;
		hm.userSearchItemChange = userSearchItemChange;

		function userSearchItemChange(item){

			var changeEntity = item.userSearchString.split("#&#")[1];
			var entityName = item.userSearchString.split("#&#")[0];
			var location = item.userSearchString.split("#&#")[2];
			hm.slug = entityName + "-"+changeEntity.split("-")[0]+"s-in-" + location;
			if(changeEntity == "store"){

				hm.url = "/store/storesCollection/storeName/";


			}
			else if(changeEntity == "store-category"){

				hm.url = "/store/storesCollection/category/";


			}
			else if(changeEntity == "product"){

				hm.url = "/product/singleProductName/";

			}
			else if(changeEntity == "product-category"){

				hm.url = "/product/productsCollectionCategory/";


			}
			else if(changeEntity == "product-subcategory"){

				hm.url = "/product/productsCollectionSubCategory/";

			}
			changeBrowserURL.changeBrowserURLMethod(hm.url+entityName+"/"+location+"/"+hm.slug);



		}
		function searchTextChange(searchText){
			console.log(searchText);
		}
		function selectedItemChange(item){
			userLocationService.setUserLocation(item);
			searchService.getSearches(item).then(function(resource){
				hm.userSearches = [];
				for (var i = resource.data.length - 1; i >= 0; i--) {
					hm.userSearches.push(resource.data[i]);
				}
				console.log(hm.userSearches);
			},function(data){
				console.log(data);
			});
		}


	    function activate() {
	    	citiesService.getCities()
				.then(function(obj){
					console.log(obj);
					hm.cities = [];
					hm.cities2 = [];
					hm.cities2 = arrayObjectMapper.getArrayFunction(obj.data,"location");
					hm.cities =  arrayUniqueCopy.getUniqueCopyFunction(hm.cities2,hm.cities);
					console.log(hm.cities);
				},function(obj){
					hm.cities =  obj;
				});
	    }

}
