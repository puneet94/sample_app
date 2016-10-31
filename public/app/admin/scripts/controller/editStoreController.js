(function(angular){
  angular.module('app.admin')

    .controller('EditStoreController',['$auth','adminStoreService','Upload','$routeParams',EditStoreController]);
    function EditStoreController($auth,adminStoreService,Upload,$routeParams){
    	var csc = this;
    	csc.storeForm = {};
    	activate();
    	csc.createStore = createStore;
        


        csc.uploadSingleImage = function(file, errFiles) {
          console.log("Enterd file uploading");
          csc.f = file;
          csc.errFile = errFiles && errFiles[0];
          if (file) {
              file.upload = Upload.upload({
                  url: 'http://localhost:3000/upload/singleUpload',
                  data: {file: file}
              });
              csc.spinnerLoading = true;
              file.upload.then(function (response) {
                  
                      file.result = response.data;
                      csc.storeForm.bannerImage = response.data;
                      console.log('store banner Image'+response.data);
                      //$('.userProfileImage').find('img').attr('src',response.data);
                      csc.spinnerLoading = false;
              });
          }
      };
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

                response.data.category = response.data.category.join(",");
                response.data.subCategory = response.data.subCategory.join(",");
                response.data.keywords = response.data.keywords.join(",");
                console.log(response);
    			csc.storeForm = response.data;
    		});
    	}
    }
})(window.angular);
