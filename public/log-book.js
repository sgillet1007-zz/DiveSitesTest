$(document).on('ready', function(){
	
	$('.button').on('click', function() {
    	$('.content').toggleClass('isOpen');
  	});

	$.ajax({
		method    : 'GET',
		url       : '/getDives',
		success	  : function(dives){
			dives.forEach(function(i){
				console.log(i);
				// $('#log-book').prepend('<h4>' + i.diveSite + '</h4>');
				$('#log-book').prepend('<div class="log-record"><div class="log-record-header"><div class="bloghead">'+ i.diveSite + ' || ' + i.date +'</div></div><div class="log-record-details"><div class="row"><div class="col-sm-4"></div><div class="col-sm-4"><strong>'+ i.diveSite +'</strong></div><div class="col-sm-4"></div></div><div class="row"><div class="col-sm-3"><strong>&nbsp Time In: </strong>' + i.timeIn + '</div><div class="col-sm-3"><strong> Time Out:  </strong>'+ i.timeOut + '</div><div class="col-sm-6"><strong> Dive Duration (mins): </strong>'+ '**DIVE TIME**' + '</div></div><div class="row"><div class="col-sm-3"><strong>&nbsp Max. Depth:  </strong>'+ i.diveMaxDepth + '</div><div class="col-sm-3"><strong> Visibility (ft): </strong>'+ i.visibility + '</div><div class="col-sm-6"><strong> Water Temp. (F): </strong>'+ i.tWater + '</div></div><div class="row"><div class="col-sm-3"><strong>&nbsp psi Start: </strong>'+ i.pStart + '</div><div class="col-sm-3"><strong> psi End: </strong>'+ i.pEnd + '</div><div class="col-sm-6"><strong> Air Consumption Rate (psi/min): </strong>'+ '**AIR CONS**' + '</div></div><div class="row"><div class="col-sm-3"><strong>&nbsp Dive Type: </strong>'+ i.diveType + '</div><div class="col-sm-3"><strong> Water Type: </strong>'+ '**FRESH/SALT**' + '</div><div class="col-sm-6"><strong> Verification #: </strong>'+ '**VERIFICATION**' + '</div></div><div class="row"><div class="col-sm-12"><strong>&nbsp Notes: </strong>'+ i.notes + '</div></div></div></div>');
			})
			$(document).on('click','.log-record-header', function(){
					$(this).siblings().toggle(600);
			});
		}
	}); //end ajax request	
});
	