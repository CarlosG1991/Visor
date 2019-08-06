var control = 0;
var moviles_asignados = [],
  traAsiganada = [];
var moviles = "",
  imeis = "",
  idTra = "";
var dir, overlayMaps;
var coords = [];
var marker;
var overlayMaps = {};
var shape_for_db;
var map = L.map('map'),
  drawnItems = L.featureGroup().addTo(map);

var icon = L.icon({
  iconUrl: 'img/iconos/Car1.png',
  iconSize: [38, 38],
  iconAnchor: [9, 10],
  popupAnchor: [-3, -76]
});
var icon2 = L.icon({
  iconUrl: 'img/iconos/Car1.png',
  iconSize: [30, 30],
  iconAnchor: [9, 10],
  popupAnchor: [-3, -76]
});
var icon3 = L.icon({
  iconUrl: 'img/iconos/Car1.png',
  iconSize: [25, 25],
  iconAnchor: [9, 10],
  popupAnchor: [-3, -76]
});
var icon4 = L.icon({
  iconUrl: 'img/iconos/Car1.png',
  iconSize: [20, 20],
  iconAnchor: [9, 10],
  popupAnchor: [-3, -76]
});
L.control.scale().addTo(map);

var calculoDistancia = function(lati, longi) {
  var flag = 0;
  var distI = 0,
    distF = 0;
  var latF, longF;
  for (const prop in overlayMaps) {
    overlayMaps[prop].eachLayer(function(layer) {
      if (flag == 0) {
        distI = getKilometros(lati, longi, layer._latlng.lat, layer._latlng.lng);
        latF = layer._latlng.lat;
        longF = layer._latlng.lng;
        flag = 1;
      } else {
        distF = getKilometros(lati, longi, layer._latlng.lat, layer._latlng.lng);
        if (parseInt(distF) < parseInt(distI)) {
          distI = getKilometros(lati, longi, layer._latlng.lat, layer._latlng.lng);
          latF = layer._latlng.lat;
          longF = layer._latlng.lng;
        }
      }
    });
  }
  if (ctrfollow == 0) {
    alert("Parada mas cercana a: " + distI);
    distancia(lati, longi, latF, longF);
  } else {
    alert("Parada mas cercana a: " + distI);
    cambiarDistancia(lati, longi, latF, longF);
  }

}
var getKilometros = function(lat1, lon1, lat2, lon2) {
  rad = function(x) {
    return x * Math.PI / 180;
  }
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d.toFixed(3); //Retorna tres decimales
}
// Capas base
var osmBase = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
});
osmBase.addTo(map);
mapLink = '<a href="http://www.esri.com/">Esri</a>';
wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
traAsiganada = JSON.parse(localStorage.getItem("trayectoria"));
for (var i = 0; i < traAsiganada.length; i++) {
  if (i == 0) {
    idTra += traAsiganada[i].id;
  } else {
    idTra += "," + traAsiganada[i].id;
  }
}
var baseMaps = {
  "OSM": osmBase,
  "Satelital": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
    attribution: 'google'
  })
};
fetch('/web_service/obtenerParadas.php?trayectoria_id=' + idTra)
  .then(data => {
    return data.json()
  })
  .then(data => {
    var busIcon = L.icon({
      iconUrl: 'img/iconos/bus.png',
      iconSize: [38, 38], // size of the icon
    });
    console.log(data);

    var nombreTra = "";
    for (var i = 0; i < data.length; i++) {
      var mr = [];
      for (var j = 0; j < data[i].parada.length; j++) {
        mr.push(L.marker([data[i].parada[j].latitud, data[i].parada[j].longitud], {
          icon: busIcon
        }).bindPopup(data[i].parada[j].parada));
        nombreTra = data[i].parada[j].trayectoria;
      }
      var layerGroup = L.layerGroup(mr);
      overlayMaps[nombreTra] = layerGroup;
    }
    L.control.layers(baseMaps, overlayMaps, {
      position: 'topleft', // 'topleft', 'bottomleft', 'bottomright'
      collapsed: true // true
    }, {
      'drawlayer': drawnItems
    }, {
      position: 'topleft',
      collapsed: false
    }).addTo(map);
  });
map.addControl(new L.Control.Draw({
  edit: {
    featureGroup: drawnItems,
    poly: {
      allowIntersection: false
    }
  },
  draw: {
    polygon: {
      allowIntersection: false,
      showArea: true
    }
  }
}));

map.on(L.Draw.Event.CREATED, function(event) {
  var layer = event.layer;
  drawnItems.addLayer(layer);
});
map.on('draw:created', function(e) {
  layer = e.layer;
  console.log(e);
  if (e.layerType === 'marker') {
    var lat = layer.getLatLng().lat;
    var lng = layer.getLatLng().lng;
    console.log(e);
  }
});
map.on('zoomend', function() {
  if (markers != null) {
    if (map.getZoom() <= 20 && map.getZoom() > 15) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(icon);
      }
    } else if (map.getZoom() <= 15 && map.getZoom() > 10) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(icon2);
      }
    } else if (map.getZoom() <= 10 && map.getZoom() > 5) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(icon3);
      }
    } else if (map.getZoom() <= 5 && map.getZoom() >= 1) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(icon4);
      }
    }
  }
});

function initMapa() {
  if (window.localStorage["login"] == '0') {
    window.location.href = "index.html";
  } else if (window.localStorage["login"] == '1') {
    // iniciarMapa();
    document.getElementById('nombreI').innerHTML = localStorage.getItem('Usuario');
    cargarAsignados();
    mapaAsignados();
    recuperarDatos();
  }
}

function cancelar(id) {
  // deleteMarkers();
  document.getElementById("tablaHistorial").style.display = "None";
  document.getElementById(id.id).style.display = "None";
  var tbody = document.getElementById("cuerpoTabla");
  tbody.innerHTML = "";
}

function historialVista(movil) {
  control = 1;
  deleteMarkers();
  var flightPlanCoordinates = [];
  var coordenadaInicio, coordenadaFinal;
  var inilat, inilong, finlat, finlog;
  var fdesde = document.getElementById('fdesde' + movil.id).value;
  var hdesde = document.getElementById('hdesde' + movil.id).value;
  var fhasta = document.getElementById('fhasta' + movil.id).value;
  var hhasta = document.getElementById('hhasta' + movil.id).value;
  var desde = fdesde + ' ' + hdesde;
  var hasta = fhasta + ' ' + hhasta;
  var tr, td1, td2, td3, td4, td5, td6, contenido;
  var tabla = document.getElementById("cuerpoTabla");

  fetch('/web_service/obtenerHistorial.php?movil=' + movil.id + '&desde=' + desde + '&hasta=' + hasta)
    .then(data => {
      return data.json()
    })
    .then(data => {
      document.getElementById("tablaHistorial").style.display = "";
      for (var i = 0; i < data.length; i++) {
        coords.push(L.latLng(data[i].lat / 1000000, data[i].long / 1000000));
        tr = document.createElement('tr');
        td1 = document.createElement('td');
        td2 = document.createElement('td');
        td3 = document.createElement('td');
        td4 = document.createElement('td');
        td5 = document.createElement('td');
        td6 = document.createElement('td');
        var outerCoords = {
          lat: data[i].lat / 1000000,
          lng: data[i].long / 1000000
        };
        contenido = document.createTextNode(data[i].unit);
        td1.appendChild(contenido);
        tr.appendChild(td1);
        contenido = document.createTextNode(data[i].lat / 1000000);
        td2.appendChild(contenido);
        tr.appendChild(td2);
        contenido = document.createTextNode(data[i].long / 1000000);
        td3.appendChild(contenido);
        tr.appendChild(td3);
        contenido = document.createTextNode(data[i].odometro);
        td4.appendChild(contenido);
        tr.appendChild(td4);
        contenido = document.createTextNode(data[i].fecha);
        td5.appendChild(contenido);
        tr.appendChild(td5);
        contenido = document.createTextNode(data[i].alert);
        td6.appendChild(contenido);
        tr.appendChild(td6);
        tabla.appendChild(tr);
      };
      draw_rute_map(coords);
    })
}

function historial(id) {
  document.getElementById(id.id).style.display = "";
}

function cargarAsignados() {
  var ul, a, contenido, div, h1;
  var asig = document.getElementById('asignados');
  var alertas = document.getElementById('alertas');
  var divPanel = '';
  var divDispositivos = '';
  divPanel += '<ul class="nav nav-tabs" id="myTab" role="tablist"><li class="nav-item">';
  divPanel += '<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Dispositivos</a></li>';
  divPanel += '<li class="nav-item"><a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Alertas</a></li></ul>';
  divPanel += '<div class="tab-content"><div class="tab-pane active" id="home" role="tabpanel"></div><div class="tab-pane" id="profile" role="tabpanel"></div></div>';
  document.getElementById('alertas').innerHTML = divPanel;
  moviles_asignados = JSON.parse(localStorage.getItem("moviles"));
  for (var i = 0; i < moviles_asignados.length; i++) {
    if (i == 0) {
      moviles += moviles_asignados[i].movil;
      imeis += "'" + moviles_asignados[i].imei + "'";
    } else {
      moviles += ',' + moviles_asignados[i].movil;
      imeis += ",'" + moviles_asignados[i].imei + "'";
    }
    divDispositivos += '<div class="col-sm-12"><h6>' + moviles_asignados[i].movil + '</h6>';
    divDispositivos += '<div class="form-group row" id="' + moviles_asignados[i].movil + '" style="display:None;">';
    divDispositivos += '<div class="input-group"><div class="input-group-prepend"><span class="input-group-text">Fecha</span>';
    divDispositivos += '</div><input class="form-control" id="fdesde' + moviles_asignados[i].movil + '" type="date" id="example-date-input"><input type="time" id="hdesde' + moviles_asignados[i].movil + '" name="hora" step="3600"></div>';
    divDispositivos += '<div class="input-group"><div class="input-group-prepend"><span class="input-group-text">Fecha</span>';
    divDispositivos += '</div><input class="form-control" id="fhasta' + moviles_asignados[i].movil + '"  type="date" id="example-date-input"><input type="time" id="hhasta' + moviles_asignados[i].movil + '" name="hora"  step="3600"></div>';
    divDispositivos += '<button type="button" onclick="historialVista(' + moviles_asignados[i].movil + ');" class="btn btn-secondary">Buscar</button><button type="button" onclick="cancelar(' + moviles_asignados[i].movil + ');" class="btn btn-danger">Cancelar</button></div>';
    divDispositivos += "<button class='btn btn-lg'";
    divDispositivos += 'onclick="javascript:historial(' + moviles_asignados[i].movil + ');"';
    divDispositivos += "style='background-color:transparent;'><i class='fa fa-history'></i></button>";
    divDispositivos += "<button class='btn btn-lg' onclick='follow(" + moviles_asignados[i].movil + ")' style='background-color:transparent;'><i class='fa fa-search-location'></i></button></div>";
    ul = document.createElement('ul');
    a = document.createElement('a');
    contenido = document.createTextNode(moviles_asignados[i].movil);
    a.appendChild(contenido);
    ul.appendChild(a);
    asig.appendChild(ul);
  }
  document.getElementById('home').innerHTML = divDispositivos;
}

function mapaAsignados() {
  var hoy = new Date();
  var dd = hoy.getDate();
  if (dd < 10) {
    dd = '0' + dd
  }
  var mm = hoy.getMonth() + 1;
  if (mm < 10) {
    mm = '0' + mm
  }
  var yyyy = hoy.getFullYear();
  var fecha = yyyy + '-' + mm + '-' + dd;
  if (moviles != '') {
    fetch('https://api.gservicetrack.com/lastposition/raptortrack?limit=25&start=0&movils=' + moviles + '&date=' + fecha, {
        headers: {
          "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
      })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log('Cargando Vist:', data)
        for (i = 0; i < data.data.length; i++) {
          var outerCoords = [data.data[i].latitud,
            data.data[i].longitud
          ];
          addMarker(outerCoords, data.data[i].device);
        }
        localizar();
      })
  }
}