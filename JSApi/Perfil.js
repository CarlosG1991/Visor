function grabarPerfil() {
    var id = document.getElementById('id').value;
    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var nivel = document.getElementById('selectNivel').value;
    var grupo = localStorage.getItem('IdGrupo');
    if (!id) {
        id = 0;
    }
    fetch('/web_service/Perfil/crear_perfil.php?id=' + id + '&nombre=' + nombre + '&descr=' + descripcion + '&nivel=' + nivel + '&grupo=' + grupo)
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
                document.getElementById('descripcion').value = "";
                document.getElementById('selectNivel').value = "";
                location.reload();
            }
        });
}
function crearPerfil() {
    document.getElementById("pnlTablaPerfil").style.display = "None";
    document.getElementById("pnlFormularioPerfil").style.display = "";
}
function editarPe(id) {
    document.getElementById("pnlTablaPerfil").style.display = "None";
    document.getElementById("pnlFormularioPerfil").style.display = "";
    fetch('/web_service/Perfil/ConsultaPerfil.php?id=' + id)
        .then(data => {
            return data.json()
        })
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                document.getElementById('id').value = data[i].id;
                document.getElementById('nombre').value = data[i].perfil;
                document.getElementById('descripcion').value = data[i].descrip;
                document.getElementById('selectNivel').value = data[i].nivel;
            }
        });
}

function cancelarPerfil() {
    document.getElementById("pnlTablaPerfil").style.display = "";
    document.getElementById("pnlFormularioPerfil").style.display = "None";
    document.getElementById('id').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('descripcion').value = "";
    document.getElementById('selectNivel').value = "";
}

function eliminarPerfil(id) {
    var r = confirm("Desea eliminar el registro?");
    if (r == true) {

    }
}