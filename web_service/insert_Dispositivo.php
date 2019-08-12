<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
//Generar Respuesta JSON con PHP y MySQL
//Se genera la Conexion a la base de datos MysQL
include 'conexion.php';
//Se prepara la peticion
$data  = json_decode($_POST['datos']);
$datos = array();
foreach ($data as $fila) {
    $consulta = 'SELECT * FROM dispositivos where id=' . $fila->id;
    $sql      = pg_query($conexion, $consulta);
    $rows     = pg_num_rows($sql);
    if ($rows > 0) {
        $datos[] = array(
            'Este dato ya existe' => $fila->id,
        );
    } else {
        $cons_insert = "INSERT INTO dispositivos(Id,state,device,imei,purchase_date,brand,model,provider,phone,description,operator,sim_capacity,sim_serial,apn) VALUES (" . $fila->dispositivo_id . ",'" . $fila->state . "','" . $fila->device . "'," . $fila->imei . ",'" . $fila->purchase_date . "','" . $fila->brand . "','" . $fila->model . "','" . $fila->provider . "','" . $fila->phone . "','" . $fila->description . "','" . $fila->operator . "','" . $fila->sim_capacity . "','" . $fila->sim_serial . "','" . $fila->apn . "')";
        $sql_insert  = pg_query($conexion, $cons_insert);
        if ($sql_insert) {
            $datos[] = array(
                'Datos Insertados exitosamente' => $fila->id,
            );
        } else {
            $datos[] = array(
                'La consulta a fallado' => pg_last_error($conexion),
            );
        }
    }
}
echo '' . json_encode($datos) . '';
pg_close($conexion); //Se cierra la conexion
