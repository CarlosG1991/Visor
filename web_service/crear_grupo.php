<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
//Generar Respuesta JSON con PHP y MySQL

//Se genera la Conexion a la base de datos MysQL
include 'conexion.php';

$nombre        = $_GET['nombre'];
$direc         = $_GET['direc'];
$compania      = $_GET['compania'];
$email         = $_GET['email'];
$representante = $_GET['representante'];
$telefono      = $_GET['telefono'];
$datos         = array();

$conIsert = "INSERT INTO grupos(direccion,compania,email,representante,nombre,telefono,nivel) VALUES ('" . $direc . "','" . $compania . "','" . $email . "','" . $representante . "','" . $nombre . "','" . $telefono . "',2)";
$sql_ins  = pg_query($conexion, $conIsert);
if ($sql_ins) {
    $datos = [];
} else {
    $datos = array('Error al insertar' => pg_last_error($conexion));
}
echo '' . json_encode($datos) . '';
pg_close($conexion); //Se cierra la conexion
