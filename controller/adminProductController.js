var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cloudinary = require('cloudinary').v2;
var models = require('..//models/storeModel');
var Product = models.Product;
var Store = models.Store;
var User = models.User;
var jwt = require('jsonwebtoken');
var common = require('../routes/commonRouteFunctions');;
var adminProductController = {
  createProduct: createProduct,
  editProduct: editProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct
};
function createProduct(req, res){
  var product = new Product();
  var address = {};
  item = req.body;
  product.name = item.name;
  product.description = item.description;
  product.category = item.category;
  product.subCategory = item.subCategory;
  price.value = item.price.value;
  price.currency = item.price.currency||'INR';
  product.price = price;
  product.sizesAvailable=item.sizesAvailable;
  product.store = req.params.storeid;
  Store.findById(req.params.storeid,function(err,store){
    if(err){
      console.log(err);
    }
    else{
      product.address = store.address;
      product.save(function (error,result) {
        if (error){
          console.log("error" + error);
        }
        else{
          common.saveSearchList(product.name.toLowerCase(),"product",product.address.city,req,res);
          common.saveSearchList(product.category.toLowerCase(),"product-category",product.address.city,req,res);
          common.saveSearchList(product.subCategory.toLowerCase(),"product-subcategory",product.address.city,req,res);
          res.json(result);
        }
      });
    }
  });
  


         
}

function editProduct(req, res){
  console.log(typeof req.query.select);
  Product.findById(req.params.productId)
  .select(req.query.select)
  .exec(function (error, result) {
    if (error){
      console.log("error while reading");
    }
    else{
      console.log(result);
      res.json(result);
    }
  });
 }

function updateProduct(req, res){
  
  Product.findById(req.params.productId, function (err, product) {
    if (err){
      callback(err, null);
    }
    else {
      item = req.body;
      product.name = item.name;
      product.description = item.description;
      product.category = item.category;
      product.subCategory = item.subCategory;
      price.value = item.price.value;
      price.currency = item.price.currency||'INR';
      product.price = price;
      product.sizesAvailable=item.sizesAvailable;
      product.save(function (err, result) {
        res.json(result);
      });
    }
  });
}
function deleteProduct(req, res){
  
  Product.findById(req.params.productId, function (err, product) {
    if (err){
      callback(err, null);
    }
    else {
      
    }
  });
}


module.exports = adminProductController;
