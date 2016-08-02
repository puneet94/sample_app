var express = require('express');
var models = require('..//models/storeModel');
var Review = models.Review;
var User = models.User;
var Store = models.Store;
var Upvote = models.Upvote;
var mongoose = require('mongoose');
var upvoteRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
upvoteRouter.use(function(req,res,next){
	console.log("upvote");
	console.log(req.method,req.url);
	next();
});




upvoteRouter.route('/upvotes')
	.get(function(req,res){
		Upvote.find(function(err,upvotes){
			if(err){
				res.send(err);
			}
			res.json(upvotes);
			//res.render("stores",{"stores":stores});
		})
	})
	.delete(commons.ensureAuthenticated,function(req,res){
	Upvote.find({ id: req.params.upvoteId}).remove(function (err) {
					if(err){
						return res.send(err);
					}
        			res.send('removed viit');
    				});
})

upvoteRouter.route('/upvotes/store/:storeId?')
.get(function(req,res){
	Upvote.find({'store':req.params.storeId})
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
  var upvote = new Upvote();
  var recData = req.body;
	upvote.user=recData.userId;
 	upvote.store = mongoose.Types.ObjectId(recData.storeId);
	upvote.review = recData.reviewId;

	if(commons.validateId(upvote.user,"user") && commons.validateId(upvote.store,"store") && commons.validateId(upvote.review,"review")){
		upvote.save(function(err){
    if(err){
      if(err.code == 11000){
        return res.json({success:false,'message':'Review already exists'});
      }
      else{
        console.log(err);
        return res.send(err);

      }
    }


    res.json({message:"Upvote created"});
  });
	}

  
})


upvoteRouter.route('/upvotes/review')
.post(commons.ensureAuthenticated,function(req,res){
  var upvote = new Upvote();
  var recData = req.body;
	upvote.user=recData.userId;
 	upvote.store = recData.storeId;
	upvote.review = recData.reviewId;
	
	commons.validateId(upvote.review,Review).then(function(doc){
		commons.validateId(upvote.user,User).then(function(doc){
			commons.validateId(upvote.store,Store).then(function(doc){

				upvote.save(function(err,upvote){
			    	if(err){
			      		if(err.code == 11000){
			        		return res.json({success:false,'message':'Review already exists'});
			      		}
			      		else{
					        console.log(err);
					        return res.send(err);

			      		}
			    	}
				    console.log("savved the upvote");

				    res.json({"message":"Upvote created","id":upvote._id});
		  		});
			})
		})
	});// && 
	

  
})
.delete(commons.ensureAuthenticated,function(req,res){
	var params  = req.query;
	console.log(params);
	var queryObj = {"store":params.storeId,"review":params.reviewId,"user":params.userId};
	Upvote.findOne(queryObj)
				.exec(function(err, upvote) {
						if(err){
						res.send(err);
					}
					else{
						upvote.remove(function (err) {
        			res.json({"message":"Upvote delted","id":upvote._id});
    				});
					}
				});
})


module.exports = upvoteRouter;