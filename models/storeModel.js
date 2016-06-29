var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
URLSlugs = require('mongoose-url-slugs');
var mongoosePaginate = require('mongoose-paginate');
var relationship = require("mongoose-relationship"); //Refer https://www.npmjs.com/package/mongoose-relationship
var Schema  = mongoose.Schema;

mongoose.createConnection("mongodb://shop_dir:shop_dir@ds023912.mlab.com:23912/shoppins",function (err) {
  if (err) {
    console.log(err);
  }
});

var VisitSchema = new Schema({
    date  : { type : Date, default: Date.now},
    time : { type : Date, default: Date.now },
    store : { type:Schema.ObjectId, ref:"Store",childPath:"visits" },
    user : { type:Schema.ObjectId, ref:"User",childPath:"visits" }
},{ collection : 'visits' });

VisitSchema.plugin(relationship, { relationshipPathName:'user' });
VisitSchema.plugin(relationship, { relationshipPathName:'store' });


var UpvoteSchema = new Schema({
    date  : { type : Date, default: Date.now},
    time : { type : Date, default: Date.now },
    store : { type:Schema.ObjectId, ref:"Store",childPath:"upvotes" },
    product : { type:Schema.ObjectId, ref:"Product",childPath:"upvotes" },
    user : { type:Schema.ObjectId, ref:"User",childPath:"upvotes" },
    review : { type:Schema.ObjectId, ref:"Review",childPath:"upvotes" },
},{ collection : 'upvotes' });

UpvoteSchema.plugin(relationship, { relationshipPathName:'user' });
UpvoteSchema.plugin(relationship, { relationshipPathName:'store' });
UpvoteSchema.plugin(relationship, { relationshipPathName:'product' });
UpvoteSchema.plugin(relationship, { relationshipPathName:'review' });


var ReviewSchema = new Schema({
    description  : String,
    date  : { type : Date, default: Date.now},
    time : { type : Date, default: Date.now },
    store : { type:Schema.ObjectId, ref:"Store",childPath:"reviews" },
    product : { type:Schema.ObjectId, ref:"Product",childPath:"reviews" },
    user : { type:Schema.ObjectId, ref:"User",childPath:"reviews" },
    upvotes:[{ type:Schema.ObjectId, ref:"Upvote" }],
    rating:{type:String,default:'0'}
},{ collection : 'reviews' });

ReviewSchema.plugin(relationship, { relationshipPathName:'user' });
ReviewSchema.plugin(relationship, { relationshipPathName:'store' });
ReviewSchema.plugin(relationship, { relationshipPathName:'product' });

var UserSchema = new Schema({
	"firstName":String,
	"lastName":String,
	"email":String,
	"password":String,
	"facebook": String,
	"picture":{type:String,default:'https://cdn3.iconfinder.com/data/icons/black-easy/512/538303-user_512x512.png'},
	"displayName": String,
	reviews:[{ type:Schema.ObjectId, ref:"Review" }],
	visits:[{ type:Schema.ObjectId, ref:"Visit" }],
	upvotes:[{ type:Schema.ObjectId, ref:"Upvote" }]

},{ collection : 'users' });

UserSchema.methods.toJSON = function(){
	var user = this.toObject();
	delete user.password;
	return user;

}

UserSchema.methods.comparePasswords = function(password,callback){
	bcrypt.compare(password,this.password,callback);

}

var User = mongoose.model('User',UserSchema);
var Visit = mongoose.model('Visit',VisitSchema);
var Review = mongoose.model('Review',ReviewSchema);

UserSchema.pre('save',function(next){
	var user = this;
	if(!user.isModified('password')) return next();
	bcrypt.hash(user.password,null,null,function(err,hash){
		if(err) return next(err);
		user.password = hash;
		next();
	});
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
	reviews:[{ type:Schema.ObjectId, ref:"Review" }],
	products:[{ type:Schema.ObjectId, ref:"Product" }],
	upvotes:[{ type:Schema.ObjectId, ref:"Upvote" }],
	bannerImage:{type:String,default:'https://upload.wikimedia.org/wikipedia/commons/3/3a/SM_Department_Store_Cubao.jpg'},
  storeImages:[String],
	visits:[{ type:Schema.ObjectId, ref:"Visit" }]
},{ collection : 'stores' });


var ProductSchema = new Schema({
	name:String,
	description:String,
	category:String,
	subCategory:String,
	price:Price,
	sizesAvailable:String,
	reviews:[{ type:Schema.ObjectId, ref:"Review" }],
	upvotes:[{ type:Schema.ObjectId, ref:"Upvote" }],
	images:[String],
	store: { type:Schema.ObjectId, ref:"Store", childPath:"products" }
});
ProductSchema.plugin(relationship, { relationshipPathName:'store' });


StoreSchema.plugin(URLSlugs('name address.area address.city address.state address.country', {field: 'myslug'}));
StoreSchema.plugin(mongoosePaginate);
ProductSchema.plugin(mongoosePaginate);

exports.Store = mongoose.model('Store',StoreSchema);
exports.Product = mongoose.model("Product", ProductSchema);
exports.User = User;
exports.Review = Review;
exports.Visit = Visit;


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
