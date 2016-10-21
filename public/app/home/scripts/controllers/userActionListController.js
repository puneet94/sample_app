//inject angular file upload directives and services.
(function(angular){
  'use strict';
angular.module('app.user')
  .controller('UserActionListController', ['$scope', 'userData',UserActionListController]);
  function UserActionListController($scope, userData ) {
  		var originatorEv;
      var ualc = this;
      ualc.getUserStores = getUserStores;
      ualc.openMenu = openMenu;
      ualc.getUserPage = getUserPage;
      activate();
      function getUserPage(){
      	userData.getUserPage(userData.getUser()._id);
      }
      function openMenu($mdOpenMenu, ev) {
	      originatorEv = ev;
	      $mdOpenMenu(ev);
		}
      function getUserStores(){
      	console.log("the user store list");
        console.log(userData.getUser().storeId);
      }


      function activate(){
        ualc.userProfilePic = userData.getUser().picture;
      	getUserStores();
      }
  }
})(window.angular);
