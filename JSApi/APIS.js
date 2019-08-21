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

// *****************************Agregar Marker Goolgle****************************
// function addMarker(location) {
//   var contentString = '<div id="content">' +
//     '<div id="siteNotice">' +
//     '</div>' +
//     '<div id="bodyContent">' +
//     '<p><a onclick="javascript:follow(movil)">' +
//     'Seguir Vehiculo</a> ' +
//     '</p>' +
//     '</div>' +
//     '</div>';
//   var infowindow = new google.maps.InfoWindow({
//     content: contentString
//   });
//
//   var marker = new google.maps.Marker({
//     position: location,
//     map: map,
//     icon: 'img/iconos/Car1.png'
//   });
//   marker.addListener('click', function() {
//     infowindow.open(map, marker);
//   });
//   markers.push(marker);
// }
function guardarMapa() {
  console.log(shape_for_db);
  // alert("hola:" + drawnItems);
}
// *****************************Agregar Marker leaflet****************************
function addMarker(location, imei) {
  // var MyIcon = L.Icon.extend({
  //   iconUrl: 'img/iconos/Car1.png',
  //   iconSize: new L.Point(10, 16),
  //   shadowSize: new L.Point(10, 16),
  //   iconAnchor: new L.Point(10, 16)
  // });
  // var icon = new MyIcon();
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
    title: imei
  }).bindPopup(contentString).addTo(map);
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

function cambiarPosition(latlng, imei) {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].options.title == imei) {
      markers[i].setLatLng(latlng);
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
function recuperarDatos() {
  var imei = '';
  setInterval(function () {
    if (control == 0) {
      var contenedor = document.getElementById('profile')
      var div, a;
      var divDispositivos = '';
      traAsiganada = JSON.parse(localStorage.getItem("moviles"));
      for (var i = 0; i < traAsiganada.length; i++) {
        if (i == 0) {
          imei += "'" + traAsiganada[i].imei + "'";
        } else {
          imei += "," + "'" + traAsiganada[i].imei + "'";
        }
      }            
      fetch('/web_service/Mapa/obtenerDatos.php?imei=' + imei)
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
            if (!document.getElementById(data[i].unit + '-' + data[i].alert)) {
              div.setAttribute('class', 'col-sm-12');
              div.setAttribute('id', data[i].unit + '-' + data[i].alert);
              contenido = document.createTextNode(data[i].alert);
              a.appendChild(contenido);
              a.setAttribute('onclick', 'acercar(' + data[i].lat / 1000000 + ',' + data[i].long / 1000000 + ')');
              div.appendChild(a);
              contenedor.appendChild(div);
            }
            cambiarPosition(outerCoords, data[i].unit);            
          }
          localizar();
        })
    }
  }, 20000);
}
// *********************************************************
function follow(movil) {
  control = 1;
  ctrfollow = 0;
  setInterval(function () {
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
  fetch('https://api.gservicetrack.com/movils/raptortrack?limit=100&start=0&sort=movil', {
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