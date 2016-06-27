angular.module('myApp',
  ['ngRoute','ngCookies','ngMessages','satellizer',
  'authModApp','app.common','app.home','app.store','ngMaterial','app.review']
  ).config(['$routeProvider','$mdThemingProvider',
  function($routeProvider,$mdThemingProvider) {
      $mdThemingProvider.theme('default')
    .primaryPalette('amber')
    .accentPalette('orange')
     .warnPalette('blue');
     //.backgroundPalette('blue-grey');
      $routeProvider.
      otherwise({
        redirectTo: '/home'
      });
  }]);

// red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,
//light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
// .config(function($mdThemingProvider) {
//   $mdThemingProvider.theme('default')
//     .primaryPalette('pink')
//     .accentPalette('orange');
// });

angular.module('app.store',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/store', {
        templateUrl: 'app/store/storePost.html',
        controller: 'StoreController',
        controllerAs: 'sm'
      }).when('/store/storesCollection/storeName/:storeName/:location/:slug?', {
        templateUrl: 'app/store/storesNameCollection.html',
        controller: 'StoreNameCollectionController',
        controllerAs: 'sncc'
      }).when('/store/storesCollection/category/:category/:location/:slug?', {
        templateUrl: 'app/store/storesCategoryCollection.html',
        controller: 'StoreCategoryCollectionController',
        controllerAs: 'sccc'
      }).when('/store/singleStore/:storeId/:myslug?/', {
        templateUrl: 'app/store/singleStore.html',
        controller: 'SingleStoreController',
        controllerAs: 'ssc'
      });
  }]);

(function(angular){
'use strict';

/**
 * @ngdoc overview
 * @name authModApp
 * @description
 * # authModApp
 *
 * Main module of the application.
 */
angular
  .module('authModApp', [
    'ngCookies',
    'ngRoute',
    'satellizer'
  ])
  .config(function ($routeProvider,$httpProvider,$authProvider) {
    $routeProvider
      .when('/signup',{
        templateUrl:'app/authentication/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rcl'
      })
      .when('/logout',{
        controller: 'LogoutCtrl'
      })
      .when('/login', {
        templateUrl: 'app/authentication/views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });
      $authProvider.loginUrl = "http://localhost:3000/authenticate/login";
      $authProvider.signupUrl = "http://localhost:3000/authenticate/signup";

      $authProvider.facebook({
        clientId: '1068203956594250',
        url:'http://localhost:3000/authenticate/auth/facebook',
        redirectUri: 'http://localhost:3000/'
      });
      //$httpProvider.interceptors.push('authInterceptor');
  });
})(window.angular);

(function(angular){
'use strict';
angular.module('app.common',[]);
})(window.angular);
//mongod --config C:\Program Files\MongoDB\mongo.config

//mongod.exe --storageEngine=mmapv1

//https://www.npmjs.com/package/ng-file-upload#node

//tvBBDUqIvQAAAAAAAAAACDM-ioz0dFLdYfD6B60bpAKBpHNB79L42WhumJM_DAYG dropbox access token

//du2b4powv cloudinary cloud name

(function(angular){
	angular.module('app.home',[])
		.config(['$routeProvider',config]);
		 function config($routeProvider) {
		    $routeProvider.
		      when('/home', {
		        templateUrl: 'app/home/homePage.html',
		        controller: 'HomeController',
		        controllerAs: 'hm'
		      });
		 }

})(window.angular);



//mongod --config C:\Program Files\MongoDB\mongo.config

//mongod.exe --storageEngine=mmapv1

//https://devdactic.com/restful-api-user-authentication-1/

//passport js angularjs
//https://github.com/DaftMonk/angular-passport
//https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=passport%20js%20angularjs

//http://speakingaword.blogspot.in/2013/08/authentication-in-angularjs-nodejs-and.html

(function(angular){

  'use strict';

  /**
   * @ngdoc overview
   * @name app.review
   * @description
   * # app.review
   *
   * Review module of the application.
   */
  angular.module('app.review',[]);
})(window.angular);

angular.module('app.store',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/store', {
        templateUrl: 'app/store/storePost.html',
        controller: 'StoreController',
        controllerAs: 'sm'
      }).when('/store/storesCollection/storeName/:storeName/:location/:slug?', {
        templateUrl: 'app/store/storesNameCollection.html',
        controller: 'StoreNameCollectionController',
        controllerAs: 'sncc'
      }).when('/store/storesCollection/category/:category/:location/:slug?', {
        templateUrl: 'app/store/storesCategoryCollection.html',
        controller: 'StoreCategoryCollectionController',
        controllerAs: 'sccc'
      }).when('/store/singleStore/:storeId/:myslug?/', {
        templateUrl: 'app/store/singleStore.html',
        controller: 'SingleStoreController',
        controllerAs: 'ssc'
      });
  }]);

(function(angular){
'use strict';
angular.module('app.common',[]);
})(window.angular);
//mongod --config C:\Program Files\MongoDB\mongo.config

//mongod.exe --storageEngine=mmapv1

//https://www.npmjs.com/package/ng-file-upload#node

//tvBBDUqIvQAAAAAAAAAACDM-ioz0dFLdYfD6B60bpAKBpHNB79L42WhumJM_DAYG dropbox access token

//du2b4powv cloudinary cloud name

(function(angular){
'use strict';
angular.module('app.common')
	.service('citiesService', ["$http",citiesService])
	.service('getCategoryService',[function(){}])
	.service('searchService', ["$http",searchService])
	.service('httpService', ["$http",httpService])
	.service('sortService',[sortService])
	.service('changeBrowserURL', ["$location",changeBrowserURL])
	.service('arrayObjectMapper',[arrayObjectMapper])
	.service('arrayUniqueCopy',[arrayUniqueCopy])
	.service('userLocationService',[userLocationService]);
	function citiesService($http){
   		this.getCities = function() {
   			var gc = this;
   			gc.cityData  = undefined;
      		gc.cityData = $http.get("http://localhost:3000/store/cities");
			return  gc.cityData;
		};
	}
	function searchService($http){
   		this.getSearches = function(userLocation) {
   			console.log("inside http");
   			console.log(userLocation);
   			var gs = this;
   			gs.searchesData  = undefined;
   			var url = "http://localhost:3000/search/searches/"+userLocation;
      		gs.searchesData = $http.get(url);
			return  gs.searchesData;
		};
	}
	function httpService($http){
		this.getService = function(url){
			return $http.get(url);
		};
	}
	function sortService(){
		this.sortByKey = function(array, key) {
		    return array.sort(function(a, b) {
		        var x = a[key]; var y = b[key];
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		    	});
		};
	}

	function changeBrowserURL($location){
		this.changeBrowserURLMethod = function(path){
			$location.path(path);
		};
	}
	function arrayObjectMapper(){
		this.getArrayFunction = function(arrayObj,item){
			var arr1 = [];
			for (var i = arrayObj.length - 1; i >= 0; i--) {
						arr1.push(arrayObj[i][item]);
			}
			return arr1;
		};
	}
	function arrayUniqueCopy(){
		this.getUniqueCopyFunction = function(sourceArray,destArray){
			angular.forEach(sourceArray, function(item){
				if(destArray.indexOf(item)==-1){
					destArray.push(item);
				}

			});
			return destArray;
		};
	}
	function userLocationService(){
		var userLocation = "";
		this.setUserLocation = setUserLocation;
		this.getUserLocation = getUserLocation;

		function setUserLocation(userLocation2){
			userLocation = userLocation2;
		}
		function getUserLocation(){
			return userLocation;
		}
	}
	function ajaxURL(){
		this.port = 3000;
		this.host = "localhost:";
		this.protocol = "https:";
		this.baseUrl = this.protocol+"//"+this.host+this.port+"/";

		this.getStoresWithCatgeoryLocation = this.baseUrl + "store/storesCollection/category/";//:category/:location?";
		this.getStoresWithNameLocation = this.baseUrl + "store/storesCollection/storeName/";
		this.getSingleStoreWithId = this.baseUrl + "store/singleStore/";

		this.getProductsWithCatgeoryLocation = this.baseUrl + "product/productsCollection/category/";//:product/:location?";
		this.getProductsWithSubCatgeoryLocation = this.baseUrl + "product/productsCollection/subCategory/";//:product/:location?";
		this.getProductsWithNameLocation = this.baseUrl + "product/productsCollection/productName/";
		this.getProductsWithStoreId = this.baseUrl + "product/productsCollection/store/";
		this.getSingleProductWithId = this.baseUrl + "product/singleProduct/";

		this.getCategoriesWithLocation = this.baseUrl + "categories/location";

	}
})(window.angular);

angular.module('app.store')
  .controller('StoreController',storeController)
  .controller('StoreListController',["httpService","$routeParams","changeBrowserURL","$location",storeListController])
  .controller('StoreNameCollectionController',[storeNameCollectionController])
  .controller('StoreCategoryCollectionController',["$location",storeCategoryCollectionController]);
  function storeNameCollectionController(){

  }
  function storeCategoryCollectionController($location){
    console.log($location.absUrl());
  }

  function storeListController(httpService,$routeParams,changeBrowserURL,$location){
    var slc = this;
    slc.pageNo = 0;
    slc.storesList = [];

    slc.getSingleStore = getSingleStore;
    slc.getStoresCollection = getStoresCollection;
    activate();
    function getSingleStore(store){
      var url = "store/singleStore/"+store._id+"/"+store.myslug;
      changeBrowserURL.changeBrowserURLMethod(url);
    }
    function getStoresCollection(){
      slc.pageNo = slc.pageNo + 1;
      var location = $routeParams['location']||'hyderabad';
var url ='';
      if($location.absUrl().indexOf("/category/")!=-1){
        var category = $routeParams['category'];
        var url = 'http://localhost:3000/store/storesCollection/category/'+category+'/'+location+'/'+slc.pageNo;
      }
      else if($location.absUrl().indexOf("/storeName/")!=-1){
        var storeName = $routeParams['storeName'];
        var url = 'http://localhost:3000/store/storesCollection/storeName/'+storeName+'/'+location+'/'+slc.pageNo;
      }
      else{
        var url = 'http://localhost:3000/store/storesCollection/stores'+'/'+location+'/'+slc.pageNo;
      }

      httpService.getService(url)
      .then(function(response){
        for (var i = response.data.docs.length - 1; i >= 0; i--) {
          slc.storesList.push(response.data.docs[i]);
        };

      },function(response){
        console.log(response)
      });
    }
    function activate(){
      slc.getStoresCollection();
    }

  }
  function storeController($http){
    var sm = this;
    console.log("store controller");
    sm.address = {};
    sm.SendData = function () {
      data = {};
      data.name = sm.name;
      data.city = sm.address.city;
      data.address = sm.address;
      data.category = sm.categoryString.split(",");
      console.log(data.category);
      var config = {
        headers : {
          'Content-Type': 'application/json'
      }
    }
    $http.post("http://localhost:3000/store/store", data, config)
      .then(
        function(response){
          console.log(response);
        },
        function(response){
          console.log(response);
        }
      );
    };
  }

(function(angular){
'use strict';

/**
 * @ngdoc overview
 * @name authModApp
 * @description
 * # authModApp
 *
 * Main module of the application.
 */
angular
  .module('authModApp', [
    'ngCookies',
    'ngRoute',
    'satellizer'
  ])
  .config(function ($routeProvider,$httpProvider,$authProvider) {
    $routeProvider
      .when('/signup',{
        templateUrl:'app/authentication/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rcl'
      })
      .when('/logout',{
        controller: 'LogoutCtrl'
      })
      .when('/login', {
        templateUrl: 'app/authentication/views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });
      $authProvider.loginUrl = "http://localhost:3000/authenticate/login";
      $authProvider.signupUrl = "http://localhost:3000/authenticate/signup";

      $authProvider.facebook({
        clientId: '1068203956594250',
        url:'http://localhost:3000/authenticate/auth/facebook',
        redirectUri: 'http://localhost:3000/'
      });
      //$httpProvider.interceptors.push('authInterceptor');
  });
})(window.angular);

(function(angular){
	angular.module('app.home',[])
		.config(['$routeProvider',config]);
		 function config($routeProvider) {
		    $routeProvider.
		      when('/home', {
		        templateUrl: 'app/home/homePage.html',
		        controller: 'HomeController',
		        controllerAs: 'hm'
		      });
		 }

})(window.angular);


angular.module('app.home')
	.controller("AuthController",["$scope","changeBrowserURL","$auth","$window","userData",authController]);
function authController($scope,changeBrowserURL,$auth,$window,userData){
		var phc = this;
		phc.toHomePage = toHomePage;
		phc.authenticate = authenticate;
		phc.authLogout = authLogout;
		phc.loginPage = loginPage;
		phc.isAuth = $auth.isAuthenticated();
		console.log('*****payload*****');
		console.log($auth.getPayload());
		console.log('*****payload*****');
		console.log("header is"+$auth.isAuthenticated());
		function toHomePage(){
			changeBrowserURL.changeBrowserURLMethod('/');
		}
		function loginPage(){
			changeBrowserURL.changeBrowserURLMethod('/login');
		}
		function authenticate(provider) {
	    	$auth.authenticate(provider);
				console.log('********logoin*******');
	    	console.log($auth.getPayload());
	    	//$window.location.reload();

    	}
    	function authLogout(){
    		$auth.logout();
				console.log('********logout*******');
        console.log(userData.getUser());
        userData.removeUser();
        console.log(userData.getUser());
				toHomePage();
    	}
}

(function(angular){
	angular.module('app.home')
	.controller('HeaderController',["$scope","userData","changeBrowserURL","$auth","$mdDialog", "$mdMedia","$timeout", "$mdSidenav", "$log",headerController]);

	function headerController($scope,userData,changeBrowserURL,$auth,$mdDialog, $mdMedia,$timeout, $mdSidenav, $log){
			var phc = this;
			console.log("header controller*********");
			console.log(userData.getUser());
			phc.toHomePage = toHomePage;
			phc.authenticate = authenticate;
			phc.authLogout = authLogout;
			phc.showAdvanced = showAdvanced;
			phc.customFullscreen = undefined;
			phc.isAuth = $auth.isAuthenticated();
			phc.isOpenLeft = function(){
	      return $mdSidenav('left').isOpen();
	    };
	   phc.toggleLeft = buildToggler('left');

	  function buildToggler(navID) {
	      return function() {
	        // Component lookup should always be available since we are not using `ng-if`
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            $log.debug("toggle " + navID + " is done");
	          });
	      };
	    }
			console.log("header is"+$auth.isAuthenticated());
			function toHomePage(){
				changeBrowserURL.changeBrowserURLMethod('/');
			}
			function authenticate(provider) {
		    	$auth.authenticate(provider);
		    	toHomePage();
	    	}
	    	function authLogout(){
	    		$auth.logout();toHomePage();
	    	}
	    	function showAdvanced(ev) {
			    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			    $mdDialog.show({
			      controller: 'ModalFormLoginController',
			      templateUrl: 'app/home/views/modalFormLogin.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: phc.customFullscreen
			    })
			    .then(function(answer) {
			      $scope.status = 'You said the information was "' + answer + '".';
			    }, function() {
			      $scope.status = 'You cancelled the dialog.';
			    });
			    $scope.$watch(function() {
			    	console.log("From watch",$mdMedia('xl') || $mdMedia('md'));
	      			return $mdMedia('md') || $mdMedia('xl');
	    		}, function(wantsFullScreen) {
		      		phc.customFullscreen = (wantsFullScreen === true);
		      		console.log(phc.customFullscreen);
	    		});

	  		}
	}

})(window.angular);

angular.module('app.home')
	.controller('HomeController',["$scope","citiesService","searchService","changeBrowserURL",homeController])

	.controller('CategoryListController',["$scope","$http","getCategoryService","arrayUniqueCopy","arrayObjectMapper","userLocationService","changeBrowserURL",categoryListController]);
	

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

angular.module('app.home')
	.controller('HomeLeftController',["$timeout", "$mdSidenav", "$log",leftCtrl]);
	function leftCtrl($timeout, $mdSidenav, $log){
  this.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
}

angular.module('app.home')
	.controller('SearchBoxController',["$scope","citiesService","searchService","changeBrowserURL","arrayUniqueCopy","arrayObjectMapper","userLocationService",searchBoxController]);


function searchBoxController($scope,citiesService,searchService,changeBrowserURL,arrayUniqueCopy,arrayObjectMapper,userLocationService){
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
				};
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

(function(angular){

  'use strict';

  /**
   * @ngdoc overview
   * @name app.review
   * @description
   * # app.review
   *
   * Review module of the application.
   */
  angular.module('app.review',[]);
})(window.angular);

angular.module('app.store',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/store', {
        templateUrl: 'app/store/storePost.html',
        controller: 'StoreController',
        controllerAs: 'sm'
      }).when('/store/storesCollection/storeName/:storeName/:location/:slug?', {
        templateUrl: 'app/store/storesNameCollection.html',
        controller: 'StoreNameCollectionController',
        controllerAs: 'sncc'
      }).when('/store/storesCollection/category/:category/:location/:slug?', {
        templateUrl: 'app/store/storesCategoryCollection.html',
        controller: 'StoreCategoryCollectionController',
        controllerAs: 'sccc'
      }).when('/store/singleStore/:storeId/:myslug?/', {
        templateUrl: 'app/store/singleStore.html',
        controller: 'SingleStoreController',
        controllerAs: 'ssc'
      });
  }]);


// 'use strict';
//
// /**
//  * @ngdoc function
//  * @name authModApp.controller:HeaderCtrl
//  * @description
//  * # HeaderCtrl
//  * Controller of the authModApp
//  */
// angular.module('authModApp')
//   .controller('HeaderCtrl', function (userData,$auth,$location) {
//     var hcl = this;
//     hcl.isAuthenticated = isAuthenticated;
//     hcl.logOut = logOut;
//     //console.log($auth.getPayload()["sub"]);
//     function logOut(){
//         $auth.logout();
//         console.log('********logout*******');
//         console.log(userData.getUser());
//         userData.removeUser();
//         console.log(userData.getUser());
//     	$location.path("/");
//     }
//     function isAuthenticated(){
//     	return $auth.isAuthenticated();
//     }
//   });

(function(angular){
'use strict';

/**
 * @ngdoc overview
 * @name authModApp
 * @description
 * # authModApp
 *
 * Main module of the application.
 */
angular
  .module('authModApp', [
    'ngCookies',
    'ngRoute',
    'satellizer'
  ])
  .config(function ($routeProvider,$httpProvider,$authProvider) {
    $routeProvider
      .when('/signup',{
        templateUrl:'app/authentication/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rcl'
      })
      .when('/logout',{
        controller: 'LogoutCtrl'
      })
      .when('/login', {
        templateUrl: 'app/authentication/views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });
      $authProvider.loginUrl = "http://localhost:3000/authenticate/login";
      $authProvider.signupUrl = "http://localhost:3000/authenticate/signup";

      $authProvider.facebook({
        clientId: '1068203956594250',
        url:'http://localhost:3000/authenticate/auth/facebook',
        redirectUri: 'http://localhost:3000/'
      });
      //$httpProvider.interceptors.push('authInterceptor');
  });
})(window.angular);

(function(angular){
'use strict';

/**
 * @ngdoc function
 * @name authModApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the authModApp
 */
angular.module('authModApp')
  .controller('LoginController', ["$location","$auth","userData",loginCtrl]);

  function loginCtrl($location,$auth,userData) {
    var logCl = this;
    logCl.user = {};
    logCl.submitLogin = submitLogin;
    logCl.signUp = signUp;
    console.log("form thr ontdg");
    logCl.authenticate = function(provider) {
      $auth.authenticate(provider);
      $location.path("/");

    };
    function signUp(){
      $location.path("/signup");
    }
    function submitLogin(){
    	//authorize.login(logCl.user)
      $auth.login(logCl.user)
    	.then(function(response){
	    		$location.path("/");
          userData.setUser(response.data.user);
          console.log(userData.getUser());
    		},function(response){
    			console.log(response);
    		});
    }
  }

})(window.angular);
  /* please work
	<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1068203956594250',
      xfbml      : true,
      version    : 'v2.6'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
  */

// 'use strict';
//
// /**
//  * @ngdoc function
//  * @name authModApp.controller:LogoutCtrl
//  * @description
//  * # LogoutCtrl
//  * Controller of the authModApp
//  */
// angular.module('authModApp')
//   .controller('LogoutCtrl', function ($location,authToken) {
//     var lcl = this;
//     authToken.removeToken();
//     $location.path("/");
//   });

(function(angular){
'use strict';

/**
 * @ngdoc function
 * @name authModApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the authModApp
 */
angular.module('authModApp')
	.controller('RegisterCtrl', ["$scope","userData","$auth","$location",registerCtrl]);

	function registerCtrl($scope,userData,$auth,$location) {
		var rc = this;
		rc.user = {};
	    rc.formSubmit = formSubmit;
	    //var url = 'http://localhost:8000/register';

	    function formSubmit(){

		    $auth.signup(rc.user)
				.then(function(response){
					console.log(response);
			    		$location.path("/");
			    		$auth.setToken(response.data.token);
			    		userData.setUser(response.data.user);
			    		console.log(userData.getUser());
					},function(response){
						console.log(response);
				});
		}
	}
})(window.angular);
// $http.post(url,rc.user).then(function(res){
			    	// 	authToken.setToken(res.data.token);
			    	// 	console.log(res);
			    	// 	$location.path("/");
			    	// },function(data){
			    	// 	console.log(data);
			    	// });

// 'use strict';
//
// /**
//  * @ngdoc function
//  * @name authModApp.controller:ReviewsCtrl
//  * @description
//  * # ReviewsCtrl
//  * Controller of the authModApp
//  */
//  /*reviews.reviewsList
// reviews.userReview
// reviews.submitReview()*/
// angular.module('authModApp')
//   .controller('ReviewsCtrl', ["$http","$auth",reviewsCtrl]);
//   function reviewsCtrl($http,$auth) {
//     var reviews = this;
//     reviews.user = {};
//     reviews.submitReview = submitReview;
//     $http.get('http://localhost:8000/reviews/user/'+$auth.getPayload()["sub"])
//     	.then(function(response){
//     		console.log(response);
//     	},function(response){
//     		console.log(response);
//     	});
//     function submitReview(){
//     	reviews.user.userId = $auth.getPayload()["sub"];
//     	console.log(reviews.user);
//     	$http.post("http://localhost:8000/reviews",reviews.user)
//     		.then(function(response){
//     			console.log(response);
//     		},function(response){
//     			console.log(response);
//     		});
//
//     }
//   }



/**
 * @ngdoc directive
 * @name authModApp.directive:sameAs
 * @description
 * # sameAs
 */
 (function(angular){
 'use strict';
	angular.module('authModApp')
		.directive('sameAs', function () {
			return {
				require: 'ngModel',
				restrict: 'EA',
				link: function postLink(scope, element, attrs,ngModelCtrl) {
					console.log(scope.$eval(attrs.sameAs));
					function validateEqual(value){
						var valid = (value === scope.$eval(attrs.sameAs));
						ngModelCtrl.$setValidity('equal',valid);
						return valid ? value : undefined;
					}
					ngModelCtrl.$parsers.push(validateEqual);
					ngModelCtrl.$formatters.push(validateEqual);
					scope.$watch(attrs.sameAs,function(){
						ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
					});
				}
			};
		});

})(window.angular);

(function(angular){
'use strict';

/**
 * @ngdoc service
 * @name authModApp.userData
 * @description
 * # userData
 * Factory in the authModApp.
 */
angular.module('authModApp')
  .factory('userData', ['$window',userData]);

  function userData($window) {
    var storage = $window.localStorage;
    var cachedUser={};
    var obj1 =  {
      setUser: function (user) {
        cachedUser = user;
          console.log('**************from factory');
        storage.setItem('user',JSON.stringify(user));
        console.log(JSON.parse(storage.getItem('user')));
      },
      getUser: function(){
        return JSON.parse(storage.getItem('user'));
      //   if(!cachedUser){
      //     cachedUser = storage.getItem('user');
      //   }
      // return cachedUser;
      },
      removeUser: function(){
        cachedUser = null;
        storage.removeItem('user');
      },
      isUserExists: function(){
        if(obj1.getUser()){
          return true;
        }
        return false;
      }
    };
    return obj1;
  }
})(window.angular);

(function(angular){
  'use strict';
  angular.module('app.review')
      .controller('ReviewSubmitController',['$auth','$routeParams','userData','reviewService',reviewSubmitController]);
      function reviewSubmitController($auth,$routeParams,userData,reviewService){
        var rsv  = this;
        rsv.review = {};
        rsv.user = {};
        rsv.review.storeId = $routeParams.storeId;
        console.log('*****review submit******');
        console.log(userData.getUser());
        if(userData.getUser()){
          rsv.review.userId = userData.getUser()._id;
          rsv.user.picture = userData.getUser().picture;
          rsv.user.displayName = userData.getUser().displayName;
        }
        else{
          rsv.review.userId = $auth.getPayload().sub;
        }

        rsv.submitReview = submitReview;

        function submitReview(){
          reviewService.submitStoreReview(rsv.review)
            .then(function(res){
              console.log(res);
            },function(res){
              console.log(res);
            });
        }

      }
})(window.angular);

(function(angular){
  'use strict';
  angular.module('app.review')
      .service('reviewService',['$http','$routeParams',reviewService]);
      function reviewService($http,$routeParams){
        var rs  = this;
        rs.submitStoreReview = submitStoreReview;
        rs.getStoreReviews = getStoreReviews;
        function submitStoreReview(review){
          return $http.post('http://localhost:3000/review/reviews/store/'+review.storeId,review);
        }
        function getStoreReviews(){
          var storeId = $routeParams.storeId;
          return $http.get('http://localhost:3000/review/reviews/store/'+storeId);
        }

      }
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.store')

  .controller('SingleStoreController',["$scope","$location","$anchorScroll","$routeParams","getSingleStore",singleStoreController]);
  function singleStoreController($scope,$location,$anchorScroll,$routeParams,getSingleStore){

  getSingleStore.getStore($routeParams.storeId)
  .then(function(res){
      console.log(res);
    });
    if($location.search().flowto!==undefined){
      var flowId = $location.search().flowto;
      $location.hash(flowId);
      $anchorScroll();
    }
  }
})(window.angular);

(function(angular){
  angular.module('app.store')

    .controller('StoreCategoryCollectionController',["$location",storeCategoryCollectionController]);
    
    function storeCategoryCollectionController($location){
      console.log($location.absUrl());
    }

})(window.angular);

(function(angular){
  angular.module('app.store')

    .controller('StoreListController',["httpService","$routeParams","changeBrowserURL","$location",storeListController])


    function storeListController(httpService,$routeParams,changeBrowserURL,$location){
      var slc = this;
      slc.pageNo = 0;
      slc.storesList = [];

      slc.getSingleStore = getSingleStore;
      slc.getStoresCollection = getStoresCollection;
      activate();
      function getSingleStore(store){
        var url = "store/singleStore/"+store._id+"/"+store.myslug;
        changeBrowserURL.changeBrowserURLMethod(url);
      }
      function getStoresCollection(){
        slc.pageNo = slc.pageNo + 1;
        var location = $routeParams['location']||'hyderabad';
        var url ='';
        if($location.absUrl().indexOf("/category/")!=-1){
          var category = $routeParams['category'];
          var url = 'http://localhost:3000/store/storesCollection/category/'+category+'/'+location+'/'+slc.pageNo;
        }
        else if($location.absUrl().indexOf("/storeName/")!=-1){
          var storeName = $routeParams['storeName'];
          var url = 'http://localhost:3000/store/storesCollection/storeName/'+storeName+'/'+location+'/'+slc.pageNo;
        }
        else{
          var url = 'http://localhost:3000/store/storesCollection/stores'+'/'+location+'/'+slc.pageNo;
        }

        httpService.getService(url)
        .then(function(response){
          for (var i = response.data.docs.length - 1; i >= 0; i--) {
            slc.storesList.push(response.data.docs[i]);
          };

        },function(response){
          console.log(response)
        });
      }
      function activate(){
        slc.getStoresCollection();
      }

    }

})(window.angular);

(function(angular){
  angular.module('app.store')
    .controller('StoreController',storeController)
    .controller('StoreListController',["httpService","$routeParams","changeBrowserURL","$location",storeListController])
    .controller('StoreNameCollectionController',[storeNameCollectionController])
    .controller('StoreCategoryCollectionController',["$location",storeCategoryCollectionController]);
    function storeNameCollectionController(){

    }
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.store')

  .controller('StoreReviewListController',["$scope","$routeParams",'reviewService',storeReviewListController]);
  function storeReviewListController($scope,$routeParams,reviewService){
    var slc = this;
    slc.activate = activate;
    slc.getStoreReviews = getStoreReviews;
    slc.activate();
    function activate(){
      slc.getStoreReviews();
    }
    function getStoreReviews(){
      reviewService.getStoreReviews().then(function(res){
        console.log('****review list****');
        console.log(res);
        slc.reviewList = res.data;
      },function(res){
        console.log(res);
      });
    }


  }
})(window.angular);

(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('getSingleStore',["$http",getSingleStoreWithId]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function getSingleStoreWithId($http){
  this.getStore = getStore;

  function getStore(id){
    return $http.get("http://localhost:3000/store/singleStore/"+id);
  }
}
})(window.angular);
