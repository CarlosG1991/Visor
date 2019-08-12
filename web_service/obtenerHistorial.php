<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
//Generar Respuesta JSON con PHP y MySQL

//Se genera la Conexion a la base de datos MysQL
include 'conexion2.php';
//COPY console.alertas_gps FROM '/home/carlos/Documentos/Libro1.csv' USING DELIMITERS ';'
//    DROP TRIGGER trigg_act_packet_data_tmp_insert ON console.packet_data
//CREATE TRIGGER trigg_act_packet_data_tmp_insert AFTER INSERT ON console.trama_gps FOR EACH ROW EXECUTE PROCEDURE console.act_packet_data_tmp();
//Se prepara la peticion
$movil         = $_GET['movil'];
$desde         = $_GET['desde'];
$hasta         = $_GET['hasta'];
$a             = "'";
$datos         = array();
$consultaMovil = 'select "imei" from administration.device where "name"=' . $a . $movil . $a . ';';
$sqlMovil      = pg_query($conexion, $consultaMovil);
if ($sqlMovil) {
    while ($objMovil = pg_fetch_object($sqlMovil)) {
        $consulta = "select * from console.packet_data_tmp WHERE unit_id= " . $a . $objMovil->imei . $a . " and gps_date_time BETWEEN " . $a . $desde . $a . " AND " . $a . $hasta . $a . ' order by gps_date_time asc;';
        $sql      = pg_query($conexion, $consulta);
        $rows     = pg_num_rows($sql);
        if ($sql) {
            if ($rows != 0) {
                while ($obj = pg_fetch_object($sql)) {
                    $consultaAle = 'Select "Id","Nombre" from console.alertas_gps  where "Id" =' . $a . $obj->report_id . $a . ';';
                    $sqlAle      = pg_query($conexion, $consultaAle);
                    while ($objA = pg_fetch_object($sqlAle)) {
                        $datos[] = array(
                            'unit'     => $obj->unit_id,
                            'lat'      => $obj->latitude,
                            'long'     => $obj->longitude,
                            'odometro' => $obj->odometer,
                            'fecha'    => $obj->gps_date_time,
                            'alert'    => $objA->Nombre,

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
    }
}

echo '' . json_encode($datos) . '';

pg_close($conexion); //Se cierra la conexion
