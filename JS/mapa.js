var map
var infoMarker

function initMap() {
  cargarAsignados();
  var pos
  var trafficLayer = new google.maps.TrafficLayer();
  var myLatlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: myLatlng,
    mapTypeId: 'satellite'
  };
  map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
  var infoWindow = new google.maps.InfoWindow;
  infoMarker = new google.maps.Marker;
  trafficLayer.setMap(map);
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingControlOptions: {
      drawingModes: ['circle']
    }
  });
  drawingManager.setMap(map);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoMarker.setPosition(pos);
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function cargarAsignados() {
  var moviles_asignados = sessionStorage.getItem("movil_assign_user");
  var arrayMovil = moviles_asignados.split(', ');
  var ul, a, contenido;
  var asig = document.getElementById('asignados');
  for (var i = 0; i < arrayMovil.length; i++) {
    ul = document.createElement('ul');
    a = document.createElement('a');
    contenido = document.createTextNode(arrayMovil[i]);
    a.appendChild(contenido);
    // a.setAttribute('onclick', 'zoom(' + data.data[i].lat + ',' + data.data[i].lon + ')');
    ul.appendChild(a);
    asig.appendChild(ul);
    console.log(arrayMovil[i]);
  }
}