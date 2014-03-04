$(function(){
	initialize_map();
});


function initialize_map(){

	var	map = new L.mapbox.map('map', 'panicbus.h4on0f5b').setView([37.775,-122.419], 13);

	var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'}).addTo(map);


	// adds the GeoJson to the map layer from route.js
	map.featureLayer.setGeoJSON(geoJson_features);

	
	// this is the marker click listener 
	map.featureLayer.on('click',function(e) {
		$.get("/checkins/" + e.layer.feature.properties.location_id); // fyi this used to have another ,e.layer.etc
		
		// fills the mobile view with class for content_div
		$('.content_div').animate({height:"100%"}, 1000);
		$('#back_button').fadeIn();
	});

	$('body').on('click', '#back_button', function(){
		$('.content_div').animate({height:"30%"}, 1000);
		$('#back_button').fadeOut();
	})

	// Closes the marker popup when map is clicked
	map.on('click',function(e){ });

};
