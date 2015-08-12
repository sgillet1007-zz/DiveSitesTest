var request = require('request');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	getSites : function(req, res){
		var lat = req.query.lat;
		var lng = req.query.lng;

		request('http://api.divesites.com/?mode=sites&lat='+ lat + '&lng=' + lng +'&dist=10', function (error, response, body) {
  			if (!error && res.statusCode == 200) {
    			res.send(body);
  			}
		})
	},
	postDive : function(req,res){ //THIS ROUTE CONTROLLER NEEDS FIX!!!!
		res.render('postDiveTest'); //how to I get the postDiveTest view to render????
		console.log('this is your controller...');
	}
};

module.exports = indexController;