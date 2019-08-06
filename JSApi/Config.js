var ruta = '';

function cargarInfo() {
  document.getElementById("nombre").value = localStorage.getItem("Nombre");
  document.getElementById("apellido").value = localStorage.getItem("Apellido");
  document.getElementById("grupo").value = localStorage.getItem("Grupo");
  document.getElementById("perfil").value = localStorage.getItem("Perfil");
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