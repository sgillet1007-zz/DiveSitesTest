$(document).on('ready', function(){
    var map = L.map('leaflet-map').setView([18,-69],4);
    var editMode = false;

    // // Geonames map control feature
    // var control = L.control.geonames({
    //     username: 'sgillet',  // Geonames account username.  Must be provided
    //     zoomLevel: null,  // Max zoom level to zoom to for location.  If null, will use the map's max zoom level.
    //     maxresults: 5,  // Maximum number of results to display per search
    //     className: 'fa fa-crosshairs',  // class for icon
    //     workingClass: 'fa-spin',  // class for search underway
    //     featureClasses: ['A', 'H', 'L', 'P', 'R', 'T', 'U', 'V'],  // feature classes to search against.  See: http://www.geonames.org/export/codes.html
    //     baseQuery: 'isNameRequired=true',  // The core query sent to GeoNames, later combined with other parameters above
    //     position: 'topleft'
    // });

    // map.addControl(control);
    
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

        
        // declare 3 local variables to store name, lat, lng of dive from API.

        if (editMode === true){
        // var marker = L.marker([e.latlng.lat,e.latlng.lng],{icon: diveIcon}).addTo(map);
        // marker.bindPopup("PopupText").openPopup();
        
        $.ajax({
            method  : 'GET',
            url     : '/getSites',
            data    : {lat : e.latlng.lat, lng : e.latlng.lng},
            success : function(data){
                var parsed = JSON.parse(data);
                $('#dive-select').empty();
                $('#dive-select').prepend('<h3>Pick a Dive Site...</h3>');
                parsed.sites.forEach(function(i){
                    $('#dive-select').css({'display':'block'});
                    $('#dive-select').append('<div class="select-dive-item" id="'+i.id+'" data-lat="' + i.lat + '"data-lng="'+ i.lng +'"data-name="'+i.name+'">'+i.name+'</div>');
                    // when user selects an element, i.name, i.lat, and i.lng get passed to local variables.
                    // marker is added to map based on element selected.
                    var marker = L.marker([e.latlng.lat,e.latlng.lng],{icon: diveIcon}).addTo(map);
                    marker.bindPopup("PopupText").openPopup();


                })
            }
        }) 
        }  
    editMode = false;
    }
});