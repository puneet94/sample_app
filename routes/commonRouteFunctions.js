var UserSearch = require('..//models/user_search');
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

module.exports = cob;