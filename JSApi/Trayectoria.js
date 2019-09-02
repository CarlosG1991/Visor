function grabarTra() {
    var id = document.getElementById('id').value;
    var nombre = document.getElementById('nombre').value;
    var intervalo = document.getElementById('intervalo').value;
    var salida = document.getElementById('salida').value;
    var tiempo = document.getElementById('tiempo').value;
    var grupo = localStorage.getItem('IdGrupo');
    if (!id) {
        id = 0;
    }
    fetch('/web_service/Trayectoria/crear_trayectoria.php?id=' + id + '&nombre=' + nombre + '&intervalo=' + intervalo + '&salida=' + salida + '&tiempo=' + tiempo + '&grupo=' + grupo)
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
                document.getElementById('intervalo').value = "";
                document.getElementById('salida').value = "";
                document.getElementById('tiempo').value = "";                
                location.reload();
            }
        });
}
function crearTrayectoria() {
    document.getElementById("pnlTabla").style.display = "None";
    document.getElementById("pnlFormulario").style.display = "";
}
function editarTr(id) {
    document.getElementById("pnlTabla").style.display = "None";
    document.getElementById("pnlFormulario").style.display = "";
    fetch('/web_service/Trayectoria/ConsultaTrayectoria.php?id=' + id)
        .then(data => {
            return data.json()
        })
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                document.getElementById('id').value = data[i].id;
                document.getElementById('nombre').value = data[i].nombre;
                document.getElementById('intervalo').value = data[i].intervalo;
                document.getElementById('salida').value = data[i].salida;
                document.getElementById('tiempo').value = data[i].tiempo;                                        
            }
        });
}

function cancelarTra() {
    document.getElementById("pnlTabla").style.display = "";
    document.getElementById("pnlFormulario").style.display = "None";
    document.getElementById('id').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('intervalo').value = "";
    document.getElementById('salida').value = "";
    document.getElementById('tiempo').value = "";            
}

function eliminarTr(id) {
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
                    $("#filaT" + id).remove();
                }
            });
    }
}