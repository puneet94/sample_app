angular.module('myApp',
  ['ngRoute','ngCookies','ngMessages','satellizer',
    'authModApp','app.common','app.home','app.store','ngMaterial','app.review']
  ).config(['$routeProvider','$mdThemingProvider',
  function($routeProvider,$mdThemingProvider) {
      $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('light-blue')
     .warnPalette('blue');
     //.backgroundPalette('blue-grey');
      $routeProvider.
      otherwise({
        redirectTo: '/home'
      });
  }]);

// red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,,
//light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
// .config(function($mdThemingProvider) {
//   $mdThemingProvider.theme('default')
//     .primaryPalette('pink')
//     .accentPalette('orange');
// });

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
  .config(["$routeProvider","$httpProvider","$authProvider",authConfig]);
  function authConfig($routeProvider,$httpProvider,$authProvider) {
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
        url:'http://localhost:3000/authenticate/auth/facebook'
      });
      //$httpProvider.interceptors.push('authInterceptor');
  }
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
      }).when('/store/storesCollection/location/:location/:slug?', {
        templateUrl: 'app/store/views/storesLocationCollection.html',
        controller: 'StoreLocationCollectionController',
        controllerAs: 'slcc'
      }).when('/store/singleStore/:storeId/:myslug?', {
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
	.service('citiesService', ["$http","baseUrlService",CitiesService])
	.service('getCategoryService',[function(){}])
	.service('searchService', ["baseUrlService","$http",SearchService])
	.service('httpService', ["$http",HttpService])
	.service('sortService',[SortService])
	.service('changeBrowserURL', ["$location",ChangeBrowserURL])
	.service('arrayObjectMapper',[ArrayObjectMapper])
	.service('arrayUniqueCopy',[ArrayUniqueCopy])
	.service('userLocationService',[UserLocationService])
	.service('anchorSmoothScroll',[AnchorSmoothScroll])
	.service('baseUrlService',[AjaxURL])
	.service('getCityLocalitiesService',["$http","baseUrlService",GetCityLocalitiesService])
	.service('getCityCategoriesService',["$http","baseUrlService",GetCityCategoriesService]);
	function CitiesService($http,baseUrlService){
   		this.getCities = function() {
   			var gc = this;

      		gc.cityData = $http.get(baseUrlService.baseUrl+"store/cities");
			return  gc.cityData;
		};
	}
	function SearchService(baseUrlService,$http){
   		this.getSearches = function(userLocation) {
   			var gs = this;
   			gs.searchesData  = undefined;
   			var url = baseUrlService.baseUrl+"search/searches/"+userLocation;
      		gs.searchesData = $http.get(url);
			return  gs.searchesData;
		};
	}
	function HttpService($http){
		this.getService = function(url){
			return $http.get(url);
		};
	}
	function SortService(){
		this.sortByKey = function(array, key) {
		    return array.sort(function(a, b) {
		        var x = a[key]; var y = b[key];
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		    	});
		};
	}

	function ChangeBrowserURL($location){
		this.changeBrowserURLMethod = function(path){
			$location.path(path);
		};
	}
	function ArrayObjectMapper(){
		this.getArrayFunction = function(arrayObj,item){
			var arr1 = [];
			for (var i = arrayObj.length - 1; i >= 0; i--) {
						arr1.push(arrayObj[i][item]);
			}
			return arr1;
		};
	}
	function ArrayUniqueCopy(){
		this.getUniqueCopyFunction = function(sourceArray,destArray){
			angular.forEach(sourceArray, function(item){
				if(destArray.indexOf(item)==-1){
					destArray.push(item);
				}

			});
			return destArray;
		};
	}
	function UserLocationService(){
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
	function AjaxURL(){
		this.baseUrl = "http://localhost:3000/";

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
	function AnchorSmoothScroll(){

    this.scrollTo = function(eID) {

        // This scrolling function
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

	}
	function GetCityLocalitiesService($http,baseUrlService){
		this.getCityLocalities = getCityLocalities;
		function getCityLocalities(city){
			return $http.get(baseUrlService.baseUrl+"store/localities/"+city);
		}
	}
	function GetCityCategoriesService($http,baseUrlService){
		this.getCityCategories = getCityCategories;

		function getCityCategories(city){
				return $http.get(baseUrlService.baseUrl+"store/categories/"+city);
		}

	}
})(window.angular);

(function(angular){
  angular.module('app.common')
  .directive('toggleElement',["$window","$location", toggleElement])
  .directive('scrollDown', ["$window","$location", scrollDown])
  .directive('toggleMobile',["$window","$location", toggleMobile])
  .directive('loadingDirective',[loadingDirective]);
  function toggleElement($window,$location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var path = $location.path();

        $(element[0]).on('click',function(){

          if(path.indexOf('/home')==-1){
              $(attrs.toggleElement).slideToggle();
          }

        });



        var lastScrollTop = 0;

        if(path.indexOf('/home')==-1){


        }

      }
    };
  }


function scrollDown($window,$location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var lastScrollTop = 0;
      var path = $location.path();

      if(path.indexOf('/home')==-1){


        $(window).on("scroll", function() {
          windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
          if(path.indexOf('/home')==-1 && ($(window).scrollTop()>170)){
          //  console.log($(document).scrollTop());
            if (windowWidth <= 601 && path.indexOf('/home')==-1 && ($(window).scrollTop()>170)) {
              var st = $(this).scrollTop();
              if (st > lastScrollTop) {

                $('.scrollUpSearch').slideUp("fast");
              } else {

                $('.scrollUpSearch').slideDown("fast");
              }
              lastScrollTop = st;
              scope.$apply();
            }
          }

        });

      }

    }
  };
}

function toggleMobile($window,$location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      $(element).on('click',function(){
        windowWidth = window.innerWidth ? window.innerWidth : $(window).width();

          if (windowWidth <= 961 ) {

            $(attrs.toggleMobile).slideToggle();
            scope.$apply();

          }


      });






    }
  };
}

function loadingDirective() {
      return {
        restrict: 'E',
        replace:true,
        scope:{
          loading:"=loading"
        },
        template: '<div class="ajaxLoadingSpinnerDiv"><div class="ajaxLoadingSpinner"></div></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      };
  }
})(window.angular);


(function(angular){
	'use strict';

	angular.module('app.home')
		.controller("AuthController",["$scope","changeBrowserURL","$auth","$window","$route","userData",AuthController]);
	function AuthController($scope,changeBrowserURL,$auth,$window,$route,userData){
			var phc = this;
			phc.toHomePage = toHomePage;
			phc.authenticate = authenticate;
			phc.authLogout = authLogout;
			phc.loginPage = loginPage;
			phc.isAuth = $auth.isAuthenticated();

			function toHomePage(){
				changeBrowserURL.changeBrowserURLMethod('/');
			}
			function loginPage(){
				changeBrowserURL.changeBrowserURLMethod('/login');
			}
			function authenticate(provider) {
		    	$auth.authenticate(provider).then(function(response) {
						userData.setUser();
						alert('login with facebook successfull');
						$route.reload();

						//$window.location.reload();
						//console.log(response);
	          // $window.localStorage.currentUser = JSON.stringify(response.data.user);
	          // $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
						//console.log('********logoin*******');
			    	//console.log($auth.getPayload());
	        });
	    	}
	    	function authLogout(){
					$auth.logout();
	        userData.removeUser();
					toHomePage();
	    	}
	}


})(window.angular);

(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('HeaderController',["$scope","userData","changeBrowserURL","$auth","$mdDialog", "$mdMedia","$timeout", "$mdSidenav", "$log",HeaderController]);

	function HeaderController($scope,userData,changeBrowserURL,$auth,$mdDialog, $mdMedia,$timeout, $mdSidenav, $log){
			var phc = this;
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

	      			return $mdMedia('md') || $mdMedia('xl');
	    		}, function(wantsFullScreen) {
		      		phc.customFullscreen = (wantsFullScreen === true);

	    		});

	  		}
	}

})(window.angular);

(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('HomeController',["$scope","citiesService","searchService","changeBrowserURL",homeController])

	.controller('CategoryListController',["$scope","$http","getCategoryService","arrayUniqueCopy","arrayObjectMapper","userLocationService","changeBrowserURL","baseUrlService",CategoryListController]);


	function CategoryListController($scope,$http,getCategoryService,arrayUniqueCopy,arrayObjectMapper,userLocationService,changeBrowserURL,baseUrlService){
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
			changeBrowserURL.changeBrowserURLMethod(url);


		}
		function getCategories(){
			//getCategoryService.getCategoryList

			clc.pageNo = clc.pageNo + 1;
			var url = baseUrlService.baseUrl+"store/categories/"+""+clc.pageNo;
			$http.get(url)
				.then(
					function(response){
						angular.forEach(response.data.docs, function(item){
							clc.cateList = arrayUniqueCopy.getUniqueCopyFunction(item.category,clc.cateList);
						});


					},
					function(response){

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
})(window.angular);
/*git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo*/

(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('HomeLeftController',["$timeout", "$mdSidenav", "$log",LeftCtrl]);
	function LeftCtrl($timeout, $mdSidenav, $log){
		this.close = function () {
			// Component lookup should always be available since we are not using `ng-if`
			$mdSidenav('left').close()
			.then(function () {
				$log.debug("close RIGHT is done");
			});
		};
	}
})(window.angular);

(function(angular){
	'use strict';

angular.module('app.home')
	.controller('SearchBoxController',["$scope","$routeParams","citiesService","searchService","changeBrowserURL","userLocationService",SearchBoxController]);


function SearchBoxController($scope,$routeParams,citiesService,searchService,changeBrowserURL,userLocationService){
		var hm= this;
		if($routeParams.location){
				hm.selectedItem = $routeParams.location;
		}
		else if($routeParams.myslug){
			hm.selectedItem = $routeParams.myslug.split("-")[2];
		}
		else{
			hm.selectedItem = 'hyderabad';
		}
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


// 'use strict';
//
// /*
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
 * @ngdoc function
 * @name authModApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the authModApp
 */
angular.module('authModApp')
  .controller('LoginController', ["$location","$window","$auth","userData","baseUrlService",LoginCtrl]);

  function LoginCtrl($location,$window,$auth,userData,baseUrlService) {
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

          userData.setUser(response.data.user);
          //console.log(userData.getUser());
          console.log('history url');
          alert("Login successfull");
          window.history.back();
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
	.controller('RegisterCtrl', ["$scope","userData","$auth","$location",RegisterCtrl]);

	function RegisterCtrl($scope,userData,$auth,$location) {
		var rc = this;
		rc.user = {};
	    rc.formSubmit = formSubmit;
	    //var url = 'http://localhost:8000/register';

	    function formSubmit(){

		    $auth.signup(rc.user)
				.then(function(response){
					console.log(response);
			    		
			    		$auth.setToken(response.data.token);
			    		userData.setUser(response.data.user);
			    		//console.log(userData.getUser());
							window.history.back();
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
          console.log(attrs);
          console.log(attrs.sameAs);
					//console.log(scope.$eval(attrs.sameAs));
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
  .factory('userData',['$window','$route','$auth','$http',"baseUrlService",userData]);

  function userData($window,$route,$auth,$http,baseUrlService) {
    var storage = $window.localStorage;
    var cachedUser={};
    var obj1 =  {
      setUser: function (user) {
        console.log("called me yo");
        if(user){
          storage.setItem('user',JSON.stringify(user));
        }
        else{

          var userId = $auth.getPayload().sub;
          if(userId){
            $http.get(baseUrlService.baseUrl+'authenticate/user/'+userId).then(function(res){
              console.log('without param');
              if(obj1.isUserExists()){
                  storage.removeItem('user');
              }

              storage.setItem('user',JSON.stringify(res.data.user));
              //
              //$route.reload();
            //  $window.location.reload();

            },function(res){
              console.log(res);
            });
          }
        }
        console.log(storage.getItem('user'));

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
        //console.log('***********logged out*************');
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
      .controller('ReviewSubmitController',['$auth','$routeParams','$route','userData','reviewService',ReviewSubmitController]);
      function ReviewSubmitController($auth,$routeParams,$route,userData,reviewService){
        var rsv  = this;
        rsv.review = {};
        rsv.user = {};
        rsv.review.storeId = $routeParams.storeId;
        rsv.ratingClick = ratingClick;

        if(userData.getUser()){
          rsv.review.userId = userData.getUser()._id;
          rsv.user.picture = userData.getUser().picture;
          rsv.user.displayName = userData.getUser().displayName;
        }
        else{
          rsv.review.userId = $auth.getPayload().sub;
        }

        rsv.submitReview = submitReview;
        function ratingClick(obj){

          var rating = 6-obj.currentTarget.attributes.value.nodeValue;

          rsv.review.rating = rating;
        }
        function submitReview(){
          reviewService.submitStoreReview(rsv.review)
            .then(function(res){
              userData.setUser();
              $route.reload();
            },function(res){

            });
        }

      }
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.review')

  .controller('StoreReviewListController',["$scope","$routeParams",'reviewService',StoreReviewListController]);
  function StoreReviewListController($scope,$routeParams,reviewService){
    var slc = this;
    slc.activate = activate;
    slc.getStoreReviews = getStoreReviews;
    slc.getRating = getRating;
    slc.activate();
    function activate(){
      slc.getStoreReviews();
    }
    function getStoreReviews(){
      reviewService.getStoreReviews().then(function(res){
        slc.reviewList = res.data;
        console.log("**************from store list**********");
        console.log(slc.reviewList);
      },function(res){

      });
    }
    function getRating(review){

      var rating2 = parseInt(review.rating);
      var x = [];
      for(var i=0;i<rating2;i++){
        x.push(i);
      }

      return x;
    }


  }
})(window.angular);

(function(angular){
  'use strict';
  angular.module('app.review')
      .service('reviewService',['$http','$routeParams','baseUrlService',ReviewService]);
      function ReviewService($http,$routeParams,baseUrlService){
        var rs  = this;
        rs.submitStoreReview = submitStoreReview;
        rs.getStoreReviews = getStoreReviews;
        function submitStoreReview(review){
          return $http.post(baseUrlService.baseUrl+'review/reviews/store/'+review.storeId,review);
        }
        function getStoreReviews(){
          var storeId = $routeParams.storeId;
          return $http.get(baseUrlService.baseUrl+'review/reviews/store/'+storeId);
        }

      }
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.store')

  .controller('SingleStoreController',["$scope","$auth",'$location','$anchorScroll',"$routeParams","anchorSmoothScroll","storeData","getSingleStore",SingleStoreController]);
  function SingleStoreController($scope,$auth,$location,$anchorScroll,$routeParams,anchorSmoothScroll,storeData,getSingleStore){
    var ssc = this;
    ssc.storeData = {};
    ssc.flowToId = flowToId;
    ssc.loading = true;
    ssc.authCheck = $auth.isAuthenticated();
    ssc.getAddressString = getAddressString;

    function getAddressString(){
      return Object.keys(ssc.storeData.address).map(function(key){return ssc.storeData.address[key]}).join(' ');
    }
    getSingleStore.getStore($routeParams.storeId)
    .then(function(res){


      storeData.setStore(res.data);
        ssc.storeData = res.data;
        ssc.loading = false;

      });
      if($location.search().flowto!==undefined){
        var flowId = $location.search().flowto;
        flowToId(flowId);
      }
      function flowToId(flowId){
        $location.hash(flowId);
        anchorSmoothScroll.scrollTo(flowId);
        //$anchorScroll();
      }
    }

})(window.angular);

(function(angular){
  angular.module('app.store')

    .controller('StoreCategoryCollectionController',["$scope","$routeParams","getCityLocalitiesService","getCityCategoriesService",StoreCategoryCollectionController]);

    function StoreCategoryCollectionController($scope,$routeParams,getCityLocalitiesService,getCityCategoriesService){
      var slcc = this;
      slcc.areaModel = {};
      slcc.launchFilterEvent = launchFilterEvent;
      slcc.areaRadioClicked = areaRadioClicked;
      slcc.majorFilter = {};
      slcc.clearAreaFilters = clearAreaFilters;
      function areaRadioClicked(){
        slcc.majorFilter.area=slcc.areaModel.area;
        launchFilterEvent(slcc.majorFilter);
      }
      function clearAreaFilters(){
        delete slcc.majorFilter.area;
        slcc.areaModel = {};
        launchFilterEvent(slcc.majorFilter);
      }
      
      var location = $routeParams.location;
      getCityLocalitiesService.getCityLocalities(location)
        .then(function(res){
          slcc.areas = res.data;
        },function(res){

        });
        getCityCategoriesService.getCityCategories(location)
          .then(function(res){
            slcc.categories = res.data;

          },function(res){
            console.log(res);
          });
      function launchFilterEvent(obj){
          $scope.$broadcast('parent', obj);
      }
    }

})(window.angular);

(function(angular){


  angular.module('app.store')
    .controller('StoreController',["baseUrlService","$http",storeController]);
  function storeController(baseUrlService,$http){
    var sm = this;

    sm.address = {};
    sm.SendData = function () {
      data = {};
      data.name = sm.name;
      data.city = sm.address.city;
      data.address = sm.address;
      data.category = sm.categoryString.split(",");

      var config = {
        headers : {
          'Content-Type': 'application/json'
      }
    };
    $http.post(baseUrlService.baseUrl+"store/store", data, config)
      .then(
        function(response){
        },
        function(response){
          console.log(response);
        }
      );
    };
  }
})(window.angular);

(function(angular){
  'use strict';

  angular.module('app.store')

    .controller('StoreListController',["$scope","httpService","$routeParams","changeBrowserURL","$location","baseUrlService","getStoreCollectionService",StoreListController]);


    function StoreListController($scope,httpService,$routeParams,changeBrowserURL,$location,baseUrlService,getStoreCollectionService){
      var slc = this;
      slc.pageNo = 0;
      slc.storesList = [];
      slc.getSingleStore = getSingleStore;
      slc.getStoresCollection = getStoresCollection;
      slc.storesSearchHeader = $routeParams.slug;
      activate();
      $scope.$on('parent', function (event, data) {
        slc.pageNo = 0;
        slc.paramData = data;
        slc.getStoresCollection();
      });
      function getSingleStore(store){
        var url = "store/singleStore/"+store._id+"/"+store.myslug;
        changeBrowserURL.changeBrowserURLMethod(url);
      }
      function getStoresCollection(){
        slc.loading = true;
        slc.pageNo = slc.pageNo + 1;
        var location = $routeParams.location;
        var url ='';
        if($location.absUrl().indexOf("/category/")!=-1){
          var category = $routeParams.category;
           url = 'store/storesCollection/category/'+category+'/'+location+'/'+slc.pageNo;
        }
        else if($location.absUrl().indexOf("/storeName/")!=-1){
          var storeName = $routeParams.storeName;
           url = 'store/storesCollection/storeName/'+storeName+'/'+location+'/'+slc.pageNo;
        }
        else{
           url = 'store/storesCollection/stores'+'/'+location+'/'+slc.pageNo;
        }
        /*
          * This will work with mongoose-paginate only because the existencce of the button
            in html is dependant on the total documents retrieved
          * I check the total documents available to the length of array displayed.. if they both are equal
            then the button is hidden

        */
        getStoreCollectionService.getStoreCollection(url,slc.paramData)
        //httpService.getService(url)
        .then(function(response){
          slc.totalStores = response.data.total;
          console.log(response);
          if(slc.storesList.length===0){
            var tempStoreList = [];
            for (var i = response.data.docs.length - 1; i >= 0; i--) {
              tempStoreList.push(response.data.docs[i]);

            }
            slc.storesList = tempStoreList;
          }
          else{

            if(slc.paramData&&slc.pageNo==1){
              slc.storesList = [];
            }
            for (var j = response.data.docs.length - 1; j >= 0; j--) {
              slc.storesList.push(response.data.docs[j]);
            }

          }
          slc.loading = false;
        },function(response){
          console.log(response);
        });
      }
      function activate(){
        slc.getStoresCollection();
      }

    }

})(window.angular);

(function(angular){
  angular.module('app.store')
    .controller('StoreLocationCollectionController',["$scope","$routeParams","getCityLocalitiesService","getCityCategoriesService",StoreLocationCollectionController]);

  function StoreLocationCollectionController($scope,$routeParams,getCityLocalitiesService,getCityCategoriesService){
    var slcc = this;
    slcc.areaModel = {};
    slcc.categoryModel = {};
    slcc.launchFilterEvent = launchFilterEvent;
    slcc.areaRadioClicked = areaRadioClicked;
    slcc.categoryRadioClicked = categoryRadioClicked;
    slcc.majorFilter = {};
    slcc.clearAreaFilters = clearAreaFilters;
    slcc.clearCategoryFilters = clearCategoryFilters;
    function areaRadioClicked(){
      slcc.majorFilter.area=slcc.areaModel.area;
      launchFilterEvent(slcc.majorFilter);
    }
    function clearAreaFilters(){
      delete slcc.majorFilter.area;
      slcc.areaModel = {};
      launchFilterEvent(slcc.majorFilter);
    }
    function categoryRadioClicked(){
      slcc.majorFilter.category=slcc.categoryModel.category;
      launchFilterEvent(slcc.majorFilter);
    }
    function clearCategoryFilters(){
      delete slcc.majorFilter.category;
      slcc.categoryModel = {};
      launchFilterEvent(slcc.majorFilter);
    }
    var location = $routeParams.location;
    getCityLocalitiesService.getCityLocalities(location)
      .then(function(res){
        slcc.areas = res.data;
      },function(res){
        
      });
      getCityCategoriesService.getCityCategories(location)
        .then(function(res){
          slcc.categories = res.data;
          
        },function(res){
          console.log(res);
        });
    function launchFilterEvent(obj){
        $scope.$broadcast('parent', obj);
    }

  }
})(window.angular);

(function(angular){
  angular.module('app.store')

    .controller('StoreNameCollectionController',[storeNameCollectionController]);
    function storeNameCollectionController(){

    }
})(window.angular);

(function(angular){
  angular.module('app.store')

    .controller('UserStoreVisitController',["$scope","$window","$auth","$routeParams","userData","storeData","userVisitService",UserStoreVisitController]);

    function UserStoreVisitController($scope,$window,$auth,$routeParams,userData,storeData,userVisitService){
      var usv = this;
      usv.visit = {};
      usv.visitCheck = false;
      console.log('checking store data inside controller');
      console.log(userData.getUser());
      usv.toggleVisitCheck = toggleVisitCheck;
      usv.visit.storeId = $routeParams.storeId;
      usv.userStoreVisited = userStoreVisited;
      activate();

      function userStoreVisited(){
        //userData.setUser();
        userVisitService.getVisit({"storeId":$routeParams.storeId,"userId":userData.getUser()._id})
          .then(function(res){
            if(res.data.length){
                usv.visitCheck = true;
                usv.userStoreVisitId  = res.data[0]._id;
            }

          });
      }
      function toggleVisitCheck(){


      if(usv.visitCheck){
          if(userData.getUser()){
            usv.visit.userId = userData.getUser()._id;
          }
          else{
            usv.visit.userId = $auth.getPayload().sub;
          }
          userVisitService.submitVisit(usv.visit)
            .then(function(res){
                    console.log(res);
                    userData.setUser();
                  },
                  function(res){
                    console.log(res);
                  });
        }
        else {
          console.log('inside delte visit');
          userVisitService.deleteVisit(usv.userStoreVisitId)
            .then(function(res){
              console.log(res);
              userData.setUser();
              //$window.location.reload();
            },
              function(res)
              {
                console.log(res);
              });
        }
      }
      function activate(){
        userData.setUser();
        userStoreVisited();
      }

    }

})(window.angular);

(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('getStoreCollectionService',["$http","storeData","baseUrlService",GetStoreCollectionService]);

/*
  * This servic has a function to get collection of stores`
*/
function GetStoreCollectionService($http,storeData,baseUrlService){
  this.getStoreCollection = getStoreCollection;

  function getStoreCollection(url,paramData){
    return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
}
})(window.angular);

(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('getSingleStore',["$http","storeData","baseUrlService",GetSingleStoreWithId]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function GetSingleStoreWithId($http,storeData,baseUrlService){
  this.getStore = getStore;

  function getStore(id){
    return $http.get(baseUrlService.baseUrl+"store/singleStore/"+id);
    
  }
}
})(window.angular);

(function(angular){
  'use strict';

angular.module('app.store')
  .factory('storeData',["$window",storeData]);

/*
  * This factory is used to get store details from window storage
*/
function storeData($window) {
  var storage = $window.localStorage;
  var obj1 = {
    setStore: function (store) {
        console.log('****from the storeData factory*****');
        console.log(store);
        storage.setItem('store',JSON.stringify(store));


    },
    getStore: function(){

      return JSON.parse(storage.getItem('store'));

    },
    removeStore: function(){

      storage.removeItem('store');
    }
  };
    return obj1;
  }



})(window.angular);

(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('userVisitService',["$http","baseUrlService",UserVisitService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function UserVisitService($http,baseUrlService){
  this.submitVisit = submitVisit;
  this.deleteVisit = deleteVisit;
  this.getVisit = getVisit;

  function getVisit(visitData){
    return $http.get(baseUrlService.baseUrl+"visit/visited",{"params":visitData});
  }

  function submitVisit(visitData){
    return $http.post(baseUrlService.baseUrl+"visit/visits/store",visitData);
  }
  function deleteVisit(visitId){
    return $http.delete(baseUrlService.baseUrl+"visit/visits/"+visitId);
  }
}
})(window.angular);
