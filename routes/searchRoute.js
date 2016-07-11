var express = require('express');
var UserSearch = require('..//models/user_search');
var searchRouter = express.Router();

searchRouter.use(function(req,res,next){
	console.log("search route");
	console.log(req.method,req.url);
	next();
});


searchRouter.route('/searches/:location_name')
	.get(function(req,res){
		var city = req.params.location_name.toLowerCase();
		UserSearch.find({ 'location':city  },function(err,searches){
			if(err){
				console.log("--------------------");
				console.log(err);
				res.send(err);
			}

			res.json(searches);
		})
	});

module.exports = searchRouter;
