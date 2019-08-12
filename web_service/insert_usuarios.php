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
    $consulta = 'SELECT * FROM usuarios where id=' . $fila->id;
    $sql      = pg_query($conexion, $consulta);
    $rows     = pg_num_rows($sql);
    if ($rows > 0) {
        $datos = array('Este dato ya existe' => $fila->id);
    } else {
        $cons_insr = "INSERT INTO usuarios(id,state,name,last_name,login,email,description,date_expired,phone,company,mobile,cdi,mail_other,active_panic,profile_name,group_name) VALUES (" . $id . "," . $state . ",'" . $name . "','" . $last_name . "','" . $login . "','" . $email . "','" . $description . "','" . $date_expired . "','" . $phone . "','" . $company . "','" . $mobile . "','" . $cdi . "','" . $mail_other . "','" . $active_panic . "','" . $profile_name . "','" . $group_name . "')";
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
