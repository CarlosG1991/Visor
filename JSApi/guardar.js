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

function cargarPerfil() {
  var x = document.getElementById("selectPerfil");
  fetch('/web_service/obtenerPerfil.php?valor=1')
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

function grabarPerfil() {
  var nombre = document.getElementById('nombre').value;
  var descripcion = document.getElementById('descripcion').value;
  var nivel = document.getElementById('selectNivel').value;
  var grupo = document.getElementById('selectGrupo').value;
  fetch('/web_service/crear_perfil.php?nombre=' + nombre + '&descr=' + descripcion + '&nivel=' + nivel + '&grupo=' + grupo)
    .then(data => {
      return data.json()
    })
    .then(data => {
      if (data.length > 0) {
        alert("La informacion no se a podido guardar");
      } else {
        alert("La informacion a sido guardado");
        document.getElementById('nombre').value = "";
        document.getElementById('descripcion').value = "";
        document.getElementById('selectNivel').value = "";
        document.getElementById('selectGrupo').value = "";
      }
    });
}

function grabarUsuario() {
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var login = document.getElementById('login').value;
  var pass = document.getElementById('pass').value;
  var email = document.getElementById('email').value;
  var descripcion = document.getElementById('descripcion').value;
  var telefono = document.getElementById('telefono').value;
  var celular = document.getElementById('celular').value;
  var oemail = document.getElementById('oemail').value;
  var perfil = document.getElementById('selectPerfil').value;
  fetch('/web_service/crear_usuario.php?nombre=' + nombre + '&apellido=' + apellido + '&login=' + login + '&pass=' + pass + '&email=' + email + '&descripcion=' + descripcion + '&telefono=' + telefono + '&celular=' + celular + '&oemail=' + oemail + '&perfil=' + perfil)
    .then(data => {
      return data.json()
    })
    .then(data => {
      if (data.length > 0) {
        alert("La informacion no se a podido guardar");
      } else {
        alert("La informacion a sido guardado");
        document.getElementById('nombre').value = "";
        document.getElementById('apellido').value = "";
        document.getElementById('login').value = "";
        document.getElementById('pass').value = "";
        document.getElementById('email').value = "";
        document.getElementById('descripcion').value = "";
        document.getElementById('telefono').value = "";
        document.getElementById('celular').value = "";
        document.getElementById('oemail').value = "";
        document.getElementById('perfil').value = "";
      }
    });
}