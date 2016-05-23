var express = require('express');
var models = require('..//models/storeModel');
var Product = models.Product;
var Store = models.Store;
var productRouter = express.Router();
var commons = require('./commonRouteFunctions');

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
productRouter.route('/products/:storeId')
	.post(function(req,res){
		var product = new Product();
		var recData = req.body;
		product.name = recData.name;
		product.description=recData.description;
		product.category=recData.category;
		product.subCategory=recData.subCatgeory;
		//product.price=recData.price;
		product.sizesAvailable=recData.sizesAvailable;
		product.store = ""+req.params.storeId;
		console.log(req.params.storeId);
		var city_name = "not insta";
		Store.findById(product.store,function(err,store){
				if(err){
					console.log("inside save of product");
					res.send(err);

				}
				else{
					console.log("999999999999999999999")
					console.log(store);
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
			
			commons.saveSearchList(recData.name,"product",city_name,req,res);
			commons.saveSearchList(recData.category,"category",city_name,req,res);
			commons.saveSearchList(recData.subCatgeory,"subcategory",city_name,req,res);
			res.json({message:"Product created"});
		});
	});



module.exports = productRouter;