$(document).on('ready', function(){

	var diveLocs = mongoose.find({},function(err,data){

	})

	$.ajax({
		method    : 'GET',
		url       : '/getDiveLocs',
		data      : diveLocs
	})





});