// *****************************Agregar Marker Goolgle****************************
// function addMarker(location) {
//   var contentString = '<div id="content">' +
//     '<div id="siteNotice">' +
//     '</div>' +
//     '<div id="bodyContent">' +
//     '<p><a onclick="javascript:follow(movil)">' +
//     'Seguir Vehiculo</a> ' +
//     '</p>' +
//     '</div>' +
//     '</div>';
//   var infowindow = new google.maps.InfoWindow({
//     content: contentString
//   });
//
//   var marker = new google.maps.Marker({
//     position: location,
//     map: map,
//     icon: 'img/iconos/Car1.png'
//   });
//   marker.addListener('click', function() {
//     infowindow.open(map, marker);
//   });
//   markers.push(marker);
// }

function obtener() {
    fetch('https://api.gservicetrack.com/groups/raptortrack', {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            console.log(data)
        })
}
function recuperarVelicidadMaxima(movil) {
    fetch('https://api.gservicetrack.com/maxspeedalert/raptortrack?limit=25&start=0&movil=' + movil, {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            console.log(data)
        })
}
function recuperarVelicidad() {
    fetch('https://api.gservicetrack.com/maxspeedalert/raptortrack?limit=25&start=0', {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            console.log(data)
        })
}






function recuperarConductores() {
    fetch('https://api.gservicetrack.com/driver/raptortrack?limit=25&start=0', {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            console.log(data)
        })
}

function recuperarEventos() {
    fetch('https://api.gservicetrack.com/avlevent/raptortrack?limit=25&start=0&sort=model', {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            console.log(data)
        })
}

function recuperarUsuarioMovil() {
    fetch('https://api.gservicetrack.com/usermovil/raptortrack?limit=25&start=0&sort=group_name', {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            guardarUsuarioMovil(data)
            console.log(data)
        })
}

function recuperarGrupoMovil() {
    fetch('https://api.gservicetrack.com/groupmovil/raptortrack?limit=25&start=0&sort=group_name', {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            // guardarGrupoMovil(data)
            console.log(data)
        })
}

function recuperarMoviles() {
    fetch('https://api.gservicetrack.com/movils/raptortrack?limit=100&start=0&sort=movil', {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            guardarMovil(data);
            console.log(data)

        })
}

function recuperarDispositivos() {
    fetch('https://api.gservicetrack.com/devices/raptortrack?limit=25&start=0&sort=device', {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            guardarDispositivos(data);
            console.log(data)
        })
}

function recuperarUsuarios() {
    fetch('https://api.gservicetrack.com/users/raptortrack?limit=25&start=0&sort=name', {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            guardarUsuarios(data)
            console.log(data)
        })
}

function recuperarPerfiles() {
    fetch('https://api.gservicetrack.com/profiles/raptortrack?limit=25&start=0&sort=name', {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            // guardarPerfiles(data)
            console.log(data)
        })
}

function recuperarGrupos() {
    fetch('https://api.gservicetrack.com/groups/raptortrack', {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            // guardarGrupos(data)
            console.log(data)
        })
}

function ultimaPosicion(movil, fecha) {
    fetch('https://api.gservicetrack.com/lastposition/raptortrack?limit=25&start=0&movil=' + movil + '&date=' + fecha, {
        headers: {
            "x-api-key": "dZ7oCt60FZ2UtPD7z8dpl6tnCgw03pDj1lMU9mep"
        }
    })
        .then(data => {
            return data.json()
        })
        .then(data => {
            console.log(data)
        })
}

function convertir(json) {
    var geojson = {
        type: "FeatureCollection",
        features: [],
    };
    for (i = 0; i < json.data.length; i++) {
        geojson.features.push({
            "type": "Feature",
            "properties": {
                "movil": json.data[i].movil,
                "location": json.data[i].location,
                "time": json.data[i].time,
                "date": json.data[i].date,
                "speed": json.data[i].speed,
                "photo": json.data[i].photo,
                "event": json.data[i].event,
                "timestamp": json.data[i].timestamp,
                "orientation": json.data[i].orientation,
                "model": json.data[i].model,
            },
            "geometry": {
                "type": "Point",
                "coordinates": [json.data[i].lon, json.data[i].lat]
            }
        });
    }
    return geojson;
}