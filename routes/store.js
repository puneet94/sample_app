var express = require('express');
var Store = require('..//models/storeModel');
var UserSearch = require('..//models/user_search');
var storeRouter = express.Router();

storeRouter.use(function(req,res,next){
	console.log("store");
	console.log(req.method,req.url);
	next();
});

var saveSearchList = function(query,kind,location,req,res){
	var userSearch = new UserSearch();
		var delimiter = "#&#";
		userSearch.userSearchString = query+delimiter+kind+delimiter+location;
		userSearch.location = location;
		userSearch.save(function(err){
			if(err){
				console.log(err)	
			}
		});
};
storeRouter.route('/cities')
	.get(function(req,res){
		UserSearch.find(function(err,cities){
			if(err){
				res.send(err);
			}
			console.log("cities route");
			console.log(cities);
			res.json(cities);
			//res.render("stores",{"stores":stores});
		}).select({ "location": 1, "_id": 0});
	})

storeRouter.route('/stores')
	.get(function(req,res){
		Store.find(function(err,stores){
			if(err){
				res.send(err);
			}
			console.log("hello");
			res.json(stores);
			//res.render("stores",{"stores":stores});
		})
	})
	.post(function(req,res){
		var store = new Store();
		var recData = req.body;
		store.name = recData.name;
		var city_name = recData.address.city;
		store.address = recData.address;
		store.save(function(err){
			if(err){
				if(err.code == 11000){
					return res.json({success:false,'message':'User already exists'});
				}
				else{
					return res.send(err)
				}
			}
			saveSearchList(req.body.name,"store",city_name,req,res);
			res.json({message:"Store created"});
		});
	});
storeRouter.route('/storesCollection/:storeName/:location')
	.get(function(req,res){
		Store.find({'name':req.params.storeName,'address.city':req.params.location},/*{products:0,reviews:0},*/function(err,stores){
			if(err){
				res.send(err);
			}
			else{
				console.log(stores);
				console.log(stores[0].products.length);
				for (var i = stores.length - 1; i >= 0; i--) {

					stores[i]['products']=stores[i].products.length;
					stores[i]['reviews']=stores[i].reviews.length;
					stores[i]['visits']=stores[i].visits.length;
					stores[i]['upvotes']=stores[i].upvotes.length;
				};
				console.log(stores);
				res.json(stores);
			}
		})
	});

storeRouter.route('/categories/:pageNo')
	.get(function(req,res){
		Store.paginate({
			/*category: { $in: ['category1'] }*/
		}, { select:'category', page: req.params.pageNo, limit: 10 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				// result.docs 
		    // result.total 
		    // result.limit - 10 
		    // result.page - 3 
		    // result.pages 
				console.log(result);
				res.json(result);
			}
		});
		/*
		Store.find({},{category:1},function(err,categories){
			if(err){
				res.send(err);
			}
			else{
				console.log(categories);
				res.json(categories);
			}
		})*/
	})
storeRouter.route('/stores/:store_id')
	.get(function(req,res){
		Store.findById(req.params.store_id,function(err,store){
			if(err){
				res.send(err);
			}
			else{
				res.json(store);
			}
		})
	})
	/*.put(function(req,res){
		User.findById(req.params.user_id,function(err,user){
			if(err){
				res.send(err);
			}
			if(req.body.name){
				user.name = req.body.name;
			}
			if(req.body.username){
				user.username = req.body.username;
			}
			if(req.body.password){
				user.password = req.body.password;
			}
			if(req.body.address){
				console.log("address getting updated");
				user.address = req.body.address;
			}
			user.save(function(err){
				if(err){
					res.send(err);
				}
				res.json({message:"user updated"});
			})
		})	
	})*/
module.exports = storeRouter;