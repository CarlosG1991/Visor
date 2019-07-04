// function apiLogin() {
//   var details = {
//     'password': 'raptortrack$$2017',
//     'id_company': '1019',
//     'login': 'root'
//   };
//   var formBody = [];
//   for (var property in details) {
//     var encodedKey = encodeURIComponent(property);
//     var encodedValue = encodeURIComponent(details[property]);
//     formBody.push(encodedKey + "=" + encodedValue);
//   }
//   formBody = formBody.join("&");
//   console.log('Obteniendo los datos de la API...');
//   // const username = 'apiroot';
//   // const password = 'api%#$fgr#$%';
//   const password = document.form.password.value;
//   const username = document.form.login.value;
//   sessionStorage.setItem("Usuario", username);
//   sessionStorage.setItem("password", password);
//   fetch('https://apiservice.servertrack.co:3006/api/app/login', {
//     async: true,
//     crossDomain: true,
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + btoa(username + ":" + password),
//       'content-length': "57",
//     },
//     body: formBody
//   }).then(
//     res => res.json()
//   ).then(
//     data => {
//       for (i = 0; i < data.data.length; i++) {
//         console.log('Created Gist:', data.data[i].token_api);
//         document.form.submit();
//         // recuperarLastLocation(data.data[i].token_api, data.data[i].id_user);
//         sessionStorage.setItem("token", data.data[i].token_api, );
//         sessionStorage.setItem("id_user", data.data[i].id_user);
//         // recuperarFollow(data.data[i].token_api, data.data[i].movil);
//       }
//     }
//   );
// }

function apiLogin() {
  var password = document.form.password.value;
  var username = document.form.login.value;
  fetch('http://192.168.1.22:8080/web_service/login_usuarios.php?mail=' + username + '&pass=' + password)
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data)
      // if (data.length > 0) {
      //
      // } else {
      //   alert("Usuario y/o Contraseña incorrecta")
      // }

    });
}

function cerrarSesion() {
  var r = confirm("Seguro Desea Cerrar Sesion");
  if (r == true) {
    sessionStorage.getItem("Usuario", "");
    sessionStorage.getItem("password", "");
    sessionStorage.getItem("id_user", "");
    sessionStorage.getItem("token", "");
    window.location.href = "index.html";
  }
}