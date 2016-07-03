angular.module('app.store')
  .controller('StoreController',["baseUrlService","$http",storeController])
  .controller('StoreListController',["httpService","$routeParams","changeBrowserURL","$location","baseUrlService",storeListController])
  .controller('StoreNameCollectionController',[storeNameCollectionController])
  .controller('StoreCategoryCollectionController',["$location",storeCategoryCollectionController]);
  function storeNameCollectionController(){

  }
  function storeCategoryCollectionController($location){
    console.log($location.absUrl());
  }

  function storeListController(httpService,$routeParams,changeBrowserURL,$location,baseUrlService){
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
      var location = $routeParams.location||'hyderabad';
      var url ='';
      if($location.absUrl().indexOf("/category/")!=-1){
        var category = $routeParams.category;
         url = baseUrlService.baseUrl+'store/storesCollection/category/'+category+'/'+location+'/'+slc.pageNo;
      }
      else if($location.absUrl().indexOf("/storeName/")!=-1){
        var storeName = $routeParams.storeName;
         url = baseUrlService.baseUrl+'store/storesCollection/storeName/'+storeName+'/'+location+'/'+slc.pageNo;
      }
      else{
         url = baseUrlService.baseUrl+'store/storesCollection/stores'+'/'+location+'/'+slc.pageNo;
      }

      httpService.getService(url)
      .then(function(response){
        for (var i = response.data.docs.length - 1; i >= 0; i--) {
          slc.storesList.push(response.data.docs[i]);
        }

      },function(response){
        console.log(response);
      });
    }
    function activate(){
      slc.getStoresCollection();
    }

  }
  function storeController(baseUrlService,$http){
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
    };
    $http.post(baseUrlService.baseUrl+"store/store", data, config)
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
