function initMap() {
  var myLatlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: myLatlng,
    mapTypeId: 'satellite'
  };
  var map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
  var infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
// Declarar icono de geolocalizacion
// var greenIcon = L.icon({
//   iconUrl: 'img/vehiculo_01/i0.png',
//   iconSize: [14, 48], // size of the icon
//   shadowSize: [25, 32], // size of the shadow
//   iconAnchor: [11, 47], // point of the icon which will correspond to marker's location
//   shadowAnchor: [2, 31], // the same for the shadow
//   popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
// });
// // Declarar Mapa
// var map = L.map('map', {
//   center: [30, 0],
//   zoom: 3
// });
// // Se cargarn las capas que se mostraran en el mapa
// var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
// var baseMaps = {
//   "<span style='color: gray'>OSM</span>": osm,
//   // "<span style='color: gray'>000</span>": osm
// };
// var overlayMaps = {
//   // "Paradas": Paradas
// };
// map.addControl(new L.control.layers(baseMaps, overlayMaps).addTo(map));
// // geolocalizacion
// var marker_actual;
// navigator.geolocation.getCurrentPosition(function(position) {
//   marker_actual = L.marker([position.coords.latitude, position.coords.longitude], {
//     icon: greenIcon
//   }).addTo(map);
//   marker_actual.bindPopup('Tu estas aqui').openPopup();
//   map.setView([position.coords.latitude, position.coords.longitude], 18);
// }, function(err) {
//   console.error(err);
// });