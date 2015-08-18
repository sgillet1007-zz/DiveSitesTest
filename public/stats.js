$(document).on('ready', function(){
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

	var diveTally = 0;
	
	var diveMins = 0;
	var diveHours = 0;

	var airConsTotal = 0;
	var avgAirCons = 0;

	var longestDive = 0;
	var deepestDive = 0;


	$('.button').on('click', function() {
    	$('.content').toggleClass('isOpen');
  	});
  	$()

	$.ajax({
		method    : 'GET',
		url       : '/getDives',
		success	  : function(dives){
			dives.forEach(function(i){
				diveTally ++;

				diveMins += diveTime(i.timeIn,i.timeOut);
				diveHours = roundTenths(diveMins/60);

				airConsTotal += roundTenths(psiUsed(i.pStart,i.pEnd)/diveTime(i.timeIn,i.timeOut));
				
				if (diveTime(i.timeIn,i.timeOut) >= longestDive){
					longestDive = diveTime(i.timeIn,i.timeOut);
				}
				
				if (i.diveMaxDepth >= deepestDive){
					deepestDive = i.diveMaxDepth;
				}
			})
			avgAirCons = roundTenths(airConsTotal/diveTally);

			// $('#stats-frame').prepend('<h1 style="text-align:center"> Statistics </h1>');
			$('#stats-frame').append('<div class="stats-record"><strong>Total Dives: </strong> '+diveTally+'</div>');
			$('#stats-frame').append('<div class="stats-record"><strong>Total Dive Hours: </strong> '+diveHours+'</div>');
			$('#stats-frame').append('<div class="stats-record"><strong>Average Air Consumption Rate (psi/min): </strong> '+avgAirCons+'</div>');
			$('#stats-frame').append('<div class="stats-record"><strong>Longest Dive (mins): </strong> '+longestDive+'</div>');
			$('#stats-frame').append('<div class="stats-record"><strong>Deepest Dive (feet): </strong> '+deepestDive+'</div>');


			console.log('Total dives: ',diveTally,' Total dive hours: ',diveHours, ' Avg air cons: ',avgAirCons, 'Longest dive: ',longestDive, 'Deepest Dive : ', deepestDive);
		},
	});
});