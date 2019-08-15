function grabarGrupo() {
  var nombre = document.getElementById('nombre').value;
  var direccion = document.getElementById('direccion').value;
  var compania = document.getElementById('compania').value;
  var email = document.getElementById('email').value;
  var representante = document.getElementById('representante').value;
  var telefono = document.getElementById('telefono').value;
  fetch('/web_service/crear_grupo.php?nombre=' + nombre + '&direc=' + direccion + '&compania=' + compania + '&email=' + email + '&representante=' + representante + '&telefono=' + telefono)
    .then(data => {
      return data.json()
    })
    .then(data => {
      if (data.length > 0) {
        alert("La informacion no se a podido guardar");
      } else {
        alert("La informacion a sido guardado");
        document.getElementById('nombre').value = "";
        document.getElementById('direccion').value = "";
        document.getElementById('compania').value = "";
        document.getElementById('email').value = "";
        document.getElementById('representante').value = "";
        document.getElementById('telefono').value = "";
      }
    });
}

function cargarGrupo() {
  var x = document.getElementById("selectGrupo");
  fetch('/web_service/obtenerPerfil.php?valor=2')
    .then(data => {
      return data.json()
    })
    .then(data => {
      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.text = data[i].nombre;
        option.value = data[i].id;
        x.add(option);
      }
    });
}