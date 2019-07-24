var movil, a, br, contenido
var gejos = ''
var markers = [];
var currentdate = new Date();
var control = 0;

function acercar(latitud, longitud) {
  console.log(latitud, longitud);
  var bounds = new google.maps.LatLngBounds({
    lat: latitud,
    lng: longitud
  });
  map.fitBounds(bounds);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// *****************************Agregar Marker****************************
function addMarker(location) {
  var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<div id="bodyContent">' +
    '<p><a onclick="javascript:follow(movil)">' +
    'Seguir Vehiculo</a> ' +
    '</p>' +
    '</div>' +
    '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: 'img/iconos/Car1.png'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  markers.push(marker);
}
//*****************************Centrar Mapa a Markers*******************************
function localizar() {
  console.log(markers);
  var latlngbounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    latlngbounds.extend(markers[i].position);
  }
  map.fitBounds(latlngbounds);
  new google.maps.Rectangle({
    bounds: latlngbounds,
    map: map,
    fillColor: "#000000",
    fillOpacity: 0.0,
    strokeWeight: 0
  });
}
// **********************************borrar markers ******************************
function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}
// *********************************************************************************
// **********************************Obtener datos desde la base********************
function recuperarDatos() {
  var contenedor = document.getElementById('profile')
  var div, a;
  var divDispositivos = '';
  imei = sessionStorage.getItem("imei");
  var ruta = '';
  var alert = '';
  deleteMarkers();
  fetch(ruta + '/web_service/obtenerDatos.php?imei=' + imei)
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data);
      for (i = 0; i < data.length; i++) {
        //Se divide para un millon para obtener la coordenada en decimal
        var outerCoords = {
          lat: (data[i].lat / 1000000),
          lng: (data[i].long / 1000000)
        };
        div = document.createElement('div');
        a = document.createElement('a');
        if (!document.getElementById(data[i].unit + '-' + data[i].alert)) {
          div.setAttribute('class', 'col-sm-12');
          div.setAttribute('id', data[i].unit + '-' + data[i].alert);
          contenido = document.createTextNode(data[i].alert);
          a.appendChild(contenido);
          //a.setAttribute('onclick', 'zoom(' + data[i].lat / 1000000 + ',' + data[i].long / 1000000 + ')');
          a.setAttribute('onclick', 'acercar(' + data[i].lat / 1000000 + ',' + data[i].long / 1000000 + ')');
          div.appendChild(a);
          contenedor.appendChild(div);
        }
        addMarker(outerCoords);
      }
      localizar();
    })
}
// *********************************************************
function recuperarLastLocation() {
  var id_user = '-1'
  var bearer_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjotMSwiaWRfY29tcGFueSI6IjEwMTkiLCJ0b2tlbl91c2VyIjoiZjQ3Mzg0OWViMjNiMGVkMDJkNzFlMjQwMGM5MTQwZGEiLCJpYXQiOjE1NjMyMDYzMDUsImV4cCI6MTU2MzIxNzEwNX0.htPjaBm6OuY2MDfp_O2_7bPfUrA4h7IcXSEz9XWetT0'
  var contenedor = document.getElementById("alertas");
  if (gejos != '') {
    deleteMarkers();
  }
  var details = {
    'id': id_user,
  };
  var marker_actual;
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  var bearer = 'Bearer ' + bearer_token;
  console.log('Obteniendo los datos de la API...');
  if (control == 0) {

    fetch('https://apiservice.servertrack.co:3006/raptortrack/app/content/last_location', {
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
        for (i = 0; i < data.data.length; i++) {
          movil = data.data[i].movil
          a = document.createElement('a');
          br = document.createElement('br');
          contenido = document.createTextNode(data.data[i].event + " " + movil);
          a.appendChild(contenido);
          a.setAttribute('onclick', 'zoom(' + data.data[i].lat + ',' + data.data[i].lon + ')');
          contenedor.appendChild(a);
          contenedor.appendChild(br);
          var outerCoords = {
            lat: data.data[i].lat,
            lng: data.data[i].lon
          };
          addMarker(outerCoords)
          map.data.loadGeoJson(outerCoords);
        }
        var markerCluster = new MarkerClusterer(map, markers, {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
      }
    );
  }

}

function follow(movil) {
  control = 1;
  var fecha = currentdate.getFullYear() + "-" + currentdate.getMonth() +
    "-" + currentdate.getDay() + "T" +
    currentdate.getHours() + ":" +
    currentdate.getMinutes() + ":" + currentdate.getSeconds();
  fetch('https://api.gservicetrack.com/follow/raptortrack?limit=25&start=0&movil=' + movil + '&date>=' + fecha, {
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
        addMarker(outerCoords);
        map.data.loadGeoJson(outerCoords);
      }
    })
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
        onEachFeature: function(feature, layer) {
          layer.bindPopup(feature.properties['movil'])
        }
      }).addTo(map)

    }
  );
}

function obtener() {
  fetch('https://api.gservicetrack.com/groups/raptortrack', {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data)
    })
}

function recuperarVelicidadMaxima(movil) {
  fetch('https://api.gservicetrack.com/maxspeedalert/raptortrack?limit=25&start=0&movil=' + movil, {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data)
    })
}

function recuperarVelicidad() {
  fetch('https://api.gservicetrack.com/maxspeedalert/raptortrack?limit=25&start=0', {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data)
    })
}

function recuperarConductores() {
  fetch('https://api.gservicetrack.com/driver/raptortrack?limit=25&start=0', {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data)
    })
}

function recuperarEventos() {
  fetch('https://api.gservicetrack.com/avlevent/raptortrack?limit=25&start=0&sort=model', {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data)
    })
}

function recuperarUsuarioMovil() {
  fetch('https://api.gservicetrack.com/usermovil/raptortrack?limit=25&start=0&sort=group_name', {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      guardarUsuarioMovil(data)
      console.log(data)
    })
}

function recuperarGrupoMovil() {
  fetch('https://api.gservicetrack.com/groupmovil/raptortrack?limit=25&start=0&sort=group_name', {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      // guardarGrupoMovil(data)
      console.log(data)
    })
}

function recuperarMoviles() {
  fetch('https://api.gservicetrack.com/movils/raptortrack?limit=25&start=0&sort=movil', {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      guardarMovil(data);
      console.log(data)

    })
}

function recuperarDispositivos() {
  fetch('https://api.gservicetrack.com/devices/raptortrack?limit=25&start=0&sort=device', {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      guardarDispositivos(data);
      console.log(data)
    })
}

function recuperarUsuarios() {
  fetch('https://api.gservicetrack.com/users/raptortrack?limit=25&start=0&sort=name', {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      guardarUsuarios(data)
      console.log(data)
    })
}

function recuperarPerfiles() {
  fetch('https://api.gservicetrack.com/profiles/raptortrack?limit=25&start=0&sort=name', {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      // guardarPerfiles(data)
      console.log(data)
    })
}

function recuperarGrupos() {
  fetch('https://api.gservicetrack.com/groups/raptortrack', {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      // guardarGrupos(data)
      console.log(data)
    })
}

function ultimaPosicion(movil, fecha) {
  fetch('https://api.gservicetrack.com/lastposition/raptortrack?limit=25&start=0&movil=' + movil + '&date=' + fecha, {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data)
    })
}

function convertir(json) {
  var geojson = {
    type: "FeatureCollection",
    features: [],
  };
  for (i = 0; i < json.data.length; i++) {
    geojson.features.push({
      "type": "Feature",
      "properties": {
        "movil": json.data[i].movil,
        "location": json.data[i].location,
        "time": json.data[i].time,
        "date": json.data[i].date,
        "speed": json.data[i].speed,
        "photo": json.data[i].photo,
        "event": json.data[i].event,
        "timestamp": json.data[i].timestamp,
        "orientation": json.data[i].orientation,
        "model": json.data[i].model,
      },
      "geometry": {
        "type": "Point",
        "coordinates": [json.data[i].lon, json.data[i].lat]
      }
    });
  }
  return geojson;
}