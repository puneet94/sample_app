var express = require('express');
var models = require('..//models/storeModel');
var User = models.User;
var Store = models.Store;
var Visit = models.Visit;
var mongoose = require('mongoose');
var visitRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
visitRouter.use(function(req,res,next){
	console.log("review");
	console.log(req.method,req.url);
	next();
});

/*finding the reviews of a particular store using the store id*/
visitRouter.route('/visits/:visitId')
.delete(commons.ensureAuthenticated,function(req,res){
  var visitId = req.params.visitId;
	Visit.findOne({'_id':visitId})
				.exec(function(err, visit) {
						if(err){
						res.send(err);
					}
					else{
						visit.remove(function (err) {
        			res.send('removed viit');
    				});
					}
				});
});
visitRouter.route('/visits/store/')
.get(function(req,res){
  var storeId = req.body.storeId;
	Review.find({'store':storeId})
				.populate({
					path: 'user',
					model: 'User'
				})
				.exec(function(err, result) {
						if(err){
						res.send(err);
					}
					else{

						res.json(result);
					}
				});
})
.post(commons.ensureAuthenticated,function(req,res){
  var visit = new Visit();
  var recData = req.body;

  visit.user=recData.userId;
  visit.store = mongoose.Types.ObjectId(recData.storeId);


  visit.save(function(err){
    if(err){
      if(err.code == 11000){
        return res.json({success:false,'message':'Visit already exists'});
      }
      else{
        console.log(err);
        return res.send(err);
      }
    }


    res.json({message:"Visit created"});
  });
});

visitRouter.route('/visits/user/')
.get(function(req,res){
  var userId = req.body.userId;
	Review.find({'user':userId})
				.populate({
					path: 'store',
					model: 'Store'
				})
				.exec(function(err, result) {
						if(err){
						res.send(err);
					}
					else{

						res.json(result);
					}
				});
})


module.exports = visitRouter;
