var movil, a, br, contenido
var gejos = ''
var markers = [];
var currentdate = new Date();
var padaras = [];
var ctrfollow = 0;
var controlR;
var router = L.Routing.mapbox('pk.eyJ1IjoiY2FybG9zZ29tZXoxOTkxIiwiYSI6ImNqeXE4amNqbTBocmkzZG11eTE3MWFjaGkifQ.jCyl4wyU8uZ5N7O3IYzt5w'),
  waypoints = [],
  line;

function acercar(latitud, longitud) {
  var corner1 = L.latLng(latitud, longitud),
    bounds = L.latLngBounds(corner1, corner1);
  map.fitBounds([bounds]);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function guardarMapa() {
  console.log(shape_for_db);
  // alert("hola:" + drawnItems);
}
// *****************************Agregar Marker leaflet****************************
function addMarker(location, imei,angulo) {  
  var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<div id="bodyContent">' +
    '<p><a onclick="javascript:follow(movil)">' +
    'Seguir Vehiculo</a> ' +
    '</p>' +
    '</div>' +
    '</div>';
  
  marker = L.marker(location, {    
    title: imei,
    rotationAngle: angulo,
    draggable: true
  }).bindPopup(contentString).addTo(map);
  
  //marker.style.transform = "rotate("+90+"deg)";
  markers.push(marker);
}
//*****************************Centrar Mapa a Markers*******************************

function localizar() {
  var latlngbounds = L.latLngBounds();
  for (var i = 0; i < markers.length; i++) {
    latlngbounds.extend(markers[i]._latlng);
  }
  map.fitBounds(latlngbounds);
}
// **********************************borrar markers ******************************
function clearMarkers(ime) {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].options.title == ime) {
      map.removeLayer(markers[i]);
    }
  }
}

function cambiarPosition(latlng, imei,angulo) {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].options.title == imei) {
      markers[i].setLatLng(latlng);
      markers[i].setRotationAngle(angulo)
    }
  }
}

function cambiarPositionFollow(latlng) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setLatLng(latlng);
  }
}

function deleteMarkers() {
  for (var i = 0; i < markers.length; i++) {
    map.removeLayer(markers[i]);
  }
  markers = [];
}
// *********************************************************************************
// **********************************Obtener datos desde la base********************
function obtenerDatos(idMovil,item){
  var contenedor = document.getElementById('profile');
  var div, a,h5;
  fetch('/web_service/Mapa/obtenerDatos2.php?imei=' + idMovil)
    .then(data => {
      return data.json()
    })
    .then(data => {
      for (i = 0; i < data.length; i++) {
        //Se divide para un millon para obtener la coordenada en decimal
        var outerCoords = {
          lat: (data[i].lat / 1000000),
          lng: (data[i].long / 1000000)
        };
        div = document.createElement('div');
        a = document.createElement('a');
        h5 = document.createElement('h20');
        if (!document.getElementById(data[i].unit + '-' + data[i].alert)) {
          div.setAttribute('class', 'col-sm-12');
          div.setAttribute('id', data[i].unit + '-' + data[i].alert);
          contenido = document.createTextNode(data[i].alert);
          h5.appendChild(contenido);          
          a.appendChild(h5);
          a.setAttribute('onclick', 'acercar(' + data[i].lat / 1000000 + ',' + data[i].long / 1000000 + ')');
          div.appendChild(a);
          contenedor.appendChild(div);
        }
        if(item==1){
          addMarker(outerCoords, data[i].unit, data[i].orientacion);
        }else{
          cambiarPosition(outerCoords, data[i].unit, data[i].orientacion);
        }        
      }
      if(item==1){
        localizar();
      }      
    })
}
function recuperarDatos() {
  var imei = '';  
  traAsiganada = JSON.parse(localStorage.getItem("moviles"));
  for (var i = 0; i < traAsiganada.length; i++) {
    if (i == 0) {
      imei += "'" + traAsiganada[i].id + "'";
    } else {
      imei += "," + "'" + traAsiganada[i].id + "'";
    }
  }  
  obtenerDatos(imei,1);
  setInterval(function () {    
    if (control == 0) {               
      obtenerDatos(imei,0);
    }
  }, 20000);
}
// *********************************************************
function tracking(vehiculo){
  fetch('https://api.gservicetrack.com/remotecommand/raptortrack', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep",
      'Content-Type': 'application/json'
    },
    body: "{\r\n    \"movil\": \"" + vehiculo + "\",\r\n    \"command\": \"1\"\r\n  }"
  });
}
function follow(movil) {
  control = 1;
  ctrfollow = 0;
  setInterval(function () {
    enviarComando(movil);
    var fecha = currentdate.getFullYear() + "-" + currentdate.getMonth() +
      "-" + currentdate.getDay() + "T" +
      currentdate.getHours() + ":" +
      currentdate.getMinutes() + ":" + currentdate.getSeconds();
    fetch('https://api.gservicetrack.com/follow/raptortrack?limit=25&start=0&movil=' + movil.id + '&date>=' + fecha, {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('Created Gist:', data)
        for (i = 0; i < data.data.length; i++) {
          var outerCoords = {
            lat: data.data[i].lat,
            lng: data.data[i].lon
          };
          if (ctrfollow == 0) {
            deleteMarkers();
            addMarker(outerCoords);
            calculoDistancia(data.data[i].lat, data.data[i].lon);
          } else {
            calculoDistancia(data.data[i].lat, data.data[i].lon);
            cambiarPositionFollow(outerCoords);
          }
        }
        ctrfollow = 1;
        localizar();
      })
  }, 10000);
}

function cambiarDistancia(lat, lng, latFin, lngFin) {
  controlR.spliceWaypoints(0, 1, L.latLng(lat, lng));
  controlR.spliceWaypoints(1, 1, L.latLng(latFin, lngFin));
  map.closePopup();
  // waypoints = [];
  for (var i = 0; i < controlR._routes.length; i++) {
    waypoints.push({
      latLng: controlR._routes[i].waypoints[i].latLng
    });
  }
  if (waypoints.length >= 2) {
    router.route(waypoints, function (err, routes) {
      if (err) {
        // alert(err);
        console.log(err);
      } else {
        console.log(routes[0].summary);
        console.log(routes[0].summary.totalDistance);
      }
    });
  }
}

function distancia(lat, lng, latF, lngF) {
  controlR = L.Routing.control(L.extend({
    waypoints: [
      L.latLng(lat, lng),
      L.latLng(latF, lngF)
    ],
    show: false,
    geocoder: L.Control.Geocoder.nominatim(),
    routeWhileDragging: true,
    reverseWaypoints: true,
    showAlternatives: true,
    collapsed: true,
    altLineOptions: {
      styles: [{
        color: 'black',
        opacity: 0.15,
        weight: 9
      },
      {
        color: 'white',
        opacity: 0.8,
        weight: 6
      },
      {
        color: 'blue',
        opacity: 0.5,
        weight: 2
      }
      ]
    }
  })).addTo(map);
  L.Routing.errorControl(controlR).addTo(map);
}
function enviarComando(){  
  fetch('https://api.gservicetrack.com/remotecommand/raptortrack', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep",
      'Content-Type': 'application/json'
    },
    body: "{\r\n    \"movil\": \"FV_01\",\r\n    \"command\": \"1\"\r\n  }"
  });  
}

function recuperarHistorial(bearer_token, movil, date) {
  var details = {
    'movil': movil,
    'date': date,
  };
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  var bearer = 'Bearer ' + bearer_token;
  console.log('Obteniendo los datos de la API...');
  fetch('https://apiservice.servertrack.co:3006/raptortrack/app/content/history ', {
    async: true,
    crossDomain: true,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': bearer,
      'content-length': "57",
    },
    body: formBody
  }).then(
    res => res.json()
  ).then(
    data => {
      console.log('Created Gist:', data)
      var gejos = convertir(data)
      let geoJsonlayer = L.geoJson(gejos, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties['movil'])
        }
      }).addTo(map)

    }
  );
}
