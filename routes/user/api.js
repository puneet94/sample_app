var express = require('express');
var userApiRouter = express.Router();

var User = require('..//..//models/user');
userApiRouter.use(function(req,res,next){
	console.log("user api");
	console.log(req.method,req.url);
	next();
});

userApiRouter.route('/users')
	//Creating a new user
	.post(function(req,res){
		var user = new User();

		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;
		user.address = req.body.address;
		user.save(function(err){
			if(err){
				if(err.code == 11000){
					return res.json({success:false,'message':'User already exists'});
				}
				else{
					return res.send(err)
				}
			}
			res.json({message:"User created"});
		});
	})
	.get(function(req,res){
		User.find(function(err,users){
			if(err){
				res.send(err);
			}
			res.json(users);
		})
		
	});

userApiRouter.route('/users/:user_id')
	.get(function(req,res){
		User.findById(req.params.user_id,function(err,user){
			if(err){
				res.send(err);
			}
			else{
				res.json(user);
			}
		})
	})
	.put(function(req,res){
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
	})
	.delete(function(req,res){
		User.remove({
			_id:req.params.user_id
		},function(err,user){
			if(err){
				res.send(err);
			}
			else{
				res.json({message:"Successfully deleted"});
			}
		});
	})
	

module.exports = userApiRouter;