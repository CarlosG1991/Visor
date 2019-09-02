function init() {
  if (window.localStorage["login"] == '1') {
    window.location.href = "mapa.html";
  }
}

function enviarComando(movil, comando) {
  fetch('https://api.gservicetrack.com/remotecommand/raptortrack', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep",
      'Content-Type': 'application/json'
    },
    body: "{\r\n    \"movil\": \"" + movil + "\",\r\n    \"command\": \"" + comando + "\"\r\n  }"
  });
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
          for (let index = 0; index < data[i].moviles.length; index++) {            
            enviarComando(data[i].moviles[index].movil, 1);
            if (index == data[i].moviles.length - 1) {
              localStorage.setItem('IdUsuario', data[i].Usuario.Id);
              localStorage.setItem('Usuario', data[i].Usuario.Usuario);
              localStorage.setItem('Nombre', data[i].Usuario.Nombre);
              localStorage.setItem('Apellido', data[i].Usuario.Apellido);
              localStorage.setItem('IdPerfil', data[i].Usuario.IdPerfil);
              localStorage.setItem('Perfil', data[i].Usuario.Perfil);
              localStorage.setItem('IdGrupo', data[i].Usuario.IdGrupo);
              localStorage.setItem('Grupo', data[i].Usuario.Grupo);
              localStorage.setItem('Nivel', data[i].Usuario.Nivel);
              localStorage.setItem('moviles', JSON.stringify(data[i].moviles));
              localStorage.setItem('trayectoria', JSON.stringify(data[i].trayectoria));
              window.localStorage["login"] = "1";
              document.form.submit();
            }
          }
        }
      } else {
        alert("Usuario y/o Contraseña incorrecta")
      }
    });
}

function cerrarSesion() {
  var r = confirm("Seguro Desea Cerrar Sesion");
  if (r == true) {
    localStorage.setItem("moviles", "");
    localStorage.setItem("trayectoria", "");
    localStorage.setItem("name", "");
    localStorage.setItem("last_name", "");
    localStorage.setItem("movil_assign_user", "");
    localStorage.setItem("group_name", "");
    localStorage.setItem("profile_name", "");
    window.localStorage["login"] = "0";
    window.location.href = "index.html";
  }
}