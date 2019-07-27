function makeMarker(position, icon, title, map) {
  new google.maps.Marker({
    position: position,
    map: map,
    icon: icon,
    title: title
  });
}

function draw_rute_map(ilat, ilng, flat, flng) {
  var directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#2E9AFE'
    }
  });
  var icons = {
    start: new google.maps.MarkerImage(
      // URL
      'http://maps.google.com/mapfiles/ms/micons/blue.png',
      // (width,height)
      new google.maps.Size(44, 32),
      // The origin point (x,y)
      new google.maps.Point(0, 0),
      // The anchor point (x,y)
      new google.maps.Point(22, 32)),
    end: new google.maps.MarkerImage(
      // URL
      'http://maps.google.com/mapfiles/ms/micons/green.png',
      // (width,height)
      new google.maps.Size(44, 32),
      // The origin point (x,y)
      new google.maps.Point(0, 0),
      // The anchor point (x,y)
      new google.maps.Point(22, 32))
  };
  var directionsService = new google.maps.DirectionsService();
  var start = new google.maps.LatLng(ilat, ilng);
  var end = new google.maps.LatLng(flat, flng);
  var request = {
    origin: start,
    destination: end,
    unitSystem: google.maps.UnitSystem.METRIC,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      directionsDisplay.setMap(map);
      directionsDisplay.setOptions({
        suppressMarkers: true
      });
      var leg = response.routes[0].legs[0];
      makeMarker(leg.start_location, icons.start, "title", map);
      makeMarker(leg.end_location, icons.end, 'title', map);
    }
  });
}