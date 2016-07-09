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
      activate();
      $scope.$on('parent', function (event, data) {
        slc.pageNo = 0;
        slc.getStoresCollection(data);
      });
      function getSingleStore(store){
        var url = "store/singleStore/"+store._id+"/"+store.myslug;
        changeBrowserURL.changeBrowserURLMethod(url);
      }
      function getStoresCollection(paramData){
        slc.pageNo = slc.pageNo + 1;
        var location = $routeParams.location||'hyderabad';
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
        getStoreCollectionService.getStoreCollection(url,paramData)
        //httpService.getService(url)
        .then(function(response){
          var tempStoreList = [];
          for (var i = response.data.docs.length - 1; i >= 0; i--) {

            tempStoreList.push(response.data.docs[i]);
          }
          slc.storesList = tempStoreList;

        },function(response){
          console.log(response);
        });
      }
      function activate(){
        slc.getStoresCollection();
      }

    }

})(window.angular);
