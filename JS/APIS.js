var pass
var movil
var alert
var speed
var a
var br
var contenido
var gejos = ''
var markers = [];

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function addMarker(location) {
  var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the ' +
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
    'south west of the nearest large town, Alice Springs; 450&#160;km ' +
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
    'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
    'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
    'Aboriginal people of the area. It has many springs, waterholes, ' +
    'rock caves and ancient paintings. Uluru is listed as a World ' +
    'Heritage Site.</p>' +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
    '(last visited June 22, 2009).</p>' +
    '</div>' +
    '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  markers.push(marker);
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function recuperarLastLocation() {
  var id_user = '-1'
  var bearer_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjotMSwiaWRfY29tcGFueSI6IjEwMTkiLCJ0b2tlbl91c2VyIjoiZjQ3Mzg0OWViMjNiMGVkMDJkNzFlMjQwMGM5MTQwZGEiLCJpYXQiOjE1NjI2MDg3MDUsImV4cCI6MTU2MjYxOTUwNX0.8jTrzHTP_PATTGHn689XGgzceRGldvvLsvoH1RmQ4c8'
  var contenedor = document.getElementById("alertas");
  if (gejos != '') {
    deleteMarkers();
  }
  var details = {
    'id': id_user,
  };
  // var greenIcon = L.icon({
  //   iconUrl: 'img/camion.png',
  //   iconSize: [14, 48], // size of the icon
  //   shadowSize: [25, 32], // size of the shadow
  //   iconAnchor: [11, 47], // point of the icon which will correspond to marker's location
  //   shadowAnchor: [2, 31], // the same for the shadow
  //   popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  // });
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
      gejos = convertir(data)
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


      // map.data.setStyle(function(feature) {
      //   return /** @type {google.maps.Data.StyleOptions} */ ({
      //     fillColor: feature.getProperty('color'),
      //     strokeWeight: 1
      //   });
      // });


      // let geoJsonlayer = L.geoJson(gejos, {
      //   onEachFeature: function(feature, layer) {
      //     pass = bearer_token
      //     movil = feature.properties['movil']
      //     speed = parseInt(feature.properties['speed'])
      //     map.data.loadGeoJson(gejos);
      //     // if (feature.properties['event'] != '') {
      //     //   a = document.createElement('a');
      //     //   br = document.createElement('br');
      //     //   contenido = document.createTextNode(feature.properties['event'] + " " + movil);
      //     //   a.appendChild(contenido);
      //     //   a.setAttribute('onclick', 'zoom(' + feature.geometry["coordinates"][1] + ',' + feature.geometry["coordinates"][0] + ')');
      //     //   contenedor.appendChild(a);
      //     //   contenedor.appendChild(br);
      //     // }
      //     // layer.myTag = "Grupos"
      //     // layer.bindPopup("<a onclick='javascript:recuperarFollow(pass,movil)'>Click Seguir Vehiculo." + feature.properties['movil'] + "</a>")
      //   }
      // }).addTo(map)
    }
  );
}

function zoom(latitud, longitud) {
  console.log(latitud);
  console.log(longitud);
  var bounds = new google.maps.LatLngBounds({
    lat: latitud,
    lng: longitud
  });
  map.fitBounds(bounds);
}

function recuperarFollow(bearer_token, movil) {
  var details = {
    'movil': movil,
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
  fetch('https://apiservice.servertrack.co:3006/raptortrack/app/content/follow ', {
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

function follow(movil, fecha) {
  fetch('https://api.gservicetrack.com/follow/raptortrack?limit=25&start=0&movil=' + movil + '&date>=' + fecha, {
      headers: {
        "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
      }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      removeMarkers();
      console.log('Created Gist:', data)
      gejos = convertir(data)
      let geoJsonlayer = L.geoJson(gejos, {
        onEachFeature: function(feature, layer) {
          pass = bearer_token
          movil = feature.properties['movil']
          speed = parseInt(feature.properties['speed'])
          if (feature.properties['event'] != '') {
            a = document.createElement('a');
            br = document.createElement('br');
            contenido = document.createTextNode(feature.properties['event'] + " " + movil);
            a.appendChild(contenido);
            a.setAttribute('onclick', 'zoom(' + feature.geometry["coordinates"][1] + ',' + feature.geometry["coordinates"][0] + ')');
            contenedor.appendChild(a);
            contenedor.appendChild(br);
          }
          layer.myTag = "Grupos"
          layer.bindPopup("<a onclick='javascript:recuperarFollow(pass,movil)'>Click Seguir Vehiculo." + feature.properties['movil'] + "</a>")
        }
      }).addTo(map)
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