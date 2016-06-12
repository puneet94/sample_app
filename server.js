//Node Packages from node_modules
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');


var qs = require('querystring');
var moment = require('moment');
var request = require('request');
var jwt = require('jwt-simple');

//Variables
var port = process.env.PORT || 3000;
var app = express();

//Imports from custom made js
var facebookAuth  = require('./services/facebookAuth.js');
var createJWT = require('./services/jwtService.js');

//var UserSearch = require('./models/user_search');
//var Store = require('./models/storeModel');

var storeRouter = require('./routes/store');
var searchRouter = require('./routes/searchRoute');
var productRouter = require('./routes/productRoute');
var authenticateRouter = require('./routes/authenticateRoute');



//Middleware from built-in methods
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('views',__dirname+"/views");
app.set('view engine',"jade");

/*HTTPS for heroku
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}*/
//Middleware from custom methods

app.use('/store',storeRouter);
app.use('/search',searchRouter);
app.use('/product',productRouter);
app.use('/authenticate',authenticateRouter);
app.use(express.static(__dirname + '/public')); 
app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
mongoose.connect("mongodb://localhost:27017/shop_directory");
app.listen(3000,function(){
	console.log("Listening");
	console.log(__dirname);
})