function grabarGrupo() {
  var id = document.getElementById('id').value;
  var nombre = document.getElementById('nombre').value;
  var direccion = document.getElementById('direccion').value;
  var compania = document.getElementById('compania').value;
  var email = document.getElementById('email').value;
  var representante = document.getElementById('representante').value;
  var telefono = document.getElementById('telefono').value;
  var nivel = document.getElementById('selectNivel').value;
  if (!id) {
    id = 0;
  }
  fetch('/web_service/Grupo/crear_grupo.php?id=' + id + '&nombre=' + nombre + '&direc=' + direccion + '&compania=' + compania + '&email=' + email + '&representante=' + representante + '&telefono=' + telefono + '&nivel=' + nivel)
    .then(data => {
      return data.json()
    })
    .then(data => {
      if (data.length > 0) {
        alert("La informacion no se a podido guardar");
      } else {
        alert("La informacion a sido guardado");
        document.getElementById('id').value = "";
        document.getElementById('nombre').value = "";
        document.getElementById('direccion').value = "";
        document.getElementById('compania').value = "";
        document.getElementById('email').value = "";
        document.getElementById('representante').value = "";
        document.getElementById('telefono').value = "";
        document.getElementById('selectNivel').value = "";
        location.reload();
      }
    });
}
function crearGrupo() {
  document.getElementById("pnlTabla").style.display = "None";
  document.getElementById("pnlFormulario").style.display = "";
}

function cancelarGrupo() {
  document.getElementById("pnlTabla").style.display = "";
  document.getElementById("pnlFormulario").style.display = "None";
  document.getElementById('id').value = "";
  document.getElementById('nombre').value = "";
  document.getElementById('direccion').value = "";
  document.getElementById('compania').value = "";
  document.getElementById('email').value = "";
  document.getElementById('representante').value = "";
  document.getElementById('telefono').value = "";
  document.getElementById('selectNivel').value = "";
}

function editarGr(id) {
  document.getElementById("pnlTabla").style.display = "None";
  document.getElementById("pnlFormulario").style.display = "";
  fetch('/web_service/Grupo/ConsultaGrupo.php?id=' + id)
    .then(data => {
      return data.json()
    })
    .then(data => {
      for (var i = 0; i < data.length; i++) {
        document.getElementById('id').value = data[i].id;
        document.getElementById('nombre').value = data[i].nombre;
        document.getElementById('direccion').value = data[i].direccion;
        document.getElementById('compania').value = data[i].compania;
        document.getElementById('email').value = data[i].email;
        document.getElementById('representante').value = data[i].representante;
        document.getElementById('telefono').value = data[i].telefono;
        document.getElementById('selectNivel').value = data[i].nivel;
      }
    });
}
function eliminarGr(id) {
  var r = confirm("Esta seguro que desea eliminar el grupo?, se eliminaran todos los datos anexados a este grupo");
  if (r == true) {
    fetch('/web_service/Grupo/EliminarGrupo.php?id=' + id)
      .then(data => {
        return data.json()
      })
      .then(data => {
        if (data.length > 0) {          
          for (let index = 0; index < data.length; index++) {
            alert("No se pudo eliminar el registro: " + data[index].Mensaje);            
          }          
        } else {
          $("#filaG" + id).remove();
        }
      });
  }
}