var express = require('express');
var models = require('..//models/storeModel');
var Review = models.Review;
var User = models.User;
var Store = models.Store;
var Activity = models.Activity;
var mongoose = require('mongoose');
var activityRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
var app = express();

app.set('view engine',"jade");
activityRouter.use(function(req,res,next){
	console.log(req.method,req.url);
	next();
});

activityRouter.route('/userActivity/:userId')
	.get(function(req,res){
		Activity
			.find({'activityFor':req.params.userId})
			.populate({path:'creator',model: 'User',select:'displayName picture'})
			.populate({path: 'followed',model: 'User',select:'displayName picture'})
			.populate({path: 'review',model: 'Review',populate: {path: 'store',select: 'name bannerImage',model: 'Store'}})
			.populate({path: 'review',model: 'Review',populate: {path: 'product',select: 'name images',model: 'Product'}})
			.populate({path: 'review',model: 'Review',populate: {path: 'user',select: 'displayName',model: 'User'}})
			.exec(function(err,result){
				if(err){
					res.send(err);
				}
				else{
					
					app.render('activity/userActivity', { activity: result }, function(err, html){
						
						if(err){
							console.log(err);
						}
						//res.json(result);
  						res.send(html);
  						
					})
				}
			})
		
		
		
	});


module.exports = activityRouter;

