$(document).on('ready', function(){
	
	$('.button').on('click', function() {
    	$('.content').toggleClass('isOpen');
  	});
    $('.nav').children().removeClass('active');
    $('.nav-log-book').addClass('active');

    // $('.nav').children().on('click', function(){
    //     $('.content').toggleClass('isOpen');
    // });

  	// dive time helper function. inputs start and end time strings. returns a number (minutes the dive lasted).
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

    // psi consumed helper function. inputs start and end psi strings. returns a number (psi used).
    var psiUsed = function(psiIn, psiOut){
        var psiIn = Number(psiIn);
        var psiOut = Number(psiOut);
        var psiUsed = psiIn - psiOut;
        return psiUsed;
    }
    //helper function to round to one decimal place
    var roundTenths = function(num){
        var output = Math.round(num*10)/10;
        return output
    }

	$.ajax({
		method    : 'GET',
		url       : '/getDives',
		success	  : function(dives){
            // $('#log-book').prepend('<div><h1 style="text-align:center"> Log Book </h1></div>');
			dives.forEach(function(i){
				console.log(i);
				// $('#log-book').prepend('<h4>' + i.diveSite + '</h4>');
				$('#log-book').prepend('<div class="log-record"><div class="log-record-header"><div class="bloghead"> Dive # '+ i.diveNo +' || ' + i.diveSite + ' || ' + i.date +'</div></div><div class="log-record-details"><div class="row"><div class="col-sm-4"></div><div class="col-sm-4"><strong>'+ i.diveSite +'</strong></div><div class="col-sm-4"></div></div><div class="row"><div class="col-sm-3"><strong>&nbsp Time In: </strong>' + i.timeIn + '</div><div class="col-sm-3"><strong> Time Out:  </strong>'+ i.timeOut + '</div><div class="col-sm-6"><strong> Dive Duration (mins): </strong>'+ diveTime(i.timeIn,i.timeOut) + '</div></div><div class="row"><div class="col-sm-3"><strong>&nbsp Max. Depth:  </strong>'+ i.diveMaxDepth + '</div><div class="col-sm-3"><strong> Visibility (ft): </strong>'+ i.visibility + '</div><div class="col-sm-6"><strong> Water Temp. (F): </strong>'+ i.tWater + '</div></div><div class="row"><div class="col-sm-3"><strong>&nbsp psi Start: </strong>'+ i.pStart + '</div><div class="col-sm-3"><strong> psi End: </strong>'+ i.pEnd + '</div><div class="col-sm-6"><strong> Air Consumption Rate (psi/min): </strong>'+ roundTenths(psiUsed(i.pStart,i.pEnd)/diveTime(i.timeIn,i.timeOut)) + '</div></div><div class="row"><div class="col-sm-3"><strong>&nbsp Dive Type: </strong>'+ i.diveType + '</div><div class="col-sm-3"><strong> Water Type: </strong>'+ i.wType + '</div><div class="col-sm-6"><strong> Verification #: </strong>'+ i.verifNo + '</div></div><div class="row"><div class="col-sm-12"><strong>&nbsp Notes: </strong>'+ i.notes + '</div></div></div></div>');
			})
			$(document).on('click','.log-record-header', function(){
					$(this).siblings().toggle(600);
			});
		}
	}); //end ajax request	
});
	