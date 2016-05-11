var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
mongoose.createConnection("mongodb://localhost:27017/shop_directory",function (err) {
  if (err) {
    console.log(err);
  }
});
var ImageLink = new Schema({
	imageLink : String
});
var UserID = new Schema({
	userId : String
});
var Review = new Schema({
    description  : String, 
    date  : Date,
    time : { type : Date, default: Date.now },
    userId : UserID,
    upvotes : [UserID]
});
var Address = new Schema({
	doorNo:String,
	city:String,
	state:String,
	country:String,
	district:String,
	zipCode:String,
	area:String,
	locality:String
});
var Price = new Schema({
	value:Number,
	currency:String
});
var Product = new Schema({
	name:String,
	description:String,
	category:String,
	subCategory:String,
	price:Price,
	sizesAvailable:String,
	comments:[Review],
	upvotes:[UserID],
	images:[ImageLink]
});

var StoreSchema = new Schema({
	name:String,
	address:Address,
	reviews:[Review],
	products:[Product],
	upvotes:[UserID],
	images:[ImageLink],
	visits:[UserID],
	slug:String
	/*username:{type:String,required:true,index:{unique:true}},
	password:{type:String,required:true,select:false}*/
},{ collection : 'stores' });

// var UserSchema = new Schema({
// 	name:String,
// 	address:String,
// 	username:{type:String,required:true,index:{unique:true}},
// 	password:{type:String,required:true,select:false}
// });
module.exports = mongoose.model('Store',StoreSchema);

