$(document).on('ready', function(){
	var diveTotal = 0;
	var diveHours = 0;
	var airConsTotal = 0;
	var avgAirCons = 0;

	var diveTime = function(timeIn,timeOut){
        var hoursIn = Number(timeIn.slice(0,2));
        var minsIn = Number(timeIn.slice(3));
        var startMins = (hoursIn*60)+minsIn;
        var hoursOut = Number(timeOut.slice(0,2));
        var minsOut = Number(timeOut.slice(3));
        var endMins = (hoursOut*60)+minsOut;
        var diveMins = endMins - startMins;
        return diveMins;
    }

    var psiUsed = function(psiIn, psiOut){
        var psiIn = Number(psiIn);
        var psiOut = Number(psiOut);
        var psiUsed = psiIn - psiOut;
        return psiUsed;
    }

    var roundTenths = function(num){
        var output = Math.round(num*10)/10;
        return output
    }

	$('.button').on('click', function() {
    	$('.content').toggleClass('isOpen');
  	});

	$.ajax({
		method    : 'GET',
		url       : '/getDives',
		success	  : function(dives){
			dives.forEach(function(i){
				airConsTotal += roundTenths(psiUsed(i.pStart,i.pEnd)/diveTime(i.timeIn,i.timeOut))
				console.log(airConsTotal);
			})
		},
	});
});