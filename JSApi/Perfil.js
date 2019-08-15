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

