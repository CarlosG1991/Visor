var pass
var movil
var lat
var long
var speed
var a
var br
var contenido
var gejos = ''
var removeMarkers = function() {
  map.eachLayer(function(layer) {
    if (layer.myTag && layer.myTag === "Grupos") {
      map.removeLayer(layer)
    }
  });
}

function recuperarLastLocation() {
  var id_user = sessionStorage.getItem("id_user");
  var bearer_token = sessionStorage.getItem("token");
  var contenedor = document.getElementById("alertas");
  if (gejos != '') {
    removeMarkers();
  }
  var details = {
    'id': id_user,
  };
  var greenIcon = L.icon({
    iconUrl: 'img/camion.png',
    iconSize: [14, 48], // size of the icon
    shadowSize: [25, 32], // size of the shadow
    iconAnchor: [11, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [2, 31], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
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
      // console.log('Created Gist:', gejos)
      let geoJsonlayer = L.geoJson(gejos, {
        onEachFeature: function(feature, layer) {
          pass = bearer_token
          movil = feature.properties['movil']

          lat = feature.geometry["coordinates"][1];
          long = feature.geometry["coordinates"][0];
          speed = parseInt(feature.properties['speed'])
          if (speed > 70) {
            a = document.createElement('a');
            br = document.createElement('br');
            contenido = document.createTextNode("Exceso de Velocidad! " + movil);
            a.appendChild(contenido);
            a.setAttribute('onclick', 'zoom(lat,long)');
            contenedor.appendChild(a);
            contenedor.appendChild(br);
          }
          layer.myTag = "Grupos"
          layer.bindPopup("<a onclick='javascript:recuperarFollow(pass,movil)'>Click Seguir Vehiculo." + feature.properties['movil'] + "</a>")
        }
      }).addTo(map)
    }
  );
}

function zoom(latitud, longitud) {
  console.log(latitud);
  console.log(longitud);
  map.setView([latitud, longitud], 18);
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
  fetch('https://api.gservicetrack.com/groups/raptortrack?limit=25&start=0&sort=name', {
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