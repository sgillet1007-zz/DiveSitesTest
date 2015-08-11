var mongoose = require('mongoose');

// Schema structure for our Dive model
var diveSchema = mongoose.Schema({
	_diver          : {type: mongoose.Schema.ObjectId, ref : 'Profile'}
	diveNo          : {type : Number},
	date            : {type : Date},
	diveSite        : {type : String},
	diveLat         : {type : Number},
	diveLng         : {type : Number},
	cntry           : {type : String},
	timeIn          : {type : String},
	timeOut         : {type : String},
	diveTimeMins    : {type : Number}, //calculated from diveTime helper function
	pStart          : {type : Number},
	pEnd            : {type : Number},
	pUsed		    : {type : Number}, //calculated from psiUsed helper function
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
	divePhotos      : {type : String}, //link to dive photos stored on AWS S3
	diveLogScan     : {type : String}, //link to to uploaded scanned logbook sheet
	
});

// This instantiates the collection Dive
var Dive = mongoose.model('Dive', diveSchema);

// IMPORTANT - export this model so we can use it in other files
module.exports = Dive;