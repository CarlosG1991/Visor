function recuperarPuntos(bearer_token, id_user) {
  var details = {
    'id': id_user,
  };
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  var bearer = 'Bearer ' + bearer_token;
  console.log('Posting request to GitHub API...');
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
      var gejos = convertir(data)
      L.geoJson(gejos).addTo(map)
    }
  );
}

function recuperar() {
  var details = {
    'password': 'raptortrack$$2017',
    'id_company': '1019',
    'login': 'root'
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log('Posting request to GitHub API...');
  const username = 'apiroot';
  const password = 'api%#$fgr#$%';
  fetch('https://apiservice.servertrack.co:3006/api/app/login', {
    async: true,
    crossDomain: true,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(username + ":" + password),
      'content-length': "57",
    },
    body: formBody
    // body: JSON.stringify(data)
  }).then(
    res => res.json()
  ).then(
    data => {
      for (i = 0; i < data.data.length; i++) {
        console.log('Created Gist:', data.data[i].token_api);
        recuperarPuntos(data.data[i].token_api, data.data[i].id_user);
      }
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
    });
}

function convertir(json) {
  var geojson = {
    type: "FeatureCollection",
    features: [],
  };
  for (i = 0; i < json.data.length; i++) {
    // if (window.CP.shouldStopExecution(1)) {
    //   break;
    // }
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
  // window.CP.exitedLoop(1);
  var geoj = JSON.stringify(geojson, null, 2);
  return geoj;
}