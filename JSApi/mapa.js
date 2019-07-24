var map
var infoMarker
var moviles_asignados
var valor;

function initMap() {
  cargarAsignados();
  // document.getElementById('nombreI').value = "Carlos";
  document.getElementById('nombreI').innerHTML = "Carlos";
  var pos
  var trafficLayer = new google.maps.TrafficLayer();
  var myLatlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: myLatlng,
    mapTypeId: 'satellite',
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    }
  };
  map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
  var infoWindow = new google.maps.InfoWindow;
  infoMarker = new google.maps.Marker;
  trafficLayer.setMap(map);
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingControlOptions: {
      drawingModes: ['circle']
    }
  });
  drawingManager.setMap(map);
  mapaAsignados();
  google.maps.event.addListener(map, 'zoom_changed', function() {
    zoom = map.getZoom();
    if (zoom == 20) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(40, 40)));
      }

    }
    if (zoom == 19) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(40, 40)));
      }
    }
    if (zoom == 18) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(38, 38)));
      }
    }
    if (zoom == 17) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(38, 38)));;
      }

    }
    if (zoom == 16) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(36, 36)));
      }
    }
    if (zoom == 15) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(34, 34)));
      }
    }
    if (zoom == 14) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(30, 30)));
      }
    }
    if (zoom == 13) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(30, 30)));
      }

    }
    if (zoom == 12) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(28, 28)));
      }
    }
    if (zoom == 11) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(30, 30)));
      }
    }
    if (zoom == 10) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(35, 35)));
      }
    }
    if (zoom == 9) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(20, 20)));
      }
    }
    if (zoom == 8) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(20, 20)));
      }
    }
    if (zoom == 7) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(20, 20)));
      }
    }
    if (zoom == 6) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(20, 20)));
      }
    }
    if (zoom == 5) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(20, 20)));
      }
    }
    if (zoom == 4) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(20, 20)));
      }
    }
    if (zoom == 3) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(20, 20)));
      }
    }
    if (zoom == 2) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(20, 20)));
      }
    }
    if (zoom == 1) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(1, 1)));
      }
    }
  });
}

function cargarAsignados() {
  moviles_asignados = sessionStorage.getItem("movil_assign_user");
  var arrayMovil = moviles_asignados.split(', ');
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

  for (var i = 0; i < arrayMovil.length; i++) {
    valor = arrayMovil[i];
    divDispositivos += '<div class="col-sm-12"><h3>' + arrayMovil[i] + '</h3>';
    divDispositivos += '<div class="form-group row" id="' + arrayMovil[i] + '" style="display:None;">';
    divDispositivos += '<div class="input-group"><div class="input-group-prepend"><span class="input-group-text">Fecha</span>';
    divDispositivos += '</div><input class="form-control" id="fdesde' + arrayMovil[i] + '" type="date" id="example-date-input"><input type="time" id="hdesde' + arrayMovil[i] + '" name="hora" min="18:00" max="21:00" step="3600"></div>';
    divDispositivos += '<div class="input-group"><div class="input-group-prepend"><span class="input-group-text">Fecha</span>';
    divDispositivos += '</div><input class="form-control" id="fhasta' + arrayMovil[i] + '"  type="date" id="example-date-input"><input type="time" id="hhasta' + arrayMovil[i] + '" name="hora" min="18:00" max="21:00" step="3600"></div>';
    divDispositivos += '<button type="button" onclick="historialVista(' + arrayMovil[i] + ');" class="btn btn-secondary">Buscar</button><button type="button" class="btn btn-danger">Cancelar</button></div>';
    divDispositivos += "<button class='btn btn-lg'";
    divDispositivos += 'onclick="javascript:historial(' + arrayMovil[i] + ');"';
    divDispositivos += "style='background-color:transparent;'><i class='fa fa-history'></i></button>";
    divDispositivos += "<button class='btn btn-lg ' style='background-color:transparent;'><i class='fa fa-search-location'></i></button></div>";
    ul = document.createElement('ul');
    a = document.createElement('a');
    contenido = document.createTextNode(arrayMovil[i]);
    a.appendChild(contenido);
    ul.appendChild(a);
    asig.appendChild(ul);
    console.log(arrayMovil[i]);
    // document.getElementById(relacion + condicion + '1').style.display = "none";
  }
  document.getElementById('home').innerHTML = divDispositivos;
}
// ****************************************Obetener Historial*******************
function historialVista(movil) {
  var fdesde = document.getElementById('fdesde' + movil.id).value;
  var hdesde = document.getElementById('hdesde' + movil.id).value;
  var fhasta = document.getElementById('fhasta' + movil.id).value;
  var hhasta = document.getElementById('hhasta' + movil.id).value;
  var desde = fdesde + ' ' + hdesde;
  var hasta = fhasta + ' ' + hhasta;
  fetch(ruta + '/web_service/obtenerHistorial.php?movil=' + movil.id + '&desde=' + desde + '&hasta=' + hasta)
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data)
    })
}

function historial(id) {
  document.getElementById(id.id).style.display = "";
}

function mapaAsignados() {
  console.log(moviles_asignados.replace(/ /g, ""));
  console.log(moviles_asignados);
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
  var imei = '';
  fetch('https://api.gservicetrack.com/lastposition/raptortrack?limit=25&start=0&movils=' + moviles_asignados.replace(/ /g, "") + '&date=' + fecha, {
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
        if (imei != '') {
          imei += ",'" + data.data[i].device + "'";
        } else {
          imei += "'" + data.data[i].device + "'";
        }
        var outerCoords = {
          lat: data.data[i].latitud,
          lng: data.data[i].longitud
        };
        // console.log(outerCoords);
        addMarker(outerCoords);
        map.data.loadGeoJson(outerCoords);
      }
      sessionStorage.setItem("imei", imei);
      localizar();
    })
}