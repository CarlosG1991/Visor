var ruta;

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