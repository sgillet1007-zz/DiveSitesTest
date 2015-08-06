var request = require('request');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	getSites : function(req, res){
		// res.send('http://api.divesites.com/?mode=sites&lat=47.6031537682643&lng=-122.336164712906&dist=25');
		// request module in node...
		request('http://api.divesites.com/?mode=sites&lat=47.6031537682643&lng=-122.336164712906&dist=25', function (error, response, body) {
  			if (!error && response.statusCode == 200) {
    		console.log(response) // Show the HTML for the Google homepage. 
  			}
		})
	}
};

module.exports = indexController;