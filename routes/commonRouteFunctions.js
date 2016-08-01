var UserSearch = require('..//models/user_search');
var moment = require('moment');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var models = require('..//models/storeModel');
var Review = models.Review;
var User = models.User;
var Store = models.Store;
var Upvote = models.Upvote;
var Product = models.Product;
var cob = {};
cob.saveSearchList = function(query,kind,location,req,res){
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
cob.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (!req.header('authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('authorization').split(' ')[1];
//take from cookie
  var payload = null;
  try {
    payload = jwt.decode(token, "shhh..");
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

cob.validateId = function validateId(id,entityType){
  /*var singleEntity = "";
  console.log(entityType);
  console.log(id);
  if(entityType.toLowerCase()=="store"){
    singleEntity = Store;
    console.log(entityType);
  }
  else if(entityType.toLowerCase()=="product"){
    singleEntity = Product;
    console.log(entityType);
  }
  else if(entityType.toLowerCase()=="review"){
    singleEntity = Review;
    console.log(entityType);
  }
  else if(entityType.toLowerCase()=="user"){
    singleEntity = User;
    console.log(entityType);
  }
  else if(entityType.toLowerCase()=="upvote"){
    singleEntity = Upvote;
    console.log(entityType);
  } */
  console.log("over here");
  console.log(entityType);
  return entityType.findById(mongoose.Types.ObjectId(id)).exec();
  
  
}
module.exports = cob;
