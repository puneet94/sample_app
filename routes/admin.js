var express = require('express');
var adminRouter = express.Router();

adminRouter.use(function(req,res,next){
	console.log(req.url,req.method);
	next();
});

adminRouter.param('name',function(req,res,next,name){
	console.log("name validated "+name);
	next();
});

adminRouter.get('/',function(req,res){
	console.log("root method");
	res.json({message:"I'm the dashboard"});
});

adminRouter.get('/users/:name',function(req,res){
	console.log("users method");
	res.send("User"+req.params.name);
});

adminRouter.get('/posts',function(req,res){
	console.log("posts method");
	res.send("All posts");
});

module.exports = adminRouter;