(function(angular){
  angular.module('app.store')
    .controller('StoreLocationCollectionController',["$scope",StoreLocationCollectionController]);

  function StoreLocationCollectionController($scope){
    var slcc = this;
    slcc.launchFilterEvent = launchFilterEvent;
    function launchFilterEvent(){
        $scope.$broadcast('parent', {'category':'disco3'}); 
    }

  }
})(window.angular);
