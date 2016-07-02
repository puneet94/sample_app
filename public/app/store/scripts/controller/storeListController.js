(function(angular){
  angular.module('app.store')

    .controller('StoreListController',["httpService","$routeParams","changeBrowserURL","$location",StoreListController]);


    function StoreListController(httpService,$routeParams,changeBrowserURL,$location){
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
           url = 'http://localhost:3000/store/storesCollection/category/'+category+'/'+location+'/'+slc.pageNo;
        }
        else if($location.absUrl().indexOf("/storeName/")!=-1){
          var storeName = $routeParams.storeName;
           url = 'http://localhost:3000/store/storesCollection/storeName/'+storeName+'/'+location+'/'+slc.pageNo;
        }
        else{
           url = 'http://localhost:3000/store/storesCollection/stores'+'/'+location+'/'+slc.pageNo;
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

})(window.angular);
