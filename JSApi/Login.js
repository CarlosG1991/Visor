function init() {
  if (window.localStorage["login"] == '1') {
    window.location.href = "mapa.shtml";
  }
}

function apiLogin() {
  var password = document.form.password.value;
  var username = document.form.login.value;
  fetch('/web_service/login_usuarios_local.php?mail=' + username + '&pass=' + password)
    .then(data => {
      return data.json()
    })
    .then(data => {
      if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].Usuario.length; i++) {
            localStorage.setItem('IdUsuario', data[i].Usuario[i].Id);
            localStorage.setItem('Usuario', data[i].Usuario[i].Usuario);
            localStorage.setItem('Nombre', data[i].Usuario[i].Nombre);
            localStorage.setItem('Apellido', data[i].Usuario[i].Apellido);
            localStorage.setItem('Perfil', data[i].Usuario[i].Perfil);
            localStorage.setItem('Grupo', data[i].Usuario[i].Grupo);
            // sessionStorage.setItem("name", data[i].name);
          }
          localStorage.setItem('moviles', JSON.stringify(data[i].moviles));
          localStorage.setItem('trayectoria', JSON.stringify(data[i].trayectoria));
          window.localStorage["login"] = "1";
          document.form.submit();
        }
      } else {
        alert("Usuario y/o Contraseña incorrecta")
      }
    });
}

function cerrarSesion() {
  var r = confirm("Seguro Desea Cerrar Sesion");
  if (r == true) {
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("last_name", "");
    sessionStorage.setItem("movil_assign_user", "");
    sessionStorage.setItem("group_name", "");
    sessionStorage.setItem("profile_name", "");
    window.localStorage["login"] = "0";
    window.location.href = "index.html";
  }
}