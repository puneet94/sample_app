(function(angular){
  angular.module('app.admin')

    .controller('CreateStoreController',['$auth','adminStoreService',CreateStoreController]);
    function CreateStoreController($auth,adminStoreService){
    	var csc = this;
    	csc.storeForm = {};
    	activate();
    	csc.createStore = createStore;
        
    	function createStore(){
    		adminStoreService.createStore(csc.storeForm)
	    		.then(function(response){
	    			console.log(response);
	    			alert("store created");
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		
    	}
    	
    }
})(window.angular);
