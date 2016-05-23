var mongoose = require('mongoose');
URLSlugs = require('mongoose-url-slugs');
var mongoosePaginate = require('mongoose-paginate');
var relationship = require("mongoose-relationship");
var Schema  = mongoose.Schema;

mongoose.createConnection("mongodb://localhost:27017/shop_directory",function (err) {
  if (err) {
    console.log(err);
  }
});


var ImageLink = new Schema({
	imageLink : {type:String}
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

var StoreSchema = new Schema({
	name:String,
	address:Address,
	category:[String],
	reviews:[Review],
	products:[{ type:Schema.ObjectId, ref:"Product" }],
	upvotes:[UserID],
	images:[String],
	visits:[UserID]
},{ collection : 'stores' });


var ProductSchema = new Schema({
	name:String,
	description:String,
	category:String,
	subCategory:String,
	price:Price,
	sizesAvailable:String,
	comments:[Review],
	upvotes:[UserID],
	images:[ImageLink],
	store: { type:Schema.ObjectId, ref:"Store", childPath:"products" }
});
ProductSchema.plugin(relationship, { relationshipPathName:'store' });
//var Product = ;

StoreSchema.plugin(URLSlugs('name address.area address.city address.state address.country', {field: 'myslug'}));
StoreSchema.plugin(mongoosePaginate);
exports.Store = mongoose.model('Store',StoreSchema);
exports.Product = mongoose.model("Product", ProductSchema);



/*

var ParentSchema = new Schema({
    children:[{ type:Schema.ObjectId, ref:"Child" }]
});
var Parent = mongoose.model("Parent", ParentSchema);
 
var ChildSchema = new Schema({
    parent: { type:Schema.ObjectId, ref:"Parent", childPath:"children" }
});
ChildSchema.plugin(relationship, { relationshipPathName:'parent' });
var Child = mongoose.model("Child", ChildSchema)
*/


/*
var parent = new Parent({});
parent.save();
var child = new Child({parent:parent._id});
child.save() //the parent children property will now contain child's id 
child.remove() //the parent children property will no longer contain the child's id 
*/

