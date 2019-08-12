<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
//Generar Respuesta JSON con PHP y MySQL

//Se genera la Conexion a la base de datos MysQL
include 'conexion.php';
$data  = json_decode($_POST['datos']);
$datos = array();
foreach ($data as $fila) {
    $consulta = "SELECT * FROM usuarios_movil where login='" . $fila->login . "';";
    $sql      = pg_query($conexion, $consulta);
    $rows     = pg_num_rows($sql);
    if ($rows > 0) {
        $con_upda = "Update usuarios_movil set movil_assign_user='" . $fila->movil_owner_group . "' where login=" . $fila->login;
        $sql_upda = pg_query($con_upda);
        if ($sql_upda) {
            $datos = array('Datos Actualizados' => $fila->id);
        }
    } else {
        $cons_insr = "INSERT INTO usuarios_movil(group_name,profile_name,user_name,last_name,login,movil_assign_user) VALUES ('" . $group_name . "','" . $profile_name . "','" . $user_name . "','" . $last_name . "','" . $login . "','" . $movil_assign_user . "')";
        $sql_ins   = pg_query($cons_insr);
        if ($sql_ins) {
            $datos = array('Dato insertado correctamente' => $fila->id);
        } else {
            $datos = array('Fallo al insertar' => pg_last_error($conexion));
        }
    }
}
echo '' . json_encode($datos) . '';
pg_close($conexion); //Se cierra la conexion
