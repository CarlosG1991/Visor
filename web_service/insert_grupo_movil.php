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
    $consulta = "SELECT * FROM usuarios_movil where group_name='" . $fila->group_name . "';";
    $sql      = pg_query($conexion, $consulta);
    $rows     = pg_num_rows($sql);
    if ($rows > 0) {
        $consulta = "Update grupo_movil set movil_owner_group='" . $fila->movil_owner_group . "' and movil_assig_group='" . $fila->movil_assig_group . "' where group_name=" . $fila->group_name;
        $datos[]  = array('Actualizado' => $fila->group_name);
    } else {
        $cons_inser = "INSERT INTO grupo_movil(group_name,description,movil_owner_group,movil_assig_group) VALUES ('" . $group_name . "','" . $description . "','" . $movil_owner_group . "','" . $movil_assig_group . "')";
        $sql_ins    = pg_query($cons_inser);
        if ($sql_ins) {
            $datos = array('Dato insertado correctamente' => $fila->id);
        } else {
            $datos = array('Error al insertar' => pg_last_error($conexion));
        }
    }
}
echo '' . json_encode($datos) . '';
pg_close($conexion); //Se cierra la conexion
