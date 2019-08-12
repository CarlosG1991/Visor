<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
//Generar Respuesta JSON con PHP y MySQL

//Se genera la Conexion a la base de datos MysQL
include 'conexion.php';
$alias                  = $_GET['alias'];
$bodywork_type          = $_GET['bodywork_type'];
$description            = $_GET['description'];
$device                 = $_GET['device'];
$device_brand           = $_GET['device_brand'];
$device_model           = $_GET['device_model'];
$engine_brand           = $_GET['engine_brand'];
$engine_model           = $_GET['engine_model'];
$engine_number          = $_GET['engine_number'];
$engine_ref             = $_GET['engine_ref'];
$fuel_consumption       = $_GET['fuel_consumption'];
$fuel_tank_capacity     = $_GET['fuel_tank_capacity'];
$fuel_unity_measurement = $_GET['fuel_unity_measurement'];
$group_name             = $_GET['group_name'];
$icon_type              = $_GET['icon_type'];
$id                     = $_GET['Id'];
$installation_date      = $_GET['installation_date'];
$movil                  = $_GET['movil'];
$movil_brand            = $_GET['movil_brand'];
$movil_chassis          = $_GET['movil_chassis'];
$movil_color            = $_GET['movil_color'];
$movil_model            = $_GET['movil_model'];
$movil_owner            = $_GET['movil_owner'];
$movil_type             = $_GET['movil_type'];
$plate_city             = $_GET['plate_city'];
$state                  = $_GET['state'];
$subgroup               = $_GET['subgroup'];
$creation_date          = $_GET['creation_date'];

$datos = array();

$consulta = 'SELECT * FROM movil where id=' . $id;
$sql      = pg_query($conexion, $consulta);
$rows     = pg_num_rows($sql);
if ($rows > 0) {
    $datos[] = array('Este dato ya existe' => $id);
} else {
    $cons_ins = "INSERT INTO movil VALUES ('" . $alias . "','" . $bodywork_type . "','" . $description . "','" . $device . "','" . $device_brand . "','" . $device_model . "','" . $engine_brand . "','" . $engine_model . "'," . $engine_number . ",'" . $engine_ref . "'," . $fuel_consumption . "," . $fuel_tank_capacity . "," . $fuel_unity_measurement . ",'" . $group_name . "'," . $icon_type . "," . $id . ",'" . $installation_date . "','" . $movil . "','" . $movil_brand . "','" . $movil_chassis . "','" . $movil_color . "','" . $movil_model . "','" . $movil_owner . "','" . $movil_type . "','" . $plate_city . "','" . $state . "','" . $subgroup . "','" . $creation_date . "')";
    $sql_ins  = pg_query($cons_ins);
    if ($sql_ins) {
        $datos[] = array('Dato insertado correctamente' => $id);
    } else {
        $datos[] = array('No se pudo hacer el insert' => pg_last_error($conexion));
    }
}

echo '' . json_encode($datos) . '';
pg_close($conexion); //Se cierra la conexion
