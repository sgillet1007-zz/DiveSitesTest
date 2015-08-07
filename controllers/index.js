var request = require('request');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	getSites : function(req, res){
		var lat = req.query.lat;
		var lng = req.query.lng;

		request('http://api.divesites.com/?mode=sites&lat='+ lat + '&lng=' + lng +'&dist=10', function (error, response, body) {
  			if (!error && response.statusCode == 200) {
    			res.send(body);
  			}
		})
	}
};

module.exports = indexController;