var express = require('express');
var models = require('..//models/storeModel');
var Product = models.Product;
var Store = models.Store;
var mongoose = require('mongoose');
var productRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;

productRouter.use(function(req,res,next){
	console.log("product");
	console.log(req.method,req.url);
	next();
});

productRouter.route('/products')
	.get(function(req,res){
		Product.find(function(err,products){
			if(err){
				res.send(err);
			}
			console.log("hello");
			res.json(products);
			//res.render("stores",{"stores":stores});
		})
	})
productRouter.route('/products/:storeId/:pageNo')
	.post(function(req,res){
		var product = new Product();
		var recData = req.body;
		product.name = recData.name;
		product.description=recData.description;
		product.category=recData.category;
		product.subCategory=recData.subCatgeory;
		//product.price=recData.price;
		product.sizesAvailable=recData.sizesAvailable;
		product.store = mongoose.Types.ObjectId(req.params.storeId);
		console.log(typeof(req.params.storeId));
		var city_name = "nopeeeeejjjje";//ObjectId.fromString new ObjectId(product.store)
		Store.findById(mongoose.Types.ObjectId(req.params.storeId),function(err,store){
				if(err){
					console.log("inside save of product");
					//res.send(err);
					console.log(err);

				}
				else{

					//res.send(stores);
					city_name = store.address.city;
				}
		})
		product.save(function(err){
			if(err){
				if(err.code == 11000){
					return res.json({success:false,'message':'Product already exists'});
				}
				else{
					console.log(err);
					return res.send(err);

				}
			}

			commons.saveSearchList(recData.name.toLowerCase(),"product",city_name,req,res);
			commons.saveSearchList(recData.category.toLowerCase(),"product-category",city_name,req,res);
			commons.saveSearchList(recData.subCatgeory.toLowerCase(),"product-subcategory",city_name,req,res);
			res.json({message:"Product created"});
		});
	})
	.get(function(req,res){
		Product.paginate({'store':req.params.storeId},
			{page: req.params.pageNo, limit: 10 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.json(result);
			}
		});
	})
productRouter.route('/products/category/:storeId/:category/:pageNo')
	.get(function(req,res){
		Product.paginate({'store':req.params.storeId,'category':req.params.category},
			{page: req.params.pageNo, limit: 10 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.json(result);
			}
		});
	})


module.exports = productRouter;
