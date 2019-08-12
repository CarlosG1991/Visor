<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
//Generar Respuesta JSON con PHP y MySQL

//Se genera la Conexion a la base de datos MysQL
include 'conexion.php';

//Se prepara la peticion
$mail  = $_GET['mail'];
$pass  = $_GET['pass'];
$datos = array();

$consulta = "SELECT * FROM usuarios where email = '" . $mail . "' and login = '" . $pass . "';";
$sql      = pg_query($conexion, $consulta);
$rows     = pg_num_rows($sql);
if ($sql) {
    if ($rows != 0) {
        while ($obj = pg_fetch_object($sql)) {
            $consulta2 = "SELECT * FROM usuarios_movil where login = '" . $obj->login . "';";
            $sql2      = pg_query($conexion, $consulta2);
            while ($obj2 = pg_fetch_object($sql2)) {
                $datos[] = array(
                    'name'              => $obj->name,
                    'last_name'         => $obj->last_name,
                    'group_name'        => $obj->group_name,
                    'profile_name'      => $obj->profile_name,
                    'movil_assign_user' => $obj2->movil_assign_user,
                );
            }
        }
    } else {
        $datos[] = array(
            'fallo' => 'aqui fallo',
        );
    }
} else {
    $datos[] = array(
        'fallo' => 'aqui fallo2',
    );
}
echo '' . json_encode($datos) . '';

pg_close($conexion); //Se cierra la conexion
