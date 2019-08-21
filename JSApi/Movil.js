function grabarMovil() {
    var id = document.getElementById('id').value;
    var alias = document.getElementById('alias').value;
    var descripcion = document.getElementById('descripcion').value;
    var device = document.getElementById('dispositivo').value;
    var marca = document.getElementById('marca').value;
    var modelo = document.getElementById('modelo').value;
    var marcaMot = document.getElementById('marcaMot').value;
    var modeloMot = document.getElementById('modeloMot').value;
    var numero = document.getElementById('numero').value;
    var combusCon = document.getElementById('combusCon').value;
    var capaciCom = document.getElementById('capaciCom').value;
    var unidadCom = document.getElementById('unidadCom').value;
    var fechai = document.getElementById('fechai').value;
    var movil = document.getElementById('movil').value;
    var marcamo = document.getElementById('marcamo').value;
    var chasis = document.getElementById('chasis').value;
    var color = document.getElementById('color').value;
    var modelomo = document.getElementById('modelomo').value;
    var propietario = document.getElementById('propietario').value;
    var tipo = document.getElementById('tipo').value;
    var ciudadPlaca = document.getElementById('ciudadPlaca').value;
    var estado = document.getElementById('estado').value;
    var grupo = localStorage.getItem('IdGrupo');
    if (!id) {
        id = 0;
    }
    fetch('/web_service/Movil/crear_movil.php?id=' + id + '&alias=' + alias + '&descr=' + descripcion + '&device=' + device + '&marca=' + marca + '&modelo=' + modelo
        + '&marcaMot=' + marcaMot + '&modeloMot=' + modeloMot + '&numero=' + numero + '&combusCon=' + combusCon + '&capaciCom=' + capaciCom + '&unidadCom=' + unidadCom
        + '&fechai=' + fechai + '&movil=' + movil + '&marcamo=' + marcamo + '&chasis=' + chasis + '&color=' + color + '&modelomo=' + modelomo
        + '&propietario=' + propietario + '&tipo=' + tipo + '&ciudadPlaca=' + ciudadPlaca + '&estado=' + estado + '&grupo=' + grupo)
        .then(data => {
            return data.json()
        })
        .then(data => {
            if (data.length > 0) {
                alert("La informacion no se a podido guardar");
            } else {
                alert("La informacion a sido guardado");
                document.getElementById('id').value = "";
                document.getElementById('alias').value = "";
                document.getElementById('descripcion').value = "";
                document.getElementById('dispositivo').value = "";
                document.getElementById('marca').value = "";
                document.getElementById('modelo').value = "";
                document.getElementById('marcaMot').value = "";
                document.getElementById('modeloMot').value = "";
                document.getElementById('numero').value = "";
                document.getElementById('combusCon').value = "";
                document.getElementById('capaciCom').value = "";
                document.getElementById('unidadCom').value = "";
                document.getElementById('fechai').value = "";
                document.getElementById('movil').value = "";
                document.getElementById('marcamo').value = "";
                document.getElementById('chasis').value = "";
                document.getElementById('color').value = "";
                document.getElementById('modelomo').value = "";
                document.getElementById('propietario').value = "";
                document.getElementById('tipo').value ="";
                document.getElementById('ciudadPlaca').value = "";
                document.getElementById('estado').value = "";
                location.reload();
            }
        });
}
function crearMovil() {
    document.getElementById("pnlTabla").style.display = "None";
    document.getElementById("pnlFormulario").style.display = "";
}
function editarMo(id) {
    document.getElementById("pnlTabla").style.display = "None";
    document.getElementById("pnlFormulario").style.display = "";
    fetch('/web_service/Movil/ConsultaMovil.php?id=' + id)
        .then(data => {
            return data.json()
        })
        .then(data => {
            var estado = "";
            for (var i = 0; i < data.length; i++) {
                document.getElementById('id').value = data[i].id;
                document.getElementById('alias').value = data[i].alias;
                document.getElementById('descripcion').value = data[i].description;
                document.getElementById('dispositivo').value = data[i].device;
                document.getElementById('marca').value = data[i].device_brand;
                document.getElementById('modelo').value = data[i].device_model;
                document.getElementById('marcaMot').value = data[i].engine_brand;
                document.getElementById('modeloMot').value = data[i].engine_model;
                document.getElementById('numero').value = data[i].engine_number;
                document.getElementById('combusCon').value = data[i].fuel_consumption;
                document.getElementById('capaciCom').value = data[i].fuel_tank_capacity;
                document.getElementById('unidadCom').value = data[i].fuel_unity_measurement;
                document.getElementById('fechai').value = data[i].instalation_date;
                document.getElementById('movil').value = data[i].movil;
                document.getElementById('marcamo').value = data[i].movil_brand;
                document.getElementById('chasis').value = data[i].movil_chassis;
                document.getElementById('color').value = data[i].movil_color;
                document.getElementById('modelomo').value = data[i].movil_model;
                document.getElementById('propietario').value = data[i].movil_owner;
                document.getElementById('tipo').value = data[i].movil_type;
                document.getElementById('ciudadPlaca').value = data[i].plate_city;
                if (data[i].state == true) {
                    estado = "1"
                } else {
                    estado = "2"
                }
                document.getElementById('estado').value = estado;

            }
        });
}

function cancelarMovil() {
    document.getElementById("pnlTabla").style.display = "";
    document.getElementById("pnlFormulario").style.display = "None";
    document.getElementById('id').value = "";
    document.getElementById('alias').value = "";
    document.getElementById('descripcion').value = "";
    document.getElementById('dispositivo').value = "";
    document.getElementById('marca').value = "";
    document.getElementById('modelo').value = "";
    document.getElementById('marcaMot').value = "";
    document.getElementById('modeloMot').value = "";
    document.getElementById('numero').value = "";
    document.getElementById('combusCon').value = "";
    document.getElementById('capaciCom').value = "";
    document.getElementById('unidadCom').value = "";
    document.getElementById('fechai').value = "";
    document.getElementById('movil').value = "";
    document.getElementById('marcamo').value = "";
    document.getElementById('chasis').value = "";
    document.getElementById('color').value = "";
    document.getElementById('modelomo').value = "";
    document.getElementById('propietario').value = "";
    document.getElementById('tipo').value = "";
    document.getElementById('ciudadPlaca').value = "";
    document.getElementById('estado').value = "";
}

function eliminarMo(id) {
    var r = confirm("Desea eliminar el registro?");
    if (r == true) {

    }
}

function cargarUsuario(idGrupo) {
    var x = document.getElementById("selectUsuario");
    fetch('/web_service/Movil/obtenerUsuario.php?grupo=' + idGrupo)
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
function asginarMoviles() {
    var textos = "";
    var checkbox;
    var idMoviles = '';
    var idUsuario = document.getElementById('selectUsuario').value;
    for (var i = 1; i < document.getElementById('device').rows.length; i++) {
        for (var j = 0; j < 5; j++) {
            if (j == 0) {
                textos = document.getElementById('device').rows[i].cells[j].innerHTML;
                checkbox = document.getElementById(textos);
                if (checkbox.checked == true) {
                    if (idMoviles == '') {
                        idMoviles += textos;
                    } else {
                        idMoviles += ',' + textos;
                    }
                }
            }
        }
    }
    if (idUsuario == '') {
        alert("Seleccione un Usuario")
    } else {
        if (idMoviles == '') {
            alert("Seleccione un Movil")
        } else {
            fetch('/web_service/Asignacion/asignarMovil.php?idUsuario=' + idUsuario + '&idMovil=' + idMoviles)
                .then(data => {
                    return data.json()
                })
                .then(data => {
                    if (data.length > 0) {
                        alert("La informacion no se a podido guardar");
                    } else {
                        alert("La informacion se a guardardado");
                        location.reload();
                    }
                });
        }
    }
}