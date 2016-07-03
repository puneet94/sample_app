var express = require('express');
var models = require('..//models/storeModel');
var Review = models.Review;
var User = models.User;
var Store = models.Store;
var mongoose = require('mongoose');
var reviewRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
reviewRouter.use(function(req,res,next){
	console.log("review");
	console.log(req.method,req.url);
	next();
});




reviewRouter.route('/reviews')
	.get(function(req,res){
		Review.find(function(err,reviews){
			if(err){
				res.send(err);
			}

			res.json(reviews);
			//res.render("stores",{"stores":stores});
		})
	});

reviewRouter.route('/reviews/store/:storeId')
.get(function(req,res){
	Review.find({'store':req.params.storeId})
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


	/*
  Review.paginate({'store':req.params.storeId},
    {page: req.params.pageNo, limit: 10 }, function(err, result) {
      if(err){
      res.send(err);
    }
    else{
      console.log(result);
      res.json(result);
    }
  });*/
})
.post(commons.ensureAuthenticated,function(req,res){
  var review = new Review();
  var recData = req.body;

  review.description=recData.description;
  review.user=recData.userId;
  review.store = mongoose.Types.ObjectId(req.params.storeId);
	review.rating = recData.rating;



  review.save(function(err){
    if(err){
      if(err.code == 11000){
        return res.json({success:false,'message':'Review already exists'});
      }
      else{
        console.log(err);
        return res.send(err);

      }
    }


    res.json({message:"Review created"});
  });
})


module.exports = reviewRouter;
