var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var request = require('request');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

app.get('/getSites', function(){
	request('http://www.google.com', function (error, response, body) {
  			// if (!error && response.statusCode == 200) {
    			console.log('body') 
  			// }
		})
});

var server = app.listen(4477, function() {
	console.log('Express server listening on port ' + server.address().port);
});
