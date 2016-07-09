var UserSearch = require('..//models/user_search');
var moment = require('moment');
var jwt = require('jwt-simple');
var cob = {};
cob.saveSearchList = function(query,kind,location,req,res){
	var userSearch = new UserSearch();
		var delimiter = "#&#";
		userSearch.userSearchString = query+delimiter+kind+delimiter+location;
		userSearch.location = location;
		userSearch.save(function(err){
			if(err){
				console.log(err)
			}
		});
};
cob.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (!req.header('authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('authorization').split(' ')[1];
//take from cookie
  var payload = null;
  try {
    payload = jwt.decode(token, "shhh..");
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}
module.exports = cob;
