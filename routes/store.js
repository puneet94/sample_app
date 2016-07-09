var express = require('express');
var models = require('..//models/storeModel');
var Store = models.Store;
var UserSearch = require('..//models/user_search');
var storeRouter = express.Router();
var commons = require('./commonRouteFunctions');

storeRouter.use(function(req,res,next){
	console.log("store");
	console.log(req.method,req.url);
	next();
});

storeRouter.route('/store')
	.post(function (req,res) {
		var store = new Store();
		var recData = req.body;
		store.name = recData.name;
		var city_name = recData.address.city;
		store.address = recData.address;
		store.category = recData.category; //make sure its an array of categories
		store.save(function(err){
			if(err){
				if(err.code == 11000){
					return res.json({success:false,'message':'User already exists'});
				}
				else{
					return res.send(err)
				}
			}
			commons.saveSearchList(req.body.name,"store",city_name,req,res);
			for (var i = store.category.length - 1; i >= 0; i--) {
				commons.saveSearchList(store.category[i],"store-category",city_name,req,res);
			};

			res.json({message:"Store created"});
		});
	})
storeRouter.route('/cities')
	.get(function(req,res){

		UserSearch.find(function(err,cities){

			if(err){
				console.log(err);
				res.send(err);
			}

			res.json(cities);
			
		}).select({ "location": 1, "_id": 0});
	})

storeRouter.route('/storesCollection/stores/:location/:pageNo')
	.get(function(req,res){
		console.log(req.query);
		var queryObject = {'address.city':req.params.location};
		if(req.query.area){
				queryObject['address.area']=req.query.area;
		}
		if(req.query.locality){
				queryObject['address.locality']=req.query.locality;
		}
		if(req.query.category){
			console.log('catgeoty hete********');
			console.log(req.query.category);
			queryObject['category']=req.query.category;
		}
		console.log(queryObject);
		Store.paginate(queryObject,
			{page: req.params.pageNo, limit: 30}, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.json(result);
			}
		});
	})
	.post(function(req,res){
		var store = new Store();
		var recData = req.body;
		store.name = recData.name;
		var city_name = recData.address.city;
		store.address = recData.address;
		store.category = recData.category; //make sure its an array of categories
		store.save(function(err){
			if(err){
				if(err.code == 11000){
					return res.json({success:false,'message':'User already exists'});
				}
				else{
					return res.send(err)
				}
			}
			commons.saveSearchList(req.body.name,"store",city_name,req,res);
			for (var i = store.category.length - 1; i >= 0; i--) {
				commons.saveSearchList(store.category[i],"store-category",city_name,req,res);
			};

			res.json({message:"Store created"});
		});
	});
storeRouter.route('/storesCollection/storeName/:storeName/:location/:pageNo')
	.get(function(req,res){
		console.log(req.query);
		var queryObject = {'name':req.params.storeName,'address.city':req.params.location};
		if(req.query.area){
				queryObject['address.area']=req.query.area;
		}

		Store.paginate(queryObject,
			{page: req.params.pageNo, limit: 30 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{

				res.json(result);
			}
		});

	});
storeRouter.route('/storesCollection/category/:category/:location/:pageNo')
	.get(function(req,res){
		console.log(req.query);
		var queryObject = {'category':req.params.category,'address.city':req.params.location};
		if(req.query.area){
				queryObject['address.area']=req.query.area;
		}
		Store.paginate(queryObject,
			{page: req.params.pageNo, limit: 30 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{

				res.json(result);
			}
		});

	});

storeRouter.route('/categories/:pageNo')
	.get(function(req,res){
		Store.paginate({
			/*category: { $in: ['category1'] }*/
		}, { select:'category', page: req.params.pageNo, limit: 2 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				res.json(result);
			}
		});
	})
storeRouter.route('/singleStore/:store_id/:slug?')
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

module.exports = storeRouter;
