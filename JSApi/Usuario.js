function cargarUsuarios() {
    var tabla = document.getElementById("bodyUsuario");
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var contenido = '';
    fetch('/web_service/obtenerUsuarios.php?idGrupo=53')
        .then(data => {
            return data.json()
        })
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                contenido = document.createTextNode(data[i].id);
                td.appendChild(contenido);
                tr.appendChild(td);
                contenido = document.createTextNode(data[i].nombre);
                td1.appendChild(contenido);
                tr.appendChild(td1);
                contenido = document.createTextNode(data[i].apellido);
                td2.appendChild(contenido);
                tr.appendChild(td2);
                contenido = document.createTextNode(data[i].email);
                td3.appendChild(contenido);
                tr.appendChild(td3);
                contenido = document.createTextNode(data[i].mobile);
                td4.appendChild(contenido);
                tr.appendChild(td4);
                contenido = document.createTextNode(data[i].perfil);
                td5.appendChild(contenido);
                tr.appendChild(td5);
                contenido = document.createTextNode(data[i].grupo);
                td6.appendChild(contenido);
                tr.appendChild(td6);
                tabla.appendChild(tr);
            }
        });
}

function crearUsuario() {
    document.getElementById("pnlTabla").style.display = "None";
    document.getElementById("pnlFormulario").style.display = "";
}

function cancelarUsuario() {
    document.getElementById("pnlTabla").style.display = "";
    document.getElementById("pnlFormulario").style.display = "None";
    document.getElementById('id').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('login').value = "";
    document.getElementById('pass').value = "";
    document.getElementById('email').value = "";
    document.getElementById('descripcion').value = "";
    document.getElementById('telefono').value = "";
    document.getElementById('celular').value = "";
    document.getElementById('oemail').value = "";
    document.getElementById('selectPerfil').value = "";
}

function grabarUsuario() {
    var idU = document.getElementById('id').value;
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
    if (!idU) {
        idU = 0;
    }
    fetch('/web_service/Usuarios/crear_usuario.php?id=' + idU + '&nombre=' + nombre + '&apellido=' + apellido + '&login=' + login + '&pass=' + pass + '&email=' + email + '&descripcion=' + descripcion + '&telefono=' + telefono + '&celular=' + celular + '&oemail=' + oemail + '&perfil=' + perfil)
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
                document.getElementById('apellido').value = "";
                document.getElementById('login').value = "";
                document.getElementById('pass').value = "";
                document.getElementById('email').value = "";
                document.getElementById('descripcion').value = "";
                document.getElementById('telefono').value = "";
                document.getElementById('celular').value = "";
                document.getElementById('oemail').value = "";
                document.getElementById('selectPerfil').value = "";
                location.reload();
            }
        });
}

function eliminarUs(id) {
    var r = confirm("Esta seguro que desea eliminar el perfil?, se eliminaran todos los datos anexados a este perfil");
    if (r == true) {
        fetch('/web_service/Usuarios/EliminarUsuarios.php?id=' + id)
            .then(data => {
                return data.json()
            })
            .then(data => {
                if (data.length > 0) {
                    for (let index = 0; index < data.length; index++) {
                        alert("No se pudo eliminar el registro: " + data[index].Mensaje);
                    }
                } else {
                    $("#filaU" + id).remove();
                }
            });
    }
}

function editarUs(id) {
    document.getElementById("pnlTabla").style.display = "None";
    document.getElementById("pnlFormulario").style.display = "";
    fetch('/web_service/Usuarios/ConsultaUsuario.php?id=' + id)
        .then(data => {
            return data.json()
        })
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                document.getElementById('id').value = data[i].id;
                document.getElementById('nombre').value = data[i].nombre;
                document.getElementById('apellido').value = data[i].apellido;
                document.getElementById('login').value = data[i].login;
                document.getElementById('pass').value = data[i].pass;
                document.getElementById('email').value = data[i].email;
                document.getElementById('descripcion').value = data[i].descrip;
                document.getElementById('telefono').value = data[i].phone;
                document.getElementById('celular').value = data[i].mobile;
                document.getElementById('oemail').value = data[i].other;
                document.getElementById('selectPerfil').value = data[i].perfil;
            }
        });
}

function cargarPerfil(idGrupo) {
    var x = document.getElementById("selectPerfil");
    fetch('/web_service/obtenerPerfil.php?valor=1&grupo=' + idGrupo)
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