$(document).on('ready', function(){
	var map = L.map('leaflet-map').setView([18,-69],4);
	var editMode = false;
	
	map.on('click', onMapClick);
	
	// create custom icon
	var diveIcon = L.icon({
		iconUrl: '/images/scubadiving2.png',
		iconSize:     [17, 26], // size of the icon
		iconAnchor:   [8, 28], // point of the icon which will correspond to marker's location
		popupAnchor:  [5, -30] // point from which the popup should open relative to the iconAnchor
	});
	// **************************  MAP TILE LAYERS  *************************************
	var Esri_NatGeoWorldMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
		maxZoom: 16
	});

	var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	});
	
	Esri_NatGeoWorldMap.addTo(map);
	// ***********************************************************************************
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

	
	$('.newDive').on('click', function(){
		editMode = !editMode;
	});

	function onMapClick(e) {
		if (editMode === true){
			$.ajax({
				method  : 'GET',
				url     : '/getSites',
				data    : {lat : e.latlng.lat, lng : e.latlng.lng},
				success : function(data){
					var parsed = JSON.parse(data);
					$('#dive-select').empty();
					$('#dive-select').prepend('<h3>Click on dive site...</h3>');
					parsed.sites.forEach(function(i){
						$('#dive-select').css({'display':'block'});
						$('#dive-select').append('<div class="select-dive-item" id="'+i.id+'" data-lat="' + i.lat + '"data-lng="'+ i.lng +'"data-name="'+i.name+'">'+i.name+'</div>');	
					})
				},
			});
		//click handler for dive select 
		$(document).on('click','.select-dive-item', function(){
			
			var dive = $(this).data('name');
			var lat = $(this).data('lat');
			var lng =$(this).data('lng');

			//outlines selected dive site in red
			$(this).css({"border":"2px solid red"});
			//adds marker to map at dive location
			var marker = L.marker([$(this).data('lat'),$(this).data('lng')],{icon: diveIcon}).addTo(map);

			//binds popup to marker
			marker.bindPopup($(this).data('name')).openPopup(); //refactor to include diveNo
			
			//hide dive sites and show dive form
			$('#dive-select').toggle(100);
			$('#dive-form').toggle(300);

			$('#submit-btn').on('click', function(){
				// var diveNo = ;
				var date = $('#input-date').val();
				var diveSite = dive;
				var diveLat = lat;
				var diveLng = lng;          
				var timeIn = $('#input-timeIn').val();
				var timeOut = $('#input-timeOut').val();
				var diveTimeMins = diveTime(timeIn,timeOut); //calculated from diveTime helper function
				var pStart = $('#input-psiStart').val();          
				var pEnd = $('#input-psiEnd').val();            
				var pUsed = psiUsed(pStart,pEnd);
				var weight = $('#input-weight').val();          
				var suitType = $('#input-suitType').val();        
				var diveType = $('#input-diveType').val();        
				var diveConditions = $('#input-diveConditions').val();  
				var tWater = $('#input-twater').val();          
				var tAir = $('#input-tAir').val();            
				var visibility = $('#input-visibility').val();    
				var diveCompType = $('#input-diveCompType').val();  
				var diveMaxDepth  = $('#input-diveMaxDepth').val(); 
				var notes = $('#input-notes').val();
				// var divePhotos     //link to dive photos stored on AWS S3
				// var diveLogScan
				$('#dive-form').toggle(300);
				console.log('date :' + date +'diveSite :'+ diveSite +'diveLat :'+ diveLat +'diveLng :'+ diveLng + 'diveTimeMins :' + diveTimeMins);
			})
		})
		}  
	editMode = false;
	}
});