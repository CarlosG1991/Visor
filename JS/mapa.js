var map = L.map('map', {
  center: [30, 0],
  zoom: 3
});
var greenIcon = L.icon({
  iconUrl: 'img/camion.png',
  iconSize: [14, 48], // size of the icon
  shadowSize: [25, 32], // size of the shadow
  iconAnchor: [11, 47], // point of the icon which will correspond to marker's location
  shadowAnchor: [2, 31], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var marker_actual;
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

navigator.geolocation.getCurrentPosition(function(position) {
  marker_actual = L.marker([position.coords.latitude, position.coords.longitude], {
    icon: greenIcon
  }).addTo(map);
  marker_actual.bindPopup('Tu estas aqui').openPopup();
  map.setView([position.coords.latitude, position.coords.longitude], 18);
}, function(err) {
  console.error(err);
});