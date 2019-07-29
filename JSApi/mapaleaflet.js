var control = 0;
var moviles_asignados;
var dir;
var coords = [];

function initMapa() {
  if (window.localStorage["login"] == '0') {
    window.location.href = "index.html";
  } else if (window.localStorage["login"] == '1') {
    cargarAsignados();
    mapaAsignados();
    recuperarDatos();
  }
}

function cancelar(id) {
  deleteMarkers();
  document.getElementById("tablaHistorial").style.display = "None";
  document.getElementById(id.id).style.display = "None";
  var tbody = document.getElementById("cuerpoTabla");
  tbody.innerHTML = "";
  // directionDisplay.setMap(null);
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
        // latlng = toLatLng(data[i].lat / 1000000, data[i].long / 1000000);
        coords.push(L.latLng(data[i].lat / 1000000, data[i].long / 1000000));
        // if (i == 0) {
        //   inilat = data[i].lat / 1000000;
        //   inilong = data[i].long / 1000000;
        // } else if (i <= data.length - 1) {
        //   finlat = data[i].lat / 1000000;
        //   finlog = data[i].long / 1000000;
        //   // GoogleMap_selected(inilat, inilong, finlat, finlog);
        //   draw_rute_map(inilat, inilong, finlat, finlog);
        //   inilat = data[i].lat / 1000000;
        //   inilong = data[i].long / 1000000;
        // }
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
    divDispositivos += '</div><input class="form-control" id="fdesde' + arrayMovil[i] + '" type="date" id="example-date-input"><input type="time" id="hdesde' + arrayMovil[i] + '" name="hora" step="3600"></div>';
    divDispositivos += '<div class="input-group"><div class="input-group-prepend"><span class="input-group-text">Fecha</span>';
    divDispositivos += '</div><input class="form-control" id="fhasta' + arrayMovil[i] + '"  type="date" id="example-date-input"><input type="time" id="hhasta' + arrayMovil[i] + '" name="hora"  step="3600"></div>';
    divDispositivos += '<button type="button" onclick="historialVista(' + arrayMovil[i] + ');" class="btn btn-secondary">Buscar</button><button type="button" onclick="cancelar(' + arrayMovil[i] + ');" class="btn btn-danger">Cancelar</button></div>';
    divDispositivos += "<button class='btn btn-lg'";
    divDispositivos += 'onclick="javascript:historial(' + arrayMovil[i] + ');"';
    divDispositivos += "style='background-color:transparent;'><i class='fa fa-history'></i></button>";
    divDispositivos += "<button class='btn btn-lg' onclick='follow(" + arrayMovil[i] + ")' style='background-color:transparent;'><i class='fa fa-search-location'></i></button></div>";
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
        var outerCoords = [data.data[i].latitud,
          data.data[i].longitud
        ];
        // console.log(outerCoords);
        addMarker(outerCoords, data.data[i].device);
        // map.data.loadGeoJson(outerCoords);
      }
      sessionStorage.setItem("imei", imei);
      localizar();
    })
}