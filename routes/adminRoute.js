var express = require('express');
var models = require('..//models/storeModel');

var mongoose = require('mongoose');
var adminRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
adminRouter.use(function(req,res,next){
	console.log("review");
	console.log(req.method,req.url);
	next();
});

/*finding the reviews of a particular store using the store id*/
adminRouter.route('/store')
.get(function(req,res){
  res.send('store');
})

adminRouter.route('/')
.get(function(req,res){
  res.send('yo');
})


module.exports = adminRouter;
