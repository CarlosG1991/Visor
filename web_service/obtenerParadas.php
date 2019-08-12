<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
//Generar Respuesta JSON con PHP y MySQL

//Se genera la Conexion a la base de datos MysQL
include 'conexion.php';
//Se prepara la peticion
$trac     = $_GET['trayectoria_id'];
$elements = explode(",", $trac);
$a        = "'";
$datos    = array();
$tra      = "";
for ($i = 0; $i < count($elements); $i++) {
    $parada    = array();
    $conParada = 'select pa.nombre as parada,pa.latitud,pa.longitud,tr.nombre from public.paradas pa inner join public.trayectoria tr on pa.id_trayectoria=tr.trayectoria_id where id_trayectoria=' . $elements[$i];
    $sqlParada = pg_query($conexion, $conParada);
    if ($sqlParada) {
        while ($obj = pg_fetch_object($sqlParada)) {
            $tra      = $obj->nombre;
            $parada[] = array(
                'parada'      => $obj->parada,
                'latitud'     => $obj->latitud,
                'longitud'    => $obj->longitud,
                'trayectoria' => $obj->nombre,
            );
        }
    }
    if ($tra != '') {
        $datos[] = array(
            'parada' => $parada,
        );
    }
    $tra = "";
}

echo '' . json_encode($datos) . '';

pg_close($conexion); //Se cierra la conexion
