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
		UserSearch.find({ 'location': req.params.location_name },function(err,searches){
			if(err){
				console.log("--------------------");
				console.log(err);
				res.send(err);
			}
			console.log("location searches");
			console.log(searches);
			res.json(searches);
		})
	});
	
module.exports = searchRouter;