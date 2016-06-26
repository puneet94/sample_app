(function(angular){
  angular.module('app.store')

    .controller('StoreCategoryCollectionController',["$location",storeCategoryCollectionController]);
    
    function storeCategoryCollectionController($location){
      console.log($location.absUrl());
    }

})(window.angular);
