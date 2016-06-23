var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
//mongoose.createConnection('mongodb://localhost:27017/shop_directory');
mongoose.createConnection("mongodb://shop_dir:shop_dir@ds023912.mlab.com:23912/shoppins",function (err) {
  if (err) {
    console.log(err);
  }
});
var UserSearchSchema = new Schema(
	{	userSearchString:{type:String,required:true,index:{unique:true}},
		location:String
},{ collection : 'searches' });
					/*new Schema({ url: String, text: String, id: Number}, 
{ collection : 'question' });   // collection name*/

module.exports = mongoose.model('UserSearch',UserSearchSchema);

