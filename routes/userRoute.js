var express = require('express');
var models = require('..//models/storeModel');
var Store = models.Store;
var User = models.User;
var Review = models.Review;

var UserSearch = require('..//models/user_search');
var userRouter = express.Router();
var commons = require('./commonRouteFunctions');

userRouter.use(function(req,res,next){
	console.log("user");
	console.log(req.method,req.url);
	next();
});
userRouter.route('/singleUser/:user_id')
	.get(function(req,res){
		User.findById(req.params.user_id,function(err,user){
			if(err){
				res.send(err);
			}
			else{
				user.reviews = null;
				user.upvotes = null;
				
				res.json(user);
			}
		})
	});
userRouter.route('/userReviews/:user_id')
	.get(function(req,res){
		var populateQuery = [{path:'store', select:'name'}, {path:'product', select:'name'}];
		Review.find({ user: req.params.user_id })
		 
		.populate(populateQuery) 
.exec(function (err, reviews) {
  if (err) {
  	return handleError(err)
  }
  else{
  	return res.json(reviews);
  }
  
})
	});


userRouter.route('/userFollowing/:user_id')
	.get(function(req,res){
		User.findOne({ _id: req.params.user_id })
		.select('_id following')
.populate('following', 'displayName picture') 
.exec(function (err, followers) {
  if (err) {
  	return handleError(err)
  }
  else{
  	return res.json(followers.following);
  }
  
})
	});
userRouter.route('/userFollowers/:user_id')
	.get(function(req,res){
		
		User.findOne({ _id: req.params.user_id })
		.select('_id followers')
.populate('followers', 'displayName picture') 
.exec(function (err, followers) {
  if (err) {
  	return handleError(err)
  }
  else{
  	return res.json(followers.followers);
  }
  
})
	});

userRouter.route('/submitFollow/:user_id/:followedUser_id')
	.post(commons.ensureAuthenticated,function(req,res){
		var user_id = req.params.user_id;
		var fold_id  = req.params.followedUser_id;
		commons.validateId(user_id,User).then(function(doc){
			commons.validateId(fold_id,User).then(function(doc2){
				User.update({_id:user_id},{$push:{'following':fold_id}},{upsert:true},function(err,data){
					if(err){

					}
					else{
						User.update({_id:fold_id},{$push:{'followers':user_id}},{upsert:true},function(err,data){
						if(err){
						}
						else{
							var activity = {};
    						activity.creator = user_id; 
							activity.followed = fold_id;
							activity.statement = "followed";
							commons.enterActivity(activity);
							res.json('followers created');
						}
						})		
					}
				})
			})
		});
		
	})
		
userRouter.route('/deleteFollow/:user_id/:followedUser_id')
	.post(commons.ensureAuthenticated,function(req,res){
		var user_id = req.params.user_id;
		var fold_id  = req.params.followedUser_id;
		commons.validateId(user_id,User).then(function(doc){
			commons.validateId(fold_id,User).then(function(doc2){
				
				User.update({_id:user_id},{$pull:{'following':fold_id}},{upsert:true},function(err,data){
					if(err){

					}
					else{
						User.update({_id:fold_id},{$pull:{'followers':user_id}},{upsert:true},function(err,data){
						if(err){

						}
						else{
							res.json('followers deleted');
						}
						})		
					}
				})
			})
		});
		
	})

userRouter.route('/checkFollow/:user_id/:followedUser_id')
	.get(commons.ensureAuthenticated,function(req,res){
		var user_id = req.params.user_id;
		var fold_id  = req.params.followedUser_id;
		commons.validateId(user_id,User).then(function(doc){
			commons.validateId(fold_id,User).then(function(doc2){
				
				User.find({_id:user_id},function(err,data){
					if(err){
						console.log(err);
					}
					else{
						console.log('yoyoyoyoyo');
						console.log(data[0]);
						console.log(data[0].following.indexOf(fold_id));
						if(data[0].following.indexOf(fold_id)!=-1){
							return res.json(true);
						}
						else{
							return res.json(false);
						}
					}
				})
			})
		});
		
	})

module.exports = userRouter;


/****
added
User.findById(req.params.user_id,function(err,user){
			if(err){
				res.send(err);
			}
			else{
				
				User.findById(req.params.followedUser_id,function(err,followedUser){
			if(err){
				res.send(err);
			}
			else{
				User.update({_id:user_id},{$push:{'following':fold_id}},{upsert:true},function(err,data){
					if(err){

					}
					else{
						User.update({_id:fold_id},{$push:{'followers':user_id}},{upsert:true},function(err,data){
					if(err){

					}
					else{
						res.json('followers created');
					}
				})		
					}
				})
				
			}
		})*/