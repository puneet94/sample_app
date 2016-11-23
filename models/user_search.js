var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var urlStrings = require('../routes/url.js');

//var connectionString = "mongodb://shopdb:shopdb1234@ds029476.mlab.com:29476/shopdb";
var connectionString  = "mongodb://shop_dir:shop_dir@ds023912.mlab.com:23912/shoppins";
mongoose.createConnection(urlStrings.connectionString,function (err) {
  if (err) {
    console.log(err);
  }
});
var UserSearchSchema = new Schema(
	{	userSearchString:{type:String,required:true,index:{unique:true}},
		location:String
},{ collection : 'searches' });
					
module.exports = mongoose.model('UserSearch',UserSearchSchema);

