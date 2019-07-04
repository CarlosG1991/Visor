function guardarDispositivos(data) {
  for (var item in data) {
    if (item == 'data') {
      if (data[item].length != 0) {
        for (x = 0; x < data[item].length; x++) {
          fetch('http://192.168.1.22:8080/web_service/insert_Dispositivo.php?Id=' + data[item][x].id + '&state=' + data[item][x].state + '&device=' + data[item][x].device + '&imei=' + data[item][x].imei + '&purchase_date=' + data[item][x].purchase_date + '&brand=' + data[item][x].brand + '&model=' + data[item][x].model + '&provider=' + data[item][x].provider + '&phone=' + data[item][x].phone + '&description=' + data[item][x].description + '&operator=' + data[item][x].operator + '&sim_capacity=' + data[item][x].sim_capacity + '&sim_serial=' + data[item][x].sim_serial + '&apn=' + data[item][x].apn)
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

function guardarGrupos(data) {
  for (var item in data) {
    if (item == 'data') {
      if (data[item].length != 0) {
        for (x = 0; x < data[item].length; x++) {
          fetch('http://192.168.1.22:8080/web_service/insert_grupo.php?Id=' + data[item][x].id + '&address=' + data[item][x].address + '&company=' + data[item][x].company + '&email=' + data[item][x].email + '&expired_date=' + data[item][x].expired_date + '&legal_representative=' + data[item][x].legal_representative + '&name=' + data[item][x].name + '&nit=' + data[item][x].nit + '&phone=' + data[item][x].phone + '&status=' + data[item][x].status)
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
          fetch('http://192.168.1.22:8080/web_service/insert_perfiles.php?Id=' + data[item][x].id + '&name=' + data[item][x].name + '&group_name=' + data[item][x].group_name + '&description=' + data[item][x].description)
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
          fetch('http://192.168.1.22:8080/web_service/insert_grupo.php?Id=' + data[item][x].id + '&name=' + data[item][x].name + '&group_name=' + data[item][x].group_name + '&description=' + data[item][x].description)
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
          fetch('http://192.168.1.22:8080/web_service/insert_moviles.php?Id=' + data[item][x].id + '&state=' + data[item][x].state + '&group_name=' + data[item][x].group_name + '&movil=' + data[item][x].movil + '&alias=' + data[item][x].alias + '&subgroup=' + data[item][x].subgroup + '&device=' + data[item][x].device + '&device_brand=' + data[item][x].device_brand + '&device_model=' + data[item][x].device_model + '&movil_brand=' + data[item][x].movil_brand + '&movil_model=' + data[item][x].movil_model + '&installation_date=' + data[item][x].installation_date + '&movil_color=' + data[item][x].movil_color + '&movil_type=' + data[item][x].movil_type + '&movil_owner=' + data[item][x].movil_owner + '&description=' + data[item][x].description + '&icon_type=' + data[item][x].icon_type + '&fuel_consumption=' + data[item][x].fuel_consumption + '&fuel_tank_capacity=' + data[item][x].fuel_tank_capacity + '&fuel_unity_measurement=' + data[item][x].fuel_unity_measurement + '&engine_number=' + data[item][x].engine_number + '&movil_chassis=' + data[item][x].movil_chassis + '&plate_city=' + data[item][x].plate_city + '&engine_brand=' + data[item][x].engine_brand + '&engine_ref=' + data[item][x].engine_ref + '&engine_model=' + data[item][x].engine_model + '&bodywork_type=' + data[item][x].bodywork_type + '&creation_date=' + data[item][x].creation_date)
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