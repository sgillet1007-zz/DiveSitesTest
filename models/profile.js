// var mongoose = require('mongoose');

// // Schema structure for our Profile model
// var profileSchema = mongoose.Schema({
// 	name        : {type : String, required : true},
// 	pwd    	    : {type : String},
// 	email       : {type : String, required: true},
// 	frstName    : {type : String},
// 	lastName    : {type : Boolean, default : false},
// 	cumDiveHrs  : {type :Number, default : 0},
// 	avgAirCons  : {type:Number, default : 0},
// 	_dives      : [{type: mongoose.Schema.ObjectId, ref : 'Dive'}] //db stores an array of _id's use populate() to link the rest of the fields for each record.
// });

// // This instantiates the collection Profile
// var Profile = mongoose.model('Profile', profileSchema);

// // IMPORTANT - export this model so we can use it in other files
// module.exports = Profile;