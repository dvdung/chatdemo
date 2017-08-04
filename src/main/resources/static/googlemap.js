var markers = [];
var marker;
var map, infoWindow;

function initMap() {
	map = new google.maps.Map(document.getElementById('map2'), {
		center : {
			lat : -34.397,
			lng : 150.644
		},
		zoom : 6,
		mapTypeId : 'roadmap',
		styles : [ {
			elementType : 'geometry',
			stylers : [ {
				color : '#242f3e'
			} ]
		}, {
			elementType : 'labels.text.stroke',
			stylers : [ {
				color : '#242f3e'
			} ]
		}, {
			elementType : 'labels.text.fill',
			stylers : [ {
				color : '#746855'
			} ]
		}, {
			featureType : 'administrative.locality',
			elementType : 'labels.text.fill',
			stylers : [ {
				color : '#d59563'
			} ]
		}, {
			featureType : 'poi',
			elementType : 'labels.text.fill',
			stylers : [ {
				color : '#d59563'
			} ]
		}, {
			featureType : 'poi.park',
			elementType : 'geometry',
			stylers : [ {
				color : '#263c3f'
			} ]
		}, {
			featureType : 'poi.park',
			elementType : 'labels.text.fill',
			stylers : [ {
				color : '#6b9a76'
			} ]
		}, {
			featureType : 'road',
			elementType : 'geometry',
			stylers : [ {
				color : '#38414e'
			} ]
		}, {
			featureType : 'road',
			elementType : 'geometry.stroke',
			stylers : [ {
				color : '#212a37'
			} ]
		}, {
			featureType : 'road',
			elementType : 'labels.text.fill',
			stylers : [ {
				color : '#9ca5b3'
			} ]
		}, {
			featureType : 'road.highway',
			elementType : 'geometry',
			stylers : [ {
				color : '#746855'
			} ]
		}, {
			featureType : 'road.highway',
			elementType : 'geometry.stroke',
			stylers : [ {
				color : '#1f2835'
			} ]
		}, {
			featureType : 'road.highway',
			elementType : 'labels.text.fill',
			stylers : [ {
				color : '#f3d19c'
			} ]
		}, {
			featureType : 'transit',
			elementType : 'geometry',
			stylers : [ {
				color : '#2f3948'
			} ]
		}, {
			featureType : 'transit.station',
			elementType : 'labels.text.fill',
			stylers : [ {
				color : '#d59563'
			} ]
		}, {
			featureType : 'water',
			elementType : 'geometry',
			stylers : [ {
				color : '#17263c'
			} ]
		}, {
			featureType : 'water',
			elementType : 'labels.text.fill',
			stylers : [ {
				color : '#515c6d'
			} ]
		}, {
			featureType : 'water',
			elementType : 'labels.text.stroke',
			stylers : [ {
				color : '#17263c'
			} ]
		} ]
	});

	new AutocompleteDirectionsHandler(map);

}


function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    alert(total);
    document.getElementById('total').innerHTML = total + ' km';
  }
function AutocompleteDirectionsHandler(map) {
	this.map = map;
	this.originPlaceId = null;
	this.destinationPlaceId = null;
	this.travelMode = 'WALKING';
	var originInput = document.getElementById('origin-input');
	var destinationInput = document.getElementById('destination-input');
	var modeSelector = document.getElementById('mode-selector');
	this.directionsService = new google.maps.DirectionsService;
	this.directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
      });
	this.directionsDisplay.setMap(map);
	
	
	var originAutocomplete = new google.maps.places.Autocomplete(originInput, {
		placeIdOnly : true
	});
	var destinationAutocomplete = new google.maps.places.Autocomplete(
			destinationInput, {
				placeIdOnly : true
			});

	this.setupClickListener('changemode-walking', 'WALKING');
	this.setupClickListener('changemode-transit', 'TRANSIT');
	this.setupClickListener('changemode-driving', 'DRIVING');

	this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
	this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

	this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
	this.map.controls[google.maps.ControlPosition.TOP_LEFT]
			.push(destinationInput);
	this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
	var radioButton = document.getElementById(id);
	var me = this;
	radioButton.addEventListener('click', function() {
		me.travelMode = mode;
		me.avoidTolls= true;
		me.route();
	});
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(
		autocomplete, mode) {
	var me = this;
	autocomplete.bindTo('bounds', this.map);
	autocomplete.addListener('place_changed', function() {
		var place = autocomplete.getPlace();
		if (!place.place_id) {
			window.alert("Please select an option from the dropdown list.");
			return;
		}
		if (mode === 'ORIG') {
			me.originPlaceId = place.place_id;
			
		} else {
			me.destinationPlaceId = place.place_id;
		}
		me.route();
	});

};

AutocompleteDirectionsHandler.prototype.route = function() {
	if (!this.originPlaceId || !this.destinationPlaceId) {
		return;
	}
	var me = this;
	this.directionsService.route({
		origin : {
			'placeId' : this.originPlaceId
		},
		destination : {
			'placeId' : this.destinationPlaceId
		},
		travelMode : this.travelMode
	}, function(response, status) {
		if (status === 'OK') {
			
			me.directionsDisplay.setDirections(response);
			
		
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
};
