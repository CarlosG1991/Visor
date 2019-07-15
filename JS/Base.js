function guardarDispositivos(data) {
  for (var item in data) {
    if (item == 'data') {
      if (data[item].length != 0) {
        fetch(ruta + '/web_service/insert_Dispositivo.php?Data=' + data[item])
          .then(data => {
            return data.json()
          })
          .then(data => {
            console.log(data)
          })
      }
    }
  }
}

function guardarGrupos(data) {
  for (var item in data) {
    if (item == 'data') {
      if (data[item].length != 0) {
        for (x = 0; x < data[item].length; x++) {
          fetch(ruta + '/web_service/insert_grupo.php?Id=' + data[item][x].id + '&address=' + data[item][x].address + '&company=' + data[item][x].company + '&email=' + data[item][x].email + '&expired_date=' + data[item][x].expired_date + '&legal_representative=' + data[item][x].legal_representative + '&name=' + data[item][x].name + '&nit=' + data[item][x].nit + '&phone=' + data[item][x].phone + '&status=' + data[item][x].status)
            .then(data => {
              return data.json()
            })
            .then(data => {
              console.log(data)
            })
        }
      }
    }
  }
}

function guardarPerfiles(data) {
  for (var item in data) {
    if (item == 'data') {
      if (data[item].length != 0) {
        for (x = 0; x < data[item].length; x++) {
          fetch(ruta + '/web_service/insert_perfiles.php?Id=' + data[item][x].id + '&name=' + data[item][x].name + '&group_name=' + data[item][x].group_name + '&description=' + data[item][x].description)
            .then(data => {
              return data.json()
            })
            .then(data => {
              console.log(data)
            })
        }
      }
    }
  }
}

function guardarUsuarios(data) {
  for (var item in data) {
    if (item == 'data') {
      if (data[item].length != 0) {
        for (x = 0; x < data[item].length; x++) {
          fetch(ruta + '/web_service/insert_usuarios.php?Id=' + data[item][x].id + '&state=' + data[item][x].state + '&name=' + data[item][x].name + '&last_name=' + data[item][x].last_name + '&login=' + data[item][x].login + '&email=' + data[item][x].email + '&description=' + data[item][x].description + '&date_expired=' + data[item][x].date_expired + '&phone=' + data[item][x].phone + '&company=' + data[item][x].company + '&mobile=' + data[item][x].mobile + '&cdi=' + data[item][x].cdi + '&mail_other=' + data[item][x].mail_other + '&active_panic=' + data[item][x].active_panic + '&profile_name=' + data[item][x].profile_name + '&group_name=' + data[item][x].group_name)
            .then(data => {
              return data.json()
            })
            .then(data => {
              console.log(data)
            })
        }
      }
    }
  }
}

function guardarMovil(data) {
  for (var item in data) {
    if (item == 'data') {
      if (data[item].length != 0) {
        for (x = 0; x < data[item].length; x++) {
          fetch(ruta + '/web_service/insert_moviles.php?Id=' + data[item][x].id + '&state=' + data[item][x].state + '&group_name=' + data[item][x].group_name + '&movil=' + data[item][x].movil + '&alias=' + data[item][x].alias + '&subgroup=' + data[item][x].subgroup + '&device=' + data[item][x].device + '&device_brand=' + data[item][x].device_brand + '&device_model=' + data[item][x].device_model + '&movil_brand=' + data[item][x].movil_brand + '&movil_model=' + data[item][x].movil_model + '&installation_date=' + data[item][x].installation_date + '&movil_color=' + data[item][x].movil_color + '&movil_type=' + data[item][x].movil_type + '&movil_owner=' + data[item][x].movil_owner + '&description=' + data[item][x].description + '&icon_type=' + data[item][x].icon_type + '&fuel_consumption=' + data[item][x].fuel_consumption + '&fuel_tank_capacity=' + data[item][x].fuel_tank_capacity + '&fuel_unity_measurement=' + data[item][x].fuel_unity_measurement + '&engine_number=' + data[item][x].engine_number + '&movil_chassis=' + data[item][x].movil_chassis + '&plate_city=' + data[item][x].plate_city + '&engine_brand=' + data[item][x].engine_brand + '&engine_ref=' + data[item][x].engine_ref + '&engine_model=' + data[item][x].engine_model + '&bodywork_type=' + data[item][x].bodywork_type + '&creation_date=' + data[item][x].creation_date)
            .then(data => {
              return data.json()
            })
            .then(data => {
              console.log(data)
            })
        }
      }
    }
  }
}

function guardarUsuarioMovil(data) {
  for (var item in data) {
    if (item == 'data') {
      if (data[item].length != 0) {
        for (x = 0; x < data[item].length; x++) {
          fetch(ruta + '/web_service/insert_usuario_movil.php?group_name=' + data[item][x].group_name + '&profile_name=' + data[item][x].profile_name + '&user_name=' + data[item][x].user_name + '&last_name=' + data[item][x].last_name + '&login=' + data[item][x].login + '&movil_assign_user=' + data[item][x].movil_assign_user)
            .then(data => {
              return data.json()
            })
            .then(data => {
              console.log(data)
            })
        }
      }
    }
  }
}

function guardarGrupoMovil(data) {
  for (var item in data) {
    if (item == 'data') {
      if (data[item].length != 0) {
        for (x = 0; x < data[item].length; x++) {
          fetch(ruta + '/web_service/insert_grupo_movil.php?Id=' + data[item][x].id + '&name=' + data[item][x].name + '&group_name=' + data[item][x].group_name + '&description=' + data[item][x].description)
            .then(data => {
              return data.json()
            })
            .then(data => {
              console.log(data)
            })
        }
      }
    }
  }
}