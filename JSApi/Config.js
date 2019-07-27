var ruta = '';

function cargarCatalogo() {

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cargarXML(this);
    }
  };
  xhr.open("GET", "XML/Config.xml", true);
  xhr.send();
}

function cargarXML(xml) {
  var docXML = xml.responseXML;
  var parametros = docXML.getElementsByTagName("Parametros");
  for (var i = 0; i < parametros.length; i++) {
    ruta = parametros[i].getElementsByTagName("Path")[0].textContent;
  }
}

function cargarInfo() {
  document.getElementById("nombre").value = sessionStorage.getItem("name");
  document.getElementById("apellido").value = sessionStorage.getItem("last_name");
  document.getElementById("grupo").value = sessionStorage.getItem("group_name");
  document.getElementById("perfil").value = sessionStorage.getItem("profile_name");
  moviles_asignados = sessionStorage.getItem("movil_assign_user");
  var arrayMovil = moviles_asignados.split(', ');
  var option;
  var asig = document.getElementById('moviles');
  for (var i = 0; i < arrayMovil.length; i++) {
    option = document.createElement('option');
    option.value = arrayMovil[i];
    option.text = arrayMovil[i];
    asig.appendChild(option);
  }
}