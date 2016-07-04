(function(angular){


  angular.module('app.store')
    .controller('StoreController',["baseUrlService","$http",storeController]);
  function storeController(baseUrlService,$http){
    var sm = this;
    console.log("store controller");
    sm.address = {};
    sm.SendData = function () {
      data = {};
      data.name = sm.name;
      data.city = sm.address.city;
      data.address = sm.address;
      data.category = sm.categoryString.split(",");
      console.log(data.category);
      var config = {
        headers : {
          'Content-Type': 'application/json'
      }
    };
    $http.post(baseUrlService.baseUrl+"store/store", data, config)
      .then(
        function(response){
          console.log(response);
        },
        function(response){
          console.log(response);
        }
      );
    };
  }
})(window.angular);
