
// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */
var map = L.map('map', {
  center: [30, 0],
  zoom: 3
});
var marker_actual;
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
navigator.geolocation.getCurrentPosition(function(position) {
    marker_actual = L.marker([position.coords.latitude,position.coords.longitude]).addTo(map);
    marker_actual.bindPopup('Tu estas aqui').openPopup();
    map.setView([position.coords.latitude,position.coords.longitude], 18);
}, function(err) {
    console.error(err);
});
// L.geoJson(con).addTo(map);
