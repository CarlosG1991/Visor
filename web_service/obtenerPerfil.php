<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
//Generar Respuesta JSON con PHP y MySQL

//Se genera la Conexion a la base de datos MysQL
include 'conexion.php';

//Se prepara la peticion
$valor = $_GET['valor'];
$datos = array();
if ($valor == 1) {
    $consulta = "SELECT id,name FROM perfil;";
    $sql      = pg_query($conexion, $consulta);
    $rows     = pg_num_rows($sql);
    if ($sql) {
        if ($rows != 0) {
            while ($obj = pg_fetch_object($sql)) {
                $datos[] = array(
                    'id'     => $obj->id,
                    'nombre' => $obj->name,
                );
            }
        }
    }
} else {
    $consulta = "SELECT id,nombre FROM grupos;";
    $sql      = pg_query($conexion, $consulta);
    $rows     = pg_num_rows($sql);
    if ($sql) {
        if ($rows != 0) {
            while ($obj = pg_fetch_object($sql)) {
                $datos[] = array(
                    'id'     => $obj->id,
                    'nombre' => $obj->nombre,
                );
            }
        }
    }
}

echo '' . json_encode($datos) . '';

pg_close($conexion); //Se cierra la conexion
