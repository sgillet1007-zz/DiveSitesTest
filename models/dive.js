var mongoose = require('mongoose');

// Schema structure for our Dive model
var diveSchema = mongoose.Schema({
	_diver          : {type: mongoose.Schema.ObjectId, ref : 'User'},
	date            : {type : Date},
	timeIn          : {type : String},
	timeOut         : {type : String},
	pStart          : {type : Number},
	pEnd            : {type : Number},
	weight          : {type : Number},
	suitType        : {type : String},
	diveType        : {type : String},
	diveConditions  : {type : String},
	tWater          : {type : Number},
	tAir            : {type : Number},
	visibility      : {type : Number},
	diveCompType    : {type : String},
	diveMaxDepth    : {type : Number},
	notes			: {type : String},
	diveSite        : {type : String},
	diveLat         : {type : Number},
	diveLng         : {type : Number},
});

// This instantiates the collection Dive
var Dive = mongoose.model('Dive', diveSchema);

// IMPORTANT - export this model so we can use it in other files
module.exports = Dive;