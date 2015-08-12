var request = require('request');
var mongoose = require('mongoose');
var Dive = require('../models/dive.js');
var User = require('../models/user.js');

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
	
	postDive : function(req, res){
		
		var dive = {
			_diver : req.user._id,
			date  : req.body.date,
			timeIn  : req.body.timeIn,
			timeOut : req.body.timeOut,
			pStart : req.body.pStart,
			pEnd : req.body.pEnd,
			weight : req.body.weight,
			suitType : req.body.suitType,
			diveType : req.body.diveType,
			diveConditions : req.body.diveConditions,
			tWater : req.body.tWater,
			tAir : req.body.tAir,
			visibility : req.body.visibility,
			diveCompType : req.body.diveCompType,
			diveMaxDepth : req.body.diveMaxDepth,
			notes : req.body.notes,
			diveSite : req.body.diveSite,
			diveLat : req.body.diveLat,
			diveLng : req.body.diveLng
		}
		//create the Dive
		var newDive = new Dive(dive);

		//Save the Dive
		newDive.save(function(err, doc){
			console.log("Save Err : ", err);
			if (err) {
				// Simple Error handling by sending raw text to client
				res.send("can't add dive - " + err.message)
			}
			else {
				User.update({_id: req.user._id}, {$push : {_dives: doc._id }}, function(err,data){
						console.log(err,data);
				});
				res.redirect('/');
			}
		})
	}
};

module.exports = indexController;