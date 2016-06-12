'use strict';

/**
 * @ngdoc function
 * @name authModApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the authModApp
 */
angular.module('authModApp')
  .controller('ProductsCtrl', ["product",ProductsCtrl]);

  function ProductsCtrl(product) {
    var pcl = this;
    pcl.productsList = [];
    product.getProducts()
    	.then(function(res){
    		console.log(res);
    		
    	},function(res){
    		console.log(res);
    	})
  }
