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
					editMode = false;
					parsed.sites.forEach(function(i){
						$('#dive-select').css({'display':'block'});
						$('#dive-select').append('<div class="select-dive-item" id="'+i.id+'" data-lat="' + i.lat + '"data-lng="'+ i.lng +'"data-name="'+i.name+'">'+i.name+'</div>');
					})
				},
			});
		}  
	}
	//click handler for dive select 
	$(document).on('click','.select-dive-item', function(){
		// var dive = $(this).data('name');
		// var lat = $(this).data('lat');
		// var lng =$(this).data('lng');

		//outlines selected dive site in red
		$(this).css({"border":"2px solid red"});
		//hides dive form
		$('#dive-select').hide(100);
		//show dive form
		$('#dive-form').show(300);
		//adds marker to map at dive location
		var marker = L.marker([$(this).data('lat'),$(this).data('lng')],{icon: diveIcon}).addTo(map);
		//binds popup to marker
		marker.bindPopup($(this).data('name')).openPopup(); //refactor to include diveNo

		$('.dive-form-data').on('submit', function(e){
			e.preventDefault();
			var formData = [];
			formData.push($(this).serializeArray());
			console.log(formData); //why do multipe Arrays get console logged here??????
			$('#dive-form').hide(300);
			$.ajax({
				method   : 'POST',
				url      : '/postDive',
				data     : formData
			})
		})
	})
});