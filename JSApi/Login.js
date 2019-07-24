function apiLogin() {
  var password = document.form.password.value;
  var username = document.form.login.value;
  fetch(ruta + '/web_service/login_usuarios.php?mail=' + username + '&pass=' + password)
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data)
      if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
          console.log('Created Gist:', data[i].name);
          sessionStorage.setItem("name", data[i].name);
          sessionStorage.setItem("last_name", data[i].last_name);
          sessionStorage.setItem("movil_assign_user", data[i].movil_assign_user);
          sessionStorage.setItem("group_name", data[i].group_name);
          sessionStorage.setItem("profile_name", data[i].profile_name);
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
    window.location.href = "index.html";
  }
}