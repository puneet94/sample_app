(function(angular){
  angular.module('app.admin')

    .controller('EditStoreController',['$auth','adminStoreService','$routeParams',EditStoreController]);
    function EditStoreController($auth,adminStoreService,$routeParams){
    	var csc = this;
    	csc.storeForm = {};
    	activate();
    	csc.createStore = createStore;
        
    	function createStore(){
    		adminStoreService.updateStore($routeParams.storeId,csc.storeForm)
	    		.then(function(response){
	    			console.log(response);
	    			alert("store created");
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		adminStoreService.getStore($routeParams.storeId).then(function(response){
    			console.log(response);
    			csc.storeForm = response.data;
    		});
    	}
    }
})(window.angular);
