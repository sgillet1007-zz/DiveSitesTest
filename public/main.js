$(document).on('ready', function(){
    var map = L.map('leaflet-map').setView([18,-69],4);
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
    
    Esri_NatGeoWorldMap.addTo(map);
    
    function onMapClick(e) {
        var marker = L.marker([e.latlng.lat,e.latlng.lng],{icon: diveIcon}).addTo(map);
        marker.bindPopup("PopupText").openPopup();
        $.ajax({
            method  : 'GET',
            url     : '/getSites',
            data    : {lat : e.latlng.lat, lng : e.latlng.lng},
            success : function(data){
                var parsed = JSON.parse(data);
                console.log(parsed);
                $('#dive-select').empty();
                parsed.sites.forEach(function(i){
                    $('#dive-select').append('<p>'+i.name+'</p>');

                })
            }
        })
    }
});