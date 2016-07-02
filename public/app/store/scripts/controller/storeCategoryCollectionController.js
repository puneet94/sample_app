(function(angular){
  angular.module('app.store')

    .controller('StoreCategoryCollectionController',["$location",StoreCategoryCollectionController]);

    function StoreCategoryCollectionController($location){
      console.log($location.absUrl());
    }

})(window.angular);
