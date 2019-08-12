<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
//Generar Respuesta JSON con PHP y MySQL

//Se genera la Conexion a la base de datos MysQL
include 'conexion.php';

$nombre      = $_GET['nombre'];
$apellido    = $_GET['apellido'];
$login       = $_GET['login'];
$pass        = $_GET['pass'];
$email       = $_GET['email'];
$descripcion = $_GET['descripcion'];
$telefono    = $_GET['telefono'];
$celular     = $_GET['celular'];
$oemail      = $_GET['oemail'];
$perfil      = $_GET['perfil'];
$datos       = array();

$conIsert = "INSERT INTO usuarios(state,name,last_name,login,pass,email,description,phone,mobile,mail_other,perfil_id) VALUES (true,'" . $nombre . "','" . $apellido . "','" . $login . "','" . $pass . "','" . $email . "','" . $descripcion . "','" . $telefono . "','" . $celular . "','" . $oemail . "'," . $perfil . ")";
$sql_ins  = pg_query($conexion, $conIsert);
if ($sql_ins) {
    $datos = [];
} else {
    $datos = array('Error al insertar' => pg_last_error($conexion));
}
echo '' . json_encode($datos) . '';
pg_close($conexion); //Se cierra la conexion
