//inject angular file upload directives and services.
(function(angular){
  'use strict';
angular.module('app.user')
  .controller('UserActionListController', ['$scope','userData','userService',UserActionListController]);
  function UserActionListController($scope,userData ) {
  		var originatorEv;
      var ualc = this;
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
      


      function activate(){
        ualc.userProfilePic = userData.getUser().picture;
        ualc.userStoresList = userData.getUser().storeId;
      	
      }
  }
})(window.angular);
