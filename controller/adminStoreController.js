var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cloudinary = require('cloudinary').v2;
var models = require('..//models/storeModel');
var Store = models.Store;
var User = models.User;
var jwt = require('jsonwebtoken');
var common = require('../routes/commonRouteFunctions');;
var adminStoreController = {
  createStore: createStore,
  editStore: editStore,
  updateStore: updateStore,
  deleteStore: deleteStore
};
function createStore(req, res){
  var store = new Store();
  var address = {};
  item = req.body;
  store.name = item.name;
  address = item.address;
  store.address = address;
  store.category = item.category.split(",");
  store.subCategory = item.subCategory.split(",");
  store.keywords = item.keywords.split(",");
  store.bannerImage = item.bannerImage;
  store.admin = req.user;
  console.log(req.user+'gfnjfgng');
  console.log(store);
  store.save(function (error,result) {
    if (error){
      console.log("error" + error);
    }
    else{
      User.update({_id:req.user},{$push:{'storeId':store._id}},{upsert:true},function(err,data){
          if(err){
            console.log(error);
          }
          else{
            console.log("the suer stpre added");
          }
        })
      common.saveSearchList(store.name.toLowerCase(),"store",address.city,req,res);
      for (var i = 0;i<store.category.length; i++) {
          common.saveSearchList(store.category[i].toLowerCase(),"store-category",address.city,req,res);
       };
      res.json(result);
    }
  });
  
         
}

function editStore(req, res){
  console.log(typeof req.query.select);
  Store.findById(req.params.storeId)
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

function updateStore(req, res){
  Store.findById(req.params.storeId, function (err, store) {
    if (err){
      callback(err, null);
    }
    else {
      var address = {};
      item = req.body;
      store.name = item.name;
      address = item.address;
      store.address = address;
      store.category = item.category.split(",");
      store.subCategory = item.subCategory.split(",");
      store.keywords = item.keywords.split(",");
      store.bannerImage = item.bannerImage;
      store.save(function (err, result) {
        res.json(result);
      });
    }
  });
}
function deleteStore(req, res){
  
  Store.findById(req.params.storeId, function (err, store) {
    if (err){
      callback(err, null);
    }
    else {
      
    }
  });
}


module.exports = adminStoreController;
