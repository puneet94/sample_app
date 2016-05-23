//Node Packages from node_modules
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

//Variables
var port = process.env.PORT || 3000;
var app = express();

//Imports from custom made js
var User = require('./models/user');
//var UserSearch = require('./models/user_search');
//var Store = require('./models/storeModel');
var adminRouter = require('./routes/admin');
var userApiRouter = require('./routes/user/api');
var storeRouter = require('./routes/store');
var searchRouter = require('./routes/searchRoute');
var productRouter = require('./routes/productRoute');
//Middleware from built-in methods
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('views',__dirname+"/views");
app.set('view engine',"jade");
//Middleware from custom methods
app.use('/admin',adminRouter);
app.use('/api',userApiRouter);
app.use('/store',storeRouter);
app.use('/search',searchRouter);
app.use('/product',productRouter);
app.use(express.static(__dirname + '/public')); 
app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.listen(3000,function(){
	console.log("Listening");
	console.log(__dirname);
})