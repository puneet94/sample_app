(function(angular){
  'use strict';
angular.module('app.store')

  .controller('SingleStoreController',["$scope","$auth",'$location','scrollToIdService',"$routeParams","storeData","getSingleStore",'$mdDialog','userData',SingleStoreController]);
  function SingleStoreController($scope,$auth,$location,scrollToIdService,$routeParams,storeData,getSingleStore,$mdDialog,userData){
    var ssc = this;
    ssc.storeData = {};
    ssc.loading = true;
    ssc.authCheck = $auth.isAuthenticated();
    ssc.getAddressString = getAddressString;
    ssc.currentUser = userData.getUser()._id;
    ssc.storeImagesObj = [];
    function getAddressString(){
      return Object.keys(ssc.storeData.address).map(function(key){return ssc.storeData.address[key];}).join(' ');
    }
     $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Claim Business')
        .textContent('If you are the owner of this store,then mail to us at shoppinsmail@gmail.com')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
    getSingleStore.getStore($routeParams.storeId)
    .then(function(res){
      storeData.setStore(res.data);
        ssc.storeData = res.data;
        for (var i = 0; i < ssc.storeData.storeImages.length; i++) {
          var obj = {};
          obj.src=ssc.storeData.storeImages[i];
          ssc.storeImagesObj.push(obj);
        }
        //ssc.showImagesCarousel = true;
        console.log(ssc.storeImagesObj);
        ssc.loading = false;
        if($location.search().param){
            scrollToIdService.scrollToId($location.search().param);
        }
      });
    getSingleStore.getStoreRating($routeParams.storeId)
    .then(function(res){
      ssc.storeData.storeRatingAvg = res.data;
    });

    }

})(window.angular);
