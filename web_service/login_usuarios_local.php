<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
//Generar Respuesta JSON con PHP y MySQL

//Se genera la Conexion a la base de datos MysQL
include 'conexion.php';

//Se prepara la peticion
$mail    = $_GET['mail'];
$pass    = $_GET['pass'];
$datos   = array();
$traye   = array();
$moviles = array();
$usuario = array();

$consulta = "SELECT * FROM usuarios where email = '" . $mail . "' and pass = '" . $pass . "';";
$sql      = pg_query($conexion, $consulta);
$rows     = pg_num_rows($sql);
if ($sql) {
    if ($rows != 0) {
        while ($obj = pg_fetch_object($sql)) {
            $conPerfil = "select * from perfil where id=" . $obj->perfil_id;
            $sqlPerfil = pg_query($conexion, $conPerfil);
            while ($objP = pg_fetch_object($sqlPerfil)) {
                $conGrupo = "select * from grupos where id=" . $objP->id_grupo;
                $sqlGrupo = pg_query($conexion, $conGrupo);
                while ($objG = pg_fetch_object($sqlGrupo)) {
                    $usuario = array(
                        'Id'       => $obj->id,
                        'Usuario'  => $obj->login,
                        'Nombre'   => $obj->name,
                        'Apellido' => $obj->last_name,
                        'Perfil'   => $objP->name,
                        'Grupo'    => $objG->nombre);
                    $conTra = "select * from trayectoria where id_grupo=" . $objG->id;
                    $sqlTra = pg_query($conexion, $conTra);
                    while ($objT = pg_fetch_object($sqlTra)) {
                        $traye[] = array(
                            'id'     => $objT->trayectoria_id,
                            'nombre' => $objT->nombre,
                        );
                    }
                    if ($objG->nivel == 1 && $objP->nivel == 1) {
                        $conMovil = "select mo.id,mo.device,mo.movil from movil mo inner join grupo_movil um on mo.id=um.id_movil";
                        $sqlMovil = pg_query($conexion, $conMovil);
                        while ($objMo = pg_fetch_object($sqlMovil)) {
                            $moviles[] = array(
                                'id'    => $objMo->id,
                                'imei'  => $objMo->device,
                                'movil' => $objMo->movil,
                            );
                        }
                    } elseif ($objP->nivel == 1) {
                        $conMovil = "select mo.id,mo.device,mo.movil from movil mo inner join grupo_movil um on mo.id=um.id_movil and um.id_grupo=" . $objG->id;
                        $sqlMovil = pg_query($conexion, $conMovil);
                        while ($objMo = pg_fetch_object($sqlMovil)) {
                            $moviles[] = array(
                                'id'    => $objMo->id,
                                'imei'  => $objMo->device,
                                'movil' => $objMo->movil,
                            );
                        }
                    } elseif ($objP->nivel == 2) {
                        $conMovil = "select mo.id,mo.device,mo.movil from movil mo inner join usuarios_movil um on mo.id=um.id_movil and um.id_usuario=" . $obj->id;
                        $sqlMovil = pg_query($conexion, $conMovil);
                        while ($objMo = pg_fetch_object($sqlMovil)) {
                            $moviles[] = array(
                                'id'    => $objMo->id,
                                'imei'  => $objMo->device,
                                'movil' => $objMo->movil,
                            );
                        }
                    }

                }
            }
        }
        $datos[] = array(
            'Usuario'     => $usuario,
            'moviles'     => $moviles,
            'trayectoria' => $traye,
        );
    }
}
echo '' . json_encode($datos) . '';

pg_close($conexion); //Se cierra la conexion
