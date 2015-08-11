var mongoose = require('mongoose');

// Schema structure for our Profile model
var profileSchema = mongoose.Schema({
	userName        : {type : String, required : true},
	userPwd    	    : {type : String},
	userEmail       : {type : String, required: true},
	userFirstName   : {type : String},
	userLastName    : {type : Boolean, default : false},
	userCumDiveHrs  : {type :Number, default : 0},
	userAvgAirCons  : {type:Number, default : 0},
	userDives       : [{type: mongoose.Schema.ObjectId, ref : 'Dive'}] //db stores an array of _id's use populate() to link the rest of the fields for each record.
});

// This instantiates the collection Profile
var Profile = mongoose.model('Profile', profileSchema);

// IMPORTANT - export this model so we can use it in other files
module.exports = Profile;