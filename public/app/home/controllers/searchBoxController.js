(function(angular){
	'use strict';

angular.module('app.home')
	.controller('SearchBoxController',["$scope","$routeParams","citiesService","searchService","changeBrowserURL","userLocationService",SearchBoxController]);


function SearchBoxController($scope,$routeParams,citiesService,searchService,changeBrowserURL,userLocationService){
		var hm= this;
		hm.selectedItem = $routeParams.location||'hyderabad';

		activate();

		hm.userSearches = [];
		hm.selectedItemChange = selectedItemChange;
		hm.userSearchItemChange = userSearchItemChange;
		hm.locationSearch = locationSearch;

		hm.selectedItemChange(hm.selectedItem);
		function userSearchItemChange(item){


			var changeEntity = item.userSearchString.split("#&#")[1];
			var entityName = item.userSearchString.split("#&#")[0];
			var location = hm.selectedItem;
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
			else{

				locationSearchUrl();
			}


			changeBrowserURL.changeBrowserURLMethod(hm.url+entityName+"/"+location+"/"+hm.slug);



		}
		//md-search-text-change="sbc.searchTextChange(sbc.searchText)"
		function searchTextChange(searchText){

		}
		function selectedItemChange(item){
			hm.loading = true;
			userLocationService.setUserLocation(item);
			searchService.getSearches(item).then(function(resource){
				var allStoresItem = {"userSearchString":"#&#All stores in #&#"+hm.selectedItem};
				hm.userSearches = [allStoresItem];
				for (var i = resource.data.length - 1; i >= 0; i--) {
					hm.userSearches.push(resource.data[i]);
				}
				hm.loading = false;
			},function(data){
				console.log(data);
			});
		}
		function locationSearch(){
			if(hm.cities.indexOf(hm.selectedItem)!=-1){
				if(!hm.userSearchText||hm.userSearchText.length===0){
					locationSearchUrl();
				}
			}
		}
		function locationSearchUrl(){
			hm.url = "/store/storesCollection/location";
			var myLocation = hm.selectedItem;
			hm.slug = "stores-in-" + myLocation;
			changeBrowserURL.changeBrowserURLMethod(hm.url+"/"+myLocation+"/"+hm.slug);

		}

	    function activate() {

	    	citiesService.getCities()
				.then(function(obj){

					hm.cities = obj.data;

				},function(obj){
					hm.cities =  obj;
				});
	    }

}
})(window.angular);
