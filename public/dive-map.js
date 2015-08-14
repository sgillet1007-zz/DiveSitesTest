$(document).on('ready', function(){

	$('.button').on('click', function() {
    	$('.content').toggleClass('isOpen');
  	});

	$.ajax({
		method    : 'GET',
		url       : '/getDives',
		success	  : function(dives){
			// console.log(dives);
			var mapDives = L.map('leaflet-map').setView([18,-69],4);
			var editMode = false;
			
			
			// mapDives.on('click', onMapClick);

			var Esri_NatGeoWorldMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
				attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
				maxZoom: 16
			});

			var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			});
			
			Esri_NatGeoWorldMap.addTo(mapDives);

			var diveIcon = L.icon({
				iconUrl: '/images/scubadiving2.png',
				iconSize:     [17, 26], // size of the icon
				iconAnchor:   [8, 28], // point of the icon which will correspond to marker's location
				popupAnchor:  [5, -30] // point from which the popup should open relative to the iconAnchor
			});

			dives.forEach(function(i){
				//adds marker to map at dive location
				var marker = L.marker([i.diveLat,i.diveLng],{icon: diveIcon}).addTo(mapDives);
				//binds popup to marker
				marker.bindPopup(i.diveSite).openPopup(); //get data from db
			})
		}
	})
});