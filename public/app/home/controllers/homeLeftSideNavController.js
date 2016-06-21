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
