var express = require('express');
var models = require('..//models/storeModel');

var mongoose = require('mongoose');
var adminRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
var storeController = require('../controller/adminStoreController');
adminRouter.use(function(req,res,next){
	console.log("review");
	console.log(req.method,req.url);
	next();
});

/*finding the reviews of a particular store using the store id*/
adminRouter.route('/stores').post(commons.ensureAuthenticated,storeController.createStore);
adminRouter.route('/store/:storeId')
	.get(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,storeController.editStore)
	.put(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,storeController.updateStore)
	.delete(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,storeController.deleteStore);
adminRouter.route('/store/products')
.get(commons.ensureAuthenticated,function(req,res){
  res.send('store');
})


module.exports = adminRouter;
