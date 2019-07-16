var map
var infoMarker
var moviles_asignados

function initMap() {
  cargarAsignados();

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
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //     infoWindow.setPosition(pos);
  //     infoMarker.setPosition(pos);
  //     infoWindow.open(map);
  //     map.setCenter(pos);
  //   }, function() {
  //     handleLocationError(true, infoWindow, map.getCenter());
  //   });
  // } else {
  //   handleLocationError(false, infoWindow, map.getCenter());
  // }
  mapaAsignados();
  google.maps.event.addListener(map, 'zoom_changed', function() {
    zoom = map.getZoom();
    // if (zoom == 21) {
    //   for (var i = 0; i < markers.length; i++) {
    //     markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(550, 550)));
    //   }
    // }
    if (zoom == 20) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(40, 40)));
      }

    }
    if (zoom == 19) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(new google.maps.MarkerImage('img/iconos/Car1.png', null, null, null, new google.maps.Size(40, 40)));
        s
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
  var ul, a, contenido;
  var asig = document.getElementById('asignados');
  for (var i = 0; i < arrayMovil.length; i++) {
    ul = document.createElement('ul');
    a = document.createElement('a');
    contenido = document.createTextNode(arrayMovil[i]);
    a.appendChild(contenido);
    // a.setAttribute('onclick', 'zoom(' + data.data[i].lat + ',' + data.data[i].lon + ')');
    ul.appendChild(a);
    asig.appendChild(ul);
    console.log(arrayMovil[i]);
  }
}

function mapaAsignados() {
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

  fetch('https://api.gservicetrack.com/lastposition/raptortrack?limit=25&start=0&movil=' + moviles_asignados + '&date=' + fecha, {
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
        var outerCoords = {
          lat: data.data[i].latitud,
          lng: data.data[i].longitud
        };
        // console.log(outerCoords);
        addMarker(outerCoords);
        map.data.loadGeoJson(outerCoords);
      }
      localizar();
    })
}