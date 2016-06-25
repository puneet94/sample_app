(function(){

'use strict';

/**
 * @ngdoc overview
 * @name app.review
 * @description
 * # app.review
 *
 * Review module of the application.
 */
angular
  .module('app.review', [  ]);

}());

(function(){
  'use strict';
  angular
    .module('app.review')
      .controller('ReviewSubmitController',["$routeParams","userData",reviewSubmitController]);

      function reviewSubmitController($routeParams,userData){
        var rsv  = this;
        rsv.review = {};
        rsv.review.storeId = $routeParams.storeId;
        console.log(userData.getUser());
      }
}());
