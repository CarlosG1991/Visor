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
$imei = $_GET['imei'];

$datos    = array();
$consulta = "SELECT a.unit_id, a.gps_date_time,a.longitude,a.latitude,a.report_id,a.gps_date_time FROM console.packet_data_tmp a INNER JOIN (SELECT  unit_id, MAX(gps_date_time) fecha_max FROM   console.packet_data_tmp GROUP BY unit_id) b ON a.unit_id = b.unit_id AND a.gps_date_time = b.fecha_max
 WHERE a.unit_id in (" . $imei . ")";
//$consulta = 'SELECT * FROm console.trama_gps where unit_id in(' . $imei . ')';
//$consulta = "SELECT * FROM console.trama_gps WHERE unit_id='358683065877665' and gps_date_time::text like '2019-07-19%'";
$sql  = pg_query($conexion, $consulta);
$rows = pg_num_rows($sql);
if ($sql) {
    if ($rows != 0) {
        while ($obj = pg_fetch_object($sql)) {
            $a           = "'";
            $consultaAle = 'Select "Id","Nombre" from console.alertas_gps  where "Id" =' . $a . $obj->report_id . $a . ';';
            $sqlAle      = pg_query($conexion, $consultaAle);
            while ($objA = pg_fetch_object($sqlAle)) {

                $datos[] = array(
                    'unit'     => $obj->unit_id,
                    'lat'      => $obj->latitude,
                    'long'     => $obj->longitude,
                    'fecha'    => $obj->gps_date_time,
                    'id_alert' => $objA->Id,
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
echo '' . json_encode($datos) . '';

pg_close($conexion); //Se cierra la conexion
