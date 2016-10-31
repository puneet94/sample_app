var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cloudinary = require('cloudinary').v2;
var multer = require('multer');
var upload = multer({ dest: './uploads/'});



cloudinary.config({
    cloud_name: 'shoppingdirectory',
    api_key: '967339527283183',
    api_secret: '74NXckYl9m1-O0_ZTU8U_qoIDfw'
});
var common = require('../routes/commonRouteFunctions');;
var uploadController = {
  singleUpload: singleUpload,
  multipleUpload: multipleUpload
};
function singleUpload(req, res){
  var file = req.file;    
  console.log("image upload");
  cloudinary.uploader.upload(file.path, function(reqc, resc) {
    var imgUrl = resc.url;
    console.log(imgUrl);
    res.send(imgUrl);
  });

}
  
  
         


function multipleUpload(req, res){
  
 }

module.exports = uploadController;
